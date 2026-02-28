import Product from "../model/Product.js";

// ➕ Create Product
export const createProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// 📄 Get All Products
export const getProducts = async (req, res) => {
  const products = await Product.find();
  res.json(products);
};
