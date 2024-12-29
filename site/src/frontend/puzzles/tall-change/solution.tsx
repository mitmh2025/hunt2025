import React from "react";
import { styled } from "styled-components";
import LinkedImage from "../../components/LinkedImage";
import look01 from "./assets/look01.jpg";
import look02 from "./assets/look02.jpg";
import look03 from "./assets/look03.jpg";
import look04 from "./assets/look04.jpg";
import look05 from "./assets/look05.jpg";
import look06 from "./assets/look06.jpg";
import look07 from "./assets/look07.jpg";
import look08 from "./assets/look08.jpg";
import look09 from "./assets/look09.jpg";
import look10 from "./assets/look10.jpg";
import look11 from "./assets/look11.jpg";
import look12 from "./assets/look12.jpg";
import look13 from "./assets/look13.jpg";
import look14 from "./assets/look14.jpg";
import look15 from "./assets/look15.jpg";
import theme01 from "./assets/theme01.png";
import theme02 from "./assets/theme02.png";
import theme03 from "./assets/theme03.png";
import theme04 from "./assets/theme04.png";
import theme05 from "./assets/theme05.png";
import theme06 from "./assets/theme06.png";
import theme07 from "./assets/theme07.png";

const GarmentTable = styled.table`
  border-collapse: collapse;
  margin: 20px auto;
`;

const TableCell = styled.td<{ highlight: "red" | "black" | null }>`
  width: 40px;
  height: 40px;
  text-align: center;
  vertical-align: middle;
  border: 1px solid #000;
  background-color: ${({ highlight }) =>
    highlight === "red"
      ? "#FFCCCB"
      : highlight === "black"
        ? "black"
        : "white"};
  color: ${({ highlight }) => (highlight === "black" ? "white" : "inherit")};

  &:nth-child(even):not(:nth-child(14)) {
    border-right: 8px solid #000;
  }
`;

const SummaryTableCell = styled.td`
  border: 2px solid grey;
  padding: 12px;
`;
const SummaryTableHeaderCell = styled.td`
  font-weight: bold;
  border: 2px solid grey;
  padding: 12px;
`;

type HighlightedCells = Record<string, "red" | "black" | null>;
type LetterCells = Record<string, string>;
type TableCellData = {
  row: number;
  col: number;
  highlight: "red" | "black" | null;
  letter: string | null;
};

const Solution = () => {
  const highlightedCells: HighlightedCells = {
    "4,0": "black",
    "8,0": "red",
    "6,2": "black",
    "5,4": "black",
    "7,4": "black",
    "0,5": "red",
    "6,5": "black",
    "1,7": "red",
    "6,7": "black",
    "7,7": "red",
    "1,9": "red",
    "4,9": "black",
    "7,9": "red",
    "1,11": "red",
    "0,12": "red",
    "1,12": "red",
    "4,12": "black",
    "2,13": "red",
    "7,13": "black",
    "2,14": "red",
  };

  const letterCells: LetterCells = {
    "0,0": "T",
    "1,0": "H",
    "2,0": "O",
    "3,0": "M",
    "5,0": "B",
    "6,0": "R",
    "7,0": "O",
    "8,0": "W",
    "9,0": "N",
    "10,0": "E",
    "0,1": "B",
    "1,1": "U",
    "2,1": "R",
    "3,1": "B",
    "4,1": "E",
    "5,1": "R",
    "6,1": "R",
    "7,1": "Y",
    "0,2": "M",
    "1,2": "A",
    "2,2": "I",
    "3,2": "S",
    "4,2": "O",
    "5,2": "N",
    "7,2": "M",
    "8,2": "A",
    "9,2": "R",
    "10,2": "G",
    "11,2": "I",
    "12,2": "E",
    "13,2": "L",
    "14,2": "A",
    "0,3": "V",
    "1,3": "E",
    "2,3": "R",
    "3,3": "S",
    "4,3": "A",
    "5,3": "C",
    "6,3": "E",
    "0,4": "D",
    "1,4": "O",
    "2,4": "L",
    "3,4": "C",
    "4,4": "E",
    "6,4": "&",
    "8,4": "G",
    "9,4": "A",
    "10,4": "B",
    "11,4": "B",
    "12,4": "A",
    "13,4": "N",
    "14,4": "A",
    "0,5": "H",
    "1,5": "A",
    "2,5": "I",
    "3,5": "D",
    "4,5": "E",
    "5,5": "R",
    "7,5": "A",
    "8,5": "C",
    "9,5": "K",
    "10,5": "E",
    "11,5": "R",
    "12,5": "M",
    "13,5": "A",
    "14,5": "N",
    "0,6": "V",
    "1,6": "E",
    "2,6": "R",
    "3,6": "S",
    "4,6": "A",
    "5,6": "C",
    "6,6": "E",
    "0,7": "R",
    "1,7": "O",
    "2,7": "B",
    "3,7": "E",
    "4,7": "R",
    "5,7": "T",
    "7,7": "W",
    "8,7": "U",
    "9,7": "N",
    "0,8": "B",
    "1,8": "A",
    "2,8": "L",
    "3,8": "M",
    "4,8": "A",
    "5,8": "I",
    "6,8": "N",
    "0,9": "T",
    "1,9": "O",
    "2,9": "R",
    "3,9": "Y",
    "5,9": "B",
    "6,9": "U",
    "7,9": "R",
    "8,9": "C",
    "9,9": "H",
    "0,10": "G",
    "1,10": "I",
    "2,10": "V",
    "3,10": "E",
    "4,10": "N",
    "5,10": "C",
    "6,10": "H",
    "7,10": "Y",
    "0,11": "V",
    "1,11": "E",
    "2,11": "R",
    "3,11": "S",
    "4,11": "A",
    "5,11": "C",
    "6,11": "E",
    "0,12": "T",
    "1,12": "H",
    "2,12": "O",
    "3,12": "M",
    "5,12": "B",
    "6,12": "R",
    "7,12": "O",
    "8,12": "W",
    "9,12": "N",
    "10,12": "E",
    "0,13": "B",
    "1,13": "R",
    "2,13": "A",
    "3,13": "N",
    "4,13": "D",
    "5,13": "O",
    "6,13": "N",
    "8,13": "M",
    "9,13": "A",
    "10,13": "X",
    "11,13": "W",
    "12,13": "E",
    "13,13": "L",
    "14,13": "L",
    "0,14": "A",
    "1,14": "L",
    "2,14": "T",
    "3,14": "U",
    "4,14": "Z",
    "5,14": "A",
    "6,14": "R",
    "7,14": "R",
    "8,14": "A",
  };

  const generateTableData = (
    rows: number,
    columns: number,
    highlightedCells: HighlightedCells,
    letterCells: LetterCells,
  ): TableCellData[][] => {
    return Array.from({ length: rows }, (_, rowIndex) =>
      Array.from({ length: columns }, (_, colIndex) => ({
        row: rowIndex,
        col: colIndex,
        highlight: highlightedCells[`${rowIndex},${colIndex}`] ?? null,
        letter: letterCells[`${rowIndex},${colIndex}`] ?? null,
      })),
    );
  };

  const tableData = generateTableData(15, 15, highlightedCells, letterCells);

  return (
    <>
      <p>
        You’re shown a bunch of dresses. The puzzle title “Mitropolitan House of
        Fashion” should clue that the puzzlers should identify the house of
        fashion that made each dress.
      </p>
      <p>
        Below the dresses are some garment bags with spaces for letters. The
        garment bags are grouped, with symbols above the groups. The symbols
        should clue Met gala themes from 2024 to 2017 (see above).{" "}
      </p>
      <p>
        The icons along with the number of blanks will unambiguously indicate
        where the designers fit in the grid. All the information about the
        outfits, the designers, and which MET gala it was worn to is shown in
        the table at the bottom of this solution.{" "}
      </p>
      <p>
        After entering everything into the garment bags, the puzzler should see
        this:{" "}
        <GarmentTable>
          <tbody>
            {tableData.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {row.map((cell, colIndex) => (
                  <TableCell key={colIndex} highlight={cell.highlight}>
                    {cell.letter}
                  </TableCell>
                ))}
              </tr>
            ))}
          </tbody>
        </GarmentTable>
      </p>

      <p>
        Reading the highlighted letters in column-then-row order, you get the
        clue phrase “WHO WORE THAT”.{" "}
      </p>
      <p>
        This clues that you should use the names of the celebrity that wore the
        outfit. Reading the first letters of the celebrity names in the order
        given by the garment bags, you get the phrase WORK IT AT OUR GALA.
      </p>
      <p>
        After going to the gala and suitably working it, puzzlers were given the
        answer <strong>SERENDIP SANCTUARY</strong>.
      </p>
      <h3>Summary Diagram</h3>
      <p>
        (given in a garment bag order){" "}
        <table>
          <th>
            <tr>
              <SummaryTableHeaderCell>Look</SummaryTableHeaderCell>
              <SummaryTableHeaderCell>Theme Icon</SummaryTableHeaderCell>
              <SummaryTableHeaderCell>
                Theme name and date
              </SummaryTableHeaderCell>
              <SummaryTableHeaderCell>Designer</SummaryTableHeaderCell>
              <SummaryTableHeaderCell>Celebrity</SummaryTableHeaderCell>
            </tr>
          </th>
          <tbody>
            <tr>
              <SummaryTableCell>
                <LinkedImage src={look01} alt="a dress"></LinkedImage>
              </SummaryTableCell>
              <SummaryTableCell>
                <LinkedImage src={theme01} alt="a dress"></LinkedImage>
              </SummaryTableCell>
              <SummaryTableCell>
                Rei Kawakubo/Comme des Garçons: Art of the In-Between 2017
              </SummaryTableCell>
              <SummaryTableCell>Thom Browne</SummaryTableCell>
              <SummaryTableCell>Wiz Khalifa</SummaryTableCell>
            </tr>
            <tr>
              <SummaryTableCell>
                <LinkedImage src={look02} alt="a dress"></LinkedImage>
              </SummaryTableCell>
              <SummaryTableCell>
                <LinkedImage src={theme01} alt="a dress"></LinkedImage>
              </SummaryTableCell>
              <SummaryTableCell>
                Rei Kawakubo/Comme des Garçons: Art of the In-Between 2017
              </SummaryTableCell>
              <SummaryTableCell>Burberry</SummaryTableCell>
              <SummaryTableCell>Olivia Cooke</SummaryTableCell>
            </tr>
            <tr>
              <SummaryTableCell>
                <LinkedImage src={look03} alt="a dress"></LinkedImage>
              </SummaryTableCell>
              <SummaryTableCell>
                <LinkedImage src={theme02} alt="a dress"></LinkedImage>
              </SummaryTableCell>
              <SummaryTableCell>
                Heavenly Bodies: Fashion and the Catholic Imagination 2018
              </SummaryTableCell>
              <SummaryTableCell>Maison Margiela</SummaryTableCell>
              <SummaryTableCell>Rihanna</SummaryTableCell>
            </tr>
            <tr>
              <SummaryTableCell>
                <LinkedImage src={look04} alt="a dress"></LinkedImage>
              </SummaryTableCell>
              <SummaryTableCell>
                <LinkedImage src={theme02} alt="a dress"></LinkedImage>
              </SummaryTableCell>
              <SummaryTableCell>
                Heavenly Bodies: Fashion and the Catholic Imagination 2018
              </SummaryTableCell>
              <SummaryTableCell>Versace</SummaryTableCell>
              <SummaryTableCell>Kim Kardashian</SummaryTableCell>
            </tr>
            <tr>
              <SummaryTableCell>
                <LinkedImage src={look05} alt="a dress"></LinkedImage>
              </SummaryTableCell>
              <SummaryTableCell>
                <LinkedImage src={theme03} alt="a dress"></LinkedImage>
              </SummaryTableCell>
              <SummaryTableCell>
                In America: A Lexicon of Fashion 2021
              </SummaryTableCell>
              <SummaryTableCell>Dolce & Gabbana</SummaryTableCell>
              <SummaryTableCell>Iman</SummaryTableCell>
            </tr>
            <tr>
              <SummaryTableCell>
                <LinkedImage src={look06} alt="a dress"></LinkedImage>
              </SummaryTableCell>
              <SummaryTableCell>
                <LinkedImage src={theme03} alt="a dress"></LinkedImage>
              </SummaryTableCell>
              <SummaryTableCell>
                In America: A Lexicon of Fashion 2021
              </SummaryTableCell>
              <SummaryTableCell>Haider Ackermann</SummaryTableCell>
              <SummaryTableCell>Timothee Chalamet</SummaryTableCell>
            </tr>
            <tr>
              <SummaryTableCell>
                <LinkedImage src={look07} alt="a dress"></LinkedImage>
              </SummaryTableCell>
              <SummaryTableCell>
                <LinkedImage src={theme04} alt="a dress"></LinkedImage>
              </SummaryTableCell>
              <SummaryTableCell>
                Karl Lagerfeld: A Line of Beauty 2023
              </SummaryTableCell>
              <SummaryTableCell>Versace</SummaryTableCell>
              <SummaryTableCell>Anne Hathaway</SummaryTableCell>
            </tr>
            <tr>
              <SummaryTableCell>
                <LinkedImage src={look08} alt="a dress"></LinkedImage>
              </SummaryTableCell>
              <SummaryTableCell>
                <LinkedImage src={theme04} alt="a dress"></LinkedImage>
              </SummaryTableCell>
              <SummaryTableCell>
                Karl Lagerfeld: A Line of Beauty 2023
              </SummaryTableCell>
              <SummaryTableCell>Robert Wun</SummaryTableCell>
              <SummaryTableCell>Tems</SummaryTableCell>
            </tr>
            <tr>
              <SummaryTableCell>
                <LinkedImage src={look09} alt="a dress"></LinkedImage>
              </SummaryTableCell>
              <SummaryTableCell>
                <LinkedImage src={theme05} alt="a dress"></LinkedImage>
              </SummaryTableCell>
              <SummaryTableCell>
                Sleeping Beauties: Reawakening Fashion 2024
              </SummaryTableCell>
              <SummaryTableCell>Balmain</SummaryTableCell>
              <SummaryTableCell>Olivier Rousteing</SummaryTableCell>
            </tr>
            <tr>
              <SummaryTableCell>
                <LinkedImage src={look10} alt="a dress"></LinkedImage>
              </SummaryTableCell>
              <SummaryTableCell>
                <LinkedImage src={theme05} alt="a dress"></LinkedImage>
              </SummaryTableCell>
              <SummaryTableCell>
                Sleeping Beauties: Reawakening Fashion 2024
              </SummaryTableCell>
              <SummaryTableCell>Tory Burch</SummaryTableCell>
              <SummaryTableCell>Uma Thurman</SummaryTableCell>
            </tr>
            <tr>
              <SummaryTableCell>
                <LinkedImage src={look11} alt="a dress"></LinkedImage>
              </SummaryTableCell>
              <SummaryTableCell>
                <LinkedImage src={theme06} alt="a dress"></LinkedImage>
              </SummaryTableCell>
              <SummaryTableCell>
                In America: An Anthology of Fashion 2022
              </SummaryTableCell>
              <SummaryTableCell>Givenchy</SummaryTableCell>
              <SummaryTableCell>Rosalia</SummaryTableCell>
            </tr>
            <tr>
              <SummaryTableCell>
                <LinkedImage src={look12} alt="a dress"></LinkedImage>
              </SummaryTableCell>
              <SummaryTableCell>
                <LinkedImage src={theme06} alt="a dress"></LinkedImage>
              </SummaryTableCell>
              <SummaryTableCell>
                In America: An Anthology of fashion 2022
              </SummaryTableCell>
              <SummaryTableCell>Versace</SummaryTableCell>
              <SummaryTableCell>Gigi Hadid</SummaryTableCell>
            </tr>
            <tr>
              <SummaryTableCell>
                <LinkedImage src={look13} alt="a dress"></LinkedImage>
              </SummaryTableCell>
              <SummaryTableCell>
                <LinkedImage src={theme07} alt="a dress"></LinkedImage>
              </SummaryTableCell>
              <SummaryTableCell>Camp: Notes on Fashion 2019</SummaryTableCell>
              <SummaryTableCell>Thom Browne</SummaryTableCell>
              <SummaryTableCell>Amy Fine Collins</SummaryTableCell>
            </tr>
            <tr>
              <SummaryTableCell>
                <LinkedImage src={look14} alt="a dress"></LinkedImage>
              </SummaryTableCell>
              <SummaryTableCell>
                <LinkedImage src={theme07} alt="a dress"></LinkedImage>
              </SummaryTableCell>
              <SummaryTableCell>Camp: Notes on Fashion 2019</SummaryTableCell>
              <SummaryTableCell>Brandon Maxwell</SummaryTableCell>
              <SummaryTableCell>Lady Gaga</SummaryTableCell>
            </tr>
            <tr>
              <SummaryTableCell>
                <LinkedImage src={look15} alt="a dress"></LinkedImage>
              </SummaryTableCell>
              <SummaryTableCell>
                <LinkedImage src={theme07} alt="a dress"></LinkedImage>
              </SummaryTableCell>
              <SummaryTableCell>Camp: Notes on Fashion 2019</SummaryTableCell>
              <SummaryTableCell>Altuzarra</SummaryTableCell>
              <SummaryTableCell>Awkwafina</SummaryTableCell>
            </tr>
          </tbody>
        </table>
      </p>
    </>
  );
};

export default Solution;
