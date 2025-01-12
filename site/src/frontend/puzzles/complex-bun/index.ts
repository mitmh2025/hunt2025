import { type PuzzleDefinition } from "../types";
import Puzzle from "./puzzle";
import Solution from "./solution";

const puzzle: PuzzleDefinition = {
  title: "Check-a-deez Words Out",
  slug: "check_a_deez_words_out",
  code_name: "complex-bun",
  initial_description: "A word search",
  answer: "RYAN FLAMINGO",
  authors: ["Henry Wong", "Li-Mei Lim"],
  editors: ["James Douberley", "Robin Deits"],
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
      description: "Solvers have found some words in the grid but are stuck",
      nudge:
        "There are a lot of birds here in straight lines, but the flavor mentioned our “Donalds” not being in a row. Donald who?",
    },
    {
      order: 30.0,
      description:
        "Solvers know which “Donald” the flavor refers to, but not how this relates to the puzzle",
      nudge:
        "These birds are pretty famous, but you’ve only got part of their names.",
    },
    {
      order: 50.0,
      description:
        "Solvers recognize some of the names, but don’t know how this relates to the grid",
      nudge:
        "The first names you seek can be found in the grid, but they’re not in straight lines.",
    },
    {
      order: 70.0,
      description:
        "Solvers have found the first names in the grid but are stuck",
      nudge: "Do your first and last names intersect anywhere?",
    },
    {
      order: 90.0,
      description:
        "Solvers have the extracted letters, but don’t know how to get the rest of the name",
      nudge:
        "Highlight all the first names of your birds in the grid. Do you see anything?",
    },
  ],
  canned_responses: [
    {
      guess: ["FORENAME RYAN"],
      reply: "Keep going!",
    },
  ],
};

export default puzzle;
