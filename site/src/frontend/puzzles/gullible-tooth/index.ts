import { type PuzzleDefinition } from "../types";
import Puzzle from "./puzzle";
import Solution from "./solution";

const puzzle: PuzzleDefinition = {
  title: "Shell Corporation 1: Tasty Food Processors",
  slug: "shell_corporation_1",
  authors: ["Li-Mei Lim", "James Douberley"],
  answer: "SLIVERS",
  additional_credits: [],
  content: {
    component: Puzzle,
  },
  solution: {
    component: Solution,
  },
  hints: [
    {
      order: 1,
      description: "Solvers have not figured out where to start.",
      keywords: ["start"],
      nudge:
        "The flavortext explicitly clues how many ingredients (answers) you’ll need as feeders to this meta-puzzle, and each ingredient is explicitly clued in one of the instructions.",
    },
    {
      order: 1.5,
      description:
        "Solvers can’t make progress on the recipes because some steps don’t make words.",
      nudge:
        "These recipes each produce a word or phrase at the end, but intermediate steps may not produce words unless explicitly clued.",
    },
    {
      order: 2,
      description:
        "Solvers have figured out a few of the final recipe words, but don't know what they have in common.",
      nudge:
        "These recipes all produce words or phrases that are within a particular set, thematic to the puzzle.",
    },
    {
      order: 2.1,
      description: "Solvers still can't identify what set these words are in.",
      keywords: ["identify"],
      nudge: "These recipes all produce cakes.",
    },
    {
      order: 3,
      description:
        "Solvers have most or all of the cakes, but need to extract.",
      keywords: ["extraction"],
      nudge:
        "The instruction at the bottom explicitly states how to extract. Just line up your answers, and take a slice (vertically).",
    },
    {
      order: 100,
      description: "Solvers are concerned that not all of their answers fit.",
      keywords: ["answers", "assignment", "feeders"],
      nudge:
        "You may be able to solve this meta without all the answers and figure out the remaining feeder assignments later.",
    },
  ],
  canned_responses: [],
};

export default puzzle;
