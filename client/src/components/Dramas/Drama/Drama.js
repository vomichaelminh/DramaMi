import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import UserContext from "../../../context/UserContext";

import "./style.drama.css";
// import { useHistory } from "react-router-dom";

const Drama = ({ title, image, description, rating, id }) => {
  const { userData, setDramaData } = useContext(UserContext);
  const [hoveredDelte, setHoveredDelete] = useState(false);
  const [hoveredEdit, setHoveredEdit] = useState(false);

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

  const handleEdit = async () => {
    console.log("we pressed the edit a drama button");
    // grab the current drama information
    const dramaRes = await axios.get(`http://localhost:5000/dramas/${id}`, {
      headers: { "x-auth-token": userData.token },
    });

    // set the context of the drama to this so form can have access to the current drama
    if (dramaRes.data) {
      setDramaData({
        dramaId: id,
        drama: dramaRes.data,
      });
    }
  };

  return (
    <div className="drama">
      <div className="drama-content">
        <div className="drama-icons">
          <div className="drama-icons-wrapper">
            <Link className="drama-icons-wrapper i edit" to="/form">
              <i
                onMouseOver={() => setHoveredEdit(true)}
                onMouseLeave={() => setHoveredEdit(false)}
                onClick={handleEdit}
                className={hoveredEdit ? "fas fa-edit" : "far fa-edit"}
              ></i>
            </Link>

            <i
              onMouseOver={() => setHoveredDelete(true)}
              onMouseLeave={() => setHoveredDelete(false)}
              onClick={handleDelete}
              className={hoveredDelte ? "fas fa-trash-alt" : "far fa-trash-alt"}
            ></i>
          </div>
        </div>

        <h2>{title}</h2>
        <div className="img-wrapper">
          <img src={image} alt="drama_image" />
        </div>
        <div className="bottom">
          <p>{description}</p>
          {handleRatings()}
        </div>
      </div>
    </div>
  );
};

export default Drama;
