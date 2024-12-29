import React from "react";
import { styled } from "styled-components";
import {
  HScrollTableWrapper,
  Mono,
  PuzzleAnswer,
} from "../../components/StyledUI";

const HEADERS = ["Order", "Before", "After", "Extraction"];

type Row = {
  order: string;
  before: string;
  after: string;
  extraction: string;
  highlights: [number, number];
};

const ROWS: Row[] = [
  {
    order: "1",
    before: "TOP KNOT",
    after: "KNOB TAT",
    extraction: "BA",
    highlights: [3, 6],
  },
  {
    order: "2",
    before: "SPACE RACE",
    after: "RAKE SPICE",
    extraction: "KI",
    highlights: [2, 7],
  },
  {
    order: "3",
    before: "KICK LINE",
    after: "LINK KING",
    extraction: "NG",
    highlights: [2, 8],
  },
  {
    order: "4",
    before: "PANCAKES",
    after: "CAR PUKES",
    extraction: "RU",
    highlights: [2, 6],
  },
  {
    order: "5",
    before: "SAILBOAT",
    after: "BALL SEAT",
    extraction: "LE",
    highlights: [2, 7],
  },
  {
    order: "6",
    before: "WEDDING RING",
    after: "RENDING WINE",
    extraction: "NE",
    highlights: [2, 11],
  },
  {
    order: "7",
    before: "LIGHTSABER",
    after: "SIGHS LATER",
    extraction: "ST",
    highlights: [4, 8],
  },
  {
    order: "8",
    before: "WOODPECKER",
    after: "POOL WICKER",
    extraction: "LI",
    highlights: [3, 6],
  },
  {
    order: "9",
    before: "COTTON BOLL",
    after: "BOTTOM CELL",
    extraction: "ME",
    highlights: [5, 8],
  },
];

const StyledTd = styled.td`
  padding: 0px 8px;
`;

const Table = ({
  headers,
  rows,
}: {
  headers: string[];
  rows: Row[];
}): JSX.Element => {
  return (
    <table>
      <thead>
        <tr>
          {headers.map((header, i) => (
            <th key={`header-cell-${i}`}>{header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, j) => {
          const { order, before, after, extraction, highlights } = row;
          const pre = after.slice(0, highlights[0]);
          const highlight1 = (
            <strong>{after.slice(highlights[0], highlights[0] + 1)}</strong>
          );
          const mid = after.slice(highlights[0] + 1, highlights[1]);
          const highlight2 = (
            <strong>{after.slice(highlights[1], highlights[1] + 1)}</strong>
          );
          const post = after.slice(highlights[1] + 1);
          const afterCell = (
            <Mono>
              {pre}
              {highlight1}
              {mid}
              {highlight2}
              {post}
            </Mono>
          );
          return (
            <tr key={`table-row-${j}`}>
              <StyledTd key={`table-row-${j}-order`}>{order}</StyledTd>
              <StyledTd key={`table-row-${j}-order`}>
                <Mono>{before}</Mono>
              </StyledTd>
              <StyledTd key={`table-row-${j}-order`}>
                <Mono>{afterCell}</Mono>
              </StyledTd>
              <StyledTd key={`table-row-${j}-order`}>
                <Mono>{extraction}</Mono>
              </StyledTd>
            </tr>
          );
        })}
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
      <HScrollTableWrapper>
        <Table headers={HEADERS} rows={ROWS} />
      </HScrollTableWrapper>
      <p>
        The changed letters extract to <Mono>BAKING RULE: NEST LIME</Mono>.
      </p>
      <p>
        This looks like an odd “after” answer! Solvers must then undo the
        transformation, spoonerizing the two pairs of words and changing one
        letter in each to get <Mono>RAGING BULL LAST NAME</Mono>, which is a
        clue to the final answer: <PuzzleAnswer>LAMOTTA</PuzzleAnswer>.
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
