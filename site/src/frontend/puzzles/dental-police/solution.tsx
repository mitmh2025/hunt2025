import React from "react";
import { styled } from "styled-components";
import { Mono, PuzzleAnswer } from "../../components/StyledUI";

const StyledTable = styled.table`
  border-spacing: 8px;
`;

const COAT_DATA: {
  firstLetter: string;
  coat: string;
  webColor: string;
  hex: string;
  order: number;
  icon: string;
}[] = [
  {
    firstLetter: "N",
    coat: "NORFOLK jacket",
    webColor: "Yellow",
    hex: "#FFFF00",
    order: 1,
    icon: "Norfolk, Virginia",
  },
  {
    firstLetter: "O",
    coat: "OPERA cloak",
    webColor: "Green",
    hex: "#008000",
    order: 2,
    icon: "Phantom of Opera Mask",
  },
  {
    firstLetter: "R",
    coat: "RAINCOAT",
    webColor: "Black",
    hex: "#000000",
    order: 3,
    icon: "Raincloud",
  },
  {
    firstLetter: "D",
    coat: "DUFFEL coat",
    webColor: "Olive",
    hex: "#808000",
    order: 4,
    icon: "Duffel Bag",
  },
  {
    firstLetter: "I",
    coat: "INVERNESS cape",
    webColor: "Gold",
    hex: "#FFD700",
    order: 5,
    icon: "Loch Ness Monster",
  },
  {
    firstLetter: "N",
    coat: "NEHRU jacket",
    webColor: "Crimson",
    hex: "#DC143C",
    order: 6,
    icon: "Nehru with Indian Flag face",
  },
  {
    firstLetter: "E",
    coat: "EISENHOWER jacket",
    webColor: "Azure",
    hex: "#F0FFFF",
    order: 7,
    icon: "Eisenhower face",
  },
  {
    firstLetter: "L",
    coat: "LAB coat",
    webColor: "Russet",
    hex: "#80461B",
    order: 8,
    icon: "Flask",
  },
  {
    firstLetter: "P",
    coat: "PEA coat",
    webColor: "Purple",
    hex: "#800080",
    order: 9,
    icon: "Peapod",
  },
  {
    firstLetter: "T",
    coat: "TRENCH coat",
    webColor: "White",
    hex: "#FFFFFF",
    order: 10,
    icon: "Trench",
  },
  {
    firstLetter: "I",
    coat: "IMPERIAL YELLOW jacket",
    webColor: "Orange",
    hex: "#FFA500",
    order: 11,
    icon: "Imperial Beer Emblem",
  },
  {
    firstLetter: "P",
    coat: "POLO coat",
    webColor: "Blue",
    hex: "#0000FF",
    order: 12,
    icon: "Ralph Lauren polo logo",
  },
];

const EXTRACTION_DATA: {
  color: string;
  order: number;
  tip: string;
  clue: string;
  answer: string;
  index: number;
  extract: string;
}[] = [
  {
    color: "Olive",
    order: 1,
    tip: "is overused",
    clue: "Cause of a fracture in something that…",
    answer: "STRESS",
    index: 5,
    extract: "S",
  },
  {
    color: "Yellow",
    order: 4,
    tip: "works well for paranoia",
    clue: "An element that…",
    answer: "LITHIUM",
    index: 3,
    extract: "T",
  },
  {
    color: "Green",
    order: 5,
    tip: "is deceiving",
    clue: "French art style that… (2 wds)",
    answer: "TROMPE L’OEIL",
    index: 3,
    extract: "O",
  },
  {
    color: "White",
    order: 11,
    tip: "is a little off",
    clue: "A gait that…",
    answer: "LIMP",
    index: 4,
    extract: "P",
  },
  {
    color: "Azure",
    order: 13,
    tip: "is narcissistic",
    clue: "Lover of a guy who…",
    answer: "ECHO",
    index: 2,
    extract: "C",
  },
  {
    color: "Orange",
    order: 16,
    tip: "is good fun in streaks",
    clue: "Meat that…?",
    answer: "BACON",
    index: 4,
    extract: "O",
  },
  {
    color: "Purple",
    order: 17,
    tip: "doesn’t mix easily",
    clue: "Two-component salad dressing that… (3 wds)",
    answer: "OIL AND VINEGAR",
    index: 6,
    extract: "D",
  },
  {
    color: "Russet",
    order: 19,
    tip: "always fits in",
    clue: "A reptile that…",
    answer: "CHAMELEON",
    index: 8,
    extract: "O",
  },
  {
    color: "Blue",
    order: 21,
    tip: "can change things",
    clue: "Constitutional section that…",
    answer: "AMENDMENT",
    index: 4,
    extract: "N",
  },
  {
    color: "Black",
    order: 22,
    tip: "is a family problem",
    clue: "Conflict that…",
    answer: "FEUD",
    index: 3,
    extract: "U",
  },
  {
    color: "Gold",
    order: 23,
    tip: "can be holy",
    clue: "Type of edible dip that…?",
    answer: "GUACAMOLE",
    index: 1,
    extract: "G",
  },
  {
    color: "Crimson",
    order: 24,
    tip: "gets out of control",
    clue: "Cartoon character who…",
    answer: "TAZ",
    index: 2,
    extract: "A",
  },
];

const Solution = (): JSX.Element => {
  return (
    <>
      <p>
        The puzzle presents itself as a scene in a jazz club. There are 12
        people with different types of coats. As well, there is a set list that
        pairs with the jazz scene picture. There are 2 main parts to this
        puzzle. First, the solver needs to identify the coat names, which have 2
        confirmations in place: a smaller illustration on the coat that hints at
        the coat name, and also, the coats are in alphabetical order by coat
        name from left to right, based on the person’s head placement.
      </p>
      <p>
        The “aha moment” that is needed for part one is that the coats all have
        colors from the Joseph’s Coat song from the musical, Joseph and the
        Amazing Technicolor Dreamcoat. When the coats are put in order of the
        colors mentioned in Joseph’s Coat, the first letter of the coat names
        spell out <Mono>NORDINE LP TIP</Mono>, which also fits into the blanks
        at the bottom of the jazz scene picture. The colors can be confirmed by
        the HTML color codes.
      </p>
      <p>
        <StyledTable>
          <tr>
            <th>First Letter</th>
            <th>Coat Types</th>
            <th>Web Color Name</th>
            <th>Hex Value</th>
            <th>Color Order</th>
            <th>Confirmation image on coat</th>
          </tr>
          {COAT_DATA.map(
            ({ firstLetter, coat, webColor, hex, order, icon }) => (
              <tr key={order}>
                <td>{firstLetter}</td>
                <td>{coat}</td>
                <td>{webColor}</td>
                <td>{hex}</td>
                <td>{order}</td>
                <td>{icon}</td>
              </tr>
            ),
          )}
        </StyledTable>
      </p>
      <p>
        The cluephrase, <Mono>NORDINE LP TIP</Mono>, should point the solver
        toward the artist, Ken Nordine and his album, Colors. All the colors in
        the image have a one-for-one match with Ken Nordine’s Colors album.
        Searching “Ken Nordine,” “Colors,” and “LP,” (or a variation thereof)
        leads to the LP album. The Wikipedia article for the album mentions the
        LP Tips, as do other websites and can be seen on the backside of the
        Color LP.
      </p>
      <p>
        There is a set list with 12 phrases that need to be paired with the
        playing tips from the same colors used in the first part of the puzzle.
        To avoid confusion with pairing the wrong playing tip with the wrong
        phrase, the phrases are given in track order from the Ken Nordine album.
        The solver needs to pair the phrase with the playing tip to get the full
        prompt that suggests a word. For example, the first phrase in the set
        list is “Cause of a fracture in something that…” which pairs with “is
        overused,” the playing tip for Olive, which is also the first song on
        the Nordine Colors album. The full phrase is “Cause of a fracture in
        something that is overused” suggests the answer, STRESS. Using the 5
        notes from the olive-coated person and indexing into STRESS, one gets a
        S. Doing this for the next 11 phrases gets the full second clue phrase,
        <Mono>STOP CODON UGA</Mono>, in which the answer is{" "}
        <PuzzleAnswer>OPAL</PuzzleAnswer>.
      </p>
      <p>
        <StyledTable>
          <tr>
            <th>Color</th>
            <th>Nordine Song Order</th>
            <th>Playing Tip</th>
            <th>Other half of clue</th>
            <th>Answer</th>
            <th>Index (Notes)</th>
            <th>Extract</th>
          </tr>
          {EXTRACTION_DATA.map(
            ({ color, order, tip, clue, answer, index, extract }) => (
              <tr key={order}>
                <td>{color}</td>
                <td>{order}</td>
                <td>{tip}</td>
                <td>{clue}</td>
                <td>{answer}</td>
                <td>{index}</td>
                <td>{extract}</td>
              </tr>
            ),
          )}
        </StyledTable>
      </p>
    </>
  );
};

export default Solution;
