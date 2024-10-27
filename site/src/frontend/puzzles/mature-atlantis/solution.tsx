import React from "react";
import { styled } from "styled-components";

const HEADERS = ["Order", "Before", "After", "Extraction"];

const ROWS = [
  ["1", "TOP KNOT", "KNOB TAT", "BA"],
  ["2", "SPACE RACE", "RAKE SPICE", "KI"],
  ["3", "KICK LINE", "LINK KING", "NG"],
  ["4", "PANCAKES", "CAR PUKES", "RU"],
  ["5", "SAILBOAT", "BALL SEAT", "LE"],
  ["6", "WEDDING RING", "RENDING WINE", "NE"],
  ["7", "LIGHTSABER", "SIGHS LATER", "ST"],
  ["8", "WOODPECKER", "POOL WICKER", "LI"],
  ["9", "COTTON BOLL", "BOTTOM CELL", "ME"],
];

const HIGHLIGHTS: Array<[number, number]> = [
  [3, 6],
  [2, 7],
  [2, 8],
  [2, 6],
  [2, 7],
  [2, 11],
  [4, 8],
  [3, 6],
  [5, 8],
];

const Bold = styled.span`
  font-weight: 700;
`;

const Mono = styled.span`
  font-family: monospace;
`;

const StyledTh = styled.th`
  font-weight: 700;
`;

const StyledTd = styled.td`
  padding: 0px 8px;
`;

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
              if (k === 0) {
                cellContent = cell;
              } else if (k === 2) {
                const highlights = HIGHLIGHTS[j]!;
                const pre = cell.slice(0, highlights[0]);
                const highlight1 = (
                  <Bold>{cell.slice(highlights[0], highlights[0] + 1)}</Bold>
                );
                const mid = cell.slice(highlights[0] + 1, highlights[1]);
                const highlight2 = (
                  <Bold>{cell.slice(highlights[1], highlights[1] + 1)}</Bold>
                );
                const post = cell.slice(highlights[1] + 1);
                cellContent = (
                  <Mono>
                    {pre}
                    {highlight1}
                    {mid}
                    {highlight2}
                    {post}
                  </Mono>
                );
              } else {
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
        Each of the “before” pictures shows a compound word or common two-word
        phrase; these are hopefully mostly identifiable.
      </p>
      <p>
        The “after” pictures take one of the initial phrases but the words have
        been spoonerized (i.e. the starting sounds have been swapped), and
        additionally one letter has been changed in each word, forming a more
        unusual combination. These are presented in alphabetical order as a
        solving aid.
      </p>
      <p>
        After matching each “after” picture to a “before” picture, the
        extraction is the newly changed letters, in the numbered order (the
        order of the “before” picture list).
      </p>
      <Table headers={HEADERS} rows={ROWS} />
      <p>
        The changed letters extract to <Mono>BAKING RULE: NEST LIME</Mono>.
      </p>
      <p>
        This looks like an odd “after” answer! Solvers must then undo the
        transformation, spoonerizing the two pairs of words and changing one
        letter in each to get <Mono>RAGING BULL LAST NAME</Mono>, which is a
        clue to the final answer:{" "}
        <Mono>
          <Bold>LAMOTTA</Bold>
        </Mono>
        .
      </p>
      <p>
        Note that the puzzle title is also a representative transformation and
        hint: {<Mono>CONCH FROCKING</Mono>} {`->`} {<Mono>FRENCH COOKING</Mono>}{" "}
        (i.e. Mastering the Art of French Cooking, by Julia Child).
      </p>
    </>
  );
};

export default Solution;
