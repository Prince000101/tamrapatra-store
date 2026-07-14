import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import apiLimiter from "./middleware/rateLimiter.js";

import connectDB from "./config/db.js";

// Routes
import productRoutes from "./routes/productRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import wishlistRoutes from "./routes/WishlistRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import couponRoutes from "./routes/couponRoutes.js";
import reviewRoutes from "./routes/reviewRoutes.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.disable("x-powered-by");

app.set("trust proxy", 1);

/* ==========================
   CORS CONFIG
========================== */

const ALLOWED_ORIGIN = process.env.CLIENT_URL || "http://localhost:5173";

app.use(
  cors({
    origin: ALLOWED_ORIGIN,
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

/* ==========================
   BODY PARSER (with size limits)
========================== */

app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: "10kb" }));

/* ==========================
   GLOBAL RATE LIMITER
========================== */

app.use("/api/", apiLimiter);

/* ==========================
   SECURITY HEADERS
========================== */

app.use((req, res, next) => {
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("X-Frame-Options", "DENY");
  res.setHeader("X-XSS-Protection", "1; mode=block");
  res.setHeader("Strict-Transport-Security", "max-age=31536000; includeSubDomains");
  res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
  res.setHeader("Content-Security-Policy", "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' https:; connect-src 'self' https:; worker-src 'self' blob:");
  res.setHeader("Permissions-Policy", "camera=(), microphone=(), geolocation=()");
  next();
});

/* ==========================
   ROOT ROUTE
========================== */

app.get("/", (req, res) => {
  res.json({
    message: "Tamrapatra API Running 🏛️",
    status: "healthy",
  });
});

/* ==========================
   API ROUTES
========================== */

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/wishlist", wishlistRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/coupons", couponRoutes);
app.use("/api/reviews", reviewRoutes);

/* ==========================
   STATIC FILES (production build)
========================== */

app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(express.static(path.join(__dirname, "../frontend/dist")));

/* ==========================
   404 HANDLER — API routes
========================= */

app.use("/api/*", (req, res) => {
  res.status(404).json({
    message: `Route not found: ${req.originalUrl}`,
  });
});

/* ==========================
   SPA catch-all (production)
========================== */

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
});

/* ==========================
   SERVER START
========================= */

const PORT = process.env.PORT || 5002;

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`✅ Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Failed to connect to database:", err);
    process.exit(1);
  });