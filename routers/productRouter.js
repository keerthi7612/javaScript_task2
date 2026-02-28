import express from "express";
import { createProduct, getProducts } from "../controllers/productContoller.js";

const router = express.Router();

// Create product
router.post("/create", createProduct);

// Get all products
router.get("/getProduct", getProducts);

export default router;
