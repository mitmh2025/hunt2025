import { type PuzzleDefinition } from "../types";
import Puzzle from "./puzzle";
import Solution from "./solution";

const puzzle: PuzzleDefinition = {
  title: "Cross Spread",
  slug: "cross_spread",
  initial_description: "Five lines of letters",
  answer: "REUNITED",
  authors: ["Leland Aldridge"],
  editors: ["Chris Gatesman", "James Douberley", "Robin Deits"],
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
      description: "Solvers are stuck at the beginning",
      keywords: ["beginning", "start"],
      nudge:
        "Each line of text has a certain structure. Two letters can go in the blanks to tell you how to interpret that structure.",
    },
    {
      order: 20.0,
      description:
        "Solvers have thought of picross/nonograms but are having difficulty constructing the grids.",
      keywords: ["picross", "nonograms", "fit"],
      nudge:
        "On the left of the semicolon is “you,” and on the right is “what crosses you.” This crossing occurs in each cell, and nothing remains uncrossed.",
    },
    {
      order: 30.0,
      description:
        "Solvers have received the previous clue but continue to have difficulty constructing the grids",
      keywords: ["picross", "nonograms", "fit"],
      nudge:
        "When complete, each line of the puzzle should produce a five by five grid where each grid cell is either empty or contains an ordered pair of letters.",
    },
    {
      order: 40.0,
      description:
        "Solvers have constructed the picross grids and have the message PLAYFAIR IS SUITABLE",
      keywords: ["playfair is suitable"],
      nudge:
        "Playfair is a type of cipher, if you are unfamiliar you can read about how it functions. The rest of the message, and the title and flavor text, can point you to how to use this cipher to make sense of the other grids.",
    },
    {
      order: 50.0,
      description:
        "Solvers have identified the tarot suits and have decrypted some but not all of the grids",
      keywords: ["swords", "wands", "pentacles", "cups"],
      nudge:
        "As you are trying to turn nonsense into sense, make sure that you are decrypting and not encrypting.",
    },
    {
      order: 60.0,
      description:
        "Solvers have decrypted the grids and are working on answering the clues",
      keywords: ["decrypted", "clues"],
      nudge:
        "All the answers to the clues have a similar structure that is tied very closely to the overall puzzle theming. Some clues have multiple answers if considered alone, but only one that has the correct structure.",
    },
    {
      order: 80.0,
      description:
        "Solvers have identified the clue answers as pairs of Major Arcana from the Rider-Waite tarot.",
      keywords: ["major arcana"],
      nudge: "The major arcana are all numbered in the Rider-Waite tarot.",
    },
    {
      order: 100.0,
      description:
        "Solvers have turned each clue’s answer into a digraph based on the major arcana numbering.",
      keywords: ["extraction", "digraph", "letter pairs"],
      nudge:
        "These letter pairs don’t look to spell anything. You’ve handled a similar situation in the puzzle already.",
    },
  ],
  canned_responses: [
    {
      guess: ["PLAYFAIR IS SUITABLE"],
      reply: "Yes, it is!",
    },
  ],
};

export default puzzle;
