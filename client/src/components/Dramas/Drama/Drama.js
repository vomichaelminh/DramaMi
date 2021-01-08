import React, { useContext } from "react";
import axios from "axios";
import UserContext from "../../../context/UserContext";

import "./style.drama.css";

const Drama = ({ title, image, description, rating, id }) => {
  const { userData } = useContext(UserContext);

  const handleRatings = () => {
    if (rating === 5) {
      return (
        <div>
          <i className="fas fa-star"></i>
          <i className="fas fa-star"></i>
          <i className="fas fa-star"></i>
          <i className="fas fa-star"></i>
          <i className="fas fa-star"></i>
        </div>
      );
    } else if (rating === 4) {
      return (
        <div>
          <i className="fas fa-star"></i>
          <i className="fas fa-star"></i>
          <i className="fas fa-star"></i>
          <i className="fas fa-star"></i>
        </div>
      );
    } else if (rating === 3) {
      return (
        <div>
          <i className="fas fa-star"></i>
          <i className="fas fa-star"></i>
          <i className="fas fa-star"></i>
        </div>
      );
    } else if (rating === 2) {
      return (
        <div>
          <i className="fas fa-star"></i>
          <i className="fas fa-star"></i>
        </div>
      );
    } else if (rating === 1) {
      return (
        <div>
          <i className="fas fa-star"></i>
          <i className="fas fa-star"></i>
        </div>
      );
    } else {
      return <p>You did not pick a number in range</p>;
    }
  };

  const handleDelete = async () => {
    try {
      const deletedDrama = await axios.delete(
        `http://localhost:5000/dramas/${id}`,
        {
          headers: { "x-auth-token": userData.token },
        }
      );
      console.log(deletedDrama);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="drama">
      <button onClick={handleDelete}>X</button>
      <h4>{title}</h4>
      <img src={image} alt="drama_image" />
      <p>Description: {description}</p>
      {handleRatings()}
    </div>
  );
};

export default Drama;
