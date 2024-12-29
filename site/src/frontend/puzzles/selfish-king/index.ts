import { type PuzzleDefinition } from "../types";
import Puzzle from "./puzzle";
import Solution from "./solution";

const puzzle: PuzzleDefinition = {
  title: "Bermuda Triangle",
  slug: "bermuda_triangle",
  initial_description: "Triangular battleship puzzles",
  answer: "CARPENTER FISH",
  authors: ["Denis Auroux"],
  editors: ["Chris Gatesman", "Hubert Hwang", "Kevin Hwang"],
  additional_credits: [],
  content: {
    component: Puzzle,
    copyable: false,
  },
  solution: {
    component: Solution,
  },
  hints: [
    {
      order: 1.0,
      description:
        "Solvers are unsure whether ships that disappear and reappear still travel “in the same direction”",
      keywords: ["direction of travel", "reappear"],
      nudge:
        "When a ship disappears and reappears the next day, it completes the travel begun on the previous day, meaning the “forward” end of the ship remains the same, even as the ship may have been rotated.",
    },
    {
      order: 10.0,
      description:
        "Solvers have no idea how to determine which ships disappear in the vortex and reappear the next day",
      keywords: ["disappear", "reappear", "vortex"],
      nudge:
        "Have you noticed that the appearance of certain letters in the p.m. grids on days 3, 4 and 5 forces certain ships to have disappeared into the vortex on the preceding days?  (Exactly which ships disappear might not be fully clear until you begin solving the grids, but the information you can get in this way is still helpful).",
    },
    {
      order: 20.0,
      description:
        "Solvers aren’t sure how to solve battleship puzzles in general",
      keywords: ["battleship", "stuck"],
      nudge:
        "Since different ships can’t touch each other, large numerical clues are very constrained (especially since cells inside the vortex don’t count).  Marking cells which cannot contain ship segments, and those which must contain ship segments is a good way to start.  Working in parallel on the a.m. and p.m. grids of a given day is also highly recommended, since the ships must move by a distance equal to their size (without touching each other in either grid).",
    },
    {
      order: 95.0,
      description: "Solvers are done with the grids but stuck on extraction",
      keywords: ["extraction"],
      nudge:
        "Have you tried combining the contents of the shaded central regions in all 10 grids to produce the requested overview?",
    },
  ],
  canned_responses: [],
};

export default puzzle;
