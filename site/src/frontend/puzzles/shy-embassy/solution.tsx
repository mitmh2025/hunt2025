import React, { type ReactNode } from "react";
import { styled } from "styled-components";
import LinkedImage from "../../components/LinkedImage";
import {
  HScrollTableWrapper,
  Mono,
  PuzzleAnswer,
} from "../../components/StyledUI";
import solution from "./assets/solution.png";

const Blue = styled.span`
  color: #0000ff;
`;

const DATA: [string, ReactNode, string, string, string, string, string][] = [
  [
    "GARDEN CENTER",
    <>
      <Blue>GARDEN</Blue> SPIDER(MAN)
    </>,
    "SPIDERMAN",
    "PETER PARKER",
    "S",
    "7",
    "A",
  ],
  [
    "",
    <>
      SUPER(MAN) <Blue>CENTER</Blue>
    </>,
    "SUPERMAN",
    "CLARK KENT",
    "S",
    "1",
    "C",
  ],
  [
    "FAT TUESDAY",
    <>
      SUPER(MAN) <Blue>TUESDAY</Blue>
    </>,
    "SUPERMAN",
    "CLARK KENT",
    "S1",
    "1",
    "C",
  ],
  [
    "",
    <>
      <Blue>FAT</Blue> CAT(WOMAN)
    </>,
    "CATWOMAN",
    "SELINA KYLE",
    "A1",
    "2",
    "E",
  ],
  [
    "CARPENTER FISH",
    <>
      CAT(WOMAN) <Blue>FISH</Blue>
    </>,
    "CATWOMAN",
    "SELINA KYLE",
    "C",
    "1",
    "S",
  ],
  [
    "",
    <>
      <Blue>CARPENTER</Blue> ANT(GIRL)
    </>,
    "ANT GIRL",
    "CASSIE LANG",
    "P",
    "4",
    "S",
  ],
  [
    "BASEBALL MOUND",
    <>
      ANT(GIRL) <Blue>MOUND</Blue>
    </>,
    "ANT GIRL",
    "CASSIE LANG",
    "T",
    "3",
    "S",
  ],
  [
    "",
    <>
      <Blue>BASEBALL</Blue> BAT(MAN)
    </>,
    "BATMAN",
    "BRUCE WAYNE",
    "S",
    "3",
    "U",
  ],
  [
    "VAMPIRE BUTTERFLY",
    <>
      <Blue>VAMPIRE</Blue> BAT(MAN)
    </>,
    "BATMAN",
    "BRUCE WAYNE",
    "T",
    "10",
    "E",
  ],
  [
    "",
    <>
      IRON(MAN) <Blue>BUTTERFLY</Blue>
    </>,
    "IRON MAN",
    "TONY STARK",
    "BI",
    "5 & 1",
    "ST",
  ],
  [
    "FIVE HOLE",
    <>
      <Blue>FIVE</Blue> IRON(MAN)
    </>,
    "IRON MAN",
    "TONY STARK",
    "I1",
    "2",
    "O",
  ],
  [
    "",
    <>
      HELL(BOY) <Blue>HOLE</Blue>
    </>,
    "HELLBOY",
    "ANUNG UN RAMA",
    "E2",
    "8",
    "R",
  ],
  [
    "LIVING YEARS",
    <>
      <Blue>LIVING</Blue> HELL(BOY)
    </>,
    "HELLBOY",
    "ANUNG UN RAMA",
    "L3",
    "10",
    "M",
  ],
  [
    "",
    <>
      WONDER(WOMAN) <Blue>YEARS</Blue>
    </>,
    "WONDER WOMAN",
    "DIANA PRINCE",
    "O",
    "2",
    "I",
  ],
  [
    "BANANA BREAD",
    <>
      WONDER(WOMAN) <Blue>BREAD</Blue>
    </>,
    "WONDER WOMAN",
    "DIANA PRINCE",
    "D1",
    "4",
    "N",
  ],
  [
    "",
    <>
      <Blue>BANANA</Blue> SPIDER(MAN)
    </>,
    "SPIDERMAN",
    "PETER PARKER",
    "I",
    "9",
    "K",
  ],
];

const StyledTable = styled.table`
  margin: 1em 0;
  border-collapse: collapse;
  border: 1px solid black;
  tr:nth-child(2n + 1) {
    border-bottom: 1px solid black;
  }
  th,
  td {
    padding-right: 8px;
  }
`;

const SizedImage = styled(LinkedImage)`
  display: block;
  width: 50%;
  margin: auto;
`;

export default function Solution(): JSX.Element {
  return (
    <>
      <p>
        There are eight two-word feeder answers for this puzzle. Each corner of
        the star represents a superhero with MAN/WOMAN/BOY/GIRL in the name (as
        represented by a male/female symbol + the symbol’s size) and each line
        represents a feeder puzzle (i.e. each feeder puzzle connects to two
        superheroes).
      </p>
      <p>
        Solvers need to take the first word and second word and pair it with the
        superhero name such that it is “1st word + superhero” and “superhero +
        2nd word.” For example “FAT TUESDAY” has two pairs with CAT WOMAN and
        SUPERMAN forming the two phrases “FAT CAT(woman)” and “SUPER(man)
        TUESDAY”. All eight feeder answers pair up with two superheroes. All
        superheroes are used in two different feeders.
      </p>
      <p>
        Solvers then must put the superheroes on the respective spots on the
        diagram. Connected lines represent superheroes that share a feeder
        answer. The letter on the line is a letter that will appear in the
        corresponding combo phrase; if the letter has a subscript then the
        letter appears more than once and the subscript specifies which letter
        it is referring to (first, second, third).
      </p>
      <SizedImage
        src={solution}
        alt="A diagram of an eight-pointed star with male and female symbols around the outside points. Each point and each line in the star is annotated (described in the table below)."
      />
      <p>
        The letter placement within the combo phrase represents the index. T in
        VAMPIRE BAT is the 10th letter. This gives an index of 10. Solvers need
        to refer to the flavor text which hints at the alter ego (“secret
        identity”). Index into the alter ego for Batman at the 10th letter;
        Bruce Wayne = E.
      </p>
      <p>
        Solvers can then trace around the entire eight answers in a giant loop.
        The start/end of the loop is hinted at by the slight break in the top of
        the diagram. If you index those in order and follow around the diagram
        (generating three letters from Tony Stark) you will extract{" "}
        <Mono>ACCESS SUE STORM INK</Mono>.
      </p>
      <p>
        SUE STORM is the alter ego for INVISIBLE WOMAN. If you do the mechanic
        in reverse you will produce ACCESS INVISIBLE (woman) INK. The final
        answer is <PuzzleAnswer>ACCESS INVISIBLE INK</PuzzleAnswer>.
      </p>
      <HScrollTableWrapper>
        <StyledTable>
          <tr>
            <th>Feeder Answer</th>
            <th>Combo Phrase</th>
            <th>Character</th>
            <th>Alter Ego</th>
            <th>Letter</th>
            <th>Index</th>
            <th>Extract</th>
          </tr>
          {DATA.map(
            (
              [feeder, combo, character, alterEgo, letter, index, extraction],
              i,
            ) => (
              <tr key={i}>
                <td>{feeder}</td>
                <td>{combo}</td>
                <td>{character}</td>
                <td>{alterEgo}</td>
                <td>{letter}</td>
                <td>{index}</td>
                <td>{extraction}</td>
              </tr>
            ),
          )}
        </StyledTable>
      </HScrollTableWrapper>
    </>
  );
}
