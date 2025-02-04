import React, { useState } from "react";
import "./assets/Form.css"; // Import the CSS file
import demoImage from "./assets/Images/0001.jpg"; // Replace with your image path

const Form = () => {
  const [name, setName] = useState('');
  const [gardianName, setGardianName] = useState('');
  const [base64Image, setBase64Image] = useState('');

  const handleImage = (e) => {
    const file = e.target.files[0];
    if(file){
      convertImageToBase(file);
    }
  }

  const convertImageToBase = (file) => {
    const reader = new FileReader();
    reader.onload = () => {
      const base64String = reader.result;
      setBase64Image(base64String);
    };
    reader.onerror = (err) => {
      console.err("Error : ", err);
    };
    reader.readAsDataURL(file);
  }


  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      StudentName : name,
      GuardianName: gardianName,
      Img : base64Image
    }
    console.log(formData);
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
          <p className="form-para">Grace Valley Public School Maravattam</p>
          <form onSubmit={handleSubmit} className="form">
            <div className="form-group">
              <label htmlFor="name">Student Name</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => { setName (e.target.value)}}
                name="name"
                placeholder="Enter the Student name"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="gardName">Gardian Name</label>
              <input
                type="text"
                id="gardName"
                value={gardianName}
                onChange={(e) => {setGardianName(e.target.value)}}
                name="gardName"
                placeholder="Enter your Guardian Name"
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
                onChange={handleImage}
                required
              />
            </div>
            <button type="submit" className="submit-button" onClick={handleSubmit}>
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Form;