import React from "react";
import { styled } from "styled-components";
import { NO_COPY_CLASS } from "../../components/CopyToClipboard";
import Crossword from "../../components/Crossword";

export const GRID = `.	.	1		2		3				4		5		.
.	.		.		.		.	.	.		.		.	
6								7	.	8				
	.		.		.		.		.		.		.	
9						.	10							
	.		.		.	11	.		.		.		.	
.	.	.	.	.	12									
	.	13	.	14	.		.		.		.		.	
15										.	.	.	.	
	.		.		.		.		.	16	.	17	.	
18								.	19					
	.		.		.		.	20	.		.		.	
21					.	22								
	.		.		.	.	.		.		.		.	.
.													.	.`
  .split("\n")
  .map((row) => row.split("\t"));

export const EXTRACTION_GRID = "     .    ".split("");

export const StyledCrossword = styled(Crossword)`
  margin: 0 auto 2rem auto;
`;

export const AnswerHeader = styled.h3`
  margin: auto;
  width: fit-content;
`;

const ACROSS_CLUES: [string, string][] = [
  [
    "6",
    "Graceful first couple of French to 15’s art in entrance to their private dwelling.",
  ],
  ["8", "15’s way, down with first hint of happening to embarrass."],
  ["9", "Against you and me trailing towards 15’s way."],
  [
    "12",
    "15’s bridge about first and second to commit error in specific legal question.",
  ],
  ["18", "10’s employer showing sign of hesitation about slapdash cleans."],
  [
    "19",
    "Sharing of office spaces in Irish city embracing descendant of 10’s initial.",
  ],
  ["21", "Pal’s trouser stud undone releasing a form of 15 sexual desires."],
  [
    "22",
    "Confounding endless math test with most of 15 was this when holding Madeleine.",
  ],
];

const DOWN_CLUES: [string, string][] = [
  ["1", "Who returned 10 to serve in another way, but ruling out second term."],
  ["2", "Place you might stroll while you 15, not completely full, sorry."],
  ["3", "Love borne by 10 when looking up former queen."],
  ["4", "Annoyed gangsta before broken date that’s occupying 10."],
  [
    "5",
    "Force 7 as described by rating or 10’s at sea before coasts of Lanarkshire.",
  ],
  [
    "7",
    "State of being odd, randomly interspersed, having removed all limits of 15.",
  ],
  [
    "11",
    "Pass books around leaderless country involved in 10’s scandal, making Prussian blue, possibly.",
  ],
  ["13", "For 10 these were twice lost causes, adopting couple of cubs."],
  [
    "14",
    "Special center for herdsmen between Estonia and Belarus, flies past, as time might when you 15.",
  ],
  ["16", "Stooge drinking bottomless coffee in part of 10’s state."],
  ["17", "Harbor of which students of Pliny might 15 capsized."],
  ["20", "Heart of district is 10’s ’hood."],
];

const PERIMETER_CLUES: [string, string][] = [
  ["", "Ride to take place around 10, starting late."],
  ["", "Clams not having 15’s factories beginning to stifle concern."],
  [
    "",
    "Chinese soup made by mixing egg with equal portion of all of 10’s names.",
  ],
  ["", "Happens to 15’s if backwards."],
  ["", "15’s article back after stew of the marriage bond."],
  [
    "",
    "You may 15 describe this as uncontainable, split apart from its surroundings.",
  ],
  ["", "Goodness remains when 10 has abandoned sculptor."],
  ["", "Recently made what’s last of all in 10 to lead partners."],
  ["", "Article that shows all-American missing starts of occasionally 15."],
  ["", "Concern the first to 15 at heart with the means but not starting."],
  ["", "10 first captured by lost cave painting of religious significance."],
  ["", "Awkward delivery when 10’s initials are regularly applied to couple."],
];

const ClueIndexTD = styled.td`
  font-weight: bold;
`;

const ClueNumberTD = styled(ClueIndexTD)`
  text-align: right;
  padding-right: 1em;
  vertical-align: text-top;
`;

const ClueTD = styled.td`
  padding-left: 10px;
`;

const ClueTable = styled.table`
  width: 100%;
`;

const ClueHeader = styled.h3`
  padding-bottom: 0;
`;

export const ClueBlock = ({
  header,
  clues,
  numbered = true,
}: {
  header: string;
  clues: [string, string][];
  numbered?: boolean;
}) => {
  return (
    <>
      <ClueHeader>{header}</ClueHeader>
      <ClueTable>
        <tbody>
          {clues.map(([id, clue]) => (
            <tr key={id}>
              {numbered ? (
                <ClueNumberTD>{id}</ClueNumberTD>
              ) : (
                <ClueIndexTD>{id}</ClueIndexTD>
              )}
              <ClueTD>{clue}</ClueTD>
            </tr>
          ))}
        </tbody>
      </ClueTable>
    </>
  );
};

const Footnote = styled.p`
  font-size: 12pt;
  font-style: italic;
`;

const Footer = (
  <>
    <Footnote>
      The Chambers Dictionary (2011) is the primary reference, but does not
      contain one foreign word, nor 19 (which is in the OED). Some entries are
      phrases in which each word is common, but the phrase may not be given.
    </Footnote>
    <Footnote>
      The puzzle will lead solvers to a specific piece of media, which is behind
      a paywall. Nothing behind the paywall is required or helpful for solving
      the puzzle.
    </Footnote>
    <Footnote>
      Clues use conventions common in British cryptics. Solvers may find e.g.{" "}
      <a href="https://crypticcrosswords.net/crosswords/usual-suspects/">
        Big Dave’s guide
      </a>{" "}
      to be a useful resource.
    </Footnote>
  </>
);

const NoPrint = styled.div`
  @media print {
    display: none;
  }
`;

const PrintContainer = styled.div`
  display: none;

  @media print {
    display: block;
    max-width: 100%;
    -webkit-print-color-adjust: exact !important;
    print-color-adjust: exact !important;
  }
`;

const PrintableCrossword = styled(Crossword)`
  zoom: 0.5;
`;

const PrintableClue = styled.td`
  padding-left: 1em;
  padding-right: 1em;
  text-indent: -1em;
`;

const PrintableClueHeader = styled.h3`
  font-weight: bold;
  padding-bottom: 0;
`;

const ScaledBlock = styled.div`
  zoom: 0.7;
`;

const PrintableClueTable = styled(ClueTable)`
  td {
    line-height: 1;
    padding-bottom: 0.2rem;
  }
`;

const PrintableClueBlock = ({
  header,
  clues,
  numbered = true,
}: {
  header: string;
  clues: [string, string][];
  numbered?: boolean;
}) => {
  return (
    <>
      <ScaledBlock>
        <PrintableClueHeader>{header}</PrintableClueHeader>
        <PrintableClueTable>
          <tbody>
            {clues.map(([id, clue]) => (
              <tr key={id}>
                <ClueNumberTD>{numbered ? id : "•"}</ClueNumberTD>
                <PrintableClue>{clue}</PrintableClue>
              </tr>
            ))}
          </tbody>
        </PrintableClueTable>
      </ScaledBlock>
    </>
  );
};

const PrintLeft = styled.div`
  width: 50%;
  float: left;
`;

const PrintRight = styled.div`
  width: 50%;
  float: right;
  margin-top: -8rem;
`;

const Puzzle = () => {
  return (
    <>
      <NoPrint>
        <StyledCrossword labels={GRID} />
        <AnswerHeader>Answer to submit:</AnswerHeader>
        <StyledCrossword labels={[EXTRACTION_GRID]} />
        <ClueBlock header="Across" clues={ACROSS_CLUES} />
        <ClueBlock header="Down" clues={DOWN_CLUES} />
        <ClueBlock
          header="Perimeter (to be placed where they fit)"
          clues={PERIMETER_CLUES}
          numbered={false}
        />
        <hr />
        {Footer}
      </NoPrint>
      <PrintContainer className={NO_COPY_CLASS}>
        <PrintLeft>
          <PrintableCrossword labels={GRID} />
          <PrintableClueBlock
            header="Perimeter (to be placed where they fit)"
            clues={PERIMETER_CLUES}
            numbered={false}
          />
        </PrintLeft>
        <PrintRight>
          <ScaledBlock>
            <PrintableClueHeader>Answer to submit:</PrintableClueHeader>
            <PrintableCrossword labels={[EXTRACTION_GRID]} />
          </ScaledBlock>
          <PrintableClueBlock header="Across" clues={ACROSS_CLUES} />
          <PrintableClueBlock header="Down" clues={DOWN_CLUES} />
          <hr />
          <ScaledBlock>{Footer}</ScaledBlock>
        </PrintRight>
      </PrintContainer>
    </>
  );
};

export default Puzzle;
