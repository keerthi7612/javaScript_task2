import express from "express";

import { auth } from "../middleware/authMiddleware.js";
import { placeOrderContorller } from "../controllers/ordercontroller.js";

const router = express.Router();
router.post("/place", auth, placeOrderContorller);

export default router;
