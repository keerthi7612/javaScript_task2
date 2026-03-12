import express from "express";
import {
  createSubscription,
  getSubscription,
} from "../controllers/subscriptionController.js";

const router = express.Router();

router.post("/activeSub", createSubscription);
router.get("/getSub", getSubscription);

export default router;
