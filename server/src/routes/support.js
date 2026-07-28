import express from "express";

import {
  getChats,
  sendMessage,
  createComplaint,
  submitAccountSale
} from "../controllers/supportController.js";

const router = express.Router();

router.get("/chats", getChats);

router.post("/message", sendMessage);

router.post("/complaint", createComplaint);

router.post("/sell", submitAccountSale);

export default router;
