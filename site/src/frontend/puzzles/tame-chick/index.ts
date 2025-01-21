import { type PuzzleDefinition } from "../types";
import Puzzle from "./puzzle";
import Solution from "./solution";

const puzzle: PuzzleDefinition = {
  title: "A Recipe For Success",
  slug: "a_recipe_for_success",
  code_name: "tame-chick",
  initial_description: "Several completely normal and reasonable pickup lines",
  answer: "LET THEM EAT CAKE",

  authors: ["James Douberley", "Emilie Josephs"],
  editors: ["Hubert Hwang", "Li-Mei Lim"],
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
      order: 1.0,
      description: "Solvers have not figured out how to start the puzzle",
      keywords: [],
      nudge:
        "The incomplete phrases at the bottom are meant to be responses to the pickup lines at the top of the puzzle.",
    },
    {
      order: 10.0,
      description:
        "Solvers are not able to find a consistent theme for the pickup lines and answers",
      keywords: [],
      nudge:
        "All of these clues are innuendo, written to sound like food but also using slang for sex.",
    },
    {
      order: 15.0,
      description:
        "Solvers have filled in many of the clues but are unable to extract",
      keywords: [],
      nudge:
        "The highlighted squares give letters. Because the responses at the bottom are given alphabetically, you’ll need to read them out in a different order.",
    },
  ],
  canned_responses: [
    {
      guess: ["FLIRT WITH BARTENDER"],
      reply:
        "Great idea! Check in with the Gala bar staff and let them know you’d like to hit on one of their co-workers. I hear bartenders love that. In the meantime, prep your best food-themed pickup line.\n\nDuring Mystery Hunt, tems would have had to deliver some sort of pickup line to a bartender. If they did, the bartender would slide them a napkin with their “number” on it, i.e. the answer to this puzzle: LET THEM EAT CAKE.",
      providesSolveReward: true,
    },
  ],
};

export default puzzle;
