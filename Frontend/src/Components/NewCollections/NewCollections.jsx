import "./NewCollections.css";
// import new_collections from "../../assets/new_collections";
import Items from "../Items/Item";
import { useEffect, useState } from "react";
import axios from "axios";

const NewCollections = () => {
  const [new_collections, setNewCollection] = useState([]);

  const newCollectionFromDatabase = async () => {
    try {
      const response = await axios.get(
        "http://localhost:10000/v1/product/newcollection"
      );
      const data = response.data;
      setNewCollection(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    newCollectionFromDatabase();
  }, []);

  return (
    <div className="newCollections">
      <h1>NEW COLLECTIONS</h1>
      <hr />
      <div className="collections">
        {new_collections?.map(({ _id, title, image, newPrice, oldPrice }) => {
          return (
            <Items
              key={_id}
              id={_id}
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

export default NewCollections;
