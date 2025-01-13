import { type PuzzleDefinition } from "../types";
import { HANDY_GLASS_SLUG } from "./constants";
import CsorrowsdGird from "./csorrowsd-gird";
import Puzzle from "./puzzle";
import Solution from "./solution";

const puzzle: PuzzleDefinition = {
  title: "Wouthit Porbelm", // If this gets moved into Dead Thief, A Csorrowsd Otsefuabcd or Sdntardas Hvae Selppid
  slug: HANDY_GLASS_SLUG, // and remember to update this variable too.
  code_name: "handy-glass",
  initial_description: "Crossword puzzle.",
  answer: "TODO PENDING",
  authors: ["Hubert Hwang", "Teddy McArthur"],
  editors: ["James Douberley", "Sid Creutz", "Steve Banzaert"],
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
      order: 5.1,
      description: "Solvers are unsure how to begin approaching the puzzle.",
      keywords: ["start"],
      nudge:
        "Each clue has every word four letters or longer internally scrambled while leaving the starting and finishing letter in place. To solve the clues, you will need to unscramble each word first.",
    },
    {
      order: 30.1,
      description:
        "Solvers have begun solving the clues, but are having trouble filling out the grid.",
      keywords: ["mechanic"],
      nudge:
        "Just like you had to unscramble the clues to solve them, you will have to rescramble the answers in a similar way to put them into the grid.",
    },
    {
      order: 95.1,
      description:
        "Solvers have the grid completed, but are unsure of extraction.",
      keywords: ["extraction"],
      nudge:
        "Every answer has its first and last letters in the “normal” place. Are there any other letters in their “normal” place, too?",
    },
  ],
  canned_responses: [
    {
      guess: ["MAKE US ONE OF THESE"],
      reply: "Cgiaonrnutoltas! ",
      link: {
        display: "Cotrctinuosn inscontrutis are hree.",
        href: "/csorrowsd_gird",
      },
    },
  ],
  subpuzzles: [CsorrowsdGird],
};

export default puzzle;
