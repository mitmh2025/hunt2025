import { type PuzzleDefinition } from "../types";
import Puzzle from "./puzzle";
import Solution from "./solution";

const puzzle: PuzzleDefinition = {
  title: "Some Assembly Required",
  slug: "some_assembly_required",
  initial_description: "A list of answers and a word bank.",
  answer: "PRIVATE SECTOR",
  authors: ["Mike Mannis", "phyphor"],
  editors: ["Erin Price", "James Douberley"],
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
      order: 5.0,
      description: "Solvers are unable to figure out how to get started",
      nudge:
        "You will need to create clues for each of the listed answers using the words at the bottom. Each word will be used once. The enumerations next to each answer tell you how many clue words to use.",
    },
    {
      order: 30.0,
      description:
        "Solvers have assigned all the clue words but don’t know what to do next (some clue words might be wrongly assigned)",
      nudge:
        "Some of the clue words, once assigned, are now highlighted. Each given answer’s set of highlighted keywords shares a property, which is also shared by the answers themselves. This is hinted in the flavor text.",
    },
    {
      order: 50.0,
      description:
        "Solvers have noticed the highlighted word groups are all 14 characters long but can’t extract",
      nudge:
        "Check the flavor text again. What potentially interesting property do the given answers share, other than being anagrams?",
    },
    {
      order: 70.0,
      description:
        "Solvers have all the clue words correct but still cannot extract and need a very direct hint",
      nudge:
        "Each given answer has exactly one space, and the position of the space varies from answer to answer. This is significant.",
    },
  ],
  canned_responses: [
    {
      guess: ["NUMBER FIVE"],
      reply: "What is number 5?",
    },
  ],
};

export default puzzle;
