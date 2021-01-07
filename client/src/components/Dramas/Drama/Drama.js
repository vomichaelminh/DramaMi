import React from "react";
import styled from "styled-components";

const Drama = ({ title, image, description }) => {
  return (
    <StyledDrama>
      <h4>{title}</h4>
      <img src={image} alt="drama_image" />
      <p>Description: {description}</p>
    </StyledDrama>
  );
};

const StyledDrama = styled.div`
  font-size: 1rem;
  height: 30vh;
  width: 30vh;
  box-shadow: 0px 5px 20px rgba(0, 0, 0, 0.2);
  text-align: center;
  border-radius: 1rem;
  cursor: pointer;
  overflow: hidden;
  img {
    max-width: 100px;
    max-height: 100px;
    object-fit: cover contain;
  }
`;

export default Drama;
