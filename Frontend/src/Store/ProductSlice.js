import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import all_product from "../assets/all_product";
import axios from "axios";

export const fetchProductsData = createAsyncThunk("allProducts", async () => {
  console.log("action");
  const allProduct = await axios.get(
    "http://localhost:10000/v1/product/allproducts"
  );
  // console.log(allProduct.data);
  const res = await allProduct.data;
  return res;
});

export const getCartData = createAsyncThunk("cartData", async () => {
  const BASR_URL = "http://localhost:10000/v1/cart";
  console.log("cart action");
  try {
    const res = await axios.get(
      BASR_URL,

      {
        headers: {
          // Accept: "application/json",
          authorization: localStorage.getItem("authToken"),
        },
      }
    );
    console.log("res.data.allProducts", res.data.allProducts);
    return await res.data.allProducts.length;
  } catch (error) {
    console.log(error);
    return error;
  }
});

//! Slice for product

export const ProductSlice = createSlice({
  name: "product",
  initialState: {
    allProduct: [],
    cartItems: [],
    allCartProduct: [],
    cartTotal: 0,
  },
  reducers: {
    // getAllProduct: async (state, action) => {
    //   return await getAllProductFromMongodb();
    // },
    fetchDataFromMongoDbStore: async (state = [], { payload }) => {
      const BASR_URL = "http://localhost:10000/v1/cart";
      try {
        const res = await axios.get(
          BASR_URL,

          {
            headers: {
              Accept: "application/json",
              authorization: localStorage.getItem("authToken"),
            },
          }
        );
        console.log(res.data.allProducts);
        state.productCart = res.data.allProducts;
      } catch (error) {
        console.log(error);
        return error;
      }
    },

    addToCart: (state, action) => {
      const product = action.payload;

      // Check if the cart already contains the product
      const matchingProductIndex = state.allCartProduct.findIndex(
        (item) => item._id === product._id
      );

      if (matchingProductIndex !== -1) {
        // If the product already exists in the cart, update its properties
        const updatedCartProducts = [...state.allCartProduct];
        updatedCartProducts[matchingProductIndex] = {
          ...updatedCartProducts[matchingProductIndex],
          quantity: updatedCartProducts[matchingProductIndex].quantity + 1,
          // Assuming newPrice represents the price of the product
          newPrice:
            updatedCartProducts[matchingProductIndex].newPrice +
            product.newPrice,
        };

        return {
          ...state,
          allCartProduct: updatedCartProducts,
        };
      } else {
        // If the product doesn't exist in the cart, add it
        return {
          ...state,
          allCartProduct: [...state.allCartProduct, product],
        };
      }
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
    // getTotalCartAmount: (state) => {
    //   let totalAmount = 0;
    //   for (const item in state.cartItems) {
    //     if (state.cartItems[item] > 0) {
    //       let itemInfo = all_product.find((product) => product.id === +item);
    //       totalAmount += itemInfo.new_price * state.cartItems[item];
    //     }
    //   }
    //   return totalAmount;
    // },
    // getTotalCartItems: (state) => {
    //   let totalItem = 0;
    //   for (const item in state.cartItems) {
    //     if (state.cartItems[item] > 0) {
    //       totalItem += state.cartItems[item];
    //     }
    //   }
    //   return totalItem;
    // },
  },
  extraReducers: (builder) => {
    builder
      // .addCase(fetchProductsData.fulfilled, (state, action) => {
      //   // console.log("reducer", action);
      //   state.allProduct = action.payload;
      // })
      .addCase(fetchProductsData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductsData.fulfilled, (state, action) => {
        state.loading = false;
        state.allProduct = action.payload;
      })
      .addCase(fetchProductsData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      //!  Handle getCartData
      .addCase(getCartData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCartData.fulfilled, (state, action) => {
        state.loading = false;
        // console.log("action.payload", action.payload);
        state.cartTotal = action.payload;
      })
      .addCase(getCartData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const {
  addToCart,
  removeFromCart,
  fetchDataFromMongoDbStore,
  // getAllProduct,
  // getTotalCartAmount,
  // getTotalCartItems,
} = ProductSlice.actions;
export default ProductSlice.reducer;
