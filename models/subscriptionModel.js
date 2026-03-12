import mongoose from "mongoose";
import mongose from "mongoose";

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
});

export default mongoose.model("Subscription", subscriptionSchema);
