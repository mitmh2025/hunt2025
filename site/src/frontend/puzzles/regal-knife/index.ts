import { type PuzzleDefinition } from "../types";
import Puzzle from "./puzzle";
import Solution from "./solution";

const puzzle: PuzzleDefinition = {
  title: "Cruciverbal",
  slug: "cruciverbal",
  initial_description: "A US-style crossword grid and two audio files",
  answer: "WITHOUT STOPPING",
  authors: ["Teddy McArthur", "Amanda Giermann", "Jonathan Lay", "Kevin Hwang"],
  editors: ["Elan Blaustein", "Hubert Hwang", "James Douberley", "Nathan Fung"],
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
      order: 0.1,
      description: "Solvers are unsure how to begin approaching the puzzle.",
      keywords: ["where to start"],
      nudge:
        "The two audio files contain the clue list for the across and down clues, respectively. Since you have the grid and know how many across and down entries there are, you can start transcribing each audio file and try to divide it up so that it fits neatly into the right number of entries—41 Across entries and 37 Down entries. Don’t be afraid to revisit where you make those splits, and keep an ear out for homophones!",
    },
    {
      order: 10.1,
      description:
        "Solvers have transcribed the audio but are unsure how to start filling the grid",
      nudge:
        "Look for a couple of clues in the same audio file where you are both pretty sure that you have the clue division correct and know there is only one possible entry for that clue. You know the lengths of both entries and their order relative to each other, and you can estimate how many clues might come between them—or, if you’re lucky, they’re back-to-back and will be one after the other in the grid. Look for possible places that this pair could fit in the grid based on their length, their relative position in the clue list, and their relative position to each other. Once you have this foothold, you can use these as reference points; for clues in the same list as these, you now have solid dividing points that will split the list into entries that come before, entries that come between (if any), and entries that come after; and for clues in the other list, you can start using the crossing letters alongside the answer lengths to start building out.",
    },
    {
      order: 10.2,
      description:
        "Teams are struggling to find a foothold in the grid, even with the prior advice.",
      nudge:
        "Here’s a few clues to get you started: 43-Across is “Setting in ‘The King and I’.” 4-Down is “A specific mauna.” 38-Down is “A short holiday?”",
    },
    {
      order: 95.1,
      description:
        "Teams have completed (or mostly completed) the grid, but do not have the extract.",
      keywords: ["extraction"],
      nudge:
        "What if there were a third audio file? What would that represent?",
    },
    {
      order: 95.2,
      description: "Teams need a more explicit nudge to extraction.",
      keywords: ["extraction"],
      nudge:
        "The first audio file is for across clues; the second audio file is for down clues. If there were a third audio file, it would likely cover diagonal clues. How would that start?",
    },
    {
      order: 95.3,
      description: "The teams need a really strong nudge to extraction.",
      keywords: ["extraction"],
      nudge:
        "The third audio file, if transcribed, would read in its entirety: “The answer.”",
    },
  ],
  canned_responses: [],
};

export default puzzle;
