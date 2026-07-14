import express from "express";
import { protect, admin } from "../middleware/authMiddleware.js";

import User from "../models/User.js";
import Product from "../models/Product.js";
import Order from "../models/Order.js";

const router = express.Router();

/* =========================
   ADMIN DASHBOARD STATS
========================= */

router.get("/dashboard", protect, admin, async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalProducts = await Product.countDocuments();
    const totalOrders = await Order.countDocuments();

    const allOrders = await Order.find();
    const revenue = allOrders.reduce(
      (acc, order) => acc + (order.totalPrice || 0),
      0
    );

    const paidOrders = allOrders.filter((o) => o.isPaid).length;
    const deliveredOrders = allOrders.filter((o) => o.isDelivered).length;

    res.json({
      users: totalUsers,
      products: totalProducts,
      orders: totalOrders,
      revenue,
      paidOrders,
      deliveredOrders,
    });
  } catch (error) {
    console.error("ADMIN ROUTE ERROR:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

/* =========================
   RECENT ORDERS
========================= */

router.get("/recent-orders", protect, admin, async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user", "name email")
      .sort({ createdAt: -1 })
      .limit(5);

    res.json(orders);
  } catch (error) {
    console.error("ADMIN ROUTE ERROR:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

/* =========================
   TOP SELLING PRODUCTS
========================= */

router.get("/top-products", protect, admin, async (req, res) => {
  try {
    const orders = await Order.find();

    const productSales = {};

    for (const order of orders) {
      for (const item of order.orderItems) {
        const id = item.product.toString();
        if (!productSales[id]) {
          productSales[id] = {
            productId: id,
            name: item.name,
            image: item.image,
            totalSold: 0,
            revenue: 0,
          };
        }
        productSales[id].totalSold += item.qty;
        productSales[id].revenue += item.price * item.qty;
      }
    }

    const topProducts = Object.values(productSales)
      .sort((a, b) => b.totalSold - a.totalSold)
      .slice(0, 5);

    res.json(topProducts);
  } catch (error) {
    console.error("ADMIN ROUTE ERROR:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

/* =========================
   LOW STOCK PRODUCTS
========================= */

router.get("/low-stock", protect, admin, async (req, res) => {
  try {
    const products = await Product.find({ countInStock: { $lte: 10 } }).sort({
      countInStock: 1,
    });
    res.json(products);
  } catch (error) {
    console.error("ADMIN ROUTE ERROR:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

/* =========================
   PRODUCT STATS (cart + wishlist counts)
========================= */

router.get("/product-stats", protect, admin, async (req, res) => {
  try {
    const users = await User.find({}, "cart Wishlist");

    const cartCounts = {};
    const wishlistCounts = {};

    for (const user of users) {
      const seen = new Set();
      for (const item of user.cart) {
        const id = item.product.toString();
        if (!seen.has(id)) {
          cartCounts[id] = (cartCounts[id] || 0) + 1;
          seen.add(id);
        }
      }

      for (const productId of user.Wishlist) {
        const id = productId.toString();
        wishlistCounts[id] = (wishlistCounts[id] || 0) + 1;
      }
    }

    const products = await Product.find({}, "name price image countInStock");

    const stats = products.map((p) => ({
      _id: p._id,
      name: p.name,
      price: p.price,
      image: p.image,
      countInStock: p.countInStock,
      inCart: cartCounts[p._id.toString()] || 0,
      inWishlist: wishlistCounts[p._id.toString()] || 0,
    }));

    res.json(stats);
  } catch (error) {
    console.error("ADMIN ROUTE ERROR:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

/* =========================
   SALES OVER TIME (last 30 days)
========================= */

router.get("/sales", protect, admin, async (req, res) => {
  try {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const orders = await Order.find({
      createdAt: { $gte: thirtyDaysAgo },
    }).sort({ createdAt: 1 });

    const dailyMap = {};

    for (let i = 0; i < 30; i++) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const key = d.toISOString().split("T")[0];
      dailyMap[key] = { date: key, sales: 0, orders: 0 };
    }

    for (const order of orders) {
      const key = order.createdAt.toISOString().split("T")[0];
      if (dailyMap[key]) {
        dailyMap[key].sales += order.totalPrice || 0;
        dailyMap[key].orders += 1;
      }
    }

    const salesData = Object.values(dailyMap).sort(
      (a, b) => new Date(a.date) - new Date(b.date)
    );

    res.json(salesData);
  } catch (error) {
    console.error("ADMIN ROUTE ERROR:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

export default router;
