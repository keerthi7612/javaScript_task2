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

export const updateSubscription = async (req, res) => {
  const { id } = req.params;
  const { plan, expiryDate } = req.body;

  try {
    const subscription = await Subscription.findByIdAndUpdate(
      id,
      { plan, expiryDate },
      { new: true },
    ).populate("userId");

    res.json({
      message: "Subscription updated successfully",
      subscription,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteSubscription = async (req, res) => {
  const { id } = req.params;

  try {
    const subscription = await Subscription.findById(id);

    if (!subscription) {
      return res.status(404).json({ error: "Subscription not found" });
    }

    await User.findByIdAndUpdate(subscription.userId, {
      serviceActive: false,
    });

    await Subscription.findByIdAndDelete(id);

    res.json({
      message: "Subscription deleted successfully",
      deletedSubscriptionId: id,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
