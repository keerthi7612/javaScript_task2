import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
  subscriptionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Subscription",
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  paymentId: {
    type: String,
    required: true,
    unique: true,
  },
  status: {
    type: String,
    enum: ["pending", "completed", "failed"],
    default: "pending",
  },
  paymentDate: {
    type: Date,
    default: Date.now,
  },
  externalPaymentId: {
    type: String,
  },
});

export default mongoose.model("Payment", paymentSchema);
