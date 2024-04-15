import "./Popular.css";

// import data_product from "../../assets/data";
import Items from "../Items/Item";
import { useEffect, useState } from "react";
import axios from "axios";

const Popular = () => {
  const [popularProduct, setPopularProduct] = useState([]);

  const getPopularProduct = async () => {
    try {
      const response = await axios.get(
        "http://localhost:10000/v1/product/popularinwomen"
      );
      const data = response.data;
      setPopularProduct(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  useEffect(() => {
    getPopularProduct();
  }, []);

  return (
    <div className="popular">
      <h1>POPULAR IN WOMEN</h1>
      <hr />
      <div className="popularItem">
        {popularProduct?.map(({ id, title, image, newPrice, oldPrice }, i) => {
          return (
            <Items
              key={i}
              id={id}
              name={title}
              image={image}
              newPrice={newPrice}
              oldPrice={oldPrice}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Popular;
