import "./Popular.css";

import data_product from "../../assets/data";
import Items from "../Items/Item";

const Popular = () => {
  return (
    <div className="popular">
      <h1>POPULAR IN WOMEN</h1>
      <hr />
      <div className="popularItem">
        {data_product.map(({ id, name, image, new_price, old_price }, i) => {
          return (
            <Items
              key={i}
              id={id}
              name={name}
              image={image}
              newPrice={new_price}
              oldPrice={old_price}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Popular;
