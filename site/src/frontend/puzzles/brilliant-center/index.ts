import { type PuzzleDefinition } from "../types";
import Puzzle from "./puzzle";
import Solution from "./solution";

const puzzle: PuzzleDefinition = {
  title: "Mellow Planet",
  slug: "mellow_planet",
  initial_description:
    "Two columns of clues with letters between them, and a wildlife scene",
  answer: "HOT DOG",
  authors: ["Brie Frame"],
  editors: ["Hubert Hwang", "Robin Deits"],
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
        "Solvers have answered clues but have not yet figured out how to pair them",
      keywords: ["start"],
      nudge:
        "Answers in the left column can be paired to answers in the right column to form phrases, each referencing a different animal in the picture.",
    },
    {
      order: 1.0,
      description:
        "Solvers have answered clues and have tried to pair them up, but can’t figure out how to make this relate to the picture",
      keywords: ["animals"],
      nudge:
        "Answer pairs will describe animals in a fanciful manner. Have you heard the term TRASH PANDA used to describe a raccoon before? How about MURDER LOG for alligator or DANGER NOODLE for snake?",
    },
    {
      order: 2.0,
      description:
        "Solvers have answered clues and paired them to animals, but can’t figure out what to do with the resulting letters",
      keywords: ["extraction hint"],
      nudge:
        "There are two hints in this puzzle about the extraction mechanism. One can be found in the flavortext, and one can be found by reading the unused letters between the columns.",
    },
    {
      order: 2.5,
      description:
        "Solvers have answered clues and paired them to animals, but can’t figure out what to do with the resulting letters and have already been given the nudge hint",
      keywords: ["extraction answer"],
      nudge:
        "Each animal is looking directly at one other animal. Where the animals are looking will form a chain that includes every animal in the picture, starting with the penguin and ending with the spider. Using this chain as an ordering mechanism, note which letter is crossed when connecting the pair of answers that describes the animal.",
    },
  ],
  canned_responses: [
    {
      guess: ["EDIBLE SUMMER CANINE"],
      reply: "This is a clue phrase.",
    },
    {
      guess: ["FROM PENGUIN FOLLOW GAZE CHAIN"],
      reply: "Keep going!",
    },
  ],
};

export default puzzle;
