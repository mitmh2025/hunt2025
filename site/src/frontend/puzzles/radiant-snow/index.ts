import { type PuzzleDefinition } from "../types";
import Puzzle from "./puzzle";
import Solution from "./solution";

const puzzle: PuzzleDefinition = {
  title: "This Is Just a Test",
  slug: "this_is_just_a_test",
  code_name: "radiant-snow",
  initial_description: "A bunch of grid logic puzzles",
  answer: "A BAD DECADE",
  authors: ["Denis Auroux"],
  editors: ["Alex Churchill", "James Douberley", "Jonathan Lay"],
  additional_credits: [],
  content: {
    component: Puzzle,
  },
  solution: {
    component: Solution,
  },
  hints: [
    {
      order: 1.0,
      description:
        "The solvers aren’t clear on the rules of the individual grids or whether they’re expected to have a unique solution.",
      keywords: ["rules", "unique solution"],
      nudge:
        "The rules for each grid can be determined by looking up their names (in most cases) and by examining the examples provided.  Given the correct set of rules, each grid has a unique solution.",
    },
    {
      order: 10.0,
      description: "Solvers are unable to make progress on the Kakuro grid.",
      keywords: ["kakuro"],
      nudge:
        "If you’re having trouble making progress on the Kakuro grid: after spotting a couple of deductions to be made in the top-left and center-top regions of the grid, you might want to look next at the top-right and bottom-left corners of the grid, where a large sum (20 or 21)  must be achieved by three cells, two of which intersect a small clue (8 or 9) in the other direction.",
    },
    {
      order: 11.0,
      description: "Solvers are confused about the meaning of ‘*’ clues",
      keywords: ["stars"],
      nudge:
        "If you’re not sure how the ‘*’ clues which appear in two of the grids differ from the more common ‘?’ clues, we suggest looking at the example grids. From those one can infer that, while a question mark stands for one missing clue, a star stands for any number of missing clues (including possibly none).",
    },
    {
      order: 12.0,
      description: "Solvers are unclear on the exact rules of “Average snake”.",
      keywords: ["average snake"],
      nudge:
        "Average Snake is a new variant, so you can’t just look it up, but as in all snake puzzles, the goal is to draw a path that doesn’t touch itself, not even diagonally (i.e., adjacent cells that belong to the snake are consecutive along the snake, and cells that share a corner are 2 apart along the snake). As shown by the example and suggested by the name, the cells are numbered from 1 to the length of the snake, and the clues next to the grid give the average of the numerical values of the cells occupied by the snake in that row or column. Furthermore, the gray cells must remain unoccupied. The end points are given, and the ? clues must take integer values.",
    },
    {
      order: 15.0,
      description: "Solvers are stuck on Hungarian Tapa",
      keywords: ["hungarian tapa"],
      nudge:
        "Make sure you are familiar with the rules of normal Tapa puzzles, as not all of them can be inferred from the provided example.  In Hungarian Tapa, the fact that the same number of cells (here 5) are occupied in each row and column is a very strong implied constraint.",
    },
    {
      order: 30.0,
      description:
        "The solvers haven’t figured out how to get letters from the individual grids.",
      keywords: ["extraction"],
      nudge:
        "Each grid has two highlighted “?” clues, giving you two numbers. Have you tried using these as indices into the grid of letters and numbers provided at the bottom of the puzzle page?",
    },
    {
      order: 40.0,
      description:
        "Some of the grids have been solved, but the team has gotten stuck on the others and didn’t get to an answer.",
      keywords: ["stuck"],
      nudge:
        "These grids aren’t easy. But, if you’re getting stuck, you can probably get to an answer without solving every single one of them.  Does it look like what you have is part of some instruction?",
    },
    {
      order: 50.0,
      description:
        "The solvers know they need to redo things differently, but they’re missing a numerical value to know exactly how.",
      keywords: ["redo", "base"],
      nudge:
        "If you already know what you need to do differently, but are missing a  certain numerical value and are unable to solve the grid that would give it to you, we suggest examining some of the other grids carefully. The requirement that every grid should still admit a solution suffices to determine the value of the parameter uniquely.",
    },
    {
      order: 60.0,
      description:
        "Solvers still can’t figure out how they’re supposed to redo the grids, and just need to be told so they can continue.",
      keywords: ["redo", "base"],
      nudge:
        "You should solve the grids again, taking all the given numerical values to be in base 12.",
    },
    {
      order: 62.0,
      description:
        "Solvers need confirmation about what digit values can be entered into the new versions of the grids.",
      keywords: ["valid digits", "base", "range"],
      nudge:
        "In Kakuro and in Japanese Sums or Products, cells can contain arbitrary non-zero digits. Killer Sudoku involves the digits 1 to 9.  For the other puzzles, the valid range is given next to the grid.",
    },
  ],
  canned_responses: [
    {
      guess: ["REDO BASE 12"],
      reply: "You’re definitely on the right track. Now go and do it!",
    },
  ],
};

export default puzzle;
