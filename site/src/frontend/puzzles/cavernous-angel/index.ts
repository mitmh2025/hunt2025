import { type PuzzleDefinition } from "../types";
import Puzzle from "./puzzle";
import Solution from "./solution";

const puzzle: PuzzleDefinition = {
  title: "A Badly Broken Quote",
  slug: "a_badly_broken_quote",
  code_name: "cavernous-angel",
  initial_description: "Fourteen dropquotes",
  answer: "EVENING NEWS",
  authors: ["Helena Wang"],
  editors: ["Erin Price", "Robin Deits", "Steve Banzaert"],
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
      description: "Solvers are unfamiliar with this type of grid puzzle.",
      keywords: ["crossword", "blanks", "unscramble"],
      nudge:
        "These puzzles are a type of puzzle called a Dropquote. A quote is written across several lines and the letters in each column must be dropped down in some order to fill in the quote. https://en.wikipedia.org/wiki/Dropquote",
    },
    {
      order: 15.0,
      description: "Solvers have solved the first thirteen dropquotes.",
      keywords: ["dropquotes", "quotes", "grids", "filled", "solved"],
      nudge:
        "All of these dropquotes are based on lyrics from songs by the same artist.",
    },
    {
      order: 15.5,
      description:
        "Solvers have solved the first thirteen dropquotes and know that they are lyrics.",
      keywords: ["artist", "singer", "lyrics", "songs"],
      nudge: "The dropquotes are based on lyric excerpts of songs by Dessa.",
    },
    {
      order: 50.0,
      description:
        "Solvers have identified the quotes as Dessa lyrics and have found the changed word in each lyric.",
      keywords: ["different", "changed", "word", "original"],
      nudge:
        "Try comparing the word in the dropquote to the original word in the lyrics. What has changed in each of the original words?",
    },
    {
      order: 60.0,
      description:
        "Solvers have identified shared letters between the new and original words.",
      keywords: ["shared", "common", "changed", "original", "longer"],
      nudge:
        "Instead of looking at what the new and original words have in common, look at what has changed and what it has been changed to.",
    },
    {
      order: 70.0,
      description:
        "Solvers have identified that the original letters have been replaced by either one or two new letters.",
      keywords: ["replaced", "original", "changed", "letters"],
      nudge:
        "Count the number of original letters that have been changed; they encompass a full set.",
    },
    {
      order: 75.0,
      description:
        "Solvers have identified that the original letters encompass all letters of the alphabet",
      keywords: ["alphabet", "replaced", "original", "changed", "letters"],
      nudge:
        "The original letters can be used as a key to create a new alphabet out of the new letters and bigrams that have replaced them.",
    },
    {
      order: 80.0,
      description:
        "Solvers have identified that the original letters can create an alphabet with the new letters and bigrams",
      keywords: [
        "alphabet",
        "replaced",
        "original",
        "changed",
        "letters",
        "extraction",
      ],
      nudge:
        "For the final dropquote, replace the letters in the banks with the corresponding new letter or bigram that replaces them in the original word.",
    },
    {
      order: 90.0,
      description:
        "Solvers have solved the final dropquote and yielded a cluephrase",
      keywords: ["extraction", "parse", "blank"],
      nudge: "This last dropquote is also referring to two songs by Dessa.",
    },
  ],
  canned_responses: [],
};

export default puzzle;
