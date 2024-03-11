import "./ProductDisplay.css";
import starIcon from "../assets/star_icon.png";
import starDullIcon from "../assets/star_dull_icon.png";
import { useContext } from "react";
import { ShopContext } from "../Context/ShopContext";

const ProductDisplay = ({ product }) => {
  const { addToCart } = useContext(ShopContext);

  return (
    <div className="productDisplay">
      <div className="productDisplayLeft">
        <div className="productDisplayImageList">
          <img src={product.image} alt="product" />
          <img src={product.image} alt="product" />
          <img src={product.image} alt="product" />
          <img src={product.image} alt="product" />
        </div>
        <div className="productDisplayImage">
          <img
            className="productDisplayMainImage"
            src={product.image}
            alt="product"
          />
        </div>
      </div>
      <div className="productDisplayRight">
        <h1>{product.name}</h1>
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
            ${product.old_price}
          </div>
          <div className="productDisplayRightPriceNew">
            ${product.new_price}
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
        <button onClick={() => addToCart(product.id)}>ADD TO CART</button>
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
