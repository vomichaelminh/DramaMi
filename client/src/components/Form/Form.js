import React, { useState, useContext, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import UserContext from "../../context/UserContext";
import ErrorNotice from "../ErrorNotice/ErrorNotice";
import axios from "axios";
import "./style.form.css";

const Form = () => {
  // const [title, setTitle] = useState();
  // const [description, setDescription] = useState();
  // const [image, setImage] = useState();
  // const [rating, setRating] = useState();
  const [error, setError] = useState();
  const [postData, setPostData] = useState({
    title: "",
    description: "",
    image: "",
    rating: "",
  });

  const history = useHistory();
  const { userData, dramaData, setDramaData } = useContext(UserContext);

  // this will run everytime we click the edit button, it gets info from the drama
  useEffect(() => {
    if (dramaData && dramaData.drama) {
      const { title, description, image, rating } = dramaData.drama[0];
      setPostData({ title, description, image, rating });
    }
  }, [dramaData]);

  const handleReset = () => {
    setDramaData(null);
    history.goBack();
    Array.from(document.querySelectorAll("input")).forEach(
      (input) => (input.value = "")
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    handleReset();
    if (dramaData) {
      console.log("we are editing a drama");

      // update the drama information with the form information
      try {
        const toBeEditedDrama = {
          title: postData.title,
          description: postData.description,
          image: postData.image,
          rating: postData.rating,
        };
        await axios.patch(
          `http://localhost:5000/dramas/${dramaData.dramaId}`,
          toBeEditedDrama,
          {
            headers: { "x-auth-token": userData.token },
          }
        );
      } catch (error) {
        console.log(error.response.data);
      }
      // else, just make a new drama
    } else {
      console.log("we are adding a drama");
      try {
        const newDrama = {
          title: postData.title,
          description: postData.description,
          image: postData.image,
          rating: postData.rating,
        };
        await axios.post("http://localhost:5000/dramas", newDrama, {
          headers: { "x-auth-token": userData.token },
        });

        console.log("Drama sucessfully added!");
      } catch (err) {
        console.log(err.response.data);
        err.response.data.message && setError(err.response.data.message);
      }
    }
  };

  return (
    <div className="form-container">
      {dramaData ? dramaData.dramaId : <h2>Add a Drama</h2>}
      {error && (
        <ErrorNotice message={error} clearError={() => setError(undefined)} />
      )}
      <form className="form" onSubmit={handleSubmit}>
        <label htmlFor="register-email">Title</label>
        <input
          id="register-email"
          type="text"
          value={postData.title}
          onChange={(e) => setPostData({ ...postData, title: e.target.value })}
        />

        <label htmlFor="register-password">Description</label>
        <input
          id="register-password"
          type="text"
          value={postData.description}
          onChange={(e) =>
            setPostData({ ...postData, description: e.target.value })
          }
        />

        <label htmlFor="register-display-name">Image</label>
        <input
          id="register-display-name"
          type="text"
          value={postData.image}
          onChange={(e) => setPostData({ ...postData, image: e.target.value })}
        />
        <label htmlFor="register-display-name">
          Rating (1: lowest 5: highest)
        </label>
        <input
          id="register-display-name"
          type="text"
          value={postData.rating}
          onChange={(e) => setPostData({ ...postData, rating: e.target.value })}
        />
        <div className="form-buttons">
          {dramaData ? (
            <>
              <button type="submit">Edit Drama</button>
              <button onClick={handleReset}>Cancel Edit</button>
            </>
          ) : (
            <button type="submit">Add Drama</button>
          )}

          <br />
          <Link to="/">View Dramas</Link>
        </div>
      </form>
    </div>
  );
};

export default Form;
