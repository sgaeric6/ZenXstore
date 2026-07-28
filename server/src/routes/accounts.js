import express from "express";

const router = express.Router();

// Get all account listings
router.get("/", async (req, res) => {
  res.json({
    success: true,
    accounts: []
  });
});

// Get account by ID
router.get("/:id", async (req, res) => {
  res.json({
    success: true,
    accountId: req.params.id
  });
});

// Create a new account listing
router.post("/", async (req, res) => {
  res.json({
    success: true,
    message: "Account submitted successfully"
  });
});

export default router;
