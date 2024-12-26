import { type PuzzleDefinition } from "../types";
import Puzzle from "./puzzle";
import Solution from "./solution";

const puzzle: PuzzleDefinition = {
  title: "Introduction to Decryption",
  slug: "introduction_to_decryption",
  initial_description: "Crossword clues and pictures of droids",
  answer: "JABBAS BOILER ROOM",
  authors: ["Robin Deits"],
  editors: ["James Douberley", "Henry Wong", "Li-Mei Lim"],
  additional_credits: [],
  content: {
    component: Puzzle,
  },
  solution: {
    component: Solution,
  },
  hints: [
    {
      order: 0.0,
      description: "Solvers don't know what to do with the droids",
      nudge: "How many words are in each clue? And how many droids?",
    },
    {
      order: 10.0,
      description:
        "Solvers know that the droids match the clue lengths but not what they do",
      nudge:
        "A cryptic clue looks like a sentence, but it's really a recipe: each word has a specific function, and the same function may appear in many clues. Could the droids do the same thing?",
    },
    {
      order: 30.0,
      description: "Solvers don't know how the clues in the gray boxes work",
      nudge:
        "The first clue in a gray box has six blanks, and six clues before it. Do the answers to those clues fit? Do they make a clue of some kind?",
    },
    {
      order: 50.0,
      description:
        "Solvers have most of the clues but don't know what to do next",
      nudge:
        "The very last clue needs some words inserted, and you've got words of matching length out of the gray-boxed clues so far. The result will be another cryptic clue, but some of its words are REDACTED. How can you figure out what functions are being applied in that clue? Can the droids help?",
    },
    {
      order: 90.0,
      description:
        "Solvers have most of the last clue but don't know how to make it work",
      nudge:
        "The start of your answer will need to be: A synonym of (your 5 letter word), then the first letter of (your 6 letter word) and the first letter of (your 9 letter word) both inserted into the middle of (your 2 letter word)...and then a few more pieces. You're looking for a phrase with a total of 16 letters.",
    },
  ],
  canned_responses: [
    {
      guess: [
        "PUNCH ANAKIN REDACTED SKYWALKER REDACTED REDACTED BB DROID REDACTED RILE REDACTED DOCK REDACTED",
      ],
      reply: "You have correctly constructed the clue phrase!",
    },
  ],
};

export default puzzle;
