import mongoose from "mongoose";
import User from "../models/userModel.js";
import walletTransaction from "../models/walletTransactionModel.js";

export const rechargeWallet = async (req, res) => {
  const { userId, amount, transactionId } = req.body;
  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    const existing = await walletTransaction
      .findOne({ transactionId: transactionId })
      .session(session);

    if (existing) {
      throw new Error("Duplication recharge request");
    }

    const user = await User.findById(userId).session(session);
    if (!user) {
      await session.abortTransaction();
      return res.status(404).json({ message: "User not found" });
    }
    user.balance += amount;
    await user.save({ session });

    if (amount > 5000) {
      throw new Error("Recharge limit exceeded");
    }

    await walletTransaction.create(
      [
        {
          userId: userId,
          amount: amount,
          type: "recharge",
          transactionId: transactionId,
        },
      ],
      { session },
    );

    if (amount >= 1000) {
      const cashback = amount * 0.05;
      user.balance += cashback;
      await user.save({ session });

      await walletTransaction.create(
        [
          {
            userId: userId,
            amount: cashback,
            type: "cashback",
            transactionId: transactionId + "_cashback",
          },
        ],
        { session },
      );
      return res.json({ message: "you won the cash back" });
    }
    await session.commitTransaction();
    res.json({ message: "wallet recharged successfully" });
  } catch (error) {
    await session.abortTransaction();
    console.error("Recharge failed with error:", error);
    res.status(500).json({ message: "Recharge failed", error: error.message });
  } finally {
    session.endSession();
  }
};
