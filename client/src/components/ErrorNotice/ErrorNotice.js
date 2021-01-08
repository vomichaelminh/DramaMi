import React from "react";
import "./style.error.css";
const ErrorNotice = (props) => {
  return (
    <div className="error-notice">
      <span>{props.message}</span>
      <button onClick={props.clearError}>X</button>
    </div>
  );
};

export default ErrorNotice;
