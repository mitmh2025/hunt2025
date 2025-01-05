import { type PuzzleDefinition } from "../types";
import Puzzle from "./puzzle";
import router from "./server";
import Solution from "./solution";

const puzzle: PuzzleDefinition = {
  title: "The Annual Massachusetts Spelling Bee",
  slug: "the_annual_massachusetts_spelling_bee",
  initial_description: "A spelling bee.",
  answer: "VAMPIRE BUTTERFLY",
  authors: ["Elan Blaustein"],
  editors: ["Anna Brunner", "Kevin Hwang", "Melanie Matchett Wood"],
  additional_credits: [
    {
      for_what: "Tech",
      who: ["rfong", "tinaun"],
    },
  ],
  content: {
    component: Puzzle,
    entrypoint: "puzzle_few_nail",
  },
  solution: {
    component: Solution,
  },
  hints: [
    {
      order: 0.0,
      description: "Solvers are stuck completing the spelling bee [Weak Hint]",
      keywords: ["spelling bee", "honorable", "councilor"],
      nudge:
        "This is a Spelling Bee, suggesting that all words must be spelled according to a reference source, such as a dictionary. What part of the puzzle clues this source?",
    },
    {
      order: 1.0,
      description:
        "Solvers are stuck completing the spelling bee for the first time and might still think “fourth edition” applies to Merriam-Webster [Strong Hint]",
      keywords: ["spelling bee", "honorable", "councilor", "fourth edition"],
      nudge:
        "All words should be spelled according to the Merriam-Webster dictionary. Knowing the edition isn’t currently useful.",
    },
    {
      order: 10.0,
      description:
        "Solvers have completed the spelling bee but have not identified the next step [Weak Hint]",
      keywords: ["completed", "finished", "Dexter", "solty"],
      nudge:
        "Have you listened to all the information the judges have given you?",
    },
    {
      order: 11.0,
      description:
        "Solvers have completed the spelling bee but have not identified the next step [Medium Hint]",
      keywords: [
        "completed",
        "finished",
        "Dexter",
        "solty",
        "Bonaparte",
        "1747",
      ],
      nudge:
        "Judge Dexter’s usage of each word is strange, try searching some of the sentences he provides to determine his identity.",
    },
    {
      order: 12.0,
      description:
        "Solvers have completed the spelling bee but have not identified the next step [Strong Hint]",
      keywords: [
        "completed",
        "finished",
        "Dexter",
        "solty",
        "Bonaparte",
        "1747",
      ],
      nudge:
        "The identity of Judge Dexter is Timothy Dexter, an 18th-century entrepreneur who lived in Massachusetts. He wrote a piece of literature that is relevant to this puzzle.",
    },
    {
      order: 20.0,
      description:
        "Solvers have identified Timothy Dexter and A Pickle for the Knowing Ones, but don’t know how to use them",
      keywords: ["completed", "finished", "pickle"],
      nudge:
        "Dexter’s sentences appear in A Pickle for the Knowing Ones, containing many words that appear to be horribly misspelled. Try to find the relevant sentences in the book.",
    },
    {
      order: 30.0,
      description:
        "Solvers have identified most of Dexter’s misspellings but don’t know what to do with them",
      keywords: ["pickle", "misspelled"],
      nudge:
        "Each of the book excerpts provides an alternate spelling for each word in the Spelling Bee. Try entering them all into the puzzle and see what changes.",
    },
    {
      order: 40.0,
      description:
        "Solvers have completed the spelling bee using Dexter’s spellings but haven’t identified the next step [Weak Hint]",
      keywords: ["completed", "misspelled", "red marks"],
      nudge:
        "The revealed flavor text references red marks, where have you seen red marks in this puzzle?",
    },
    {
      order: 41.0,
      description:
        "Solvers have completed the spelling bee using Dexter’s spellings but haven’t identified the next step [Strong Hint]",
      keywords: ["completed", "misspelled", "red marks", "incorrect"],
      nudge:
        "Spelling a word incorrectly colors the entered word such that the first incorrect letter is colored red. Since Dexter’s spellings are uncolored, you must figure out which letter would be marked red.",
    },
    {
      order: 50.0,
      description:
        "Solvers have extracted the words from each round but don’t know what the numbers mean",
      keywords: [
        "enumeration",
        "BLOSM",
        "KAMPURR",
        "ANBERSANND",
        "FYOOREE",
        "PHIB",
        "SODD",
        "KEESH",
        "JNTLMIN",
      ],
      nudge:
        "The revealed flavor text states “Merriam doesn’t understand what he is hearing”. Merriam is also associated with giving you words that you must spell correctly. What can you do with the extracted words to make them match the first number in each enumeration, which is also spoken by Merriam.",
    },
    {
      order: 60.0,
      description:
        "Solvers have spelled the extracted words from each round correctly but are unsure how to use the second number [Weak Hint]",
      keywords: [
        "enumeration",
        "synonym",
        "BLOSSOM",
        "CAMPER",
        "AMPERSAND",
        "FURY",
        "FIB",
        "SOD",
        "QUICHE",
        "GENTLEMAN",
      ],
      nudge:
        "The revealed flavor text states “Webster can’t find the right words”. Webster is also associated with giving you the meanings of words. What can you do with the extracted words to make them match the second number in each enumeration, which is also spoken by Webster.",
    },
    {
      order: 61.0,
      description:
        "Solvers have spelled the extracted words from each round correctly but are unsure how to use the second number [Strong Hint]",
      keywords: [
        "enumeration",
        "synonym",
        "BLOSSOM",
        "CAMPER",
        "AMPERSAND",
        "FURY",
        "FIB",
        "SOD",
        "QUICHE",
        "GENTLEMAN",
      ],
      nudge:
        "Each extracted word was transformed to match Merriam’s first enumeration. Webster’s interruption suggests you must transform each word again to match his second enumeration. As Webster is associated with definitions and meanings, you must replace each word with a short synonym.",
    },
    {
      order: 70.0,
      description:
        "Solvers have found most of the synonyms but haven’t figured out the order",
      keywords: [
        "punctuation",
        "order",
        "solty",
        "BUD",
        "VAN",
        "AND",
        "IRE",
        "LIE",
        "TURF",
        "PIE",
        "SIR",
      ],
      nudge:
        "Each round, and by extension, each extracted synonym is associated with a punctuation mark. Try searching for where Dexter uses punctuation in A Pickle for the Knowing Ones.",
    },
    {
      order: 100.0,
      description: "Solvers have found and re-ordered all the synonyms",
      keywords: ["enumeration", "synonym", "order"],
      nudge:
        "The puzzle is themed around misspellings. Ordering the extracted synonyms according to the punctuation in A Pickle for the Knowing Ones will produce a string of words that, phonetically, spell out the answer, matching the given enumeration (6 7 9).",
    },
  ],
  canned_responses: [],
  router,
};

export default puzzle;
