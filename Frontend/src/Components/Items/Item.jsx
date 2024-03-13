import { Link } from "react-router-dom";
import "./Item.css";

const Items = ({ image, name, newPrice, oldPrice, id }) => {
  return (
    <div className="item">
      <Link to={`/product/${id}`}>
        <img onClick={window.scrollTo(0, 0)} src={image} alt="image" />
      </Link>
      <p>{name}</p>
      <div className="itemPrices">
        <div className="itemPricesNew">${newPrice}</div>
        <div className="itemPricesOld">${oldPrice}</div>
      </div>
    </div>
  );
};

export default Items;
