import prisma from "../config/prisma.js";
import crypto from "crypto";

const PAYSTACK_BASE = process.env.PAYSTACK_BASE_URL || "https://api.paystack.co";
const PAYSTACK_SECRET = process.env.PAYSTACK_SECRET;

export const initializePayment = async (req, res) => {
  try {
    const { orderId } = req.body;
    if (!orderId) return res.status(400).json({ success: false, message: "orderId required" });

    const order = await prisma.order.findUnique({ where: { id: orderId }, include: { buyer: true } });
    if (!order) return res.status(404).json({ success: false, message: "Order not found" });

    // convert Decimal string to kobo (integer)
    const amountNumber = Number(order.amount);
    if (Number.isNaN(amountNumber)) return res.status(400).json({ success: false, message: "Invalid order amount" });
    const amountKobo = Math.round(amountNumber * 100);

    const payload = {
      email: order.buyer.email,
      amount: amountKobo,
      metadata: { orderId: order.id }
    };

    const resp = await fetch(`${PAYSTACK_BASE}/transaction/initialize`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${PAYSTACK_SECRET}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    const data = await resp.json();
    if (!data || data.status === false) return res.status(500).json({ success: false, message: "Paystack init failed", details: data });

    return res.json({
      success: true,
      authorization_url: data.data.authorization_url,
      access_code: data.data.access_code,
      reference: data.data.reference,
      amountKobo
    });
  } catch (err) {
    console.error("init payment err", err);
    return res.status(500).json({ success: false, message: err.message });
  }
};

export const verifyPayment = async (req, res) => {
  try {
    const reference = req.params.reference;
    const resp = await fetch(`${PAYSTACK_BASE}/transaction/verify/${reference}`, {
      headers: { Authorization: `Bearer ${PAYSTACK_SECRET}` }
    });
    const data = await resp.json();
    return res.json(data);
  } catch (err) {
    console.error("verify err", err);
    return res.status(500).json({ success: false, message: err.message });
  }
};

export const refundPayment = async (req, res) => {
  res.json({ success: true, message: "Refund request sent to admin." });
};

export const paystackWebhook = async (req, res) => {
  try {
    const signature = req.headers["x-paystack-signature"];
    const secret = PAYSTACK_SECRET;
    const hash = crypto.createHmac("sha512", secret).update(JSON.stringify(req.body)).digest("hex");
    if (signature !== hash) {
      console.warn("Invalid paystack signature");
      return res.status(400).send("Invalid signature");
    }

    const event = req.body;
    if (event.event === "charge.success") {
      const payload = event.data;
      const reference = payload.reference;
      const orderId = payload.metadata?.orderId;

      await prisma.$transaction(async (tx) => {
        // create or update payment
        let payment = await tx.payment.findUnique({ where: { reference } });
        if (!payment) {
          payment = await tx.payment.create({
            data: {
              reference,
              orderId,
              provider: "PAYSTACK",
              amount: (payload.amount / 100).toString(),
              status: "SUCCESS",
              paidAt: new Date()
            }
          });
        } else {
          payment = await tx.payment.update({ where: { id: payment.id }, data: { status: "SUCCESS", paidAt: new Date() } });
        }

        const order = await tx.order.findUnique({ where: { id: payment.orderId } });
        if (!order) throw new Error("Order not found");

        await tx.order.update({ where: { id: order.id }, data: { status: "PAID" } });

        await tx.account.update({
          where: { id: order.accountId },
          data: { status: "SOLD", reservedById: null, reservedUntil: null }
        });

        const token = crypto.randomBytes(24).toString("hex");
        await tx.deliveryToken.create({
          data: {
            token,
            orderId: order.id,
            accountId: order.accountId,
            expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000)
          }
        });

        await tx.delivery.create({
          data: {
            orderId: order.id,
            accountId: order.accountId,
            deliveredToId: order.buyerId,
            deliveredBy: "SYSTEM",
            notes: `Paid via Paystack ref ${reference}`
          }
        });

        // TODO: send email with delivery link to buyer: /deliver?token=${token}
      });
    }

    return res.status(200).send("ok");
  } catch (err) {
    console.error("webhook handling failed:", err);
    return res.status(500).send("error");
  }
};
