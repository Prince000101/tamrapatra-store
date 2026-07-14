import Order from "../models/Order.js";
import Product from "../models/Product.js";

/* ================= CREATE ORDER ================= */

export const createOrder = async (req, res) => {
  try {
    const { orderItems, shippingAddress, paymentMethod } = req.body;

    if (!orderItems || orderItems.length === 0) {
      return res.status(400).json({ message: "No order items" });
    }

    if (!shippingAddress || !paymentMethod) {
      return res.status(400).json({ message: "Missing shipping address or payment method" });
    }

    let calculatedTotal = 0;
    const items = [];
    for (const item of orderItems) {
      const product = await Product.findById(item.product);
      if (!product) {
        return res.status(400).json({ message: `Product ${item.product} not found` });
      }
      if (product.countInStock < item.qty) {
        return res.status(400).json({ message: `Insufficient stock for ${product.name}` });
      }
      items.push({
        product: product._id,
        name: product.name,
        image: product.image,
        price: product.price,
        qty: item.qty,
      });
      calculatedTotal += product.price * item.qty;
    }

    const order = new Order({
      user: req.user._id,
      orderItems: items,
      shippingAddress,
      paymentMethod,
      totalPrice: calculatedTotal,
    });

    const createdOrder = await order.save();

    res.status(201).json(createdOrder);
  } catch (error) {
    console.error("CREATE ORDER ERROR:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

/* ================= GET USER ORDERS ================= */

export const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id });
    res.json(orders);
  } catch (error) {
    console.error("GET MY ORDERS ERROR:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

/* ================= GET ALL ORDERS (ADMIN) ================= */

export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user", "name email")
      .sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    console.error("GET ALL ORDERS ERROR:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

/* ================= GET ORDER BY ID ================= */

export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate("user", "name email");

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    if (order.user._id.toString() !== req.user._id.toString() && !req.user.isAdmin) {
      return res.status(403).json({ message: "Not authorized to view this order" });
    }

    res.json(order);
  } catch (error) {
    console.error("GET ORDER BY ID ERROR:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

/* ================= MARK DELIVERED ================= */

export const markOrderDelivered = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    order.isDelivered = true;
    order.deliveredAt = Date.now();

    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } catch (error) {
    console.error("MARK DELIVERED ERROR:", error);
    res.status(500).json({ message: "Server Error" });
  }
};