import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import noteRoutes from "./routes/noteRoutes.js";

dotenv.config();

const app = express();

app.use(express.json());

connectDB();

app.use("/notes", noteRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
