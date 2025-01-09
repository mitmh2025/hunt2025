import React, { type ReactNode } from "react";
import { styled } from "styled-components";
import {
  HScrollTableWrapper,
  Mono,
  PuzzleAnswer,
} from "../../components/StyledUI";
import { TUTORIAL_COLORS } from "./puzzle-components/PuzzleConstants";
import {
  GROUPED_PUZZLES,
  TUTORIAL_PUZZLES,
} from "./puzzle-components/Spoilers";
import {
  Height,
  isCreamPuzzle,
  type Puzzle,
  PuzzleColor,
} from "./puzzle-components/Typedefs";

const StyledTable = styled.table`
  margin-bottom: 1em;
  th,
  td {
    padding: 1px 8px;
  }
`;

const Table = ({ children }: { children: ReactNode }) => {
  return (
    <HScrollTableWrapper>
      <StyledTable>{children}</StyledTable>
    </HScrollTableWrapper>
  );
};

const StyledSubheader = styled.td`
  text-align: center;
`;

const Subheader = ({ children }: { children: ReactNode }): JSX.Element => {
  return (
    <tr>
      <StyledSubheader colSpan={4}>{children}</StyledSubheader>
    </tr>
  );
};

const RowGroup = ({ puzzles }: { puzzles: Puzzle[] }): JSX.Element => {
  return (
    <>
      {puzzles.map((puzzle) => {
        const { uuid: id, height, color, prompt, solution } = puzzle;
        return (
          <tr key={id}>
            <td>{HEIGHT_TO_PRESENTATION[height]}</td>
            <td>{COLOR_TO_PRESENTATION[color]}</td>
            <td>
              {isCreamPuzzle(puzzle)
                ? puzzle.parts.map((part) => part.prompt).join(" + ")
                : prompt}
            </td>
            <td>{solution}</td>
          </tr>
        );
      })}
    </>
  );
};

const HEIGHT_TO_PRESENTATION: Record<Height, string> = {
  [Height.LOW]: "Low",
  [Height.MIDDLE]: "Middle",
  [Height.HIGH]: "High",
};

const COLOR_TO_PRESENTATION: Record<Exclude<PuzzleColor, "GRAY">, string> = {
  [PuzzleColor.WHITE]: "White",
  [PuzzleColor.BLACK]: "Black",
  [PuzzleColor.RED]: "Red",
  [PuzzleColor.BLUE]: "Blue",
  [PuzzleColor.YELLOW]: "Yellow",
  [PuzzleColor.PURPLE]: "Purple",
  [PuzzleColor.ORANGE]: "Orange",
  [PuzzleColor.CREAM]: "Cream",
};

const GROUPED_TUTORIALS: Record<
  Exclude<PuzzleColor, "GRAY">,
  Puzzle[]
> = TUTORIAL_PUZZLES.reduce<Record<Exclude<PuzzleColor, "GRAY">, Puzzle[]>>(
  (acc, puzzle) => {
    acc[puzzle.color].push(puzzle);
    return acc;
  },
  {
    [PuzzleColor.WHITE]: [],
    [PuzzleColor.BLACK]: [],
    [PuzzleColor.RED]: [],
    [PuzzleColor.BLUE]: [],
    [PuzzleColor.YELLOW]: [],
    [PuzzleColor.PURPLE]: [],
    [PuzzleColor.ORANGE]: [],
    [PuzzleColor.CREAM]: [],
  },
);

const Solution = (): JSX.Element => {
  return (
    <>
      <p>
        This is a puzzle about indie rule discovery puzzle game{" "}
        <a href="https://lingothegame.com/" target="_blank" rel="noreferrer">
          Lingo
        </a>{" "}
        by Brenton Wildes (who graciously allowed the use of first party game
        assets such as font and audio in this puzzle—thank you very much,
        Brenton!) In this game, puzzles are presented as panels you can type
        into, each panel backed by one of a number of colors, and each panel at
        one of three heights. Each color and each height corresponds to a
        wordplay mechanic. Both mechanics must be applied to solve the panel.
      </p>
      <p>
        Solvers are initially presented with eight squares, each of a different
        color present in Lingo. When clicked, each will display a series of
        Lingo style puzzles that tutorialize that color. The first three panels
        of each puzzle solve to the same three words, helping solvers learn the
        mechanics. The last two or three panels of each tutorial explicitly
        explain what the mechanic for that color is. Several colors have one
        tutorial puzzle
        <sup id="antifootnote">
          <a href="#footnote">1</a>
        </sup>{" "}
        intended to point solvers towards the game. Most other tutorial answers
        are related to electricity or electronics.
      </p>
      <p>
        Heights are not explicitly tutorialized, but the white tutorial is
        intended to teach the height rules, with much of the white tutorial
        solving to the same word. High puzzles are phonetic—the color rule is
        applied to the sounds of the words. Middle puzzles are orthographic—the
        color rule is applied to the letters of the words. Low puzzles are
        semantic—the color rule is applied to the meanings of the words.
      </p>
      <p>
        After half the tutorials are solved, nine gray squares appear. When
        clicked, each brings up an orange square, which when clicked reveals an
        orange puzzle. When that puzzle is solved, more puzzles appear
        sequentially. Answers from each puzzle become the prompt for the
        subsequent puzzle. The puzzles eventually reveal a circuit when the
        last, thematic puzzle in each gray group is solved.
      </p>
      <p>
        The Lingo color mechanics happen to correspond with{" "}
        <a
          href="https://en.wikipedia.org/wiki/Resistor_color_codes"
          target="_blank"
          rel="noreferrer"
        >
          resistor color codes
        </a>
        . The solutions to the initial orange panels represent the voltage of
        the circuit source. Taking the puzzle colors as resistor stripes, the
        voltage across the final resistor can be calculated. This voltage, when
        used as an index to the last puzzle in the circuit, spells the initial
        answer, <Mono>PHILOLOGY</Mono>.
      </p>
      <p>
        After solving Papa’s Stash, solvers receive the instruction{" "}
        <Mono>SHIFT BY DIFFERENCE FROM 8V</Mono>. The difference in voltage
        between the original sink voltage and 8V can be applied to the initial
        answer, letter-by-letter, as a Caesar shift, producing{" "}
        <PuzzleAnswer>LIFEFORCE</PuzzleAnswer>.
      </p>
      <h2>Full solution</h2>
      {TUTORIAL_COLORS.map((color: PuzzleColor) => {
        const colorKey = COLOR_TO_PRESENTATION[color].toLowerCase();
        return (
          <>
            <h3>{COLOR_TO_PRESENTATION[color]} Tutorial</h3>
            <Table key={colorKey}>
              <tr>
                <th>Height</th>
                <th>Color</th>
                <th>Prompt</th>
                <th>Solution</th>
              </tr>
              <RowGroup puzzles={GROUPED_TUTORIALS[color]} />
            </Table>
          </>
        );
      })}
      {GROUPED_PUZZLES.map(
        ({ uuid, firstPuzzle, lastPuzzle, subgroups, finalVoltage }, i) => {
          return (
            <>
              <h3 key={uuid}>Circuit {i + 1}</h3>
              <Table key={`${uuid}-table`}>
                <tr>
                  <th>Height</th>
                  <th>Color</th>
                  <th>Prompt</th>
                  <th>Solution</th>
                </tr>
                <RowGroup puzzles={[firstPuzzle]} />
                <Subheader>
                  The source voltage of the circuit is {firstPuzzle.solution}V.
                </Subheader>
                {subgroups.map(({ resistance, puzzles }) => (
                  <>
                    <RowGroup puzzles={puzzles} />
                    <Subheader>Resistance: {resistance}Ω</Subheader>
                  </>
                ))}
                <Subheader>
                  Voltage across the last resistor is {finalVoltage}, from{" "}
                  {lastPuzzle.solution} extract{" "}
                  <Mono>
                    {lastPuzzle.solution.replace(/\s/g, "")[finalVoltage - 1]}
                  </Mono>
                </Subheader>
              </Table>
            </>
          );
        },
      )}
      <h3>Re-solve</h3>
      <Table>
        <tr>
          <th>Voltage across final resistor</th>
          <th>Initial extraction</th>
          <th>Shift to achive 8V</th>
          <th>Caesar-shifted letter</th>
        </tr>
        <tr>
          <td>12</td>
          <td>P</td>
          <td>-4</td>
          <td>L</td>
        </tr>
        <tr>
          <td>7</td>
          <td>H</td>
          <td>1</td>
          <td>I</td>
        </tr>
        <tr>
          <td>11</td>
          <td>I</td>
          <td>-3</td>
          <td>F</td>
        </tr>
        <tr>
          <td>15</td>
          <td>L</td>
          <td>-7</td>
          <td>E</td>
        </tr>
        <tr>
          <td>17</td>
          <td>O</td>
          <td>-9</td>
          <td>F</td>
        </tr>
        <tr>
          <td>5</td>
          <td>L</td>
          <td>3</td>
          <td>O</td>
        </tr>
        <tr>
          <td>5</td>
          <td>O</td>
          <td>3</td>
          <td>R</td>
        </tr>
        <tr>
          <td>12</td>
          <td>G</td>
          <td>-4</td>
          <td>C</td>
        </tr>
        <tr>
          <td>2</td>
          <td>Y</td>
          <td>6</td>
          <td>E</td>
        </tr>
      </Table>
      <p id="footnote">
        <sup>
          <a href="#antifootnote">1</a>
        </sup>{" "}
        Such as JARGON / LINGO, WILDES / WIELDS, MEETS / STEAM.
      </p>
    </>
  );
};

export default Solution;
