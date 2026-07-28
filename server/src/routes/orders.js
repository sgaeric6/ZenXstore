import express from "express";

import {
  createOrder,
  getOrders,
  getOrder,
  updateOrder
} from "../controllers/orderController.js";

const router = express.Router();

router.get("/", getOrders);

router.get("/:id", getOrder);

router.post("/", createOrder);

router.put("/:id", updateOrder);

export default router;
