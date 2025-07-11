import React from "react";
import { styled } from "styled-components";
import Blanks from "../../components/Blanks";

export const GRID = `FILZUPTDCRBWDUACNDI
YNCOLFTZWHILQWHERAM
KJRRISWAUDGOEBOCRVO
ZEQWOBPQYDFAPXGNIHH
ONSDMWAJLZVCJIDPORE
KZCPKQHZOECMJFBMXEY
RYEFRCWMRDSBOJMIHOF
SRNQIFDTFWPETUFANTH
WLSXRXOKAJRHNZFCIGE
SSWDECJNZIVADNKLDER
VUUNDHBYDWTWHEMYFQU
ZHAGPSXKGJNKWACMZDX
ARUORKUFVMZKRGNJABK
CFSTNCEUPKQTQLMVPEB
VZDGSACSTCIVISBICLL
NPTGDIRFKNWFZARBSAQ
TUSOBLWHCXLCLISNNGX
YSCFAOLXQYOYFIFXFNW
GJSZGLWORRAPSEJNAIU
MUYDGFFTRERBWHGSUTW
VAVCHNSKXHVIFWHASHN
QORJZAILASDBCNMZHGS
DYTYSSRLGKZKXILFDIE
UBIJQIVRRCYTUEHQGNS
THZDUQBPPALRITIIZDC
NANEZRAWGJTTAWZEADH
TZNXICOIEODSONEXKOI
QUTIYTSBKUPRIJAXOML
YLBHJHWSIRZCONCCRBC
EVPWHUPVFNBSTIOCFCR
SMREZFMFYEFJMVIVHDK
SAODIXWHLCWKVCZXKGH`
  .split("\n")
  .map((row) => row.split(""));

const BLANKS: string[][] = [
  ["_", "_", "_", "_", "_", "_"],
  ["_", "_", "_", "_", "_", "_", "_", "_", "_", "_", "_"],
  ["_", "_", "_", "_", "_", "_", "_"],
  ["_", "_", "_", "_", "_"],
  ["_", "_", "_", "_"],
  ["_", "_", "_", "_", "_"],
  ["_", "_", "_", "_"],
  ["_", "_", "_", "_", "_", "_", "_", "_"],
  ["_", "_", "_", "_"],
  ["_", "_", "_", "_", "_", "_", "_"],
  ["_", "_", "_", "_"],
  ["_", "_", "_", "_", "_", "_"],
  ["_", "_", "_", "_", "_", "_", "_", "_", "_", "_", "_"],
  ["_", "_", "_", "_", "_"],
  ["_", "_", "_", "_", "_"],
  ["_", "_", "_", "_", "_", "_"],
  ["_", "_", "_", "_", "_", "_", "_", "_", "_"],
  ["_", "_", "_", "_", "_", "_", "_"],
  ["_", "_", "_", "_", "_", "_", "_", "_"],
  ["_", "_", "_", "_"],
  ["_", "_", "_", "_", "_"],
  ["_", "_", "_", "_", "_", "_"],
  ["_", "_", "_", "_"],
  ["_", "_", "_", "_", "_", "_"],
];

export const WordSearch = styled.table`
  border-collapse: collapse;
  table-layout: fixed;
  margin-bottom: 1em;
  font-family: "Roboto Mono", monospace;
  td {
    width: 1.5em;
    text-align: center;
  }
`;

const Puzzle = (): JSX.Element => {
  return (
    <>
      <p className="puzzle-flavor">
        We can’t seem to keep our Donalds in a row.
      </p>
      <WordSearch>
        {GRID.map((row, i) => (
          <tr key={`row-${i}`}>
            {row.map((cell, j) => (
              <td key={`cell-${i}-${j}`}>{cell}</td>
            ))}
          </tr>
        ))}
      </WordSearch>
      {BLANKS.map((row, i) => (
        <Blanks key={`blanks-${i}`} structure={row} />
      ))}
    </>
  );
};

export default Puzzle;
