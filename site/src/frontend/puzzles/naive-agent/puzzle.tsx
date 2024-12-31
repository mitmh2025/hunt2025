import React, { type ReactNode } from "react";
import { styled } from "styled-components";
import { OswaldFont } from "../../assets/SharedFonts";
import {
  COPY_ONLY_CLASS,
  NO_COPY_CLASS,
} from "../../components/CopyToClipboard";
import Crossword from "../../components/Crossword";
import { HScrollTableWrapper } from "../../components/StyledUI";
import SharkImg from "./assets/sharkright.png";

export const Grid = styled(Crossword)`
  td {
    height: 40pt;
    width: 40pt;
    line-height: 8pt;
    text-align: center;
    vertical-align: middle;
  }
`;

export const LABELS: string[][] = [
  ["", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
];

const SizedImage = styled.img`
  width: 27px;
  height: 26.67px;
`;

const UpImage = styled(SizedImage)`
  transform: rotate(270deg);
  -webkit-transform: rotate(270deg);
`;

const DownImage = styled(SizedImage)`
  transform: rotate(90deg);
  -webkit-transform: rotate(90deg);
`;

const LeftImage = styled(SizedImage)`
  transform: scaleX(-1);
  -webkit-transform: scaleX(-1);
`;

export const SharkRight = (
  <SizedImage src={SharkImg} alt="Shark facing right" />
);

export const SharkUp = <UpImage src={SharkImg} alt="Shark facing up" />;

export const SharkDown = <DownImage src={SharkImg} alt="Shark facing down" />;

export const SharkLeft = <LeftImage src={SharkImg} alt="Shark facing left" />;

export const GRID_CONTENT: ReactNode[][] = [
  ["Monaco", "", "", "", "", "", "", "", "Larvik", "", "", "", "", "", ""],
  [
    "",
    "Haql",
    "",
    "",
    "Paddington",
    "",
    "",
    "",
    "",
    "",
    "Southport",
    "",
    "Alexandria",
    "",
    SharkUp,
  ],
  [
    "",
    SharkDown,
    "",
    SharkRight,
    "",
    "",
    "",
    "",
    "Durres",
    "",
    "",
    "",
    "",
    "",
    "",
  ],
  [
    "",
    "",
    "",
    "",
    "",
    "",
    "Algiers",
    "",
    "",
    "Hirtshals",
    "",
    SharkLeft,
    "",
    "",
    "",
  ],
  [
    "",
    "",
    "",
    "",
    SharkRight,
    "",
    "",
    "",
    "",
    "",
    "Los Realejos",
    "",
    "",
    "",
    "Keawaula",
  ],
  [
    "",
    "",
    "",
    "",
    "Rio de Janeiro",
    SharkLeft,
    "Bari",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
  ],
  [
    "",
    "",
    SharkUp,
    "",
    "",
    "",
    "",
    "Virginia Beach",
    "",
    "",
    "Guantanamo Bay",
    "Portrane",
    SharkLeft,
    "Schœlcher",
    "",
  ],
  [
    SharkUp,
    "",
    "",
    "",
    "",
    "",
    "Punta Salinas",
    "",
    SharkUp,
    "Cienfuegos",
    SharkRight,
    "",
    "",
    "",
    "",
  ],
  [
    "",
    "",
    "",
    "",
    "Valencia",
    "",
    "Santa Cruz de la Palma",
    "",
    "",
    SharkRight,
    "",
    "",
    "",
    "Casablanca",
    "",
  ],
  [
    "",
    "Duba",
    "",
    "",
    "",
    "",
    "Haramous",
    "Praia",
    "Hermosa Beach",
    "",
    "",
    "",
    "",
    SharkRight,
    "",
  ],
];

const LabelText = (label: string | ReactNode): string => {
  if (typeof label === "string") {
    return label;
  }
  if (React.isValidElement(label) && label.props.alt) {
    return `[${label.props.alt}]`;
  }
  return "";
};

const CopyableTable = (): JSX.Element => (
  <table className={COPY_ONLY_CLASS}>
    <tbody>
      {GRID_CONTENT.map((row, i) => (
        <tr key={i}>
          {row.map((label, j) => (
            <td key={j}>{LabelText(label)}</td>
          ))}
        </tr>
      ))}
    </tbody>
  </table>
);

const Puzzle = (): JSX.Element => {
  return (
    <>
      <OswaldFont />
      <p className="puzzle-flavor">
        A number of our links went down. Can you help fix them?
      </p>
      <HScrollTableWrapper className={NO_COPY_CLASS}>
        <Grid
          labels={LABELS}
          fill={GRID_CONTENT}
          getAdditionalCellFillStyles={() => ({
            fontSize: "8pt",
            fontFamily: "Oswald",
            position: "unset",
          })}
        />
      </HScrollTableWrapper>
      <CopyableTable />
    </>
  );
};

export default Puzzle;
