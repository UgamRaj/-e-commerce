import "./Navbar.css";
import logo from "../../assets/logo.png";
import cartIcon from "../../assets/cart_icon.png";
import navDropdown from "../../assets/nav_dropdown.png";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
// import { ShopContext } from "../../Context/ShopContext";
import { useSelector } from "react-redux";
// import axios from "axios";
import { getCartData } from "../../Store/ProductSlice";
// import { getTotalCartItems } from "../../Store/ProductSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [menu, setmenu] = useState("shop");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const { getTotalCartItems } = useContext(ShopContext);
  const { cartTotal } = useSelector((state) => state.product);
  console.log("🚀 ~ Navbar ~ cartTotal:", cartTotal);

  const menuRef = useRef();
  // const [quantity, setQuantity] = useState([]);

  // const fetchDataFrom = async () => {
  //   const BASR_URL = "http://localhost:10000/v1/cart";
  //   try {
  //     const res = await axios.get(
  //       BASR_URL,

  //       {
  //         headers: {
  //           // Accept: "application/json",
  //           authorization: localStorage.getItem("authToken"),
  //         },
  //       }
  //     );
  //     console.log(res.data.allProducts);
  //     setQuantity(res.data.allProducts);
  //   } catch (error) {
  //     console.log(error);
  //     return error;
  //   }
  // };

  useEffect(() => {
    // fetchDataFrom();

    dispatch(getCartData());
  }, []);

  const dropDownToggle = (e) => {
    menuRef.current.classList.toggle("navMenuVisible");
    e.target.classList.toggle("open");
  };

  // const getTotalCartItems = () => {
  //   let totalItem = 0;
  //   for (const item in cartItems) {
  //     if (cartItems[item] > 0) {
  //       totalItem += cartItems[item];
  //     }
  //   }
  //   return totalItem;
  // };

  return (
    <div className="navbar">
      <div className="navLogo">
        <img src={logo} alt="logo" />
        <p>CLOTH WORLD</p>
      </div>
      <img
        onClick={dropDownToggle}
        className="navDropdown"
        src={navDropdown}
        alt="navdropdown"
      />
      <ul ref={menuRef} className="navMenu">
        <li onClick={() => setmenu("shop")}>
          <Link style={{ textDecoration: "none" }} to="/">
            Shop
          </Link>
          {menu === "shop" && <hr />}
        </li>
        <li onClick={() => setmenu("mens")}>
          <Link style={{ textDecoration: "none" }} to="/mens">
            Men
          </Link>
          {menu === "mens" && <hr />}
        </li>
        <li onClick={() => setmenu("womens")}>
          <Link style={{ textDecoration: "none" }} to="/womens">
            Women
          </Link>
          {menu === "womens" && <hr />}
        </li>
        <li onClick={() => setmenu("kids")}>
          <Link style={{ textDecoration: "none" }} to="/kids">
            Kids
          </Link>
          {menu === "kids" && <hr />}
        </li>
      </ul>
      <div className="navLoginCart">
        {localStorage.getItem("authToken") ? (
          <button
            onClick={() => {
              localStorage.removeItem("authToken");
              // window.location.replace("/");
              navigate("/");
            }}
          >
            Logout
          </button>
        ) : (
          <Link style={{ textDecoration: "none" }} to="/login">
            <button>Login</button>
          </Link>
        )}
        <Link to="/cart">
          <img src={cartIcon} alt="cart icon" />
        </Link>
        <div className="navCartCount">
          {cartTotal}
          {/* {quantity?.reduce((acc, curr) => acc + curr.quantity, 0)} */}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
