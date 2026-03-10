import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  productId: mongoose.Schema.Types.ObjectId,
  quantity: Number,
});

export default mongoose.model("Order", orderSchema);
