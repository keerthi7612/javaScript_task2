import express from "express";
import router from "./routers/userData.js";
import connectDB from "./mongoDB.js";
const app = express();
app.use(express.json());
const PORT = 3000;

app.use("/api", router);

connectDB();
app.listen(PORT, () => {
  console.log(`server is running on ${PORT}`);
});
