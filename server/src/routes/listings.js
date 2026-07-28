import express from "express";

import auth from "../middleware/auth.js";

import {
  getListings,
  createListing,
  updateListing,
  deleteListing
} from "../controllers/listingController.js";

const router = express.Router();

router.get("/", getListings);

router.post("/", auth, createListing);

router.put("/:id", auth, updateListing);

router.delete("/:id", auth, deleteListing);

export default router;
