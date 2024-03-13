// import { useContext } from "react";
import "./CartItems.css";
// import { ShopContext } from "../../Context/ShopContext";
import removeIcon from "../../assets/cart_cross_icon.png";
import all_product from "../../assets/all_product";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart } from "../../Store/ProductSlice";

const CartItems = () => {
  const { cartItems } = useSelector((state) => state.product);
  console.log(cartItems);
  const dispatch = useDispatch();

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

  // const { all_product, cartItems, removeFromCart, getTotalCartAmount } =
  //   useContext(ShopContext);

  //   console.log(all_product);

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

      {all_product.map((item) => {
        if (cartItems[item.id] > 0) {
          return (
            <div key={item.id}>
              <div className="cartItemsFormat cartItemsFormatMain">
                <img className="cartIconProductIcon" src={item.image} alt="" />
                <p>{item.name}</p>
                <p>${item.new_price}</p>
                <button className="cartItemsQuantity">
                  {cartItems[item.id]}
                </button>
                <p>${item.new_price * cartItems[item.id]}</p>
                <img
                  className="cartItemsRemoveIcon"
                  onClick={() => dispatch(removeFromCart(item.id))}
                  src={removeIcon}
                  alt="remove icon"
                />
              </div>
              <hr />
            </div>
          );
        }
        return null;
      })}
      <div className="cartItemsDown">
        <div className="cartItemsTotal">
          <h1>Cart Totals</h1>
          <div>
            <div className="cartItemsTotalItems">
              <p>SubTotal</p>
              <p>${getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cartItemsTotalItems">
              <p>Shipping Fee</p>
              <p>Free</p>
            </div>
            <hr />
            <div className="cartItemsTotalItems">
              <h3>Total</h3>
              <h3>${getTotalCartAmount()}</h3>
            </div>
          </div>
          <button>Proceed To Checkout</button>
        </div>
        <div className="cartItemsPromoCode">
          <p>If You Have Promo code, Enter it here</p>
          <div className="cartItemsPromoBox">
            <input type="text" placeholder="Promo Code" />
            <button>Submit</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItems;
