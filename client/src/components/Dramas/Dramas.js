import React from "react";
import Drama from "./Drama/Drama";

const Dramas = ({ dramas }) => {
  return (
    <div>
      <h2>Drama List:</h2>
      {dramas ? console.log(dramas) : ""}
      {dramas
        ? dramas.map((drama) => <Drama key={drama._id} title={drama.title} />)
        : ""}
    </div>
  );
};

export default Dramas;
