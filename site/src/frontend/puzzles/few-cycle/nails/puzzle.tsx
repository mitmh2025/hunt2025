import React from "react";
import { styled } from "styled-components";
import LinkedImage from "../../../components/LinkedImage";
import { AuthorsNoteBlock } from "../../../components/PuzzleLayout";
import Spoiler from "../../../components/Spoiler";
import rootUrl from "../../../utils/rootUrl";
import jigAssembled from "../assets/02.png";
import diagram from "../assets/03.png";
import jigSTL from "./assets/jig.stl";
import painting from "./assets/painting.jpg";

const Arrow = styled.span`
  color: var(--red-500);
`;

const NailTable = styled.table`
  border: 1px black solid;
  border-collapse: collapse;
  margin-bottom: 1rem;

  & th,
  & td {
    border: 1px black solid;
    padding: 0.25rem;
  }
`;

const Puzzle = () => {
  return (
    <>
      <p>
        <Arrow>←</Arrow>{" "}
        <a href={`${rootUrl}/puzzles/a_dash_of_color`}>Back to main puzzle</a>
      </p>

      <AuthorsNoteBlock>
        <p>
          During Mystery Hunt, teams arriving at the Gala would be presented
          with a Ziploc bag of nail polish and asked to choose which color they
          wanted. If the bar was not too busy and the bartender was sufficiently
          confident, they would paint the team member’s nails:
        </p>

        <LinkedImage src={painting} alt="A team getting their nails done" />

        <center>
          <em>(Photo by Keri Ashton Fullwood)</em>
        </center>

        <br />

        <p>
          Either way, the bartender would then inform them that, fortunately, we
          had already painted their nails for them. The team would then be
          provided with a bag containing:
        </p>

        <ul>
          <li>
            36 roofing nails of varying lengths with their heads each painted in
            one of six different colors
          </li>
          <li>
            A 3D-printed jig. On the top were 36 holes of varying depth on the
            top. On the side were horizontal lines spaced ⅛” apart with 36 dots,
            each aligning with one of the holes.
          </li>
        </ul>

        <p>
          If you’re solving at home, we don’t think it’s worth the effort to
          recreate the puzzle exactly as we delivered it during Mystery Hunt, as
          assembling the physical components necessarily constitutes a spoiler.
          Instead, we would recommend instead solving the remainder of the
          puzzle using the following image references, which show the appearance
          of the puzzle after completing the first physical step and a CAD
          diagram of the jig indicating some of the details:
        </p>

        <Spoiler block>
          <LinkedImage src={jigAssembled} alt="The jig fully assembled" />
          <LinkedImage
            src={diagram}
            alt="A diagram showing different depths marked across 36 columns"
          />
        </Spoiler>

        <p>
          However, if you’re determined to solve the exact puzzle we handed out,
          recruit a friend and have them read the following instructions:
        </p>

        <Spoiler block>
          <p>
            Your friend will first need to 3D-print the jig using{" "}
            <a href={jigSTL}>this STL source file</a>. We printed in black PLA,
            but any dark-colored filament should work.
          </p>

          <p>
            Then, they’ll need to acquire a variety of sizes of roofing nails
            (or any nails with large heads) and several colors of Essie nail
            polish, as specified in the table below. Make sure the nails’ length
            is accurate to within about 1/16”. The head of each nail should be
            painted with the specified color.
          </p>

          <NailTable>
            <thead>
              <tr>
                <th>Size</th>
                <th>Quantity</th>
                <th>Color</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>⅞”</td>
                <td>5</td>
                <td>bling it</td>
              </tr>
              <tr>
                <td>1”</td>
                <td>6</td>
                <td>to diy for</td>
              </tr>
              <tr>
                <td>1 ¼”</td>
                <td>7</td>
                <td>bare with me</td>
              </tr>
              <tr>
                <td>1 ½”</td>
                <td>6</td>
                <td>sol searching</td>
              </tr>
              <tr>
                <td>1 ¾”</td>
                <td>6</td>
                <td>chiffon the move</td>
              </tr>
              <tr>
                <td>2”</td>
                <td>6</td>
                <td>ice cream and shout</td>
              </tr>
            </tbody>
          </NailTable>
        </Spoiler>
      </AuthorsNoteBlock>
    </>
  );
};

export default Puzzle;
