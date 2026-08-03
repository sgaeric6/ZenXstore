import jwt from "jsonwebtoken";
import prisma from "../config/prisma.js";

export const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization || req.cookies?.token;
    if (!authHeader) return res.status(401).json({ success: false, message: "Missing auth" });

    const token = authHeader.startsWith("Bearer ") ? authHeader.split(" ")[1] : authHeader;
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    if (!payload || !payload.id) return res.status(401).json({ success: false, message: "Invalid token" });

    const user = await prisma.user.findUnique({ where: { id: payload.id } });
    if (!user) return res.status(401).json({ success: false, message: "User not found" });

    req.user = { id: user.id, role: user.role };
    return next();
  } catch (err) {
    console.error("auth error", err);
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }
};

export const requireAdmin = (req, res, next) => {
  if (!req.user) return res.status(401).json({ success: false, message: "Unauthorized" });
  if (req.user.role !== "ADMIN") return res.status(403).json({ success: false, message: "Forbidden" });
  return next();
};

// default export for legacy route imports
export default authenticate;
