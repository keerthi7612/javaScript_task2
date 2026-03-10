import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  balance: Number,
});
export default mongoose.model("User", userSchema);
