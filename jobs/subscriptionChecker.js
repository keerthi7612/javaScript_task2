import cron from "node-cron";
import Subscription from "../models/subscriptionModel.js";
import User from "../models/userModel.js";

cron.schedule("*/1 * * * *", async () => {
  const expiredSubs = await Subscription.find({
    expiryDate: { $lt: new Date() },
    status: "active",
  });

  for (let sub of expiredSubs) {
    sub.status = "expired";
    sub.serviceActive = false;
    await sub.save();

    await User.findByIdAndUpdate(sub.userId, { serviceActive: false });
    console.log("Subscription marked as expired:", sub._id);
  }
});

cron.schedule("0 2 * * *", async () => {
  console.log("Running cleanup: deleting old expired subscriptions...");

  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

  const oldExpiredSubs = await Subscription.find({
    status: "expired",
    expiryDate: { $lt: thirtyDaysAgo },
  });

  for (let sub of oldExpiredSubs) {
    await Subscription.findByIdAndDelete(sub._id);
    console.log("Deleted old expired subscription:", sub._id);
  }

  console.log(
    `Cleanup complete. Deleted ${oldExpiredSubs.length} subscriptions.`,
  );
});
