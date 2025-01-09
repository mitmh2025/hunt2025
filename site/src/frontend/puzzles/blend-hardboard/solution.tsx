import React, { type ReactNode } from "react";
import { styled } from "styled-components";
import {
  HScrollTableWrapper,
  Mono,
  PuzzleAnswer,
} from "../../components/StyledUI";

const DATA: [string, string, string, string, string, ReactNode][] = [
  [
    "4:00 PM",
    "Lucia di Lammermoor",
    "Donizetti",
    "Nettie",
    "Henry (Enrico)",
    <>
      “<strong>As the dance gets under way…</strong>”
    </>,
  ],
  [
    "3:00 PM",
    "Albert Herring",
    "Britten",
    "Henry",
    "Nancy",
    "“Will the May Monarch still be dressed in white?”",
  ],
  [
    "10:00 PM",
    "Götterdämmerung",
    "Wagner",
    "Nancy",
    "Hilda (Brünnhilde)",
    "“Is he going to sell her down the river?”",
  ],
  [
    "8:00 PM",
    "Iolanta",
    "Tchaikovsky",
    "Hilda",
    "Robert",
    "“Will she do what it takes to be able to see him?”",
  ],
  [
    "9:00 PM",
    "Otello",
    "Verdi",
    "Robert",
    "Emily (Emilia)",
    "“She’s lost a handkerchief…”",
  ],
  [
    "2:00 PM",
    "Carmen",
    "Bizet",
    "Emily",
    "Joe (Don José)",
    "“.. left with a faded flower?”",
  ],
  [
    "5:00 PM",
    "Orlando",
    "Handel",
    "Joe",
    "Angie (Angelica)",
    "“the visitor pleads temporary insanity”",
  ],
  [
    "1:00 PM",
    "Nixon in China",
    "Adams",
    "Angie",
    "Pat [Nixon]",
    "“In the Summer Palace she has a vision…”",
  ],
  [
    "6:00 PM",
    "Don Giovanni",
    "Mozart",
    "Pat",
    "[Donna] Anna",
    "“Guess who’s coming to dinner.”",
  ],
  [
    "7:00 PM",
    "Ariadne auf Naxos",
    "Strauss",
    "Anna",
    "Nettie (Zerbinetta)",
    <>
      “Fireworks are guaranteed, <strong>and the dance ends here.</strong>”
    </>,
  ],
];

const StyledTable = styled.table`
  margin: 1em 0;
  table-layout: fixed;
  border-collapse: collapse;
  th {
    background-color: var(--purple-300);
  }
  tr:not(:first-child):nth-child(2n) {
    background-color: var(--purple-200);
  }
  tr:nth-child(2n + 1) {
    background-color: var(--purple-100);
  }
  th:first-child {
    width: 100px;
  }
  th:nth-child(2) {
    width: 200px;
  }
  th:nth-child(5) {
    width: 200px;
  }
  th,
  td {
    padding: 0 1em;
  }
`;

const Solution = (): JSX.Element => {
  return (
    <>
      <p>
        These are plot summaries for well-known operas, presented alphabetically
        by composer. The “soap opera” titles provide additional clues either to
        the plot of the opera (“Love is Blind”) or something about the composer
        (“For the Love of Mike” → Amadeus).
      </p>
      <p>
        However, each description describes a character using an incorrect name.
        Reordering so that each description follows the one where its
        (Anglicised) name properly belongs creates a chain, and the initial
        letters of the opera titles spell out{" "}
        <PuzzleAnswer>LA GIOCONDA</PuzzleAnswer>.
      </p>
      <p>
        The 60-minute run times and the chain of names also subtly suggest{" "}
        <Mono>THE DANCE OF THE HOURS</Mono>, which is a famous ballet sequence
        in the opera <i>La Gioconda</i>.
      </p>
      <HScrollTableWrapper>
        <StyledTable>
          <tr>
            <th>Time</th>
            <th>Opera</th>
            <th>Composer</th>
            <th>Name</th>
            <th>Correct Name</th>
            <th>Excerpt</th>
          </tr>
          {DATA.map(
            ([time, opera, composer, name, correctName, extract], i) => (
              <tr key={i}>
                <td>{time}</td>
                <td>
                  <strong>{opera.slice(0, 1)}</strong>
                  {opera.slice(1)}
                </td>
                <td>{composer}</td>
                <td>{name}</td>
                <td>{correctName}</td>
                <td>{extract}</td>
              </tr>
            ),
          )}
        </StyledTable>
      </HScrollTableWrapper>
    </>
  );
};

export default Solution;
