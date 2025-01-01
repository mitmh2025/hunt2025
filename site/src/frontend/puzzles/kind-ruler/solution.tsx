import React from "react";
import { styled } from "styled-components";
import {
  HScrollTableWrapper,
  Mono,
  PuzzleAnswer,
} from "../../components/StyledUI";
import { CORN_MAZES } from "./data";
import { CopyableCornMaze } from "./puzzle";

const DATA: [number, string, string, string, string][] = [
  [
    0,
    "Toe",
    "TOE THE LINE",
    "Central [Q1]",
    "Order given to those being pressured to obey company authority",
  ],
  [
    1,
    "Tow",
    "TOW CABLES",
    "Star Wars [H1]",
    "Imperial Walker’s unexpected weakness",
  ],
  [
    1,
    "Knight",
    "JEDI KNIGHT",
    "Star Wars [H1]",
    "The Chosen One’s highest rank, famously",
  ],
  [
    2,
    "Night",
    "NIGHT OF THE FINAL DAY",
    "Zelda",
    "Countdown says 12 hours remain",
  ],
  [
    2,
    "Medal",
    "CURSED MEDAL",
    "Zelda",
    "Award reserved for those who give gratitude crystals to demons",
  ],
  [
    3,
    "Meddle",
    "MEDDLE WITH TIME",
    "Harry Potter",
    "It’s said that awful things will happen to wizards who do this",
  ],
  [
    3,
    "Floo",
    "FLOO POWDER",
    "Harry Potter",
    "A handful of this will let you have a quick hearth-to-hearth with a friend",
  ],
  [
    4,
    "Flu",
    "SPANISH FLU",
    "Central [Q2]",
    "Occidental name for the largest pandemic of the 20th century",
  ],
  [
    4,
    "Row",
    "SKID ROW",
    "Central [Q2]",
    "Infamous district, Seymour’s unhappy home",
  ],
  [
    5,
    "Ro",
    "FUS RO DAH",
    "Skyrim",
    "Three little words that will sweep you off your feet",
  ],
  [
    5,
    "Sword",
    "GLASS SWORD",
    "Skyrim",
    "Malachite, Moonstone, and leather make up this fragile-seeming blade",
  ],
  [
    6,
    "Soared",
    "SOARED",
    "Central [Q3]",
    "Happy hearts and birds on the wing both did this",
  ],
  [
    6,
    "Thai",
    "PAD THAI",
    "Central [Q3]",
    "Common street food purported to be a government-backed attempt to reduce rice consumption",
  ],
  [
    7,
    "Tie",
    "TIE FIGHTERS",
    "Star Wars [H2]",
    "Howling hordes of these tiny ships spew from every Star Destroyer",
  ],
  [
    7,
    "Red",
    "RED LIGHTSABER",
    "Star Wars [H2]",
    "Bad guys can’t resist using this iconic weapon",
  ],
  [
    8,
    "Read",
    "READ ALL OVER",
    "Central [Q4]",
    "Like a newspaper, black and white and…",
  ],
];

const StyledTable = styled.table`
  border-collapse: collapse;
  th,
  td {
    padding: 0 8px;
  }
  tr:first-child {
    border: 1px solid black;
    th:first-child {
      border: 1px solid black;
    }
  }
  tr:last-child {
    border-bottom: 1px solid black;
  }
  td:first-child {
    border-left: 1px solid black;
  }
  td:first-child,
  td:last-child {
    border-right: 1px solid black;
  }
  tr:nth-child(2n) {
    td:first-child {
      border-bottom: 1px solid black;
    }
  }
  tr:nth-child(2n + 1) {
    td:not(:first-child) {
      border-bottom: 1px solid black;
    }
  }
`;

const StyledCornMaze = styled(CopyableCornMaze)`
  margin-bottom: 1em;
`;

const Solution = (): JSX.Element => {
  return (
    <>
      <p>
        This puzzle begins with 5 separate freeform crossword grids and a large
        list of clues. One of the crossword grids is larger than the rest, the
        other 4 are all the same size. The list of clues includes all of the
        clues from all of the grids, with no immediate indication of which clues
        go to which grids. The intended solutions steps are as follows:
      </p>
      <ol>
        <li>
          Read the flavor text. It gives several important clues to the
          mechanics of the puzzle.
          <ol type="a">
            <li>
              It establishes the theme of a corn maze, which the shape of the
              crossword grids are all designed to resemble.
            </li>
            <li>
              It tells you that you will eventually need to solve the crossword
              grids like a maze, going from ENTER to EXIT.
            </li>
            <li>
              It establishes rules for how the maze is to be solved:
              <ol type="i">
                <li>You must find the shortest possible path out.</li>
                <li>You can’t path directly adjacent to a scarecrow.</li>
              </ol>
            </li>
            <li>
              It gives the key phrase “in one ear and out…somewhere” which will
              be important to a future puzzle step.
            </li>
            <li>
              It hints that the sound of things will be important—“Did you hear
              that correctly?”
            </li>
          </ol>
        </li>
        <li>
          Examine the puzzle grids and take note of their general design and the
          various symbols that are scattered around them.
          <ol type="a">
            <li>
              They are freeform crossword grids, but they have been
              intentionally shaped to mimic the patterns of a corn maze or hedge
              maze.
            </li>
            <li>
              There are icons dotted around.
              <ol type="i">
                <li>Ears of corn</li>
                <li>Scarecrows</li>
                <li>Circles inside grid spaces</li>
                <li>Circles outside grid spaces</li>
              </ol>
            </li>
            <li>
              You may notice at this point that the central grid only has
              circles inside grid spaces, and the smaller grids only have
              circles outside grid spaces.
            </li>
            <li>Two answers are already filled in—ENTER and EXIT.</li>
          </ol>
        </li>
        <li>
          Attempt to solve the maze by pathing from ENTER to EXIT following the
          rules laid out in the flavor text, and discover that you can’t. There
          is no valid path given the rules as you know them at this point.
          <ol type="a">
            <li>
              This is intended to strongly hint that you will need to discover
              another mechanic for traversing the puzzle if you want to complete
              the maze.
            </li>
          </ol>
        </li>
        <li>
          Begin solving crossword clues and trying to figure out which grid they
          belong to. As you start to solve some of the clues, it should become
          apparent that many of them are very strongly themed to certain
          intellectual properties. Some of the theming will be discernible just
          from the clue, which should help here. There is an intended “a-ha”
          here, in which you figure out that{" "}
          <strong>there is a different theme for each grid.</strong>
          <ol type="a">
            <li>
              There are 5 themes in all, one for each grid. The four smaller
              grids have IP themes, and the larger grid is generic.
              <ol type="i">
                <li>Harry Potter</li>
                <li>Star Wars</li>
                <li>Skyrim</li>
                <li>Zelda</li>
                <li>
                  A generic (or “real world”) theme for the largest grid. These
                  answers explicitly do not contain references to any IP, to
                  avoid creating confusing red herrings for themes that do not
                  exist
                </li>
              </ol>
            </li>
            <li>
              Within the themed grids every single answer is themed, both across
              and down. This should make it easier to figure out which clues go
              to which grids, once this “a-ha” has been realized.
            </li>
          </ol>
        </li>
        <li>
          Start figuring out the placement of a few clues, making it easier to
          figure out more and more. There are several numbers which only appear
          in one grid, which should help you get a foothold into placement early
          on. If you have figured out the “a-ha” in step 4, the theming of
          clues/answers should help you place them into their correct grids.
        </li>
        <li>
          Once you reach a critical mass of crossword clues solved and placed,
          it should become possible to notice that{" "}
          <strong>
            every ear of corn in the puzzle is placed next to the first letter
            of a word in the grid
          </strong>
          . In some cases this could be a word in the middle of a multi-word
          answer (next to the R in “FUS RO DAH” for example).
        </li>
        <li>
          If you examine the words that are flagged by having an ear of corn
          next to their first letter, you will need to notice that they are all
          homophones. This is clued in several ways:
          <ol type="a">
            <li>
              The flavor text hints that the sound of things will be important
            </li>
            <li>
              The fact that “ears” are used to mark them, and that ear (body
              part) / ear (corn) is a homophone itself.
            </li>
            <li>
              The name of the puzzle hints at this mechanic by playing with the
              homophone maze/maize.
            </li>
          </ol>
        </li>
        <li>
          Next, you will need to notice that each ear-marked word has a matching
          homophone in exactly one other place in the puzzle. For example, look
          at the earmarked “THAI” in “PADTHAI”—there is only one other “THAI”
          homophone in the puzzle, in the answer “TIEFIGHTERS”. The two members
          of a homophone pair will always be in different grids from one
          another. You will need to solve enough of the puzzle’s clues to be
          able to find these matches before you can proceed.
        </li>
        <li>
          Now you will need to figure out that these homophone/ear pairs are the
          missing mechanic that you need to be able to solve the maze. You can
          path into the ear of corn in an earmarked word such as “THAI”, and
          come out at the first letter of its homophone pair. So you can go from
          the T in THAI to the T in TIE.
          <ol type="a">
            <li>
              This mechanic is directly called out by the flavor text, which
              includes the line “In one ear and out…somewhere”.
            </li>
          </ol>
        </li>
        <li>
          Now that you have a mechanic that allows you to traverse between
          grids, begin to solve the maze.
          <ol type="a">
            <li>
              You now know the full set of rules you need to follow:
              <ol type="i">
                <li>Go from ENTER to EXIT.</li>
                <li>Always take the shortest path possible.</li>
                <li>Don’t path adjacent to a scarecrow.</li>
                <li>
                  Path into an ear of corn in one grid and you’ll come out at
                  the first letter of its homophone pair.
                </li>
              </ol>
            </li>
            <li>
              Solving this maze will require you to solve most or all of the
              homophone-pair clues.
            </li>
            <li>
              The solution to the maze will take you through every smaller grid
              at least once, and will cross back into the larger grid multiple
              times.
            </li>
          </ol>
        </li>
        <li>
          Once you have solved the maze, you will have a strong ordering to work
          with—the order in which the maze solution pathway encounters things as
          it moves from ENTER to EXIT. At this point the circles that are
          scattered around the girds come into play.
          <ol type="a">
            <li>
              Follow the maze pathway from ENTER to EXIT. Every time it
              encounters a circle, write down the letter that is inside that
              circle. Doing this will spell out the phrase{" "}
              <Mono>PUT CORN ON THE COBB</Mono>.
            </li>
            <li>
              Note that all of the on-grid circles are in the main grid. The
              maze solution will also take you adjacent to many off-grid circles
              in the themed grids. This will be relevant in an upcoming step.
            </li>
          </ol>
        </li>
        <li>
          Using the clue phrase <Mono>PUT CORN ON THE COBB</Mono>, you will need
          to notice two things:
          <ol type="a">
            <li>
              <strong>
                Each smaller grid has exactly one answer which contains the word
                “CORN”.
              </strong>
              <ol type="i">
                <li>
                  Note, this can be inside a word, such as in “UNICORN BLOOD”.
                </li>
              </ol>
            </li>
            <li>
              <strong>The larger grid has exactly one answer “COBB”</strong>,
              very near the middle of the grid.
              <ol type="i">
                This is clued by the clue phrase using “COBB” instead of “COB”,
                and referring to THE COBB in an attempt to point out that it is
                the only COBB in the grid.
              </ol>
            </li>
          </ol>
        </li>
        <li>
          You will now need to follow the instruction from the clue phrase, and
          literally put the CORNs on the COBB.
          <ol type="a">
            <li>
              <strong>
                You will need to overlay the smaller grid on top of the larger
                grid, with the CORN answer sitting on top of the COBB answer.
              </strong>
              <ol type="i">
                This could be done physically if you printed the puzzle out, or
                digitally if you’re using a spreadsheet.
              </ol>
            </li>
            <li>
              Each smaller grid has a number of off-grid circles which have been
              unused up to this point.{" "}
              <strong>
                When you overlay the smaller grids on the larger grid, the
                smaller grids’ off-grid circles will line up with letters in the
                larger grid.
              </strong>{" "}
              The end result of the overlay will be that a letter becomes
              associated with all of the off-grid circles in every themed grid.
            </li>
          </ol>
        </li>
        <li>
          The next step is to repeat the maze-following mechanic, this time
          looking at the off-grid circles in the themed grids.
          <ol type="a">
            <li>
              Follow the maze path again. This time, write down the letter
              inside of every off-grid circle the maze paths directly adjacent
              to.
            </li>
            <li>
              Doing this will give you the phrase{" "}
              <Mono>PLANT PLACE AT HOME DEPOT</Mono>.
            </li>
          </ol>
        </li>
        <li>
          You now have the final clue of the puzzle. Solve this as you would a
          crossword clue. The answer to this clue is the answer to the puzzle:{" "}
          <PuzzleAnswer>GARDEN CENTER</PuzzleAnswer>.
        </li>
      </ol>
      <h3>Solved Puzzle Grids</h3>
      <p>
        Note that these have the maze solution highlighted as well, along with
        the correct letter for all of the off-grid circles.
      </p>
      {CORN_MAZES.map((cornMaze, i) => (
        <HScrollTableWrapper key={i}>
          <StyledCornMaze cornMaze={cornMaze} puzzleMode={false} />
        </HScrollTableWrapper>
      ))}
      <h3>Maze Solution Info</h3>
      <HScrollTableWrapper>
        <StyledTable>
          <tr>
            <th>Pathway #</th>
            <th>Homophone pair</th>
            <th>Full answer</th>
            <th>Grid</th>
            <th>Clue phrase</th>
          </tr>
          {DATA.map(([pathway, homophone, answer, grid, clue], i) => (
            <tr key={i}>
              <td>{pathway}</td>
              <td>{homophone}</td>
              <td>{answer}</td>
              <td>{grid}</td>
              <td>{clue}</td>
            </tr>
          ))}
        </StyledTable>
      </HScrollTableWrapper>
    </>
  );
};

export default Solution;
