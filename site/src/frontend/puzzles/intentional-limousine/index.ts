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
      description: "The solvers haven’t figured out it’s Crayola or colors",
      nudge:
        "Every answer is multiple words. Have you looked for something they have in common?",
    },
    {
      order: 15.0,
      description:
        "The solvers think it’s colors, but they haven’t figured out it’s Crayola.",
      keywords: ["color", "colors"],
      nudge: "Try looking for some uniquely named colors in the answers.",
    },
    {
      order: 50.0,
      description: "The solvers haven’t noticed the RGB",
      keywords: ["crayola"],
      nudge: "The first words of the answers have something in common.",
    },
    {
      order: 70.0,
      description:
        "The solvers haven’t figured out to sort the answers by length most likely because they split the Crayola words and the RGB words into separate columns.",
      keywords: ["sorting", "sort"],
      nudge:
        "All of the answers are multiple words, make sure to look at those words together to look for a way to sort.",
    },
    {
      order: 90.0,
      description:
        "The solvers have figured out it’s RGB for Crayola colors, but don’t know what to do next. They haven’t figured out Unicode",
      keywords: ["extraction"],
      nudge: "Have you tried looking at the puzzle titles after sorting?",
    },
    {
      order: 99.0,
      description: "The solvers are using extended ASCII instead of Unicode",
      keywords: ["ASCII", "extended ASCII"],
      nudge: "There are multiple types of ASCII. Which one is being hinted at?",
    },
  ],
  canned_responses: [
    {
      guess: ["UNICODES"],
      reply: "That’s interesting! Maybe you should look into that.",
    },
    {
      guess: ["BÒ× òwNÈ®"],
      reply:
        "That’s a very artistic way of writing it. Can you resubmit in normal Latin characters?",
    },
  ],
};

export default puzzle;
