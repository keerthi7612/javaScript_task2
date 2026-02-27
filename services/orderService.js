import Cart from "../model/Cart.js";
import Order from "../model/Order.js";
import Product from "../model/Product.js";
import Payment from "../model/Payment.js";

import { calculateTotal } from "../utils/calculationTotal.js";
import { sendEmail } from "../utils/sendEmail.js";

export const placeOrder = async (userId) => {
  const cart = await Cart.findOne({ userId }).populate("items.productId");

  if (!cart || cart.items.length === 0) {
    throw new Error("Cart is empty");
  }

  for (const item of cart.items) {
    if (item.productId.stock < item.quantity) {
      throw new Error(`Insufficient stock for ${item.productId.name}`);
    }
  }

  const totalAmount = calculateTotal(cart.items);

  const payment = await Payment.create({
    amount: totalAmount,
    status: "SUCCESS",
    transactionId: "TXN123",
  });

  const order = await Order.create({
    userId,
    items: cart.items,
    totalAmount,
    paymentId: payment._id,
  });

  await Promise.all(
    cart.items.map((item) =>
      Product.findByIdAndUpdate(item.productId._id, {
        $inc: { stock: -item.quantity },
      }),
    ),
  );

  await Cart.updateOne({ userId }, { items: [] });

  // Send email (background)
  sendEmail("customer@email.com", "Order Confirmed", `Order ${order._id}`);

  return order;
};
