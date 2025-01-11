import { type PuzzleDefinition } from "../types";
import Puzzle from "./puzzle";
import Solution from "./solution";

const puzzle: PuzzleDefinition = {
  title: "Corn Maize",
  slug: "corn_maize",
  initial_description:
    "A large list of crossword clues and five separate crossword grids",
  answer: "GARDEN CENTER",
  authors: ["Peter Lorenz"],
  editors: ["James Douberley", "Li-Mei Lim", "Nathan Fung", "Robin Deits"],
  additional_credits: [
    {
      for_what: "Art",
      who: ["tinaun"],
    },
  ],
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
      description:
        "Solvers have the grids and clues, but don’t know how to place clues into the correct grids",
      keywords: ["grids", "clues", "numbers"],
      nudge:
        "There are 5 freeform-style crossword grids. The clues for the grids are mixed together into a single list. This list is separated into Across and Down, and each clue is numbered. Some numbers will have more than one clue because more than one grid includes that number. Try solving some clues to see if a method of sorting out which grids they belong to presents itself.",
    },
    {
      order: 1.0,
      description:
        "Solvers have the rules for following the maze, but can’t find a valid solution",
      keywords: ["maze", "mazes", "path"],
      nudge:
        "The maze is impossible to solve using just the given rules. Try solving and placing more crossword clues, and pay close attention to the ears of corn.",
    },
    {
      order: 10.0,
      description:
        "Solvers have the circles in the puzzle grids, but don’t know what to do with them.",
      keywords: ["circles"],
      nudge:
        "There are many circles throughout the grids, some on-grid and some off-grid. Not all of them are used. Try figuring out how to solve the maze and see if the maze solution helps highlight the relevant letters.",
    },
    {
      order: 30.0,
      description:
        "Solvers have lots of crossword clues solved, but don’t know how to solve the maze.",
      keywords: ["corn", "ear"],
      nudge:
        "Look at the ears of corn in the grids. Each of them sits on the first letter of a word. Try putting those words in a list, then read the flavor text closely.",
    },
    {
      order: 40.0,
      description:
        "Solvers have lots of crossword clues solved and have noticed the ears of corn, but don’t know how to solve the maze",
      keywords: ["pair", "homophone"],
      nudge:
        "Each ear of corn in the puzzle sits at the first letter of a word. Each of these words is a homophone, and each of those homophones has a unique counterpart somewhere in the grids. Try finding those pairs, then consider what the flavor text has to say about ears.",
    },
    {
      order: 50.0,
      description:
        "Solvers have part or all of the maze solved and have generated a clue phrase but don’t know what to do with it",
      keywords: ["cobb", "on the cobb"],
      nudge:
        "Four of the grids have exactly one answer with the word “CORN” somewhere in it, and one grid has exactly one answer “COBB”. You need to literally overlay the “CORN” answers on top of the “COBB” answer, one at a time.",
    },
    {
      order: 100.0,
      description:
        "Solvers have solved the maze and used the generated clue phrase, but don’t know how to get final extraction",
      keywords: ["extraction", "final solution"],
      nudge:
        "When overlaying CORN on COBB, look down through the off-grid circles of the CORN grid and see what letter of the COBB grid they sit on. Now follow the maze pathway from ENTER to EXIT and pay attention to the off-grid circles that the maze passes directly adjacent to.",
    },
  ],
  canned_responses: [
    {
      guess: ["PLANT PLACE AT HOME DEPOT"],
      reply: "This is a correct cluephrase.",
    },
    {
      guess: ["PUT CORN ON THE COBB"],
      reply: "Keep going!",
    },
  ],
};

export default puzzle;
