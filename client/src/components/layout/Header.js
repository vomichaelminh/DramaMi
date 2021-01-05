import React from "react";
import { Link } from "react-router-dom";
import AuthOptions from "../auth/AuthOptions";

const Header = () => {
  return (
    <header id="header">
      <Link to="/">
        <h1 className="title">DramaMi</h1>
      </Link>
      <AuthOptions />
    </header>
  );
};

export default Header;
