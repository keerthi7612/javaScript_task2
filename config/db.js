import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.mongoDB);
    console.log("mongoDB is conected to the database");
  } catch (error) {
    console.log(error.message);
  }
};

export default connectDB;
