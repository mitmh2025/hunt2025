import React, { type CSSProperties } from "react";
import { styled } from "styled-components";
import Crossword from "../../components/Crossword";
import LinkedImage from "../../components/LinkedImage";
import {
  HScrollTableWrapper,
  Mono,
  PuzzleAnswer,
} from "../../components/StyledUI";
import conway from "./assets/conway.png";
import { COLOR, FILL, GRID, GREEN_HIGHLIGHTS, BLUE_HIGHLIGHTS } from "./data";

const GENERATIONS_TABLE = [
  ["I", "Greatest", 1901, 1927, 1919, 1945],
  ["II", "Silent", 1928, 1945, 1946, 1963],
  ["III", "Boomer", 1946, 1964, 1964, 1982],
  ["IV", "Gen X", 1965, 1980, 1983, 1998],
  ["V", "Millennial", 1981, 1996, 1999, 2014],
  ["VI", "Zoomer", 1997, 2012, 2015, 2030],
];

const EVENTS_TABLE = [
  [
    "I",
    "Greatest (1919-1945)",
    "",
    "WWII (1941)",
    "Erzincan (1939)",
    "",
    "Depression (1929)",
    "New York (1932)",
  ],
  [
    "II",
    "Silent (1946-1963)",
    "Janet (1955)",
    "Korean War (1950)",
    "Valdivia (1960)",
    "JFK (1963)",
    "",
    "California (1960)",
  ],
  [
    "III",
    "Boomer (1964-1982)",
    "Edith (1971)",
    "Vietnam War (1964)",
    "",
    "Reagan (1981)",
    "",
    "New York (1980)",
  ],
  [
    "IV",
    "Gen X (1983-1998)",
    "Mitch (1998)",
    "Gulf War (1990)",
    "",
    "",
    "",
    "",
  ],
  [
    "V",
    "Millennial (1999-2014)",
    "Dean (2007)",
    "Iraq War (2003)",
    "",
    "",
    "Recession (2008)",
    "Utah (2002)",
  ],
  [
    "VI",
    "Zoomer (2015-2030)",
    "Beryl (2024)",
    "Ukraine War (2022)",
    "Turkey-Syria (2023)",
    "Trump (2024)",
    "Lockdown (2020",
    "",
  ],
];

const StyledTable = styled.table`
  margin: 1em 0;
  border-collapse: collapse;
  td,
  th {
    padding-right: 8px;
    border-bottom: 1px solid black;
  }
`;

const HighlightTable = styled(StyledTable)`
  td:nth-child(5),
  td:nth-child(6) {
    background-color: #ffff00;
  }
`;

const ConwayCode = styled.div`
  padding-left: 64px;
  font-family: "Roboto Mono", monospace;
  word-wrap: break-word;
`;

const Solution = (): JSX.Element => {
  let counter = 1;
  const labels: string[][] = [];
  for (const row of GRID) {
    const labelRow: string[] = [];
    for (const char of row) {
      if (char === "#") {
        labelRow.push(`${counter}`);
        counter++;
      } else if (char === " ") {
        labelRow.push("");
      } else {
        labelRow.push(char);
      }
    }
    labels.push(labelRow);
  }

  return (
    <>
      <p>
        This puzzle works like a normal crossword for all of the numbered across
        and down answers. All of the blue highlighted clues have multiple
        answers all of which have a specific time frame associated with them.
        Each of these answers is associated with a different age generation.
        Specifically, the blue highlighted clue “Example of a major mechanic
        utilized successively in this puzzle” always corresponds to the very
        first across-answer in each of the six subsections of the crossword.
        These six answers to “major mechanic” are the six age generations used
        in the crossword grid:
      </p>
      <ul>
        <li>GREATEST</li>
        <li>SILENT</li>
        <li>BOOMER</li>
        <li>GEN X</li>
        <li>MILLENIAL</li>
        <li>ZOOMER</li>
      </ul>
      <p>
        The other highlighted clues correspond to events with specific time
        frames that happened in the corresponding age generation. Age
        generations are typically set by birth year dates, but the groupings
        tend to be defined by major world events (usually wars) that occur
        around when they become an adult. This puzzle used the bounds around
        when they turned 18 to set the event dates. As such, the following years
        in yellow are used to divide up the age generations:
      </p>
      <HScrollTableWrapper>
        <HighlightTable>
          <tr>
            <th>#</th>
            <th>Generation</th>
            <th>Birth Year Lower Bound</th>
            <th>Birth Year Upper Bound</th>
            <th>Turned 18 Lower Bound</th>
            <th>Turned 18 Upper Bound</th>
          </tr>
          {GENERATIONS_TABLE.map(
            ([
              num,
              generation,
              lowerBirth,
              upperBirth,
              lowerEighteen,
              upperEighteen,
            ]) => (
              <tr key={num}>
                <td>{num}</td>
                <td>{generation}</td>
                <td>{lowerBirth}</td>
                <td>{upperBirth}</td>
                <td>{lowerEighteen}</td>
                <td>{upperEighteen}</td>
              </tr>
            ),
          )}
        </HighlightTable>
      </HScrollTableWrapper>
      <p>The highlighted multi-answer clues with dates are shown below:</p>
      <HScrollTableWrapper>
        <StyledTable>
          <tr>
            <th>#</th>
            <th>Generation</th>
            <th>
              Hurricane{" "}
              <sup id="antifootnote1">
                <a href="#footnote1">1</a>
              </sup>
            </th>
            <th>
              Military Conflict{" "}
              <sup id="antifootnote2">
                <a href="#footnote2">2</a>
              </sup>
            </th>
            <th>Earthquake</th>
            <th>Assassination Attempt</th>
            <th>Economic Downturn</th>
            <th>Olympics</th>
          </tr>
          {EVENTS_TABLE.map(
            ([
              num,
              generation,
              hurricane,
              war,
              earthquake,
              assassination,
              recession,
              olympics,
            ]) => (
              <tr key={num}>
                <td>{num}</td>
                <td>{generation}</td>
                <td>{hurricane}</td>
                <td>{war}</td>
                <td>{earthquake}</td>
                <td>{assassination}</td>
                <td>{recession}</td>
                <td>{olympics}</td>
              </tr>
            ),
          )}
        </StyledTable>
      </HScrollTableWrapper>
      <p>The populated grid with all of the answers is as follows:</p>
      <HScrollTableWrapper>
        <Crossword
          labels={labels}
          fill={FILL}
          getAdditionalCellStyles={({ row, column }) => {
            const backgroundColor = COLOR?.[row]?.[column] ?? "";
            const styles: CSSProperties = {};
            if (row % 5 === 4 && row !== 29) {
              styles.borderBottomWidth = "5px";
            }
            if (backgroundColor === ".") {
              if (row < 5) {
                styles.backgroundColor = "#ffff00";
              } else if (row < 10) {
                styles.backgroundColor = "#a4c2f4";
              } else if (row < 15) {
                styles.backgroundColor = "#b6d7a8";
              } else if (row < 20) {
                styles.backgroundColor = "#ea9999";
              } else if (row < 25) {
                styles.backgroundColor = "#f9cb9c";
              } else if (row < 30) {
                styles.backgroundColor = "#d9d2e9";
              }
            }
            return styles;
          }}
        />
      </HScrollTableWrapper>
      <p>
        The extraction phrase at the side has a sequence of (roman
        numeral).(letter).(number) and is an intermediate extraction phrase. If
        you take the clue of the corresponding generation (I = Greatest, II =
        Silent, etc…) with the reference clue (a=hurricane, b=military conflict,
        c=earthquake, etc…) and then treat the number as an index into the
        corresponding answer. The extraction will give:
      </p>
      <ul>
        <li>
          I.c.6 = ERZIN<strong>C</strong>AN
        </li>
        <li>
          II.b.2 = K<strong>O</strong>REANWAR
        </li>
        <li>
          III.d.6 = REAGA<strong>N</strong>
        </li>
        <li>
          IV.b.5 = GULF<strong>W</strong>AR
        </li>
        <li>
          V.f.3 = UT<strong>A</strong>H
        </li>
        <li>
          VI.a.4 = BER<strong>Y</strong>L
        </li>
      </ul>
      <p>
        The phrase <Mono>CONWAY</Mono> is a reference to{" "}
        <a
          href="https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life"
          target="_blank"
          rel="noreferrer"
        >
          Conway’s Game of Life
        </a>{" "}
        which involves running the simulation through “generations”. The “major
        mechanic of puzzle” hinting at generations is a double hint as you need
        to use the generations again. The time steps in Conway’s game of life
        are referred to as generations.
      </p>
      <p>
        Specifically the flavor text says “starts out lost”. While the “Lost
        Generation” was not included in the puzzle grid, it corresponds to the
        generation before GREATEST. “Starts out” is hinting that LOST GENERATION
        is Generation 0 (or t=0 or the start of the time scale). You can then
        number the other generations in sequential order (also clued by roman
        numerals): Greatest: Gen=1, Silent: Gen=2, Boomer: Gen=3 and so on.
      </p>
      <p>
        Game of life is always playing on an unbounded grid with “dead cells”
        surrounding the starting grid. An astute eye may notice that the
        original grid image includes a very subtle fade off outside of the base
        grid.
      </p>
      <p>
        You must run the game of life for the full grid and record each
        individual generation step on their corresponding timestep. If you don’t
        want to manually create the grid you can generate a game of life code
        off of blank squares in original excel. As an example, on{" "}
        <a href="https://conwaylife.com/" target="_blank" rel="noreferrer">
          https://conwaylife.com/
        </a>{" "}
        clicking “show advanced options” and entering in the following code:
      </p>
      <ConwayCode>
        {
          "#C [[ ZOOM 16 GRID COLOR GRID 192 192 192 GRIDMAJOR 10 COLOR GRIDMAJOR 128 128 128 COLOR DEADRAMP 255 220 192 COLOR ALIVE 0 0 0 COLOR ALIVERAMP 0 0 0 COLOR DEAD 192 220 255 COLOR BACKGROUND 255 255 255 GPS 10 WIDTH 937 HEIGHT 600 ]]"
        }
        <br />
        {"x = 1, y = 1, rule = B3/S23"}
        <br />
        {
          "bbbbbbbbobbobbbbbbboooo$obooobbbbbbboobobbobbbo$bbbbbbbbbboooobbobbobbo$obbbbboobbooobbbbbbbobo$boobbobbbbbbbbobobbbbbo$bbbbbboooobooooobbbbobb$obbbbboooooobbobbbbbbbb$bbbobbbooooobobbbbbooob$bbbbbbbbbboobbbbbobbbbb$obooobbbbobobobbbbbbbbb$bbbbbbobbbbobbobbbboobb$bbbboobbobbbbbbbobbbbob$bbobbbbbbbobbbbbbbobobb$obbbbbbobbbobbbbbbbbbbo$obbbobbbbbbobooobobbbbb$bbbboobbobooooooobbbbob$obbobbbobbbobbboobobbbo$bboobbbbbbobbobbbbbbbbo$bbbbbbobbobbbbbbbbbobbo$bbbbbbobbbbbbbobobbbobo$bbbbbbbbbbobbbobboobbbb$obboboobbobbbbbobbbobob$bbobbbobobbbobbbbbbobbb$oobboobbbbbbbbbobbbbbbb$obbbbobobbobbooobbbobbo$bbbbbbobbbbbbbbbbbobbbb$bbbobbbbboboobbbbbbbbbb$bbbbbobbobbbobbboobbboo$obbbbbobbbbobboobbbbobo$oobbbbbbobbbbbbbbobbbbo$"
        }
      </ConwayCode>
      <p>
        If you compare the new black “living” squares in the current generation
        step number it has a bunch of squares overlapping letters in the
        original grid. Specifically you need to inspect each region at the
        generation time step equal to the generations numbering. This is clued
        by “but we find our way at different times” in the flavor,
        “successively” in crossword hint, and the arrows on the left side of the
        grid. The top most section of the grid corresponding to the GREATEST
        generation only has a bunch of cells that extract to{" "}
        <Mono>ANSWER IS LI</Mono> which matches the 10 ?s to the side of the
        grid. You then repeat the mechanic for gen =2 in the SILENT generation.
        The full extraction for each of the generations is shown below - the red
        squares correspond with specific letters that were white in the starting
        grid. The other black squares in each of the generations are either on a
        black square to start with or off the sides of the grid:
      </p>
      <LinkedImage
        src={conway}
        alt="Conway’s Game of Life played out in on each generation of the puzzle grid in succession. Extracted letters are annotated alongside each grid: ANSWER IS LI, VI, N, GY, EA, RS."
      />
      <p>Overlaying this on the letter grid is as follows:</p>
      <HScrollTableWrapper>
        <Crossword
          labels={labels}
          fill={FILL}
          getAdditionalCellStyles={({ row, column }) => {
            const backgroundColor = COLOR?.[row]?.[column] ?? "";
            const styles: CSSProperties = {};
            if (row % 5 === 4 && row !== 29) {
              styles.borderBottomWidth = "5px";
            }
            const index = row * 23 + column;
            if (GREEN_HIGHLIGHTS.has(index)) {
              styles.backgroundColor = "#00ff00";
            } else if (BLUE_HIGHLIGHTS.has(index)) {
              styles.backgroundColor = "#00ffff";
            } else if (backgroundColor === ".") {
              if (row < 5) {
                styles.backgroundColor = "#ffff00";
              } else if (row < 10) {
                styles.backgroundColor = "#a4c2f4";
              } else if (row < 15) {
                styles.backgroundColor = "#b6d7a8";
              } else if (row < 20) {
                styles.backgroundColor = "#ea9999";
              } else if (row < 25) {
                styles.backgroundColor = "#f9cb9c";
              } else if (row < 30) {
                styles.backgroundColor = "#d9d2e9";
              }
            }
            return styles;
          }}
        />
      </HScrollTableWrapper>
      <p>
        Reading the extracted letters left to right top to bottom spells out{" "}
        <Mono>ANSWER IS LIVING YEARS</Mono> for a final answer of{" "}
        <PuzzleAnswer>LIVING YEARS</PuzzleAnswer>.
      </p>
      <p>
        <sup id="footnote1">
          <a href="#antifootnote1">1</a>
        </sup>{" "}
        Hurricanes weren’t named until 1950 so although there were Cat 5
        hurricanes, they weren’t named and instead were just referred to by
        location and year.
      </p>
      <p>
        <sup id="footnote2">
          <a href="#antifootnote2">2</a>
        </sup>{" "}
        Some of these conflicts like WW2, Vietnam, and Ukraine started earlier,
        but US involvement “significantly ramped up”, as worded in clue phrase,
        in these years (e.g. Gulf of Tonkin resolution for Vietnam in 1964 /
        ramp up in U.S. presence in 1965).
      </p>
    </>
  );
};

export default Solution;
