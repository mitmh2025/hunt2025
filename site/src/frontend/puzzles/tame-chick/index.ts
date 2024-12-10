import { type PuzzleDefinition } from "../types";
import Puzzle from "./puzzle";
import Solution from "./solution";

const puzzle: PuzzleDefinition = {
  title: "A Recipe For Success",
  slug: "a_recipe_for_success",
  initial_description: "Several pickup lines and innuendo.",
  answer: "LET THEM EAT CAKE",

  authors: ["James Douberley", "Emilie Josephs"],
  editors: ["Hubert Hwang", "Li-Mei Lim"],
  additional_credits: [],
  content: {
    component: Puzzle,
  },
  solution: {
    component: Solution,
  },
  hints: [],
  canned_responses: [
    {
      guess: ["FLIRT WITH BARTENDER"],
      reply:
        "Great idea! Check in with the Gala bar staff and let them know you'd like to hit on one of their co-workers. I hear bartenders love that. In the meantime, prep your best food-themed pickup line.",
      providesSolveReward: true,
    },
  ],
};

export default puzzle;
