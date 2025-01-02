import { type PuzzleDefinition } from "../types";
import Puzzle from "./puzzle";
import Solution from "./solution";

const puzzle: PuzzleDefinition = {
  title: "esTIMation dot jpg",
  slug: "estimation_dot_jpg",
  initial_description:
    "You will be asked to send 2-4 team members to participate in a quiz show.",
  answer: "TOSTATETHEOBVIOUS",
  authors: ["Hubert Hwang", "Kevin Hwang"],
  editors: ["Steve Banzaert", "James Douberly", "Robin Deits", "Arcturus Wang"],
  additional_credits: [],
  content: {
    component: Puzzle,
    copyable: false,
  },
  solution: {
    component: Solution,
  },
  hints: [],
  canned_responses: [],
};

export default puzzle;
