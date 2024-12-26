import { type PuzzleDefinition } from "../types";
import Puzzle from "./puzzle";
import Solution from "./solution";

const puzzle: PuzzleDefinition = {
  title: "Superlatives",
  slug: "superlatives",
  initial_description: "A laid out book with a graphic at the bottom",
  answer: "STUDENT BODY",
  authors: ["James Douberley", "Evan Broder"],
  editors: ["Henry Wong", "Li-Mei Lim", "Robin Deits", "Steve Banzaert"],
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
      description: "Solvers are having trouble getting started",
      nudge:
        "The “name” under each of the individuals on the left is a clue for a particular word, as is each of the items on the right. Each set of answers has something in common.",
    },
    {
      order: 20.0,
      description:
        "Solvers have figured out some of the left-hand clues but are struggling to match to the right",
      nudge:
        "The puzzle is titled “Superlatives.” That's a reference to a section of a yearbook, but also to a grammatical construct. The words on the left-hand side aren't superlatives, though.",
    },
    {
      order: 60.0,
      description:
        "Solvers have matched up the clues but aren't sure what to do",
      nudge:
        "One of the left-hand clues is a hint for how you can pull a single piece of information from each pair of clues. If you can figure out which one, it might help you extract something from each one.",
    },
    {
      order: 80.0,
      description:
        "Solvers have extracted the cluephrase but aren't sure what to do with it",
      nudge:
        "For each of the clues, you had to apply a transformation to it. You can also do that to the cluephrase",
    },
    {
      order: 81.0,
      description:
        "Solvers have transformed the cluephrase but aren't sure how to interpret it",
      nudge:
        "“Technique” can refer to a specific thing at MIT, not just a way of doing things.",
    },
    {
      order: 95.0,
      description:
        "Solvers have found the first issue of the Technique but aren't sure what to do with it",
      nudge:
        "At the beginning of the puzzle, you were given a drawing. You should be able to line that up with one of the first few pages in the first Technique.",
    },
  ],
  canned_responses: [
    {
      guess: ["USE EARLIER TECHNIQUE", "USE EARLIEST TECHNIQUE"],
      reply: "Keep going!",
    },
  ],
};

export default puzzle;
