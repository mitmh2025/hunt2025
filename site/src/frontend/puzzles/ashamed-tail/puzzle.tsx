import React, { ReactNode } from "react";
import styled from "styled-components";

const Group = styled.div`
  margin: 1em 0;
`;

const GROUPS: ReactNode[][] = [
  [
    "choupiques (7)",
    "bound G. Greene (8,4)",
    "Asia folk (9)",
    "zany Joker movie (5,1,4)",
    "lying flat (10)",
    "Tuileries art exhibition (3,2,5)",
    "woman aide (4-2-7)",
    "act (10)",
    "TV Drew or Spade (7,12)",
  ],
  [
    "fawn hue (5)",
    "TX bloom (10)",
    "O (J. Priestley) (16,3)",
    "ria (7,6)",
    "eye imagizer dot (5)",
    "acid funk (10)",
    "avis (needing a queen?) (10)",
    "Idaho U.’s site (6)",
    "travel bags (12)",
    "power, control (10)",
  ],
  [
    "Go, E.O., verquere (5,4)",
    "we find e.g. Pisces (9,7)",
    "singularity radius (5,7)",
    "holiday in U.K. (3,6,3)",
    "to the max (2,8)",
    "Baltic (6)",
    "Japan (6)",
    "Brazil metro (3,2,7)",
    "not even law (4,2,5)",
    "doofer (6)",
  ],
  [
    "T end (7)",
    <>
      sings “<i>Abdulmajid</i>” (5)
    </>,
    "tea variety (10)",
    "_____ Chopin (8)",
    ">>> a few  (10)",
    "get upset (4,7)",
    "(one) ode (10)",
    <>
      warble “<i>Zoe</i>”, “<i>Geronimo</i>” (13)
    </>,
    "Inquisitor (10)",
    "Linux flavor (6)",
    "Thackeray (6,4)",
  ],
  [
    "fox (i.e. outwit, daze) (8)",
    <>
      <i>Rokeby Venus</i> painter (alt. sp.) (5,9)
    </>,
    "slogan of Henry V (4,2,3,5)",
    "E.U. HQ (8,10)",
    "dig & die (7)",
    "Co. Antrim area (5'1,8)",
    "“ice man” (4,5)",
    "Old West serial (3,9)",
    "biog. jug (4)",
  ],
];

const Puzzle = (): JSX.Element => {
  return (
    <>
      <p className="puzzle-flavor">Not really Bananagrams, either.</p>
      {GROUPS.map((group, i) => (
        <Group key={`group-${i}`}>
          {group.map((item, j) => (
            <div key={`item-${i}-${j}`}>{item}</div>
          ))}
        </Group>
      ))}
    </>
  );
};

export default Puzzle;
