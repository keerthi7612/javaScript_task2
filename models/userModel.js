import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  serviceActive: {
    type: Boolean,
    default: false,
  },
});

export default mongoose.model("User", userSchema);
