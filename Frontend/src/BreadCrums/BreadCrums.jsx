import "./BreadCrums.css";
import arrwoIcon from "../assets/breadcrum_arrow.png";

const BreadCrums = ({ product }) => {
  return (
    <div className="breadcrums">
      Home
      <img src={arrwoIcon} alt="arrwoIcon" />
      Shop <img src={arrwoIcon} alt="arrwoIcon" />
      {product?.category} <img src={arrwoIcon} alt="arrwoIcon" />{" "}
      {product?.name}
    </div>
  );
};

export default BreadCrums;
