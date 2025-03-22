import { type PuzzleDefinition } from "../types";
import Puzzle from "./puzzle";
import router from "./server";
import Solution from "./solution";

const puzzle: PuzzleDefinition = {
  title: "Follow The Rules",
  slug: "follow_the_rules",
  code_name: "right-palm",
  initial_description:
    "An interactive interface with a grid of toggle switches and a grid of lights",
  answer: "MATCHBOOK",
  authors: ["Leland Aldridge"],
  editors: [
    "Elan Blaustein",
    "Michele Pratusevich",
    "Robin Deits",
    "Tanya Khovanova",
  ],
  additional_credits: [
    {
      for_what: "Tech",
      who: ["Drew Fisher"],
    },
  ],
  content: {
    component: Puzzle,
    entrypoint: "puzzle_right_palm",
    copyable: false,
  },
  solution: {
    component: Solution,
  },
  hints: [
    {
      order: 0.0,
      description:
        "Solvers are at the beginning of the puzzle or have found the self-returning grid by accident",
      keywords: ["beginning", "start", "accident"],
      nudge:
        "Clicking on the squares on the left grid changes the brightness of the square you clicked on. When you do this, the numbered squares in the right grid also change brightness. The behavior of each numbered square can be determined independently of the other numbered squares.",
    },
    {
      order: 20.0,
      description:
        "Solvers understand that the numbered squares represent independent rules but do not know what they are trying to do",
      keywords: ["bottom", "goal"],
      nudge:
        "Your first goal is to make the entire row of circles bright. How many circles are lit depends on the state of both the left- and right-hand grids.",
    },
    {
      order: 30.0,
      description:
        "Solvers have considered the previous hint but need more explicit instruction",
      keywords: ["still", "circles"],
      nudge:
        "The circles count how many of the nine positions in the two grid are equal brightness. To light up all nine circles, the left-hand and right-hand grids must be identical.",
    },
    {
      order: 50.0,
      description:
        "Solvers know that they want the left and right grids to match and need help achieving this",
      keywords: ["match", "search"],
      nudge:
        "If you have a full understanding of what determines the brightnesses of all the right-hand squares, it is possible to deduce the input grid which will produce a matching output grid. To start, try considering the cells in positions 1, 5, and 9 to narrow your possibilities.",
    },
    {
      order: 70.0,
      description:
        "Solvers have intentionally found the matching grid and revealed the additional number grids",
      keywords: ["additional", "extra", "numbers"],
      nudge:
        "Note that the first grid of numbers in the revealed box is the same as the numbering on the output grid. What if the numbering were to be different?",
    },
    {
      order: 80.0,
      description:
        "Solvers have intentionally matched the input and output grid and did not find the previous hint useful",
      keywords: ["explicit", "more"],
      nudge:
        "The numbers on the grid are tied to specific rules. If you shuffled those around, the target grid you found would no longer match the output grid. What grids would match the output grids in each of the cases given?",
    },
    {
      order: 100.0,
      description: "Solvers have found all five target grids",
      keywords: ["extraction"],
      nudge:
        "Each cell has three states: off, dim, and bright. Try thinking about the grids that you have found row by row.",
    },
  ],
  canned_responses: [],
  // #!if TARGET !== "client" || !ARCHIVE_MODE
  router,
  // #!endif
};

export default puzzle;
