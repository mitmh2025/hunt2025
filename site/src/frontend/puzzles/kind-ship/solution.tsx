import React from "react";
import { styled } from "styled-components";
import LinkedImage from "../../components/LinkedImage";
import {
  HScrollTableWrapper,
  Mono,
  PuzzleAnswer,
} from "../../components/StyledUI";
import solution from "./assets/solution.png";

const StyledTable = styled.table`
  margin: 1em 0;
  table-layout: fixed;
  width: 800px;
  font-family: "Roboto Mono", monospace;
  border-collapse: collapse;
  tr:first-child {
    background-color: var(--teal-300);
  }
  tr:nth-child(2n) {
    background-color: var(--teal-100);
  }
  td,
  th {
    padding: 0 8px;
    word-wrap: break-word;
    &:nth-child(2) {
      width: 8ch;
    }
  }
`;

const DATA = [
  {
    sett: "G2 R2 G4 P2 G4 N2 T2 G6 P2 G2 T4 Y2 P2 G8 R2 O2 G6 Y2 T2 O2 G4 Y2",
    filler: "G",
    blanks: "_R__P__NT___P_TTYP____RO___YTO__Y",
    quote: "creepsinthispettypacefromdaytoday",
  },
  {
    sett: "DO2 W2 B2 W4 DO2 W2 B2 W4 T2 O2 W6 N2 DT2 R2 O2 W2 B2 W8 R2 W2 B2 W2 R2 N2 W2 N2 W10 DR2 O2 N2 B2 W2 B4 W4",
    filler: "W",
    blanks: "DO_B__DO_B__TO___N_TRO_B____R_B__N_N______RONB_BB__",
    quote: "doubledoubletoilandtroublefireburnandcauldronbubble",
  },
  {
    sett: "W10 B2 O2 W2 G2 W2 T2 G2 O2 W6 N2 O2 P2 W2 N2 W2 O2 N2 W4 R2 O2 W10 O2 R2 T2 W2 O2 W2 P2 W2 O2 P2 W4",
    filler: "W",
    blanks: "____BO_G_TGO____NOP_N_ON__RO_____ORT_O_P_OP__",
    quote: "ihaveboughtgoldenopinionsfromallsortsofpeople",
  },
  {
    sett: "R2 T2 R6 T2 R6 T2 O2 R2 DB2 Y2 R2 N2 R6 O2 T2",
    filler: "R",
    blanks: "_T___T___TO_DBY_N___OT",
    quote: "itisataletoldbyanidiot",
  },
  {
    sett: "Y6 B2 Y2 T2 Y10 LN2 Y6 R2 Y4 N2 Y12 DB2 Y4 N2 T2 Y2 LG2 R2 Y4 T2 B2 Y2 R2 N2 Y4 W2 O4 DT2 O2 Y4 G2 Y6 N2 Y4 N2 Y2 N2 Y10",
    filler: "Y",
    blanks:
      "___B_T_____LN___R__N______DB__NT_LGR__TB_RN__WOODTO__G___N__N_N_____",
    quote:
      "macbethshallnevervanquishedbeuntilgreatbirnamwoodtohighdunsinanehill",
  },
  {
    sett: "K2 Y2 T2 K2 O2 K2 G2 K2 T2 W2 K2 O2 K8 R2 K4 R2 Y2 K2 T2 K4 B2 K2 T2 K4 N2 T2 K4 T2 K8",
    filler: "K",
    blanks: "_YT_O_G_TW_O____R__RY_T__B_T__NT__T____",
    quote: "mythoughtwhosemurderyetisbutfantastical",
  },
  {
    sett: "N2 B6 R2 B6 K2 B2 T2 B2 Y2 G2 O2 R2 Y2 B2 O2 B2 K2 B4 T2 B4",
    filler: "B",
    blanks: "N___R___K_T_YGORY_O_K__T__",
    quote: "nevershakethygorylocksatme",
  },
  {
    sett: "P2 O2 P4 T2 P4 N2 G2 W2 P4 K2 P2 DT2 P6 W2 P2 Y2 P2 O2 P6",
    filler: "P",
    blanks: "_O__T__NG___K_DT___W_Y_O___",
    quote: "somethingwickedthiswaycomes",
  },
  {
    sett: "T2 P2 O2 P12 O2 R2 O2 P8 R2 B2 P2 N2 G2 P2 R2 P2 O2 P2 B2 P2 O4 P4 N2 P8 T2 P2",
    filler: "P",
    blanks: "T_O______ORO____RB_NG___O_B_OO__N____T_",
    quote: "thoseclamorousharbingersofbloodanddeath",
  },
  {
    sett: "T2 K2 O2 K2 W2 O2 K8 T2 B2 K2 G2 R2 K4 T2 K2 R2 T2 N2 O2 T2 W2 K2 T2 K2 O2 K2 T2 K4 B2 K2 T2 K2 O2 N2 B2 K2 T2 W2 K2 T2 K2 O2 K2 T4 K8 LN2 K6",
    filler: "K",
    blanks: "T_O_WO____TB_GR__T_RTNOTW_T_O_T__B_T_ONB_TW_T_O_TT____LN___",
    quote: "thouwouldstbegreatartnotwithoutambitionbutwithouttheillness",
  },
  {
    sett: "Y2 O2 T10 LB2 T2 K2 T2 N2 G2",
    filler: "T",
    blanks: "YO_____LB_K_NG",
    quote: "youshallbeking",
  },
];

const Solution = (): JSX.Element => {
  return (
    <>
      <p>
        You are presented with eleven plaid squares, plus a small square next to
        the flavortext at the beginning and a tattered woven piece at the end.
        Each square is a 2/2 half-pivot twill—they’re not just plaid, they’re
        Scottish tartan. The title, despite the blanks, should be interpretable
        as “The Scottish Play”, a euphemism for <i>Macbeth</i>.
      </p>
      <p>
        The words “count” and “thread” in the flavortext clue “threadcount,” the
        format for describing a particular tartan pattern (also known as a
        “sett”). The word “register” confirms that solvers should use the
        threadcount spec listed on the Scottish Registry of Tartans (and all of
        the colors used in the plaid squares come from that source’s color
        palette).
      </p>
      <p>
        A threadcount consists of a series of pairs of letter codes and numbers.
        Each color has a code, usually one letter, but two letters in some cases
        (e.g. “DR” for dark red). Each number indicates how many threads are
        used in that color before the next stripe of some other color. Solvers
        can use this information to extract the threadcount for each of the
        eleven plaid squares.
      </p>
      <p>
        They should notice (as highlighted in the flavortext) that each one has
        a “background” color that appears disproportionately often. If the
        background color thread pairs are treated as blanks, the letters in each
        threadcount give a “wheel of fortune” for a quote from <i>Macbeth</i>,
        with the quotes in alphabetical order. As a 2/2 twill, each letter code
        corresponds to two threads’ width in the woven fabric.
      </p>
      <p>
        The sample plaid square next to the flavortext corresponds with the
        title of the puzzle. Together the title and sample plaid square
        establish the rules for interpreting the other squares.
      </p>
      <HScrollTableWrapper>
        <StyledTable>
          <tr>
            <th>Sett</th>
            <th>Filler</th>
            <th>Sett letters with blanks</th>
            <th>Quote</th>
          </tr>
          {DATA.map(({ sett, filler, blanks, quote }, i) => (
            <tr key={i}>
              <td>{sett}</td>
              <td>{filler}</td>
              <td>{blanks}</td>
              <td>{quote}</td>
            </tr>
          ))}
        </StyledTable>
      </HScrollTableWrapper>
      <p>
        The final extraction fabric image has a gray background with stripes in
        the colors of the “background” colors for the eleven plaid squares.
        Solvers insert each extracted Macbeth quote into the “grid” of the
        extraction image (again, with each letter having a width and height of
        two threads) on its background-colored stripe. The stripe is the exact
        length of the quote, confirming it. For the plaid squares that share a
        background color, the stripe is double the width, and the quote lengths
        indicate to solvers which quote goes first.
      </p>
      <LinkedImage
        src={solution}
        alt="Close-up of woven gray cloth, with quotes written horizontally across the weave. Some blocks of letters are circled. Those letters read MAKE US A TEAM TARTAN."
      />
      <p>
        To extract the final answer, read down the diagonal where the colors
        make solid squares. Where it’s a 1x1, solvers take just that one letter
        on the diagonal. But for the ones where it’s 2x2, solvers take all four
        letters.
      </p>
      <p>
        Reading the diagonal in this fashion results in the instruction{" "}
        <Mono>MAKE US A TEAM TARTAN</Mono>.
      </p>
      <p>
        Solvers design a tartan for their team, send it to HQ, and receive the
        answer, <PuzzleAnswer>CHIVIPANE</PuzzleAnswer>.
      </p>
    </>
  );
};

export default Solution;
