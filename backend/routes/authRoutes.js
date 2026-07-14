import express from "express";
import rateLimit from "express-rate-limit";
import {
  registerUser,
  loginUser,
  getAllUsers,
} from "../controllers/authController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  message: { message: "Too many requests. Try again later." },
  standardHeaders: true,
  legacyHeaders: false,
});

const router = express.Router();

/* ==========================
   AUTH ROUTES
========================== */

// Register
router.post("/register", authLimiter, registerUser);

// Login
router.post("/login", authLimiter, loginUser);

/* ==========================
   ADMIN ROUTES
========================== */

// Get all users (admin only)
router.get("/users", protect, admin, getAllUsers);

export default router;