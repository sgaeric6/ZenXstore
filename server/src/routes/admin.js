import express from "express";

const router = express.Router();

// Approve refund
router.post("/refund/:id", async (req, res) => {
  res.json({
    success: true,
    message: "Refund approved"
  });
});

// Approve support staff
router.post("/support/:id/approve", async (req, res) => {
  res.json({
    success: true,
    message: "Support account approved"
  });
});

// Upload Free Fire account
router.post("/accounts", async (req, res) => {
  res.json({
    success: true,
    message: "Account uploaded"
  });
});

export default router;
