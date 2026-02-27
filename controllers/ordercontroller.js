import { placeOrder } from "../services/orderService.js";

export const placeOrderContorller = async (req, res) => {
  try {
    const order = await placeOrder(req.user.id);
    res.status(201).json(order);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
