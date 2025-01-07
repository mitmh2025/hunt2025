import React from "react";
import { styled } from "styled-components";
import LinkedImage from "../../components/LinkedImage";
import { PuzzleAnswer } from "../../components/StyledUI";
import chart1 from "./assets/chart1.png";
import chart10 from "./assets/chart10.png";
import chart11 from "./assets/chart11.png";
import chart12 from "./assets/chart12.png";
import chart13 from "./assets/chart13.png";
import chart14 from "./assets/chart14.png";
import chart2 from "./assets/chart2.png";
import chart3 from "./assets/chart3.png";
import chart4 from "./assets/chart4.png";
import chart5 from "./assets/chart5.png";
import chart6 from "./assets/chart6.png";
import chart7 from "./assets/chart7.png";
import chart8 from "./assets/chart8.png";
import chart9 from "./assets/chart9.png";
import solutiongrid from "./assets/solutiongrid.png";
import solutionmap1 from "./assets/solutionmap1.png";
import solutionmap2 from "./assets/solutionmap2.png";
import solutionmap3 from "./assets/solutionmap3.png";
import solutionmap4 from "./assets/solutionmap4.png";
import { CHART_ALT_TEXT } from "./puzzle";

const DATA: [string, string, string, string, string][] = [
  [chart1, "Kansas", "KS", "➖⚪", "S"],
  [chart2, "Texas", "TX", "⚪➖", "T"],
  [chart3, "Georgia", "GA", "➖⚪", "A"],
  [chart4, "Connecticut", "CT", "➖⚪", "T"],
  [chart5, "Nebraska", "NE", "➖⚪", "E"],
  [chart6, "Ohio", "OH", "⚪➖", "O"],
  [chart7, "Florida", "FL", "⚪➖", "F"],
  [chart8, "Utah", "UT", "⚪➖", "U"],
  [chart9, "Indiana", "IN", "➖⚪", "N"],
  [chart10, "Idaho", "ID", "➖⚪", "D"],
  [chart11, "Oregon", "OR", "➖⚪", "R"],
  [chart12, "Delaware", "DE", "➖⚪", "E"],
  [chart13, "South Dakota", "SD", "⚪➖", "S"],
  [chart14, "Mississippi", "MS", "➖⚪", "S"],
];

const StyledTable = styled.table`
  table-layout: fixed;
  margin: 1em 0;
  td {
    padding-right: 8px;
    text-align: center;
  }
  th:first-child {
    width: 200px;
  }
`;

const SizedImage = styled(LinkedImage)`
  display: block;
  width: 400px;
`;

const Solution = (): JSX.Element => {
  return (
    <>
      <p>
        In the puzzle, we see a variety of emojis, colored circles and some
        letters around a 25x25 matrix. This appears to be some sort of adjacency
        matrix of a non-symmetric nature, as shown by the differing labelling
        rows and columns. Using the clues of the 50 rows + columns, as well as
        the general red/blue/white coloring scheme of the graph and the MAP
        labelling, one may deduce this is related to an adjacency matrix of the
        50 US states. ✅ referring to two states being adjacent and ❌ being
        states that aren’t adjacent.
      </p>
      <p>
        The adjacency matrix now needs to be solved for the 50 US states. Alaska
        and Hawaii can be assigned straight away as the only two states without
        adjacencies, matching the A and H letters. We also have the letters MAP
        and AAA which can be used to help assign some states. Using the set of
        two symbols, we may conclude that state abbreviations are used for row
        and column cluing. Number of state adjacencies could also be researched
        to assist with solving the grid. Since there are only 50 rows and
        columns, we are not factoring in any territories or districts (such as
        DC).
      </p>
      <p>
        ⚪➖ shows state abbreviations where we need the first letter and ➖⚪
        shows state abbreviations where we need the last letter. They are
        arranged in alphabetical order according to the ⚪ letter by color
        group.
      </p>
      <p>
        M can be resolved to Missouri as it is the only state starting with M
        that has at least 6 other state adjacencies.
        <br />
        A can be limited to either Alabama, Arizona, or Arkansas.
        <br />P can be resolved to Pennsylvania, the only state starting with P.
      </p>
      <p>
        As the AAA states are in the ➖⚪ category, we need states that have A
        as the second letter in its abbreviation. So far this could be
        California, Georgia, Iowa, Louisiana, Massachusetts, Pennsylvania (ruled
        out due to the P), Virginia and Washington.
      </p>
      <p>Some other symbols can be resolved to assist with the grid:</p>
      <p>
        ⏺️ refers to states that aren’t directly adjacent but touch at a point.
        This suggests the Four Corners states (only one set is used in the
        grid):
      </p>
      <ul>
        <li>Utah ⏺️ New Mexico</li>
        <li>Arizona ⏺️ Colorado</li>
      </ul>
      <p>
        🌊 refers to maritime borders, of which there are three possibilities
        (all three are used in the grid):
      </p>
      <ul>
        <li>Rhode Island 🌊 New York</li>
        <li>Michigan 🌊 Illinois</li>
        <li>Michigan 🌊 Minnesota</li>
      </ul>
      <p>
        With this knowledge, we can slowly start filling out the adjacency
        matrix. There may be many different solve paths for the adjacency matrix
        and it isn’t necessary to use the alphabetical ordering of the states,
        although it is definitely useful.
      </p>
      <p>
        The adjacency matrix can be solved for the following state columns and
        rows (see end of solution for an example solve):
      </p>
      <LinkedImage
        src={solutiongrid}
        alt="An adjacency graph matrix, annotated with American states."
      />
      <p>
        Translating the four colors to a map of the US states gives the
        following four-color theorem logic puzzle to solve.
      </p>
      <LinkedImage
        src={solutionmap1}
        alt="A map of the United States, with some states colored red, yellow, green, or blue."
      />
      <p>
        The solution to the four color map is as below. (see end of solution for
        an example solve). Note we do not treat maritime borders or the four
        corners as adjacencies.
      </p>
      <LinkedImage
        src={solutionmap2}
        alt="A map of the United States, with all states colored either red, yellow, green, or blue."
      />
      <p>
        The color wheels can then be solved to give letters. Each color wheel
        represents a state and the surrounding states and their colors from the
        solved four color map (in roughly the same orientation as on a map of
        the US). The thicker black lines represent where adjacent states are
        interrupted (i.e. either by Canada, Mexico, oceans, lakes or the four
        corners).
      </p>
      <p>
        If the state is from the ⚪➖ category, we can take the first letter of
        the state abbreviation, if the state is from the ➖⚪ category, we can
        take the second letter of the state abbreviation. This gives the
        solution <PuzzleAnswer>STATE OF UNDRESS</PuzzleAnswer>.
      </p>
      <StyledTable>
        <tr>
          <th>Graph</th>
          <th>State</th>
          <th>Abbreviation</th>
          <th>Row/Col</th>
          <th>Letter</th>
        </tr>
        {DATA.map(([graph, state, code, side, letter], i) => (
          <tr key={i}>
            <td>
              <LinkedImage src={graph} alt={CHART_ALT_TEXT} />
            </td>
            <td>{state}</td>
            <td>{code}</td>
            <td>{side}</td>
            <td>
              <strong>{letter}</strong>
            </td>
          </tr>
        ))}
      </StyledTable>
      <h3>Solve path for adjacency matrix</h3>
      <p>
        We will notate rows with R and columns with C for this solution path.
      </p>
      <p>
        R1 🔴 (A) → AK;
        <br />
        R2 🔴 (H) → MO;
        <br />
        only two states with no other adjacent states, starting with A and H
        respectively
      </p>
      <p>
        R10 ⚪ (M) → MO; only state starting with M with at least 6 adjacent
        states
        <br />
        R12 ⚪ (P) → PA; only state starting with P
        <br />
        C8 🟡 → NY; only state with a maritime border 🌊 (NY/RI/MI/MN/IL) that
        also borders PA
        <br />
        R4 🔴 → RI; shares a maritime border 🌊 with NY
        <br />
        C8 🟡 → MI; only state with two maritime borders 🌊
      </p>
      <p>
        C23 ⚪, R15 ⚪, C5 🔵, C17 ⚪ and R3 🔴 can all be matched the remaining
        Northeastern states (VT/NH/ME/MA/CT).
        <br />
        R15 ⚪ → MA; only state from list with at least 4 other adjacent states
        <br />
        C23 ⚪ → CT; borders MA and RI
        <br />
        R3 🔴 → ME; only borders one other state and cannot be C5 🔵 (which
        borders MA)
        <br />
        C17 ⚪ → NH; borders ME
        <br />
        C5 🔵 → VT; remaining state that borders MA
        <br />
        R7 🟢 → NJ; remaining state that borders NY
        <br />
        C15 ⚪ → NH; remaining state that borders NJ
      </p>
      <p>
        C12 ⚪ (A) → VA; only remaining state code ending with A that is within
        3 states of PA
        <br />
        C10 ⚪ (A) → GA; only state code ending with A that shares 2 borders
        with VA
        <br />
        R22 ⚪ → TN; only state that borders GA and VA and has at least 5
        adjacent states (NC has 4)
        <br />
        R18 ⚪ → NC; remaining state that borders GA and VA
        <br />
        C2 🔵 → SC; remaining state that borders NC
        <br />
        R11 ⚪ (A) → AL; only state starting with A that borders GA
        <br />
        C4 🔵 → MS; remaining state that borders AL and TN
        <br />
        R6 🟢 → FL; remaining state that borders GA
      </p>
      <p>
        C24 ⚪ → KY; borders MO and TN (either KY or AR) and also shares a
        border with a maritime border state (IL)
        <br />
        C20 ⚪ → AR; remaining state that borders MO and TN
        <br />
        R14 ⚪ → IL; maritime border state adjacent to KY
        <br />
        R16 ⚪ → MN; remaining maritime border state with MI
        <br />
        C1 🔵 → IA; shares a border with MO, IL and MN
        <br />
        R9 🟢 → WI; shares a border with IA and MI
        <br />
        C19 ⚪ → IN; remaining state that borders IL
        <br />
        R20 ⚪ → OH; remaining state that borders IN
        <br />
        R25 ⚪ → WV; remaining that that borders VA and KY
        <br />
        C3 🔵 → MD; remaining state that borders PA and WV
      </p>
      <p>
        R13 ⚪ → CO; one of the four corner states ⏺️ (AZ/UT/CO/NM) and shares 3
        adjacent states with MO (3 adjacent states NE/KS/OK are C16 ⚪, C18 ⚪
        and C22 ⚪)
        <br />
        C25 ⚪ → AZ; opposite four corner state ⏺️ to CO
        <br />
        C11 ⚪ (A) → LA; remaining state code ending with A (CA/LA/WA) that is
        within 2 states of C18 (one of NE/KS/OK)
        <br />
        R23 ⚪ → TX; remaining state that borders LA
        <br />
        C18 ⚪ → OK; only state from NE/KS/OK that borders TX
        <br />
        R8 🟢 → NM; borders OK and AZ
      </p>
      <p>
        R21 ⚪ → SD; borders IA and borders one of NE/KS (but cannot be NE/KS)
        <br />
        C16 ⚪ → NE; borders SD (either NE/KS)
        <br />
        C22 ⚪ → KS; remaining state from NE/KS/OK
        <br />
        C9 🟡 → WY; remaining state that borders SD and CO
        <br />
        R24 ⚪ → UT; borders WY and AZ
      </p>
      <p>
        C14 ⚪ → ND; remaining state that borders MN and SD
        <br />
        R17 ⚪ → MT; remaining state that borders ND
        <br />
        C13 ⚪ → ID; remaining state that borders MT
        <br />
        R19 ⚪ → NV; remaining state that borders ID and AZ
        <br />
        R5 🔴 → WA; remaining state from list (CA/OR/WA) that doesn’t border NV
        (like C6 and C21)
        <br />
        C21 ⚪ → OR; remaining state that borders WA
        <br />
        C6 🟡 → WY; remaining state that borders NV
      </p>
      <h3>Solve path for four-color logic theorem</h3>
      <p>
        We do not treat maritime borders or the four corners as adjacencies for
        the four color theorem.
      </p>
      <p>
        Using standard four color logic, the Northeastern states can be filled
        in:
      </p>
      <SizedImage
        src={solutionmap3}
        alt="A four-colored map of the Northeast United States"
      />
      <p>
        Tennessee must be green, as Alabama and Georgia can only be either red
        or yellow and they are also adjacent, meaning they cannot be both red or
        both yellow, hence Tennessee is surrounded by red, yellow and blue.
      </p>
      <p>
        Similarly, Oklahoma must be blue, due to Missouri and Arkansas being
        either red or yellow and adjacent, and it borders green New Mexico.
        Colorado can then be filled in as red and some more standard logic
        follows:
      </p>
      <LinkedImage
        src={solutionmap4}
        alt="A partially four-colored map of the United States"
      />
      <p>
        Nevada must be red, as Utah and Idaho are either green or blue and are
        adjacent, and it borders yellow California. Arizona then resolves to
        blue and the rest of the grid can be filled in with standard logic.
      </p>
    </>
  );
};

export default Solution;
