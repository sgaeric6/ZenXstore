import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import accountRoutes from "./routes/accounts.js";
import orderRoutes from "./routes/orders.js";
import paymentRoutes from "./routes/payments.js";
import supportRoutes from "./routes/support.js";
import adminRoutes from "./routes/admin.js";
import listingRoutes from "./routes/listings.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/accounts", accountRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/support", supportRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/listings", listingRoutes);

app.get("/", (req, res) => {
  res.json({
    success: true,
    name: "ZenXStore API",
    version: "1.0.0",
    status: "Running",
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`ZenXStore API running on port ${PORT}`);
});
