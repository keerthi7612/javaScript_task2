import mongoose from "mongoose";

const connectDB = async (req, res) => {
  try {
    mongoose.connect("mongodb://localhost:27017/task2");
    console.log("mongoDB is connect to the server");
  } catch (error) {
    console.log(error);
  }
};

export default connectDB;
