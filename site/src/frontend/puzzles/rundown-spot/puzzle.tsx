import React from "react";
import { styled } from "styled-components";
import {
  COPY_ONLY_CLASS,
  NO_COPY_CLASS,
} from "../../components/CopyToClipboard";
import LinkedImage from "../../components/LinkedImage";
import wheelHi from "./assets/wheel_hi.png";

const SizedImage = styled(LinkedImage)`
  width: 624px;
  height: 624px;
`;

const DROPQUOTE_LETTERS = `HADAADEDKADPNEAAECBEEACABOAHADHAEEEEE
 BFNOEHRLEEROIRDLIEEIEHHCRSLCHHIHNOGG
 CMRRIRSLRKYPJVONNENLGNTOTSOSLOSONRSL
 EUYROWUNSWYTMYUORURYNOTRTSSWRRUOORXP
⬇️
⚁
 
 
⚀
⬆️`
  .split("\n")
  .map((line) => line.split(""));

const FIRST_COLUMN_COLORS = [
  "#00ff00",
  "#00ff00",
  "#00ff00",
  "#00ff00",
  "#ffffff",
  "#ffffff",
  "#ff0000",
  "#000000",
  "#ffffff",
  "#ffffff",
];

const ColorCell = styled.td`
  background-color: ${(props) => props.color};
  color: black;
  text-align: center;
`;

const DropquoteTable = () => {
  return (
    <table className={COPY_ONLY_CLASS}>
      <tbody>
        {DROPQUOTE_LETTERS.map((row, i) => (
          <tr key={i}>
            <ColorCell color={FIRST_COLUMN_COLORS[i]}>{row[0]}</ColorCell>
            {row.slice(1).map((letter, j) => (
              <ColorCell key={j} color="#ffffff">
                {letter}
              </ColorCell>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

const Puzzle = () => {
  return (
    <>
      <p className="puzzle-flavor">Is this 1:1? There’s an outside chance.</p>
      <SizedImage
        className={NO_COPY_CLASS}
        alt="A wheel with letters, colors, and symbols"
        src={wheelHi}
      />
      <DropquoteTable />
    </>
  );
};

export default Puzzle;
