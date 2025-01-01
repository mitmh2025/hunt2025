import React from "react";
import { styled } from "styled-components";
import LinkedImage from "../../components/LinkedImage";
import img1 from "./assets/01.jpg";
import img2 from "./assets/02.jpg";
import img3 from "./assets/03.jpg";
import img4 from "./assets/04.jpg";
import img5 from "./assets/05.jpg";
import img6 from "./assets/06.jpg";
import img7 from "./assets/07.jpg";
import img8 from "./assets/08.jpg";
import img9 from "./assets/09.jpg";
import img10 from "./assets/10.jpg";
import img11 from "./assets/11.jpg";
import img12 from "./assets/12.jpg";
import img13 from "./assets/13.jpg";

const TableCell = styled.td`
  border: 2px solid grey;
  padding: 12px;
`;

const Solution = () => {
  const altText =
    "a diagram of a keyboard with some keys highlighted green and yellow";

  return (
    <>
      <p>
        This puzzle has two primary parts to it. The first part is listening to
        the 13 audio files and identifying what the song is and what the “off
        key” word is. All of the audio files are famous songs reproduced with a
        single word sung off-key. If the word is repeated multiple times it is
        sung off-key each time. The first letter of the off-key words can be
        read as an acrostic intermediate answer. In given order:
        <table>
          <th>
            <tr>
              <TableCell>Song Title</TableCell>
              <TableCell>Band</TableCell>
              <TableCell>Off-Key Word</TableCell>
              <TableCell>First Letter</TableCell>
            </tr>
          </th>
          <tbody>
            <tr>
              <TableCell>HUSH</TableCell>
              <TableCell>DEEP PURPLE*</TableCell>
              <TableCell>Quicksand</TableCell>
              <TableCell>Q</TableCell>
            </tr>
            <tr>
              <TableCell>POLITIK</TableCell>
              <TableCell>COLDPLAY</TableCell>
              <TableCell>Wounds</TableCell>
              <TableCell>W</TableCell>
            </tr>
            <tr>
              <TableCell>HIGH ENOUGH</TableCell>
              <TableCell>DAMN YANKEES</TableCell>
              <TableCell>Enough</TableCell>
              <TableCell>E</TableCell>
            </tr>
            <tr>
              <TableCell>STRANGE</TableCell>
              <TableCell>MIRANDA LAMBERT</TableCell>
              <TableCell>Round</TableCell>
              <TableCell>R</TableCell>
            </tr>
            <tr>
              <TableCell>ANOTHER SUNNY DAY</TableCell>
              <TableCell>BELLE AND SEBASTIAN</TableCell>
              <TableCell>Trees</TableCell>
              <TableCell>T</TableCell>
            </tr>
            <tr>
              <TableCell>GREASE</TableCell>
              <TableCell>FRANKIE VALLI</TableCell>
              <TableCell>Yesterday</TableCell>
              <TableCell>Y</TableCell>
            </tr>
            <tr>
              <TableCell>HUNGRY</TableCell>
              <TableCell>PAUL REVERE & THE RAIDERS</TableCell>
              <TableCell>Out</TableCell>
              <TableCell>O</TableCell>
            </tr>
            <tr>
              <TableCell>DO YOU BELIEVE IN MAGIC</TableCell>
              <TableCell>THE LOVIN’ SPOONFUL</TableCell>
              <TableCell>Free</TableCell>
              <TableCell>F</TableCell>
            </tr>
            <tr>
              <TableCell>SATURDAY IN THE PARK</TableCell>
              <TableCell>CHICAGO</TableCell>
              <TableCell>Today</TableCell>
              <TableCell>T</TableCell>
            </tr>
            <tr>
              <TableCell>HOOK</TableCell>
              <TableCell>BLUES TRAVELER</TableCell>
              <TableCell>Inflection</TableCell>
              <TableCell>I</TableCell>
            </tr>
            <tr>
              <TableCell>THE KILLING MOON</TableCell>
              <TableCell>ECHO & THE BUNNYMEN</TableCell>
              <TableCell>Thin</TableCell>
              <TableCell>T</TableCell>
            </tr>
            <tr>
              <TableCell>RIO</TableCell>
              <TableCell>DURAN DURAN</TableCell>
              <TableCell>Land</TableCell>
              <TableCell>L</TableCell>
            </tr>
            <tr>
              <TableCell>SURF CITY</TableCell>
              <TableCell>JAN & DEAN</TableCell>
              <TableCell>Every</TableCell>
              <TableCell>E</TableCell>
            </tr>
          </tbody>
        </table>
      </p>

      <p>
        * The puzzle matches the Deep Purple version which is a cover that
        became more popular than the original. However, the puzzle is unchanged
        regardless of the version used as the band name is not utilized in this
        puzzle.
      </p>
      <p>
        Reading the off-key words’ first letters spells out the intermediate
        answer QWERTY OF TITLE. “QWERTY”, “Push” (puzzle title), and “Key”
        (puzzle flavor) are all cluing that the second part of the puzzle is a
        keyboard puzzle.
      </p>
      <p>
        If you type the titles of the songs on a standard QWERTY layout
        keyboard, all the letters will be in a contiguous connected key set
        except for one single “off key” as hinted at by flavor “Although most of
        it is together, I keep going off key”. Repeat the mechanic of
        identifying the “off key”. As spaces are not often included in puzzle
        extractions, this puzzle works with or without inclusion of space bar
        key; solution set below includes space bar.
        <table>
          <th>
            <tr>
              <TableCell>Song Title</TableCell>
              <TableCell>Keyboard</TableCell>
              <TableCell>Off Key</TableCell>
            </tr>
          </th>
          <tbody>
            <tr>
              <TableCell>HU(S)H</TableCell>
              <TableCell>
                <LinkedImage src={img1} alt={altText} />
              </TableCell>
              <TableCell>S</TableCell>
            </tr>
            <tr>
              <TableCell>POLI(T)IK</TableCell>
              <TableCell>
                <LinkedImage src={img2} alt={altText} />
              </TableCell>
              <TableCell>T</TableCell>
            </tr>
            <tr>
              <TableCell>HIGH (E)NOUGH</TableCell>
              <TableCell>
                <LinkedImage src={img3} alt={altText} />
              </TableCell>
              <TableCell>E</TableCell>
            </tr>
            <tr>
              <TableCell>STRA(N)GE</TableCell>
              <TableCell>
                <LinkedImage src={img4} alt={altText} />
              </TableCell>
              <TableCell>N</TableCell>
            </tr>
            <tr>
              <TableCell>AN(O)THER SUNNY DAY</TableCell>
              <TableCell>
                <LinkedImage src={img5} alt={altText} />
              </TableCell>
              <TableCell>O</TableCell>
            </tr>
            <tr>
              <TableCell>(G)REASE</TableCell>
              <TableCell>
                <LinkedImage src={img6} alt={altText} />
              </TableCell>
              <TableCell>G</TableCell>
            </tr>
            <tr>
              <TableCell>HUN(G)RY</TableCell>
              <TableCell>
                <LinkedImage src={img7} alt={altText} />
              </TableCell>
              <TableCell>R</TableCell>
            </tr>
            <tr>
              <TableCell>DO YOU BELIEVE IN M(A)GIC</TableCell>
              <TableCell>
                <LinkedImage src={img8} alt={altText} />
              </TableCell>
              <TableCell>A</TableCell>
            </tr>
            <tr>
              <TableCell>SATURDAY IN THE (P)ARK</TableCell>
              <TableCell>
                <LinkedImage src={img9} alt={altText} />
              </TableCell>
              <TableCell>P</TableCell>
            </tr>
            <tr>
              <TableCell>(H)OOK</TableCell>
              <TableCell>
                <LinkedImage src={img10} alt={altText} />
              </TableCell>
              <TableCell>H</TableCell>
            </tr>
            <tr>
              <TableCell>TH(E) KILLING MOON</TableCell>
              <TableCell>
                <LinkedImage src={img11} alt={altText} />
              </TableCell>
              <TableCell>E</TableCell>
            </tr>
            <tr>
              <TableCell>(R)IO</TableCell>
              <TableCell>
                <LinkedImage src={img12} alt={altText} />
              </TableCell>
              <TableCell>R</TableCell>
            </tr>
            <tr>
              <TableCell>(S)URF CITY</TableCell>
              <TableCell>
                <LinkedImage src={img13} alt={altText} />
              </TableCell>
              <TableCell>S</TableCell>
            </tr>
          </tbody>
        </table>
      </p>

      <p>
        Reading the off-keys in order spells out the final answer{" "}
        <strong>STENOGRAPHERS</strong> (who use a unique keyboard where one
        types sounds/syllables rather than letters).
      </p>
    </>
  );
};

export default Solution;
