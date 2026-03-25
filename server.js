import express from "express";
import dotenv from "dotenv";
import emailRoutes from "./routes/emailRoutes.js";

dotenv.config();

const app = express();

app.use(express.json());

app.use("/api", emailRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
