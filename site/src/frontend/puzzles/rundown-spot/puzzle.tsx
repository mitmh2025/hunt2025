import React from "react";
import { styled } from "styled-components";
import { COPY_ONLY_CLASS } from "../../components/CopyToClipboard";
import Dropquote from "../../components/Dropquote";
import LinkedImage from "../../components/LinkedImage";
import wheelHi from "./assets/wheel_hi.png";

const SizedImage = styled(LinkedImage)`
  width: 624px;
  height: 624px;
`;

const Letterbanks: string[] = [
  "H",
  "ABCO",
  "CDFM",
  "AINR",
  "ANOR",
  "ADIO",
  "ELRW",
  "DIRS",
  "IKLN",
  "AORS",
  "DEKT",
  "RSYY",
  "OOPT",
  "IMSS",
  "AEPY",
  "CDEO",
  "ANOT",
  "HILR",
  "ENTU",
  "ENRS",
  "OTYY",
  "EGNR",
  "BHNO",
  "AAHT",
  "ELNO",
  "ORRT",
  "RRSS",
  "HOSU",
  "LSTW",
  "DHMR",
  "HNOR",
  "AISU",
  "AEOU",
  "FNNO",
  "ENRT",
  "GISX",
  "GGNP",
];

const firstColumn = ["⬇️", "⚁", "", "", "⚀", "⬆️"];

const Puzzle = () => {
  return (
    <>
      <p className="puzzle-flavor">Is this 1:1? There’s an outside chance.</p>
      <SizedImage
        alt="A wheel with letters, colors, and symbols"
        src={wheelHi}
      />
      <br className={COPY_ONLY_CLASS} />
      <Dropquote
        className={COPY_ONLY_CLASS}
        letterbanks={Letterbanks.map((s) => s.split(""))}
        labels={Array(6)
          .fill(undefined)
          .map(() => Array(Letterbanks.length).fill(""))}
        fill={Array(6)
          .fill(undefined)
          .map((_, i) => [
            firstColumn[i],
            ...Array(Letterbanks.length - 1).fill(""),
          ])}
        getAdditionalCellStyles={({ row, column }) => {
          if (column === 0) {
            switch (row) {
              case 0:
                return { backgroundColor: "#0f0" };
              case 3:
                return { backgroundColor: "#f00" };
              case 4:
                return { backgroundColor: "#000" };
            }
          }

          return {};
        }}
      />
    </>
  );
};

export default Puzzle;
