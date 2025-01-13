import React from "react";
import { styled } from "styled-components";
import { PuzzleAnswer } from "../../components/StyledUI";

const StyledTable = styled.table`
  margin: 1em 0;
  border-collapse: collapse;
  td {
    padding: 0 8px;
  }
`;

const TABLE_DATA = [
  {
    building: "1",
    clue: "Marsupial invasive in New Zealand",
    answer: "Common brushtail possum",
    tail: "M",
  },
  {
    building: "2",
    clue: "U.S. President",
    answer: "Zachary Taylor",
    tail: "R",
  },
  {
    building: "3",
    clue: "Leather implement used in flogging",
    answer: "Cat o’ nine tails",
    tail: "S",
  },
  {
    building: "4",
    clue: "Specialty of Jakarta’s Bogor Cafe",
    answer: "Oxtail soup",
    tail: "P",
  },
  {
    building: "5",
    clue: "“Angel” episode in season 5",
    answer: "The Cautionary Tale of Numero Cinco",
    tail: "O",
  },
  {
    building: "6",
    clue: "Poe short story",
    answer: "The Tell-Tale Heart",
    tail: "T",
  },
  { building: "7", clue: "Eras artist", answer: "Taylor Swift", tail: "T" },
  {
    building: "8",
    clue: "Charles Dickens novel",
    answer: "A Tale of Two Cities",
    tail: "S",
  },
  {
    building: "9",
    clue: "Explosive thrown in a bottle",
    answer: "Molotov cocktail",
    tail: "L",
  },
  {
    building: "10",
    clue: "Children’s birthday party game played blindfolded",
    answer: "Pin the tail on the donkey",
    tail: "Y",
  },
  {
    building: "11",
    clue: "Peter Rabbit ballet",
    answer: "The Tales of Beatrix Potter",
    tail: "R",
  },
  {
    building: "12",
    clue: "“Colorful” slices of raw fish",
    answer: "Yellowtail sashimi",
    tail: "I",
  },
  {
    building: "13",
    clue: "1986 Eurovision Song Contest group",
    answer: "Cocktail Chic",
    tail: "C",
  },
];

export default function Solution() {
  return (
    <>
      <p>
        Hunters were taken on a tour of campus, tailing a suspect and using a
        number of ridiculous items and actions to “hide” from the suspect, and
        just generally look silly around campus to outside observers. The
        actions included hiding behind a newspaper, putting on silly Groucho
        Marx glasses, hiding underneath a towel (like in Hitchhiker’s Guide to
        the Galaxy), getting in a single-file line, and crouching down on the
        ground. If the hunters fulfilled the required combination of conditions
        at each stop on the tour, the suspect wouldn’t see them and would spill
        some secret intel.
      </p>
      <p>
        As hunters gathered intel from the lead, they noticed that they stopped
        once at each building 1-13. Also each clue, while potentially ambiguous
        on its own, can identify something with “tail” in it (or something
        sounding similar, like “tale” or “tayl”). Taking the “tail” letter (that
        is, the last letter) of each answer in building order gives the
        cluephrase <PuzzleAnswer>MRS POTTS LYRIC</PuzzleAnswer>, which clues
        Mrs. Potts from “Beauty and the Beast”, who sings the title song of the
        movie, which includes the famous lyric{" "}
        <PuzzleAnswer>TALE AS OLD AS TIME</PuzzleAnswer>.
      </p>
      <StyledTable>
        <tr>
          <th>Building</th>
          <th>Clue</th>
          <th>Answer</th>
          <th>Tail Letter</th>
        </tr>
        {TABLE_DATA.map((data) => (
          <tr key={data.building}>
            <td>{data.building}</td>
            <td>{data.clue}</td>
            <td>{data.answer}</td>
            <td>{data.tail}</td>
          </tr>
        ))}
      </StyledTable>
    </>
  );
}
