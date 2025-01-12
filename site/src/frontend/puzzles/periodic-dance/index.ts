import { type PuzzleDefinition } from "../types";
import Puzzle from "./puzzle";
import Solution from "./solution";

const puzzle: PuzzleDefinition = {
  title: "The Ultimate Insult",
  slug: "the_ultimate_insult",
  code_name: "periodic-dance",
  initial_description: "List of insults",
  answer: "SMASH MOUTH",
  authors: ["Alex St Claire", "Kawika Pierson"],
  editors: ["Hubert Hwang", "James Douberley"],
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
      description: "Solvers unsure where to start",
      keywords: ["Identify"],
      nudge:
        "Everything comes from a common data source, have you figured out what that is?",
    },
    {
      order: 15.0,
      description: "Solvers have figured out it’s video game characters",
      keywords: ["video game"],
      nudge: "Is there a common video game that has all these characters?",
    },
    {
      order: 30.0,
      description: "Solvers have found some Super Smash Bros Characters",
      keywords: ["Super Smash Bros"],
      nudge:
        "These characters all come for the ultimate installment of the game.",
    },
    {
      order: 50.0,
      description: "Solvers are looking at Smash abilities",
      keywords: ["Moves", "Ultimates"],
      nudge:
        "Consider the ways that these characters can provoke, annoy or mock their opponent.",
    },
    {
      order: 80.0,
      description: "Solvers have figured out it’s SSBU characters and taunts",
      keywords: ["Extraction"],
      nudge: "How would you tell the difference between the three options?",
    },
  ],
  canned_responses: [],
};

export default puzzle;
