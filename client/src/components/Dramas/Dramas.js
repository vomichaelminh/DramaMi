import React from "react";
import Drama from "./Drama/Drama";
import styled from "styled-components";
import "./style.dramas.css";

const Dramas = ({ dramas }) => {
  return (
    <div>
      <h2>Drama List:</h2>
      <div className="dramas">
        {dramas ? console.log(dramas) : ""}
        {dramas
          ? dramas.map((drama) => (
              <div className="drama-item">
                <Drama
                  key={drama._id}
                  title={drama.title}
                  image={drama.image}
                  description={drama.description}
                />
              </div>
            ))
          : ""}
      </div>
    </div>
  );
};

const Dramass = styled.div`
  min-height: 80vh;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
  grid-column-gap: 3rem;
  grid-row-gap: 5rem;
`;

export default Dramas;
