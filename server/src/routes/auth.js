import express from "express";

const router = express.Router();

// Register
router.post("/register", async (req, res) => {
  res.json({
    success: true,
    message: "Register endpoint working"
  });
});

// Login
router.post("/login", async (req, res) => {
  res.json({
    success: true,
    message: "Login endpoint working"
  });
});

export default router;
