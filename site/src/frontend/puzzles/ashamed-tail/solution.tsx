import React, { type ReactNode } from "react";
import { styled } from "styled-components";
import { Mono, PuzzleAnswer } from "../../components/StyledUI";

const StyledTable = styled.table`
  margin: 1em 0;
  td {
    padding: 0 8px;
    &:first-child {
      width: 275px;
    }
    &:nth-child(2) {
      width: 175px;
    }
  }
`;

const GROUPS: {
  blanks: string;
  cluesAndAnswers: { clue: ReactNode; answer: ReactNode }[];
}[] = [
  {
    cluesAndAnswers: [
      { clue: "choupiques (7)", answer: "bowfins" },
      { clue: "bound G. Greene (8,4)", answer: <i>Brighton Rock</i> },
      { clue: "Asia folk (9)", answer: "Ceylonese" },
      { clue: "zany Joker movie (5,1,4)", answer: <i>Folie a Deux</i> },
      { clue: "lying flat (10)", answer: "horizontal" },
      { clue: "Tuileries art exhibition (3,2,5)", answer: "Jeu de Paume" },
      { clue: "woman aide (4-2-7)", answer: "lady-in-waiting" },
      { clue: "act (10)", answer: "masquerade" },
      { clue: "TV Drew or Spade (7,12)", answer: "private investigator" },
    ],
    blanks: "I N",
  },
  {
    cluesAndAnswers: [
      { clue: "fawn hue (5)", answer: "beige" },
      { clue: "TX bloom (10)", answer: "bluebonnet" },
      { clue: "O (J. Priestley) (16,3)", answer: "dephlogisticated air" },
      { clue: "ria (7,6)", answer: "drowned valley" },
      { clue: "eye imagizer dot (5)", answer: "fovea" },
      { clue: "acid funk (10)", answer: "Jamiroquai" },
      { clue: "avis (needing a queen?) (10)", answer: "kingfisher" },
      { clue: "Idaho U.’s site (6)", answer: "Moscow" },
      { clue: "travel bags (12)", answer: "portmanteaux" },
      { clue: "power, control (10)", answer: "suzerainty" },
    ],
    blanks: "M B",
  },
  {
    cluesAndAnswers: [
      { clue: "Go, E.O., verquere (5,4)", answer: "board game" },
      { clue: "we find e.g. Pisces (9,7)", answer: "celestial equator" },
      { clue: "singularity radius (5,7)", answer: "event horizon" },
      { clue: "holiday in U.K. (3,6,3)", answer: "Guy Fawkes day" },
      { clue: "to the max (2,8)", answer: <i>in excelsis</i> },
      { clue: "Baltic (6)", answer: "Latvia" },
      { clue: "Japan (6)", answer: "Nippon" },
      { clue: "Brazil metro (3,2,7)", answer: "Rio de Janiero" },
      { clue: "not even law (4,2,5)", answer: "rule of thumb" },
      { clue: "doofer (6)", answer: "widget" },
    ],
    blanks: "E L",
  },
  {
    cluesAndAnswers: [
      { clue: "T end (7)", answer: "Alewife" },
      {
        clue: (
          <>
            sings “<i>Abdulmajid</i>” (5)
          </>
        ),
        answer: "Bowie",
      },
      { clue: "tea variety (10)", answer: "Darjeeling" },
      { clue: "_____ Chopin (8)", answer: "Frederic" },
      { clue: ">>> a few  (10)", answer: "googolplex" },
      { clue: "get upset (4,7)", answer: "have kittens" },
      { clue: "(one) ode (10)", answer: "Ozymandias" },
      {
        clue: (
          <>
            warble “<i>Zoe</i>”, “<i>Geronimo</i>” (13)
          </>
        ),
        answer: "Stereophonics",
      },
      { clue: "Inquisitor (10)", answer: "Torquemada" },
      { clue: "Linux flavor (6)", answer: "Ubuntu" },
      { clue: "Thackeray (6,4)", answer: <i>Vanity Fair</i> },
    ],
    blanks: "E F",
  },
  {
    cluesAndAnswers: [
      { clue: "fox (i.e. outwit, daze) (8)", answer: "bewilder" },
      {
        clue: (
          <>
            <i>Rokeby Venus</i> painter (alt. sp.) (5,9)
          </>
        ),
        answer: "Diego Velasquez",
      },
      { clue: "slogan of Henry V (4,2,3,5)", answer: <i>Dieu et mon droit</i> },
      { clue: "E.U. HQ (8,10)", answer: "European Parliament" },
      { clue: "dig & die (7)", answer: "foxhole" },
      { clue: "Co. Antrim area (5’1,8)", answer: "Giant’s Causeway" },
      { clue: "“ice man” (4,5)", answer: "Jack Frost" },
      { clue: "Old West serial (3,9)", answer: <i>The Virginian</i> },
      { clue: "biog. jug (4)", answer: "Toby" },
    ],
    blanks: "E T",
  },
];

const Solution = (): JSX.Element => {
  return (
    <>
      <p>
        Each block of clues is a Scrabblegram, which, as described in{" "}
        <a
          href="https://www.theguardian.com/science/2024/jan/22/can-you-solve-it-the-greatest-wordplay-puzzle-of-all-time"
          target="_blank"
          rel="noreferrer"
        >
          this article
        </a>
        , is “a form of constrained writing in which you must write a piece of
        text that uses all 100 tiles in an English Scrabble set, and no other
        letters. The blank tiles must be used, and as per the rules can be any
        letter.”
      </p>
      <p>
        Accordingly, each set of solutions is also a Scrabblegram, using the
        blanks as two specific letters. In order, the blanks used are:{" "}
        <Mono>IN BM EL EF ET</Mono>. By selecting an ordering of the blanks
        within each pair, this can be arranged to spell{" "}
        <PuzzleAnswer>NIMBLE FEET</PuzzleAnswer>.
      </p>
      {GROUPS.map(({ blanks, cluesAndAnswers }, i) => (
        <StyledTable key={`group-${i}`}>
          {cluesAndAnswers.map(({ clue, answer }, j) => (
            <tr key={`group-${i}-row-${j}`}>
              <td>{clue}</td>
              <td>{answer}</td>
              {j === 0 ? (
                <td colSpan={cluesAndAnswers.length}>{blanks}</td>
              ) : undefined}
            </tr>
          ))}
        </StyledTable>
      ))}
    </>
  );
};

export default Solution;
