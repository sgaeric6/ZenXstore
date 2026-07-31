import express from "express";
import adminKey from "../middleware/adminKey.js";

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

// protected by adminKey middleware (ADMIN_KEY env) for simple admin access without full auth
router.post("/", adminKey, createListing);

router.put("/:id", adminKey, updateListing);

router.delete("/:id", adminKey, deleteListing);

export default router;
