import React, { useRef } from "react";
import { useLocation } from "react-router-dom";
import html2canvas from "html2canvas";
import "./assets/Form.css"; // Import CSS file for styling

const Out = () => {
  const location = useLocation();
  const formData = location.state || {};
  const cardRef = useRef(null);

  // Function to download the div as a JPG image
  const handleDownload = async () => {
    if (cardRef.current) {
      const canvas = await html2canvas(cardRef.current, { useCORS: true });
      const image = canvas.toDataURL("image/jpeg");
      const link = document.createElement("a");
      link.href = image;
      link.download = "admission_card.jpg";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  // Function to share the image (Web Share API)
  const handleShare = async () => {
    if (navigator.share) {
      const canvas = await html2canvas(cardRef.current, { useCORS: true });
      const image = canvas.toDataURL("image/jpeg");

      // Convert base64 to a Blob
      const blob = await (await fetch(image)).blob();
      const file = new File([blob], "admission_card.jpg", { type: "image/jpeg" });

      try {
        await navigator.share({
          title: "Student Admission Card",
          text: `Student: ${formData.StudentName}, Guardian: ${formData.GuardianName}`,
          files: [file],
        });
      } catch (error) {
        console.error("Error sharing:", error);
      }
    } else {
      alert("Sharing not supported on this device.");
    }
  };

  return (
    <div className="output-container">
      <div className="card" ref={cardRef}>
        {/* Background Image */}
        {formData.backgroundImg && (
          <img src={formData.backgroundImg} alt="Background" className="bg-image" />
        )}

        {/* Uploaded Image (Placed Behind) */}
        {formData.Img && <img src={formData.Img} alt="Uploaded" className="uploaded-image" />}

        {/* Text on Background Image */}
        <div className="text-overlay">
          <h2>{formData.StudentName}</h2>
          <p>Guardian :{formData.GuardianName}</p>
        </div>
      </div>

      {/* Buttons for Download and Share */}
      <div className="button-group">
        <button className="action-button" onClick={handleDownload}>Download</button>
        <button className="action-button" onClick={handleShare}>Share</button>
      </div>
    </div>
  );
};

export default Out;
