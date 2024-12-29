import { type PuzzleDefinition } from "../types";
import Puzzle from "./puzzle";
import Solution from "./solution";

const puzzle: PuzzleDefinition = {
  title: "Garden Anecdotes",
  slug: "garden_anecdotes",
  initial_description: "Some post-it notes and some ciphertext.",
  answer: "LITTLE GREEN HOUSE",
  authors: ["Joanna Murray"],
  editors: ["Nathan Fung", "Teddy McArthur", "tinaun"],
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
      description: "Solvers have no idea how to begin",
      nudge:
        "The words ‘columns’ and ‘transposition’ are the important ones from the flavortext to start with. Can you find any clues for what the puzzle could be about by searching for those terms?",
    },
    {
      order: 25.0,
      description:
        "Solvers have identified that ‘Columnar Transposition’ is a type of cipher, but don’t know how it relates to the texts in the puzzle.",
      keywords: ["columnar transposition"],
      nudge:
        "Try comparing the individual plaintext messages to each of the ciphertexts in turn.",
    },
    {
      order: 40.0,
      description:
        "Solvers have noticed that three of the four ciphertexts are anagrams of the three plaintexts, but have not identified columnar transposition as the method.",
      keywords: ["anagram"],
      nudge:
        "The words ‘columns’ and ‘transposition’ are the important ones to investigate from the flavortext.",
    },
    {
      order: 50.0,
      description:
        "Solvers have noticed that three of the four ciphertexts are anagrams of the three plaintexts, and have identified columnar transposition as the way to solve the puzzle, but are unable to work out how to solve the transposition.",
      keywords: ["anagram", "columnar transposition"],
      nudge:
        "Are there any letter positions in the ciphertext you can identify as being particular letter positions in the plaintext? Try starting there.",
    },
    {
      order: 55.0,
      description:
        "Solvers have started to try and reconstruct a transposition but are getting stuck/confused (and they are possibly trying online solvers, which won’t work).",
      keywords: ["columnar transposition"],
      nudge:
        "In a columnar transposition, if B immediately follows A in the ciphertext then B will be immediately below A within a column. Try writing some plausible columns (you know that the end of the ciphertext will be at the end of a column, for example). Can you find any other columns to go alongside that make plaintext in the rows that you can match with the plaintext messages?",
    },
    {
      order: 60.0,
      description:
        "Solvers are making some progress reconstructing a transposition but are getting stuck/confused when some columns don’t work.",
      keywords: ["columnar transposition", "partial columns"],
      nudge:
        "The flavortext hints that the transposition will have an irregular shape, so don’t worry if you find some boxes in the grid aren’t used.",
    },
    {
      order: 80.0,
      description:
        "Solvers have recovered the house shape for one or more of the plaintext/ciphertext pairs but are unsure what to do next.",
      keywords: ["house"],
      nudge: "Have you accounted for all of the ciphertext messages?",
    },
    {
      order: 85.0,
      description:
        "Solvers have decrypted the final message which explains how to go from a phrase to a permutation but are unsure how to use this information.",
      keywords: ["key phrase", "permutation", "alphabetical order"],
      nudge:
        "The order in which the columns are extracted from the grid to make ciphertext gives a permutation.",
    },
    {
      order: 90.0,
      description:
        "Solvers have recovered the text of the fourth message and know that they have a permutation from the orders the columns are read out but are unsure how to use this information to proceed.",
      keywords: ["permutation", "key phrase", "alphabetical order"],
      nudge:
        "You now know how to turn a phrase into a permutation, but you have a permutation and you want a phrase.",
    },
    {
      order: 95.0,
      description:
        "Solvers have worked out how they will need to find the key phrase in theory but are struggling to find a way in.",
      keywords: ["house", "key phrase", "permutation", "alphabetical order"],
      nudge:
        "Are there any words you might expect to be referenced in the key phrase, and can you find any places they could plausibly go, given you know the method for creating it?",
    },
  ],
  canned_responses: [
    {
      guess: ["HOUSE"],
      reply: "Well done for recovering the shape; keep going.",
    },
  ],
};

export default puzzle;
