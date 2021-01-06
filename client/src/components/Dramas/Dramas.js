import React from "react";
import Drama from "./Drama/Drama";

const Dramas = ({ dramas }) => {
  console.log(dramas);
  return (
    <div>
      <h1>Drama List:</h1>

      {dramas
        ? dramas.map((drama) => <Drama key={drama._id} title={drama.title} />)
        : ""}
    </div>
  );
};

export default Dramas;
