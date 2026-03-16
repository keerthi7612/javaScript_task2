import Subscription from "../models/subscriptionModel.js";
import User from "../models/userModel.js";
import logger from "../utils/logger.js";
import { redisCache } from "../utils/redis.js";

export const createSubscription = async (req, res) => {
  try {
    const { userId, plan, expiryDate } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      logger.warn(`Subscription creation failed: User ${userId} not found`);
      return res.status(404).json({ message: "User not found" });
    }

    const subscription = await Subscription.create({
      userId,
      plan,
      expiryDate,
    });

    await User.findByIdAndUpdate(
      userId,
      { serviceActive: true },
      { new: true },
    );

    redisCache.set(`subscription:${subscription._id}`, subscription, 3600);

    redisCache.delete("subscriptions:all");

    logger.info(
      `Subscription created: Plan=${plan}, User=${userId}, Expiry=${expiryDate}`,
    );

    res.status(201).json({
      message: "Subscription created successfully",
      data: subscription,
    });
  } catch (error) {
    logger.error(`Subscription creation error: ${error.message}`);
    res.status(500).json({ message: error.message });
  }
};

export const getSubscription = async (req, res) => {
  try {
    const cachedSubs = redisCache.get("subscriptions:all");
    if (cachedSubs) {
      return res.status(200).json({
        data: cachedSubs,
        source: "cache",
      });
    }
    const subs = await Subscription.find().populate("userId");
    redisCache.set("subscriptions:all", subs, 1800);

    logger.info(`Fetched ${subs.length} subscriptions from database`);

    res.status(200).json({
      data: subs,
      source: "database",
    });
  } catch (error) {
    logger.error(`Get subscriptions error: ${error.message}`);
    res.status(500).json({ message: error.message });
  }
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

    if (!subscription) {
      logger.warn(`Subscription update failed: Subscription ${id} not found`);
      return res.status(404).json({ message: "Subscription not found" });
    }

    redisCache.set(`subscription:${id}`, subscription, 3600);

    redisCache.delete("subscriptions:all");

    logger.info(
      `Subscription updated: ID=${id}, Plan=${plan}, Expiry=${expiryDate}`,
    );

    res.status(200).json({
      message: "Subscription updated successfully",
      data: subscription,
    });
  } catch (error) {
    logger.error(`Subscription update error: ${error.message}`);
    res.status(500).json({ message: error.message });
  }
};

export const deleteSubscription = async (req, res) => {
  const { id } = req.params;

  try {
    const subscription = await Subscription.findById(id);

    if (!subscription) {
      logger.warn(`Subscription deletion failed: Subscription ${id} not found`);
      return res.status(404).json({ message: "Subscription not found" });
    }

    await User.findByIdAndUpdate(subscription.userId, {
      serviceActive: false,
    });

    await Subscription.findByIdAndDelete(id);

    // Remove from cache
    redisCache.delete(`subscription:${id}`);

    // Invalidate subscriptions list cache
    redisCache.delete("subscriptions:all");

    logger.info(`Subscription deleted: ID=${id}, User=${subscription.userId}`);

    res.status(200).json({
      message: "Subscription deleted successfully",
      deletedSubscriptionId: id,
    });
  } catch (error) {
    logger.error(`Subscription deletion error: ${error.message}`);
    res.status(500).json({ message: error.message });
  }
};

// Get cache status (for testing)
export const getCacheStatus = (req, res) => {
  const stats = redisCache.getStats();
  res.status(200).json({
    message: "Cache status",
    data: stats,
  });
};

// Clear all cache (for testing)
export const clearCache = (req, res) => {
  redisCache.clear();
  res.status(200).json({
    message: "Cache cleared successfully",
  });
};
