import express from "express";
import cartController from "../controllers/cartController.js";
import authMiddleware from "../middlewares/auth.js";

// const cartController = require("../controllers/cart");
// const authMiddleware = require("../middlewares/auth");

const router = express.Router();

router.post(
  "/",
  authMiddleware(["admin", "seller", "buyer"]),
  cartController.createCart
);

router.get(
  "/",
  authMiddleware(["admin", "seller", "buyer"]),
  cartController.getCart
);
router.post(
  "/removeFromCart",
  authMiddleware(["admin", "seller", "buyer"]),
  cartController.removeFromCart
);

export default router;
