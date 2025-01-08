import React from "react";
import { styled } from "styled-components";
import LinkedImage from "../../components/LinkedImage";
import { AuthorsNote } from "../../components/PuzzleLayout";
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
      <AuthorsNote>
        Editors’ Note: This is a “metapuzzle”, a puzzle that uses the answers
        from other puzzles as inputs. To solve it, you’ll need to determine what
        answers in the round are used as inputs, and how to use them together to
        find another answer. Many metapuzzles, including most in this Hunt, will
        not have these notes to label them. Sometimes that’s part of the fun!
      </AuthorsNote>
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
