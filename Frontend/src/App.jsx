import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./Components/Navbar/Navbar";
import Shop from "./Pages/Shop";
import ShopCategory from "./Pages/ShopCategory";
import Products from "./Pages/Products";
import Cart from "./Pages/Cart";
import LoginSingup from "./Pages/LoginSingup";
import Footer from "./Components/Footer/Footer";
import menBanner from "./assets/banner_mens.png";
import womenBanner from "./assets/banner_women.png";
import kidBanner from "./assets/banner_kids.png";
import Address from "./Components/Address/Address";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />

        <Routes>
          <Route path="/" element={<Shop />} />
          <Route
            path="/mens"
            element={<ShopCategory banner={menBanner} mainCategory="men" />}
          />
          <Route
            path="/womens"
            element={<ShopCategory banner={womenBanner} mainCategory="women" />}
          />
          <Route
            path="/kids"
            element={<ShopCategory banner={kidBanner} mainCategory="kid" />}
          />
          <Route path="/product" element={<Products />} />
          <Route path="/product/:productId" element={<Products />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<LoginSingup />} />
          <Route path="/deliveryAddress" element={<Address />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
