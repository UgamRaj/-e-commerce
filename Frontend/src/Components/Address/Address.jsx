import { useState } from "react";
import "./Address.css";

const Address = () => {
  const [formData, setFormData] = useState({
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    // You can handle form submission here
    console.log(formData);
  };

  return (
    <div className="address-form">
      <h2 className="blinking-heading">Delivery Address</h2>
      <input
        type="text"
        name="address"
        value={formData.address}
        onChange={handleChange}
        placeholder="Address"
        className="input-field"
      />
      <input
        type="text"
        name="city"
        value={formData.city}
        onChange={handleChange}
        placeholder="City"
        className="input-field"
      />
      <input
        type="text"
        name="state"
        value={formData.state}
        onChange={handleChange}
        placeholder="State"
        className="input-field"
      />
      <input
        type="text"
        name="pincode"
        value={formData.pincode}
        onChange={handleChange}
        placeholder="Pincode"
        className="input-field"
      />
      <button onClick={handleSubmit} className="submit-button">
        Submit
      </button>
    </div>
  );
};

export default Address;
