import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log("DB Connected");
  } catch (err) {
    console.error("DB Error:", err);
    process.exit(1);
  }
};
