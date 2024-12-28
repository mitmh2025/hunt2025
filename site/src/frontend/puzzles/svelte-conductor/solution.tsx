import React from "react";
import { styled } from "styled-components";
import LinkedImage from "../../components/LinkedImage";
import { Mono, PuzzleAnswer } from "../../components/StyledUI";
import { Aside } from "../unique-australia/solution";
import kengrexal_0 from "./assets/solution/The-Oversight-reflexmate-kengrexal-0.svg";
import kengrexal_1 from "./assets/solution/The-Oversight-reflexmate-kengrexal-1.svg";
import kengrexal_2 from "./assets/solution/The-Oversight-reflexmate-kengrexal-2.svg";
import nikilauda_0 from "./assets/solution/The-Oversight-reflexmate-nikilauda-0.svg";
import nikilauda_1 from "./assets/solution/The-Oversight-reflexmate-nikilauda-1.svg";
import nikilauda_2 from "./assets/solution/The-Oversight-reflexmate-nikilauda-2.svg";
import samgaksan_0 from "./assets/solution/The-Oversight-reflexmate-samgaksan-0.svg";
import samgaksan_1 from "./assets/solution/The-Oversight-reflexmate-samgaksan-1.svg";
import samgaksan_2 from "./assets/solution/The-Oversight-reflexmate-samgaksan-2.svg";
import skyreplay_0 from "./assets/solution/The-Oversight-reflexmate-skyreplay-0.svg";
import skyreplay_1 from "./assets/solution/The-Oversight-reflexmate-skyreplay-1.svg";
import skyreplay_2 from "./assets/solution/The-Oversight-reflexmate-skyreplay-2.svg";
import zakynthos_0 from "./assets/solution/The-Oversight-reflexmate-zakynthos-0.svg";
import zakynthos_1 from "./assets/solution/The-Oversight-reflexmate-zakynthos-1.svg";
import zakynthos_2 from "./assets/solution/The-Oversight-reflexmate-zakynthos-2.svg";
import background from "./assets/solution/The-Oversight-shell.svg";

// Reused in Alias solution
export type Board = {
  image: string;
  alt: string;
};

export type Blunder = {
  feeder: string;
  board0: Board;
  board1: Board;
  board2: Board;
  white_move: string;
  black_move: string;
};

const BLUNDERS: Blunder[] = [
  {
    feeder: "SAMGAKSAN",
    board0: {
      image: samgaksan_0,
      alt: "A starchess board with a black pawn at 7, black queen at 11, white king at 26, black bishop at 34, black king at 36, and white knight at 37.",
    },
    board1: {
      image: samgaksan_1,
      alt: "A starchess board with a black pawn at 7, black queen at 11, white knight at 25, white king at 26, black bishop at 34, and black king at 36.",
    },
    board2: {
      image: samgaksan_2,
      alt: "A starchess board with a black pawn at 7, black queen at 14, white knight at 25, white king at 26, black bishop at 34, and black king at 36.  Black checkmates white.",
    },
    white_move: "N25",
    black_move: "Q14",
  },
  {
    feeder: "KENGREXAL",
    board0: {
      image: kengrexal_0,
      alt: "A starchess board with a white king at 1, white knight at 6, black pawn at 7, black queen at 11, white rook at 21, black bishop at 34, and black king at 36.",
    },
    board1: {
      image: kengrexal_1,
      alt: "A starchess board with a white king at 1, black pawn at 7, black queen at 11, white knight at 15, white rook at 21, black bishop at 34, and black king at 36.",
    },
    board2: {
      image: kengrexal_2,
      alt: "A starchess board with a white king at 1, black pawn at 7, black queen at 15, white rook at 21, black bishop at 34, and black king at 36.  Black checkmates white.",
    },
    white_move: "N15",
    black_move: "Q15",
  },
  {
    feeder: "NIKI LAUDA",
    board0: {
      image: nikilauda_0,
      alt: "A starchess board with a white knight at 1, white king at 6, black pawn at 7, black queen at 11, black bishop at 34, and black king at 36.",
    },
    board1: {
      image: nikilauda_1,
      alt: "A starchess board with a white knight at 5, white king at 6, black pawn at 7, black queen at 11, black bishop at 34, and black king at 36.",
    },
    board2: {
      image: nikilauda_2,
      alt: "A starchess board with a white knight at 5, white king at 6, black pawn at 7, black queen at 13, black bishop at 34, and black king at 36.  Black checkmates white.",
    },
    white_move: "N5",
    black_move: "Q13",
  },
  {
    feeder: "ZAKYNTHOS",
    board0: {
      image: zakynthos_0,
      alt: "A starchess board with a white king at 6, black pawn at 7, black queen at 13, white knight at 21, black bishop at 34, and black king at 36.",
    },
    board1: {
      image: zakynthos_1,
      alt: "A starchess board with a white king at 6, white knight at 7, black queen at 13, black bishop at 34, and black king at 36.",
    },
    board2: {
      image: zakynthos_2,
      alt: "A starchess board with a black bishop at 1, white king at 6, white knight at 7, black queen at 13, and black king at 36.  Black checkmates white.",
    },
    white_move: "N7",
    black_move: "B1",
  },
  {
    feeder: "SKY REPLAY",
    board0: {
      image: skyreplay_0,
      alt: "A starchess board with a white king at 2, black pawn at 7, black queen at 11, white rook at 12, white pawn at 26, black bishop at 34, and black king at 36.",
    },
    board1: {
      image: skyreplay_1,
      alt: "A starchess board with a white king at 6, black pawn at 7, black queen at 11, white rook at 12, white pawn at 26, black bishop at 34, and black king at 36.",
    },
    board2: {
      image: skyreplay_2,
      alt: "A starchess board with a black queen at 4, white king at 6, black pawn at 7, white rook at 12, white pawn at 26, black bishop at 34, and black king at 36.  Black checkmates white.",
    },
    white_move: "K6",
    black_move: "Q4",
  },
];

const BlunderTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  tbody tr td {
    width: 33%;
    border-top: 1px solid var(--black);
    text-align: center;
    font-family: "Roboto Mono", monospace;
  }
  tbody tr:last-child td {
    border-bottom: 1px solid var(--black);
  }
`;

export const BlundersTable = ({ blunders }: { blunders: Blunder[] }) => {
  return (
    <BlunderTable>
      <tbody>
        {blunders.map((blunder) => {
          return (
            <tr key={blunder.feeder}>
              <td>
                {blunder.feeder}
                <LinkedImage
                  src={blunder.board0.image}
                  alt={blunder.board0.alt}
                />
              </td>
              <td>
                {blunder.white_move}
                <LinkedImage
                  src={blunder.board1.image}
                  alt={blunder.board1.alt}
                />
              </td>
              <td>
                {blunder.black_move}
                <LinkedImage
                  src={blunder.board2.image}
                  alt={blunder.board2.alt}
                />
              </td>
            </tr>
          );
        })}
      </tbody>
    </BlunderTable>
  );
};

const Solution = () => {
  return (
    <>
      <p>
        First, in the spirit of The Background Check, solvers should check the
        background of the webpage and discover the texture conceals a smaller
        hexagonal grid located within the center hexagon. The background is an
        SVG and, though not an essential step, its markup reveals the content is
        in an easily isolated definition for solver convenience:
      </p>
      <LinkedImage
        src={background}
        alt="A Starchess board composed of 37 hexagons arranged in the shape of a six-pointed star, with a black pawn at position 7, a black queen at position 11, a black bishop at position 34, a black king at position 36, and nine white question marks at positions 1, 2, 6, 12, 21, 26, 31, 35 and 37."
      />

      <p>
        Searching for hexagonal chess variants should quickly reveal this to be
        a board for{" "}
        <a href="http://www.polgarstarchess.com/Rules/ENRules.html">
          Polgar Starchess
        </a>
        . The tagged corner indicates space 1, confirming the orientation of the
        board.
      </p>

      <p>
        The feeders to this metapuzzle are those associated with Ferdinand’s
        time in Egypt. This may be determined in several ways:
      </p>
      <ul>
        <li>
          Ferdinand calls himself “The Seer,” clueing “The Oversight”. (His
          pseudonymous given name Apis is an Egyptian bull god, in the spirit of
          Ferdinand the Bull, and is pure flavor.)
        </li>
        <li>
          This group of answers are all nine letters long, corresponding to the
          nine question marks in the shell.
        </li>
        <li>
          Pawns that have moved to the left- or right-most hexes in Polgar
          Starchess are referred to as mummies, which are commonly associated
          with Egypt.
        </li>
        <li>
          Solvers may simply have assigned the other two groupings to
          sub-metapuzzles first.
        </li>
      </ul>
      <p>The feeders (in given order) are:</p>
      <ul>
        <li>
          <Mono>SAMGAKSAN</Mono>
        </li>
        <li>
          <Mono>KENGREXAL</Mono>
        </li>
        <li>
          <Mono>NIKI LAUDA</Mono>
        </li>
        <li>
          <Mono>ZAKYNTHOS</Mono>
        </li>
        <li>
          <Mono>SKY REPLAY</Mono>
        </li>
      </ul>

      <p>
        Solvers are likely to notice that the answers all have nine letters and
        contain K. Interpreting K, Q, B, R, N, and P as chess pieces using their
        usual notation (and other letters as no piece), the white question marks
        can be filled with white chess pieces from left to right. In this way,
        each answer yields a unique Starchess board. (Additional confirmation
        may be derived from no R appearing in the first, second, eighth, or
        ninth index, as such configurations would be unreachable in play.)
      </p>
      <p>
        The title and call to action are suggestive of{" "}
        <a href="https://en.wikipedia.org/wiki/Blunder_(chess)">blunders</a>.
        Investigation of the boards (and possibly intuition that a check of the
        background should naturally uncover a background <em>check</em>) reveals
        the extent of Ferdinand’s penchant for self-destruction — in all cases,
        white has a unique move which allows an immediate black checkmate (a
        semi-reflexmate in one).
      </p>
      <p>
        The final three moves of each game — the encoded starting board, white
        blunder, and black checkmate — are as follows:
      </p>
      <BlundersTable blunders={BLUNDERS} />

      <p>
        Starchess spaces are identified using numbers from 1 to 37 instead of
        rank-and-file. In the given order of puzzles, interpreting as letters
        the spaces to which the black pieces move to deliver checkmate spells
        the answer <PuzzleAnswer>NOMAD</PuzzleAnswer>.
      </p>

      <Aside>
        <h3>A brief aside: Special thanks</h3>
        <p>
          The author would like to extend a special thanks to Evan Broder for
          scripting a validator for this puzzle.
        </p>
      </Aside>
    </>
  );
};

export default Solution;
