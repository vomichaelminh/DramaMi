import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "../../context/UserContext";
import ErrorNotice from "../ErrorNotice/ErrorNotice";
import axios from "axios";
import "./style.form.css";

const Form = () => {
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [image, setImage] = useState();
  const [rating, setRating] = useState();
  const [error, setError] = useState();

  // const history = useHistory();

  const handleReset = () => {
    Array.from(document.querySelectorAll("input")).forEach(
      (input) => (input.value = "")
    );
  };

  const { userData } = useContext(UserContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    handleReset();
    try {
      const newDrama = { title, description, image, rating };
      await axios.post("http://localhost:5000/dramas", newDrama, {
        headers: { "x-auth-token": userData.token },
      });

      console.log("Drama sucessfully added!");
    } catch (err) {
      console.log(err.response.data);
      err.response.data.message && setError(err.response.data.message);
    }
  };

  return (
    <div className="form-container">
      <h2>Add a Drama</h2>
      {error && (
        <ErrorNotice message={error} clearError={() => setError(undefined)} />
      )}
      <form className="form" onSubmit={handleSubmit}>
        <label htmlFor="register-email">Title</label>
        <input
          id="register-email"
          type="text"
          onChange={(e) => setTitle(e.target.value)}
        />

        <label htmlFor="register-password">Description</label>
        <input
          id="register-password"
          type="text"
          onChange={(e) => setDescription(e.target.value)}
        />

        <label htmlFor="register-display-name">Image</label>
        <input
          id="register-display-name"
          type="text"
          onChange={(e) => setImage(e.target.value)}
        />
        <label htmlFor="register-display-name">
          Rating (1: lowest 5: highest)
        </label>
        <input
          id="register-display-name"
          type="text"
          onChange={(e) => setRating(e.target.value)}
        />
        <div className="form-buttons">
          <button type="submit">Add Drama</button>
          <br />
          <Link to="/">View Dramas</Link>
        </div>
      </form>
    </div>
  );
};

export default Form;
