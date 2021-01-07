import React from "react";
import "./style.drama.css";

const Drama = ({ title, image, description }) => {
  return (
    <div className="drama">
      <h4>{title}</h4>
      <img src={image} alt="drama_image" />
      <p>Description: {description}</p>
    </div>
  );
};

export default Drama;
