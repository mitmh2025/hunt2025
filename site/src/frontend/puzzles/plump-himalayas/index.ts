import { type PuzzleDefinition } from "../types";
import Puzzle from "./puzzle";
import Solution from "./solution";

const puzzle: PuzzleDefinition = {
  title: "Control Room",
  slug: "control_room",
  code_name: "plump-himalayas",
  initial_description: "An invitation to schedule an interaction",
  answer: "PIVOT TABLE",
  authors: [
    "Robert “Fro” Myers",
    "Arcturus Wang",
    "Brie Frame",
    "Hubert Hwang",
    "Kevin Hwang",
  ],
  editors: ["Chris Gatesman", "Jesse Moeller", "Melanie Matchett Wood"],
  additional_credits: [
    {
      for_what: "Fabrication",
      who: [
        "Arcturus Wang",
        "Brad",
        "Brie Frame",
        "Fabiola Hernandez",
        "Jennifer Wang",
        "Robert “Fro” Myers",
        "Sam Duffley",
      ],
    },
    {
      for_what: "Tech",
      who: ["Arcturus Wang", "Ariel Schwartz", "Quentin Smith"],
    },
  ],
  content: {
    component: Puzzle,
    entrypoint: "puzzle_plump_himalayas",
    copyable: false,
  },
  solution: {
    component: Solution,
  },
  hints: [],
  canned_responses: [],
};

export default puzzle;
