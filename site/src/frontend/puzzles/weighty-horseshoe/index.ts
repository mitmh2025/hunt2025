import { type PuzzleDefinition } from "../types";
import Puzzle from "./puzzle";
import Solution from "./solution";

const puzzle: PuzzleDefinition = {
  title: "XOXO",
  slug: "xoxo",
  code_name: "weighty-horseshoe",
  initial_description: "A grid of criss-crosses and a set of love poems",
  answer: "FROM RUSSIA WITH LOVE",
  authors: ["Nicholas Georgiou"],
  editors: ["Anna Brunner", "Michele Pratusevich", "Nathan Fung"],
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
      order: 0.0,
      description:
        "Solvers have not identified subject material in the love poems.",
      keywords: ["beginning"],
      nudge:
        "The background art should give a hint to what is being described in the love poems.",
    },
    {
      order: 10.0,
      description: "Solvers still stuck after hint 0.",
      keywords: ["no progress"],
      nudge: "Focus on nominations for the Academy Award for Best Picture.",
    },
    {
      order: 25.0,
      description:
        "Solvers have not discovered all the items being referenced in the poems.",
      keywords: ["movies"],
      nudge:
        "Once you’ve started to find the items being described in the poems, read the poems again to make sure you haven’t missed any.",
    },
    {
      order: 50.0,
      description: "Solvers are unsure how to use the dates.",
      keywords: ["dates"],
      nudge:
        "As you identify the items, the dates should give some confirmation of what to enter in the grid, if interpreted correctly.",
    },
    {
      order: 75.0,
      description: "Solvers have not worked out how to enter into the grid.",
      keywords: ["grid", "entry"],
      nudge:
        "Once you’ve worked out what the dates mean, look again at the criss-crosses.",
    },
    {
      order: 100.0,
      description: "Solvers are stuck on extraction step.",
      keywords: ["extraction"],
      nudge:
        "Once you’ve entered things correctly in the grid, look for the commonalities.  You should not need to rearrange anything.",
    },
  ],
  canned_responses: [],
};

export default puzzle;
