import UserModel from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const userRegistration = async (req, res) => {
  try {
    const isUser = await UserModel.findOne({ email: req.body.email });
    if (isUser) {
      return res.status(400).json({
        success: false,
        message: "Existing user found with same user email address",
      });
    }

    const userInfo = {
      name: req.body.userName,
      email: req.body.email,
      password: req.body.password,
      // cartData: cart,
    };
    const user = await UserModel.create(userInfo);
    console.log("🚀 ~ signUp ~ user:", user);

    res.json({
      success: true,
      message: "User successfully registered, please login to continue",
    });
  } catch (error) {
    console.log(error);
  }
};

const userLogin = async (req, res) => {
  const user = await UserModel.findOne({ email: req.body.email });
  if (!user) {
    return res.json({
      success: false,
      message: "Invalid username or password",
    });
  }
  // console.log(user.password);

  const isPasswordCorrect = bcrypt.compareSync(
    req.body.password,
    user.password
  );
  // console.log(isPasswordCorrect);
  const expiryDateTime = Math.floor(new Date().getTime() / 1000) + 7200; // 2 hr from now

  if (isPasswordCorrect) {
    // console.log("User", user);
    const payload = {
      id: user._id,
      // name: user.userName,
      role: "admin",
      // exp: expiryDateTime,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET_KEY);
    console.log("🚀 ~ userLogin ~ token:", token);
    return res.json({
      success: true,
      message: "Logged in successfully",
      token,
    });
  }
  res.json({
    success: false,
    message: "Invalid username or password",
  });
};

//! Save address
const saveUserAddress = async (req, res) => {
  const address = req.body;
  const setObject = {};

  if (address.address) {
    setObject["address.address"] = address.address;
  }

  if (address.city) {
    setObject["address.city"] = address.city;
  }

  if (address.state) {
    setObject["address.state"] = address.state;
  }

  if (address.pincode) {
    setObject["address.pincode"] = address.pincode;
  }

  const updateObject = {
    $set: setObject,
  };

  const updateResult = await UserModel.findByIdAndUpdate(
    req.user._id,
    updateObject
  );
  console.log(updateResult);
  res.json({
    success: true,
    message: "Dummy Save address API",
  });
};

const controllers = { userRegistration, userLogin, saveUserAddress };

export default controllers;
