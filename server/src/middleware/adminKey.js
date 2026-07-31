import fs from "fs";
import path from "path";

const __dirname = path.dirname(new URL(import.meta.url).pathname);
const ADMIN_KEY = process.env.ADMIN_KEY || "";

export default function adminKey(req, res, next) {
  const key = req.query.key || req.headers["x-admin-key"];
  if (!ADMIN_KEY) {
    return res.status(500).json({ success: false, message: "ADMIN_KEY not configured on server" });
  }
  if (!key || key !== ADMIN_KEY) {
    return res.status(403).json({ success: false, message: "Missing or invalid admin key" });
  }
  return next();
}
