import React from "react";
import { styled } from "styled-components";
import {
  HScrollTableWrapper,
  Mono,
  PuzzleAnswer,
} from "../../components/StyledUI";
import goodfiction from "./assets/goodfiction.png";

const ESCAPE_ROOM_LOCKS_DATA = [
  [
    "Directional (on desk drawer)",
    "SLEDDER",
    "Down-Left-Right-Down-Down-Right-Right",
    "All the letters in answer are Up Down Left Right OR North South West East. Input the directions.",
  ],
  [
    "Combination Safe (behind cat painting)",
    "THE END OF THE HEISEI ERA",
    "04-30-19",
    "Enter the date for the given clue. (Alternative date formats are also accepted.)",
  ],
  [
    "Digital Number (under bear rug)",
    "HELL HOLE",
    "37047734",
    "Writing 37047734 on a 7-segment display and flipping upside down will spell HELL HOLE.",
  ],
  [
    "Switches (behind portrait)",
    "A BAD DECADE",
    "1010 1011 1010 1101 1101 1110 1100 1010 1101 1110",
    "All letters are hexadecimal A-E. Convert to binary.",
  ],
  ["Cryptex Letter (on desk)", "REUNITED", "REUNITED", ""],
];

const BOOKSHELF_MATCH_DATA = [
  ["FIORE SARDO", "Who Moved My Cheese?", "Fiore Sardo is a type of cheese."],
  [
    "PHILOLOGY",
    "The Decipherment of Linear B",
    "Philology is the study of languages. Decipherment of Linear B is a famous book about studying ancient languages.",
  ],
  ["FOOD COURT", "The Art of Eating", "Food courts are about eating."],
  [
    "ATHLETIC CLUB",
    "Moneyball",
    "Moneyball is about the baseball team called “The Oakland Athletics”",
  ],
  [
    "MANUEL ORIBE",
    "John Adams",
    "Manuel Oribe was the 2nd constitutional president of Uruguay. John Adams was the 2nd constitutional president of the USA.",
  ],
];

const BOOKSHELF_EXTRACTION_DATA = [
  ["FIORE SARDO", "Who Moved My Cheese?", "155", "FEE"],
  ["PHILOLOGY", "The Decipherment of Linear B", "487", "LGO"],
  ["FOOD COURT", "The Art of Eating", "641", "ODF"],
  ["ATHLETIC CLUB", "Moneyball", "796", "ICT"],
  ["MANUEL ORIBE", "John Adams", "973", "ION"],
];

const StyledTable = styled.table`
  margin: 1em 0;
  border-spacing: 8px 0;
`;

export default function Solution(): JSX.Element {
  return (
    <>
      <p>
        This round has two distinct phases—escape room locks and the bookshelf
        meta.
      </p>
      <h3>Escape Room Locks</h3>
      <p>
        The first five puzzle answers each link up with a specific lock.
        Entering the following solutions will unlock the lock, revealing an
        additional puzzle (which will be used for the bookshelf meta). These
        initial five puzzles aren’t used again (hinted at by escape room flavor
        text instructing solvers that “Every key is only used in a single lock
        so don’t try to reuse them.”)
      </p>
      <HScrollTableWrapper>
        <StyledTable>
          <tr>
            <th>Lock Type</th>
            <th>Feeder Answer</th>
            <th>Lock Answer</th>
            <th>Explanation</th>
          </tr>
          {ESCAPE_ROOM_LOCKS_DATA.map(
            ([lockType, feeder, lockAnswer, explanation], i) => (
              <tr key={i}>
                <td>{lockType}</td>
                <td>
                  <Mono>{feeder}</Mono>
                </td>
                <td>{lockAnswer}</td>
                <td>{explanation}</td>
              </tr>
            ),
          )}
        </StyledTable>
      </HScrollTableWrapper>
      <h3>Bookshelf Meta</h3>
      <p>
        This round is about library classifications. The typical library
        classification that most people know is the Dewey Decimal Classification
        (DDC) system. DDC is copyrighted so it can be a challenge finding the
        DDCs for most books. An alternative open source method called Melvil
        Decimal System (MDS) will be one of the top Google hits if you search
        “book title” and “dewey decimal.”
      </p>
      <p>
        This puzzle is solvable using either DDC or MDS (they are the same for
        all answers chosen), but to guide solvers to MDS the note next to the
        bookshelf hints that solvers should use MDS instead of DDC.
      </p>
      <p>
        The next hint is in the bookshelf on the bottom right with the books
        lying flat. The first letters of the titles spell{" "}
        <Mono>INDEX ANSWERS</Mono>, implying that you should not be indexing
        anything other than the feeder answers. Additionally, the books here are
        given in MDS sorting order which is a hint at the final sorting method.
      </p>
      <p>
        The first step, after seeing hints, is linking each feeder answer with a
        book on the bookshelf. There is one solid match between every feeder
        answer and one book on the bookshelf:
      </p>
      <HScrollTableWrapper>
        <StyledTable>
          <tr>
            <th>Feeder Answer</th>
            <th>Book</th>
            <th>Explanation</th>
          </tr>
          {BOOKSHELF_MATCH_DATA.map(([feeder, book, explanation], i) => (
            <tr key={i}>
              <td>
                <Mono>{feeder}</Mono>
              </td>
              <td>{book}</td>
              <td>{explanation}</td>
            </tr>
          ))}
        </StyledTable>
      </HScrollTableWrapper>
      <p>
        If you take the MDS (the three primary digits before any decimal) for
        each of these books you will get the index. Applying this index to the
        feeder answer will give you the extracted letters. The letter sort works
        both by either 1) MDS or 2) the spot on the bookshelf location
        top-to-bottom, left-to-right.
      </p>
      <HScrollTableWrapper>
        <StyledTable>
          <tr>
            <th>Feeder Answer</th>
            <th>Book</th>
            <th>MDS</th>
            <th>Extraction</th>
          </tr>
          {BOOKSHELF_EXTRACTION_DATA.map(
            ([feeder, book, mds, extraction], i) => (
              <tr key={i}>
                <td>
                  <Mono>{feeder}</Mono>
                </td>
                <td>{book}</td>
                <td>{mds}</td>
                <td>{extraction}</td>
              </tr>
            ),
          )}
        </StyledTable>
      </HScrollTableWrapper>
      <p>
        This spells <PuzzleAnswer>FEEL GOOD FICTION</PuzzleAnswer>.
      </p>
      <p>
        <Mono>FEEL GOOD</Mono> is a pun on the type of fiction and the physical
        interaction to touch the bookshelf. The next step is to use the
        bookshelf interaction to spell <Mono>GOOD FICTION</Mono> in braille:
      </p>
      <img
        src={goodfiction}
        alt="The words GOOD FICTION, charted in Braille according to the positions of the books on Papa’s bookshelf."
      />
      <p>Every Braille bump is also a fiction book.</p>
      <p>
        Pulling the correct books causes a hidden door to open, revealing a
        secret room that is the beginning of the second phase.
      </p>
    </>
  );
}
