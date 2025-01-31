import React, { useState } from "react";
import "./assets/Form.css"; // Import the CSS file
import demoImage from "./assets/Images/0001.jpg"; // Replace with your image path

const Form = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    image: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);
    // Add your form submission logic here
  };

  return (
    <div className="form-container">
      <div className="form-wrapper">
        {/* Left Div (Image) */}
        <div className="left-div">
          <img src={demoImage} alt="Demo" className="demo-image" />
        </div>

        {/* Right Div (Form) */}
        <div className="right-div">
          <h1 className="form-heading">ADMISSION FORM</h1>
          <p className="form-para">This is a Admission card Generator</p>
          <form onSubmit={handleSubmit} className="form">
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="phone">Phone</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="image">Upload Image</label>
              <input
                type="file"
                id="image"
                name="image"
                accept="image/*"
                required
              />
            </div>
            <button type="submit" className="submit-button">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Form;