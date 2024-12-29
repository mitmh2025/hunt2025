import { type PuzzleDefinition } from "../types";
import Puzzle from "./puzzle";
import Solution from "./solution";

const puzzle: PuzzleDefinition = {
  title: "Lab Scrabble",
  slug: "lab_scrabble",
  initial_description:
    "A series of Scrabble racks with blank tiles and a list of clues underneath",
  answer: "GOLD",
  authors: ["phyphor", "Anisa Schardl", "Eric Marion", "Mike Mannis"],
  editors: ["Hubert Hwang", "J. Hel\u00e9ne Andersson", "Jonathan Lay"],
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
      description: "Solvers are struggling to get answers to the clue phrases",
      nudge:
        "The answers to the clues are all seven *tiles* long, but not necessarily seven *letters* long.  The clue answers are in alphabetical order.",
    },
    {
      order: 20.0,
      description:
        "Solvers have not noticed that the answers are composed of chemical element abbreviations",
      nudge:
        "The puzzle title and flavor text hint that the answers are related to things that chemists are concerned with.  Each answer is composed of exactly seven such abbreviations.",
    },
    {
      order: 40.0,
      description:
        "Solvers aren’t sure how to use the scores or how to order the answers, but have figured out that the answers are composed of chemical element abbreviations",
      nudge:
        "Scrabble scores are the sum of the values of their tiles (ignoring bonuses on the board).  What properties of chemical elements could be used on the Scrabble tiles to add up to the words’ scores?",
    },
    {
      order: 80.0,
      description:
        "Solvers have the correct answers in the correct order, but aren’t sure what to do next",
      nudge:
        "The clues all mention the last element of each answer word.  What about the first element of each answer word?",
    },
    {
      order: 90.0,
      description:
        "Solvers are looking at the first letters but having trouble interpreting the result",
      nudge:
        "The first *letters* alone are not significant, but the first *tiles* are.  Read them in order.",
    },
    {
      order: 95.0,
      description:
        'Solvers have "How far is the sun?" but are not getting the correct answer',
      nudge:
        "The average distance between the Earth and the Sun has a historically defined name.",
    },
  ],
  canned_responses: [
    {
      guess: ["AU"],
      reply: "What does AU mean to a chemist?",
    },
    {
      guess: ["how far is the sun", "how far is the sun?"],
      reply:
        "I don’t know, I’m a chemist, not an astrophysicist. How far *is* the sun?",
    },
  ],
};

export default puzzle;
