import { type PuzzleDefinition } from "../types";

const puzzle: PuzzleDefinition = {
  title: "World’s Largest Crossword Puzzle",
  slug: "worlds_largest_crossword_puzzle",
  code_name: "puny-cold",
  initial_description:
    "A list of crossword clues and a large bitmap with repeating patterns",
  answer: "FELON",
  authors: ["David Greenspan"],
  editors: [
    "Elan Blaustein",
    "Henry Wong",
    "James Douberley",
    "Kevin Hwang",
    "Li-Mei Lim",
    "Robin Deits",
  ],
  additional_credits: [],
  content: {
    component: { lazy: () => import("./puzzle") },
    copyable: true,
  },
  solution: {
    component: { lazy: () => import("./solution") },
  },
  hints: [
    {
      order: 0.0,
      description: "The solvers don’t know where to start.",
      nudge:
        "Maybe try solving the crossword clues first.  Can you tell how they are organized?",
    },
    {
      order: 1.0,
      description:
        "The solvers have most of the crossword clues, but don’t know where to fill them in.",
      nudge:
        "You might want to zoom waaaay in on the image.  This is the World’s Largest Crossword after all!",
    },
    {
      order: 5.0,
      description:
        "The solvers understand that each white pixel is a square to fill a letter into, but aren’t sure how to fill the grid.",
      nudge:
        "Try focusing on small areas of the grid to start.  You should be able to fill in some of the smaller pieces!",
    },
    {
      order: 7.0,
      description:
        "The solvers have filled in a grid unit, but are concerned about the fill not being unique.",
      nudge:
        "That grid shape gets used a lot!  Maybe it can get filled in multiple ways too.",
    },
    {
      order: 10.0,
      description:
        "The solvers have filled in some, but not all, of the grid units.",
      nudge:
        "You should have three basic grid shapes to fill in, each of which gets used many times throughout.",
    },
    {
      order: 25.0,
      description:
        "The solvers have filled in all the grid units in all the various ways, but don’t understand what each unit represents.",
      nudge:
        "Each grid shape only has a few possibilities for how it gets filled.  What do you notice about the edges of these units?",
    },
    {
      order: 30.0,
      description:
        "The solvers see that there are 0s and 1s along the boundary of the grid units, but still don’t understand how they work.",
      nudge:
        "Think of the top and left edges as inputs and the right and bottom edges as outputs.  Can you figure out the rules for each of the grid shapes?",
    },
    {
      order: 31.0,
      description:
        "The solvers know that there are 0s and 1s along the boundaries and understand that there should be a relationship, but still aren’t sure how the grid units work.",
      nudge: "The grid shapes represent pieces of a digital circuit.",
    },
    {
      order: 40.0,
      description:
        "The solvers have identified the grid units as wires, crossovers, and half-adders, but aren’t sure what to do next.",
      nudge:
        "Can you find the 36 tables referred to in the flavortext?  Where are the tables different or the same?  Can you fill in the tables in a consistent way?",
    },
    {
      order: 45.0,
      description: "Solvers can’t find the 36 tables",
      keywords: ["Tables"],
      nudge:
        "Each “table” consists of a 5x5 set of “blocks”; wires that connect to adjacent tables; and some interesting wire ends along the right and bottom. How do the blocks behave?",
    },
    {
      order: 60.0,
      description: "Solvers don’t know what to do with the tables.",
      nudge:
        "Look at the wire ends in each table. Which ones are constrained to be a logical “one,” versus logical “zero”?  What implications does that have for the rest of the table?",
    },
    {
      order: 70.0,
      description: "Solvers still don’t know what to make of the tables",
      nudge:
        "Think of the wires as carrying binary numbers.  Tables consist of a 5x5 arrangement of “logic blocks,” each of which has a 4-digit binary coming in the top and left. The wires then exit to the right and bottom after adding some numbers. The wire ends can also be treated as binary. What kind of puzzle might this be?",
    },
    {
      order: 80.0,
      description:
        "Solvers have made progress reverse-engineering the logic blocks, but can’t quite put together the mechanics of a table",
      nudge:
        "These are Kakurasu puzzles. https://www.puzzle-kakurasu.com/faq.php",
    },
    {
      order: 90.0,
      description: "The solvers are concerned solutions aren’t unique again.",
      keywords: ["Kakurasu"],
      nudge:
        "Correct, the kakurasu “tables” do not have unique solutions by themselves.  The wires between tables impose additional restrictions.",
    },
    {
      order: 95.0,
      description: "Solvers are unsure how to extract?",
      keywords: ["Extraction"],
      nudge:
        "How are the tables connected to each other?  Which connections have a logical “one” value?",
    },
  ],
  canned_responses: [],
};

export default puzzle;
