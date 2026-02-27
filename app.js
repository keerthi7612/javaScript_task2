import express from "express";
import connectDB from "./config/mongoDB.js";
import orderRouter from "./routers/orderRouter.js";
import authRouter from "./routers/authRouter.js";
const app = express();

app.use(express.json());
const PORT = 3000;

app.use("/api/auth", authRouter);
app.use("/api/orders", orderRouter);

connectDB();
app.listen(PORT, () => {
  console.log(`server is running on ${PORT}`);
});
