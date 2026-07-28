import express from "express";

const router = express.Router();

// Initialize Paystack payment
router.post("/paystack", async (req, res) => {
  res.json({
    success: true,
    message: "Payment initialized"
  });
});

// Verify payment
router.get("/verify/:reference", async (req, res) => {
  res.json({
    success: true,
    reference: req.params.reference
  });
});

export default router;
