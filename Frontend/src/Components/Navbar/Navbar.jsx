import "./Navbar.css";
import logo from "../../assets/logo.png";
import cartIcon from "../../assets/cart_icon.png";
import { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [menu, setmenu] = useState("shop");
  return (
    <div className="navbar">
      <div className="navLogo">
        <img src={logo} alt="logo" />
        <p>CLOTH WORLD</p>
      </div>
      <ul className="navMenu">
        <li onClick={() => setmenu("shop")}>
          <Link style={{ textDecoration: "none" }} to="/">
            Shop
          </Link>
          {menu === "shop" && <hr />}
        </li>
        <li onClick={() => setmenu("mens")}>
          <Link style={{ textDecoration: "none" }} to="/mens">
            Men
          </Link>{" "}
          {menu === "mens" && <hr />}
        </li>
        <li onClick={() => setmenu("womens")}>
          <Link style={{ textDecoration: "none" }} to="/womens">
            Women
          </Link>{" "}
          {menu === "womens" && <hr />}
        </li>
        <li onClick={() => setmenu("kids")}>
          <Link style={{ textDecoration: "none" }} to="/kids">
            Kids
          </Link>{" "}
          {menu === "kids" && <hr />}
        </li>
      </ul>
      <div className="navLoginCart">
        <Link style={{ textDecoration: "none" }} to="/login">
          <button>Login</button>
        </Link>
        <Link to="/cart">
          <img src={cartIcon} alt="cart icon" />
        </Link>
        <div className="navCartCount">0</div>
      </div>
    </div>
  );
};

export default Navbar;
