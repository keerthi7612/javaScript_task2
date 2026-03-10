import mongoose from "mongoose";

const schemaProduct = mongoose.Schema({
  name: String,
  stock: Number,
  price: Number,
});

export default mongoose.model("Product", schemaProduct);
