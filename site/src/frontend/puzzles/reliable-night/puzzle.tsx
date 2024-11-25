import React from "react";
import { styled } from "styled-components";
import LinkedImage from "../../components/LinkedImage";
import chain from "./assets/chain.png";

const CenteredDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const SizedLinkedImage = styled(LinkedImage)`
  max-width: 300px;
`;

const PuzzleContent = () => {
  return (
    <>
      <p className="puzzle-flavor">
        As you watch a jeweler assembling chain bracelets, you contemplate how
        your investigation of Gladys could start off.
      </p>
      <CenteredDiv>
        <SizedLinkedImage
          src={chain}
          alt="A chain bracelet of seven interlocking golden rings."
        />
      </CenteredDiv>
    </>
  );
};

export default PuzzleContent;
