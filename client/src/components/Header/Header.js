import React, { useContext } from "react";
import { Link } from "react-router-dom";
import AuthOptions from "../AuthOptions/AuthOptions";
import UserContext from "../../context/UserContext";
import "./style.header.css";

const Header = () => {
  const { userData } = useContext(UserContext);

  return (
    <header id="header">
      <Link to="/">
        <h1 className="title">DramaMi</h1>
      </Link>
      <div className="header-right">
        {userData.user ? <h4>Hi, {userData.user.displayName}</h4> : ""}
        <AuthOptions />
      </div>
    </header>
  );
};

export default Header;
