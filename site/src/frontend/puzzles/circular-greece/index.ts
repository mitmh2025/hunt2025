import { type PuzzleDefinition } from "../types";
import Puzzle from "./puzzle";
import Solution from "./solution";

const puzzle: PuzzleDefinition = {
  title: "Educational Rite of Passage",
  slug: "educational_rite_of_passage",
  initial_description:
    "45 small 3D printed pieces with images embossed on them, and a cylinder with arrows on it.",
  answer: "RAW ANTIQUE BRASS",
  authors: ["Laura Nicholson", "Arcturus Wang", "Robert “Fro” Myers"],
  editors: ["Elan Blaustein", "Michele Pratusevich", "Nathan Fung"],
  additional_credits: [],
  content: {
    component: Puzzle,
  },
  solution: {
    component: Solution,
  },
  hints: [],
  canned_responses: [
    {
      guess: ["MOVE BEZELS UP TWO", "SPIN RINGS PER ROD"],
      reply: "Keep going! This is an instruction.",
    },
  ],
};

export default puzzle;
