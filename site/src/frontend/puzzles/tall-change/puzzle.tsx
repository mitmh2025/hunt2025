import React from "react";
import { styled } from "styled-components";
import LinkedImage from "../../components/LinkedImage";
import img01 from "./assets/1.png";
import img02 from "./assets/2.jpg";

const SizedWrapper = styled.div`
  width: 100%;
`;

const Puzzle = () => {
  return (
    <>
      <SizedWrapper>
        <LinkedImage
          src={img01}
          alt="a picture of a bunch of different dresses on a white background"
        />
      </SizedWrapper>
      <br />

      <SizedWrapper>
        <LinkedImage
          src={img02}
          alt="a picture of a rack of garment bags with various graphics above them, and columns of empty squares in each bag"
        />
      </SizedWrapper>
    </>
  );
};

export default Puzzle;
