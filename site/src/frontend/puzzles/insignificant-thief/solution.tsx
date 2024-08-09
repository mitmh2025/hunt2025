import React from "react";
import { styled, css } from "styled-components";

const MonoUL = styled.ul`
  font-family: monospace;
`;

const PenTable = styled.table`
  border: 4px solid black;
  border-collapse: collapse;
  td {
    text-align: center;
    vertical-align: middle;
    border-collapse: collapse;
  }
  margin: 16px 0px;
`;

const COLORS = {
  pink: "#f0c0c1",
  orange: "#f7c08b",
  green: "#83bc6b",
  blue: "#689efa",
  purple: "#a488f3",
};

const Cell = styled.td<{
  $color?: keyof typeof COLORS;
  $walls?: "right" | "bottom" | "both";
}>`
  font-family: sans-serif;
  width: 64px;
  height: 64px;
  border: 1px solid black;
  ${({ $color }) =>
    $color &&
    css`
      background-color: ${COLORS[$color]};
    `}
  ${({ $walls }) =>
    ($walls === "right" || $walls === "both") &&
    css`
      border-right: 4px solid black;
    `}
  ${({ $walls }) =>
    ($walls === "bottom" || $walls === "both") &&
    css`
      border-bottom: 4px solid black;
    `}
`;

const StartCell = styled(Cell)`
  background-color: #d2e7ca;
`;

const StopCell = styled(Cell)`
  background-color: #e5c6d5;
`;

const GRID_STRING = `
CO T T O N X
K E Y S T O
NE X G O L DE
N X C R E O
L E X P E A
C E G AR DE N
`.trim();
const GRID_ROWS = GRID_STRING.split("\n");
const GRID = GRID_ROWS.map((row) => row.split(" "));

const GridTable = styled.table`
  border: 1px solid black;
  border-collapse: collapse;
  td {
    text-align: center;
    vertical-align: middle;
    width: 32px;
    height: 32px;
    border: 1px solid black;
    border-collapse: collapse;
  }
`;

const Solution = () => {
  return (
    <>
      <p>
        This meta puzzle is part of a larger round with a shared group of feeder
        puzzles. This solution will necessarily contain spoilers for the larger
        round.
      </p>
      <p>
        The first aha is that each animal in the grid is native to North
        America, and in fact each is an{" "}
        <a href="https://en.wikipedia.org/wiki/List_of_U.S._state_mammals">
          official state symbol of at least one US state
        </a>
        . This is clued by the puzzle text stating that the “map” (grid) shows
        “a state” of each animal.
      </p>
      <p>
        The image shows three cervids, two which are meant to be easily
        identifiable as a white-tailed deer and a moose. Consulting a list of
        official state mammals/animals, the only other distinct cervid is the
        Rocky Mountain Elk. The five animals shown are:
      </p>

      <table>
        <thead>
          <tr>
            <th>Animal</th>
            <th>State symbol of:</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>White-tailed deer</td>
            <td>AR, GA, IL, MI, MS, NE, NH, OH, OK, PA, SC, WI</td>
          </tr>
          <tr>
            <td>American black bear</td>
            <td>AL, LA, NM, WV</td>
          </tr>
          <tr>
            <td>Rocky Mountain elk</td>
            <td>UT</td>
          </tr>
          <tr>
            <td>Moose</td>
            <td>AK, ME</td>
          </tr>
          <tr>
            <td>North American beaver</td>
            <td>NY, OR</td>
          </tr>
        </tbody>
      </table>

      <p>
        At least one of these state abbreviations is included in at least one
        answer in this round, either to a “subsidiary” puzzle or a “shell
        corporation” puzzle.
      </p>

      <p>
        Five answers must be placed each along the solved path of one animal in
        the grid, with one letter in each empty grid space and a matching state
        abbreviation at the shown location of each animal. This means that the
        total length of the five answers must be 36 + 5 = 41 letters. Only one
        set of answers in the round meets these criteria, even before
        considering paths in the grid:
      </p>

      <MonoUL>
        <li>
          O<u>PA</u>L
        </li>
        <li>
          ACRY<u>LA</u>TE
        </li>
        <li>
          ABO<u>UT</u>
        </li>
        <li>
          MILLI<u>ME</u>TERS
        </li>
        <li>
          ROUNDING ERR<u>OR</u>
        </li>
      </MonoUL>

      <p>
        Knowing the length of each path, and the position of each animal on each
        path (e.g. the deer is on the second step of a length-three path), the
        grid admits only one full set of paths that meet all the stated rules. A
        possible solve-path is given later in this document.
      </p>

      <PenTable>
        <tbody>
          <tr>
            <Cell>PA</Cell>
            <StopCell $walls="both">L</StopCell>
            <StartCell $walls="bottom">R</StartCell>
            <Cell $walls="bottom">O</Cell>
            <Cell $walls="bottom">U</Cell>
            <Cell>N</Cell>
          </tr>
          <tr>
            <StartCell $walls="both">O</StartCell>
            <Cell>R</Cell>
            <Cell $walls="right">C</Cell>
            <Cell>N</Cell>
            <Cell $walls="bottom">I</Cell>
            <Cell $walls="bottom">D</Cell>
          </tr>
          <tr>
            <Cell>LA</Cell>
            <Cell $walls="both">Y</Cell>
            <StartCell $walls="both">A</StartCell>
            <Cell $walls="bottom">G</Cell>
            <Cell $walls="right">E</Cell>
            <StopCell>UT</StopCell>
          </tr>
          <tr>
            <Cell $walls="bottom">T</Cell>
            <StopCell $walls="both">E</StopCell>
            <Cell>R</Cell>
            <StopCell $walls="both">S</StopCell>
            <Cell $walls="right">R</Cell>
            <Cell>O</Cell>
          </tr>
          <tr>
            <Cell>I</Cell>
            <StartCell $walls="both">M</StartCell>
            <Cell $walls="bottom">E</Cell>
            <Cell $walls="right">T</Cell>
            <Cell $walls="right">R</Cell>
            <Cell>B</Cell>
          </tr>
          <tr>
            <Cell>L</Cell>
            <Cell>L</Cell>
            <Cell>I</Cell>
            <Cell $walls="right">ME</Cell>
            <StopCell $walls="right">OR</StopCell>
            <StartCell>A</StartCell>
          </tr>
        </tbody>
      </PenTable>

      <p>
        After this placement of letters in the grid is complete, the smaller
        grid of numerical changes can be used. These are applied to the single
        letter cells by shifting their letters along the alphabet. On the state
        abbreviation squares, some of the shifts are too big for this. Instead,
        these are shifted as state abbreviations, numbering the states{" "}
        <a href="https://en.wikipedia.org/wiki/List_of_U.S._states_by_date_of_admission_to_the_Union">
          based on their order of joining the Union
        </a>
        .
      </p>

      <GridTable>
        <tbody>
          {GRID.map((row, i) => {
            return (
              <tr key={i}>
                {row.map((cell, j) => {
                  return <td key={j}>{cell}</td>;
                })}
              </tr>
            );
          })}
        </tbody>
      </GridTable>

      <p>
        This results in five X-separated words or phrases in the grid in reading
        order. Each of these, in “the [word or phrase] state,” is{" "}
        <a href="https://en.wikipedia.org/wiki/List_of_U.S._state_and_territory_nicknames">
          a nickname for one of the US states
        </a>
        .
      </p>

      <table>
        <thead>
          <tr>
            <th>Nickname</th>
            <th>State</th>
            <th>Abbreviation</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>The Cotton State</td>
            <td>Alabama</td>
            <td>AL</td>
          </tr>
          <tr>
            <td>The Keystore State</td>
            <td>Pennsylvania</td>
            <td>PA</td>
          </tr>
          <tr>
            <td>The Golden State</td>
            <td>California</td>
            <td>CA</td>
          </tr>
          <tr>
            <td>The Creole State</td>
            <td>Louisiana</td>
            <td>LA</td>
          </tr>
          <tr>
            <td>The Peace Garden State</td>
            <td>North Dakota</td>
            <td>ND</td>
          </tr>
        </tbody>
      </table>

      <p>
        Taken in order, these come together to form the answer to the puzzle:
        ALPACA LAND.
      </p>

      <hr />

      <p>One possible solve path for placing answer in the grid:</p>

      <p>
        Once the answer assignment is known, the grid can be thought of as the
        animal givens being a position within a path, as:
      </p>

      <PenTable>
        <tbody>
          <tr>
            <Cell>2/3</Cell>
            <Cell />
            <Cell />
            <Cell />
            <Cell />
            <Cell />
          </tr>
          <tr>
            <Cell />
            <Cell />
            <Cell />
            <Cell />
            <Cell />
            <Cell />
          </tr>
          <tr>
            <Cell>5/7</Cell>
            <Cell />
            <Cell $walls="both" />
            <Cell />
            <Cell />
            <Cell>4/4</Cell>
          </tr>
          <tr>
            <Cell />
            <Cell />
            <Cell />
            <Cell />
            <Cell />
            <Cell />
          </tr>
          <tr>
            <Cell />
            <Cell $walls="bottom" />
            <Cell />
            <Cell />
            <Cell />
            <Cell />
          </tr>
          <tr>
            <Cell />
            <Cell />
            <Cell />
            <Cell>6/10</Cell>
            <Cell>12/12</Cell>
            <Cell />
          </tr>
        </tbody>
      </PenTable>

      <p>
        Middle parts of paths in corners must extend in both directions. Doing
        this for the 2/3 also makes the 5/7 be in a corner. It is not
        immediately known which direction these paths are going, so initially
        the cells belonging to each path will be colored.
      </p>

      <PenTable>
        <tbody>
          <tr>
            <Cell $color="pink">2/3</Cell>
            <Cell $color="pink" />
            <Cell />
            <Cell />
            <Cell />
            <Cell />
          </tr>
          <tr>
            <Cell $color="pink" />
            <Cell />
            <Cell />
            <Cell />
            <Cell />
            <Cell />
          </tr>
          <tr>
            <Cell $color="orange">5/7</Cell>
            <Cell $color="orange" />
            <Cell $walls="both" />
            <Cell />
            <Cell />
            <Cell>4/4</Cell>
          </tr>
          <tr>
            <Cell $color="orange" />
            <Cell />
            <Cell />
            <Cell />
            <Cell />
            <Cell />
          </tr>
          <tr>
            <Cell />
            <Cell $walls="bottom" />
            <Cell />
            <Cell $color="green" />
            <Cell />
            <Cell />
          </tr>
          <tr>
            <Cell />
            <Cell />
            <Cell $color="green" />
            <Cell $color="green">6/10</Cell>
            <Cell>12/12</Cell>
            <Cell />
          </tr>
        </tbody>
      </PenTable>

      <p>
        This is the complete path for the 2/3. Both its start and its end are
        adjacent to R2C2, so that cell can be neither the start nor end of a
        path. Drawing in the entrance and exit through the only two available
        edges connects up to the 5/7 path, and also isolates the square next to
        the double border, forcing it to be part of that path as well. This
        makes 4 cells along the path on one side of 5/7, meaning that must be
        side towards the start of the path.
      </p>

      <PenTable>
        <tbody>
          <tr>
            <Cell $color="pink">2/3</Cell>
            <Cell $color="pink" />
            <Cell />
            <Cell />
            <Cell />
            <Cell />
          </tr>
          <tr>
            <Cell $color="pink" />
            <Cell $color="orange">3</Cell>
            <Cell $color="orange">2</Cell>
            <Cell />
            <Cell />
            <Cell />
          </tr>
          <tr>
            <Cell $color="orange">5/7</Cell>
            <Cell $color="orange">4</Cell>
            <Cell $color="orange" $walls="both">
              1
            </Cell>
            <Cell />
            <Cell />
            <Cell>4/4</Cell>
          </tr>
          <tr>
            <Cell $color="orange">6</Cell>
            <Cell />
            <Cell />
            <Cell />
            <Cell />
            <Cell />
          </tr>
          <tr>
            <Cell />
            <Cell $walls="bottom" />
            <Cell />
            <Cell $color="green" />
            <Cell />
            <Cell />
          </tr>
          <tr>
            <Cell />
            <Cell />
            <Cell $color="green" />
            <Cell $color="green">6/10</Cell>
            <Cell>12/12</Cell>
            <Cell />
          </tr>
        </tbody>
      </PenTable>

      <p>
        Cell R6C6 in the lower left corner must belong to the 4/4 cell. If it
        belonged to 6/10, this would trap the 12/12 in a region less than twelve
        cells large. If it belonged to the 12/12 path, it would have to be 11,
        and from there leave either a cell in R5C5 or R4C6 that could not be
        filled when the path escapes through R4C5. Having established that R6C6
        must belong to 4/4, it can only be reached by a straight shot,
        completing that path.
      </p>

      <PenTable>
        <tbody>
          <tr>
            <Cell $color="pink">2/3</Cell>
            <Cell $color="pink" />
            <Cell />
            <Cell />
            <Cell />
            <Cell />
          </tr>
          <tr>
            <Cell $color="pink" />
            <Cell $color="orange">3</Cell>
            <Cell $color="orange">2</Cell>
            <Cell />
            <Cell />
            <Cell />
          </tr>
          <tr>
            <Cell $color="orange">5/7</Cell>
            <Cell $color="orange">4</Cell>
            <Cell $color="orange" $walls="both">
              1
            </Cell>
            <Cell />
            <Cell />
            <Cell $color="blue">4/4</Cell>
          </tr>
          <tr>
            <Cell $color="orange">6</Cell>
            <Cell />
            <Cell />
            <Cell />
            <Cell />
            <Cell $color="blue">3</Cell>
          </tr>
          <tr>
            <Cell />
            <Cell $walls="bottom" />
            <Cell />
            <Cell $color="green" />
            <Cell />
            <Cell $color="blue">2</Cell>
          </tr>
          <tr>
            <Cell />
            <Cell />
            <Cell $color="green" />
            <Cell $color="green">6/10</Cell>
            <Cell>12/12</Cell>
            <Cell $color="blue">1</Cell>
          </tr>
        </tbody>
      </PenTable>

      <p>
        This forces the 12/12 path to extend upward. It cannot take R4C4, as
        this would isolate the 6/10 in a region of size 10 where one cell must
        still be taken by the final step of the 5/7 path. This nearly completes
        the coloring of the grid.
      </p>

      <PenTable>
        <tbody>
          <tr>
            <Cell $color="pink">2/3</Cell>
            <Cell $color="pink" />
            <Cell $color="purple" />
            <Cell $color="purple" />
            <Cell $color="purple" />
            <Cell $color="purple" />
          </tr>
          <tr>
            <Cell $color="pink" />
            <Cell $color="orange">3</Cell>
            <Cell $color="orange">2</Cell>
            <Cell $color="purple" />
            <Cell $color="purple" />
            <Cell $color="purple" />
          </tr>
          <tr>
            <Cell $color="orange">5/7</Cell>
            <Cell $color="orange">4</Cell>
            <Cell $color="orange" $walls="both">
              1
            </Cell>
            <Cell $color="purple" />
            <Cell $color="purple" />
            <Cell $color="blue">4/4</Cell>
          </tr>
          <tr>
            <Cell $color="orange">6</Cell>
            <Cell />
            <Cell $color="green" />
            <Cell $color="green" />
            <Cell $color="purple" />
            <Cell $color="blue">3</Cell>
          </tr>
          <tr>
            <Cell />
            <Cell $color="green" $walls="bottom" />
            <Cell $color="green" />
            <Cell $color="green" />
            <Cell $color="purple" />
            <Cell $color="blue">2</Cell>
          </tr>
          <tr>
            <Cell $color="green" />
            <Cell $color="green" />
            <Cell $color="green" />
            <Cell $color="green">6/10</Cell>
            <Cell $color="purple">12/12</Cell>
            <Cell $color="blue">1</Cell>
          </tr>
        </tbody>
      </PenTable>

      <p>
        The 12/12 region has a dead-end cell, which must be the start of its
        path. From there, there is a unique path to fill all 12 cells. This also
        places a starting cell next to one terminus of the 2/3 path, setting its
        direction.
      </p>

      <PenTable>
        <tbody>
          <tr>
            <Cell $color="pink">2/3</Cell>
            <Cell $color="pink">3</Cell>
            <Cell $color="purple">1</Cell>
            <Cell $color="purple">2</Cell>
            <Cell $color="purple">3</Cell>
            <Cell $color="purple">4</Cell>
          </tr>
          <tr>
            <Cell $color="pink">1</Cell>
            <Cell $color="orange">3</Cell>
            <Cell $color="orange">2</Cell>
            <Cell $color="purple">7</Cell>
            <Cell $color="purple">6</Cell>
            <Cell $color="purple">5</Cell>
          </tr>
          <tr>
            <Cell $color="orange">5/7</Cell>
            <Cell $color="orange">4</Cell>
            <Cell $color="orange" $walls="both">
              1
            </Cell>
            <Cell $color="purple">8</Cell>
            <Cell $color="purple">9</Cell>
            <Cell $color="blue">4/4</Cell>
          </tr>
          <tr>
            <Cell $color="orange">6</Cell>
            <Cell />
            <Cell $color="green" />
            <Cell $color="green" />
            <Cell $color="purple">10</Cell>
            <Cell $color="blue">3</Cell>
          </tr>
          <tr>
            <Cell />
            <Cell $color="green" $walls="bottom" />
            <Cell $color="green" />
            <Cell $color="green" />
            <Cell $color="purple">11</Cell>
            <Cell $color="blue">2</Cell>
          </tr>
          <tr>
            <Cell $color="green" />
            <Cell $color="green" />
            <Cell $color="green" />
            <Cell $color="green">6/10</Cell>
            <Cell $color="purple">12/12</Cell>
            <Cell $color="blue">1</Cell>
          </tr>
        </tbody>
      </PenTable>

      <p>
        The 5/7 path cannot extend downward from 6 to 7, as this would make R6C1
        a start for the 6/10 path, forcing out a 3 in R6C3, but this must be
        either a 5 or a 7 due to the 6/10 clue. As such the 5/7 path must go to
        the right to finish, completing the grid coloring.
      </p>

      <PenTable>
        <tbody>
          <tr>
            <Cell $color="pink">2/3</Cell>
            <Cell $color="pink">3</Cell>
            <Cell $color="purple">1</Cell>
            <Cell $color="purple">2</Cell>
            <Cell $color="purple">3</Cell>
            <Cell $color="purple">4</Cell>
          </tr>
          <tr>
            <Cell $color="pink">1</Cell>
            <Cell $color="orange">3</Cell>
            <Cell $color="orange">2</Cell>
            <Cell $color="purple">7</Cell>
            <Cell $color="purple">6</Cell>
            <Cell $color="purple">5</Cell>
          </tr>
          <tr>
            <Cell $color="orange">5/7</Cell>
            <Cell $color="orange">4</Cell>
            <Cell $color="orange" $walls="both">
              1
            </Cell>
            <Cell $color="purple">8</Cell>
            <Cell $color="purple">9</Cell>
            <Cell $color="blue">4/4</Cell>
          </tr>
          <tr>
            <Cell $color="orange">6</Cell>
            <Cell $color="orange">7</Cell>
            <Cell $color="green" />
            <Cell $color="green" />
            <Cell $color="purple">10</Cell>
            <Cell $color="blue">3</Cell>
          </tr>
          <tr>
            <Cell $color="green" />
            <Cell $color="green" $walls="bottom" />
            <Cell $color="green" />
            <Cell $color="green" />
            <Cell $color="purple">11</Cell>
            <Cell $color="blue">2</Cell>
          </tr>
          <tr>
            <Cell $color="green" />
            <Cell $color="green" />
            <Cell $color="green" />
            <Cell $color="green">6/10</Cell>
            <Cell $color="purple">12/12</Cell>
            <Cell $color="blue">1</Cell>
          </tr>
        </tbody>
      </PenTable>

      <p>
        There are three possible ways that the 6/10 path could fill its region,
        but two of them place its end touching the 5/7 path’s end, leaving only
        one viable path. This completes the puzzle.
      </p>

      <PenTable>
        <tbody>
          <tr>
            <Cell $color="pink">2/3</Cell>
            <Cell $color="pink">3</Cell>
            <Cell $color="purple">1</Cell>
            <Cell $color="purple">2</Cell>
            <Cell $color="purple">3</Cell>
            <Cell $color="purple">4</Cell>
          </tr>
          <tr>
            <Cell $color="pink">1</Cell>
            <Cell $color="orange">3</Cell>
            <Cell $color="orange">2</Cell>
            <Cell $color="purple">7</Cell>
            <Cell $color="purple">6</Cell>
            <Cell $color="purple">5</Cell>
          </tr>
          <tr>
            <Cell $color="orange">5/7</Cell>
            <Cell $color="orange">4</Cell>
            <Cell $color="orange" $walls="both">
              1
            </Cell>
            <Cell $color="purple">8</Cell>
            <Cell $color="purple">9</Cell>
            <Cell $color="blue">4/4</Cell>
          </tr>
          <tr>
            <Cell $color="orange">6</Cell>
            <Cell $color="orange">7</Cell>
            <Cell $color="green">9</Cell>
            <Cell $color="green">10</Cell>
            <Cell $color="purple">10</Cell>
            <Cell $color="blue">3</Cell>
          </tr>
          <tr>
            <Cell $color="green">2</Cell>
            <Cell $color="green" $walls="bottom">
              1
            </Cell>
            <Cell $color="green">8</Cell>
            <Cell $color="green">7</Cell>
            <Cell $color="purple">11</Cell>
            <Cell $color="blue">2</Cell>
          </tr>
          <tr>
            <Cell $color="green">3</Cell>
            <Cell $color="green">4</Cell>
            <Cell $color="green">5</Cell>
            <Cell $color="green">6/10</Cell>
            <Cell $color="purple">12/12</Cell>
            <Cell $color="blue">1</Cell>
          </tr>
        </tbody>
      </PenTable>
    </>
  );
};

export default Solution;
