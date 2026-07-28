import express from "express";

import {
  initializePayment,
  verifyPayment,
  refundPayment
} from "../controllers/paymentController.js";

const router = express.Router();

router.post("/initialize", initializePayment);

router.get("/verify/:reference", verifyPayment);

router.post("/refund", refundPayment);

export default router;
