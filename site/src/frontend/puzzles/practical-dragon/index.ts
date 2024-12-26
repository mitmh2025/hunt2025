import { type PuzzleDefinition } from "../types";
import Puzzle from "./puzzle";
import Solution from "./solution";

const puzzle: PuzzleDefinition = {
  title: "Zing it Again",
  slug: "zing_it_again",
  initial_description: "Rebus puzzles",
  answer: "THE BEATLES",
  authors: ["Alex St Claire"],
  editors: [
    "J. Hel\u00e9ne Andersson",
    "Jesse Moeller",
    "Robin Deits",
    "Steve Banzaert",
  ],
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
      guess: [
        "A FLOCK OF SEAGULLS",
        "DON MCLEAN",
        "I RAN SO TARO WAY",
        "SAM THE SHAM AND THE PHARAOHS",
        "SCHOOLY BULLY",
        "THE SAGA BEGINS",
      ],
      reply: "You are on the correct track.",
    },
    {
      guess: ["HEAR COMES THE PUN"],
      reply: "What pun sang that pun?",
    },
    {
      guess: ["HERE COMES THE SUN"],
      reply: "That’s not a pun",
    },
    {
      guess: ["SAM THE SHAM & THE PHARAOHS"],
      reply: "Use the AND spelling",
    },
  ],
};

export default puzzle;
