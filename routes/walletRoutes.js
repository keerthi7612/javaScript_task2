import express from "express";
import { transforMoney } from "../controllers/walletController.js";
import { rechargeWallet } from "../controllers/walletTransactionController.js";
const router = express.Router();

router.post("/transfer", transforMoney);

//walletTransaction
router.post("/recharge", rechargeWallet);
export default router;
