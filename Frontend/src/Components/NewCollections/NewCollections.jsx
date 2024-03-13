import "./NewCollections.css";
import new_collections from "../../assets/new_collections";
import Items from "../Items/Item";

const NewCollections = () => {
  return (
    <div className="newCollections">
      <h1>NEW COLLECTIONS</h1>
      <hr />
      <div className="collections">
        {new_collections.map(({ id, name, image, new_price, old_price }) => {
          return (
            <Items
              key={id}
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

export default NewCollections;
