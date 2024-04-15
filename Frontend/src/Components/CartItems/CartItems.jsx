// import { useContext } from "react";
import "./CartItems.css";
// import { ShopContext } from "../../Context/ShopContext";
import removeIcon from "../../assets/cart_cross_icon.png";
// import all_product from "../../assets/all_product";
// import { useDispatch, useSelector } from "react-redux";
// import { removeFromCart } from "../../Store/ProductSlice";
import axios from "axios";
import { useEffect, useState } from "react";
// import { fetchDataFromMongoDbStore } from "../../Store/ProductSlice";
import Address from "../Address/Address";

const CartItems = () => {
  // const { productCart } = useSelector((state) => state.product);
  // console.log("🚀 ~ CartItems ~ productCart:", productCart);

  // const dispatch = useDispatch();
  const [allProduct, setAllProduct] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);
  const [isAddress, setIsAddress] = useState(false);

  const fetchDataFrom = async () => {
    const BASR_URL = "http://localhost:10000/v1/cart";
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
      // console.log(`res.data`, res);
      setCartTotal(res.data.cartTotal);
      setAllProduct(res.data.allProducts);
    } catch (error) {
      console.log(error);
      return error;
    }
  };

  const removeFromCart = async (item) => {
    const BASR_URL = "http://localhost:10000/v1/cart/removeFromCart";
    try {
      const res = await axios.post(
        BASR_URL,
        { item },
        {
          headers: {
            Accept: "application/json",
            authorization: localStorage.getItem("authToken"),
          },
        }
      );
      console.log(res.data);
      fetchDataFrom();
    } catch (error) {
      console.log(error);
      return error;
    }
  };

  useEffect(() => {
    fetchDataFrom();
    // dispatch(fetchDataFromMongoDbStore());
  }, []);

  const onProceedToCheckOut = () => {
    setIsAddress(true);
  };

  return (
    <div className="cartItems">
      <div className="cartItemsFormatMain">
        <p>Products</p>
        <p>Title</p>
        <p>Price</p>
        <p>Quantity</p>
        <p>Total</p>
        <p>Remove</p>
      </div>
      <hr />

      {allProduct?.map((item) => {
        return (
          <div key={item._doc._id}>
            <div className="cartItemsFormat cartItemsFormatMain">
              <img
                className="cartIconProductIcon"
                src={item._doc.image}
                alt="cart image"
              />
              <p>{item._doc.title}</p>
              <p>${item.price}</p>
              <button className="cartItemsQuantity">{item.quantity}</button>
              <p>${item.price * item.quantity}</p>
              <img
                className="cartItemsRemoveIcon"
                onClick={() => removeFromCart(item)}
                src={removeIcon}
                alt="remove icon"
              />
            </div>
            <hr />
          </div>
        );
      })}
      <div className="cartItemsDown">
        <div className="cartItemsTotal">
          <h1>Cart Totals</h1>
          <div>
            <div className="cartItemsTotalItems">
              <p>SubTotal</p>
              <p>${cartTotal}</p>
            </div>
            <hr />
            <div className="cartItemsTotalItems">
              <p>Shipping Fee</p>
              <p>Free</p>
            </div>
            <hr />
            <div className="cartItemsTotalItems">
              <h3>Total</h3>
              <h3>${cartTotal}</h3>
            </div>
          </div>
          <button
            className={isAddress ? "cartItemBtnDisabled" : ""}
            onClick={onProceedToCheckOut}
            disabled={isAddress}
          >
            Proceed To Checkout
          </button>
        </div>
        <div className="cartItemsPromoAddressContainer">
          <div className="cartItemsPromoCode">
            <p>If You Have Promo code, Enter it here</p>
            <div className="cartItemsPromoBox">
              <input type="text" placeholder="Promo Code" />
              <button>Submit</button>
            </div>
          </div>
          {isAddress && <Address />}
        </div>
      </div>
    </div>
  );
};

export default CartItems;
