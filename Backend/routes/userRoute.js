import express from "express";
import userController from "../controllers/userController.js";
import authMiddleware from "../middlewares/auth.js";

const router = express.Router();

router.post("/signup", userController.userRegistration);
router.post("/login", userController.userLogin);
router.post(
  "/address",
  authMiddleware(["seller", "buyer", "admin"]),
  userController.saveUserAddress
);

export default router;
