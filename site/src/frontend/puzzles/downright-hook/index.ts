import { type PuzzleDefinition } from "../types";
import Puzzle from "./puzzle";
import Solution from "./solution";

const puzzle: PuzzleDefinition = {
  title: "Men’s at My Nose",
  slug: "mens_at_my_nose",
  initial_description: "A series of quotes.",
  answer: "SHOPPING CART",
  authors: ["Teddy McArthur"],
  editors: ["Li-Mei Lim", "Steve Banzaert"],
  additional_credits: [],
  content: {
    component: Puzzle,
  },
  solution: {
    component: Solution,
  },
  hints: [
    {
      order: 10.1,
      description: "Solvers are unsure where to start.",
      keywords: ["start"],
      nudge:
        "Solving these clues will lead to phrases, not necessarily the same length as the given enumerations; saying those phrases out loud might help you figure out what’s going on.",
    },
    {
      order: 10.2,
      description:
        "Solvers are still unsure of where to go after the first starting prompt.",
      nudge:
        "Each clue represents a roundabout way of describing a Latin phrase via a silly English phrase that sounds similar to the Latin phrase.  For example, in the flavor text, “making image macros while watching daytime TV” can be restated as “memeing to Maury,” which sounds like the Latin phrase “memento mori.”",
    },
    {
      order: 95.1,
      description: "Solvers are having trouble extracting the answer.",
      keywords: ["extraction"],
      nudge:
        "Read in order the first letters of the phrases you have discovered.",
    },
  ],
  canned_responses: [],
};

export default puzzle;
