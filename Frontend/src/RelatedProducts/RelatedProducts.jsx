import "./RelatedProducts.css";
import dataProduct from "../assets/data";
import Items from "../Components/Items/Item";

const RelatedProducts = () => {
  return (
    <div className="releatedProducts">
      <h1>Related Products</h1>
      <hr />
      <div className="relatedProductItem">
        {dataProduct.map(({ id, name, image, new_price, old_price }, i) => {
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

export default RelatedProducts;
