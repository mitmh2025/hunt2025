import React from "react";
import { styled } from "styled-components";
import LinkedImage from "../../components/LinkedImage";
import solution from "./assets/solution.png";

const FlexWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Mono = styled.span`
  font-family: monospace;
`;

const StyledTable = styled.table`
  border-collapse: collapse;
  margin: 1em 0;
  tr:nth-child(4n),
  tr:nth-child(4n + 1) {
    background-color: var(--gold-200);
  }
  tr:first-child {
    background-color: var(--gold-400);
  }
  th,
  td {
    padding: 0 8px;
  }
`;

const DATA: [
  combinedClue: string,
  clue: string,
  answer: string,
  matchWord: string,
  antonym: string,
  symbol: string,
][] = [
  [
    "QUIET REFORMED BELIEVER",
    "REFORMED BELIEVER",
    "PROTESTANT",
    "QUIET",
    "LOUD",
    "fortissimo",
  ],
  ["GAME HOT SHOWER", "GAME SHOWER", "CONTESTANT", "HOT", "COLD", "snowflake"],
  ["DANGEROUS JOB", "JOB", "PROFESSION", "DANGEROUS", "SAFE", "safe"],
  [
    "PRIEST’S DAY JOB",
    "PRIEST’S JOB",
    "CONFESSION",
    "DAY",
    "NIGHT",
    "Starry night",
  ],
  ["HAPPY STATE", "STATE", "PROVINCE", "HAPPY", "SAD", "sad face"],
  ["WIN GIRL OVER", "WIN OVER", "CONVINCE", "GIRL", "BOY", "Mars symbol"],
  [
    "MEASURE RIGHT ANGLE",
    "MEASURE ANGLE",
    "PROTRACT",
    "RIGHT",
    "LEFT",
    "left arrow",
  ],
  [
    "HEAVY LEGAL DOCUMENT",
    "LEGAL DOCUMENT",
    "CONTRACT",
    "HEAVY",
    "LIGHT",
    "lightbulb",
  ],
  ["GO TOWARD EXIT", "GO TOWARD", "PROGRESS", "EXIT", "ENTER", "return key"],
  [
    "WHITE SALAMANDER GROUP",
    "SALAMANDER GROUP",
    "CONGRESS",
    "WHITE",
    "BLACK",
    "black square",
  ],
  ["PARADE GROUND", "PARADE", "PROCESSION", "GROUND", "SKY", "blue sky"],
  [
    "STADIUM’S LAST STAND",
    "STADIUM’S STAND",
    "CONCESSION",
    "LAST",
    "FIRST",
    "gold medal",
  ],
  ["MAKE MONEY CLEAN", "MAKE MONEY", "PROFIT", "CLEAN", "DIRTY", "dirty dish"],
  ["SLOW COOK DRY", "SLOW COOK", "CONFIT", "DRY", "WET", "Wet dude"],
  ["DEEP DEATH", "DEEP", "PROFOUND", "DEATH", "BIRTH", "stork w/ baby"],
  ["EMPTY STUMP", "STUMP", "CONFOUND", "EMPTY", "FULL", "full person"],
  ["FEAR RESULT", "RESULT", "PRODUCT", "FEAR", "COURAGE", "cowardly dog"],
  [
    "MOVE ELECTRONS CLOSE",
    "MOVE ELECTRONS",
    "CONDUCT",
    "CLOSE",
    "OPEN",
    "open door",
  ],
];

const Solution = (): JSX.Element => {
  return (
    <>
      <FlexWrapper>
        <div>
          <p>
            The first thing solvers should notice is that one word in each clue
            can be paired as an antonym with one of the thumbnails on the
            connect-the-dots grid, such as “DAY” from “Priest’s Day Job” pairing
            with the Starry Night image.
          </p>
          <p>
            The remainder of the clue can clue a word starting with PRO or CON,
            so “Priest’s Job” is CONFESSION. Pairing up the pros and cons allows
            solvers to draw lines in the grid.
          </p>
          <p>
            Reading the letters on the lines from top to bottom says{" "}
            <Mono>READ THE EXACTLY OPPOSITE LETTERS</Mono>.
          </p>
          <p>
            Each of those letters has one exactly opposite it across the battle
            line. Reading these spells{" "}
            <Mono>SECOND OF PROSTITUTION GIVES THIS</Mono>.
          </p>
          <p>
            The last step is repeating the mechanic and replacing PROSTITUTION
            with CONSTITUTION. The “second of constitution” is the amendment
            that gives the{" "}
            <Mono>
              <strong>RIGHT TO BEAR ARMS</strong>
            </Mono>
            , the answer, which matches the enumeration at the bottom.
          </p>
        </div>
        <LinkedImage
          src={solution}
          alt="Two columns of clipart flanking a bunch of scattered capital letters, on either side of a vertical red line. Lines are drawn between pairs of clipart items on either side of the center red line."
        />
      </FlexWrapper>
      <StyledTable>
        <tr>
          <th>Combined Clue</th>
          <th>Clue</th>
          <th>Answer</th>
          <th>Match Word</th>
          <th>Antonym</th>
          <th>Symbol</th>
        </tr>
        {DATA.map((datum, i) => (
          <tr key={i}>
            {datum.map((cell, j) => (
              <td key={`${i}-${j}`}>{cell}</td>
            ))}
          </tr>
        ))}
      </StyledTable>
    </>
  );
};

export default Solution;
