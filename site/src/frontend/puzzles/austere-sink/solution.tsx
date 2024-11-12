import React from "react";
import { styled } from "styled-components";
import LinkedImage from "../../components/LinkedImage";
import solution from "./assets/solution.png";

const Mono = styled.span`
  font-family: monospace;
`;

const Solution = (): JSX.Element => {
  return (
    <>
      <p>
        The two-word pairs, given in alphabetical order, clue a different pair
        of words that differ by only one letter. (This is clued by the puzzle
        title, which has this property.) The letters they differ by can be found
        in the diagram, which tells you where to place each pair.
      </p>
      <ul>
        <li>blanched carp → white whine (T/N)</li>
        <li>cloud fruit → cirrus citrus (R/T)</li>
        <li>cycling raider → biking viking (B/V)</li>
        <li>debonair trim → suave shave (U/H)</li>
        <li>devil farmland → fiend field (N/L)</li>
        <li>lounge barrel → veg keg (V/K)</li>
        <li>mends platoons → knits units (K/U)</li>
        <li>scam blazer → racket jacket (R/J)</li>
      </ul>
      <p>
        Following the diagram arrows, you have to do it again–with one of the
        clued words from each previous pair used to form new two-word clues:
      </p>
      <ul>
        <li>suave units → smooth smoots (H/S)</li>
        <li>viking racket → norse noise (S/I)</li>
        <li>citrus fiend → lemon demon (L/D)</li>
        <li>white veg → pale kale (P/K)</li>
      </ul>
      <p>
        Solve those to get single-letter-distance pairs, then take the
        difference letter from the word that’s starred to spell{" "}
        <Mono>
          <strong>SILK</strong>
        </Mono>
        .
      </p>
      <LinkedImage
        src={solution}
        alt="A diagram showing four groups of boxes and arrows, with words in each box."
      />
    </>
  );
};

export default Solution;
