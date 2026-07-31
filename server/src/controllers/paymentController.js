import fetch from "node-fetch";
import listingService from "../services/listingService.js";
import { addInvoice, updateInvoice } from "../utils/invoiceStore.js";

const PAYSTACK_INIT_URL = "https://api.paystack.co/transaction/initialize";
const PAYSTACK_VERIFY_URL = "https://api.paystack.co/transaction/verify";

export const initializePayment = async (req, res) => {
  try {
    const { accountId, email } = req.body;
    if (!accountId || !email) return res.status(400).json({ success: false, message: "accountId and email required" });

    const account = await listingService.getListing(accountId);
    if (!account) return res.status(404).json({ success: false, message: "Account not found" });

    const amountKobo = Math.round((account.price || 0) * 100);

    const body = {
      email,
      amount: amountKobo,
      metadata: { accountId }
    };

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

    // store a lightweight invoice
    addInvoice({ reference, accountId, email, amount: amountKobo / 100, status: "PENDING", createdAt: new Date().toISOString() });

    return res.json({ success: true, authorization_url, reference });
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

    const updated = updateInvoice(reference, { status: data.status === "success" ? "PAID" : data.status, paidAt: data.paid_at || new Date().toISOString(), paystack: data });

    return res.json({ success: true, data: updated || data });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const refundPayment = async (req, res) => {
  return res.json({ success: true, message: "Refund request received (admin will process)." });
};
