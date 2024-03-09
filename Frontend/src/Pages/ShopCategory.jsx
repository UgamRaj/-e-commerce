import { useContext } from "react";
import "./ShopCategory.css";
import { ShopContext } from "../Context/ShopContext";
import dropDownIcon from "../assets/dropdown_icon.png";
import Items from "../Components/Items/Item";

const ShopCategory = ({ banner, mainCategory }) => {
  const { all_product } = useContext(ShopContext);

  return (
    <div className="shopCategory">
      <img className="shopCategoryBanner" src={banner} alt="banner" />
      <div className="shopCategoryIndexSort">
        <p>
          <span>Showing 1-12</span> out of 36 products
        </p>
        <div className="shopCategorySort">
          Sort by <img src={dropDownIcon} alt="dropDownIcon" />
        </div>
      </div>

      <div className="shopCategoryProducts">
        {all_product.map(
          ({ category, id, name, image, new_price, old_price }, i) => {
            if (mainCategory === category) {
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
            } else {
              return null;
            }
          }
        )}
      </div>
      <div className="shopcategoryLoadmore">Explore More</div>
    </div>
  );
};

export default ShopCategory;
