import prisma from "../config/prisma.js";

export const createOrder = async (req, res) => {
  const { accountId } = req.body;
  const userId = req.user?.id; // make sure your auth middleware sets req.user
  if (!userId) return res.status(401).json({ success: false, message: "Unauthorized" });

  try {
    const result = await prisma.$transaction(async (tx) => {
      const account = await tx.account.findUnique({ where: { id: accountId } });

      if (!account || account.status !== "AVAILABLE") {
        throw new Error("Account not available");
      }

      if (account.reservedUntil && account.reservedUntil > new Date()) {
        throw new Error("Account currently reserved");
      }

      const reservedUntil = new Date(Date.now() + 15 * 60 * 1000); // reserve for 15 minutes

      await tx.account.update({
        where: { id: accountId },
        data: { reservedById: userId, reservedUntil, status: "RESERVED" },
      });

      const order = await tx.order.create({
        data: {
          accountId,
          buyerId: userId,
          amount: account.price,
        },
      });

      return { order, reservedUntil };
    });

    // serialize Decimal to string if present
    if (result.order && result.order.amount && result.order.amount.toString) {
      result.order.amount = result.order.amount.toString();
    }

    return res.status(201).json({
      success: true,
      order: result.order,
      reservedUntil: result.reservedUntil,
      status: "RESERVED",
    });
  } catch (err) {
    return res.status(400).json({ success: false, message: err.message });
  }
};

export const getOrders = async (req, res) => {
  const orders = await prisma.order.findMany({
    where: {},
    orderBy: { createdAt: "desc" },
    include: { account: true },
  });

  // stringify decimals
  const out = orders.map((o) => ({ ...o, amount: o.amount?.toString?.() }));

  res.json({ success: true, orders: out });
};

export const getOrder = async (req, res) => {
  const order = await prisma.order.findUnique({ where: { id: req.params.id }, include: { account: true } });
  if (!order) return res.status(404).json({ success: false, message: "Order not found" });
  order.amount = order.amount?.toString?.();
  res.json({ success: true, order });
};

export const updateOrder = async (req, res) => {
  const { status } = req.body;
  try {
    const updated = await prisma.order.update({ where: { id: req.params.id }, data: { status } });
    return res.json({ success: true, order: updated });
  } catch (err) {
    return res.status(400).json({ success: false, message: err.message });
  }
};
