import React from "react";
import { styled } from "styled-components";
import LinkedImage from "../../components/LinkedImage";
import image from "./assets/puzzle.png";

const FlexWrapper = styled.p`
  display: flex;
  justify-content: space-around;
`;

const Puzzle = (): JSX.Element => {
  return (
    <>
      <p className="puzzle-flavor">We can’t seem to agree on anything.</p>
      <LinkedImage
        src={image}
        alt="Two columns of clipart flanking a bunch of scattered capital letters, on either side of a vertical red line."
      />
      <ul>
        <li>Dangerous job</li>
        <li>Deep death</li>
        <li>Empty stump</li>
        <li>Fear result</li>
        <li>Game hot shower</li>
        <li>Go toward exit</li>
        <li>Happy state</li>
        <li>Heavy legal document</li>
        <li>Make money clean</li>
        <li>Measure right angle?</li>
        <li>Move electrons close</li>
        <li>Parade ground</li>
        <li>Priest’s day job</li>
        <li>Quiet reformed believer</li>
        <li>Slow cook dry</li>
        <li>Stadium’s last stand</li>
        <li>White salamander group</li>
        <li>Win girl over</li>
      </ul>
      <FlexWrapper>(4 words)</FlexWrapper>
    </>
  );
};

export default Puzzle;
