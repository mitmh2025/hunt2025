import React from "react";
import { styled } from "styled-components";
import { PuzzleAnswer } from "../../components/StyledUI";
import {
  GRID,
  EXTRACTION_GRID,
  StyledCrossword,
  AnswerHeader,
  ClueBlock,
} from "./puzzle";

const MagazineTitle = styled.span`
  font-style: italic;
`;

const SOLUTION_FILL = [
  ["", "", "V", "E", "R", "O", "N", "I", "C", "A", "G", "E", "N", "G", ""],
  ["", "", "O", "", "U", "", "O", "", "", "", "R", "", "E", "", "T"],
  ["L", "I", "T", "H", "E", "S", "O", "M", "E", "", "A", "B", "A", "S", "H"],
  ["O", "", "E", "", "F", "", "R", "", "E", "", "T", "", "R", "", "E"],
  ["V", "E", "R", "S", "U", "S", "", "M", "R", "R", "E", "A", "G", "A", "N"],
  ["E", "", "S", "", "L", "", "C", "", "I", "", "D", "", "A", "", "E"],
  ["", "", "", "", "", "P", "O", "I", "N", "T", "O", "F", "L", "A", "W"],
  ["T", "", "C", "", "S", "", "L", "", "E", "", "N", "", "E", "", "Y"],
  ["R", "E", "A", "D", "P", "R", "O", "U", "S", "T", "", "", "", "", "O"],
  ["O", "", "U", "", "E", "", "R", "", "S", "", "M", "", "P", "", "R"],
  ["U", "N", "C", "L", "E", "S", "A", "M", "", "C", "O", "W", "O", "R", "K"],
  ["B", "", "U", "", "D", "", "N", "", "C", "", "J", "", "R", "", "E"],
  ["L", "U", "S", "T", "S", "", "T", "E", "A", "T", "A", "S", "T", "E", "R"],
  ["E", "", "E", "", "B", "", "", "", "L", "", "V", "", "U", "", ""],
  ["", "I", "S", "M", "Y", "B", "U", "S", "I", "N", "E", "S", "S", "", ""],
];

const SOLUTION_ANSWER = "JUGAL BONE".split("");

const SOLUTION_ACROSS: [string, string][] = [
  ["6", "LI(re) + T + ES (“(tu) es” = “(thou) art”) in HOME"],
  ["8", "A BAS + H(appening)"],
  ["9", "VERS + US"],
  ["12", "PO (I) NT + (c)O(mmit) + FLAW"],
  ["18", "anag. CLEANS in UM"],
  ["19", "O’ + W(ilson) in CORK"],
  ["21", "anag. (PALSTROUSERSTUD) less (READPROUST)"],
  ["22", "anag. (m)AT(h) TEST REA(d); “Proust was this...”"],
];

const SOLUTION_DOWN: [string, string][] = [
  ["1", "anag. TO SERV(e)"],
  ["2", "RUE [French street] + FUL(l)"],
  ["3", "O=love in RON reversed; Queen N. of Jordan"],
  ["4", "G + DATE anag. in RON"],
  ["5", "REAGAN anag. + L(anarkshir)E; “as described by [sailors]”"],
  ["7", "anagram of INTERSPERSED less R(ea)D P(rous)T"],
  ["11", "COL + (i)RAN in O(ld) T(estament)"],
  ["13", "CU(bs) in CAUSES; ref. Iowa caucuses"],
  ["14", "SP + EE + (her)DS(men) + BY"],
  ["16", "JAV(a) in MOE; ref. Three Stooges"],
  ["17", "anag. PROUST; Pliny’s letters mention “canal cut by the Emperor”"],
  ["20", "(lo)CALI(ty); Cali slang for California"],
];

const SOLUTION_PERIMETER: [string, string][] = [
  ["BONE", "(R)ON in BE"],
  ["BUSINESS", "B(read) + USINES + S(tifle)"],
  ["GENG", "anag. of EGG plus Ro(N)ald Wilso(N) Reaga(N)"],
  ["IS", "French SI (“if”) rev."],
  ["JUGAL", "JUG + LA rev."],
  ["LOVE", "(c)LOVE(n); “love is too big a thing ... to contain”"],
  ["MY", "MY(ron)"],
  ["NEW", "(Mr Reaga)N + E/W, bridge partners"],
  ["THE", "TH(O.R.P.)E"],
  ["TROUBLE", "T(he) + R(ead) + (pr)OU(st) + (a)BLE"],
  ["VERONICA", "RON + I, in CAVE anag."],
  ["YORKER", "RR “regularly” in YOKE; ref. cricket delivery"],
];

const Solution = () => {
  return (
    <>
      <p>
        The puzzle is a cryptic crossword. The perimeter clues refer to “
        <a
          href="https://www.newyorker.com/magazine/1984/10/01/love-trouble-is-my-business"
          target="_blank"
          rel="noreferrer"
        >
          Love Trouble Is My Business
        </a>
        ” by Veronica Geng, published in the print edition of the October 1,
        1984 issue of <MagazineTitle>The New Yorker</MagazineTitle>. Geng’s
        short story rises to a challenge quoted at the start of the piece –
        “This may be the only time in history in which the words ‘Mr. Reagan’
        and ‘read Proust’ will appear in the same sentence” – by including both
        pairs of words in (nearly) every sentence. Here, every clue references
        one of two unclued entries, 10-Across (“MR REAGAN”) and 15-Across (“READ
        PROUST”). The two perimeter answers remaining after the short story’s
        details are entered into the grid form the answer,{" "}
        <PuzzleAnswer>JUGAL BONE</PuzzleAnswer>.
        <p>
          <b>O, woe is me</b> = “love,” “trouble,” “is my business”
        </p>
      </p>
      <StyledCrossword labels={GRID} fill={SOLUTION_FILL} />
      <AnswerHeader>Answer to submit:</AnswerHeader>
      <StyledCrossword labels={[EXTRACTION_GRID]} fill={[SOLUTION_ANSWER]} />
      <ClueBlock header="Across" clues={SOLUTION_ACROSS} />
      <ClueBlock header="Down" clues={SOLUTION_DOWN} />
      <ClueBlock
        header="Perimeter (to be placed where they fit)"
        clues={SOLUTION_PERIMETER}
        numbered={false}
      />
      <hr />
      <p>Perimeter entries spell:</p>
      <ul>
        <li>Veronica Geng</li>
        <li>
          <i>The New Yorker</i>
        </li>
        <li>“Love Trouble is My Business”</li>
      </ul>
      <p>
        The two remaining perimeter answers, JUGAL and BONE, provide the
        solution.
      </p>
    </>
  );
};

export default Solution;
