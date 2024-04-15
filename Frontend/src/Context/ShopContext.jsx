import { createContext, useEffect, useState } from "react";
// import all_product from "../assets/all_product";
import axios from "axios";

export const ShopContext = createContext(null);

const getDefaultCard = () => {
  let cart = {};
  for (let i = 0; i < 301; i++) {
    cart[i] = 0;
  }
  return cart;
};

const ShopContextProvider = ({ children }) => {
  const [all_product, setAllProduct] = useState([]);
  const [cartItems, setCartItems] = useState(getDefaultCard());

  const getAllProduct = async () => {
    try {
      const response = await axios.get(
        "http://localhost:10000/v1/product/allproducts"
      );
      const data = response.data;
      setAllProduct(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const getCartProduct = async () => {
    try {
      const response = await axios.post(
        "http://localhost:10000/v1/product/getcart",
        {},
        {
          headers: {
            Accept: "application/json",
            authToken: localStorage.getItem("authToken"),
            "Content-Type": "application/json",
          },
        }
      );

      const data = response.data;
      setCartItems(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    getAllProduct();
    // fetch("http://localhost:10000/v1/product/allproducts")
    //   .then((res) => res.json())
    //   .then((data) => setAllProduct(data));

    if (localStorage.getItem("authToken")) {
      getCartProduct();
      // fetch("http://localhost:10000/v1/product/getcart", {
      //   method: "POST",
      //   headers: {
      //     Accept: "application/form-data",
      //     authToken: `${localStorage.getItem("authToken")}`,
      //     "Content-Type": "application/json",
      //   },
      //   body: "",
      // })
      //   .then((res) => res.json())
      //   .then((data) => setCartItems(data));
    }
  }, []);

  // console.log(cartItems);
  const addToCart = (itemId = null) => {
    // console.log(itemId);
    setCartItems((prevVal) => {
      if (!itemId) {
        return cartItems;
      }
      return {
        ...prevVal,
        [itemId]: prevVal[itemId] + 1,
      };
    });

    // setCartItems({ ...cartItems, [itemId]: cartItems[itemId] + 1 });
    // console.log(cartItems);

    if (localStorage.getItem("authToken")) {
      fetch("http://localhost:10000/v1/product/addtocart", {
        method: "POST",
        headers: {
          Accept: "application/form-data",
          authToken: `${localStorage.getItem("authToken")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ itemId: itemId }),
      })
        .then((res) => res.json())
        .then((data) => console.log(data));
    }
  };

  useEffect(() => {
    addToCart();
  }, [cartItems]);

  const removeFromCart = (itemId) => {
    setCartItems((prevVal) => ({ ...prevVal, [itemId]: prevVal[itemId] - 1 }));
    if (localStorage.getItem("authToken")) {
      fetch("http://localhost:10000/v1/product/removefromcart", {
        method: "POST",
        headers: {
          Accept: "application/form-data",
          authToken: `${localStorage.getItem("authToken")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ itemId: itemId }),
      })
        .then((res) => res.json())
        .then((data) => console.log(data));
    }
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = all_product.find((product) => product.id === +item);
        totalAmount += itemInfo.new_price * cartItems[item];
      }
    }
    return totalAmount;
  };

  const getTotalCartItems = () => {
    let totalItem = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        totalItem += cartItems[item];
      }
    }
    return totalItem;
  };

  const contextValue = {
    all_product,
    cartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    getTotalCartItems,
  };

  return (
    <ShopContext.Provider value={contextValue}>{children}</ShopContext.Provider>
  );
};

export default ShopContextProvider;
