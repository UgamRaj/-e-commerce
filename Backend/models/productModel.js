import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  // id: { type: Number, required: true },
  title: { type: String, required: true },
  image: { type: String },
  category: { type: String, required: true },
  newPrice: { type: Number, required: true },
  oldPrice: { type: Number, required: true },
  date: { type: Date, default: Date.now },
  available: { type: Boolean, default: true },
});

const ProductModel = mongoose.model("Products", productSchema);

export default ProductModel;
