import React from "react";
import Drama from "./Drama/Drama";
import "./style.dramas.css";

const Dramas = ({ dramas }) => {
  return (
    <div>
      <div className="top">
        <h2>My Drama List</h2>
      </div>
      <div className="dramas">
        {dramas ? console.log(dramas) : ""}
        {dramas
          ? dramas.map((drama) => (
              <Drama
                key={drama._id}
                id={drama._id}
                title={drama.title}
                image={drama.image}
                description={drama.description}
                rating={drama.rating}
              />
            ))
          : ""}
      </div>
    </div>
  );
};

export default Dramas;
