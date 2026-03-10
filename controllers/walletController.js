import mongoose from "mongoose";
import User from "../models/userModel.js";

const transforMoney = async (req, res) => {
  const { sender, receiver, amount } = req.body;

  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    await User.updateOne(
      { name: sender },
      { $inc: { balance: -amount } },
      { session },
    );

    await User.updateOne(
      { name: receiver },
      { $inc: { balance: amount } },
      { session },
    );

    await session.commitTransaction();

    //  await User.save({ session });

    res.json({ message: "Transfer successful" });
  } catch (error) {
    await session.abortTransaction();

    res.json({ message: "Transaction failed" });
  } finally {
    session.endSession();
  }
};
export { transforMoney };
