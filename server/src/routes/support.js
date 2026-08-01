import express from "express";

import {
  getChats,
  sendMessage,
  createComplaint,
  submitAccountSale,
  // new handlers
  sendChat,
  createTicket,
  resolveTicket,
  markBought,
  markDeclined,
  requestProfileApproval
} from "../controllers/supportController.js";

const router = express.Router();

// existing
router.get("/chats", getChats);
router.post("/message", sendMessage);
router.post("/complaint", createComplaint);
router.post("/sell", submitAccountSale);

// new: routes matching frontend placeholders
router.post("/chat", sendChat); // frontend posts to /api/support/chat
router.post("/tickets", createTicket); // frontend posts to /api/support/tickets
router.post("/tickets/resolve", resolveTicket);
router.post("/sell/mark-bought", markBought);
router.post("/sell/mark-declined", markDeclined);
router.post("/profile/request-approval", requestProfileApproval);

export default router;
