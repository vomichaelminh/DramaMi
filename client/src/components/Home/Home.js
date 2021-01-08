import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "../../context/UserContext";
import axios from "axios";
import Dramas from "../Dramas/Dramas";
import "./style.home.css";

const Home = () => {
  const { userData } = useContext(UserContext);
  const [dramas, setDramas] = useState();

  useEffect(() => {
    const getCurrentDramas = async () => {
      if (userData.token) {
        const dramaRes = await axios.get("http://localhost:5000/dramas", {
          headers: { "x-auth-token": userData.token },
        });
        setDramas(dramaRes.data);
      }
    };
    getCurrentDramas();
  }, [userData]);

  return (
    <div className="page">
      {userData.user ? (
        <div className="drama-section">
          <Link to="/form">Add Drama</Link>
          <Dramas dramas={dramas} />
        </div>
      ) : (
        <div>
          <h2>
            Welcome to DramaMi, <br></br>please log in to see your dramas.
          </h2>
          <Link to="/login">Log in</Link>
        </div>
      )}
    </div>
  );
};

export default Home;
