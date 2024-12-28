import React from "react";
import { styled } from "styled-components";
import { Mono, PuzzleAnswer } from "../../components/StyledUI";
import { Clues } from "./puzzle";

const table: [movie: string, sign: string, index: number][] = [
  ["The Dressmaker", "S & R Sewing and Vacuum Center", 19],
  ["Tangled", "B&B Hair Club", 7],
  ["Moneyball", "Dollar Tree", 4],
  ["Rent", "Apartment Leasing Weidner", 1],
  ["Ratatouille", "Fuzzy’s Taco Shop", 5],
  ["Toy Story 3", "Imaginarium for Kids Educational Centre Daycare", 14],
  ["Beauty and the Beast", "Princess Beauty Supply", 6],
  ["Once Upon a Mattress", "Bedding Plus Mattress Store", 4],
  ["The Birds", "Eagle Beer Wine Spirits Drive Thru", 20],
  ["Barbie", "Beauty Trendz", 10],
  ["The Horse Whisperer", "Rowe Veterinary Group", 0],
  [
    "Monsters University",
    "Academy of Learning Career College www.academyoflearning.ab.ca",
    18,
  ],
  ["Groundhog Day", "Open 24 Hours", 6],
];

const SolutionTable = styled.table`
  border-collapse: collapse;
  width: 100%;
  border: 1px solid black;

  & td,
  & th {
    border: 1px solid black;
    padding: 8px;
  }
`;

const HighlightLetter = styled.span`
  background-color: yellow;
`;

const Solution = () => {
  return (
    <>
      <p>
        Solvers will likely first notice that each bullet point is a summary of
        a popular movie. The map shows 13 locations, one per movie, sorted
        alphabetically by town.
      </p>

      <p>
        The flavor text directs solvers to check out the google street view for
        each location (“it’s almost as if I were really standing there!”), where
        they will notice that a nearby business is using an unusually shaped
        signpost—an old Blockbuster sign! The text on each sign can be
        thematically linked to a movie and the word count of each movie
        description matches the length of the text on the sign (ampersands in
        two clues suggest including the ampersand on the sign in the
        word/character count). Solvers use the synonym for “blockbuster”, clued
        by “masterpiece” and “ripsnorter” in the flavor, that appears in each
        sign to index into the sign text, then “rewind” and read up, revealing
        the answer, <PuzzleAnswer>HARD DISK SPACE</PuzzleAnswer>.
      </p>

      <SolutionTable>
        <thead>
          <tr>
            <th>Clue</th>
            <th>Movie</th>
            <th>Sign text</th>
            <th>Letter</th>
          </tr>
        </thead>
        <tbody>
          {table.map(([movie, sign, index], i) => (
            <tr key={i}>
              <td>
                {(Clues[i] ?? "")
                  .split(/(?<=\s+)/)
                  .map((word, j) =>
                    j === index ? <strong key={j}>{word}</strong> : word,
                  )}
              </td>
              <td>{movie}</td>
              <td>
                {sign.split(/(?=[A-Za-z&0-9])/).map((letter, j) =>
                  j === index ? (
                    <React.Fragment key={j}>
                      <HighlightLetter>{letter[0]}</HighlightLetter>
                      {letter.slice(1)}
                    </React.Fragment>
                  ) : (
                    letter
                  ),
                )}
              </td>
              <td>
                <Mono>
                  {sign.replaceAll(/[\s.’]+/g, "")[index]?.toUpperCase()}
                </Mono>
              </td>
            </tr>
          ))}
        </tbody>
      </SolutionTable>
    </>
  );
};

export default Solution;
