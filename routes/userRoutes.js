import express from "express";
import { createUser, getUser } from "../controllers/userController.js";

const router = express.Router();

router.post("/create", createUser);
router.get("/getUser", getUser);

export default router;
