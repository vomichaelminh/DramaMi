import React from "react";

const Drama = (props) => {
  console.log(props.title);
  return (
    <div>
      <h3>{props.title}</h3>
    </div>
  );
};

export default Drama;
