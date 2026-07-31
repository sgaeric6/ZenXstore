import express from "express";

import {
  initializePayment,
  verifyPayment,
  refundPayment,
  webhookHandler
} from "../controllers/paymentController.js";

const router = express.Router();

// Paystack webhook requires raw body so verify signature; this route uses express.raw
router.post("/webhook", express.raw({ type: "application/json" }), webhookHandler);

router.post("/initialize", initializePayment);

router.get("/verify/:reference", verifyPayment);

router.post("/refund", refundPayment);

export default router;
