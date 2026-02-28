import express from "express";
import connectDB from "./config/mongoDB.js";
import orderRouter from "./routers/orderRouter.js";
import authRouter from "./routers/authRouter.js";
import productRouter from "./routers/productRouter.js";
import cartRouter from "./routers/cartRouter.js";

const app = express();

app.use(express.json());
const PORT = 3000;

app.use("/api/auth", authRouter);
app.use("/api/orders", orderRouter);
app.use("/api/product", productRouter);
app.use("/api/cart", cartRouter);

connectDB();
app.listen(PORT, () => {
  console.log(`server is running on ${PORT}`);
});
