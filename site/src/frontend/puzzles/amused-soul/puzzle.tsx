import React from "react";
import { styled } from "styled-components";
import {
  COPY_ONLY_CLASS,
  NO_COPY_CLASS,
} from "../../components/CopyToClipboard";
import img1 from "./assets/img1.png";
import img2 from "./assets/img2.png";

const FlexWrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 16px;
  align-items: center;
  width: 100%;
  overflow-x: auto;
`;

const Score = styled.span`
  flex: 0 0 100px;
`;

const StyledImg = styled.img`
  filter: drop-shadow(5px 2px 5px gray);
`;

const Rack = () => (
  <StyledImg
    className={NO_COPY_CLASS}
    src={img1}
    alt="A Scrabble rack with seven tiles, each marked with a question mark instead of a letter."
  />
);

const Row = ({ score }: { score: number }) => (
  <FlexWrapper>
    <Rack />
    <Score>Score: {score}</Score>
  </FlexWrapper>
);

const Puzzle = () => {
  return (
    <>
      <p className="puzzle-flavor">
        Chemists like Scrabble, too! Proper nouns are allowed when they play,
        but every play has to use all seven tiles (though no bonus points are
        awarded).
      </p>
      <Row score={378} />
      <Row score={167} />
      <Row score={118} />
      <Row score={163} />
      <Row score={234} />
      <Row score={266} />
      <Row score={502} />
      <Row score={278} />
      <Row score={225} />
      <Row score={323} />
      <br className={COPY_ONLY_CLASS} />
      <ul>
        <li>Clear pronunciation of speech stopped by nitrogen</li>
        <li>Tube leading from the throat to sulfur</li>
        <li>Made up with aluminum at last</li>
        <li>They’re full of eels with tennessine in the back</li>
        <li>
          Corridor that seems to go on forever but actually ends in tellurium
        </li>
        <li>
          He led tin soldiers against the mouse king’s army and, ultimately,
          erbium
        </li>
        <li>Urban building with an erbium wall</li>
        <li>
          Supermarionation series from the 1960s with darmstadtium in the finale
        </li>
        <li>
          Popular Spanish-language channel with nitrogen at the end of the
          lineup
        </li>
        <li>TV dog that loves classic literature and has a neon tail</li>
      </ul>
      <FlexWrapper>
        <img
          src={img2}
          alt="A Scrabble tile with a question mark instead of a letter, with an arrow pointing from it to a standalone question mark in the same font."
        />
      </FlexWrapper>
    </>
  );
};

export default Puzzle;
