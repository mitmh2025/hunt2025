import React from "react";
import { styled } from "styled-components";
import Crossword, { filterLabelsToStructure } from "../../components/Crossword";

const ClueHead = styled.h3`
  margin: 2rem 0 0 0;
  padding: 0;
`;

export const GRID: string[][] = [
  [".", "1", ".", "2", ".", "3", ".", "4", ".", "5", ".", "6", "."],
  ["7", "", "", "", ".", "8", "", "", "", "", "", "", ""],
  [".", "", ".", "", ".", "", ".", "", ".", "", ".", "", "."],
  ["9", "", "", "", "", "", ".", "10", "", "", "", "", "11"],
  [".", "", ".", ".", ".", "", ".", "", ".", "", ".", ".", ""],
  ["12", "", "", "13", "", "", "", "", "", "", "", "", ""],
  ["", ".", ".", "", ".", ".", ".", ".", ".", "", ".", ".", ""],
  ["14", "", "", "", "", "15", "", "16", "", "", "", "17", ""],
  ["", ".", ".", "", ".", "", ".", "", ".", ".", ".", "", "."],
  ["18", "19", "", "", "", "", ".", "20", "", "21", "", "", ""],
  [".", "", ".", "", ".", "", ".", "", ".", "", ".", "", "."],
  ["22", "", "", "", "", "", "", "", ".", "23", "", "", ""],
  [".", "", ".", "", ".", "", ".", "", ".", "", ".", "", "."],
];

const ACROSS_CLUES: [string, string][] = [
  ["7.", "Alf’s oddly strong plower is what we’re crazy like"],
  ["8.", "Toxic blackthorn bush poisoned dear Leon"],
  ["9.", "Doogie actor initially had a rotten rating in entry sitcom"],
  ["10.", "Some lazily feign or enact neglect"],
  ["12.", "Honest bit in outrageous letter for hunk"],
  [
    "14.",
    "Display type of convertible, surprisingly last after market call conclusion",
  ],
  ["18.", "Investigate exotic headland arches"],
  ["20.", "Wickerwork concerned exchanging rook for knight"],
  ["22.", "Smile – it costs nothing after ring!"],
  ["23.", "Aye, one Spanish cheer returned by degenerate race"],
];

const DOWN_CLUES: [string, string][] = [
  ["1.", "Recently, apartment in London taken by owner facing east"],
  ["2.", "Lumberjack brings up former lover in Arkansas"],
  ["3.", "Steal back fin from bats or lads"],
  ["4.", "I feel strange after starting to relax, giving reprieve"],
  ["5.", "Captures diamonds packed up in purse ran sneakily"],
  [
    "6.",
    "Disheartened banker takes deed currency contents and it comes to a head",
  ],
  ["11.", "Singing Merman blows top from biblical city"],
  ["12.", "Pot hot spots are coming back, almost like nightclubs on the edges"],
  ["13.", "Grays and beiges and tans rule assorted footwear"],
  ["15.", "A scale provided by Democrat reverend Al dropped 2000 pounds"],
  ["16.", "Shoot up stalwart alien"],
  [
    "17.",
    "When two hands meet in November, old love Loretta, forsaken, finally goes after a piece of tail",
  ],
  ["19.", "God of love is upset over smell"],
  ["21.", "Leon is head over heels for Carol"],
];

const ClueTable = styled.table`
  border-collapse: collapse;
  tr td:nth-child(1) {
    text-align: right;
    font-weight: bold;
    padding-right: 8px;
  }
`;

const Puzzle = () => {
  return (
    <>
      <p className="puzzle-flavor">
        We packed some things extra full; now it’s your turn.
      </p>
      <Crossword
        labels={GRID}
        labelsForEmptyCopy={filterLabelsToStructure(GRID)}
      />

      <ClueHead>Across</ClueHead>
      <ClueTable>
        <tbody>
          {ACROSS_CLUES.map(([num, clue]) => (
            <tr key={num}>
              <td>{num}</td>
              <td>{clue}</td>
            </tr>
          ))}
        </tbody>
      </ClueTable>

      <ClueHead>Down</ClueHead>
      <ClueTable>
        <tbody>
          {DOWN_CLUES.map(([num, clue]) => (
            <tr key={num}>
              <td>{num}</td>
              <td>{clue}</td>
            </tr>
          ))}
        </tbody>
      </ClueTable>
    </>
  );
};

export default Puzzle;
