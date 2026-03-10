import mongoose from "mongoose";
import Product from "../models/productModel.js";
import Order from "../models/orderModel.js";
import User from "../models/userModel.js";

const placeOrder = async (req, res) => {
  const { userId, productId } = req.body;

  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const product = await Product.findById(productId).session(session);
    if (!product) {
      throw new Error("Product not found");
    }

    await User.updateOne(
      { _id: userId },
      { $inc: { balance: -product.price } },
      { session },
    );

    await Product.updateOne(
      { _id: productId },
      { $inc: { stock: -1 } },
      { session },
    );

    await Order.create([{ userId, productId, quantity: 1 }], { session });

    await session.commitTransaction();

    res.json({ message: "Order placed successfully" });
  } catch (error) {
    await session.abortTransaction();

    res.json({ message: "Order failed" });
  } finally {
    session.endSession();
  }
};

export { placeOrder };
