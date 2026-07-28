import express from "express";

const router = express.Router();

// Get all orders
router.get("/", async (req, res) => {
  res.json({
    success: true,
    orders: []
  });
});

// Create order
router.post("/", async (req, res) => {
  res.json({
    success: true,
    message: "Order created successfully"
  });
});

// Order details
router.get("/:id", async (req, res) => {
  res.json({
    success: true,
    orderId: req.params.id
  });
});

export default router;
