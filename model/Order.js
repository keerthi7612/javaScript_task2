import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    items: [
      {
        productId: mongoose.Schema.Types.ObjectId,
        quanity: Number,
      },
    ],
    totalAmount: Number,
    paymentId: String,
    status: { type: String, default: "PLACED" },
  },
  { timestamps: true },
);

export default mongoose.model("Order", orderSchema);
