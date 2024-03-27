import jwt from "jsonwebtoken";
import UserModel from "../models/userModel.js";

const authMiddleware = (role) => async (req, res, next) => {
  try {
    // const tokenFromHeaders = req.headers.authorization.split(" ")[1];
    const tokenFromHeaders = req.headers["authorization"];
    // const tokenFromHeaders = localStorage.getItem("authToken");
    // console.log("🚀 ~ authMiddleware ~ tokenFromHeaders:", tokenFromHeaders);

    const data = jwt.verify(tokenFromHeaders, process.env.JWT_SECRET_KEY);
    // console.log("TOKEN", tokenFromHeaders);
    const payload = jwt.decode(tokenFromHeaders);
    // console.log("🚀 ~ authMiddleware ~ payload:", payload);

    if (role.includes(payload.role)) {
      const user = await UserModel.findById(payload.id);
      // console.log("🚀 ~ authMiddleware ~ user:", user);
      req.user = user;
      next();
    } else {
      res.status(403).json({
        success: false,
        message: "Forbidden",
      });
    }
  } catch (err) {
    console.log(err);
    res.status(403).json({
      success: false,
      message: "Forbidden",
    });
  }
};

// module.exports = authMiddleware;
export default authMiddleware;
