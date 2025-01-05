import React from "react";
import { styled } from "styled-components";
import { Mono, PuzzleAnswer } from "../../components/StyledUI";

const BOOK_DATA = [
  ["Drawing in Perspective", 5, 6, 1, "IND"],
  ["Great Expectations", 3, 7, 4, "EXA"],
  ["The Men Who Stare at Goats", 6, 10, 7, "NSW"],
  ["A Streetcar Named Desire", 5, 4, 2, "ERS"],
];

const AUDIOBOOK_DATA = [
  ["BROADCAST NEWS", "WILLIAM HURT", "HEARTS IN ATLANTIS", 4, 5, 3, "ADO"],
  ["SPARE PARTS", "JAMIE LEE CURTIS", "LITTLE WOMEN", 6, 9, 7, "PTA"],
  ["BRAZIL", "JONATHAN PRYCE", "OLIVER TWIST", 1, 3, 1, "BAB"],
  [
    "VOYAGERS",
    "COLIN FARRELL",
    "A PORTRAIT OF THE ARTIST AS A YOUNG MAN",
    3,
    1,
    2,
    "YVO",
  ],
  ["LIFEFORCE", "PETER FIRTH", "TESS OF THE D’URBERVILLES", 2, 8, 4, "ICE"],
];

const StyledTable = styled.table`
  margin: 1em 0;
  border-spacing: 8px 0;
`;

export default function Solution(): JSX.Element {
  return (
    <>
      <p>This puzzle is about audiobooks.</p>
      <p>
        The first clue is the Morse code that plays when you interact with the
        telephone. Morse code is meant to be heard (rather than read), similar
        to an audiobook. When you translate the Morse code you get{" "}
        <Mono>ROW COLUMN RAINBOW</Mono>.
      </p>
      <p>
        Solvers have not yet used the fact that the books are rainbow ROYGBIV
        colors yet; this is the third index. Thus the extraction should be (Row,
        Column, Rainbow) where “rainbow” is Red=1, Orange=2, Yellow=3, etc.
      </p>
      <p>
        The next clue is in the bottom right of the library with the horizontal
        books. They still read <Mono>INDEX ANSWERS</Mono> using the first
        letters. This clue still applies.
      </p>
      <p>
        The next clue is the four highlighted books. There are four books but
        five answers, indicating those books shouldn’t be paired with answers.
        You can use the Morse code index (of Row, Column, Rainbow) on the
        titles. If you sort them alphabetically by book titles (ignoring leading
        articles “the” and “a” as is traditionally done for book sorting) you
        will get:
      </p>
      <StyledTable>
        <tr>
          <th>Book Title</th>
          <th>Row</th>
          <th>Column</th>
          <th>Color</th>
          <th>Extraction</th>
        </tr>
        {BOOK_DATA.map(([title, row, col, color, extraction], i) => (
          <tr key={i}>
            <td>{title}</td>
            <td>{row}</td>
            <td>{col}</td>
            <td>{color}</td>
            <td>{extraction}</td>
          </tr>
        ))}
      </StyledTable>
      <p>
        This gives <Mono>INDEX ANSWERS</Mono> which is an identical clue phrase
        as earlier. This should help confirm the extraction method and sorting
        method.
      </p>
      <p>
        After the clues, the actual meta solving begins with identifying that
        the answers are all movie titles. You need to take one of the lead
        actors from each one as hinted at by “leads” in the flavor text. These
        actors have all narrated audiobooks. The exact data source for the
        audiobooks can be found in the flavor text that hints at “audible.”
      </p>
      <p>
        Find the audiobook title on the bookcase for each lead actor, use the
        Morse code index (of row, column, color) on the paired feeder answer,
        and sort by book title (ignoring leading article “a”):
      </p>
      <StyledTable>
        <tr>
          <th>Feeder Answer</th>
          <th>Actor/Narrator</th>
          <th>Audiobook</th>
          <th>Row</th>
          <th>Column</th>
          <th>Color</th>
          <th>Extraction</th>
        </tr>
        {AUDIOBOOK_DATA.map(
          ([feeder, actor, audiobook, row, col, color, extraction], i) => (
            <tr key={i}>
              <td>
                <Mono>{feeder}</Mono>
              </td>
              <td>{actor}</td>
              <td>{audiobook}</td>
              <td>{row}</td>
              <td>{col}</td>
              <td>{color}</td>
              <td>
                <Mono>{extraction}</Mono>
              </td>
            </tr>
          ),
        )}
      </StyledTable>
      <p>
        This gives the final answer for how to confront Papa:{" "}
        <PuzzleAnswer>ADOPT A BABY VOICE</PuzzleAnswer>
      </p>
    </>
  );
}
