// import { useContext } from "react";
// import { ShopContext } from "../Context/ShopContext";
import { useParams } from "react-router-dom";
import BreadCrums from "../BreadCrums/BreadCrums";
import ProductDisplay from "../ProductDisplay/ProductDisplay";
import DescriptionBox from "../DescriptionBox/DescriptionBox";
import RelatedProducts from "../RelatedProducts/RelatedProducts";
import all_product from "../assets/all_product";

const Products = () => {
  // const { all_product } = useContext(ShopContext);
  const { productId } = useParams();
  // console.log(productId);
  const product = all_product.find((item) => item.id === +productId);

  return (
    <div>
      <BreadCrums product={product} />
      <ProductDisplay product={product} />
      <DescriptionBox />
      <RelatedProducts />
    </div>
  );
};

export default Products;
