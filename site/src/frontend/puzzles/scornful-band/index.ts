import { type PuzzleDefinition } from "../types";
import Puzzle from "./puzzle";
import Solution from "./solution";

const puzzle: PuzzleDefinition = {
  title: "Just F---ing Behave!",
  slug: "just_fing_behave",
  initial_description: "A poem in the style of a children’s book",
  answer: "BADGER",
  authors: ["Mike Mannis"],
  editors: [
    "Cyrus Eyster",
    "Elan Blaustein",
    "Hubert Hwang",
    "James Douberley",
  ],
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
      description: "Solvers can’t get started in any meaningful way",
      nudge:
        "The behavior in each of the main verses (apart from the first and last) can be described with a single word.  These words fits into a category.",
    },
    {
      order: 15.0,
      description: "Solvers still have not identified the right words",
      nudge:
        "The category of words describing the behaviors is hinted in the first verse.",
    },
    {
      order: 30.0,
      description:
        "Solvers have identified some (or all) of the words but are now stuck.",
      nudge: "Have you tried connecting the dots with your answers?",
    },
  ],
  canned_responses: [
    {
      guess: ["PESTER SIX"],
      reply:
        "Per the theme and mechanic of the puzzle, what 6-letter word might mean “pester?”",
    },
  ],
};

export default puzzle;
