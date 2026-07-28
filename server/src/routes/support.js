import express from "express";

const router = express.Router();

// User submits complaint
router.post("/complaint", async (req, res) => {
  res.json({
    success: true,
    message: "Complaint submitted successfully"
  });
});

// User submits account for sale
router.post("/sell", async (req, res) => {
  res.json({
    success: true,
    message: "Account submitted for review"
  });
});

// Get support chats
router.get("/chats", async (req, res) => {
  res.json({
    success: true,
    chats: []
  });
});

export default router;
