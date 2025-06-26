import { type PuzzleDefinition } from "../types";

const puzzle: PuzzleDefinition = {
  title: "A Math Quiz",
  slug: "a_math_quiz",
  code_name: "new-pin",
  initial_description: "A list of math questions",
  answer: "TREE",
  authors: ["Tanya Khovanova"],
  editors: ["Hubert Hwang", "Robin Deits"],
  additional_credits: [],
  content: {
    component: { lazy: () => import("./puzzle") },
    copyable: true,
  },
  solution: {
    component: { lazy: () => import("./solution") },
  },
  hints: [
    {
      order: 50.0,
      description:
        "The solvers have not yet figured out that each problem has two answers.",
      keywords: ["stuck"],
      nudge: "Each math question sounds as if it has one answer. Hmm.",
    },
    {
      order: 70.0,
      description: "the solvers have incorrect answer(s) for problem 1.",
      keywords: ["problem 1", "extraction."],
      nudge: "Look carefully at where MIT is mentioned in problem 1.",
    },
    {
      order: 90.0,
      description: "The solvers are at the extraction phase.",
      keywords: ["extraction"],
      nudge:
        "Look at the smallest and the largest answers to the puzzles separately.",
    },
  ],
  canned_responses: [],
};

export default puzzle;
