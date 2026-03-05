import express from "express";
import userController from "../controllers/userController.js";

const router = express.Router();

router.post("/create", userController.createUser);
router.get("/get", userController.getUser);
router.get("/activeUser", userController.activeUser);
router.get("/getByRole/:role", userController.useByRole);
router.get("/getAdult", userController.getAdult);
router.get("/search", userController.searchUsers);

export default router;
