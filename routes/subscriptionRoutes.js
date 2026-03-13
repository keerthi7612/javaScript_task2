import express from "express";
import {
  createSubscription,
  getSubscription,
  updateSubscription,
  deleteSubscription,
} from "../controllers/subscriptionController.js";

const router = express.Router();

router.post("/activeSub", createSubscription);
router.get("/getSub", getSubscription);
router.put("/:id", updateSubscription);
router.delete("/:id", deleteSubscription);

export default router;
