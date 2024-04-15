import express from "express";
import productController from "../controllers/productController.js";
import fetchUser from "../middlewares/authEcom.js";
import authMiddleware from "../middlewares/auth.js";

const router = express.Router();

router.get("/allproducts", productController.getAllProduct);
router.post("/addproduct", productController.addProduct);
router.post("/removeproduct", productController.removeProduct);
router.get("/newcollection", productController.getNewCollection);
router.get("/popularinwomen", productController.getPopularInWomen);
// router.post("/addtocart", fetchUser, productController.addProductInCartData);
// router.post(
//   "/addtocart",
//   authMiddleware(["admin", "buyer", "seller"]),
//   productController.addProductInCartData
// );
// router.post(
//   "/removefromcart",
//   authMiddleware(["admin", "buyer", "seller"]),
//   productController.removeProductFromCart
// );
// router.get(
//   "/getcart",
//   authMiddleware(["admin", "buyer", "seller"]),
//   productController.getProductCart
// );

export default router;
