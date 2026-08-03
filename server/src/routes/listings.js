import express from "express";
import authenticate, { requireAdmin } from "../middleware/auth.js";

import {
  getListings,
  getListing,
  createListing,
  updateListing,
  deleteListing
} from "../controllers/listingController.js";

const router = express.Router();

router.get("/", getListings);

router.get("/:id", getListing);

// Protected admin routes for creating/updating/deleting listings
router.post("/", authenticate, requireAdmin, createListing);

router.put("/:id", authenticate, requireAdmin, updateListing);

router.delete("/:id", authenticate, requireAdmin, deleteListing);

export default router;
