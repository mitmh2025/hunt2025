import React from "react";
import { styled } from "styled-components";
import img15 from "./assets/img15.png";
import img16 from "./assets/img16.png";
import img17 from "./assets/img17.png";
import img18 from "./assets/img18.png";
import img19 from "./assets/img19.png";
import img20 from "./assets/img20.png";
import img21 from "./assets/img21.png";
import img22 from "./assets/img22.png";
import img23 from "./assets/img23.png";
import img24 from "./assets/img24.png";
import img25 from "./assets/img25.png";
import img26 from "./assets/img26.png";
import img27 from "./assets/img27.png";
import img28 from "./assets/img28.png";

const FlexWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
`;

const Mono = styled.span`
  font-family: monospace;
`;

const Bold = styled.span`
  font-weight: 700;
`;

const StyledTh = styled.th`
  font-weight: 700;
`;

const StyledTd = styled.td`
  padding: 0px 8px;
`;

const HEADERS = [
  "Original Order",
  "Clue",
  "Answer",
  "Entry Length",
  "Index",
  "Record Order",
  "Extraction",
];

const ROWS = [
  ["4", "Farewell, casually", "BYE BYE BYE", "9", "7", "1", "B"],
  [
    "7",
    "Turn signal, for example",
    "INDICATOR INDICATOR",
    "18",
    "13",
    "2",
    "I",
  ],
  ["6", "Young women", "GIRLS GIRLS GIRLS", "15", "14", "3", "L"],
  ["13", "Hole to get water", "WELL WELL WELL", "12", "12", "4", "L"],
  ["10", "Vows", "PROMISES PROMISES", "16", "14", "5", "S"],
  [
    "2",
    "1988 Tim Burton movie title",
    "BEETLEJUICE BEETLEJUICE BEETLEJUICE",
    "33",
    "29",
    "6",
    "J",
  ],
  [
    "3",
    "Often confused with bison",
    "BUFFALO BUFFALO BUFFALO BUFFALO BUFFALO BUFFALO BUFFALO BUFFALO",
    "56",
    "51",
    "7",
    "U",
  ],
  ["9", "Red juice in a snowman-shaped bottle", "POM POM", "6", "6", "8", "M"],
  ["11", "Swing a club on the green", "PUTT PUTT", "8", "5", "9", "P"],
  ["5", "Roman L", "FIFTY FIFTY", "10", "7", "10", "I"],
  [
    "1",
    "At a walking pace, musically",
    "ANDANTE ANDANTE",
    "14",
    "9",
    "11",
    "N",
  ],
  ["8", "You are here", "LOCATION LOCATION LOCATION", "24", "24", "12", "N"],
  ["12", "Partner (abbr.)", "SO SO", "4", "4", "13", "O"],
];

const Table = ({
  headers,
  rows,
}: {
  headers: string[];
  rows: string[][];
}): JSX.Element => {
  return (
    <table>
      <thead>
        <tr>
          {headers.map((header, i) => (
            <StyledTh key={`header-cell-${i}`}>{header}</StyledTh>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, j) => (
          <tr key={`table-row-${j}`}>
            {row.map((cell, k) => {
              let cellContent: string | JSX.Element = cell;
              if (k === 2 || k === 6) {
                cellContent = <Mono>{cell}</Mono>;
              }
              return (
                <StyledTd key={`table-row-${j}-cell-${k}`}>
                  {cellContent}
                </StyledTd>
              );
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

const Solution = () => {
  return (
    <>
      <p>
        This is a reduplication puzzle. All of the clues hint at a single word
        that can be duplicated some number of times to form a phrase (such as a
        common expression, a song title, a scientific species name, or in one
        case a grammatically correct sentence that is an interesting linguistic
        oddity). Each phrase of reduplicated words will fit uniquely into the
        spiraling set of blanks on exactly one of the records, and the yellow
        square will highlight the letter to be extracted when the phrase is
        entered starting from the leftmost square (always moving outside in and
        counterclockwise, as it would be read if the record was on a record
        player). The clues are given in alpha order by answer and the order of
        the pictures of records is the extraction order.
      </p>
      <p>
        The extracted letters spell out <Mono>BILLS JUMPIN NO</Mono>, each of
        which can be reduplicated to form the name of a Destiny’s Child song
        that fits the entry slots of the final record, leading to an answer of{" "}
        <Mono>
          <Bold>DESTINYS CHILD</Bold>
        </Mono>
        .
      </p>
      <Table headers={HEADERS} rows={ROWS} />
      <FlexWrapper>
        <a href={img15} target="_blank" rel="noreferrer">
          <img src={img15} />
        </a>
        <a href={img16} target="_blank" rel="noreferrer">
          <img src={img16} />
        </a>
        <a href={img17} target="_blank" rel="noreferrer">
          <img src={img17} />
        </a>
        <a href={img18} target="_blank" rel="noreferrer">
          <img src={img18} />
        </a>
        <a href={img19} target="_blank" rel="noreferrer">
          <img src={img19} />
        </a>
        <a href={img20} target="_blank" rel="noreferrer">
          <img src={img20} />
        </a>
        <a href={img21} target="_blank" rel="noreferrer">
          <img src={img21} />
        </a>
        <a href={img22} target="_blank" rel="noreferrer">
          <img src={img22} />
        </a>
        <a href={img23} target="_blank" rel="noreferrer">
          <img src={img23} />
        </a>
        <a href={img24} target="_blank" rel="noreferrer">
          <img src={img24} />
        </a>
        <a href={img25} target="_blank" rel="noreferrer">
          <img src={img25} />
        </a>
        <a href={img26} target="_blank" rel="noreferrer">
          <img src={img26} />
        </a>
        <a href={img27} target="_blank" rel="noreferrer">
          <img src={img27} />
        </a>
        <a href={img28} target="_blank" rel="noreferrer">
          <img src={img28} />
        </a>
      </FlexWrapper>
    </>
  );
};

export default Solution;
