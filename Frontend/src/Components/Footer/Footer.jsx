import "./Footer.css";
import footerLogo from "../../assets/logo_big.png";
import instaIcon from "../../assets/instagram_icon.png";
import pinterstIcon from "../../assets/pintester_icon.png";
import whatsAppIcon from "../../assets/whatsapp_icon.png";

const Footer = () => {
  return (
    <div className="footer">
      <div className="footerLogo">
        <img src={footerLogo} alt="footerLogo" />
        <p>CLOTH WORLD</p>
      </div>
      <ul className="footerLinks">
        <li>Company</li>
        <li>Products</li>
        <li>Offices</li>
        <li>About</li>
        <li>Contact</li>
      </ul>
      <div className="footerSocialIcon">
        <div className="footerIconsContainer">
          <img src={instaIcon} alt="instaIcon" />
        </div>
        <div className="footerIconsContainer">
          <img src={pinterstIcon} alt="pinterstIcon" />
        </div>
        <div className="footerIconsContainer">
          <img src={whatsAppIcon} alt="whatsAppIcon" />
        </div>
      </div>
      <div className="footerCopyRight">
        <hr />
        <p>Copyright @ 2024 - All Right Reserved</p>
      </div>
    </div>
  );
};

export default Footer;
