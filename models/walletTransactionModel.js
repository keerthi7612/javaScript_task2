import mongoose from "mongoose";
const walletTransactionSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  amount: Number,
  type: String,
  transactionId: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("walletTransaction", walletTransactionSchema);
