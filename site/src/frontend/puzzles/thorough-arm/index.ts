import { type PuzzleDefinition } from "../types";
import Puzzle from "./puzzle";
import Solution from "./solution";

const puzzle: PuzzleDefinition = {
  title: "Drunkens and Flagons",
  slug: "drunkens_and_flagons",
  code_name: "thorough-arm",
  initial_description: "Zebra style logic puzzle",
  answer: "SLEIGHT OF HAND",
  authors: ["Ariel Schwartz"],
  editors: ["Chris Gatesman", "Erin Price", "Hubert Hwang", "Robin Deits"],
  additional_credits: [],
  content: {
    component: Puzzle,
    copyable: true,
  },
  solution: {
    component: Solution,
  },
  hints: [],
  canned_responses: [
    {
      guess: ["ANSWER CHECK TO PILFER BAG", "CHECK TO PILFER BAG"],
      reply: "This is a cluephrase for the final answer.",
    },
    {
      guess: [
        "ANSWER CHECK TO PILFER BAG SEVEN TWO FOUR",
        "CHECK TO PILFER BAG SEVEN TWO FOUR",
      ],
      reply: "This is a cluephrase and enumeration for the final answer.",
    },
    {
      guess: ["GO PAY TAB"],
      reply:
        "The bartender is glaring daggers at you. You’d better go to the Gala and pay up. Send someone who can act appropriately contrite.",
    },
  ],
};

export default puzzle;
