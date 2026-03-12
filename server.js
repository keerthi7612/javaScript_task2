import express from "express";
import dotevn from "dotenv";
import connectDB from "./config/db.js";

import userRoutes from "./routes/userRoutes.js";
import subscriptionRoutes from "./routes/subscriptionRoutes.js";

import "./jobs/subscriptionChecker.js";

dotevn.config();
const app = express();
app.use(express.json());
connectDB();

app.use("/user", userRoutes);
app.use("/subscription", subscriptionRoutes);

const PORT = process.env.Port;
app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
