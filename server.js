import express from "express";
import dotevn from "dotenv";
import connectDB from "./config/db.js";

import walletRoutes from "./routes/walletRoutes.js";
import rechargeWallet from "./routes/walletRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import productRoutes from "./routes/productRoutes.js";

dotevn.config();
const app = express();
app.use(express.json());
connectDB();

app.use("/wallet", walletRoutes);
app.use("/wallet", rechargeWallet);
app.use("/order", orderRoutes);
app.use("/user", userRoutes);
app.use("/product", productRoutes);

const PORT = process.env.Port;
app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
