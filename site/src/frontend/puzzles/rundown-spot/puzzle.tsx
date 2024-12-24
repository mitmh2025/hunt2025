import React from "react";
import { styled } from "styled-components";
import LinkedImage from "../../components/LinkedImage";
import wheelHi from "./assets/wheel_hi.png";
import wheelLo from "./assets/wheel_lo.png";

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
        src={wheelLo}
        fullSizeURL={wheelHi}
      />
    </>
  );
};

export default Puzzle;
