import prisma from "../config/prisma.js";
import crypto from "crypto";

const OPAY_BASE = process.env.OPAY_BASE_URL || "https://api.opay.com"; // replace with actual OPay API base if different
const OPAY_SECRET = process.env.OPAY_SECRET;

// Bank details to show on checkout
const BANK_DETAILS = {
  bank: "OPay",
  accountName: "DIVINE CHINONSO NWABUDE",
  accountNumber: "6541065478"
};

export const getCheckoutInfo = async (req, res) => {
  try {
    const { orderId, accountId } = req.query;

    let order = null;
    if (orderId) {
      order = await prisma.order.findUnique({ where: { id: orderId }, include: { account: true } });
    } else if (accountId) {
      // find a pending/reserved order for this user and account
      order = await prisma.order.findFirst({ where: { accountId, buyerId: req.user?.id }, orderBy: { createdAt: "desc" }, include: { account: true } });
      if (!order) return res.status(404).json({ success: false, message: "Order not found" });
    } else {
      return res.status(400).json({ success: false, message: "orderId or accountId required" });
    }

    // send bank details + order info
    return res.json({ success: true, order: { id: order.id, amount: order.amount?.toString?.(), status: order.status, account: order.account, reservedUntil: order.account?.reservedUntil || order.reservedUntil }, bank: BANK_DETAILS });
  } catch (err) {
    console.error("getCheckoutInfo err", err);
    return res.status(500).json({ success: false, message: err.message });
  }
};

// Attempt to verify a manual bank transfer with OPay. Two modes supported:
// - client provides providerReference (transaction ref from payer) -> we verify that specific transaction
// - no reference provided -> we attempt a best-effort search using OPay APIs (may need provider support)
export const verifyManualPayment = async (req, res) => {
  try {
    const { orderId, providerReference } = req.body;
    if (!orderId) return res.status(400).json({ success: false, message: "orderId required" });

    const order = await prisma.order.findUnique({ where: { id: orderId } });
    if (!order) return res.status(404).json({ success: false, message: "Order not found" });

    const expectedAmount = Number(order.amount);

    // If client provided a providerReference (e.g., transaction id from OPay), verify that first
    if (providerReference) {
      // Example: OPay verify endpoint - replace with actual OPay verify endpoint/path
      const resp = await fetch(`${OPAY_BASE}/v1/transaction/verify/${providerReference}`, {
        method: "GET",
        headers: { Authorization: `Bearer ${OPAY_SECRET}`, "Content-Type": "application/json" }
      });
      const data = await resp.json();

      const paid = data && (data.status === "success" || data.data?.status === "SUCCESS");
      const paidAmount = data?.data?.amount ? Number(data.data.amount) : null; // ensure units align

      if (paid && paidAmount !== null && Math.abs(paidAmount - expectedAmount) < 0.001) {
        // mark paid
        await finalizeSuccessfulPayment(order.id, providerReference, paidAmount);
        return res.json({ success: true, message: "Payment confirmed", orderId: order.id });
      }

      return res.json({ success: false, message: "Transaction found but amount/status did not match", details: data });
    }

    // No providerReference: attempt to search incoming transactions for the merchant account.
    // NOTE: Many bank APIs do not provide a generic searchable list via public endpoints for merchant consoles.
    // This block is a best-effort placeholder — replace with the OPay-specific API for searching or reconciling transfers.
    // If OPay provides a transactions list endpoint for the merchant, you can call it here and match by amount and narration containing order.id

    // Placeholder: respond not-found so admin approval is used as fallback
    return res.json({ success: false, message: "No provider reference supplied. Automatic search is not implemented for OPay in this build. Please provide the transaction reference or notify admin for manual verification." });
  } catch (err) {
    console.error("verifyManualPayment err", err);
    return res.status(500).json({ success: false, message: err.message });
  }
};

export const notifyAdmin = async (req, res) => {
  try {
    const { orderId } = req.body;
    if (!orderId) return res.status(400).json({ success: false, message: "orderId required" });

    const order = await prisma.order.findUnique({ where: { id: orderId } });
    if (!order) return res.status(404).json({ success: false, message: "Order not found" });

    // set order to PROCESSING to indicate awaiting manual review
    await prisma.order.update({ where: { id: orderId }, data: { status: "PROCESSING" } });

    await prisma.adminLog.create({ data: { adminId: "SYSTEM", action: "MANUAL_PAYMENT_NOTIFY", targetId: orderId, description: `Buyer requested manual verification for order ${orderId}` } });

    return res.json({ success: true, message: "Admin notified for manual verification" });
  } catch (err) {
    console.error("notifyAdmin err", err);
    return res.status(500).json({ success: false, message: err.message });
  }
};

export const adminApprovePayment = async (req, res) => {
  try {
    const { orderId } = req.params;
    // TODO: ensure only admins can call this (auth middleware)

    const order = await prisma.order.findUnique({ where: { id: orderId } });
    if (!order) return res.status(404).json({ success: false, message: "Order not found" });

    await prisma.$transaction(async (tx) => {
      await tx.payment.create({ data: { orderId: order.id, reference: `MANUAL-${Date.now()}`, provider: "OPAY", amount: order.amount, status: "SUCCESS", paidAt: new Date() } });
      await tx.order.update({ where: { id: order.id }, data: { status: "PAID" } });
      await tx.account.update({ where: { id: order.accountId }, data: { status: "SOLD", reservedById: null, reservedUntil: null } });
      const token = crypto.randomBytes(24).toString("hex");
      await tx.deliveryToken.create({ data: { token, orderId: order.id, accountId: order.accountId, expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000) } });
      await tx.delivery.create({ data: { orderId: order.id, accountId: order.accountId, deliveredToId: order.buyerId, deliveredBy: "ADMIN", notes: "Manually approved by admin" } });
    });

    return res.json({ success: true, message: "Order approved and marked as PAID" });
  } catch (err) {
    console.error("adminApprovePayment err", err);
    return res.status(500).json({ success: false, message: err.message });
  }
};

async function finalizeSuccessfulPayment(orderId, providerReference, paidAmount) {
  await prisma.$transaction(async (tx) => {
    await tx.payment.create({ data: { orderId, reference: providerReference, provider: "OPAY", amount: paidAmount.toString(), status: "SUCCESS", paidAt: new Date() } });
    const order = await tx.order.findUnique({ where: { id: orderId } });
    await tx.order.update({ where: { id: orderId }, data: { status: "PAID" } });
    await tx.account.update({ where: { id: order.accountId }, data: { status: "SOLD", reservedById: null, reservedUntil: null } });
    const token = crypto.randomBytes(24).toString("hex");
    await tx.deliveryToken.create({ data: { token, orderId, accountId: order.accountId, expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000) } });
    await tx.delivery.create({ data: { orderId, accountId: order.accountId, deliveredToId: order.buyerId, deliveredBy: "SYSTEM", notes: `Paid via OPAY ref ${providerReference}` } });
  });
}
