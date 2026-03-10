import Product from "../models/productModel.js";

const createProduct = async (req, res) => {
  const { name, stock, price } = req.body;

  try {
    const product = await Product.create({ name, stock, price });
    res.json({ message: "Product created", product });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export { createProduct };
