import express from "express";

const router = express.Router();

// Get all users
router.get("/", async (req, res) => {
  res.json({
    success: true,
    users: []
  });
});

// Get user profile
router.get("/:id", async (req, res) => {
  res.json({
    success: true,
    userId: req.params.id
  });
});

export default router;
