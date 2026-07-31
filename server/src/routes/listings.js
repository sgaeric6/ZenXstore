import express from "express";
import adminKey from "../middleware/adminKey.js";
import multer from "multer";
import path from "path";

import {
  getListings,
  getListing,
  createListing,
  updateListing,
  deleteListing
} from "../controllers/listingController.js";

const router = express.Router();

// configure multer to store uploaded files in server/src/uploads
const uploadsDir = path.join(process.cwd(), "server", "src", "uploads");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadsDir);
  },
  filename: function (req, file, cb) {
    const unique = `${Date.now()}-${Math.random().toString(36).substring(2, 8)}-${file.originalname.replace(/\s+/g, "-")}`;
    cb(null, unique);
  }
});
const upload = multer({ storage });

router.get("/", getListings);

router.get("/:id", getListing);

// protected by adminKey middleware (ADMIN_KEY env) for simple admin access without full auth
router.post("/", adminKey, upload.array("images", 8), createListing);

router.put("/:id", adminKey, upload.array("images", 8), updateListing);

router.delete("/:id", adminKey, deleteListing);

export default router;
