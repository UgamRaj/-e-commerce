import { createContext, useState } from "react";
import all_product from "../assets/all_product";

export const ShopContext = createContext(null);

const getDefaultCard = () => {
  let cart = {};
  for (let i = 0; i < all_product.length + 1; i++) {
    cart[i] = 0;
  }
  return cart;
};

const ShopContextProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(getDefaultCard());

  // console.log(cartItems);
  const addToCart = (itemId) => {
    setCartItems((prevVal) => ({ ...prevVal, [itemId]: prevVal[itemId] + 1 }));
    console.log(cartItems);
  };
  const removeFromCart = (itemId) => {
    setCartItems((prevVal) => ({ ...prevVal, [itemId]: prevVal[itemId] - 1 }));
  };

  const contextValue = { all_product, cartItems, addToCart, removeFromCart };

  return (
    <ShopContext.Provider value={contextValue}>{children}</ShopContext.Provider>
  );
};

export default ShopContextProvider;
