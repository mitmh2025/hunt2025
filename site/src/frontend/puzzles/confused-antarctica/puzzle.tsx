import React from "react";
import { styled } from "styled-components";
import {
  COPY_ONLY_CLASS,
  NO_COPY_CLASS,
} from "../../components/CopyToClipboard";
import LinkedImage from "../../components/LinkedImage";
import { Errata } from "../../components/StyledUI";
import a from "./assets/A.svg";
import b from "./assets/B.svg";
import c from "./assets/C.svg";
import d from "./assets/D.svg";
import e from "./assets/E.svg";
import f from "./assets/F.svg";
import g from "./assets/G.svg";
import h from "./assets/H.svg";
import i from "./assets/I.svg";
import j from "./assets/J.svg";
import k from "./assets/K.svg";
import l from "./assets/L.svg";
import m from "./assets/M.svg";
import n from "./assets/N.svg";
import o from "./assets/O.svg";
import p from "./assets/P.svg";
import q from "./assets/Q.svg";
import r from "./assets/R.svg";
import s from "./assets/S.svg";
import t from "./assets/T.svg";
import u from "./assets/U.svg";
import v from "./assets/V.svg";
import w from "./assets/W.svg";
import x from "./assets/X.svg";
import y from "./assets/Y.svg";
import z from "./assets/Z.svg";
import example from "./assets/example.svg";
import image from "./assets/image.png";

const ASSETS_AND_CLUES: { image: string; alt: string; clue: string }[] = [
  {
    image: a,
    alt: "a",
    clue: "Sudden discharge of a volt-ampere, delivered by an electric fly swatter (4 3)",
  },
  {
    image: b,
    alt: "b",
    clue: "Visually-alliterative informal-conversation talk-show hosted by Sonny Bono’s ex-wife (4 4)",
  },
  { image: c, alt: "c", clue: "Presentation about a parasitic arachnid (4 4)" },
  {
    image: d,
    alt: "d",
    clue: "Variant of the cracker used in s’mores that takes almost no time at all to make (5-6)",
  },
  {
    image: e,
    alt: "e",
    clue: "Filter that is inferior to Photoshop’s smart defocus (4 4)",
  },
  {
    image: f,
    alt: "f",
    clue: "Indian street food made of ginger cookies covered with spices and chutney (4 5)",
  },
  {
    image: g,
    alt: "g",
    clue: "Small island off the coast of Florida known for its rich deposits of NaOH (3 3)",
  },
  { image: h, alt: "h", clue: "“I already finished that book” (4 2)" },
  {
    image: i,
    alt: "i",
    clue: "Stannous alloy used to make the individual loops in a chain (4 3)",
  },
  { image: j, alt: "j", clue: "Competin’ or strivin’ for superiority (4’)" },
  {
    image: k,
    alt: "k",
    clue: "Cylindrical pipe with a semicircular bend in the middle, joining two parallel sections (1-4)",
  },
  {
    image: l,
    alt: "l",
    clue: "You messily-drawn Roald Dahl character, be quiet (4, 3)",
  },
  {
    image: m,
    alt: "m",
    clue: "Reading for a course that explains the difference between a waxing and a waning moon (5 4)",
  },
  {
    image: n,
    alt: "n",
    clue: "Check to see what division the boxer nicknamed “Big Daddy” should be fighting in (5 4)",
  },
  { image: o, alt: "o", clue: "Cincinnati’s baseball team (3 4)" },
  {
    image: p,
    alt: "p",
    clue: "Spool of film from Jerry Seinfeld’s animated movie (3 4)",
  },
  {
    image: q,
    alt: "q",
    clue: "It’s-so-cold sound made by April Parker Jones on Bel-Air (2 3)",
  },
  {
    image: r,
    alt: "r",
    clue: "Place to buy bow ties, scarves, chokers and other items made for a particular body part (4 5)",
  },
  { image: s, alt: "s", clue: "Harmonious triad of insults (3 5)" },
  {
    image: t,
    alt: "t",
    clue: "Violent and unlawful overthrow of a government (4)",
  },
  { image: u, alt: "u", clue: "Miss Hilton, just deal with it (5, 4)" },
  {
    image: v,
    alt: "v",
    clue: "Line of people at a pool hall waiting for their sticks (3 5)",
  },
  {
    image: w,
    alt: "w",
    clue: "What Trey Songz wants you to say, if it comes from deep down in your abdominal area (4 3)",
  },
  { image: x, alt: "x", clue: "Former spouse (2)" },
  {
    image: y,
    alt: "y",
    clue: "Lab animals walk back and forth nervously (4 4)",
  },
  {
    image: z,
    alt: "z",
    clue: "Break or ceasefire declared in a gripping-flesh-tightly-using-the-finger-and-thumb battle (5 4)",
  },
];

const WORD_BANKS: string[][] = [
  [
    "AL",
    "AROMATICS",
    "ARRAY",
    "BAD BLAKE",
    "BLUE BLOODS",
    "BONOMO",
    "BOW WOW",
    "BUG EYED",
    "CORONER",
  ],
  [
    "CRAB CAKE",
    "DREAMER",
    "DWEEB",
    "ED WOOD",
    "ENVY",
    "ERODED",
    "ESP TEST",
    "KEELY",
    "KINGS ROOK",
  ],
  [
    "REESE",
    "ROSOCHATE",
    "SKY",
    "SPONGEBOB",
    "SWINTHIN",
    "THINNISH",
    "TRI INDEX",
    "UBUNTU",
    "W",
  ],
];

const StyledImg = styled(LinkedImage)`
  height: 1em;
`;

const LargeParen = styled.span`
  font-size: 24px;
`;

const Flex = styled.div`
  display: flex;
  align-items: center;
`;

const FlexGap = styled(Flex)`
  gap: 8px;
`;

const Centered = styled(Flex)`
  margin: 2em 0;
  flex-direction: column;
  flex-wrap: wrap;
`;

const CenteredRow = styled(Flex)`
  justify-content: center;
  gap: 2em;
`;

const WordBank = styled.div`
  display: flex;
  flex-direction: column;
`;

const Monospace = styled.span`
  font-family: "Roboto Mono", monospace;
`;

const Puzzle = (): JSX.Element => {
  return (
    <>
      <Errata
        errata={[
          {
            timestamp: "January 19, 3:50 PM",
            message:
              "The alphabetized list at the end below previously had one item out of alphabetical order. The items are now correctly sorted in alphabetical order.",
          },
        ]}
      />
      {ASSETS_AND_CLUES.map(({ image, alt, clue }, i) => (
        <FlexGap key={i} className={NO_COPY_CLASS}>
          <Flex>
            <StyledImg src={image} alt={alt} />
            <LargeParen>{")"}</LargeParen>
          </Flex>
          <div>{clue}</div>
        </FlexGap>
      ))}
      <table className={COPY_ONLY_CLASS}>
        {ASSETS_AND_CLUES.map(({ image, alt, clue }, i) => (
          <tr key={i}>
            <td>
              <img src={image} alt={alt} />
            </td>
            <td>{clue}</td>
          </tr>
        ))}
      </table>
      <hr />
      <Centered>
        <Monospace className={NO_COPY_CLASS}>USELESS</Monospace>
        <Monospace className={NO_COPY_CLASS}>EXAMPLE</Monospace>
        <div className={COPY_ONLY_CLASS}>
          <Monospace>USELESS EXAMPLE</Monospace>
        </div>
        <LinkedImage
          className={NO_COPY_CLASS}
          src={example}
          alt="Stick figure with lettered purple nodes over joints in its body"
        />
      </Centered>
      <img
        className={COPY_ONLY_CLASS}
        src={example}
        alt={"Stick figure with lettered purple nodes over joints in its body"}
      />
      <CenteredRow className={NO_COPY_CLASS}>
        {WORD_BANKS.map((wordBank, i) => (
          <WordBank key={i}>
            {wordBank.map((word, j) => (
              <span key={j}>{word}</span>
            ))}
          </WordBank>
        ))}
      </CenteredRow>
      <table className={COPY_ONLY_CLASS}>
        {WORD_BANKS.flatMap((wordBank) => wordBank).map((word, i) => (
          <tr key={i}>
            <td>{word}</td>
          </tr>
        ))}
      </table>
      <Centered>
        <LinkedImage
          className={NO_COPY_CLASS}
          src={image}
          alt="Mardi Gras beads on a bust"
        />
      </Centered>
      <img
        className={COPY_ONLY_CLASS}
        src={image}
        alt="Mardi Gras beads on a bust"
      />
    </>
  );
};

export default Puzzle;
