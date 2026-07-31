import prisma from "../config/prisma.js";
import fetch from "node-fetch";
import crypto from "crypto";

const PAYSTACK_INIT_URL = "https://api.paystack.co/transaction/initialize";
const PAYSTACK_VERIFY_URL = "https://api.paystack.co/transaction/verify";

export const initializePayment = async (req, res) => {
  try {
    const { accountId, email } = req.body;
    if (!accountId || !email) return res.status(400).json({ success: false, message: "accountId and email required" });

    const account = await prisma.account.findUnique({ where: { id: accountId } });
    if (!account) return res.status(404).json({ success: false, message: "Account not found" });

    // ensure buyer user exists (create guest buyer if not)
    let buyer = await prisma.user.findUnique({ where: { email } });
    if (!buyer) {
      buyer = await prisma.user.create({
        data: {
          name: "Guest Buyer",
          email,
          password: Math.random().toString(36).slice(2),
          verified: false
        }
      });
    }

    // create order
    const order = await prisma.order.create({
      data: {
        amount: account.price,
        status: "PENDING",
        buyerId: buyer.id,
        accountId: account.id
      }
    });

    // create payment record (placeholder, reference will be updated)
    let payment = await prisma.payment.create({
      data: {
        orderId: order.id,
        reference: "",
        amount: account.price,
        status: "PENDING",
        provider: "PAYSTACK"
      }
    });

    // Initialize Paystack transaction
    const amountKobo = Math.round(account.price * 100);
    const body = { email, amount: amountKobo, metadata: { orderId: order.id, accountId: account.id } };

    const initRes = await fetch(PAYSTACK_INIT_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.PAYSTACK_SECRET}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    });

    const initJson = await initRes.json();
    if (!initJson.status) {
      return res.status(502).json({ success: false, message: "Paystack initialization failed", detail: initJson });
    }

    const { authorization_url, reference } = initJson.data;

    // update payment with reference
    payment = await prisma.payment.update({ where: { id: payment.id }, data: { reference } });

    return res.json({ success: true, authorization_url, reference, orderId: order.id });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const verifyPayment = async (req, res) => {
  try {
    const { reference } = req.params;
    if (!reference) return res.status(400).json({ success: false, message: "reference required" });

    const verifyRes = await fetch(`${PAYSTACK_VERIFY_URL}/${encodeURIComponent(reference)}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${process.env.PAYSTACK_SECRET}`
      }
    });

    const verifyJson = await verifyRes.json();
    if (!verifyJson.status) return res.status(400).json({ success: false, message: "Payment not verified", detail: verifyJson });

    const data = verifyJson.data;

    // find payment by reference
    const payment = await prisma.payment.findUnique({ where: { reference } });
    if (!payment) {
      // nothing to update
      return res.json({ success: true, data });
    }

    const paid = data.status === "success";

    await prisma.payment.update({ where: { id: payment.id }, data: { status: paid ? "SUCCESS" : data.status, paidAt: paid ? new Date(data.paid_at) : null } });

    // update order status
    if (paid) {
      const order = await prisma.order.update({ where: { id: payment.orderId }, data: { status: "PAID" } });
      // mark account as SOLD (or RESERVED based on business rules)
      await prisma.account.update({ where: { id: order.accountId }, data: { status: "SOLD" } });
    }

    return res.json({ success: true, data });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const refundPayment = async (req, res) => {
  return res.json({ success: true, message: "Refund request received (admin will process)." });
};

export const webhookHandler = async (req, res) => {
  try {
    const signature = req.headers["x-paystack-signature"];
    const rawBody = req.body; // Buffer because express.raw used

    if (!signature) {
      return res.status(400).send("Missing signature header");
    }

    const computed = crypto.createHmac("sha512", process.env.PAYSTACK_SECRET).update(rawBody).digest("hex");

    if (computed !== signature) {
      // signature mismatch
      return res.status(400).send("Invalid signature");
    }

    const event = JSON.parse(rawBody.toString());

    // Paystack sends event.event and event.data
    const ev = event.event;
    const data = event.data;

    if (ev === "charge.success" || (ev === "transaction.success")) {
      const reference = data.reference;
      const payment = await prisma.payment.findUnique({ where: { reference } });
      if (payment) {
        const paid = data.status === "success";
        await prisma.payment.update({ where: { id: payment.id }, data: { status: paid ? "SUCCESS" : data.status, paidAt: paid ? new Date(data.paid_at) : null } });
        if (paid) {
          const order = await prisma.order.update({ where: { id: payment.orderId }, data: { status: "PAID" } });
          await prisma.account.update({ where: { id: order.accountId }, data: { status: "SOLD" } });
        }
      }
    }

    // respond 200 to acknowledge
    res.status(200).send("ok");
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err);
    res.status(500).send("error");
  }
};
