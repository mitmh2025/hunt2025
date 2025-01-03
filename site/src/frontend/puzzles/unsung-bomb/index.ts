import { type PuzzleDefinition } from "../types";
import Puzzle from "./puzzle";
import Solution from "./solution";

const puzzle: PuzzleDefinition = {
  title: "An Argument",
  slug: "an_argument",
  initial_description: "A connect-the-dots with letters and several clues.",
  answer: "RIGHT TO BEAR ARMS",
  authors: ["James Douberley"],
  editors: ["Li-Mei Lim", "Robin Deits"],
  additional_credits: [],
  content: {
    component: Puzzle,
    copyable: true,
  },
  solution: {
    component: Solution,
  },
  hints: [
    {
      order: 10.0,
      description: "Solvers have not figured out how to start",
      keywords: ["start"],
      nudge:
        "Identifying all of the thumbnail images should help you match them with one word in each of the crossword clues.",
    },
    {
      order: 15.0,
      description: "First hint didn’t help",
      keywords: ["still start"],
      nudge:
        "One word in each clue is an antonym of each thumbnail image. They should match up 1:1.",
    },
    {
      order: 20.0,
      description:
        "Solvers have matched all the antonym words but don’t know what to do with the remaining clue",
      keywords: ["antonyms", "second step", "remaining clue"],
      nudge:
        "The remainder of each clue can be read as a straight clue for a word in a specific category. Specifically, all of the clued words will start with one of two things.",
    },
    {
      order: 25.0,
      description:
        "Solvers still cannot identify the commonality between the remaining clues",
      keywords: ["stuck", "remaining clue"],
      nudge:
        "All of these are straight crossword clues to words beginning PRO or CON. For instance, “Reformed Believer” is a PROTESTANT.",
    },
    {
      order: 30.0,
      description: "Solvers have identified all the pro/con pairs and antonyms",
      nudge:
        "You should be able to draw lines between the PRO/CON pairs based on placing each clue at its appropriate antonym. Reading the letters that fall on these lines, from top to bottom of the page, should spell out the next step.",
    },
    {
      order: 40.0,
      description:
        "Solvers have read opposite letters and have a final cluephrase",
      keywords: ["extraction", "prostitution"],
      nudge:
        "The word PROSTITUTION in the cluephrase can be transformed in the same way as previous clues to make this cluephrase a little more sensible.",
    },
  ],
  canned_responses: [
    {
      guess: ["SECOND OF PROSTITUTION GIVES THIS"],
      reply: "Keep going! This is a cluephrase, but there’s one more step.",
    },
    {
      guess: ["THE RIGHT TO BEAR ARMS"],
      reply: "Almost there. The puzzle page does specify the answer length.",
    },
  ],
};

export default puzzle;
