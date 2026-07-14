import express from "express";
import { protect, admin } from "../middleware/authMiddleware.js";
import {
  createOrder,
  getMyOrders,
  getAllOrders,
  getOrderById,
  markOrderDelivered,
} from "../controllers/orderController.js";

const router = express.Router();

/* =========================
   USER ROUTES
   ========================= */

// @route   POST /api/orders
router.post("/", protect, createOrder);

// @route   GET /api/orders/myorders
// 🔥 Placed ABOVE /:id so Express doesn't mistake "myorders" for an ID
router.get("/myorders", protect, getMyOrders);


/* =========================
   ADMIN ROUTES
   ========================= */

// @route   GET /api/orders/admin
// 🔥 Placed ABOVE /:id so Express doesn't mistake "admin" for an ID
router.get("/admin", protect, admin, getAllOrders);


/* =========================
   DYNAMIC ID ROUTES (Must be at the bottom)
   ========================= */

// @route   GET /api/orders/:id
router.get("/:id", protect, getOrderById);

// @route   PUT /api/orders/:id/deliver
router.put("/:id/deliver", protect, admin, markOrderDelivered);

export default router;