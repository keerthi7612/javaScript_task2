import express from "express";
import dotevn from "dotenv";
import connectDB from "./config/db.js";
import userRouter from "./routes/userRouters.js";

dotevn.config();
const app = express();
app.use(express.json());
connectDB();

app.use("/api/user", userRouter);

const PORT = process.env.Port;
app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
