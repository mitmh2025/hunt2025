import React, { type ReactNode } from "react";
import { styled } from "styled-components";
import LinkedImage from "../../components/LinkedImage";
import { Math, MI, MN, MO, MSub, MSup } from "../../components/MathML";
import { Mono, PuzzleAnswer } from "../../components/StyledUI";
import finalStageBoard from "./assets/FinalStageBoard_solution.png";
import finalStageCalculations from "./assets/FinalStageCalculations_solution.png";
import stage0 from "./assets/Stage0_solution.png";
import stage1 from "./assets/Stage1_solution.png";
import stage2 from "./assets/Stage2_solution.png";
import stage3 from "./assets/Stage3_solution.png";

const StyledTable = styled.table`
  margin: 1em 0;
  th,
  td {
    padding-right: 8px;
  }
`;

const TRANSITION_PROBABILITIES = "transition-probabilities";
const DETAILED_BALANCE_ID = "detailed-balance";

const StyledDiv = styled.div`
  margin: 1em 0;
`;

const Centered = styled(StyledDiv)`
  display: flex;
  justify-content: space-around;
`;

const AreaX = (): JSX.Element => {
  return (
    <MSub>
      <MSup>
        <MI>Area</MI>
      </MSup>
      <MSup>
        <X />
      </MSup>
    </MSub>
  );
};

const AreaY = (): JSX.Element => {
  return (
    <MSub>
      <MSup>
        <MI>Area</MI>
      </MSup>
      <MSup>
        <Y />
      </MSup>
    </MSub>
  );
};

const AreaZ = (): JSX.Element => {
  return (
    <MSub>
      <MSup>
        <MI>Area</MI>
      </MSup>
      <MSup>
        <Z />
      </MSup>
    </MSub>
  );
};

const CenteredMath = ({ children }: { children: ReactNode }): JSX.Element => {
  return (
    <Centered>
      <Math>{children}</Math>
    </Centered>
  );
};

const D = (): JSX.Element => {
  return <MI>D</MI>;
};

const Dx = (): JSX.Element => {
  return (
    <MSub>
      <MSup>
        <MI>d</MI>
      </MSup>
      <MSup>
        <X />
      </MSup>
    </MSub>
  );
};

const Dz = (): JSX.Element => {
  return (
    <MSub>
      <MSup>
        <MI>d</MI>
      </MSup>
      <MSup>
        <Z />
      </MSup>
    </MSub>
  );
};

const Min = ({ children }: { children: ReactNode }): JSX.Element => {
  return (
    <>
      <MO>min</MO>
      <MO>{"{"}</MO>
      {children}
      <MO>{"}"}</MO>
    </>
  );
};

const P = (): JSX.Element => {
  return <MI>P</MI>;
};

const Pi = (): JSX.Element => {
  return <MI>𝜋</MI>;
};

const PiX = (): JSX.Element => {
  return (
    <MSub>
      <MSup>
        <Pi />
      </MSup>
      <MSup>
        <X />
      </MSup>
    </MSub>
  );
};

const PiY = (): JSX.Element => {
  return (
    <MSub>
      <MSup>
        <Pi />
      </MSup>
      <MSup>
        <Y />
      </MSup>
    </MSub>
  );
};

const Pxy = (): JSX.Element => {
  return (
    <MSub>
      <MSup>
        <P />
      </MSup>
      <MSup>
        <MI>xy</MI>
      </MSup>
    </MSub>
  );
};

const Pyx = (): JSX.Element => {
  return (
    <MSub>
      <MSup>
        <P />
      </MSup>
      <MSup>
        <MI>yx</MI>
      </MSup>
    </MSub>
  );
};

const Pxz = (): JSX.Element => {
  return (
    <MSub>
      <MSup>
        <P />
      </MSup>
      <MSup>
        <MI>xz</MI>
      </MSup>
    </MSub>
  );
};

const SigmaX = (): JSX.Element => {
  return (
    <MSub>
      <MSup>
        <MI>∑</MI>
      </MSup>
      <MSup>
        <X />
      </MSup>
    </MSub>
  );
};

const SigmaZ = (): JSX.Element => {
  return (
    <MSub>
      <MSup>
        <MI>∑</MI>
      </MSup>
      <MSup>
        <Z />
      </MSup>
    </MSub>
  );
};

const Wxy = (): JSX.Element => {
  return (
    <MSub>
      <MSup>
        <MI>w</MI>
      </MSup>
      <MSup>
        <MI>xy</MI>
      </MSup>
    </MSub>
  );
};

const Wyx = (): JSX.Element => {
  return (
    <MSub>
      <MSup>
        <MI>w</MI>
      </MSup>
      <MSup>
        <MI>yx</MI>
      </MSup>
    </MSub>
  );
};

const X = (): JSX.Element => {
  return <MI>x</MI>;
};

const Y = (): JSX.Element => {
  return <MI>y</MI>;
};

const Z = (): JSX.Element => {
  return <MI>z</MI>;
};

const Solution = (): JSX.Element => {
  return (
    <>
      <p>
        Solvers are presented with a series of chess positions, accompanied by
        some abstract graphs with annotations. The Stage 0 positions/boards are
        simple, each having a single White piece; Stage 1 adds some Black
        pieces; Stage 2 introduces squares of different sizes; and Stage 3
        boards have infinitely many squares that are infinitesimally small! In
        common to all stages is the terminology: Proposals, Acceptances,
        Expected return.
      </p>
      <p>
        After some analysis of the information presented, solvers should
        diagnose that the vertices of the abstract graphs represent the states
        of possible squares that the White chess piece can visit, and the edges
        between vertices represent the possible valid moves available between
        the different squares. In Stages 0 & 1 where the squares are all the
        same size, the edges all have weight 1. Moreover, the proposals and
        acceptances specify a mechanism for moving the White chess piece around
        the board in a random fashion, as follows: from the current square, a
        new square to move to is proposed (for Stages 0 and 1, chosen
        “uniformly” at random from the available valid moves) then the proposed
        move is subsequently accepted with some probability (for Stages 0 and 1,
        with probability 100%). [In the later stages, there are varying edge
        weights between the squares of differing sizes and the
        proposal/acceptance probabilities are more complicated.]
      </p>
      <p>
        The information given presents a static representation of a particular
        Discrete Time Markov Chain (DTMC), known as the Metropolis–Hastings
        algorithm, which is a commonly used Markov chain Monte Carlo method for
        sampling from a probability distribution that is otherwise hard to
        sample from directly. Guiding solvers towards this discovery is the
        proposal/acceptance terminology used in the puzzle, including the
        blackboard bold ℙ to mean probability, the words “Monte Carlo” in the
        title, as well as the acrostic “DTMC” given in the title. The general
        Metropolis–Hastings algorithm works by constructing a reversible Markov
        chain whose stationary distribution coincides with the required
        probability distribution which is to be sampled from. In this puzzle, we
        are given the transition probabilities{" "}
        <Math>
          <Pxy />
        </Math>
        = probability that the next accepted square is{" "}
        <Math>
          <Y />
        </Math>{" "}
        given that the current square is{" "}
        <Math>
          <X />
        </Math>
        , via the proposal/acceptance rules, and from this we can calculate the
        stationary distribution (notation{" "}
        <Math>
          <Pi />
        </Math>{" "}
        is commonly used for this, and appears in the annotations to the
        abstract graphs in the examples). The stationary distribution of a
        Markov chain satisfies{" "}
        <Math>
          <SigmaX />
          <PiX />
          <Pxy />
          <MO>=</MO>
          <PiY />
        </Math>{" "}
        for all states y, which can be solved to find 𝜋, but here 𝜋 is most
        easily found by solving the{" "}
        <span id={DETAILED_BALANCE_ID}>detailed balance equation</span> for each
        edge xy:{" "}
        <Math>
          <PiX />
          <Pxy />
          <MO>=</MO>
          <PiY />
          <Pyx />
        </Math>
        , which must hold since the Metropolis–Hastings Markov chain is a
        “reversible” Markov chain.
      </p>
      <p>
        In Stages 0 and 1, the proposals and acceptances are such that the
        Markov chain being defined can be viewed as a random walk on the
        abstract graph: at each step, from current vertex{" "}
        <Math>
          <X />
        </Math>
        , the White piece moves to a neighbouring vertex y chosen uniformly at
        random from the set of neighbours of{" "}
        <Math>
          <X />
        </Math>
        . This means that{" "}
        <Math>
          <Pxy />
          <MO>=</MO>
          <MN>1</MN>
          <MO>/</MO>
          <Dx />
        </Math>{" "}
        for each edge{" "}
        <Math>
          <X />
          <Y />
        </Math>
        , where{" "}
        <Math>
          <Dx />
        </Math>{" "}
        is the degree = number of neighbours of{" "}
        <Math>
          <X />
        </Math>
        . Then the{" "}
        <a href={`#${DETAILED_BALANCE_ID}`}>detailed balance equations</a> will
        hold if{" "}
        <Math>
          <PiX />
        </Math>{" "}
        is proportional to{" "}
        <Math>
          <Dx />
        </Math>
        , i.e.,{" "}
        <Math>
          <PiX />
          <MO>=</MO>
          <Dx />
          <MO>/</MO>
          <SigmaZ />
          <Dz />
        </Math>{" "}
        since then the LHS and RHS of{" "}
        <a href={`#${DETAILED_BALANCE_ID}`}>the detailed balance equation</a>{" "}
        both equal{" "}
        <Math>
          <MN>1</MN>
          <MO>/</MO>
          <SigmaZ />
          <Dz />
        </Math>
        .
      </p>
      <p>
        This is confirmed in the example graphs in Stages 0 and 1, where the
        blue 𝜋-values are indeed proportional to the degrees of the vertices.
      </p>
      <p>
        Note that the stationary distribution can be calculated by hand
        (“manually”) without the need to simulate the Monte Carlo method, as
        recommended by the title!
      </p>
      <p>
        So, what exactly does the puzzle require solvers to calculate? The
        examples show a board and an “expected return” (using a blackboard bold
        𝔼, a common notation for expectation). A famous property satisfied by
        the stationary distribution (see, for example, the{" "}
        <a
          href="https://en.wikipedia.org/wiki/Discrete-time_Markov_chain"
          target="_blank"
          rel="noreferrer"
        >
          DTMC Wikipedia page
        </a>{" "}
        which is one of the top google hits for DTMC) is that{" "}
        <Math>
          <MN>1</MN>
          <MO>/</MO>
          <PiX />
        </Math>{" "}
        equals the expected return time (meaning number of steps taken) for the
        Markov chain started in state{" "}
        <Math>
          <X />
        </Math>{" "}
        to return to state{" "}
        <Math>
          <X />
        </Math>
        . It seems reasonable that this is what is required here, as confirmed
        by the examples: in Stage 0, for board P0 the King starts in a square
        with 𝜋-value of 1/3 and we are told the expected return time equals 3;
        in Stage 1, for board S1, the Rook starts in a square with{" "}
        <Math>
          <Pi />
        </Math>
        -value 2/23 and we are told the expected return time equals 23/2.
      </p>
      <p>
        For the remainder of Stage 0, solvers can practice their understanding
        of the puzzle mathematics by calculating the expected return times for
        the different pieces on the simple 3x3 chessboard. In this stage,
        solvers are also told about the rules of movement (which may seem
        unnecessary for such a simple board, but will be helpful for determining
        the movement of pieces in later stages where the boards get more
        complicated).
      </p>
      <p>Here are the abstract graphs and required calculations for Stage 0.</p>
      <LinkedImage
        src={stage0}
        alt="Hand-drawn diagrams showing all the graphs and calculations from Stage 0"
      />
      <p>
        Confirmation that the set of expected return times equals {"{"}
        6, 8, 9, 28/3, 40/3{"}"} should give solvers encouragement that they are
        understanding what to do! Also, during these calculations, solvers may
        realise that in fact the only relevant information needed about the
        graphs are the degrees of each vertex (rather than any other global
        structure of the graphs), in other words, the number of valid moves from
        each square.
      </p>
      <p>
        For Stage 1, we just record those degrees in the following calculations:
      </p>
      <LinkedImage
        src={stage1}
        alt="Hand-drawn diagram showing all the graphs and calculations from Stage 1"
      />
      <p>
        Looking up the letters in the “Intermezzo (checker board)” to the
        answers to boards A–C gives COR…, at which point solvers might believe
        that the word being spelt out is <Mono>CORRECT</Mono>.
      </p>
      <p>
        For Stage 2, the boards have squares of different sizes, the edges have
        varying weights and there is a new acceptance rule, so something
        different is happening. Here, not every proposed move is accepted: the
        acceptance rule states that the acceptance probability depends on the
        areas of the squares moved from and to, meaning that the acceptance
        probability is equal to 1 only for moves to squares whose area is at
        least as large as the current square. We are told that the expected
        return time is counted by the number of accepted moves, so we need to
        consider the Markov chain with transition probabilities{" "}
        <Math>
          <Pxy />
          <MO>=</MO>
        </Math>
        probability that the next accepted move is to square{" "}
        <Math>
          <Y />
        </Math>{" "}
        given that the current square is{" "}
        <Math>
          <X />
        </Math>
        . If{" "}
        <Math>
          <X />
        </Math>{" "}
        to{" "}
        <Math>
          <Y />
        </Math>{" "}
        and{" "}
        <Math>
          <X />
        </Math>{" "}
        to{" "}
        <Math>
          <Z />
        </Math>{" "}
        are valid moves then the acceptance rule implies that{" "}
        <span id={TRANSITION_PROBABILITIES}>
          transition probabilities will satisfy:
        </span>
      </p>
      <CenteredMath>
        <Pxy />
        <MO>/</MO>
        <Pxz />
        <MO>=</MO>
        <Min>
          <MN>1</MN>
          <MO>,</MO>
          <AreaY />
          <MO>/</MO>
          <AreaX />
        </Min>
        <MO>/</MO>
        <Min>
          <MN>1</MN>
          <MO>,</MO>
          <AreaZ />
          <MO>/</MO>
          <AreaX />
        </Min>
      </CenteredMath>
      <CenteredMath>
        <MO>=</MO>
        <Min>
          <AreaX />
          <MO>,</MO>
          <AreaY />
        </Min>
        <MO>/</MO>
        <Min>
          <AreaX />
          <MO>,</MO>
          <AreaZ />
        </Min>
      </CenteredMath>
      <p>
        and this ratio can be achieved by assigning a weight{" "}
        <Math>
          <Wxy />
          <MO>=</MO>
          <Min>
            <AreaX />
            <MO>,</MO>
            <AreaY />
          </Min>
          <MO>=</MO>
          <Wyx />
        </Math>{" "}
        to each edge{" "}
        <Math>
          <X />
          <Y />
        </Math>
        , and defining the random walk on the graph so that at each step, from
        current vertex{" "}
        <Math>
          <X />
        </Math>
        , the White piece moves to a neighbouring vertex{" "}
        <Math>
          <Y />
        </Math>
        chosen randomly with probability proportional to{" "}
        <Math>
          <Wxy />
        </Math>
        . In other words, if we set{" "}
        <Math>
          <Dx />
          <MO>=</MO>
          <MSub>
            <MSup>
              <MI>∑</MI>
            </MSup>
            <MSup>
              <Y />
              <MO>:</MO> <Y />
              <MO>~</MO>
              <X />
            </MSup>
          </MSub>
          <Wxy />
        </Math>{" "}
        to be a weighted degree (i.e., the sum over neighbours{" "}
        <Math>
          <Y />
        </Math>{" "}
        of{" "}
        <Math>
          <X />
        </Math>{" "}
        of the weights{" "}
        <Math>
          <Wxy />
        </Math>
        ), then the transition probabilities we require are{" "}
        <Math>
          <Pxy />
          <MO>=</MO>
          <Wxy />
          <MO>/</MO>
          <Dx />
        </Math>
        , and the{" "}
        <a href={`#${DETAILED_BALANCE_ID}`}>detailed balance equations</a> are
        satisifed for{" "}
        <Math>
          <PiX />
          <MO>=</MO>
          <Dx />
          <MO>/</MO>
          <D />
        </Math>{" "}
        where{" "}
        <Math>
          <D />
          <MO>=</MO>
          <SigmaZ />
          <Dz />
        </Math>
        , since{" "}
        <Math>
          <PiX />
          <Pxy />
          <MO>=</MO>
          <Wxy />
          <MO>/</MO>
          <D />
          <MO>=</MO>
          <Min>
            <AreaX />
            <MO>,</MO>
            <AreaY />
          </Min>
          <MO>/</MO>
          <D />
          <MO>=</MO>
          <Wyx />
          <MO>/</MO>
          <D />
          <MO>=</MO>
          <PiY />
          <Pyx />
        </Math>
      </p>
      <p>
        There is a free choice of scale, and setting the area of the smallest
        square to 1 gives the weights of 1 and 4 as given in the example graph
        for board S2. We see that in that example the{" "}
        <Math>
          <Pi />
        </Math>
        -values are indeed proportional to the weighted degrees (e.g., the
        vertex that the Rook starts on has weighted degree 4+1+1+1+1+1 = 9 and
        the total sum{" "}
        <Math>
          <D />
        </Math>{" "}
        of weighted degrees = 2 times the sum of all the edge weights = 72), and
        again the expected return time is the reciprocal of the 𝜋-value, and so
        the answer is 72/9 = 8.
      </p>
      <p>Stage 2 calculations (with weighted degrees given for each square):</p>
      <LinkedImage
        src={stage2}
        alt="Hand-drawn diagram showing all the graphs and calculations from Stage 2"
      />
      <p>
        For Stage 3 there is the added complication that the White piece might
        have infinitely many possible moves available from some squares, but new
        the proposal/acceptance rules mean that the proposal distribution is
        always well defined and again the{" "}
        <a href={`#${TRANSITION_PROBABILITIES}`}>
          transition probabilities satisfies equation
        </a>{" "}
        meaning that{" "}
        <Math>
          <PiX />
        </Math>{" "}
        can be calculated in exactly the same way as in Stage 2, by finding the
        edge weights and weighted degrees. This works since for all squares{" "}
        <Math>
          <X />
        </Math>
        , the sum over neighbours{" "}
        <Math>
          <Y />
        </Math>{" "}
        of{" "}
        <Math>
          <X />
        </Math>{" "}
        of the given expression for proposing{" "}
        <Math>
          <Y />
        </Math>{" "}
        when at{" "}
        <Math>
          <X />
        </Math>{" "}
        is always finite.
      </p>
      <p>
        Stage 3 calculations (it is not too difficult to calculate the weighted
        degree for all squares, but this is not necessary; only{" "}
        <Math>
          <Dx />
        </Math>{" "}
        for the start square{" "}
        <Math>
          <X />
        </Math>{" "}
        and{" "}
        <Math>
          <D />
          <MO>=</MO>
          <SigmaZ />
          <Dz />
        </Math>{" "}
        are needed, which can be more easily determined using the
        self-similarity of the infinite graphs):
      </p>
      <LinkedImage
        src={stage3}
        alt="Hand-drawn diagram showing all the graphs and calculations from Stage 3"
      />
      <p>
        Using the Intermezzo (checker board) solvers can check their answers to
        Stages 1–3:
      </p>
      <p>Num/Denom → letter in cell (row, col) = (Denom, Num)</p>
      <StyledTable>
        <tr>
          <td>A = 22/3</td>
          <td>→</td>
          <td>
            <Mono>C</Mono>
          </td>
        </tr>
        <tr>
          <td>B = 54/7</td>
          <td>→</td>
          <td>
            <Mono>O</Mono>
          </td>
        </tr>
        <tr>
          <td>C = 20/3</td>
          <td>→</td>
          <td>
            <Mono>R</Mono>
          </td>
        </tr>
        <tr>
          <td>D = 23/4</td>
          <td>→</td>
          <td>
            <Mono>R</Mono>
          </td>
        </tr>
        <tr>
          <td>E = 88/15</td>
          <td>→</td>
          <td>
            <Mono>E</Mono>
          </td>
        </tr>
        <tr>
          <td>F = 32/5</td>
          <td>→</td>
          <td>
            <Mono>C</Mono>
          </td>
        </tr>
        <tr>
          <td>G = 16/3</td>
          <td>→</td>
          <td>
            <Mono>T</Mono>
          </td>
        </tr>
      </StyledTable>
      <p>
        <Mono>CORRECT</Mono>!—which confirms to solvers that they have
        calculated the return times correctly.
      </p>
      <p>
        For the Final Stage, solvers should order the times for boards A–G from
        slowest (tortoise = 1) to fastest (hare = 7), i.e., from largest return
        time to smallest:
      </p>
      <StyledTable>
        <tr>
          <th>1</th>
          <th>2</th>
          <th>3</th>
          <th>4</th>
          <th>5</th>
          <th>6</th>
          <th>7</th>
        </tr>
        <tr>
          <td>B(7.71)</td>
          <td>A(7.33)</td>
          <td>C(6.67)</td>
          <td>F(6.4)</td>
          <td>E(5.87)</td>
          <td>D(5.75)</td>
          <td>G(5.33)</td>
        </tr>
      </StyledTable>
      <p>
        Combining the boards according to the given arrangement yields the final
        board (using red highlighting to show which squares are
        occupied/attacked by Black pieces):
      </p>
      <LinkedImage
        src={finalStageBoard}
        alt="A fractal chesboard, showing the solution from the final stage."
      />
      <p>
        The instructions “Final stage expected returns” tell solvers to
        recalculate the return times for each White piece (one per board from
        the original A–G) on the final board. Happily, since the Black pieces
        across the various boards attack a lot of the final board (here the
        rules of movement need applying correctly!) the calculations are simpler
        than might first appear!
      </p>
      <p>Final Stage calculations:</p>
      <LinkedImage
        src={finalStageCalculations}
        alt="Hand-written calculations for the final stage."
      />
      <p>
        Ordering again from slowest (largest) to fastest (smallest) and looking
        up in the checker board gives:
      </p>
      <StyledDiv>
        <div>
          <pre>
            <Mono>
              𝔼♔<sub>B</sub> = 6.8{"  "}= 34/5 → B
            </Mono>
          </pre>
        </div>
        <div>
          <pre>
            <Mono>
              𝔼♖<sub>D</sub> = 5.25 = 21/4 → L
            </Mono>
          </pre>
        </div>
        <div>
          <pre>
            <Mono>
              𝔼♖<sub>G</sub> = 5{"    "}= 5/1{"  "}→ I
            </Mono>
          </pre>
        </div>
        <div>
          <pre>
            <Mono>
              𝔼♔<sub>E</sub> = 4.6{"  "}= 23/5 → S
            </Mono>
          </pre>
        </div>
        <div>
          <pre>
            <Mono>
              𝔼♖<sub>C</sub> = 4{"    "}= 4/1{"  "}→ T
            </Mono>
          </pre>
        </div>
        <div>
          <pre>
            <Mono>
              𝔼♗<sub>F</sub> = 3.77 = 34/9 → E
            </Mono>
          </pre>
        </div>
        <div>
          <pre>
            <Mono>
              𝔼♘<sub>A</sub> = 2{"    "}= 2/1{"  "}→ R
            </Mono>
          </pre>
        </div>
      </StyledDiv>
      <p>
        giving a final answer of <PuzzleAnswer>BLISTER</PuzzleAnswer>.
      </p>
      <h3>Author’s note</h3>
      <p>
        An earlier version of this puzzle used the glorious pun “MITropolis to
        Hastings and back” for the title but this seemed to lead solvers down a
        simulation rabbit hole…hence the final version of the title as a
        desperate attempt to steer solvers on the right path! Hopefully it was
        successful, and sorry that you missed the pun until now!
      </p>
    </>
  );
};

export default Solution;
