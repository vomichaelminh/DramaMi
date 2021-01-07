import React from "react";
import Drama from "./Drama/Drama";
import styled from "styled-components";
import "./style.dramas.css";

const Dramas = ({ dramas }) => {
  return (
    <div>
      <h2>Drama List:</h2>
      <div className="dramas">
        {dramas ? console.log(dramas[0]) : ""}
        {dramas
          ? dramas.map((drama) => (
              <Drama
                key={drama._id}
                id={drama._id}
                title={drama.title}
                image={drama.image}
                description={drama.description}
              />
            ))
          : ""}
      </div>
    </div>
  );
};

export default Dramas;
