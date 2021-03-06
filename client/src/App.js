import React, { useState, useEffect } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import axios from "axios";
import Header from "./components/Header/Header";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import Dramas from "./components/Dramas/Dramas";
import Form from "./components/Form/Form";
import Register from "./components/Register/Register";
import UserContext from "./context/UserContext";

import "./style.css";

const App = () => {
  const [userData, setUserData] = useState({
    token: undefined,
    user: undefined,
  });

  const [dramaData, setDramaData] = useState(null);

  useEffect(() => {
    const checkLoggedin = async () => {
      // grab current token in browser
      let token = localStorage.getItem("auth-token");
      if (token === null) {
        localStorage.setItem("auth-token", "");
        token = "";
      }
      const tokenRes = await axios.post(
        "http://localhost:5000/users/tokenIsValid",
        null,
        { headers: { "x-auth-token": token } }
      );
      if (tokenRes.data) {
        const userRes = await axios.get("http://localhost:5000/users/", {
          headers: { "x-auth-token": token },
        });
        setUserData({
          token,
          user: userRes.data,
        });
      }
    };

    checkLoggedin();
  }, []);

  return (
    <>
      <BrowserRouter>
        <UserContext.Provider
          value={{ userData, setUserData, dramaData, setDramaData }}
        >
          <Header />
          <div className="container">
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/dramas" component={Dramas} />
              <Route path="/form" component={Form} />
              <Route path="/login" component={Login} />
              <Route path="/register" component={Register} />
            </Switch>
          </div>
        </UserContext.Provider>
      </BrowserRouter>
    </>
  );
};

export default App;
