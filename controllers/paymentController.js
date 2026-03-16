import axios from "axios";
import Payment from "../models/paymentModel.js";
import logger from "../utils/logger.js";

const MOCK_PAYMENT_API = "https://jsonplaceholder.typicode.com/posts";

export const createPayment = async (req, res) => {
  try {
    const { subscriptionId, userId, amount } = req.body;
    const paymentId = `PAY-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

    const payment = await Payment.create({
      subscriptionId,
      userId,
      amount,
      paymentId,
      externalPaymentId: Math.floor(Math.random() * 100) + 1,
      status: "pending",
    });

    logger.info(
      `Payment created: PaymentID=${paymentId}, Amount=${amount}, User=${userId}`,
    );

    res.status(201).json({
      message: "Payment initiated",
      data: {
        paymentId: payment.paymentId,
        amount: payment.amount,
      },
    });
  } catch (error) {
    logger.error(`Payment creation error: ${error.message}`);
    res.status(500).json({ message: error.message });
  }
};
