import React from "react";
import { styled } from "styled-components";

const Mono = styled.span`
  font-family: monospace;
`;

const StyledTable = styled.table`
  td {
    padding: 0 8px;
  }
`;

const DATA = [
  {
    clue: "F---! Our cost: a tern. Er, sport I on.",
    letters: "FOURCOSTATERNERSPORTION",
    definition: "Four Corners portion",
    answer: "STATE",
    extraction: "A",
  },
  {
    clue: "Countersign a gel Abe? Ls!",
    letters: "COUNTERSIGNAGELABELS",
    definition: "Counter labels",
    answer: "SIGNAGE",
    extraction: "N",
  },
  {
    clue: "Jud, geo rap me a sure praise!",
    letters: "JUDGEORAPMEASUREPRAISE",
    definition: "Judge or appraise",
    answer: "MEASURE",
    extraction: "S",
  },
  {
    clue: "I stim; I'd to give Herbal Kings up port!",
    letters: "ISTIMIDTOGIVEHERBALKINGSUPPORT",
    definition: "Is timid to give her support",
    answer: "BALKING",
    extraction: "K",
  },
  {
    clue: "Expo interception: a lad vice.",
    letters: "EXPOINTERCEPTIONALADVICE",
    definition: "Exceptional advice",
    answer: "POINTER",
    extraction: "N",
  },
  {
    clue: "Thebes tel.: I teach? I ever!",
    letters: "THEBESTELITEACHIEVER",
    definition: "The best achiever",
    answer: "ELITE",
    extraction: "I",
  },
  {
    clue: "Comet ore-- as in Fe. 'Ron?",
    letters: "COMETOREASINFERON",
    definition: "Come to reason",
    answer: "INFER",
    extraction: "F",
  },
  {
    clue: "Verb at I'm as split era leech.",
    letters: "VERBATIMASSPLITERALEECH",
    definition: "Verbatim as speech",
    answer: "LITERAL",
    extraction: "E",
  },
  {
    clue: "A, the art of bravo: Welsh orchard!",
    letters: "ATHEARTOFBRAVOWELSHORCHARD",
    definition: "At heart of brash or chard",
    answer: "VOWEL",
    extraction: "W",
  },
  {
    clue: "Hew, hos! Elan dismal's wed emo.",
    letters: "HEWHOSELANDISMALSWEDEMO",
    definition: "He whose land is Malmo",
    answer: "SWEDE",
    extraction: "E",
  },
  {
    clue: "Int. hear lye we, eh? Ours!",
    letters: "INTHEARLYEWEEHOURS",
    definition: "In the wee hours",
    answer: "EARLY",
    extraction: "R",
  },
];

const Solution = (): JSX.Element => {
  return (
    <>
      <p>
        This puzzle is a reverse printer’s devilry. In a normal printer’s
        devilry, a nonsense phrase turns into a comprehensible phrase when the
        answer is added. In this reverse printer’s devilry, a nonsense phrase
        turns into a comprehensible phrase when the answer is removed. Each line
        contains the answer intermingled with the answer’s definition, with
        punctuation and spacing changed.
      </p>
      <p>
        The clues are given centered, and extracting an answer requires pulling
        a word from the midst of each clue. Additionally, each answer is an odd
        number of letters—either five or seven. This primes teams to extract the
        center letter. Doing so provides the phrase <Mono>ANSKNIFEWER</Mono>. By
        repeating the mechanic, teams extract{" "}
        <Mono>
          <strong>KNIFE</strong>
        </Mono>
        , the answer.
      </p>
      <StyledTable>
        <tr>
          <th>Clue</th>
          <th>Only Letters</th>
          <th>Definition</th>
          <th>Answer</th>
          <th>Center Letter</th>
        </tr>
        {DATA.map(({ clue, letters, definition, answer, extraction }, i) => (
          <tr key={i}>
            <td>{clue}</td>
            <td>{letters}</td>
            <td>{definition}</td>
            <td>
              <Mono>{answer}</Mono>
            </td>
            <td>
              <Mono>
                <strong>{extraction}</strong>
              </Mono>
            </td>
          </tr>
        ))}
      </StyledTable>
    </>
  );
};

export default Solution;
