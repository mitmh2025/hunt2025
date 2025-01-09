import { type PuzzleDefinition } from "../types";
import Puzzle from "./puzzle";
import Solution from "./solution";

const puzzle: PuzzleDefinition = {
  title: "A Dash of Color",
  slug: "a_dash_of_color",
  initial_description: "Several crossword-like clues and a painting",
  answer: "VERMEERS AND REMBRANDTS",
  authors: [
    "Emilie Josephs",
    "Cyrus Eyster",
    "James Douberley",
    "maddiehi",
    "Molly Frey",
    "Rebecca Engelke",
  ],
  editors: ["Arcturus Wang", "Hubert Hwang", "Li-Mei Lim"],
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
      description:
        "The solvers are struggling to solve any of the crossword clues",
      nudge:
        "If you’ve been trying to extract regular English phrases, try something a little goofier and pun-ier.",
    },
    {
      order: 1.0,
      description:
        "The solvers have solved some of the crossword clues, but are struggling to solve all of them",
      nudge:
        "Once you’ve solved a few of the clues, try searching several of them together to see what they have in common.",
    },
    {
      order: 2.0,
      description:
        "The solvers have solved a good number of the crossword clues, and are unsure how to order them",
      nudge:
        "Take another look at the dots in the painting. For each color in the painting, there are two pieces of information that you should identify.",
    },
    {
      order: 3.0,
      description:
        "The solvers have solved a good number of the crossword clues, and are unsure how to order them. They have identified that the colors in the painting are the answers to the crossword clues, but are blocked on how to order those answers",
      nudge:
        "Once you’ve identified what colors are in the painting, try paying attention to how often each one occurs.",
    },
    {
      order: 4.0,
      description:
        "The solvers have received the physical component of the puzzle, but are unsure how the nails go into the jig",
      nudge:
        "There is one arrangement where all the nails are the same height, once they are entered into the jig.",
    },
    {
      order: 5.0,
      description: "The solvers are unsure what each nail maps to.",
      nudge:
        "Have you identified the colors on each nail? Try referring to some of the colors you already know from the first step.",
    },
    {
      order: 6.0,
      description:
        "The solvers understand that the nail map to different colors, but are struggling to identify the correct subset of colors",
      nudge:
        "Try identifying the length of each nail, by counting how many lines it crosses on the jig.",
    },
    {
      order: 7.0,
      description:
        "The solvers have placed the nails in the jig, and have figured out what each nail maps to, but are unsure how to extract letters from it",
      nudge:
        "Once you’ve figured out what color each nail maps to and where each nail goes in the jig, try taking another look at the front of the jig. There is structure there that will help you identify letters to extract.",
    },
  ],
  canned_responses: [
    {
      guess: ["COME GET YOUR NAILS DONE"],
      reply: "Yes! Speak to Gala staff about getting your nails painted.",
    },
  ],
};

export default puzzle;
