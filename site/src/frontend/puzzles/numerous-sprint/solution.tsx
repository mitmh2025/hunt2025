import React, { type CSSProperties } from "react";
import { styled } from "styled-components";
import LinkedImage from "../../components/LinkedImage";
import { PuzzleAnswer, HScrollTableWrapper } from "../../components/StyledUI";
import img1 from "./assets/solution_expression.png";
import { StyledCrossword, LABELS, GridContent, ProblemBlock } from "./puzzle";

const Red = styled.span`
  color: red;
`;

const StyledImage = styled(LinkedImage)`
  img {
    width: inherit;
    max-width: 100%;
    height: 3rem;
  }
`;

const StyledTable = styled.table`
  th {
    text-align: left;
  }
  td {
    padding-right: 1rem;
  }
`;

const ColorSquares = `R.     R.R
      R.. 
       R  
 . ..R    
 . R    . 
 R        
 .R       
 R  .   . 
          
.   R.  R `
  .split("\n")
  .map((row) => row.split(""));

const getStyle = ({
  row,
  column,
}: {
  row: number;
  column: number;
}): CSSProperties => {
  // Define your custom styles based on the cell content or position
  const color = ColorSquares[row]?.[column];
  if (color === ".") {
    return {
      backgroundColor: "black",
      color: "white",
      fontFamily: "Arial, sans-serif",
    };
  } else if (color === "R") {
    return {
      backgroundColor: "red",
      color: "white",
      fontFamily: "Arial, sans-serif",
    };
  } else {
    return { fontFamily: "Arial, sans-serif" };
  }
};

const LoopGrid = styled.table`
  border-collapse: collapse;
  margin: auto;
`;

const LoopGridCell = styled.td`
  width: 2rem;
  height: 2rem;
  background-color: inherit;
  font-family: Arial, sans-serif;
  font-size: 12pt;
  vertical-align: middle;
  text-align: center;
`;

const LoopCell = styled(LoopGridCell)`
  border-style: solid;
  border-width: 1pt;
  background-color: #ffffff;
`;

const LoopCellBottomRight = styled(LoopCell)`
  border-bottom-color: #000000;
  border-left-color: #cccccc;
  border-right-color: #000000;
  border-top-color: #cccccc;
  background-color: #00ff00;
`;

const LoopCellBottomLeft = styled(LoopCell)`
  border-bottom-color: #000000;
  border-left-color: #000000;
  border-right-color: #cccccc;
  border-top-color: #cccccc;
  background-color: #00ff00;
`;

const LoopCellTopRight = styled(LoopCell)`
  border-bottom-color: #cccccc;
  border-left-color: #cccccc;
  border-right-color: #000000;
  border-top-color: #000000;
  background-color: #00ff00;
`;

const LoopCellTopLeft = styled(LoopCell)`
  border-bottom-color: #cccccc;
  border-left-color: #000000;
  border-right-color: #cccccc;
  border-top-color: #000000;
  background-color: #00ff00;
`;

const LoopCellSideways = styled(LoopCell)`
  border-bottom-color: #000000;
  border-left-color: #cccccc;
  border-right-color: #cccccc;
  border-top-color: #000000;
`;

const LoopCellVertical = styled(LoopCell)`
  border-bottom-color: #cccccc;
  border-left-color: #000000;
  border-right-color: #000000;
  border-top-color: #cccccc;
`;

const LoopCellSidewaysGray = styled(LoopCellSideways)`
  background-color: #cccccc;
`;

const LoopCellVerticalGray = styled(LoopCellVertical)`
  background-color: #cccccc;
`;

const Solution = (): JSX.Element => {
  return (
    <>
      <p>
        This puzzle is an (unauthorized) tribute to the delightful mini-hunt
        written by Dan Katz for the Puzzle Corner section in the
        January/February 2025 issue of the MIT Technology Review and Alumni
        News. The presentation of the puzzle is based on the Puzzle Corner and
        the covers of the magazines covering up the first four minipuzzles
        provide a hint towards where to look for those puzzles.
      </p>
      <p>
        Puzzles are numbered MH1-11, for Mystery Hunt. The Puzzle Corner
        normally numbers problems by month: J/F1, J/F2, etc. Solutions to Dan
        Katz’s minipuzzles are withheld–solvers can find his solutions at the
        end of the March/April 2025 Puzzle Corner (or you can go solve them -
        they’re lovely). Solving the Puzzle Corner metapuzzle J/F5 is not
        required for this puzzle but is recommended, because it’s fun.
      </p>
      <ProblemBlock>
        <p>
          <b>MH5.</b> This formula is made up of several well known formulae
          that resolve to standard letter variables. Use the letters to spell{" "}
          <b>REFRESH</b>.
        </p>
        <HScrollTableWrapper>
          <StyledTable>
            <tr>
              <td>R = V/I</td>
              <td>Ohm’s Law</td>
            </tr>
            <tr>
              <td>
                e = mc<sup>2</sup>
              </td>
              <td>Mass-energy equivalence</td>
            </tr>
            <tr>
              <td>F = ma</td>
              <td>Newton’s second law</td>
            </tr>
            <tr>
              <td>R = V/I</td>
              <td>Ohm’s Law</td>
            </tr>
            <tr>
              <td>
                e = mc<sup>2</sup>
              </td>
              <td>Mass-energy equivalence</td>
            </tr>
            <tr>
              <td>
                s ={" "}
                <StyledImage
                  src={img1}
                  alt="mathematical expression for standard deviation"
                />
              </td>
              <td>Sample standard deviation</td>
            </tr>
            <tr>
              <td>h = 2A/b</td>
              <td>Area of a triangle</td>
            </tr>
          </StyledTable>
        </HScrollTableWrapper>
      </ProblemBlock>
      <ProblemBlock>
        {" "}
        <p>
          <b>MH6.</b> The flavor text includes references to the Great Dome,
          along with “counting months” and hacks. Each of these objects was
          placed on Building 10’s Great Dome by students. Index into the object
          by the month of the hack to get the answer, <b>TEST CENTER</b>.
        </p>
        <HScrollTableWrapper>
          <StyledTable>
            <tr>
              <th>Object on Great Dome</th>
              <th>Date of hack</th>
            </tr>
            <tr>
              <td>
                BEANIE HA<Red>T</Red>
              </td>
              <td>
                <Red>9</Red>/27/1996
              </td>
            </tr>
            <tr>
              <td>
                JACK O LANT<Red>E</Red>RN
              </td>
              <td>
                <Red>10</Red>/31/1962 or 10/31/1994
              </td>
            </tr>
            <tr>
              <td>
                BAT <Red>S</Red>IGNAL
              </td>
              <td>
                <Red>4</Red>/16/2006
              </td>
            </tr>
            <tr>
              <td>
                EAR<Red>T</Red>H
              </td>
              <td>
                <Red>4</Red>/22/2017
              </td>
            </tr>
            <tr>
              <td>
                POLICE <Red>C</Red>AR
              </td>
              <td>
                <Red>5</Red>/9/1994
              </td>
            </tr>
            <tr>
              <td>
                M<Red>E</Red>DAL
              </td>
              <td>
                <Red>2</Red>/28/2006
              </td>
            </tr>
            <tr>
              <td>
                FIRE ENGI<Red>N</Red>E
              </td>
              <td>
                <Red>9</Red>/11/2006
              </td>
            </tr>
            <tr>
              <td>
                CAP<Red>T</Red>AIN AMERICA SHIELD
              </td>
              <td>
                <Red>4</Red>/27/2019
              </td>
            </tr>
            <tr>
              <td>
                JOLLY ROG<Red>E</Red>R
              </td>
              <td>
                <Red>9</Red>/25/2003
              </td>
            </tr>
            <tr>
              <td>
                LUNA<Red>R</Red> MODULE
              </td>
              <td>
                <Red>5</Red>/19/2009
              </td>
            </tr>
          </StyledTable>
        </HScrollTableWrapper>
      </ProblemBlock>
      <ProblemBlock>
        <p>
          <b>MH7.</b> The given titles are rephrasings of movies that featured
          MIT or characters from MIT. The rephrasings are the same length as the
          actual movie titles. As hinted by “bold choices”, find bolded letters
          in the made up movie titles and take the corresponding letters in the
          real movie to read out <b>READY SET GO</b>.
        </p>
        <HScrollTableWrapper>
          <StyledTable>
            <tr>
              <th>Made up movie title</th>
              <th>Real movie title</th>
            </tr>
            <tr>
              <td>
                L<Red>E</Red>AD GUY
              </td>
              <td>
                I<Red>R</Red>ON MAN
              </td>
            </tr>
            <tr>
              <td>
                EBONY LEOPA<Red>R</Red>D: B<Red>I</Red>RNI<Red>N</Red> ZANA REDO
              </td>
              <td>
                BLACK PANTH<Red>E</Red>R: W<Red>A</Red>KAN<Red>D</Red>A FOREVER
              </td>
            </tr>
            <tr>
              <td>
                EVERY JULY FOURT<Red>H</Red>
              </td>
              <td>
                INDEPENDENCE DA<Red>Y</Red>
              </td>
            </tr>
            <tr>
              <td>
                WI<Red>T</Red>HOUT ANY THREADS
              </td>
              <td>
                NO <Red>S</Red>TRINGS ATTACHED
              </td>
            </tr>
            <tr>
              <td>
                RA<Red>V</Red>IS<Red>H</Red>ING BRAIN
              </td>
              <td>
                A B<Red>E</Red>AU<Red>T</Red>IFUL MIND
              </td>
            </tr>
            <tr>
              <td>
                <Red>TH</Red>RIFT SHOP SCOUR
              </td>
              <td>
                <Red>GO</Red>OD WILL HUNTING
              </td>
            </tr>
          </StyledTable>
        </HScrollTableWrapper>
      </ProblemBlock>
      <ProblemBlock>
        <p>
          <b>MH8.</b> Each of these accomplishments was made by a real-life MIT
          alumnus. After identifying these graduates, and prompted by the use of
          “initially” and “first step,” take the first letters of the alumni’s
          first names in order to read <b>OPPROBRIUM</b>.
        </p>
        <HScrollTableWrapper>
          <StyledTable>
            <tr>
              <th>Accomplishment</th>
              <th>Alumnus</th>
            </tr>
            <tr>
              <td>…I wrote about interior design with a famous novelist!</td>
              <td>
                <Red>O</Red>gden Codman Jr.
              </td>
            </tr>
            <tr>
              <td>…I pioneered virtual memory (who needs the real thing?)!</td>
              <td>
                <Red>P</Red>eter J. Denning
              </td>
            </tr>
            <tr>
              <td>…I wrote a column for the New York Times!</td>
              <td>
                <Red>P</Red>aul Krugman
              </td>
            </tr>
            <tr>
              <td>…I had my own radio show about cars with my big brother!</td>
              <td>
                <Red>R</Red>ay Magliozzi
              </td>
            </tr>
            <tr>
              <td>…I predicted pandemonium when computers learned to think!</td>
              <td>
                <Red>O</Red>liver Selfridge
              </td>
            </tr>
            <tr>
              <td>
                …I had already walked on the moon (so what if I wasn’t the very
                first?)!
              </td>
              <td>
                <Red>B</Red>uzz Aldrin
              </td>
            </tr>
            <tr>
              <td>…I put the @ in @mit.edu!</td>
              <td>
                <Red>R</Red>ay Tomlinson
              </td>
            </tr>
            <tr>
              <td>…I had already built a pyramid in France!</td>
              <td>
                <Red>I</Red>. M. Pei
              </td>
            </tr>
            <tr>
              <td>…I was a candidate for Prime Minister and a princess!</td>
              <td>
                <Red>U</Red>bol Rutana
              </td>
            </tr>
            <tr>
              <td>
                …I had already completed the first doctorate in engineering
                earned by an African-American!
              </td>
              <td>
                <Red>M</Red>arron William Fort
              </td>
            </tr>
          </StyledTable>
        </HScrollTableWrapper>
      </ProblemBlock>
      <ProblemBlock>
        <p>
          <b>MH9.</b> This minipuzzle is an Akari puzzle. When solved, use the
          letters from squares with hydrants to read ANSWER <b>NOZZLE</b>.
        </p>
        <HScrollTableWrapper>
          <StyledCrossword
            labels={LABELS}
            fill={GridContent}
            getAdditionalCellStyles={getStyle}
            getAdditionalCellFillStyles={getStyle}
          />
        </HScrollTableWrapper>
      </ProblemBlock>
      <ProblemBlock>
        <p>
          <b>MH10.</b> The Harvard Bridge connecting MIT to Boston is the site
          of the fraternity prank measuring the bridge in smoots. One smoot is
          the height of Oliver Smoot, 1.702m. Most of the other units in this
          minipuzzle are also named after people, but their first names have
          been provided instead of their last names. Convert to the specified
          units and round to the nearest integer, then translate the numbers
          using AZ126 to read <b>ENRICO FERMI</b>, or 5.876 × 10<sup>-16</sup>{" "}
          smoots.
        </p>
        <HScrollTableWrapper>
          <StyledTable>
            <tr>
              <td>E</td>
              <td>5</td>
              <td>angstrom</td>
              <td>
                1 Anders Jonas Angstrom = 7.1 × 10<sup>-14</sup> sheppeys
              </td>
            </tr>
            <tr>
              <td>N</td>
              <td>14</td>
              <td>coulomb</td>
              <td>
                1 Charles-Augustin de Coulomb = 2.998 × 10<sup>9</sup> Benjamin
                Franklins
              </td>
            </tr>
            <tr>
              <td>R</td>
              <td>18</td>
              <td>curie</td>
              <td>
                1 Marie and Pierre Curie = 3.7 x 10<sup>4</sup> Lord Ernest
                Rutherfords
              </td>
            </tr>
            <tr>
              <td>I</td>
              <td>9</td>
              <td>goeppert mayer</td>
              <td>
                1 Maria Goeppert Mayer = 10<sup>−50</sup> cm<sup>4</sup>{" "}
                s/photon
              </td>
            </tr>
            <tr>
              <td>C</td>
              <td>3</td>
              <td>joules</td>
              <td>
                10<sup>44</sup> James Prescott Joules = 1 foe
              </td>
            </tr>
            <tr>
              <td>O</td>
              <td>15</td>
              <td>newton</td>
              <td>1000 Isaac Newton = 1 sthène</td>
            </tr>
            <tr>
              <td>F</td>
              <td>6</td>
              <td>oersted</td>
              <td>1 Hans Christian Ørsted = 79.57747 Andre-Marie Amperes/m</td>
            </tr>
            <tr>
              <td>E</td>
              <td>5</td>
              <td>sievert</td>
              <td>
                0.98 × 10<sup>-7</sup> Rolf Sievert = 1 banana equivalent dose
              </td>
            </tr>
            <tr>
              <td>R</td>
              <td>18</td>
              <td>smoot</td>
              <td>
                1 Oliver Smoot = 1.702 meters, 1 Potrzebie =
                2.2633484517438173216473 millimeters
              </td>
            </tr>
            <tr>
              <td>M</td>
              <td>13</td>
              <td>sverdrup</td>
              <td>
                1 Harald Sverdrup = 1.023 × 10<sup>16</sup> American
                gills/fortnight
              </td>
            </tr>
            <tr>
              <td>I</td>
              <td>9</td>
              <td>watt</td>
              <td>40.55 James Watts = 1 pirate-ninja</td>
            </tr>
          </StyledTable>
        </HScrollTableWrapper>
      </ProblemBlock>
      <ProblemBlock>
        <p>
          <b>MH11.</b> Solving Dan Katz’s puzzles and the six provided
          minipuzzles gives ten answers:
        </p>
        <ul>
          <li>ENRICO FERMI</li>
          <li>HANS GRUBER</li>
          <li>IVAN DRAGO</li>
          <li>MAXWELL DENT</li>
          <li>NOZZLE</li>
          <li>OPPROBRIUM</li>
          <li>OWEN DAVIAN</li>
          <li>READY SET GO</li>
          <li>REFRESH</li>
          <li>TEST CENTER</li>
        </ul>

        <p>
          Attempting to fill these into the grid will reveal that there are not
          enough spaces to enter every answer. However, overlapping the first
          and last letters of each answer (shown in red text below) and using
          the M, I and T that are given allow solvers to complete the grid. Read
          the letters on each corner to reveal ENTER{" "}
          <PuzzleAnswer>BREGENZ FOREST</PuzzleAnswer>.
        </p>
        {/*solved loop goes here*/}
        <HScrollTableWrapper>
          <LoopGrid>
            <tbody>
              <tr>
                <LoopGridCell></LoopGridCell>
                <LoopGridCell></LoopGridCell>
                <LoopGridCell></LoopGridCell>
                <LoopGridCell></LoopGridCell>
                <LoopGridCell></LoopGridCell>
                <LoopGridCell></LoopGridCell>
                <LoopGridCell></LoopGridCell>
                <LoopGridCell></LoopGridCell>
                <LoopGridCell></LoopGridCell>
                <LoopGridCell></LoopGridCell>
                <LoopCellTopLeft>T</LoopCellTopLeft>
                <LoopCellSideways>E</LoopCellSideways>
                <LoopCellSideways>
                  <Red>R</Red>
                </LoopCellSideways>
                <LoopCellSideways>E</LoopCellSideways>
                <LoopCellSideways>F</LoopCellSideways>
                <LoopCellSideways>R</LoopCellSideways>
                <LoopCellTopRight>E</LoopCellTopRight>
                <LoopGridCell></LoopGridCell>
                <LoopGridCell></LoopGridCell>
              </tr>
              <tr>
                <LoopGridCell></LoopGridCell>
                <LoopGridCell></LoopGridCell>
                <LoopGridCell></LoopGridCell>
                <LoopGridCell></LoopGridCell>
                <LoopGridCell></LoopGridCell>
                <LoopGridCell></LoopGridCell>
                <LoopGridCell></LoopGridCell>
                <LoopGridCell></LoopGridCell>
                <LoopGridCell></LoopGridCell>
                <LoopCellTopLeft>E</LoopCellTopLeft>
                <LoopCellBottomRight>N</LoopCellBottomRight>
                <LoopGridCell></LoopGridCell>
                <LoopGridCell></LoopGridCell>
                <LoopGridCell></LoopGridCell>
                <LoopGridCell></LoopGridCell>
                <LoopGridCell></LoopGridCell>
                <LoopCellVertical>S</LoopCellVertical>
                <LoopGridCell></LoopGridCell>
                <LoopGridCell></LoopGridCell>
              </tr>
              <tr>
                <LoopGridCell></LoopGridCell>
                <LoopGridCell></LoopGridCell>
                <LoopGridCell></LoopGridCell>
                <LoopGridCell></LoopGridCell>
                <LoopGridCell></LoopGridCell>
                <LoopGridCell></LoopGridCell>
                <LoopGridCell></LoopGridCell>
                <LoopGridCell></LoopGridCell>
                <LoopGridCell></LoopGridCell>
                <LoopCellVertical>C</LoopCellVertical>
                <LoopGridCell></LoopGridCell>
                <LoopGridCell></LoopGridCell>
                <LoopGridCell></LoopGridCell>
                <LoopGridCell></LoopGridCell>
                <LoopGridCell></LoopGridCell>
                <LoopGridCell></LoopGridCell>
                <LoopCellVertical>
                  <Red>H</Red>
                </LoopCellVertical>
                <LoopGridCell></LoopGridCell>
                <LoopGridCell></LoopGridCell>
              </tr>
              <tr>
                <LoopGridCell></LoopGridCell>
                <LoopGridCell></LoopGridCell>
                <LoopGridCell></LoopGridCell>
                <LoopGridCell></LoopGridCell>
                <LoopGridCell></LoopGridCell>
                <LoopGridCell></LoopGridCell>
                <LoopGridCell></LoopGridCell>
                <LoopGridCell></LoopGridCell>
                <LoopGridCell></LoopGridCell>
                <LoopCellBottomLeft>T</LoopCellBottomLeft>
                <LoopCellTopRight>S</LoopCellTopRight>
                <LoopGridCell></LoopGridCell>
                <LoopGridCell></LoopGridCell>
                <LoopGridCell></LoopGridCell>
                <LoopGridCell></LoopGridCell>
                <LoopGridCell></LoopGridCell>
                <LoopCellVertical>A</LoopCellVertical>
                <LoopGridCell></LoopGridCell>
                <LoopGridCell></LoopGridCell>
              </tr>
              <tr>
                <LoopGridCell></LoopGridCell>
                <LoopGridCell></LoopGridCell>
                <LoopGridCell></LoopGridCell>
                <LoopGridCell></LoopGridCell>
                <LoopGridCell></LoopGridCell>
                <LoopGridCell></LoopGridCell>
                <LoopGridCell></LoopGridCell>
                <LoopGridCell></LoopGridCell>
                <LoopGridCell></LoopGridCell>
                <LoopGridCell></LoopGridCell>
                <LoopCellVertical>E</LoopCellVertical>
                <LoopGridCell></LoopGridCell>
                <LoopGridCell></LoopGridCell>
                <LoopGridCell></LoopGridCell>
                <LoopGridCell></LoopGridCell>
                <LoopGridCell></LoopGridCell>
                <LoopCellVertical>N</LoopCellVertical>
                <LoopGridCell></LoopGridCell>
                <LoopGridCell></LoopGridCell>
              </tr>
              <tr>
                <LoopGridCell></LoopGridCell>
                <LoopGridCell></LoopGridCell>
                <LoopGridCell></LoopGridCell>
                <LoopGridCell></LoopGridCell>
                <LoopGridCell></LoopGridCell>
                <LoopGridCell></LoopGridCell>
                <LoopGridCell></LoopGridCell>
                <LoopGridCell></LoopGridCell>
                <LoopGridCell></LoopGridCell>
                <LoopGridCell></LoopGridCell>
                <LoopCellVertical>
                  <Red>T</Red>
                </LoopCellVertical>
                <LoopGridCell></LoopGridCell>
                <LoopGridCell></LoopGridCell>
                <LoopGridCell></LoopGridCell>
                <LoopGridCell></LoopGridCell>
                <LoopGridCell></LoopGridCell>
                <LoopCellVertical>S</LoopCellVertical>
                <LoopGridCell></LoopGridCell>
                <LoopGridCell></LoopGridCell>
              </tr>
              <tr>
                <LoopGridCell></LoopGridCell>
                <LoopGridCell></LoopGridCell>
                <LoopGridCell></LoopGridCell>
                <LoopGridCell></LoopGridCell>
                <LoopGridCell></LoopGridCell>
                <LoopGridCell></LoopGridCell>
                <LoopGridCell></LoopGridCell>
                <LoopGridCell></LoopGridCell>
                <LoopGridCell></LoopGridCell>
                <LoopGridCell></LoopGridCell>
                <LoopCellVertical>N</LoopCellVertical>
                <LoopGridCell></LoopGridCell>
                <LoopGridCell></LoopGridCell>
                <LoopGridCell></LoopGridCell>
                <LoopGridCell></LoopGridCell>
                <LoopGridCell></LoopGridCell>
                <LoopCellVertical>G</LoopCellVertical>
                <LoopGridCell></LoopGridCell>
                <LoopGridCell></LoopGridCell>
              </tr>
              <tr>
                <LoopGridCell></LoopGridCell>
                <LoopGridCell></LoopGridCell>
                <LoopGridCell></LoopGridCell>
                <LoopGridCell></LoopGridCell>
                <LoopGridCell></LoopGridCell>
                <LoopGridCell></LoopGridCell>
                <LoopGridCell></LoopGridCell>
                <LoopGridCell></LoopGridCell>
                <LoopGridCell></LoopGridCell>
                <LoopGridCell></LoopGridCell>
                <LoopCellVertical>E</LoopCellVertical>
                <LoopGridCell></LoopGridCell>
                <LoopGridCell></LoopGridCell>
                <LoopGridCell></LoopGridCell>
                <LoopGridCell></LoopGridCell>
                <LoopGridCell></LoopGridCell>
                <LoopCellBottomLeft>R</LoopCellBottomLeft>
                <LoopCellSideways>U</LoopCellSideways>
                <LoopCellTopRight>B</LoopCellTopRight>
              </tr>
              <tr>
                <LoopGridCell></LoopGridCell>
                <LoopGridCell></LoopGridCell>
                <LoopGridCell></LoopGridCell>
                <LoopGridCell></LoopGridCell>
                <LoopGridCell></LoopGridCell>
                <LoopGridCell></LoopGridCell>
                <LoopGridCell></LoopGridCell>
                <LoopGridCell></LoopGridCell>
                <LoopGridCell></LoopGridCell>
                <LoopGridCell></LoopGridCell>
                <LoopCellVertical>D</LoopCellVertical>
                <LoopGridCell></LoopGridCell>
                <LoopGridCell></LoopGridCell>
                <LoopGridCell></LoopGridCell>
                <LoopGridCell></LoopGridCell>
                <LoopGridCell></LoopGridCell>
                <LoopGridCell></LoopGridCell>
                <LoopGridCell></LoopGridCell>
                <LoopCellVertical>E</LoopCellVertical>
              </tr>
              <tr>
                <LoopGridCell></LoopGridCell>
                <LoopGridCell></LoopGridCell>
                <LoopGridCell></LoopGridCell>
                <LoopGridCell></LoopGridCell>
                <LoopGridCell></LoopGridCell>
                <LoopGridCell></LoopGridCell>
                <LoopGridCell></LoopGridCell>
                <LoopGridCell></LoopGridCell>
                <LoopGridCell></LoopGridCell>
                <LoopGridCell></LoopGridCell>
                <LoopCellVertical>L</LoopCellVertical>
                <LoopGridCell></LoopGridCell>
                <LoopGridCell></LoopGridCell>
                <LoopGridCell></LoopGridCell>
                <LoopGridCell></LoopGridCell>
                <LoopGridCell></LoopGridCell>
                <LoopGridCell></LoopGridCell>
                <LoopCellTopLeft>E</LoopCellTopLeft>
                <LoopCellBottomRight>
                  <Red>R</Red>
                </LoopCellBottomRight>
              </tr>
              <tr>
                <LoopGridCell></LoopGridCell>
                <LoopGridCell></LoopGridCell>
                <LoopGridCell></LoopGridCell>
                <LoopGridCell></LoopGridCell>
                <LoopGridCell></LoopGridCell>
                <LoopGridCell></LoopGridCell>
                <LoopGridCell></LoopGridCell>
                <LoopGridCell></LoopGridCell>
                <LoopGridCell></LoopGridCell>
                <LoopGridCell></LoopGridCell>
                <LoopCellVertical>L</LoopCellVertical>
                <LoopGridCell></LoopGridCell>
                <LoopGridCell></LoopGridCell>
                <LoopGridCell></LoopGridCell>
                <LoopGridCell></LoopGridCell>
                <LoopGridCell></LoopGridCell>
                <LoopGridCell></LoopGridCell>
                <LoopCellVertical>A</LoopCellVertical>
                <LoopGridCell></LoopGridCell>
              </tr>
              <tr>
                <LoopCellTopLeft>R</LoopCellTopLeft>
                <LoopCellSideways>O</LoopCellSideways>
                <LoopCellSideways>B</LoopCellSideways>
                <LoopCellSideways>R</LoopCellSideways>
                <LoopCellSideways>I</LoopCellSideways>
                <LoopCellSideways>U</LoopCellSideways>
                <LoopCellSideways>
                  <Red>M</Red>
                </LoopCellSideways>
                <LoopCellSideways>A</LoopCellSideways>
                <LoopCellSideways>X</LoopCellSideways>
                <LoopCellSideways>W</LoopCellSideways>
                <LoopCellBottomRight>E</LoopCellBottomRight>
                <LoopGridCell></LoopGridCell>
                <LoopGridCell></LoopGridCell>
                <LoopGridCell></LoopGridCell>
                <LoopGridCell></LoopGridCell>
                <LoopGridCell></LoopGridCell>
                <LoopGridCell></LoopGridCell>
                <LoopCellVertical>D</LoopCellVertical>
                <LoopGridCell></LoopGridCell>
              </tr>
              <tr>
                <LoopCellVertical>P</LoopCellVertical>
                <LoopGridCell></LoopGridCell>
                <LoopGridCell></LoopGridCell>
                <LoopGridCell></LoopGridCell>
                <LoopGridCell></LoopGridCell>
                <LoopGridCell></LoopGridCell>
                <LoopGridCell></LoopGridCell>
                <LoopGridCell></LoopGridCell>
                <LoopGridCell></LoopGridCell>
                <LoopGridCell></LoopGridCell>
                <LoopGridCell></LoopGridCell>
                <LoopGridCell></LoopGridCell>
                <LoopGridCell></LoopGridCell>
                <LoopGridCell></LoopGridCell>
                <LoopGridCell></LoopGridCell>
                <LoopGridCell></LoopGridCell>
                <LoopGridCell></LoopGridCell>
                <LoopCellVertical>Y</LoopCellVertical>
                <LoopGridCell></LoopGridCell>
              </tr>
              <tr>
                <LoopCellVertical>P</LoopCellVertical>
                <LoopGridCell></LoopGridCell>
                <LoopGridCell></LoopGridCell>
                <LoopGridCell></LoopGridCell>
                <LoopGridCell></LoopGridCell>
                <LoopGridCell></LoopGridCell>
                <LoopGridCell></LoopGridCell>
                <LoopGridCell></LoopGridCell>
                <LoopGridCell></LoopGridCell>
                <LoopGridCell></LoopGridCell>
                <LoopGridCell></LoopGridCell>
                <LoopGridCell></LoopGridCell>
                <LoopGridCell></LoopGridCell>
                <LoopGridCell></LoopGridCell>
                <LoopGridCell></LoopGridCell>
                <LoopGridCell></LoopGridCell>
                <LoopGridCell></LoopGridCell>
                <LoopCellVertical>S</LoopCellVertical>
                <LoopGridCell></LoopGridCell>
              </tr>
              <tr>
                <LoopCellBottomLeft>
                  <Red>O</Red>
                </LoopCellBottomLeft>
                <LoopCellSideways>G</LoopCellSideways>
                <LoopCellSideways>A</LoopCellSideways>
                <LoopCellSideways>R</LoopCellSideways>
                <LoopCellSideways>D</LoopCellSideways>
                <LoopCellSideways>N</LoopCellSideways>
                <LoopCellSideways>A</LoopCellSideways>
                <LoopCellSideways>V</LoopCellSideways>
                <LoopCellSidewaysGray>
                  <Red>I</Red>
                </LoopCellSidewaysGray>
                <LoopCellSidewaysGray>M</LoopCellSidewaysGray>
                <LoopCellSideways>R</LoopCellSideways>
                <LoopCellSideways>E</LoopCellSideways>
                <LoopCellTopRight>F</LoopCellTopRight>
                <LoopGridCell></LoopGridCell>
                <LoopGridCell></LoopGridCell>
                <LoopGridCell></LoopGridCell>
                <LoopGridCell></LoopGridCell>
                <LoopCellVertical>E</LoopCellVertical>
                <LoopGridCell></LoopGridCell>
              </tr>
              <tr>
                <LoopGridCell></LoopGridCell>
                <LoopGridCell></LoopGridCell>
                <LoopGridCell></LoopGridCell>
                <LoopGridCell></LoopGridCell>
                <LoopGridCell></LoopGridCell>
                <LoopGridCell></LoopGridCell>
                <LoopGridCell></LoopGridCell>
                <LoopGridCell></LoopGridCell>
                <LoopGridCell></LoopGridCell>
                <LoopGridCell></LoopGridCell>
                <LoopGridCell></LoopGridCell>
                <LoopGridCell></LoopGridCell>
                <LoopCellVertical>O</LoopCellVertical>
                <LoopGridCell></LoopGridCell>
                <LoopGridCell></LoopGridCell>
                <LoopGridCell></LoopGridCell>
                <LoopGridCell></LoopGridCell>
                <LoopCellVerticalGray>T</LoopCellVerticalGray>
                <LoopGridCell></LoopGridCell>
              </tr>
              <tr>
                <LoopGridCell></LoopGridCell>
                <LoopGridCell></LoopGridCell>
                <LoopGridCell></LoopGridCell>
                <LoopGridCell></LoopGridCell>
                <LoopGridCell></LoopGridCell>
                <LoopGridCell></LoopGridCell>
                <LoopGridCell></LoopGridCell>
                <LoopGridCell></LoopGridCell>
                <LoopGridCell></LoopGridCell>
                <LoopGridCell></LoopGridCell>
                <LoopGridCell></LoopGridCell>
                <LoopGridCell></LoopGridCell>
                <LoopCellVertical>C</LoopCellVertical>
                <LoopGridCell></LoopGridCell>
                <LoopCellTopLeft>E</LoopCellTopLeft>
                <LoopCellSideways>W</LoopCellSideways>
                <LoopCellSideways>
                  <Red>O</Red>
                </LoopCellSideways>
                <LoopCellBottomRight>G</LoopCellBottomRight>
                <LoopGridCell></LoopGridCell>
              </tr>
              <tr>
                <LoopGridCell></LoopGridCell>
                <LoopGridCell></LoopGridCell>
                <LoopGridCell></LoopGridCell>
                <LoopGridCell></LoopGridCell>
                <LoopGridCell></LoopGridCell>
                <LoopGridCell></LoopGridCell>
                <LoopGridCell></LoopGridCell>
                <LoopGridCell></LoopGridCell>
                <LoopGridCell></LoopGridCell>
                <LoopGridCell></LoopGridCell>
                <LoopGridCell></LoopGridCell>
                <LoopGridCell></LoopGridCell>
                <LoopCellVertical>I</LoopCellVertical>
                <LoopGridCell></LoopGridCell>
                <LoopCellVertical>N</LoopCellVertical>
                <LoopGridCell></LoopGridCell>
                <LoopGridCell></LoopGridCell>
                <LoopGridCell></LoopGridCell>
                <LoopGridCell></LoopGridCell>
              </tr>
              <tr>
                <LoopGridCell></LoopGridCell>
                <LoopGridCell></LoopGridCell>
                <LoopGridCell></LoopGridCell>
                <LoopGridCell></LoopGridCell>
                <LoopGridCell></LoopGridCell>
                <LoopGridCell></LoopGridCell>
                <LoopGridCell></LoopGridCell>
                <LoopGridCell></LoopGridCell>
                <LoopGridCell></LoopGridCell>
                <LoopGridCell></LoopGridCell>
                <LoopGridCell></LoopGridCell>
                <LoopGridCell></LoopGridCell>
                <LoopCellVertical>R</LoopCellVertical>
                <LoopGridCell></LoopGridCell>
                <LoopCellVertical>D</LoopCellVertical>
                <LoopGridCell></LoopGridCell>
                <LoopGridCell></LoopGridCell>
                <LoopGridCell></LoopGridCell>
                <LoopGridCell></LoopGridCell>
              </tr>
              <tr>
                <LoopGridCell></LoopGridCell>
                <LoopGridCell></LoopGridCell>
                <LoopGridCell></LoopGridCell>
                <LoopGridCell></LoopGridCell>
                <LoopGridCell></LoopGridCell>
                <LoopGridCell></LoopGridCell>
                <LoopGridCell></LoopGridCell>
                <LoopGridCell></LoopGridCell>
                <LoopGridCell></LoopGridCell>
                <LoopGridCell></LoopGridCell>
                <LoopGridCell></LoopGridCell>
                <LoopGridCell></LoopGridCell>
                <LoopCellVertical>N</LoopCellVertical>
                <LoopGridCell></LoopGridCell>
                <LoopCellVertical>A</LoopCellVertical>
                <LoopGridCell></LoopGridCell>
                <LoopGridCell></LoopGridCell>
                <LoopGridCell></LoopGridCell>
                <LoopGridCell></LoopGridCell>
              </tr>
              <tr>
                <LoopGridCell></LoopGridCell>
                <LoopGridCell></LoopGridCell>
                <LoopGridCell></LoopGridCell>
                <LoopGridCell></LoopGridCell>
                <LoopGridCell></LoopGridCell>
                <LoopGridCell></LoopGridCell>
                <LoopGridCell></LoopGridCell>
                <LoopGridCell></LoopGridCell>
                <LoopGridCell></LoopGridCell>
                <LoopGridCell></LoopGridCell>
                <LoopGridCell></LoopGridCell>
                <LoopGridCell></LoopGridCell>
                <LoopCellVertical>
                  <Red>E</Red>
                </LoopCellVertical>
                <LoopGridCell></LoopGridCell>
                <LoopCellVertical>V</LoopCellVertical>
                <LoopGridCell></LoopGridCell>
                <LoopGridCell></LoopGridCell>
                <LoopGridCell></LoopGridCell>
                <LoopGridCell></LoopGridCell>
              </tr>
              <tr>
                <LoopGridCell></LoopGridCell>
                <LoopGridCell></LoopGridCell>
                <LoopGridCell></LoopGridCell>
                <LoopGridCell></LoopGridCell>
                <LoopGridCell></LoopGridCell>
                <LoopGridCell></LoopGridCell>
                <LoopGridCell></LoopGridCell>
                <LoopGridCell></LoopGridCell>
                <LoopGridCell></LoopGridCell>
                <LoopGridCell></LoopGridCell>
                <LoopGridCell></LoopGridCell>
                <LoopGridCell></LoopGridCell>
                <LoopCellVertical>L</LoopCellVertical>
                <LoopGridCell></LoopGridCell>
                <LoopCellVertical>I</LoopCellVertical>
                <LoopGridCell></LoopGridCell>
                <LoopGridCell></LoopGridCell>
                <LoopGridCell></LoopGridCell>
                <LoopGridCell></LoopGridCell>
              </tr>
              <tr>
                <LoopGridCell></LoopGridCell>
                <LoopGridCell></LoopGridCell>
                <LoopGridCell></LoopGridCell>
                <LoopGridCell></LoopGridCell>
                <LoopGridCell></LoopGridCell>
                <LoopGridCell></LoopGridCell>
                <LoopGridCell></LoopGridCell>
                <LoopGridCell></LoopGridCell>
                <LoopGridCell></LoopGridCell>
                <LoopGridCell></LoopGridCell>
                <LoopGridCell></LoopGridCell>
                <LoopGridCell></LoopGridCell>
                <LoopCellVertical>Z</LoopCellVertical>
                <LoopGridCell></LoopGridCell>
                <LoopCellVertical>A</LoopCellVertical>
                <LoopGridCell></LoopGridCell>
                <LoopGridCell></LoopGridCell>
                <LoopGridCell></LoopGridCell>
                <LoopGridCell></LoopGridCell>
              </tr>
              <tr>
                <LoopGridCell></LoopGridCell>
                <LoopGridCell></LoopGridCell>
                <LoopGridCell></LoopGridCell>
                <LoopGridCell></LoopGridCell>
                <LoopGridCell></LoopGridCell>
                <LoopGridCell></LoopGridCell>
                <LoopGridCell></LoopGridCell>
                <LoopGridCell></LoopGridCell>
                <LoopGridCell></LoopGridCell>
                <LoopGridCell></LoopGridCell>
                <LoopGridCell></LoopGridCell>
                <LoopGridCell></LoopGridCell>
                <LoopCellBottomLeft>Z</LoopCellBottomLeft>
                <LoopCellSideways>O</LoopCellSideways>
                <LoopCellBottomRight>
                  <Red>N</Red>
                </LoopCellBottomRight>
                <LoopGridCell></LoopGridCell>
                <LoopGridCell></LoopGridCell>
                <LoopGridCell></LoopGridCell>
                <LoopGridCell></LoopGridCell>
              </tr>
            </tbody>
          </LoopGrid>
        </HScrollTableWrapper>
      </ProblemBlock>
    </>
  );
};

export default Solution;
