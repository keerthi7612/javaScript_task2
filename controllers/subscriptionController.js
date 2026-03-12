import Subscription from "../models/subscriptionModel.js";
import User from "../models/userModel.js";

export const createSubscription = async (req, res) => {
  const { userId, plan, expiryDate } = req.body;

  const subscription = await Subscription.create({
    userId,
    plan,
    expiryDate,
  });
  await User.findByIdAndUpdate(userId, { serviceActive: true }, { new: true });
  res.json(subscription);
};

export const getSubscription = async (req, res) => {
  const subs = await Subscription.find().populate("userId");
  res.json(subs);
};
