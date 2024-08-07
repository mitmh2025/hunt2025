import type { PuzzleDefinition } from "../types";
import Puzzle from "./puzzle";
import Solution from "./solution";

const puzzle: PuzzleDefinition = {
  title: "An Exchange of Vows",
  slug: "an_exchange_of_vows",
  authors: ["Hubert Hwang"],
  content: {
    component: Puzzle,
  },
  solution: {
    component: Solution,
  },
  answer: "BOW TIE",
  hints: [
    {
      order: 0,
      description: "Solvers are having trouble getting started.",
      nudge: `Each clue can be answered by a word or phrase that fits the first enumeration. For example, the clue "musical nembur written about ballpoint pens (3 4 ⇒ 6)" has an answer that is two words long -- first word three letters, second word four letters.`,
    },
    {
      order: 50,
      description:
        "Solvers have some number of clues answered but are not sure about the second enumerations.",
      nudge: `There's one misspelled word in each clue. Consider exactly *how* it is misspelled and what that has to do with the title of the puzzle. Then, you might be able to figure out how to thematically alter your answers to the original clues to fit the second enumerations.`,
    },
    {
      order: 80,
      description:
        "Solvers have swapped vowel sounds and matched the second enumerations but are stuck.",
      keywords: ["extraction"],
      nudge:
        "Count the number of words in each clue, and note that exactly one word is misspelled in each. How could that help you extract a letter?",
    },
    {
      order: 90,
      description: `Solvers have the clue phrase "purchase digit at end of foot" and cannot answer it.`,
      keywords: ["extraction"],
      nudge:
        "This is the correct clue phrase! The enumeration for this clue is (3 3).",
    },
  ],
  canned_responses: [
    {
      guess: ["BUY TOE"],
      reply:
        "Close, but... what puzzle mechanic have you been using this whole time?",
    },
    {
      guess: ["PURCHASE DIGIT AT END OF FOOT"],
      reply:
        "This is the correct clue phrase. You should answer it in a similar way as all of the other clues in the puzzle.",
    },
  ],
};

export default puzzle;
