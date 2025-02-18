import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate
import "./assets/Form.css"; 
import demoImage from "./assets/Images/0001.jpg";
import bgImage from "./assets/Images/bg.png";

const Form = () => {
  const [name, setName] = useState('');
  const [gardianName, setGardianName] = useState('');
  const [base64Image, setBase64Image] = useState('');
  const [base64BgImage, setBase64BgImage] = useState('');

  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    const convertBgImageToBase64 = async () => {
      try {
        const response = await fetch(bgImage);
        const blob = await response.blob();
        const reader = new FileReader();
        reader.onload = () => {
          setBase64BgImage(reader.result);
        };
        reader.readAsDataURL(blob);
      } catch (error) {
        console.error("Error fetching background image: ", error);
      }
    };

    convertBgImageToBase64();
  }, []);

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setBase64Image(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      StudentName: name,
      GuardianName: gardianName,
      Img: base64Image,
      backgroundImg: base64BgImage,
    };

    // Navigate to Out.jsx and pass data as state
    navigate("/result", { state: formData });
  };

  return (
    <div className="form-container">
      <div className="form-wrapper">
        <div className="left-div">
          <img src={demoImage} alt="Demo" className="demo-image" />
        </div>
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
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter the Student name"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="gardName">Guardian Name</label>
              <input
                type="text"
                id="gardName"
                value={gardianName}
                onChange={(e) => setGardianName(e.target.value)}
                placeholder="Enter your Guardian Name"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="image">Upload Image</label>
              <input
                type="file"
                id="image"
                accept="image/*"
                onChange={handleImage}
                required
              />
            </div>
            <button type="submit" className="submit-button">
              Submit
            </button>
            <p className="dev-dtils">Developed By <Link to="https://anasuddeen-portfolio.netlify.app/">Anasuddeen</Link></p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Form;
