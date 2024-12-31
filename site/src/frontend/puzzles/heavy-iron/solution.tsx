import React from "react";
import { styled } from "styled-components";
import LinkedImage from "../../components/LinkedImage";
import { PuzzleAnswer, HScrollTableWrapper } from "../../components/StyledUI";
import logicSolution from "./assets/logic_solution.png";
import solutionGrid from "./assets/solution_grid.png";

const solvedLogicClues = [
  ["11A", "A Rambling Club member is Japanese/Chinese"],
  ["13A", "A Rambling Club member is a chef"],
  ["14A", "Neither Pat nor Priya is the chef"],
  ["23A", "Eddie is a male Rambling Club member"],
  ["28A", "Alec is not the chef"],
  ["38A", "Ann has a valet who is innocent"],
  ["45A", "Ms Earl is female but not Spanish"],
  ["49A", "Priya is French"],
  ["51A", "Daley is the brewer"],
  ["55A", "Eddie is Lin’s valet"],
  ["58A", "Ann is a Rambling Club member"],
  ["63A", "Either Ann or Alec has surname Clifton and is not the killer"],
  ["66A", "The Inuit is a chef"],
  ["68A", "The ensign is Indonesian"],
  ["5D", "Pat is not the Indonesian"],
  ["24D", "The Rambling Club has five members"],
  ["29D", "Priya is the murder victim and so not the murderer"],
  ["34D", "Lohan is a Rambling Club member"],
  ["36D", "The tiler is not French"],
  ["37D", "Pat is not the ensign"],
  ["43D", "Four of the Rambling Club members are suspects"],
  ["52D", "Lin is innocent"],
  ["56D", "Clifton is the ensign"],
];

const solvedClues = [
  [
    "11A",
    "Fungus coming from a common country with a Rambling Club member",
    "(f)ISHIER<",
  ],
  ["12A", "Conductor", "MA(E)ST + R(adi)O"],
  ["13A", "Rambler’s profession", "C.H.E.F. inits"],
  ["14A", "Glamour pic", "P(at) + INU + P(riya)"],
  ["15A", "String to keep track of your path", "(p)URL"],
  ["16A", "Bring home", "/URN/"],
  ["17A", "Tarry surface", "ASP + HALT"],
  ["18A", "Seeing through the scheme", "toON TOown"],
  ["19A", "Being gently moved", "(pl)EASED"],
  ["20A", "Left", "W + E + (dow)N + (righ)T"],
  ["22A", "Better", "(m)EN (c)HANCE"],
  ["23A", "Rambling man", "/EDDY/"],
  ["24A", "Crumbling Greek product", "F(ish) + ETA"],
  ["26A", "Fishy serving", "SUS + HI_"],
  ["28A", "Alec", "kALE Clearly"],
  ["29A", "Bursts", "POP’S + O + PEN"],
  ["32A", "Moved on from", "(l)OVER"],
  ["33A", "Spot on", "N_ + DELIA< + IT"],
  ["38A", "Inspector’s conclusion on Ann’s personal valet", "INN + <C NOTE>"],
  ["40A", "In the best way possible", "/I DEAL E/"],
  ["41A", "Hadean meadows", "<LOPHADES>"],
  ["42A", "Racing", "A FLUT(T)E + _R"],
  ["45A", "She’s no Spaniard", "<REAL>"],
  ["46A", "Source", "poEM A NATO Report contains"],
  ["49A", "When Priya is at home, handsome", "wannaBE AUthor"],
  ["51A", "Brewer", "D_(ALE)_Y"],
  ["53A", "Wooden train set", "BR(I)O"],
  ["55A", "What Eddie is to Lin", "ivanoV A LETter"],
  ["57A", "Fragmented images", "J(o->I)G+SAWS"],
  ["58A", "Years in Rome", "ANN + I_"],
  ["61A", "Pig sounds", "OI(N(ice))KS"],
  ["62A", "Fifteenth", "wIDESt"],
  ["63A", "Do something about it", "AC + <PUT> + ON"],
  ["64A", "Place to harden up or be fired", "NfLpIcK<"],
  ["65A", "Where the party starts for an adventure", "/IN/"],
  ["66A", "Chef", "IN + _U_ _I_ _T_"],
  ["67A", "Pirate’s favorite", "(f->G)ROG"],
  ["68A", "Ensign’s home", "J_ + AK(ART)A"],
  ["69A", "A narcissist", "stratEGO IS Top"],
  ["", "", ""],
  ["1D", "Threat", "<MEAN> + C + (m)E(mber)"],
  ["2D", "Online message boards", "US + <TEEN>"],
  ["3D", "Counterstrike", "<PISTO(L->R)> + E"],
  ["4D", "A sure thing", "<LEONDEAD>"],
  ["5D", "Can imagine how others feel", "<CHIME> around PAT"],
  [
    "6D",
    "With great emotion",
    "__R_ES overlap letters + PONS + (-effect)IVELY",
  ],
  ["7D", "Gas", "E + THAN + E"],
  ["8D", "The way to take", "RO(U)TE"],
  ["9D", "Web storage", "<COIL> + _U_ + _D"],
  ["10D", "Future installment", "(an)NEX + (a)TTI(c) + (pay)ME(nts)"],
  ["21D", "British doctors", "finals _N _H _S"],
  ["23D", "Some MIT grads", "thE EStablishment"],
  ["24D", "Size of the Rambling Club", "F + IVE"],
  ["25D", "Mode of transportation", "TAX + I"],
  ["27D", "Amherst institution", "UM + ASS"],
  ["29D", "Priya is the murder victim", "<PAIR+_Y>"],
  ["30D", "Jury", "<PLANE>"],
  ["31D", "In the aforementioned", "romanTIC POems<"],
  ["34D", "Rambling Club member", "oN A HOLiday<"],
  ["35D", "How Shakespeare describes someone’s action", "DI(e)D + S_T"],
  ["36D", "A rambler who’s not French", "iTwIlLfEaR"],
  ["37D", "Ripping", "TEA + RING + A_ + PA(R)T"],
  ["39D", "Close relative", "/NICE/"],
  ["43D", "Number of suspects in the Rambling Club", "/FOR/"],
  ["44D", "Reverse", "UN(_D)O"],
  ["47D", "&lit", "M + (w->E)ANDERS"],
  [
    "48D",
    "One who works diligently until winter (ref. The Ant and the Grasshopper)",
    "inits A.N.T.",
  ],
  ["49D", "Smart guy", "BRA + I + NIAC<"],
  ["50D", "Perfect", "ABS + O + LUTE"],
  ["52D", "Innocent Rambling Club member", "rambLINg"],
  ["54D", "Catches", "(-p)IG + /NIGHTS/"],
  ["56D", "Clifton’s rank", "ENS + sInGiNg"],
  ["57D", "Watercraft", "JET’S KI"],
  ["58D", "Request", "<FORSAK>"],
  ["59D", "Either way", "_N(OLOS<)_E"],
  ["60D", "Something to pluck", "BA + _N_ _J_ _O_"],
];

const MonoTD = styled.td`
  font-family: var(--monospace-font);
`;
const StyledTable = styled.table`
  margin: 0 auto 1rem auto;
  th {
    text-align: left;
  }
  td,
  th {
    padding: 0 0.5rem;
  }
`;

const StyledLinkedImage = styled(LinkedImage)`
  display: flex;
  margin: 1rem auto;
  img {
    margin: auto;
    max-width: 100%;
    width: inherit;
  }
`;

const Solution = () => {
  return (
    <>
      <p>
        This is presented as a cryptic crossword. And solvers should be able to
        solve a number of the cryptic clues without too much trouble. (Cryptic
        clue solutions are at the end of this document.) However, as they
        proceed, they may notice a number of clues whose answer is clear, but
        the solve requires a particular phrase to be interpreted as meaning
        something different. In many cases this yields a person’s name or
        surname, and in several cases the same phrase occurs - “Rambling Club
        member” or “rambler”.
      </p>
      <p>
        In the course of solving the crossword, the solvers assemble a set of
        hidden knowledge about a group of five people, the members of this
        fictional Rambling Club. And a shocking truth will emerge: a murder has
        taken place! 29 Down tells us that a Rambling Club member was killed by
        another, and 38 Across tells us an inspector is trying to work out who’s
        guilty.
      </p>
      <p>The information gathered by solving these clues, in total:</p>
      <HScrollTableWrapper>
        <StyledTable>
          {solvedLogicClues.map((clue, index) => (
            <tr key={index}>
              <td>{clue[0]}</td>
              <td>{clue[1]}</td>
            </tr>
          ))}
        </StyledTable>
      </HScrollTableWrapper>
      <p>
        (1D uses the phrase “Rambling Club”, but sneakily is using both words
        separately cryptically, not giving logic information.)
      </p>
      <p>
        This information forms an implicit{" "}
        <a
          href="https://en.wikipedia.org/wiki/Logic_puzzle#Logic_grid_puzzles"
          target="_blank"
          rel="noreferrer"
        >
          logic grid puzzle
        </a>
        , and the solvers should assemble the grid and solve it. They end up
        with the following solution to the implicit puzzle:
      </p>
      <StyledLinkedImage src={logicSolution} alt={"Solved logic puzzle"} />
      <p>
        Separately and in parallel, the solvers will notice when completing the
        grid that a phrase emerges in the suspicious unchecked letters around
        the edge of the grid. Starting at top left and reading clockwise, those
        letters say: MURDERER INFO ENTRY INTERSECTIONS GIVE ANSWER
      </p>{" "}
      <p>
        So finally the solvers need to identify which clues gave information
        about Pat Earl the murderous roof tiler; highlight those clues in the
        grid; and look at the places where two such clues’ answers intersect.
        There are four of those intersection points in the grid, and those
        letters in reading order spell out <PuzzleAnswer>PERP</PuzzleAnswer>,
        the final answer.
      </p>
      <StyledLinkedImage src={solutionGrid} alt={"Solved crossword grid"} />
      <HScrollTableWrapper>
        <StyledTable>
          <tr>
            <th>Clue</th>
            <th>Definition</th>
            <th>Wordplay</th>
          </tr>
          {solvedClues.map((clue, index) => (
            <tr key={index}>
              <td>{clue[0]}</td>
              <td>{clue[1]}</td>
              <MonoTD>{clue[2]}</MonoTD>
            </tr>
          ))}
        </StyledTable>
      </HScrollTableWrapper>
    </>
  );
};

export default Solution;
