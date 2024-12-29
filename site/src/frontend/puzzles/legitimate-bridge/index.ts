import { type PuzzleDefinition } from "../types";
import Puzzle from "./puzzle";
import router from "./server";
import Solution from "./solution";

const puzzle: PuzzleDefinition = {
  title: "Jargon",
  slug: "jargon",
  initial_description:
    "A series of clickable colored squares, each leading to a series of prompts with text boxes.",
  answer: "PHILOLOGY", // TODO: implement re-solve mechanic for LIFEFORCE
  authors: ["Ariel Schwartz"],
  editors: ["Alex Churchill", "Jesse Moeller", "Steve Banzaert"],
  additional_credits: [
    {
      for_what: "Electrical engineering consult",
      who: ["Peter Lorenz"],
    },
  ],
  content: {
    component: Puzzle,
    entrypoint: "puzzle_legitimate_bridge",
    copyable: false,
  },
  solution: {
    component: Solution,
  },
  hints: [
    {
      order: 1.0,
      description: "The solvers are not even attempting to solve panels",
      keywords: ["start", "guess", "limit"],
      nudge:
        "There is no penalty for entering an incorrect answer to one of the sub-puzzles. However, you will be throttled if you attempt to type more than [X] of characters per second, to discourage computerized brute-forcing",
    },
    {
      order: 1.1,
      description:
        "The solvers are attempting to solve panels, but have not noticed any patterns",
      keywords: ["color"],
      nudge:
        "Each color represents a distinct wordplay mechanic to be applied to the word at the top of the square.",
    },
    {
      order: 1.2,
      description:
        "The solvers have understood some of the color mechanics, but do not understand how to apply them",
      keywords: ["height"],
      nudge:
        "Each height represents what aspect of the word to apply the color mechanic to.",
    },
    {
      order: 1.3,
      description:
        "The solvers are stuck even given the previous two hints, and would like to know what the colors x heights mean",
      keywords: ["reference", "stuck"],
      nudge:
        "Some of the puzzles are intended to reference something. Do any of them stick out?",
    },
    {
      order: 1.6,
      description:
        "The solvers have not yet figured out that the triplets represent resistors",
      keywords: ["colors", "mechanic"],
      nudge:
        "The colors used in this puzzle belong to a set of colors commonly used in Mystery Hunt puzzles.",
    },
    {
      order: 1.7,
      description:
        "The solvers have not yet figured out that the networks represent circuits",
      keywords: ["network", "gray", "grey"],
      nudge:
        "Each of the networks revealed by clicking a gray square is an electrical circuit.",
    },
    {
      order: 1.8,
      description:
        "The solvers have not yet figured out how to ‘solve’ the circuits",
      keywords: ["circuit", "orange"],
      nudge: "The orange square in each circuit gives you a starting voltage.",
    },
    {
      order: 1.9,
      description:
        "The solvers have the starting voltage, but either don’t know how to extract or are getting garbage for the extraction indices",
      keywords: ["extraction"],
      nudge:
        "The circuits are voltage dividers. Measure the voltage across the final resistor.",
    },
    {
      order: 1.99,
      description: "Final extraction mechanic",
      keywords: ["extraction"],
      nudge:
        "Use the final voltage as an index into the final word in the circuit.",
    },
    {
      order: 2.0,
      description:
        "The solvers have received the post-solve message and don’t know what part of the message to apply to what part of the puzzle",
      keywords: ["re-solve", "difference"],
      nudge:
        "The thing you are taking a difference from is the final voltage of each circuit.",
    },
    {
      order: 2.5,
      description:
        "The solvers have received the caesar shift values and don’t know what to do with them",
      keywords: ["re-solve", "shift"],
      nudge:
        "The thing you are shifting is the letter extracted from each circuit.",
    },
    {
      order: 2.99,
      description: "Final re-extraction mechanic",
      keywords: ["re-solve", "extraction"],
      nudge:
        "Subtract the final voltage of each circuit from 8V, circuit-by-circuit. Then use that value to Caesar-shift the corresponding extracted letter from each circuit.",
    },
  ],
  canned_responses: [],
  router,
};

export default puzzle;
