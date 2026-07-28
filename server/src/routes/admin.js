import express from "express";

import {
  dashboard,
  approveRefund,
  approveSupport,
  uploadListing
} from "../controllers/adminController.js";

const router = express.Router();

router.get("/dashboard", dashboard);

router.post("/refund/:id", approveRefund);

router.post("/support/:id", approveSupport);

router.post("/listing", uploadListing);

export default router;
