import Product from "../models/Product.js";

/* =========================
   GET ALL PRODUCTS
========================= */

export const getProducts = async (req, res) => {
  try {
    const brand = process.env.BRAND_NAME || "Tamrapatra";
    const products = await Product.find({ brand });

    res.json(products);
  } catch (error) {
    console.error("GET PRODUCTS ERROR:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

/* =========================
   GET SINGLE PRODUCT
========================= */

export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    res.json(product);
  } catch (error) {
    console.error("GET PRODUCT BY ID ERROR:", error);
    res.status(500).json({
      message: "Server Error",
    });
  }
};

/* =========================
   CREATE PRODUCT
========================= */

export const createProduct = async (req, res) => {
  try {
    const product = await Product.create({
      name: req.body.name,
      image: req.body.image,
      description: req.body.description,
      category: req.body.category,
      price: req.body.price,
      countInStock: req.body.countInStock,
    });

    res.status(201).json(product);
  } catch (error) {
    console.error("CREATE PRODUCT ERROR:", error);
    res.status(500).json({
      message: "Server Error",
    });
  }
};

/* =========================
   UPDATE PRODUCT
========================= */

export const updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    if (req.body.name !== undefined) {
      product.name = req.body.name;
    }

    if (req.body.image !== undefined) {
      product.image = req.body.image;
    }

    if (req.body.description !== undefined) {
      product.description = req.body.description;
    }

    if (req.body.category !== undefined) {
      product.category = req.body.category;
    }

    if (req.body.price !== undefined) {
      product.price = req.body.price;
    }

    if (req.body.countInStock !== undefined) {
      product.countInStock = req.body.countInStock;
    }

    const updatedProduct = await product.save();

    res.json(updatedProduct);
  } catch (error) {
    console.error("UPDATE PRODUCT ERROR:", error);
    res.status(500).json({
      message: "Server Error",
    });
  }
};

/* =========================
   DELETE PRODUCT
========================= */

export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    await product.deleteOne();

    res.json({
      message: "Product deleted successfully",
    });
  } catch (error) {
    console.error("DELETE PRODUCT ERROR:", error);
    res.status(500).json({
      message: "Server Error",
    });
  }
};