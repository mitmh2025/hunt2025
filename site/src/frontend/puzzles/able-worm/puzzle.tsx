import React from "react";
import { styled } from "styled-components";

const ClueTable = styled.table`
  width: 100%;
`;

const NumbersTable = styled.table`
  width: 100%;

  tr td {
    text-align: center;
    font-family: "Roboto Mono", monospace;
  }
`;

const Puzzle = () => {
  return (
    <>
      <section>
        <ClueTable>
          <thead>
            <tr>
              <th>ACROSS</th>
              <th>DOWN</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Open-eyed</td>
              <td>City on the Seyhan</td>
            </tr>
            <tr>
              <td>It has bite, per a 90s commercial</td>
              <td>Reverse of a rare nickel</td>
            </tr>
            <tr>
              <td>Titular animated spaceship</td>
              <td>It shouldn’t be hard to swallow</td>
            </tr>
            <tr>
              <td>Military recruit</td>
              <td>Left with a cylindrical hole</td>
            </tr>
            <tr>
              <td>A greasy spoon or a person inside it</td>
              <td>Philippine tree cultivated for its resin</td>
            </tr>
            <tr>
              <td>Royal decree</td>
              <td>Clapton and Andre</td>
            </tr>
            <tr>
              <td>What you must do on stage more than on film</td>
              <td>Telephonic copies</td>
            </tr>
            <tr>
              <td>Rapper Banks</td>
              <td>Once every sixty minutes</td>
            </tr>
            <tr>
              <td>Entry hall</td>
              <td>Those killed in Killers of the Flower Moon</td>
            </tr>
            <tr>
              <td>Narrow valleys</td>
              <td>Egg-shaped</td>
            </tr>
            <tr>
              <td>Aggravated</td>
              <td>Word at the end of some Japanese films</td>
            </tr>
            <tr>
              <td>Roman region</td>
              <td>Rust, for example</td>
            </tr>
            <tr>
              <td>One who just can’t win</td>
              <td>Colleague of Paul and Mary</td>
            </tr>
            <tr>
              <td>Half-human, half-serpents</td>
              <td>Bon mots</td>
            </tr>
            <tr>
              <td>Antagonistic Shard of Adonalsium</td>
              <td>State for a second time</td>
            </tr>
            <tr>
              <td>Source of oil</td>
              <td>Get some sun after paling</td>
            </tr>
            <tr>
              <td>Tiny fairy</td>
              <td>Cut into small pieces, as cauliflower</td>
            </tr>
            <tr>
              <td>Took an exam again</td>
              <td>Gilded icon coverings</td>
            </tr>
            <tr>
              <td>Former Nebraskan Senator Ben</td>
              <td>Support for an injured arm</td>
            </tr>
            <tr>
              <td>Rudely blunt</td>
              <td>Struck down</td>
            </tr>
            <tr>
              <td>Actress Spacek</td>
              <td>Short glasses?</td>
            </tr>
            <tr>
              <td>Toboggans</td>
              <td>Like the pull of the moon</td>
            </tr>
            <tr>
              <td>Architectural layer</td>
              <td>A lock</td>
            </tr>
            <tr>
              <td>Ill-suited</td>
              <td>Vertical line</td>
            </tr>
            <tr>
              <td>Horizontal line</td>
              <td>Hinged iron gates</td>
            </tr>
          </tbody>
        </ClueTable>
      </section>

      <section>
        <NumbersTable>
          <tr>
            <td>(-2,-2,1)</td>
          </tr>
          <tr>
            <td>(1,1,2)</td>
          </tr>
          <tr>
            <td>(-1,-2,0)</td>
          </tr>
          <tr>
            <td>(-1,-1,-1)</td>
          </tr>
          <tr>
            <td>(1,-2,1)</td>
          </tr>
          <tr>
            <td>(2,-1,0)</td>
          </tr>
          <tr>
            <td>(1,0,-1)</td>
          </tr>
          <tr>
            <td>(-1,2,1)</td>
          </tr>
          <tr>
            <td>(-1,2,-2)</td>
          </tr>
          <tr>
            <td>(0,-2,2)</td>
          </tr>
          <tr>
            <td>(-1,2,-1)</td>
          </tr>
          <tr>
            <td>(0,-2,-2)</td>
          </tr>
          <tr>
            <td>(-2,-1,2)</td>
          </tr>
          <tr>
            <td>(2,0,-2)</td>
          </tr>
        </NumbersTable>
      </section>
    </>
  );
};

export default Puzzle;
