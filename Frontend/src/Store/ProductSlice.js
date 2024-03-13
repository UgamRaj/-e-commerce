import { createSlice } from "@reduxjs/toolkit";
import all_product from "../assets/all_product";

const getDefaultCard = () => {
  let cart = {};
  for (let i = 0; i < all_product.length + 1; i++) {
    cart[i] = 0;
  }
  return cart;
};

export const ProductSlice = createSlice({
  name: "product",
  initialState: { cartItems: getDefaultCard() },
  reducers: {
    addToCart: (state, action) => {
      const productId = action.payload;
      return {
        ...state,
        cartItems: {
          ...state.cartItems,
          [productId]: state.cartItems[productId] + 1,
        },
      };
    },
    removeFromCart: (state, action) => {
      const productId = action.payload;
      return {
        ...state,
        cartItems: {
          ...state.cartItems,
          [productId]: state.cartItems[productId] - 1,
        },
      };
    },
    getTotalCartAmount: (state) => {
      let totalAmount = 0;
      for (const item in state.cartItems) {
        if (state.cartItems[item] > 0) {
          let itemInfo = all_product.find((product) => product.id === +item);
          totalAmount += itemInfo.new_price * state.cartItems[item];
        }
      }
      return totalAmount;
    },
    getTotalCartItems: (state) => {
      let totalItem = 0;
      for (const item in state.cartItems) {
        if (state.cartItems[item] > 0) {
          totalItem += state.cartItems[item];
        }
      }
      return totalItem;
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  // getTotalCartAmount,
  // getTotalCartItems,
} = ProductSlice.actions;
export default ProductSlice.reducer;
