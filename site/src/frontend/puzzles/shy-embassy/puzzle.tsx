import React from "react";
import { styled } from "styled-components";
import drawing from "./assets/shy-embassy_meta_image.png";

const Drawing = styled.img`
  max-width: 100%;
`;

export default function Puzzle(): JSX.Element {
  return (
    <div>
      <Drawing src={drawing} alt="TODO" />
    </div>
  );
}
