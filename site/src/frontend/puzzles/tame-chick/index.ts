import { type PuzzleDefinition } from "../types";
import Puzzle from "./puzzle";
import Solution from "./solution";

const puzzle: PuzzleDefinition = {
  title: "A Recipe For Success",
  slug: "a_recipe_for_success",
  initial_description: "Several pickup lines and innuendo.",
  answer: "FLIRT WITH BARTENDER, LET THEM EAT CAKE",
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
  canned_responses: [],
};

export default puzzle;
