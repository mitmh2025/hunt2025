import { type PuzzleDefinition } from "../types";
import Puzzle from "./puzzle";
import Solution from "./solution";

const puzzle: PuzzleDefinition = {
  title: "Seating Arrangements",
  slug: "seating_arrangements",
  initial_description: "A script describing a family at a restaurant.",
  answer: "IT TAKES TWO",
  authors: ["Sid Creutz", "Chris Roske"],
  editors: [
    "Amanda Giermann",
    "Hubert Hwang",
    "Kevin Hwang",
    "Melanie Matchett Wood",
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
      order: 0.0,
      description: "Solvers do not know how to get started",
      nudge: "Read down the first letters of each character.",
    },
    {
      order: 20.0,
      description:
        "Solvers recognized VSEPR theory but don’t know how to use it",
      nudge:
        "Consider how many people and empty chairs are at the table when each line of dialogue is speaking.  How would they be arranged?",
    },
    {
      order: 80.0,
      description:
        "Solvers have recognized that the seating arrangements correspond to VSEPR geometries but don’t know how to use them [weak hint]",
      nudge:
        "Look closely at the dialogue, keeping in mind the VSEPR arrangements.",
    },
    {
      order: 100.0,
      description:
        "Solvers have recognized that the seating arrangements correspond to VSEPR geometries but don’t know how to use them [strong hint]",
      nudge:
        "Look for the name of the VSEPR geometry hidden as a substring in the line of dialogue.",
    },
  ],
  canned_responses: [
    {
      guess: ["VSEPR THEORY"],
      reply: "Keep going!",
    },
  ],
};

export default puzzle;
