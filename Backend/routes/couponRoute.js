import express from "express";

import couponController from "../controllers/couponController.js";
import authMiddleware from "../middlewares/auth.js";

const router = express.Router();

router.post("/", authMiddleware(["admin"]), couponController.createCoupon);

router.get("/", couponController.getCoupon);

export default router;
