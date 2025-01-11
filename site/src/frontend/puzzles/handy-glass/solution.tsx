import React, { type CSSProperties } from "react";
import { styled } from "styled-components";
import Crossword, {
  reduceCoordinatesToIndices,
} from "../../components/Crossword";
import { Mono, PuzzleAnswer } from "../../components/StyledUI";
import {
  BARS_DOWN as SMALL_BARS_DOWN,
  BARS_RIGHT as SMALL_BARS_RIGHT,
  LABELS as SMALL_LABELS,
} from "./csorrowsd-gird/puzzle";
import { BARS_DOWN, BARS_RIGHT, LABELS } from "./puzzle";

const FILL = `
LFETCLAFUNLA
SBMAAPTOWSAR
EOTERAALKNEL
SAIMLDEROITT
PYONUPIANCSE
CUOLTFANNOTA
ISNRUERNNOOE
SIEFLELGHITS
THSITRYEVTEO
RCAELRRIALHH
OSETISATEERS
ATRSEDNSLSIA
`
  .split("\n")
  .slice(1, -1)
  .map((row) => row.split(""));

const HIGHLIGHTS = reduceCoordinatesToIndices(
  [
    { row: 1, col: 2 },
    { row: 1, col: 10 },
    { row: 2, col: 8 },
    { row: 3, col: 6 },
    { row: 4, col: 4 },
    { row: 4, col: 10 },
    { row: 5, col: 2 },
    { row: 5, col: 7 },
    { row: 6, col: 5 },
    { row: 6, col: 9 },
    { row: 7, col: 3 },
    { row: 7, col: 10 },
    { row: 8, col: 1 },
    { row: 9, col: 3 },
    { row: 10, col: 1 },
    { row: 10, col: 9 },
  ],
  12,
);

const ANSWERS_ACROSS = [
  [1, "This answer's position in the puzzle, horizontally", "LEFT"],
  [3, "A young bovine animal", "CALF"],
  [6, "Counterpart to the radius", "ULNA"],
  [8, "Brazilian dance style", "SAMBA"],
  [11, "A period of time after the cessation of conflict", "POSTWAR"],
  [14, "Shortstop Turner", "TREA"],
  [15, "Connector between shin and foot", "ANKLE"],
  [16, "Thailand's former appellation", "SIAM"],
  [17, "City where androids might become human", "DETROIT"],
  [18, "Slangily, a demand to settle a debt (2 words)", "PONY UP"],
  [20, "As a precaution (2 words)", "IN CASE"],
  [22, "Something an influencer might be chasing", "CLOUT"],
  [24, "Science fiction author who wrote for Star Trek", "FONTANA"],
  [26, "Underwriter or guarantor", "INSURER"],
  [28, "Would-be descriptor of Arya Stark (2 words)", "NO ONE"],
  [30, "Smartphone photograph, sometimes", "SELFIE"],
  [32, "“Friday Night ______” (football drama)", "LIGHTS"],
  [
    34,
    "What an Instagram rando might be when they like forty beach pictures in three minutes",
    "THIRSTY",
  ],
  [37, "Presidential right to override Congress", "VETO"],
  [39, "Like crystal and unlike mud", "CLEAR"],
  [40, "Something a skateboarder might grind down", "RAIL"],
  [41, "Ethnolinguistic region in the Greater Caucasus Mountains", "OSSETIA"],
  [42, "Forest fillers", "TREES"],
  [43, "Carney, Garfunkel, and Spiegelman", "ARTS"],
  [44, "They debatably justify the means", "ENDS"],
  [45, "Simpson sibling", "LISA"],
];

const ANSWERS_DOWN = [
  [1, "Pulitzer Prize winning novel by Andrew Sean Greer", "LESS"],
  [2, "What love may be, particularly second-hand", "EMOTION"],
  [
    3,
    "Variety of attaché that often served as official cover for those involved in espionage",
    "CULTURAL",
  ],
  [4, "Southern Calif. law enforcement organization", "LAPD"],
  [5, "Spanish word for a chrysanthemum or marigold", "FLOR"],
  [6, "Descriptor for a memorialized soldier in Arlington", "UNKNOWN"],
  [7, "Greatest partner?", "LATEST"],
  [9, "Swampy Louisiana body of water", "BAYOU"],
  [10, "Influential drum break from a 1969 song by The Winstons", "AMEN"],
  [
    12,
    "Mathematical function used in telecommunications that can be normalized or unnormalized",
    "SINC",
  ],
  [13, "Empathize (with)", "RELATE"],
  [15, "Television antenna that receives Britcoms?", "AERIAL"],
  [19, "Would rather", "PREFER"],
  [21, "Molecules which may trigger immune responses", "ANTIGENS"],
  [22, "Monte _____ sandwich", "CRISTO"],
  [23, "Barbell boosters, for example", "LIFTERS"],
  [
    25,
    "Minerals whose moniker literally translates as “egg stones”",
    "OOLITES",
  ],
  [27, "Coarse-grained metamorphic rock", "SCHIST"],
  [29, "Open-ended survey option", "OTHER"],
  [31, "Effortlessness", "EASE"],
  [33, "Possess", "HAVE"],
  [35, "Scrabble necessity", "TILE"],
  [36, "Long, winding, questionably plausible story", "YARN"],
  [38, "Workplace safety agency (abbreviation)", "OSHA"],
];

const Indent = styled.p`
  margin-left: 2em;
`;

const StyledCrossword = styled(Crossword)`
  margin-bottom: 1em;
`;

const StyledTable = styled.table`
  margin-bottom: 1em;
  th,
  td {
    text-align: left;
    padding-right: 1em;
  }
`;

const Solution = (): JSX.Element => {
  return (
    <>
      <p>This crossword references the “jumbled letters” meme:</p>
      <Indent>
        <i>
          Aoccdrnig to rscheearch at Cmabrigde uinervtisy, it deosn’t mttaer
          waht oredr the ltteers in a wrod are, the olny iprmoetnt tihng is taht
          the frist and lsat ltteres are at the rghit pclae. The rset can be a
          tatol mses and you can sitll raed it wouthit a porbelm. Tihs is
          bcuseae we do not raed ervey lteter by it slef but the wrod as a
          wlohe.
        </i>
      </Indent>
      <p>
        In this barred crossword, each clue is presented in this shuffled
        manner, and the clue answers must be entered into the grid in the same
        way (i.e., first and last letters are in the right place, letters in the
        middle are jumbled).
      </p>
      <p>
        Some middle letters end up in the right spots even after jumbling, and
        notably these letters are in the correct spots in both the across and
        down words that they are in. Extract those letters in grid order to read
        the message <Mono>MAKE US ONE OF THESE</Mono>. Upon submitting that,
        teams need to make a crossword puzzle in the same vein in order to get
        the answer to the puzzle, <PuzzleAnswer>[PLACEHOLDER]</PuzzleAnswer>.
      </p>
      <p>The filled in grid and clue answers are provided below:</p>
      <StyledCrossword
        labels={LABELS}
        fill={FILL}
        getAdditionalCellStyles={({ row, column }) => {
          const styles: CSSProperties = {};
          if (row === 0) {
            styles.borderTopWidth = "3px";
          }
          if (BARS_RIGHT?.[row]?.[column] === "|" || column === 11) {
            styles.borderRightWidth = "3px";
          }
          if (BARS_DOWN?.[row]?.[column] === "_" || row === 11) {
            styles.borderBottomWidth = "3px";
          }
          if (column === 0) {
            styles.borderLeftWidth = "3px";
          }
          if (HIGHLIGHTS.has(row * 12 + column)) {
            styles.backgroundColor = "#ffff00";
          }
          return styles;
        }}
      />
      <h3>Across</h3>
      <StyledTable>
        <tr>
          <th>#</th>
          <th>Unscrambled Clue</th>
          <th>Unscrambled Answer</th>
        </tr>
        {ANSWERS_ACROSS.map(([num, clue, answer]) => (
          <tr key={num}>
            <td>{num}</td>
            <td>{clue}</td>
            <td>{answer}</td>
          </tr>
        ))}
      </StyledTable>
      <h3>Down</h3>
      <StyledTable>
        <tr>
          <th>#</th>
          <th>Unscrambled Clue</th>
          <th>Unscrambled Answer</th>
        </tr>
        {ANSWERS_DOWN.map(([num, clue, answer]) => (
          <tr key={num}>
            <td>{num}</td>
            <td>{clue}</td>
            <td>{answer}</td>
          </tr>
        ))}
      </StyledTable>
      <p>
        And the grid given to solvers after submitting{" "}
        <Mono>MAKE US ONE OF THESE</Mono> was:
      </p>
      <Crossword
        labels={SMALL_LABELS}
        getAdditionalCellStyles={({ row, column }) => {
          const styles: CSSProperties = {};
          if (row === 0) {
            styles.borderTopWidth = "3px";
          }
          if (SMALL_BARS_RIGHT[row]?.[column] === "|" || column === 4) {
            styles.borderRightWidth = "3px";
          }
          if (SMALL_BARS_DOWN[row]?.[column] === "_" || row === 4) {
            styles.borderBottomWidth = "3px";
          }
          if (column === 0) {
            styles.borderLeftWidth = "3px";
          }
          return styles;
        }}
      />
    </>
  );
};

export default Solution;
