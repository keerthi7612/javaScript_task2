import mongoose from "mongoose";

const schemaProduct = mongoose.Schema({
  name: String,
  price: Number,
  category: String,
  stock: Number,
  rating: Number,
});

export default mongoose.model("Product", schemaProduct);
