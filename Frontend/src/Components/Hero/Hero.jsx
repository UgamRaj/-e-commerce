import "./Hero.css";
import handIcon from "../../assets/hand_icon.png";
import arrowIcon from "../../assets/arrow.png";
import heroImage from "../../assets/hero_image.png";

const Hero = () => {
  return (
    <div className="hero">
      <div className="heroLeft">
        <h2>NEW ARRIVALS ONLY</h2>
        <div>
          <div className="heroHandIcon">
            <p>new</p>
            <img src={handIcon} alt="hand icon" />
          </div>
          <p>Collections</p>
          <p>for everyone</p>
        </div>
        <div className="heroLatestBtn">
          <div>Latest Collection</div>
          <img src={arrowIcon} alt="arrow icon" />
        </div>
      </div>
      <div className="heroRight">
        <img src={heroImage} alt="" />
      </div>
    </div>
  );
};

export default Hero;
