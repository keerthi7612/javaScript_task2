import express from "express";
import { auth } from "../middleware/authMiddleware.js";
import {
  addToCartController,
  getCartController,
  removeItemController,
  clearCartController,
} from "../controllers/cartController.js";

const router = express.Router();

// Add item
router.post("/add", auth, addToCartController);

// View cart
router.get("/", auth, getCartController);

// Remove item
router.delete("/:productId", auth, removeItemController);

// Clear cart
router.delete("/clear/all", auth, clearCartController);

export default router;
