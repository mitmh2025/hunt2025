import { type PuzzleDefinition } from "../types";
import Puzzle from "./puzzle";
import Solution from "./solution";

const puzzle: PuzzleDefinition = {
  title: "Do the Packing",
  slug: "do_the_packing",
  initial_description:
    "A blocked crossword grid with a set of cryptic clues underneath",
  answer: "C FOR CLARENDON",
  authors: ["Mike Mannis"],
  editors: ["James Douberley", "Joel Fried", "Julian West", "Robin Deits"],
  additional_credits: [],
  content: {
    component: Puzzle,
  },
  solution: {
    component: Solution,
  },
  hints: [
    {
      order: 30.0,
      description:
        "Solvers have not figured out what is “extra” while solving the cryptic clues",
      nudge:
        "Some of these clues are longer than needed to provide their answer, as hinted by the flavor",
    },
    {
      order: 50.0,
      description:
        "Solvers have most or all of the grid done but still don’t have the “extra” identified correctly",
      nudge:
        "Just over half of the clues have been “packed” with one extra word.  You’ll need to identify those words.",
    },
    {
      order: 70.0,
      description:
        "Solvers have the extra words all or mostly identified but are stuck",
      nudge:
        "Check the title and flavor text.  We packed the clues extra full; now it’s your turn to pack...something (what are you doing?) using the extra words somehow.",
    },
    {
      order: 90.0,
      description:
        "Solvers are still stuck on extraction and aren’t sure how to use the extra words",
      nudge:
        "We wrote (and packed) the clues; you are filling in (and packing) the grid.  You can use the extra words as clues to accomplish this.",
    },
    {
      order: 95.0,
      description:
        "Solvers have the answer showing in the grid but haven’t realized it",
      nudge: "Check the diagonal—that’s it!",
    },
  ],
  canned_responses: [],
};

export default puzzle;
