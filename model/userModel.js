import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  orderID: Number,
  customerName: String,
  amount: Number,
  paymentStatus: String,
  city: String,
});

const Order = mongoose.model("Order", orderSchema);
export default Order;
