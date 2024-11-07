import React from "react";
import { styled } from "styled-components";

const Mono = styled.span`
  font-family: monospace;
`;

const Bold = styled.span`
  font-weight: 700;
`;

const Tile = styled.div`
  font-family: monospace;
  border: 1px solid black;
  width: 2em;
  height: 2em;
  display: flex;
  align-items: center;
  justify-content: space-around;
`;

const Rack = styled.div`
  display: inline-flex;
  margin-right: 16px;
  margin-bottom: 8px;
  gap: 8px;
`;

const RACKS: { tiles: string[]; score: number }[] = [
  { tiles: ["Ho", "V", "Er", "C", "Ra", "F", "Ts"], score: 378 },
  { tiles: ["W", "I", "S", "H", "B", "O", "Ne"], score: 167 },
  { tiles: ["F", "I", "C", "Ti", "O", "N", "Al"], score: 118 },
  { tiles: ["Ar", "Ti", "Cu", "La", "Ti", "O", "N"], score: 163 },
  { tiles: ["I", "N", "F", "I", "N", "I", "Te"], score: 234 },
  { tiles: ["S", "K", "Y", "Sc", "Ra", "P", "Er"], score: 266 },
  { tiles: ["Th", "U", "Nd", "Er", "B", "Ir", "Ds"], score: 502 },
  { tiles: ["Es", "O", "P", "H", "Ag", "U", "S"], score: 278 },
  { tiles: ["U", "Ni", "V", "I", "Si", "O", "N"], score: 225 },
  { tiles: ["N", "U", "Tc", "Ra", "C", "K", "Er"], score: 323 },
];

const Solution = () => {
  return (
    <>
      <p>
        Each of the clues can be solved as a word made up of the symbols of
        seven chemical elements, as hinted by the Scrabble racks and flavor
        text. The element names in the clues also provide a hint to use element
        abbreviations, and they give the final element in each answer.
      </p>
      <p>
        The answers are clued in alphabetical order as an additional solving aid
        and are:
        <ul>
          <li>Articulation</li>
          <li>Esophagus</li>
          <li>Fictional</li>
          <li>Hovercrafts</li>
          <li>Infinite</li>
          <li>Nutcracker</li>
          <li>Skyscraper</li>
          <li>Thunderbirds</li>
          <li>Univision</li>
          <li>Wishbone</li>
        </ul>
      </p>
      <p>
        Some answers can be made from other combinations of elements, but each
        has only a single way to use exactly seven elements. Summing their
        atomic weights will give a score for each word, which will match the
        scores for the racks. In the provided rack order, this gives:
      </p>
      {RACKS.map(({ tiles, score }, i) => (
        <div key={`rack-${i}`}>
          <Rack>
            {tiles.map((tile, j) => (
              <Tile key={`rack-${i}-tile-${j}`}>
                {j === 0 ? <Bold>{tile}</Bold> : tile}
              </Tile>
            ))}
          </Rack>
          <span>{score}</span>
        </div>
      ))}
      <p>
        Reading the first element of each answer asks the question “How far is
        the sun?”
      </p>
      <p>
        Answering that question gives the interim answer <Mono>AU</Mono> (one
        astronomical unit.)
      </p>
      <p>
        Converting that back to its element name gives the actual answer:{" "}
        <Mono>
          <Bold>GOLD</Bold>
        </Mono>
      </p>
    </>
  );
};

export default Solution;
