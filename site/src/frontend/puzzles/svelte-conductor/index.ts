import { type PuzzleDefinition } from "../types";
import Puzzle from "./puzzle";
import Solution from "./solution";

const puzzle: PuzzleDefinition = {
  title: "The Oversight",
  slug: "the_oversight",
  initial_description: "Nothing",
  answer: "NOMAD",
  authors: ["Grant Elliott"],
  editors: ["James Douberley", "Jesse Moeller", "Li-Mei Lim", "Robin Deits"],
  additional_credits: [],
  content: {
    component: Puzzle,
  },
  solution: {
    component: Solution,
  },
  hints: [
    {
      order: 0.0,
      description: "Solvers haven’t found any additional content and are stuck",
      keywords: ["Stuck", "beginning"],
      nudge: "Have you performed a background check?",
    },
    {
      order: 10.0,
      description:
        "Solvers have a chess board but don’t know what to do with the question marks",
      keywords: ["Boards", "question"],
      nudge: "Have you noticed any common letters in your answers?",
    },
    {
      order: 11.0,
      description: "Solvers have the chess boards, but don’t know the ruleset",
      keywords: ["Hexagon", "hexagonal", "chess", "rules", "move"],
      nudge:
        "Have you even seen a star-shaped chess board before? If you find the board, you might also find out the rules.",
    },
    {
      order: 12.0,
      description:
        "Solvers have filled the chess boards but don’t know what chess puzzle to solve",
      keywords: ["Chess", "puzzle"],
      nudge: "Have you considered the title of the puzzle?",
    },
    {
      order: 100.0,
      description: "Solvers are stuck on extraction",
      keywords: ["Extraction", "reflex", "reflexmate"],
      nudge:
        "Is there anything unique about this kind of chessboard that might map to letters?",
    },
  ],
  canned_responses: [],
};

export default puzzle;
