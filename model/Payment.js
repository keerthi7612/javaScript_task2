import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
  {
    orderId: mongoose.Schema.Types.ObjectId,
    amount: Number,
    status: String,
    transactionId: String,
  },
  { timestamps: true },
);

export default mongoose.model("Payment", paymentSchema);
