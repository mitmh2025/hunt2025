import React from "react";
import { styled } from "styled-components";
import chain from "./assets/chain.png";

const CenteredDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const PuzzleContent = () => {
  return (
    <>
      <div className="flavor">
        <p>
          As you watch a jeweler assembling chain bracelets, you contemplate how
          your investigation of Gladys could start off.
        </p>
      </div>
      <CenteredDiv>
        <img
          src={chain}
          alt="A chain bracelet of seven interlocking golden rings."
        />
      </CenteredDiv>
    </>
  );
};

export default PuzzleContent;
