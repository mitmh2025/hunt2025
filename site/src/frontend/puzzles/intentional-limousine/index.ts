import { type PuzzleDefinition } from "../types";
import Puzzle from "./puzzle";
import Solution from "./solution";

const puzzle: PuzzleDefinition = {
  title: "The Art Gallery",
  slug: "the_art_gallery",
  answer: "BOX OWNER",
  authors: ["Alex St Claire", "Mike Mannis"],
  editors: ["James Douberley", "Li-Mei Lim", "Robin Deits"],
  additional_credits: [],
  content: {
    component: Puzzle,
    copyable: false,
  },
  solution: {
    component: Solution,
  },
  hints: [
    {
      order: 10.0,
      description: "Solvers don’t yet know what these answers have in common.",
      nudge:
        "Every answer is multiple words. Have you looked for something they have in common?",
    },
    {
      order: 15.0,
      description:
        "Solvers are still stuck and don’t know how the words relate.",
      keywords: ["Color", "Colors"],
      nudge: "Try looking for some uniquely named colors in the answers.",
    },
    {
      order: 50.0,
      description:
        "Solvers have found the colors but don’t know what the other words in each pair contribute.",
      keywords: ["Crayola"],
      nudge:
        "The first words in the answers have something in common having to do with the way they are spelled.",
    },
    {
      order: 70.0,
      description: "The solvers haven’t figured out how to sort the answers",
      keywords: ["Sorting", "sort"],
      nudge:
        "All of the answers are multiple words, make sure to look at those words together to look for a way to sort.",
    },
    {
      order: 90.0,
      description:
        "Solvers have noticed the specific colors and the initial letters but don’t know what to do with that information.",
      keywords: ["Extraction"],
      nudge: "Have you tried looking at the puzzle titles after sorting?",
    },
    {
      order: 99.0,
      description:
        "The solvers have tried extended ASCII but are getting nonsense.",
      keywords: ["ASCII", "extended ASCII"],
      nudge:
        "There are multiple types of character encodings. Which one is being hinted at by the puzzle titles in order?",
    },
  ],
  canned_responses: [
    {
      guess: ["BÒ× òwNÈ®"],
      reply:
        "That’s a very artistic way of writing it. Can you resubmit in normal Latin characters?",
    },
    {
      guess: ["UNICODES"],
      reply: "Keep going!",
    },
  ],
};

export default puzzle;
