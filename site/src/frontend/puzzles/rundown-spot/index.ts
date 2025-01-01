import { type PuzzleDefinition } from "../types";
import Puzzle from "./puzzle";
import Solution from "./solution";

const puzzle: PuzzleDefinition = {
  title: "Dropping the Ball",
  slug: "dropping_the_ball",
  initial_description: "A circular dropquote",
  answer: "HAL INSTITUTE FOR CRIMINALLY INSANE ROBOTS",
  authors: ["Hubert Hwang"],
  editors: ["James Douberley", "Li-Mei Lim"],
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
      description: "Solvers are not sure what the diagram represents.",
      nudge:
        "This is a variant of a standard type of puzzle called a dropquote.  In a normal dropquote, certain cells are blacked out, and then letters will be “dropped” down from each column to spell out words, phrases, or sentences.",
    },
    {
      order: 10.0,
      description: "Solvers have not yet figured out the roulette connection",
      nudge:
        "Consider several things in the puzzle: the shape of the image, the number of spokes in the image, the fact that one of the spokes is highlighted in green, the symbols in the green column, and the word “chance” in the flavortext.  What concept is associated with all of those things?",
    },
    {
      order: 25.0,
      description:
        "Solvers are pondering the symbols and how they relate to the dropquote",
      keywords: ["roulette"],
      nudge:
        "There are six different symbols in the green column.  The flavortext contains the words “1:1” and “outside”.  Each of the symbols matches up with something in roulette that can be described as “1:1” and “outside”, so you can find a specific name for each of those symbols.",
    },
    {
      order: 30.0,
      description:
        "Solvers know about the roulette bets, and are trying to figure out where the “blacked out” squares are in the dropquote",
      keywords: ["dropquote", "black squares"],
      nudge:
        "Each “spoke” in the wheel is associated with a number on the roulette wheel.  Each number can be matched with three of the 50:50 bets to tell you where you are allowed to place a letter.",
    },
    {
      order: 75.5,
      description: "Solvers are stuck trying to find words and phrases",
      keywords: ["dropquote"],
      nudge:
        "There are many possible words that can be formed out of the letter banks.  To decide which are correct, consider what the six symbols stand for and look for associations.",
    },
    {
      order: 85.0,
      description:
        "Solvers are stuck trying to find words and phrases, continued",
      keywords: ["dropquote"],
      nudge:
        "Each row will be made up of phrases that should contain the name of a bet, but where that name is elided.  Figure out appropriate phrases for each bet.",
    },
    {
      order: 95.0,
      description: "Solvers are not sure how to extract",
      keywords: ["extraction"],
      nudge:
        "Once you have completed the dropquote, there should be one letter left over in each dropped column.  There is also a single letter in the original green column.  Read those letters in an appropriate order.",
    },
  ],
  canned_responses: [],
};

export default puzzle;
