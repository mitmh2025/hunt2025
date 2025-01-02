import { type PuzzleDefinition } from "../types";
import Puzzle from "./puzzle";
import Solution from "./solution";

const puzzle: PuzzleDefinition = {
  title: "Mystery O's",
  slug: "mystery_os",
  initial_description: "A mini cereal box with crayons inside.",
  answer: "RICE UNIVERSITY",
  authors: [
    "Arcturus Wang",
    "Andrew Russell",
    "Chris Post",
    "Jesse Moeller",
    "Melanie Matchett Wood",
    "Robert “Fro” Myers",
  ],
  editors: ["Hubert Hwang", "Kevin Hwang", "Steve Banzaert"],
  additional_credits: [],
  content: {
    component: Puzzle,
    copyable: false,
  },
  solution: {
    component: Solution,
  },
  hints: [
    {
      order: 10.0,
      description:
        "Solvers are having trouble extracting the word from the connect the dots.",
      keywords: ["connect the dots"],
      nudge:
        "Once you’ve connected all the dots, look at the box right-side-up. Do you see a word spelled on the top of the cake?",
    },
    {
      order: 90.0,
      description:
        "Solvers have solved and extracted individual puzzles but don’t know the order.",
      nudge: "Look at the first letters of the titles of all the mini-puzzles.",
    },
    {
      order: 100.0,
      description:
        "The solvers have extracted the full clue phrase and are having trouble finding the answer.",
      keywords: ["extraction"],
      nudge:
        "Have you noticed the blanks in the bottom-left corner of the box front? Also, you might be overthinking it.",
    },
  ],
  canned_responses: [
    {
      guess: ["ALMA", "AND", "CRACKLE", "MATER", "POPS", "SNAP", "WHATS"],
      reply: "Keep going!",
    },
    {
      guess: ["WHATS SNAP CRACKLE AND POPS ALMA MATER"],
      reply: "That’s the correct clue phrase! What’s the answer?",
    },
  ],
};

export default puzzle;
