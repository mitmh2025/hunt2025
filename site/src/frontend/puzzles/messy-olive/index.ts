import { type PuzzleDefinition } from "../types";
import Puzzle from "./puzzle";
import Solution from "./solution";

const puzzle: PuzzleDefinition = {
  title: "Relief Printing",
  slug: "relief_printing",
  initial_description: "A series of rectangular drawings with blocks of color.",
  answer: "LACK",
  authors: ["Kawika Pierson", "Alex St Claire", "phyphor"],
  editors: ["Erin Price", "Hubert Hwang", "Laura Nicholson"],
  additional_credits: [
    {
      for_what: "Art",
      who: ["Becca Chang"],
    },
  ],
  content: {
    component: Puzzle,
    copyable: false,
  },
  solution: {
    component: Solution,
  },
  hints: [
    {
      order: 0.0,
      description: "Solvers have not made any progress.",
      keywords: ["start"],
      nudge:
        "Try to identify the words clued by each of the pictures and pay attention to how many letters each has.",
    },
    {
      order: 10.0,
      description:
        "Solvers have identified some pictures but are struggling with ones that would be easy if they knew the correct word lengths.",
      keywords: ["mountain", "mouth", "paper"],
      nudge: "Why do you think these blocks all have different lengths?",
    },
    {
      order: 30.0,
      description:
        "Solvers have identified many of the words clued by the pictures and some of the colors.",
      keywords: ["colors"],
      nudge:
        "Can you find a connection between any of the words you have identified and any of the colors on the wood blocks?",
    },
    {
      order: 40.0,
      description:
        "Solvers have identified most of the colors and most of the words but don’t know how to use the blank on each block.",
      keywords: ["blank", "tan", "beige", "green", "hard colors"],
      nudge:
        "Could you add a letter to each of the words clued by the images and form a different word by placing that letter in the blank space?",
    },
    {
      order: 60.0,
      description:
        "Solvers have done the identification of all of the words and all of the colors but don’t know what to do next.",
      keywords: ["extraction", "now what"],
      nudge:
        "Why do these blocks only have color in some places? If these were real relief prints how would applying ink in only those places impact what would be printed?",
    },
    {
      order: 70.0,
      description:
        "Solvers have extracted but are struggling with ordering those letters or forming the clue phrase.",
      keywords: ["ordering", "clue phrase"],
      nudge:
        "The flavor text suggests that someone might be connected with these new colors, how could you use that to make sense of your extracted letters?",
    },
    {
      order: 90.0,
      description:
        "Solvers have the full clue phrase but don’t know what to do with it.",
      keywords: ["CMY", "clip"],
      nudge:
        "Try to reapply the core mechanic of the puzzle using the color word that usually comes after CMY when you ask a printer.",
    },
    {
      order: 100.0,
      description:
        "Solvers know that they should “clip” black but don’t know how to enter the final answer.",
      keywords: ["black", "clip black"],
      nudge:
        "Notice that the final block has only 4 question marks, and that they are to the right of a blank space. Does that remind you of anything you did earlier in the puzzle, and does BLACK fit that pattern?",
    },
  ],
  canned_responses: [
    {
      guess: ["BLACK"],
      reply: "Keep going! Clip it!",
    },
    {
      guess: ["CLIP BLACK"],
      reply: "Yes, do that.",
    },
    {
      guess: ["CLIP COLOR AFTER CMY"],
      reply: "Keep going!",
    },
  ],
};

export default puzzle;
