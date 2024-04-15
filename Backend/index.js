import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
// import userRoutes from "./routes/userRoute.js";
import productRoutes from "./routes/productRoute.js";
import multer from "multer";
import path from "path";
import cors from "cors";
import userRoutes from "./routes/userRoute.js";
import cartRoute from "./routes/cartRoute.js";

const app = express();
dotenv.config();
app.use(cors());

app.use(express.json());

// Database connection with mongodb
mongoose
  .connect(process.env.DATABASE_URL)
  .then(() => console.log("Database connected successfully"))
  .catch((err) => console.log("Error connecting with Database", err));

// App routes

// app.use("/api/v1/user", userRoutes);

// app.use("/api/v1/product", productRoutes);
app.use("/v1/product", productRoutes);
app.use("/v1/user", userRoutes);
app.use("/v1/cart", cartRoute);

//! Image Storage Engine
const storage = multer.diskStorage({
  destination: "./upload/images",
  filename: (req, file, cb) => {
    return cb(
      null,
      `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

const upload = multer({ storage: storage });

app.use("/images", express.static("upload/images"));
app.post("/upload", upload.single("product"), (req, res) => {
  res.json({
    success: true,
    imageUrl: `http://localhost:${process.env.PORT}/images/${req.file.filename}`,
  });
});

app.listen(process.env.PORT, () => {
  console.log(`Server is up and running at port ${process.env.PORT}`);
});
