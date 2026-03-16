import express from "express";
import {
  createSubscription,
  getSubscription,
  updateSubscription,
  deleteSubscription,
  getCacheStatus,
  clearCache,
} from "../controllers/subscriptionController.js";
import { validateSubscription } from "../middleware/validateSubscription.js";

const router = express.Router();

router.post("/activeSub", validateSubscription, createSubscription);
router.get("/getSub", getSubscription);
router.put("/:id", validateSubscription, updateSubscription);
router.delete("/:id", deleteSubscription);

// Cache endpoints for testing
router.get("/cache/status", getCacheStatus);
router.delete("/cache/clear", clearCache);

export default router;
