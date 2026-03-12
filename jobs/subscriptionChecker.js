import cron from "node-cron";
import Subscription from "../models/subscriptionModel.js";
import User from "../models/userModel.js";

cron.schedule("*/1 * * * *", async () => {
  console.log("Checking expired subscriptions...");
  const expiredSubs = await Subscription.find({
    expiryDate: { $lt: new Date() },
    status: "active",
  });

  for (let sub of expiredSubs) {
    sub.status = "expired";
    await sub.save();

    await User.findByIdAndUpdate(sub.userId, { serviceActive: false });

    console.log("Subscription expired:", sub.userId);
  }
});
