import React from "react";
import { styled } from "styled-components";
import LinkedImage from "../../components/LinkedImage";
import { Mono, PuzzleAnswer } from "../../components/StyledUI";
import img1 from "./assets/img1.png";
import img10 from "./assets/img10.png";
import img11 from "./assets/img11.png";
import img12 from "./assets/img12.png";
import img13 from "./assets/img13.png";
import img14 from "./assets/img14.png";
import img15 from "./assets/img15.png";
import img2 from "./assets/img2.png";
import img3 from "./assets/img3.png";
import img4 from "./assets/img4.png";
import img5 from "./assets/img5.png";
import img6 from "./assets/img6.png";
import img7 from "./assets/img7.png";
import img8 from "./assets/img8.png";
import img9 from "./assets/img9.png";
import solution1 from "./assets/solution1.png";
import solution2 from "./assets/solution2.png";

const StyledTable = styled.table`
  border-collapse: collapse;
  margin: 1em 0em;
  font-family: "Roboto Mono", monospace;
  width: 100%;
  th,
  td {
    border: 1px solid black;
    text-align: center;
  }
  td:first-child {
    width: 96px;
  }
`;

const Solution = (): JSX.Element => {
  return (
    <>
      <p>
        This is a puzzle about Lay’s flavors around the world, many of which are
        absolutely wild. Solvers can pretty quickly find many of them in the
        grid, and begin matching their bags/wrappers to the colors below. Some
        of the flavors are tougher to find, but become easier if you narrow down
        the bags and start looking through sites like{" "}
        <a
          href="https://laysaroundtheworld.com/"
          target="_blank"
          rel="noreferrer"
        >
          laysaroundtheworld.com
        </a>
        .
      </p>
      <p>
        As clued by the blanks, solvers need to read the letters before and
        after these flavors. Read in the order of the bag colors below, they
        spell <Mono>RUFFLE GRID DROP EVEN COLUMNS BY ONE</Mono>. (It’s a joke
        about Ruffles. Get it?)
      </p>
      <p>
        After Ruffling the grid, the new top and bottom rows spell out the next
        step, <Mono>NOW FIND MORE FLAVORS, TURNING NOW ALLOWED</Mono>. Solvers
        now need to find more international Lay’s flavors, but with occasional
        right turns. Highlighting all of these creates the shape of letters in
        the grid, spelling out the answer, <Mono>FISH + CHIPS</Mono>, or{" "}
        <PuzzleAnswer>FISH AND CHIPS</PuzzleAnswer>.
      </p>{" "}
      <LinkedImage
        src={solution1}
        alt="The word search grid from the puzzle, with all answers highlighted in green."
      />
      <StyledTable>
        <tr>
          <th>Color</th>
          <th>Letter Before</th>
          <th>Flavor</th>
          <th>Letter After</th>
        </tr>
        <tr>
          <td>
            <LinkedImage
              src={img1}
              alt="A splotch of pink with darker pink splotches in the center and lower left"
            />
          </td>
          <td>R</td>
          <td>SWEET CHILI HEAT</td>
          <td>V</td>
        </tr>
        <tr>
          <td>
            <LinkedImage src={img2} alt="A splotch of yellow" />
          </td>
          <td>U</td>
          <td>CLASSIC</td>
          <td>E</td>
        </tr>
        <tr>
          <td>
            <LinkedImage
              src={img3}
              alt="A splotch of lavender with several dark blue splotches in the lower left"
            />
          </td>
          <td>F</td>
          <td>BLUEBERRY</td>
          <td>N</td>
        </tr>
        <tr>
          <td>
            <LinkedImage
              src={img4}
              alt="A splotch of black with a splotch of yellow on the left and a splotch of hot pink in the lower right"
            />
          </td>
          <td>F</td>
          <td>KOBE BEEF</td>
          <td>C</td>
        </tr>
        <tr>
          <td>
            <LinkedImage
              src={img5}
              alt="A splotch of green with a splotch of green and a splotch of red in the lower left"
            />
          </td>
          <td>L</td>
          <td>BOLOGNESE</td>
          <td>O</td>
        </tr>
        <tr>
          <td>
            <LinkedImage
              src={img6}
              alt="A splotch of olive green with splotches of yellow and pink in the lower right. On the right is a splotch of white with a splotch of yellow inside it."
            />
          </td>
          <td>E</td>
          <td>BASIL CHICKEN</td>
          <td>L</td>
        </tr>
        <tr>
          <td>
            <LinkedImage
              src={img7}
              alt="A splotch of yellowish-orange with splotches of brown and white in the lower left. At the top is a splatter of red in a circle"
            />
          </td>
          <td>G</td>
          <td>HONEY BUTTER</td>
          <td>U</td>
        </tr>
        <tr>
          <td>
            <LinkedImage
              src={img8}
              alt="A splotch of navy blue bisected by a white splotch. In the lower left is a splotch of brown with a splotch of yellow in the center, and a splotch of white in the center of the yellow splotch."
            />
          </td>
          <td>R</td>
          <td>GAME DAY CHILI</td>
          <td>M</td>
        </tr>
        <tr>
          <td>
            <LinkedImage
              src={img9}
              alt="A splotch of reddish gray, growing more saturated around the edges. In the lower left is a splotch of brown."
            />
          </td>
          <td>I</td>
          <td>JAMON SERRANO</td>
          <td>N</td>
        </tr>
        <tr>
          <td>
            <LinkedImage
              src={img10}
              alt="A splotch of dark pink with a splotch of light pink in the middle. In the lower left is a splotch of even darker pink."
            />
          </td>
          <td>D</td>
          <td>SPICY CRAYFISH</td>
          <td>S</td>
        </tr>
        <tr>
          <td>
            <LinkedImage
              src={img11}
              alt="A splotch of black with two large splotches of magenta at the top and a splotch of dark yellow at the bottom right."
            />
          </td>
          <td>D</td>
          <td>WHITE PEACH BEER</td>
          <td>B</td>
        </tr>
        <tr>
          <td>
            <LinkedImage
              src={img12}
              alt="A splotch of electric blue with a splotch of darker blue in the center. On the bottom left are two splotches of red."
            />
          </td>
          <td>R</td>
          <td>TOMATO KETCHUP</td>
          <td>Y</td>
        </tr>
        <tr>
          <td>
            <LinkedImage
              src={img13}
              alt="A splotch of puce, a splotch of dark yellow, and a splotch of lavender. The lavender splotch has a darker purple center. To the lower left are several small purplish-yellow splotches."
            />
          </td>
          <td>O</td>
          <td>POPCORN MIX</td>
          <td>O</td>
        </tr>
        <tr>
          <td>
            <LinkedImage
              src={img14}
              alt="A splotch of red with a splotch of orange and a splotch of brighter red in the lower left"
            />
          </td>
          <td>P</td>
          <td>FIERY HABANERO</td>
          <td>N</td>
        </tr>
        <tr>
          <td>
            <LinkedImage
              src={img15}
              alt="A splotch of navy blue with a splotch of green in the center. Another navy blue splotch is in the center of the green splotch. To the bottom left is a splotch of tan."
            />
          </td>
          <td>E</td>
          <td>CARBONARA PARMESAN</td>
          <td>E</td>
        </tr>
      </StyledTable>
      <LinkedImage
        src={solution2}
        alt="The word search grid from the puzzle after being ruffled, with every even row shifted down one cell. Answers are highlighted in many different colors. The highlights spell out FISH + CHIPS."
      />
    </>
  );
};

export default Solution;
