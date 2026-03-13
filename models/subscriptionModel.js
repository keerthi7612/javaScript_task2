import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  plan: String,
  expiryDate: Date,
  status: {
    type: String,
    default: "active",
  },
  serviceActive: {
    type: Boolean,
    default: true,
  },
});

export default mongoose.model("Subscription", subscriptionSchema);
