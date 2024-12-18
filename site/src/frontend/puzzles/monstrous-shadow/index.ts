import { type PuzzleDefinition } from "../types";
import Puzzle from "./puzzle";
import Solution from "./solution";

const puzzle: PuzzleDefinition = {
  title: "The Grand Illusion",
  slug: "the_grand_illusion",
  initial_description: "Four dates",
  answer: "ZODIAC",
  authors: ["Grant Elliott"],
  editors: ["James Douberley", "Jesse Moeller", "Li-Mei Lim", "Robin Deits"],
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
      description: "Solvers haven’t found any additional content and are stuck",
      keywords: ["Stuck", "beginning"],
      nudge: "Have you performed a background check?",
    },
    {
      order: 1.0,
      description:
        "Solvers have the background image but don’t know what to do with it",
      keywords: ["Image", "lines", "circles", "numbers"],
      nudge:
        "You may have performed a background check, but did you _find_ a background check?",
    },
    {
      order: 2.0,
      description:
        "Solvers have the background image and still don’t know what to do with it",
      keywords: ["Image", "lines", "circles", "numbers"],
      nudge:
        "Do those fiducials seem familiar? Where might you find a grid like this?",
    },
    {
      order: 3.0,
      description: "Solvers have the image and think it might be a map",
      keywords: ["Image", "map"],
      nudge: "If this were a map, how could we figure out where it is?",
    },
    {
      order: 10.0,
      description: "Solvers have a map of Czechia",
      keywords: ["Czech", "map"],
      nudge:
        "What’s changing in this area around those dates? Does the title tell you anything?",
    },
    {
      order: 100.0,
      description:
        "Solvers have a map of Czechia and cities that are in and out of it",
      keywords: ["Extraction"],
      nudge:
        "Have you tried both the in and out cities? Have you tried reading along either axis first?",
    },
  ],
  canned_responses: [
    {
      guess: ["STAR SIGN AREA"],
      reply: "This is a clue phrase",
    },
  ],
};

export default puzzle;
