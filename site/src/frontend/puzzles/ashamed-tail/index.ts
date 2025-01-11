import { type PuzzleDefinition } from "../types";
import Puzzle from "./puzzle";
import Solution from "./solution";

const puzzle: PuzzleDefinition = {
  title: "Absolutely Not Balderdash",
  slug: "absolutely_not_balderdash",
  initial_description: "Five groups of crossword-style clues",
  answer: "NIMBLE FEET",
  authors: ["Julian West", "Chris Pringle"],
  editors: ["Anna Brunner", "Melanie Matchett Wood", "Teddy McArthur"],
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
      order: 10.0,
      description:
        "Solvers have solved some clues but don’t see an overall structure.",
      keywords: ["ambiguous", "have in common", "consistency"],
      nudge:
        "What is the total length, adding them up, of all the required answers in a block of clues?",
    },
    {
      order: 20.0,
      description:
        "Solvers know that the answers in a block total 100 letters.",
      keywords: ["awkward clues", "panalphabetic"],
      nudge:
        "What is the total length of all the *clues* in a block? Does that number suggest anything? What else might two blocks have in common?",
    },
    {
      order: 50.0,
      description: "Stuck on block 1",
      keywords: ["block 1"],
      nudge:
        "Depending on what you have have and haven’t solved: The nationality associated with these “Asia folk” is actually an obsolete term. // Where are the Tuileries, and what can you find there? // Think of fictional characters named Drew and Spade who have something in common. What is their profession?",
    },
    {
      order: 50.0,
      description: "Stuck on block 2",
      keywords: ["block 2"],
      nudge:
        "Depending on what you have have and haven’t solved:  The “eye imagizer dot” is a specific part of the eye. // What kind of bird would need a queen?",
    },
    {
      order: 50.0,
      description: "Stuck on block 3",
      keywords: ["block 3"],
      nudge:
        "Depending on what you have have and haven’t solved:  One region of the sky where Pisces is located is the zodiac. Find another one. // “to the max” is a lot less formal than the (non-English) term that it is cluing.",
    },
    {
      order: 50.0,
      description: "Stuck on block 4",
      keywords: ["block 4"],
      nudge:
        "Depending on what you have have and haven’t solved: <sings “Abdulmajid” > and <warble “Zoe” > are basically the same kind of clue, and looking for the same kind of answer. // The answer to the “more than a few” clue really is a *lot* more than a few.",
    },
    {
      order: 50.0,
      description: "Stuck on block 5",
      keywords: ["block 5"],
      nudge:
        "Depending on what you have have and haven’t solved: We’re looking for an actual slogan used by Henry the Fifth (and other British monarchs). It doesn’t appear in Shakespeare’s play about Henry V. // For “dig and die” , we want something that you might dig, and in which you might die.",
    },
    {
      order: 90.0,
      description:
        "They have completely solved at least three blocks, but don’t know what to extract.",
      keywords: ["Extraction"],
      nudge:
        "Do you know what word game uses this letter distribution? Does that give you an idea of what to extract?",
    },
  ],
  canned_responses: [],
};

export default puzzle;
