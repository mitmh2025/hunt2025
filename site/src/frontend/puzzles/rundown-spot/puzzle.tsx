import React from "react";
import { styled } from "styled-components";
import LinkedImage from "../../components/LinkedImage";
import wheelHi from "./assets/wheel_hi.png";

const SizedImage = styled(LinkedImage)`
  width: 624px;
  height: 624px;
`;
const Puzzle = () => {
  return (
    <>
      <p className="puzzle-flavor">Is this 1:1? There’s an outside chance.</p>
      <SizedImage
        alt="A wheel with letters, colors, and symbols"
        src={wheelHi}
      />
    </>
  );
};

export default Puzzle;
