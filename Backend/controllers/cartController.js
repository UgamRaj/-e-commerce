import CartModel from "../models/cartModel.js";
import ProductModel from "../models/productModel.js";
import UserModel from "../models/userModel.js";

const createCart = async (req, res) => {
  //! Method 2
  // const userCart = await CartModel.findOne({ userId: req.user._id });
  // // console.log("🚀 ~ createCart ~ userCart:", userCart);
  // if (userCart) {
  //   // Cart exists
  //   console.log("Cart exists");
  // } else {
  //   // Cart doesn't exists
  //   console.log("Cart doesn't exists");
  //   let cartTotal = 0;
  //   const productsToAdd = [];
  //   for (let i = 0; i < req.body.cart.length; i++) {
  //     const currentProduct = req.body.cart[i];

  //     const { newPrice } = await ProductModel.findById(currentProduct._id, {
  //       newPrice: 1,
  //       _id: 0,
  //     });
  //     console.log("🚀 ~ createCart ~ price:", newPrice);

  //     const product = {
  //       ...currentProduct,
  //       newPrice,

  //     };
  //     productsToAdd.push(product);
  //     const priceForProduct = currentProduct.quantity * newPrice;
  //     cartTotal += priceForProduct;
  //   }

  //   const cartCarted = await CartModel.create({
  //     products: productsToAdd,
  //     cartTotal,
  //     userId: req.user._id,
  //   });
  //   console.log("🚀 ~ createCart ~ cartCarted:", cartCarted);
  // }
  // res.json({
  //   success: true,
  //   message: "User cart updated successfully",
  // });

  //! Method 3

  const { cart } = req.body;
  const { _id } = req.user;
  console.log("khhfghgdh", req.body.cart[0]._id);
  try {
    let products = [];
    const user = await UserModel.findById({ _id });
    console.log("🚀 ~ createCart ~ user:", user._id);
    // check if user already have product in cart

    const alreadyExistCart = await CartModel.findOne({ userId: user._id });
    if (alreadyExistCart) {
      console.log(
        "🚀 ~ createCart ~ alreadyExistCart:",
        alreadyExistCart.products
      );
      const isAvailable = alreadyExistCart.products.find(
        (item) => item.productId.toString() === cart[0]._id
      );
      console.log("🚀 ~ createCart ~ isAvailable:", isAvailable);
      if (!isAvailable) {
        const updateRes = {
          $push: {
            products: {
              productId: req.body.cart[0]._id,
              quantity: 1,
              newPrice: req.body.cart[0].newPrice,
            },
          },
          $inc: {
            cartTotal: req.body.cart[0].newPrice || 0,
          },
        };

        const updateRecord = await CartModel.findOneAndUpdate(
          { userId: _id },
          updateRes,
          {
            new: true,
          }
        );
        console.log("🚀 ~ createCart ~ updateRecord:", updateRecord);
        return res.json({
          success: true,
          message: "pushing product",
        });
      }

      const filt = { userId: _id, "products.productId": req.body.cart[0]._id };

      console.log("🚀 ~ createCart ~ filt:", filt);

      const data = {
        $inc: {
          "products.$.quantity": 1,
          cartTotal: req.body.cart[0].newPrice || 0, // Update the cart total based on req.body.newPrice
        },
        $set: {
          "products.$.newPrice": req.body.cart[0].newPrice, // Set the new price
        },
      };
      const allUpdate = await CartModel.updateOne(filt, data);
      console.log("🚀 ~ createCart ~ allUpdate:", allUpdate);

      //!=----

      //!==

      return res.json({
        success: true,
        message: "cart updated",
      });
    }
    for (let i = 0; i < cart.length; i++) {
      let object = {};
      object.productId = cart[i]._id;
      object.quantity = 1;

      let getPrice = await ProductModel.findById(cart[i]._id)
        .select("newPrice")
        .exec();
      console.log("🚀 ~ createCart ~ getPrice:", getPrice);

      object.newPrice = getPrice.newPrice;
      // object.userId = _id.valueOf();
      console.log("🚀 ~ createCart ~ object:", object);

      products.push(object);
    }
    let cartTotal = 0;
    for (let i = 0; i < products.length; i++) {
      cartTotal = cartTotal + products[i].newPrice * products[i].quantity;
    }
    let newCart = await new CartModel({
      products,
      cartTotal,
      userId: _id,
    }).save();
    console.log("🚀 ~ createCart ~ newCart:", newCart);

    res.json(newCart);
  } catch (error) {
    throw new Error(error);
  }
};

const getCart = async (req, res) => {
  const { _id } = req.user;
  try {
    const cart = await CartModel.findOne({ userId: _id }).populate("products");
    // console.log("🚀 ~ getCart ~ cart:", cart);
    let allProducts = [];
    if (cart) {
      // console.log("Cart ID:", cart._id);
      // console.log("User ID:", cart.userId);

      // Iterate over products array

      for (let i = 0; i < cart.products.length; i++) {
        const product = await ProductModel.findOne({
          _id: cart.products[i].productId,
        });
        allProducts.push({
          ...product,
          quantity: cart.products[i].quantity,
          price: cart.products[i].newPrice,
        });
        // console.log("🚀 ~ getCart ~ product:", product);
      }
      res.json({
        success: true,
        message: "Dummy get cart API",
        allProducts,
        cartTotal: cart.cartTotal,
      });
    } else {
      console.log("Cart not found!");
      res.json({
        success: true,
        message: "Dummy get cart API",
        allProducts: [],
        cartTotal: 0,
      });
    }
  } catch (error) {
    throw new Error(error);
  }
};

//! remove from cart
const removeFromCart = async (req, res) => {
  // console.log(req.body.item._doc);
  const { _id } = req.user;
  try {
    const cart = await CartModel.findOne({ userId: _id });
    console.log("🚀 ~ removeFromCart ~ cart:", cart.products);

    const isQuantityAvailable = cart.products.find(
      (item) => item.productId.toString() === req.body.item._doc._id
    );
    console.log(
      "🚀 ~ removeFromCart ~ isQuantityAvailable:",
      isQuantityAvailable
    );
    if (isQuantityAvailable.quantity == 1) {
      const filterData = {
        userId: req.user._id,
        "products.productId": req.body.item._doc._id,
      };

      const dataup = {
        $inc: {
          cartTotal: -(req.body.item._doc.newPrice || 0),
        },
        $pull: {
          products: { productId: req.body.item._doc._id },
        },
      };

      const restUpdated = await CartModel.updateOne(filterData, dataup);
      console.log("🚀 ~ removeFromCart ~ restUpdated:", restUpdated);

      return res.json({
        success: true,
        message: "Remove This Produce",
      });
    }
    // console.log("quantity exceed");
    // return;

    const filt = {
      userId: req.user._id,
      "products.productId": req.body.item._doc._id,
    };

    const data = {
      $inc: {
        "products.$.quantity": -1, // Decrease quantity by 1
        cartTotal: -(req.body.item._doc.newPrice || 0), // Update the cart total by subtracting the new price
      },
      $set: {
        "products.$.newPrice": req.body.item._doc.newPrice, // Set the new price
      },
    };
    const allUpdate = await CartModel.updateOne(filt, data);
    console.log("🚀 ~ removeFromCart ~ allUpdate:", allUpdate);

    res.json({ success: true, message: "remove from cart successfully" });
  } catch (error) {
    console.log("🚀 ~ removeFromCart ~ error:", error);
  }
};

const controllers = {
  createCart,
  getCart,
  removeFromCart,
};

export default controllers;
