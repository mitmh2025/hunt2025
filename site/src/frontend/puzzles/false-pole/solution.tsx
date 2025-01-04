import React from "react";
import { styled } from "styled-components";
import LinkedImage from "../../components/LinkedImage";
import { Mono, PuzzleAnswer } from "../../components/StyledUI";
import cipher from "./assets/cipher.png";
import table1 from "./assets/table1.png";
import table10 from "./assets/table10.png";
import table11 from "./assets/table11.png";
import table12 from "./assets/table12.png";
import table13 from "./assets/table13.png";
import table14 from "./assets/table14.png";
import table15 from "./assets/table15.png";
import table16 from "./assets/table16.png";
import table17 from "./assets/table17.png";
import table18 from "./assets/table18.png";
import table19 from "./assets/table19.png";
import table2 from "./assets/table2.png";
import table20 from "./assets/table20.png";
import table21 from "./assets/table21.png";
import table22 from "./assets/table22.png";
import table23 from "./assets/table23.png";
import table24 from "./assets/table24.png";
import table25 from "./assets/table25.png";
import table26 from "./assets/table26.png";
import table27 from "./assets/table27.png";
import table28 from "./assets/table28.png";
import table29 from "./assets/table29.png";
import table3 from "./assets/table3.png";
import table30 from "./assets/table30.png";
import table4 from "./assets/table4.png";
import table5 from "./assets/table5.png";
import table6 from "./assets/table6.png";
import table7 from "./assets/table7.png";
import table8 from "./assets/table8.png";
import table9 from "./assets/table9.png";

const MUSICIANS = [
  ["Zutty Singleton", "Member of Louis Armstrong's Hot Five", "G"],
  ["Eddie Locke", "He played in the Coleman Hawkins Quartet", "O"],
  [
    "Chubby Jackson",
    "Member of Woody Herman's Herd who played a five-string bass",
    "H",
  ],
  ["J. C. Heard", "Featured member of the Cab Calloway Orchestra", "A"],
  [
    "Vic Dickenson",
    "Trombonist and member of the World's Greatest Jazz Band",
    "V",
  ],
  ["Benny Golson", "Appeared as himself in a Spielberg film", "E"],
  ["Buck Clayton", "He played the Shanghai Canidrome", "A"],
  [
    "Gigi Gryce",
    "Close friend of Charlie Parker, saxophonist, and arranger",
    "G",
  ],
  ["Wilbur Ware", "Bassist who played the Five Spot with Thelonious Monk", "R"],
  [
    "Thelonious Monk",
    "A Central Square sushi restaurant used to be named after him",
    "E",
  ],
  [
    "Bud Freeman",
    "Saxophonist who wrote two memoirs and an autobiography",
    "A",
  ],
  [
    "Luckey Roberts",
    "Composed a ragtime piece too difficult to play, but slowed it down 30 years later to become a best selling record",
    "T",
  ],
  [
    "Marian McPartland",
    "She received an OBE and a lifetime achievement Grammy",
    "D",
  ],
  ["Charles Mingus", "He wrote a guide on toilet training your cat", "A"],
  [
    "Buster Bailey",
    "Member of John Kirby's Onyx Club Boys who occasionally lent his name to the group",
    "Y",
  ],
];

const GREAT_DAY: [string, string, string, string, string][] = [
  ["Zutty Singleton", "SSE 1", table1, table2, "Sonny Greer"],
  ["Eddie Locke", "W 1", table3, table4, "Hank Jones"],
  ["Chubby Jackson", "W 1", table5, table6, "Art Blakey"],
  ["J. C. Heard", "ESE 1", table7, table8, "Roy Eldridge"],
  ["Vic Dickenson", "WSW 2", table9, table10, "Emmett Berry"],
  ["Benny Golson", "SE 1", table11, table12, "Art Blakey"],
  ["Buck Clayton", "E 1", table13, table14, "Taft Jordan"],
  ["Gigi Gryce", "E 2", table15, table16, "Eddie Locke"],
  ["Wilbur Ware", "WNW 1", table17, table18, "Art Farmer"],
  ["Thelonious Monk", "WSW 2", table19, table20, "Mary Lou Williams"],
  ["Bud Freeman", "E 1", table21, table22, "Pee Wee Russell"],
  ["Luckey Roberts", "NW 1", table23, table24, "Horace Silver"],
  ["Marian McPartland", "W 1", table25, table26, "Oscar Pettiford"],
  ["Charles Mingus", "NNE 1", table27, table28, "Tyree Glenn"],
  ["Buster Bailey", "ENE 1", table29, table30, "Osie Johnson"],
];

const StyledTable = styled.table`
  margin-bottom: 1em;
  border-spacing: 0 8px;
`;

const PhotoTable = styled(StyledTable)`
  td:nth-child(3),
  td:nth-child(4) {
    width: 250px;
  }
`;

const Solution = (): JSX.Element => {
  return (
    <>
      <p>
        The puzzle is presented as a series of musical staves containing notes,
        and a list of crossword-style clues featuring parenthetical compass
        directions and a number. In the musical staves, all notes are quarter
        notes, and there is no key signature or time signature (and each measure
        has a variable number of notes). In each musical staff, one note is
        replaced with a rest.
      </p>
      <p>
        The clues in the list refer to jazz musicians. Identifying any of them
        (Thelonius Monk and Charles Mingus are intended as break-in points, but
        others can also be found through some searching) will reveal that each
        person matches the length of the note sequence in one of the musical
        staves. The musical notes form a cryptogram for the names of the people
        clued, with one note in the name replaced with a rest.
      </p>
      <p>The cryptogram key is:</p>
      <LinkedImage
        src={cipher}
        alt="A musical staff displaying a chromatic scale from middle C through the A# above middle C. Below each note is a corresponding letter, forming a substitution cipher."
      />
      <p>The translated names and corresponding clues are:</p>
      <StyledTable>
        <tr>
          <th>Name</th>
          <th>Corresponding clue</th>
          <th>Omitted letter</th>
        </tr>
        {MUSICIANS.map(([name, clue, letter], i) => (
          <tr key={i}>
            <td>{name}</td>
            <td>{clue}</td>
            <td>{letter}</td>
          </tr>
        ))}
      </StyledTable>
      <p>
        Reminiscent of the Miles Davis quote about jazz, it’s not the notes you
        play, it’s the notes you don’t play. In the order that the musical
        staves are presented, reading the letters replaced by rests provides the
        message <Mono>GO HAVE A GREAT DAY</Mono>—which, besides being a
        generally good piece of advice, is also a hint towards the photo{" "}
        <a
          href="https://en.m.wikipedia.org/wiki/A_Great_Day_in_Harlem"
          target="_blank"
          rel="noreferrer"
        >
          A Great Day in Harlem
        </a>
        , a 1958 photograph of 57 jazz musicians taken on a building stoop in
        Harlem, originally from Esquire magazine. An interactive version appears{" "}
        <a
          href="http://www.seewah.com/a-great-day-in-harlem/"
          target="_blank"
          rel="noreferrer"
        >
          here
        </a>
        .
      </p>
      <p>
        All of the identified musicians were present in A Great Day in Harlem,
        as can be confirmed from the wikipedia page and from various maps or
        pages made to help identify each person in the photo. Applying the
        associated compass directions to the location of each musician (based on
        their faces) will identify another musician, whose names’ initial
        letters in the same order spell out the final instruction,{" "}
        <Mono>SHARE A TEAM PHOTO</Mono>.
      </p>
      <PhotoTable>
        <tr>
          <th>Starting Person</th>
          <th>Direction</th>
          <th colSpan={2}>Image</th>
          <th>Destination</th>
        </tr>
        {GREAT_DAY.map(([start, direction, image1, image2, end], i) => (
          <tr key={i}>
            <td>{start}</td>
            <td>{direction}</td>
            <td>
              <LinkedImage src={image1} alt="" />
            </td>
            <td>
              <LinkedImage src={image2} alt="" />
            </td>
            <td>{end}</td>
          </tr>
        ))}
      </PhotoTable>
      <p>
        Teams were instructed to send a photo of as many team members as
        reasonably possible, as well as whether we have permission to show the
        image during wrap-up. Teams who did so received the answer in the form
        of a similar photo taken by D&M, featuring the answer{" "}
        <PuzzleAnswer>CANINE PARTNER</PuzzleAnswer>.
      </p>
    </>
  );
};

export default Solution;
