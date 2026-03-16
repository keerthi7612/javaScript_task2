import express from "express";
import dotevn from "dotenv";
import morgan from "morgan";
import logger from "./utils/logger.js";
import connectDB from "./config/db.js";

import userRoutes from "./routes/userRoutes.js";
import subscriptionRoutes from "./routes/subscriptionRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";

import "./jobs/subscriptionChecker.js";

dotevn.config();
const app = express();
app.use(express.json());

app.use(morgan("combined"));

connectDB();

app.use("/user", userRoutes);
app.use("/subscription", subscriptionRoutes);
app.use("/payment", paymentRoutes);

const PORT = process.env.Port;
app.listen(PORT, () => {
  const message = `Server running on port ${PORT}`;
  console.log(message);
  logger.info(message);
});
