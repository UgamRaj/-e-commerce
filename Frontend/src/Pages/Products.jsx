// import { useContext } from "react";
// import { ShopContext } from "../Context/ShopContext";
import { useParams } from "react-router-dom";
import BreadCrums from "../BreadCrums/BreadCrums";
import ProductDisplay from "../ProductDisplay/ProductDisplay";
import DescriptionBox from "../DescriptionBox/DescriptionBox";
// import RelatedProducts from "../RelatedProducts/RelatedProducts";
// import all_product from "../assets/all_product";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
// import { fetchDataFromApi } from "../utils/Api";
import { useDispatch } from "react-redux";
import { fetchProductsData } from "../Store/ProductSlice";

const Products = () => {
  const { allProduct } = useSelector((state) => state.product);
  // console.log("🚀 ~ Products ~ allProduct:", allProduct);
  const [productDetail, setProductDetail] = useState({});
  const dispatch = useDispatch();
  const { productId } = useParams();
  // console.log(productId);

  const getAllProd = () => {
    try {
      dispatch(fetchProductsData());
      // const data = await fetchDataFromApi("allproducts");
      // console.log(data);

      const product = allProduct?.find((item) => item._id === productId);
      // console.log("🚀 ~ getAllProd ~ product:", product);
      setProductDetail(product);
    } catch (error) {
      console.log("🚀 ~ getAllProd ~ error:", error);
      // console.log(error);
    }
  };
  useEffect(() => {
    getAllProd();
  }, []);
  // const { all_product } = useContext(ShopContext);

  return (
    <div>
      <BreadCrums product={productDetail} />
      <ProductDisplay product={productDetail} />
      <DescriptionBox />
      {/* <RelatedProducts /> */}
    </div>
  );
};

export default Products;
