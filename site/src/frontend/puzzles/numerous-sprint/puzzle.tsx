import React, { type CSSProperties } from "react";
import { styled } from "styled-components";
import { COPY_ONLY_CLASS } from "../../components/CopyToClipboard";
import Crossword from "../../components/Crossword";
import LinkedImage from "../../components/LinkedImage";
import { HScrollTableWrapper } from "../../components/StyledUI";
import img1 from "./assets/image1.png";
import img2 from "./assets/image2.png";

const ProblemHeader = styled.h2`
  font-family: Arial, sans-serif;
  font-weight: bold;
  margin-top: 0;
  padding: 0;
`;

const ProblemContent = styled.div`
  font-family: "Times New Roman", serif;
  margin-top: -3rem;
`;

export const StyledCrossword = styled(Crossword)`
  margin-bottom: 1rem;
  margin-left: auto;
  margin-right: auto;
`;

const ProblemNumber = styled.span`
  font-weight: bold;
`;

const StyledImage = styled(LinkedImage)`
  margin-bottom: 2rem;
  img {
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 2rem;
    display: block;
    width: inherit;
    max-width: 100%;
  }
`;

const TopImage = styled(StyledImage)`
  img {
    margin-left: 0;
    height: 36em;
    margin-bottom: 0;
    max-width: unset;
  }
`;

const TopImageContainer = styled.div`
  max-width: 100%;
  overflow: hidden;
`;

export const LABELS: string[][] = Array.from({ length: 10 }, () =>
  Array(10).fill(""),
);

export const GridContent = [
  ["A", "1", "T", "T", "H", "E", "I", "N", "2", "S"],
  ["T", "I", "T", "U", "T", "E", "W", "3", "", "I"],
  ["T", "T", "Y", "S", "T", "U", "D", "E", "N", "T"],
  ["S", "", "A", "1", "1", "R", "E", "R", "O", "U"],
  ["T", "", "I", "N", "E", "L", "Y", "F", "", "L"],
  ["O", "O", "D", "E", "D", "W", "I", "T", "H", "P"],
  ["U", "3", "Z", "Z", "L", "E", "S", "Q", "U", "I"],
  ["Z", "Z", "E", "S", "0", "A", "N", "D", "0", "S"],
  ["U", "P", "E", "R", "T", "I", "G", "H", "T", "D"],
  ["", "E", "A", "D", "L", "", "I", "N", "E", "S"],
];

const DarkSquares = ` .      . 
       .. 
          
 . ..     
 .      . 
          
 .        
    .   . 
          
.    .    `
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
  if (DarkSquares[row]?.[column] === ".") {
    return {
      backgroundColor: "black",
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
  font-weight: bold;
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
`;

const LoopCellBottomLeft = styled(LoopCell)`
  border-bottom-color: #000000;
  border-left-color: #000000;
  border-right-color: #cccccc;
  border-top-color: #cccccc;
`;

const LoopCellTopRight = styled(LoopCell)`
  border-bottom-color: #cccccc;
  border-left-color: #cccccc;
  border-right-color: #000000;
  border-top-color: #000000;
`;

const LoopCellTopLeft = styled(LoopCell)`
  border-bottom-color: #cccccc;
  border-left-color: #000000;
  border-right-color: #cccccc;
  border-top-color: #000000;
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

export const ProblemBlock = styled.div`
  margin-top: 3rem;
`;

const Bold = ({ children }: { children: React.ReactNode }) => (
  <>
    <span className={COPY_ONLY_CLASS}>*</span>
    <b>{children}</b>
    <span className={COPY_ONLY_CLASS}>*</span>
  </>
);

const Superscript = ({ children }: { children: React.ReactNode }) => (
  <>
    <span className={COPY_ONLY_CLASS}>^</span>
    <sup>{children}</sup>
  </>
);

// Empty span to reset font on copy/paste
const FontReset = () => (
  <>
    <span></span>
  </>
);

const Puzzle = (): JSX.Element => {
  return (
    <>
      <hr />
      <ProblemHeader>Problems</ProblemHeader>
      <TopImageContainer>
        <TopImage
          src={img1}
          alt="Two magazines with “MIT” on the cover, with obscured text in the background. “MH1,” “MH2,” “MH3,” and “MH4” are visible in the obscured text."
        />
      </TopImageContainer>
      <ProblemContent>
        <ProblemBlock>
          <p>
            <ProblemNumber>MH5.</ProblemNumber> Part of being a scientifically
            literate MIT student is familiarity with a great number of formulas
            across all areas of study. It’s important to review them
            periodically to keep them at the top of your mind.
          </p>
          <StyledImage src={img2} alt="An equation" />
        </ProblemBlock>
        <ProblemBlock>
          <p>
            <ProblemNumber>MH6.</ProblemNumber> Students at MIT don’t spend all
            their time studying. They have a great sense of fun and enjoy
            surveying their kingdome from up high. (Really they’re just counting
            the months until they can pull their next hack.)
          </p>
          <ul>
            <li>
              BEANIE HAT
              <FontReset />
            </li>
            <li>
              JACK O LANTERN
              <FontReset />
            </li>
            <li>
              BAT SIGNAL
              <FontReset />
            </li>
            <li>
              EARTH
              <FontReset />
            </li>
            <li>
              POLICE CAR
              <FontReset />
            </li>
            <li>
              MEDAL
              <FontReset />
            </li>
            <li>
              FIRE ENGINE
              <FontReset />
            </li>
            <li>
              CAPTAIN AMERICA SHIELD
              <FontReset />
            </li>
            <li>
              JOLLY ROGER
              <FontReset />
            </li>
            <li>
              LUNAR MODULE
              <FontReset />
            </li>
          </ul>
        </ProblemBlock>
        <ProblemBlock>
          <p>
            <ProblemNumber>MH7.</ProblemNumber> MIT can be found in many films,
            sometimes as the main setting, though often used just to show how
            smart a character is. In these reboots of some of the better known
            pictures that mention MIT, the directors made some bold choices.
            Perhaps it would have been better if they had stuck to the original
            ones.
          </p>
          <ul>
            <li>
              L<Bold>E</Bold>AD GUY
              <FontReset />
            </li>
            <li>
              EBONY LEOPA<Bold>R</Bold>D: B<Bold>I</Bold>RNI
              <Bold>N</Bold> ZANA REDO
              <FontReset />
            </li>
            <li>
              EVERY JULY FOURT<Bold>H</Bold>
              <FontReset />
            </li>
            <li>
              WI<Bold>T</Bold>HOUT ANY THREADS
              <FontReset />
            </li>
            <li>
              RA<Bold>V</Bold>IS<Bold>H</Bold>ING BRAIN
              <FontReset />
            </li>
            <li>
              <Bold>TH</Bold>RIFT SHOP SCOUR
              <FontReset />
            </li>
          </ul>
        </ProblemBlock>
        <ProblemBlock>
          <p>
            <ProblemNumber>MH8.</ProblemNumber> Initially, you might think these
            people just have big heads, but they have big accomplishments to
            match! They all started off with the same important first step.
          </p>

          <p>
            I’ll have you know…
            <FontReset />
          </p>

          <ul>
            <li>
              …I wrote about interior design with a famous novelist!
              <FontReset />
            </li>
            <li>
              …I pioneered virtual memory (who needs the real thing?)!
              <FontReset />
            </li>
            <li>
              …I wrote a column for the New York Times!
              <FontReset />
            </li>
            <li>
              …I had my own radio show about cars with my big brother!
              <FontReset />
            </li>
            <li>
              …I predicted pandemonium when computers learned to think!
              <FontReset />
            </li>
            <li>
              …I walked on the moon (so what if I wasn’t the very first?)!
              <FontReset />
            </li>
            <li>
              …I put the @ in @mit.edu!
              <FontReset />
            </li>
            <li>
              …I built a pyramid in France!
              <FontReset />
            </li>
            <li>
              …I was a candidate for Prime Minister and a princess!
              <FontReset />
            </li>
            <li>
              …I completed the first doctorate in engineering earned by an
              African-American!
              <FontReset />
            </li>
          </ul>
        </ProblemBlock>
        <ProblemBlock>
          <p>
            <ProblemNumber>MH9.</ProblemNumber> Getting an education from MIT
            can feel like drinking from a firehose. Place fire hydrants in the
            grid below to simulate the inundation of being an MIT student.
          </p>

          <p>
            Rules:
            <FontReset />
          </p>
          <ul>
            <li>
              Numbers given in black squares are the number of hydrants
              orthogonally adjacent to those squares.
              <FontReset />
            </li>
            <li>
              Hydrants spew water in all four directions until interrupted by a
              wall (black square).
              <FontReset />
            </li>
            <li>
              Every square must be supplied with water from at least one
              hydrant.
              <FontReset />
            </li>
            <li>
              Hydrants can’t be placed in any square where they could directly
              spray another hydrant.
              <FontReset />
            </li>
          </ul>

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
            <ProblemNumber>MH10.</ProblemNumber> Anyone familiar with MIT and
            the bridge that connects it to Boston knows that the quality of
            something can be measured with the people involved…and the relevant
            quantity is sometimes named for them too. Are these the right names
            though? Remember to round to the nearest integer.
          </p>

          <ul>
            <li>
              3.57 × 10<Superscript>-13</Superscript> sheppeys in Anders Jonases
              <FontReset />
            </li>
            <li>
              4.197 × 10<Superscript>10</Superscript> Benjamins in
              Charles-Augustins
              <FontReset />
            </li>
            <li>
              6.66 × 10<Superscript>5</Superscript> Lord Ernests in Marie and
              Pierres
              <FontReset />
            </li>
            <li>
              9 × 10<Superscript>-50</Superscript> cm
              <Superscript>4</Superscript> s/photon in Marias
              <FontReset />
            </li>
            <li>
              3 × 10<Superscript>-44</Superscript> foes in James Prescotts
              <FontReset />
            </li>
            <li>
              0.015 sthènes in Isaacs
              <FontReset />
            </li>
            <li>
              477.5 André-Maries/meter in Hans Christians
              <FontReset />
            </li>
            <li>
              5.05 × 10<Superscript>7</Superscript> banana equivalent doses in
              Rolfs
              <FontReset />
            </li>
            <li>
              13534.10655 potrzebies in Olivers
              <FontReset />
            </li>
            <li>
              1.329 × 10<Superscript>17</Superscript> American gills/fortnight
              in Haralds
              <FontReset />
            </li>
            <li>
              0.222 pirate-ninjas in Jameses
              <FontReset />
            </li>
          </ul>
        </ProblemBlock>
        <ProblemBlock>
          <p>
            <ProblemNumber>MH11. (Metapuzzle)</ProblemNumber> It seems like you
            can find puzzle hunters on every corner these days, among MIT alumni
            and students both. On reviewing your answers to puzzles 1-10, you’ll
            surely have the technology to fit them in below.
          </p>

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
                  <LoopCellTopLeft></LoopCellTopLeft>
                  <LoopCellSideways></LoopCellSideways>
                  <LoopCellSideways></LoopCellSideways>
                  <LoopCellSideways></LoopCellSideways>
                  <LoopCellSideways></LoopCellSideways>
                  <LoopCellSideways></LoopCellSideways>
                  <LoopCellTopRight></LoopCellTopRight>
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
                  <LoopCellTopLeft></LoopCellTopLeft>
                  <LoopCellBottomRight></LoopCellBottomRight>
                  <LoopGridCell></LoopGridCell>
                  <LoopGridCell></LoopGridCell>
                  <LoopGridCell></LoopGridCell>
                  <LoopGridCell></LoopGridCell>
                  <LoopGridCell></LoopGridCell>
                  <LoopCellVertical></LoopCellVertical>
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
                  <LoopCellVertical></LoopCellVertical>
                  <LoopGridCell></LoopGridCell>
                  <LoopGridCell></LoopGridCell>
                  <LoopGridCell></LoopGridCell>
                  <LoopGridCell></LoopGridCell>
                  <LoopGridCell></LoopGridCell>
                  <LoopGridCell></LoopGridCell>
                  <LoopCellVertical></LoopCellVertical>
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
                  <LoopCellBottomLeft></LoopCellBottomLeft>
                  <LoopCellTopRight></LoopCellTopRight>
                  <LoopGridCell></LoopGridCell>
                  <LoopGridCell></LoopGridCell>
                  <LoopGridCell></LoopGridCell>
                  <LoopGridCell></LoopGridCell>
                  <LoopGridCell></LoopGridCell>
                  <LoopCellVertical></LoopCellVertical>
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
                  <LoopCellVertical></LoopCellVertical>
                  <LoopGridCell></LoopGridCell>
                  <LoopGridCell></LoopGridCell>
                  <LoopGridCell></LoopGridCell>
                  <LoopGridCell></LoopGridCell>
                  <LoopGridCell></LoopGridCell>
                  <LoopCellVertical></LoopCellVertical>
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
                  <LoopCellVertical></LoopCellVertical>
                  <LoopGridCell></LoopGridCell>
                  <LoopGridCell></LoopGridCell>
                  <LoopGridCell></LoopGridCell>
                  <LoopGridCell></LoopGridCell>
                  <LoopGridCell></LoopGridCell>
                  <LoopCellVertical></LoopCellVertical>
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
                  <LoopCellVertical></LoopCellVertical>
                  <LoopGridCell></LoopGridCell>
                  <LoopGridCell></LoopGridCell>
                  <LoopGridCell></LoopGridCell>
                  <LoopGridCell></LoopGridCell>
                  <LoopGridCell></LoopGridCell>
                  <LoopCellVertical></LoopCellVertical>
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
                  <LoopCellVertical></LoopCellVertical>
                  <LoopGridCell></LoopGridCell>
                  <LoopGridCell></LoopGridCell>
                  <LoopGridCell></LoopGridCell>
                  <LoopGridCell></LoopGridCell>
                  <LoopGridCell></LoopGridCell>
                  <LoopCellBottomLeft></LoopCellBottomLeft>
                  <LoopCellSideways></LoopCellSideways>
                  <LoopCellTopRight></LoopCellTopRight>
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
                  <LoopCellVertical></LoopCellVertical>
                  <LoopGridCell></LoopGridCell>
                  <LoopGridCell></LoopGridCell>
                  <LoopGridCell></LoopGridCell>
                  <LoopGridCell></LoopGridCell>
                  <LoopGridCell></LoopGridCell>
                  <LoopGridCell></LoopGridCell>
                  <LoopGridCell></LoopGridCell>
                  <LoopCellVertical></LoopCellVertical>
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
                  <LoopCellVertical></LoopCellVertical>
                  <LoopGridCell></LoopGridCell>
                  <LoopGridCell></LoopGridCell>
                  <LoopGridCell></LoopGridCell>
                  <LoopGridCell></LoopGridCell>
                  <LoopGridCell></LoopGridCell>
                  <LoopGridCell></LoopGridCell>
                  <LoopCellTopLeft></LoopCellTopLeft>
                  <LoopCellBottomRight></LoopCellBottomRight>
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
                  <LoopCellVertical></LoopCellVertical>
                  <LoopGridCell></LoopGridCell>
                  <LoopGridCell></LoopGridCell>
                  <LoopGridCell></LoopGridCell>
                  <LoopGridCell></LoopGridCell>
                  <LoopGridCell></LoopGridCell>
                  <LoopGridCell></LoopGridCell>
                  <LoopCellVertical></LoopCellVertical>
                  <LoopGridCell></LoopGridCell>
                </tr>
                <tr>
                  <LoopCellTopLeft></LoopCellTopLeft>
                  <LoopCellSideways></LoopCellSideways>
                  <LoopCellSideways></LoopCellSideways>
                  <LoopCellSideways></LoopCellSideways>
                  <LoopCellSideways></LoopCellSideways>
                  <LoopCellSideways></LoopCellSideways>
                  <LoopCellSideways></LoopCellSideways>
                  <LoopCellSideways></LoopCellSideways>
                  <LoopCellSideways></LoopCellSideways>
                  <LoopCellSideways></LoopCellSideways>
                  <LoopCellBottomRight></LoopCellBottomRight>
                  <LoopGridCell></LoopGridCell>
                  <LoopGridCell></LoopGridCell>
                  <LoopGridCell></LoopGridCell>
                  <LoopGridCell></LoopGridCell>
                  <LoopGridCell></LoopGridCell>
                  <LoopGridCell></LoopGridCell>
                  <LoopCellVertical></LoopCellVertical>
                  <LoopGridCell></LoopGridCell>
                </tr>
                <tr>
                  <LoopCellVertical></LoopCellVertical>
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
                  <LoopCellVertical></LoopCellVertical>
                  <LoopGridCell></LoopGridCell>
                </tr>
                <tr>
                  <LoopCellVertical></LoopCellVertical>
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
                  <LoopCellVertical></LoopCellVertical>
                  <LoopGridCell></LoopGridCell>
                </tr>
                <tr>
                  <LoopCellBottomLeft></LoopCellBottomLeft>
                  <LoopCellSideways></LoopCellSideways>
                  <LoopCellSideways></LoopCellSideways>
                  <LoopCellSideways></LoopCellSideways>
                  <LoopCellSideways></LoopCellSideways>
                  <LoopCellSideways></LoopCellSideways>
                  <LoopCellSideways></LoopCellSideways>
                  <LoopCellSideways></LoopCellSideways>
                  <LoopCellSideways>
                    <span>I</span>
                  </LoopCellSideways>
                  <LoopCellSideways>
                    <span>M</span>
                  </LoopCellSideways>
                  <LoopCellSideways></LoopCellSideways>
                  <LoopCellSideways></LoopCellSideways>
                  <LoopCellTopRight></LoopCellTopRight>
                  <LoopGridCell></LoopGridCell>
                  <LoopGridCell></LoopGridCell>
                  <LoopGridCell></LoopGridCell>
                  <LoopGridCell></LoopGridCell>
                  <LoopCellVertical></LoopCellVertical>
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
                  <LoopCellVertical></LoopCellVertical>
                  <LoopGridCell></LoopGridCell>
                  <LoopGridCell></LoopGridCell>
                  <LoopGridCell></LoopGridCell>
                  <LoopGridCell></LoopGridCell>
                  <LoopCellVertical>
                    <span>T</span>
                  </LoopCellVertical>
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
                  <LoopCellVertical></LoopCellVertical>
                  <LoopGridCell></LoopGridCell>
                  <LoopCellTopLeft></LoopCellTopLeft>
                  <LoopCellSideways></LoopCellSideways>
                  <LoopCellSideways></LoopCellSideways>
                  <LoopCellBottomRight></LoopCellBottomRight>
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
                  <LoopCellVertical></LoopCellVertical>
                  <LoopGridCell></LoopGridCell>
                  <LoopCellVertical></LoopCellVertical>
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
                  <LoopCellVertical></LoopCellVertical>
                  <LoopGridCell></LoopGridCell>
                  <LoopCellVertical></LoopCellVertical>
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
                  <LoopCellVertical></LoopCellVertical>
                  <LoopGridCell></LoopGridCell>
                  <LoopCellVertical></LoopCellVertical>
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
                  <LoopCellVertical></LoopCellVertical>
                  <LoopGridCell></LoopGridCell>
                  <LoopCellVertical></LoopCellVertical>
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
                  <LoopCellVertical></LoopCellVertical>
                  <LoopGridCell></LoopGridCell>
                  <LoopCellVertical></LoopCellVertical>
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
                  <LoopCellVertical></LoopCellVertical>
                  <LoopGridCell></LoopGridCell>
                  <LoopCellVertical></LoopCellVertical>
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
                  <LoopCellBottomLeft></LoopCellBottomLeft>
                  <LoopCellSideways></LoopCellSideways>
                  <LoopCellBottomRight></LoopCellBottomRight>
                  <LoopGridCell></LoopGridCell>
                  <LoopGridCell></LoopGridCell>
                  <LoopGridCell></LoopGridCell>
                  <LoopGridCell></LoopGridCell>
                </tr>
              </tbody>
            </LoopGrid>
          </HScrollTableWrapper>
        </ProblemBlock>{" "}
      </ProblemContent>
    </>
  );
};

export default Puzzle;
