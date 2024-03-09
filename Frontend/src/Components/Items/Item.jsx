import "./Item.css";

const Items = ({ image, name, newPrice, oldPrice }) => {
  return (
    <div className="item">
      <img src={image} alt="" />
      <p>{name}</p>
      <div className="itemPrices">
        <div className="itemPricesNew">${newPrice}</div>
        <div className="itemPricesOld">${oldPrice}</div>
      </div>
    </div>
  );
};

export default Items;
