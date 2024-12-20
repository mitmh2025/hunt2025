import { type PuzzleDefinition } from "../types";
import Puzzle from "./puzzle";
import Solution from "./solution";

const puzzle: PuzzleDefinition = {
  title: "Engagements and Other Crimes",
  slug: "engagements_and_other_crimes",
  initial_description: "A square double-sided color-printed invitation.",
  answer: "DRINKING CUP",
  authors: ["Grant Elliott", "Caroline Elliott"],
  editors: ["J. Heléne Andersson", "James Douberley", "Teddy McArthur"],
  additional_credits: [
    {
      for_what: "Art",
      who: ["Simone Agha"],
    },
  ],
  content: {
    component: Puzzle,
  },
  solution: {
    component: Solution,
  },
  hints: [
    {
      order: 0.1,
      description: "Solvers have done nothing",
      keywords: ["stuck"],
      nudge: "Focus on the background pattern. Is it entirely random?",
    },
    {
      order: 1.1,
      description: "Solvers have found the double bubbles.",
      keywords: ["dots", "bubbles", "circles", "double", "two"],
      nudge: "The double bubbles come in matched pairs.",
    },
    {
      order: 1.2,
      description:
        "Solvers have the double bubble pairs but don’t know what to do",
      keywords: ["dots", "bubbles", "circles", "double", "two", "pairs"],
      nudge:
        "Fold the paper so that all of the double bubbles are precisely touching their mates.",
    },
    {
      order: 1.3,
      description:
        "Solvers are trying to fold the paper and looking for an order or indication of mountain and valley folds",
      keywords: ["mountain", "valley", "order"],
      nudge:
        "As the flavor suggests, there is no given order or fold direction. The given information encodes the final state, not the steps to achieve it.",
    },
    {
      order: 2.1,
      description: "Solvers have folded a bird but are stuck on extraction",
      keywords: ["bird", "extraction"],
      nudge:
        "Be sure you folded precisely and double check that you satisfied all requirements. The answer should be plainly spelled out when you’re finished.",
    },
  ],
  canned_responses: [],
};

export default puzzle;
