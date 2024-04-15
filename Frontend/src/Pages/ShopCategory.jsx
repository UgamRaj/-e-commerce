// import { useContext } from "react";
import "./ShopCategory.css";
// import { ShopContext } from "../Context/ShopContext";
import dropDownIcon from "../assets/dropdown_icon.png";
import Items from "../Components/Items/Item";
// import allProduct from "../assets/all_product";
// import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchDataFromApi } from "../utils/Api";

const ShopCategory = ({ banner, mainCategory }) => {
  // const { all_product } = useContext(ShopContext);

  // const { allProduct } = useSelector((state) => state.product);
  const [allProduct, setAllProduct] = useState([]);

  const getAllProd = async () => {
    try {
      const res = await fetchDataFromApi("allproducts");
      setAllProduct(res);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllProd();
  }, []);
  // console.log(allProduct.then((res) => console.log(res)));
  // console.log("🚀 ~ ShopCategory ~ allProduct:", getAllProd());

  return (
    <div className="shopCategory">
      {/* {console.log(allproduct)} */}
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
        {allProduct.map(
          ({ category, _id, title, image, newPrice, oldPrice }, i) => {
            if (mainCategory === category) {
              return (
                <Items
                  key={i}
                  id={_id}
                  name={title}
                  image={image}
                  newPrice={newPrice}
                  oldPrice={oldPrice}
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
