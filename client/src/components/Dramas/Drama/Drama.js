import React, { useContext } from "react";
import axios from "axios";
import UserContext from "../../../context/UserContext";
import "./style.drama.css";

const Drama = ({ title, image, description, id }) => {
  const { userData } = useContext(UserContext);
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
    </div>
  );
};

export default Drama;
