import type { PuzzleDefinition } from "../types";
import Puzzle from "./puzzle";
import Solution from "./solution";

const puzzle: PuzzleDefinition = {
  title: "Shell Corporation 6: The MITropolis Times",
  slug: "shell_corporation_6",
  authors: ["Leland Aldridge"],
  editors: ["James Douberley", "Li-Mei Lim", "Robin Deits"],
  additional_credits: [],
  content: {
    component: Puzzle,
    copyable: true,
  },
  solution: {
    component: Solution,
  },
  answer: "MILLIMETERS",
  hints: [
    {
      order: 0.0,
      description: "Solvers are at the beginning of the puzzle.",
      keywords: ["Lost", "beginning"],
      nudge:
        "The flavor text has a particular cadence that doesn’t sound quite like natural English. The title of the puzzle indicates that this is themed around a newspaper called the Times. How might these things be related?",
    },
    {
      order: 5.0,
      description:
        "Solvers have received the first hint, but need further guidance.",
      keywords: ["Headline"],
      nudge:
        "This is a puzzle based on the form of cryptic crosswords. The flavor text is a cryptic clue explaining something about the rest of the puzzle.",
    },
    {
      order: 15.0,
      description: "Solvers know only that the puzzle is based on cryptics",
      keywords: ["Cryptic", "purpose", "why"],
      nudge:
        "Each item in the section under the flavor text, when its blanks are filled in, form a particular style of cryptic clue. The flavor text, when interpreted, explains what this style of clue is. The 16 numbered words with enumeration which fill in the blanks are original to this puzzle.",
    },
    {
      order: 25.0,
      description: "Solvers need more help with the structure of the puzzle",
      keywords: ["Feeders"],
      nudge:
        "Each cryptic clue that you make by filling in the blanks will resolve to an answer. Your task is to find a consistent set of 16 words where all seven cryptic clues properly resolve to a feeder’s answer.",
    },
    {
      order: 50.0,
      description:
        "Solvers are filling in words to make cryptic clues but are having a hard time.",
      keywords: ["Some", "blanks", "know"],
      nudge:
        "It may help to know that the list of cryptic clues is alphabetical by answer and the list of blank-filling words is also alphabetical. The parenthesized numbers in the list of blank-filling words are enumerations.",
    },
    {
      order: 75.0,
      description:
        "Solvers are part way through assigning words and have some functional cryptic clues, but are stuck",
      keywords: ["Rest", "remainder", "cryptic"],
      nudge:
        "[Look at solution document and confirm/deny the words and interpretations supplied by the solvers. If there are alphabetization problems, point out that the lists should be alphabetical.]",
    },
    {
      order: 90.0,
      description:
        "Solvers feel that there are not enough feeder options to fully satisfy the alphabetization criterion",
      keywords: ["Alphabetical", "nothing fits"],
      nudge:
        "You are correct that the list of answers is alphabetical, but you may need to consider a more permissive definition of that than you have been using.",
    },
    {
      order: 100.0,
      description:
        "Solvers have mostly solved the clues and identified the blank-filling words and are trying to extract",
      keywords: ["Extraction", "final clue"],
      nudge:
        "The string of blanks at the bottom of the puzzle, when filled in, form one final cryptic clue. Remember that punctuation in a cryptic clue is usually only for the surface reading.",
    },
  ],
  canned_responses: [],
};

export default puzzle;
