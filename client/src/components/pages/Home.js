import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "../../context/UserContext";
import axios from "axios";
import Dramas from "../Dramas/Dramas";

export default function Home() {
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
        <div className="">
          <h1>Welcome {userData.user.displayName}</h1>

          <Dramas dramas={dramas} />
          <Link to="/form">Add Drama</Link>
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
}

// useEffect(() => {
//   const checkLoggedin = async () => {
//     // grab current token in browser
//     let token = localStorage.getItem("auth-token");
//     if (token === null) {
//       localStorage.setItem("auth-token", "");
//       token = "";
//     }
//     const tokenRes = await axios.post(
//       "http://localhost:5000/users/tokenIsValid",
//       null,
//       { headers: { "x-auth-token": token } }
//     );
//     if (tokenRes.data) {
//       const userRes = await axios.get("http://localhost:5000/users/", {
//         headers: { "x-auth-token": token },
//       });
//       setUserData({
//         token,
//         user: userRes.data,
//       });
//     }
//   };

//   checkLoggedin();
// }, []);
