import "./ProductDisplay.css";
import starIcon from "../assets/star_icon.png";
import starDullIcon from "../assets/star_dull_icon.png";
// import { useContext } from "react";
// import { ShopContext } from "../Context/ShopContext";
// import { Link } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { addToCart } from "../Store/ProductSlice";
import axios from "axios";

const ProductDisplay = ({ product }) => {
  // console.log("🚀 ~ ProductDisplay ~ product:", product);
  // const { addToCart } = useContext(ShopContext);
  // const { allCartProduct } = useSelector((state) => state.product);
  // const dispatch = useDispatch();
  // console.log(allCartProduct);

  const sendDatatoDb = async () => {
    // const cart = {
    //   ...product,
    //   productId: product._id,
    //   price: product.newPrice,
    // };
    const BASR_URL = "http://localhost:10000/v1/cart";
    try {
      const res = await axios.post(
        BASR_URL,
        { cart: [product] },
        {
          headers: {
            // Accept: "application/json",
            authorization: localStorage.getItem("authToken"),
          },
        }
      );
      console.log("🚀 ~ sendDatatoDb ~ res:", res);
    } catch (error) {
      console.log(error);
      return error;
    }
  };

  return (
    <div className="productDisplay">
      <div className="productDisplayLeft">
        <div className="productDisplayImageList">
          <img src={product?.image} alt="product" />
          <img src={product?.image} alt="product" />
          <img src={product?.image} alt="product" />
          <img src={product?.image} alt="product" />
        </div>
        <div className="productDisplayImage">
          <img
            className="productDisplayMainImage"
            src={product?.image}
            alt="product"
          />
        </div>
      </div>
      <div className="productDisplayRight">
        <h1>{product?.title}</h1>
        <div className="productDisplayRightStar">
          <img src={starIcon} alt="starIcon" />
          <img src={starIcon} alt="starIcon" />
          <img src={starIcon} alt="starIcon" />
          <img src={starIcon} alt="starIcon" />
          <img src={starDullIcon} alt="starDullIcon" />
          <p>(122)</p>
        </div>

        <div className="productDisplayRightPrices">
          <div className="productDisplayRightPriceOld">
            ${product?.oldPrice}
          </div>
          <div className="productDisplayRightPriceNew">
            ${product?.newPrice}
          </div>
        </div>
        <div className="productDisplayRightDescription">
          A lightweight, usually knitted, pullover shirt,close-fitting and a
          round neckline and short sleeves, worn as an undershirt or outer
        </div>
        <div className="productDisplayRightSize">
          <h1>Select Size</h1>
          <div className="productDisplayRightSizes">
            <div>S</div>
            <div>M</div>
            <div>L</div>
            <div>XL</div>
            <div>XXL</div>
          </div>
        </div>

        {/* <button onClick={() => addToCart(product.id)}>ADD TO CART</button> */}
        {/* <button onClick={() => dispatch(addToCart(product))}>
          ADD TO CART
        </button> */}
        <button onClick={() => sendDatatoDb()}>ADD TO CART</button>

        <p className="productDisplayRightCategory">
          <span>Category : </span>Women, T-shirt, Crop-top
        </p>
        <p className="productDisplayRightCategory">
          <span>Tags :</span> Modern, Latest
        </p>
      </div>
    </div>
  );
};

export default ProductDisplay;
