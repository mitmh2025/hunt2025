import React from "react";
import { styled } from "styled-components";
import { HScrollTableWrapper, PuzzleAnswer } from "../../components/StyledUI";
import {
  BuildTable,
  Cell,
  EMPTY_COLOR,
  FILLED_COLOR,
  HEAVY_BLUE,
  LIGHT_BLUE,
  LIGHT_RED,
  MaterialsTableContainer,
} from "./puzzle";

const MaterialsTableLabeled = styled(MaterialsTableContainer)`
  text-align: center;
  vertical-align: middle;
  font-family: sans-serif;
  font-size: 24px;
  font-weight: bold;
`;

const Solution = () => {
  return (
    <>
      <p>
        This is a metapuzzle using the feeder answers ACRYLATE, TILECUTTER,
        SLIVERS.
      </p>
      <p>
        The list of materials allows you to match feeders from this round to
        this puzzle. The 5x5 grid of cuttable tiles confirms the answer lengths
        (a total of 25 letters) and that these letters should be rearranged on
        the board below.
      </p>
      <p>
        (Authors Note: At a high level, these also represent what you’ll need to
        solve the puzzle - the tiles themselves, scissors, and the extra letters
        given in the grid)
      </p>

      <div>Materials:</div>
      <ul>
        <li>
          Polymer: <strong>ACRYLATE</strong>
        </li>
        <li>
          Appropriate Tool: <strong>TILE CUTTER</strong>
        </li>
        <li>
          Scrap Material: <strong>SLIVERS</strong>
        </li>
      </ul>

      <HScrollTableWrapper>
        <MaterialsTableLabeled>
          <tbody>
            <tr>
              <td>A</td>
              <td>C</td>
              <td>R</td>
              <td style={{ borderBottom: "2px solid black" }}>Y</td>
              <td style={{ borderBottom: "2px solid black" }}>L</td>
            </tr>
            <tr>
              <td style={{ borderBottom: "2px solid black" }}>A</td>
              <td style={{ borderBottom: "2px solid black" }}>T</td>
              <td
                style={{
                  borderBottom: "2px solid black",
                  borderRight: "2px solid black",
                }}
              >
                E
              </td>
              <td>T</td>
              <td>I</td>
            </tr>
            <tr>
              <td>L</td>
              <td>E</td>
              <td>C</td>
              <td style={{ borderBottom: "2px solid black" }}>U</td>
              <td style={{ borderBottom: "2px solid black" }}>T</td>
            </tr>
            <tr>
              <td style={{ borderBottom: "2px solid black" }}>T</td>
              <td style={{ borderBottom: "2px solid black" }}>E</td>
              <td
                style={{
                  borderBottom: "2px solid black",
                  borderRight: "2px solid black",
                }}
              >
                R
              </td>
              <td>S</td>
              <td>L</td>
            </tr>
            <tr>
              <td>I</td>
              <td>V</td>
              <td>E</td>
              <td>R</td>
              <td>S</td>
            </tr>
          </tbody>
        </MaterialsTableLabeled>
      </HScrollTableWrapper>

      <p>
        The tiles can be put into the below grid to produce words matching the
        list of items that can be made (not all of these are nouns, but we tried
        to keep them mostly thematic). The a-ha is that these are Scrabble tiles
        and this is a Scrabble board. The pink, light blue, and dark blue tiles
        give you information for scoring the tile words (double word, double
        letter, triple letter).
      </p>

      <p>
        Scoring all the words by standard scrabble tile values and rules, and
        reading those scores as letters (A=1, Z=26) in the order given produces
        the answer, <PuzzleAnswer>PENROSE</PuzzleAnswer>, a famous tiler.
      </p>

      <HScrollTableWrapper>
        <table>
          <thead>
            <tr>
              <th>Given</th>
              <th>Word</th>
              <th>Score</th>
              <th>Letter</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Split</td>
              <td>RIVE</td>
              <td>16</td>
              <td>P</td>
            </tr>
            <tr>
              <td>Rock</td>
              <td>SLATE</td>
              <td>5</td>
              <td>E</td>
            </tr>
            <tr>
              <td>Frame</td>
              <td>TRELLIS</td>
              <td>14</td>
              <td>N</td>
            </tr>
            <tr>
              <td>Soil</td>
              <td>CLAY</td>
              <td>18</td>
              <td>R</td>
            </tr>
            <tr>
              <td>Up</td>
              <td>ERECT</td>
              <td>15</td>
              <td>O</td>
            </tr>
            <tr>
              <td>Gem</td>
              <td>CRYSTAL</td>
              <td>19</td>
              <td>S</td>
            </tr>
            <tr>
              <td>Clothing</td>
              <td>SUIT</td>
              <td>5</td>
              <td>E</td>
            </tr>
          </tbody>
        </table>
      </HScrollTableWrapper>

      <HScrollTableWrapper>
        <BuildTable>
          <tr>
            <Cell />
            <Cell $color={HEAVY_BLUE}>E</Cell>
            <Cell />
            <Cell $color={EMPTY_COLOR}>C</Cell>
            <Cell />
            <Cell />
            <Cell />
            <Cell />
          </tr>
          <tr>
            <Cell $color={EMPTY_COLOR}>T</Cell>
            <Cell $color={EMPTY_COLOR}>R</Cell>
            <Cell $color={EMPTY_COLOR}>E</Cell>
            <Cell $color={LIGHT_RED}>L</Cell>
            <Cell $color={EMPTY_COLOR}>L</Cell>
            <Cell $color={EMPTY_COLOR}>I</Cell>
            <Cell $color={EMPTY_COLOR}>S</Cell>
            <Cell />
          </tr>
          <tr>
            <Cell />
            <Cell $color={EMPTY_COLOR}>E</Cell>
            <Cell />
            <Cell $color={EMPTY_COLOR}>A</Cell>
            <Cell />
            <Cell />
            <Cell $color={EMPTY_COLOR}>L</Cell>
            <Cell />
          </tr>
          <tr>
            <Cell />
            <Cell $color={HEAVY_BLUE}>C</Cell>
            <Cell $color={EMPTY_COLOR}>R</Cell>
            <Cell $color={EMPTY_COLOR}>Y</Cell>
            <Cell $color={EMPTY_COLOR}>S</Cell>
            <Cell $color={LIGHT_BLUE}>T</Cell>
            <Cell $color={EMPTY_COLOR}>A</Cell>
            <Cell $color={FILLED_COLOR}>L</Cell>
          </tr>
          <tr>
            <Cell />
            <Cell $color={EMPTY_COLOR}>T</Cell>
            <Cell />
            <Cell />
            <Cell $color={LIGHT_BLUE}>U</Cell>
            <Cell />
            <Cell $color={EMPTY_COLOR}>T</Cell>
            <Cell />
          </tr>
          <tr>
            <Cell />
            <Cell />
            <Cell />
            <Cell $color={LIGHT_BLUE}>R</Cell>
            <Cell $color={EMPTY_COLOR}>I</Cell>
            <Cell $color={LIGHT_RED}>V</Cell>
            <Cell $color={EMPTY_COLOR}>E</Cell>
            <Cell />
          </tr>
          <tr>
            <Cell />
            <Cell />
            <Cell />
            <Cell />
            <Cell $color={FILLED_COLOR}>T</Cell>
            <Cell />
            <Cell />
            <Cell />
          </tr>
        </BuildTable>
      </HScrollTableWrapper>
    </>
  );
};

export default Solution;
