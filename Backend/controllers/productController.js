import ProductModel from "../models/productModel.js";
import UserModel from "../models/userModel.js";

const addProduct = async (req, res) => {
  try {
    // let products = await ProductModel.find({});
    // let id;
    // if (products.length > 0) {
    //   let lastProduct = products.slice(-1)[0];
    //   id = lastProduct.id + 1;
    // } else {
    //   id = 1;
    // }
    const product = await ProductModel.create({
      // id: id,
      title: req.body.title,
      image: req.body.image,
      category: req.body.category,
      newPrice: req.body.newPrice,
      oldPrice: req.body.oldPrice,
    });

    // const product = await ProductModel.create(req.body);

    console.log(product);
    res.json({
      success: true,
      title: req.body.title,
      message: "Product added successfully",
    });
  } catch (error) {
    console.log("🚀 ~ addProduct ~ error:", error);
  }
};

const removeProduct = async (req, res) => {
  try {
    const deletedProduct = await ProductModel.findOneAndDelete({
      id: req.body.id, //! this should be based on _id
    });

    res.json({
      success: true,
      name: req.body.title,
      message: "Product Deleted Successfully",
    });
  } catch (error) {
    console.log("🚀 ~ removeProduct ~ error:", error);
  }
};

// getting all products
const getAllProduct = async (req, res) => {
  try {
    const products = await ProductModel.find({});
    // console.log("🚀 ~ getAllProduct ~ products:", products);
    res.send(products);
  } catch (error) {
    console.log("🚀 ~ getAllProduct ~ error:", error);
  }
};

//! creating endpoint for newcollection for data
const getNewCollection = async (req, res) => {
  const products = await ProductModel.find({});
  let newCollection = products.slice(1).slice(-8);
  console.log("newCollection fetched");
  res.send(newCollection);
};

//! creating endpoint for popular in women
const getPopularInWomen = async (req, res) => {
  const products = await ProductModel.find({ category: "women" });
  let popularInWomen = products.slice(0, 4);
  console.log("Popular in Women ");
  res.send(popularInWomen);
};

const addProductInCartData = async (req, res) => {
  console.log(req.body, req.user); //? if we are using shopcontext.jsx

  const userData = await UserModel.findOne({ userId: req.user._id });

  userData.cartData[req.body.itemId] += 1;
  await UserModel.findOneAndUpdate(
    { _id: req.user._id },
    { cartData: userData.cartData }
  );
  res.send("Added");
};

const removeProductFromCart = async (req, res) => {
  console.log("removed", req.body.itemId);
  const userData = await UserModel.findOne({ _id: req.user.id });
  if (userData.cartData[req.body.itemId] > 0) {
    userData.cartData[req.body.itemId] -= 1;
  }
  await UserModel.findOneAndUpdate(
    { _id: req.user.id },
    { cartData: userData.cartData }
  );
  res.send("Removed");
};

const getProductCart = async (req, res) => {
  console.log("get Cart");
  const userData = await UserModel.findOne({ _id: req.user.id });
  res.json(userData.cartData);
};

const controllers = {
  addProduct,
  removeProduct,
  getAllProduct,
  getNewCollection,
  getPopularInWomen,
  addProductInCartData,
  removeProductFromCart,
  getProductCart,
};

export default controllers;
