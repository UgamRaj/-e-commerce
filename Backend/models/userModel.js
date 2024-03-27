import mongoose from "mongoose";
import bcrypt from "bcrypt";

const addressSchema = new mongoose.Schema({
  address: {
    type: String,
    required: false,
    deault: "",
  },
  city: {
    type: String,
    requied: false,
    default: "",
  },
  state: {
    type: String,
    requied: false,
    default: "",
  },
  pincode: {
    type: String,
    requied: false,
    default: "",
  },
});

const userSchema = new mongoose.Schema({
  userName: { type: String },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  cartData: { type: Object, default: {} },
  date: { type: Date, default: Date.now },
  role: { type: String, default: "buyer" },
  address: { type: addressSchema },
});

userSchema.pre("save", function () {
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(this.password, salt);
  this.password = hash;
});

const UserModel = mongoose.model("users", userSchema);

export default UserModel;
