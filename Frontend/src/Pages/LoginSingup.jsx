import { useState } from "react";
import "./LoginSignup.css";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const LoginSingup = () => {
  const [state, setState] = useState("Login");
  const [formData, setFormData] = useState({
    userName: "",
    password: "",
    email: "",
  });
  const navigate = useNavigate();

  const changehandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const loginHandler = async () => {
    console.log("login", formData);
    try {
      const response = await axios.post(
        "http://localhost:10000/v1/user/login",
        formData,
        {
          headers: {
            // Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      // console.log("🚀 ~ loginHandler ~ response:", response);

      const responseData = response.data;

      if (responseData.success) {
        toast.success(responseData.message);
        localStorage.setItem("authToken", responseData.token);
        navigate("/");
      }
    } catch (error) {
      toast.error("Failed");
      console.error("Error:", error);
    }
  };
  const signUpHandler = async () => {
    console.log("signup", formData);
    try {
      const response = await axios.post(
        "http://localhost:10000/v1/user/signup",
        formData,
        {
          headers: {
            // Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );

      const responseData = response.data;

      if (responseData.success) {
        toast.success(responseData.message);
        localStorage.setItem("authToken", responseData.token);
        window.location.replace("/");
      }
    } catch (error) {
      toast.error("Failed");
      console.error("Error:", error);
    }
  };

  return (
    <div className="loginSignup">
      <div className="loginSignupContainer">
        <h1>{state}</h1>
        <div className="loginSignupFields">
          {state == "Sign Up" && (
            <input
              type="text"
              name="userName"
              value={formData.userName}
              placeholder="Your Name"
              onChange={changehandler}
            />
          )}
          <input
            type="email"
            name="email"
            value={formData.email}
            placeholder="Email Address"
            onChange={changehandler}
          />
          <input
            type="password"
            name="password"
            value={formData.password}
            placeholder="Password"
            onChange={changehandler}
          />
          <select name="" id="">
            <option value="admin">Admin</option>
            <option value="seller">Seller</option>
            <option value="buyer">Buyer</option>
          </select>
        </div>
        <button
          onClick={() => {
            state == "Login" ? loginHandler() : signUpHandler();
          }}
        >
          Continue
        </button>
        {state === "Sign Up" ? (
          <p className="loginSignupLogin">
            Already have an account?{" "}
            <span onClick={() => setState("Login")}>Login Here</span>
          </p>
        ) : (
          <p className="loginSignupLogin">
            Create an account?{" "}
            <span onClick={() => setState("Sign Up")}>Click Here</span>
          </p>
        )}
        <div className="loginSignupAgree">
          <input type="checkbox" name="" id="" />
          <p>By continueing, i agree to the terms of use & privecy policy.</p>
        </div>
        <ToastContainer />
      </div>
    </div>
  );
};

export default LoginSingup;
