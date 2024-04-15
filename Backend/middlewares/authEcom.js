import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

//! Creating middleware
const fetchUser = async (req, res, next) => {
  const token = req.header("authToken");
  console.log("🚀 ~ fetchUser ~ token:", token);
  if (!token) {
    res.status(401).send({ message: "Please authenticate using valid token" });
  } else {
    try {
      const data = jwt.verify(token, process.env.JWT_SECRET_KEY);
      console.log("🚀 ~ fetchUser ~ data:", data);
      req.user = data.user;
      next();
    } catch (error) {
      console.log(error);
      res
        .status(401)
        .send({ message: "Please authenticate using valid token" });
    }
  }
};

export default fetchUser;
