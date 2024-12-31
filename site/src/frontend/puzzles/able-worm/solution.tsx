import React from "react";
import { styled } from "styled-components";
import { HScrollTableWrapper, PuzzleAnswer } from "../../components/StyledUI";

const ClueSolutionTable = styled.table`
  tbody tr td:first-child {
    padding-right: 1rem;
  }
  tbody tr td:nth-child(2) {
    font-family: var(--monospace-font);
  }
`;

const FinalGridTable = styled.table`
  margin-top: 1rem;
  border-spacing: 0;
  line-height: 1rem;
  thead tr th {
    padding-bottom: 0.5rem;
  }
  tbody tr td {
    padding-left: 1rem;
    padding-right: 1rem;
    font-family: var(--monospace-font);
    text-align: center;
  }
`;

const Solution = () => {
  return (
    <>
      <p>
        The first step is to determine answers for the cross-word style clues
        given. After some have been answered, it should be recognized that the
        Across and Down answers are each in alphabetical order, and all answers
        are five letters long.
      </p>
      <p>
        The answers must then be arranged in a grid, but with the clue of the
        number triplets at bottom, not a two-dimensional arrangement but a 5×5×5
        cube.
      </p>
      <p>
        The answers can be uniquely arranged into five 5×5 grids. One of these
        grids has the crossing of X-AXIS and Y-AXIS through its center. The
        central X of this grid, along with the central letters of the other four
        grids, spell Z-AXIS, providing an ordering of the five grids into a
        cube.
      </p>
      <p>
        Using the conventional writing directions relative to the x, y, and z
        axes (down in the y direction, to the right in the x direction, and
        towards the back for the z direction, hence the title), the triplets at
        the bottom of the puzzle are coordinates in the cube, picking out in
        order the letters of <PuzzleAnswer>GUIANA CHESTNUT</PuzzleAnswer>.
      </p>
      <p>The answers to all clues and completed grids are below.</p>

      <h2>ACROSS</h2>
      <HScrollTableWrapper>
        <ClueSolutionTable>
          <thead>
            <tr>
              <th>Clue</th>
              <th>Answer</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Open-eyed</td>
              <td>AWARE</td>
            </tr>
            <tr>
              <td>It has bite, per a 90s commercial</td>
              <td>BARQS</td>
            </tr>
            <tr>
              <td>Titular animated spaceship</td>
              <td>BEBOP</td>
            </tr>
            <tr>
              <td>Military recruit</td>
              <td>CADET</td>
            </tr>
            <tr>
              <td>A greasy spoon or a person inside it</td>
              <td>DINER</td>
            </tr>
            <tr>
              <td>Royal decree</td>
              <td>EDICT</td>
            </tr>
            <tr>
              <td>What you must do on stage more than on film</td>
              <td>EMOTE</td>
            </tr>
            <tr>
              <td>Rapper Banks</td>
              <td>ERICA</td>
            </tr>
            <tr>
              <td>Entry hall</td>
              <td>FOYER</td>
            </tr>
            <tr>
              <td>Narrow valleys</td>
              <td>GLENS</td>
            </tr>
            <tr>
              <td>Aggravated</td>
              <td>IRATE</td>
            </tr>
            <tr>
              <td>Roman region</td>
              <td>LAZIO</td>
            </tr>
            <tr>
              <td>One who just can’t win</td>
              <td>LOSER</td>
            </tr>
            <tr>
              <td>Half-human, half-serpents</td>
              <td>NAGAS</td>
            </tr>
            <tr>
              <td>Antagonistic Shard of Adonalsium</td>
              <td>ODIUM</td>
            </tr>
            <tr>
              <td>Source of oil</td>
              <td>OLIVE</td>
            </tr>
            <tr>
              <td>Tiny fairy</td>
              <td>PIXIE</td>
            </tr>
            <tr>
              <td>Took an exam again</td>
              <td>RESAT</td>
            </tr>
            <tr>
              <td>Former Nebraskan Senator Ben</td>
              <td>SASSE</td>
            </tr>
            <tr>
              <td>Rudely blunt</td>
              <td>SHORT</td>
            </tr>
            <tr>
              <td>Actress Spacek</td>
              <td>SISSY</td>
            </tr>
            <tr>
              <td>Toboggans</td>
              <td>SLEDS</td>
            </tr>
            <tr>
              <td>Architectural layer</td>
              <td>STORY</td>
            </tr>
            <tr>
              <td>Ill-suited</td>
              <td>UNAPT</td>
            </tr>
            <tr>
              <td>Horizontal line</td>
              <td>XAXIS</td>
            </tr>
          </tbody>
        </ClueSolutionTable>
      </HScrollTableWrapper>

      <h2>DOWN</h2>
      <HScrollTableWrapper>
        <ClueSolutionTable>
          <thead>
            <tr>
              <th>Clue</th>
              <th>Answer</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>City on the Seyhan</td>
              <td>ADANA</td>
            </tr>
            <tr>
              <td>Reverse of a rare nickel</td>
              <td>BISON</td>
            </tr>
            <tr>
              <td>It shouldn’t be hard to swallow</td>
              <td>BOLUS</td>
            </tr>
            <tr>
              <td>Left with a cylindrical hole</td>
              <td>BORED</td>
            </tr>
            <tr>
              <td>Philippine tree cultivated for its resin</td>
              <td>ELEMI</td>
            </tr>
            <tr>
              <td>Clapton and Andre</td>
              <td>ERICS</td>
            </tr>
            <tr>
              <td>Telephonic copies</td>
              <td>FAXES</td>
            </tr>
            <tr>
              <td>Once every sixty minutes</td>
              <td>HORAL</td>
            </tr>
            <tr>
              <td>Those killed in Killers of the Flower Moon</td>
              <td>OSAGE</td>
            </tr>
            <tr>
              <td>Egg-shaped</td>
              <td>OVATE</td>
            </tr>
            <tr>
              <td>Word at the end of some Japanese films</td>
              <td>OWARI</td>
            </tr>
            <tr>
              <td>Rust, for example</td>
              <td>OXIDE</td>
            </tr>
            <tr>
              <td>Colleague of Paul and Mary</td>
              <td>PETER</td>
            </tr>
            <tr>
              <td>Bon mots</td>
              <td>QUIPS</td>
            </tr>
            <tr>
              <td>State for a second time</td>
              <td>RESAY</td>
            </tr>
            <tr>
              <td>Get some sun after paling</td>
              <td>RETAN</td>
            </tr>
            <tr>
              <td>Cut into small pieces, as cauliflower</td>
              <td>RICED</td>
            </tr>
            <tr>
              <td>Gilded icon coverings</td>
              <td>RIZAS</td>
            </tr>
            <tr>
              <td>Support for an injured arm</td>
              <td>SLING</td>
            </tr>
            <tr>
              <td>Struck down</td>
              <td>SMOTE</td>
            </tr>
            <tr>
              <td>Short glasses?</td>
              <td>SPECS</td>
            </tr>
            <tr>
              <td>Like the pull of the moon</td>
              <td>TIDAL</td>
            </tr>
            <tr>
              <td>A lock</td>
              <td>TRESS</td>
            </tr>
            <tr>
              <td>Vertical line</td>
              <td>YAXIS</td>
            </tr>
            <tr>
              <td>Hinged iron gates</td>
              <td>YETTS</td>
            </tr>
          </tbody>
        </ClueSolutionTable>
      </HScrollTableWrapper>

      <HScrollTableWrapper>
        <FinalGridTable>
          <thead>
            <tr>
              <th>Z = 2</th>
              <th>Z = 1</th>
              <th>Z = 0</th>
              <th>Z = -1</th>
              <th>Z = -2</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>BARQS</td>
              <td>SHORT</td>
              <td>FOYER</td>
              <td>STORY</td>
              <td>BEBOP</td>
            </tr>
            <tr>
              <td>ODIUM</td>
              <td>LOSER</td>
              <td>AWARE</td>
              <td>PIXIE</td>
              <td>OLIVE</td>
            </tr>
            <tr>
              <td>LAZIO</td>
              <td>IRATE</td>
              <td>XAXIS</td>
              <td>EDICT</td>
              <td>RESAT</td>
            </tr>
            <tr>
              <td>UNAPT</td>
              <td>NAGAS</td>
              <td>ERICA</td>
              <td>CADET</td>
              <td>EMOTE</td>
            </tr>
            <tr>
              <td>SASSE</td>
              <td>GLENS</td>
              <td>SISSY</td>
              <td>SLEDS</td>
              <td>DINER</td>
            </tr>
          </tbody>
        </FinalGridTable>
      </HScrollTableWrapper>
    </>
  );
};

export default Solution;
