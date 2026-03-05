import mongoose from "mongoose";

const schemaUser = mongoose.Schema({
  name: String,
  age: Number,
  role: String,
  active: Boolean,
  salary: Number,
});

export default mongoose.model("User", schemaUser);
