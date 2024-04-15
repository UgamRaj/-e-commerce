import mongoose from "mongoose";

const cartProduct = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  quantity: {
    type: Number,
    default: 1,
  },
  newPrice: {
    type: Number,
    default: 0,
  },
});

const cartSchema = new mongoose.Schema({
  products: {
    type: [cartProduct],
  },
  cartTotal: {
    type: Number,
    required: false,
    default: 0,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
});

const CartModel = mongoose.model("productcart", cartSchema);

export default CartModel;
