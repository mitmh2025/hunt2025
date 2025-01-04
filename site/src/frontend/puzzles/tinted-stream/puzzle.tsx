import React from "react";
import { styled } from "styled-components";
import { COPY_ONLY_CLASS } from "../../components/CopyToClipboard";
import LinkedImage from "../../components/LinkedImage";
import genogram1 from "./assets/genogram1.svg";
import genogram2 from "./assets/genogram2.svg";
import genogram3 from "./assets/genogram3.svg";
import genogram4 from "./assets/genogram4.svg";
import genogram5 from "./assets/genogram5.svg";
import genogram6 from "./assets/genogram6.svg";
import grid1 from "./assets/grid1.png";
import grid10 from "./assets/grid10.png";
import grid11 from "./assets/grid11.png";
import grid12 from "./assets/grid12.png";
import grid13 from "./assets/grid13.png";
import grid14 from "./assets/grid14.png";
import grid15 from "./assets/grid15.png";
import grid2 from "./assets/grid2.png";
import grid3 from "./assets/grid3.png";
import grid4 from "./assets/grid4.png";
import grid5 from "./assets/grid5.png";
import grid6 from "./assets/grid6.png";
import grid7 from "./assets/grid7.png";
import grid8 from "./assets/grid8.png";
import grid9 from "./assets/grid9.png";

const FlexWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2em;
`;

const SizeLimitedImg = styled.img`
  max-width: 100%;
`;

const StyledTable = styled.table`
  border-collapse: collapse;
`;

const LastTable = styled(StyledTable)`
  td:nth-child(5),
  td:nth-child(8) {
    background-color: #cccccc;
  }
`;

const StyledCell = styled.td`
  border: 1px solid black;
`;

const Left = styled(StyledCell)`
  border-left-width: 3px;
`;

const Right = styled(StyledCell)`
  border-right-width: 3px;
`;

const COPY_ONLY_GRIDS: string[][][] = [
  `
     _  
  ______
___
 ____
`,
  `
_____
  __|
    |
`,
  `
/_____
  ______
  ___
 __
`,
  `
  __|
    |
    |
    |
    |
   _|
_____|
`,
  `
/______
      ____
         __|
           |
           |
`,
  `
 /
/_
/
/___
   ______
`,
  `
   _
  __|
 ___|
___
 _
`,
  `
  __
   _
   _
____
___
`,
  `
 ___
/____
    _
    _
/_  _
_____
`,
  `
/_
/______
/_____
 /
`,
  `
/
/_____
`,
  `
  /___
/_____
    __
`,
  `
___|
   _|
`,
  `
 _
___
___
`,
].map((grid) =>
  grid
    .split("\n")
    .slice(1, -1)
    .map((row) => row.split("")),
);

const LAST_GRID = `
/_________|
/__________|
 /_________|
/__________|
/__________|
/_________|
 /________|
 /________|
 /________|
  /________|
  /________|
  /________|
/__________|
  /________|
 /_________|
 /__________|
`
  .split("\n")
  .slice(1, -1)
  .map((row) => row.split(""));

const Puzzle = (): JSX.Element => {
  return (
    <>
      <p className="puzzle-flavor">
        Sometimes she recycles names, other times dresses. Sometimes she hands
        them down to someone else, but that’s another story.
      </p>
      <LinkedImage src={genogram1} alt="A genogram" />
      <LinkedImage src={genogram2} alt="A genogram" />
      <LinkedImage src={genogram3} alt="A genogram" />
      <LinkedImage src={genogram4} alt="A genogram" />
      <LinkedImage src={genogram5} alt="A genogram" />
      <LinkedImage src={genogram6} alt="A genogram" />
      <p>Enter names left to right, top to bottom.</p>
      <FlexWrapper>
        <SizeLimitedImg
          src={grid1}
          alt="Zoomed-in crop of a fabric garment, with a grid overlaid."
        />
        <SizeLimitedImg
          src={grid2}
          alt="Zoomed-in crop of a fabric garment, with a grid overlaid."
        />
        <SizeLimitedImg
          src={grid3}
          alt="Zoomed-in crop of a fabric garment, with a grid overlaid."
        />
        <SizeLimitedImg
          src={grid4}
          alt="Zoomed-in crop of a fabric garment, with a grid overlaid."
        />
        <SizeLimitedImg
          src={grid5}
          alt="Zoomed-in crop of a fabric garment, with a grid overlaid."
        />
        <SizeLimitedImg
          src={grid6}
          alt="Zoomed-in crop of a fabric garment, with a grid overlaid."
        />
        <SizeLimitedImg
          src={grid7}
          alt="Zoomed-in crop of a fabric garment, with a grid overlaid."
        />
        <SizeLimitedImg
          src={grid8}
          alt="Zoomed-in crop of a fabric garment, with a grid overlaid."
        />
        <SizeLimitedImg
          src={grid9}
          alt="Zoomed-in crop of a fabric garment, with a grid overlaid."
        />
        <SizeLimitedImg
          src={grid10}
          alt="Zoomed-in crop of a fabric garment, with a grid overlaid."
        />
        <SizeLimitedImg
          src={grid11}
          alt="Zoomed-in crop of a fabric garment, with a grid overlaid."
        />
        <SizeLimitedImg
          src={grid12}
          alt="Zoomed-in crop of a fabric garment, with a grid overlaid."
        />
        <SizeLimitedImg
          src={grid13}
          alt="Zoomed-in crop of a fabric garment, with a grid overlaid."
        />
        <SizeLimitedImg
          src={grid14}
          alt="Zoomed-in crop of a fabric garment, with a grid overlaid."
        />
        <SizeLimitedImg
          src={grid15}
          alt="The outline of a dress, with a large grid overlaid."
        />
      </FlexWrapper>
      {COPY_ONLY_GRIDS.map((grid, i) => (
        <StyledTable key={i} className={COPY_ONLY_CLASS}>
          {grid.map((row, j) => (
            <tr key={j}>
              {row.map((cell) => {
                switch (cell) {
                  case "_":
                    return <StyledCell />;
                  case "/":
                    return <Left />;
                  case "|":
                    return <Right />;
                  default:
                    return <td />;
                }
              })}
            </tr>
          ))}
        </StyledTable>
      ))}
      <LastTable className={COPY_ONLY_CLASS}>
        {LAST_GRID.map((row, i) => (
          <tr key={i}>
            {row.map((cell) => {
              switch (cell) {
                case "_":
                  return <StyledCell />;
                case "/":
                  return <Left />;
                case "|":
                  return <Right />;
                default:
                  return <td />;
              }
            })}
          </tr>
        ))}
      </LastTable>
    </>
  );
};

export default Puzzle;
