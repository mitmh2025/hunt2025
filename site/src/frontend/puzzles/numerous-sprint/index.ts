import { type PuzzleDefinition } from "../types";

const puzzle: PuzzleDefinition = {
  title: "On the Corner",
  slug: "on_the_corner",
  code_name: "numerous-sprint",
  initial_description: "Magazine covers and several mini puzzles",
  answer: "BREGENZ FOREST",
  authors: [
    "Erin Price",
    "Anna Brunner",
    "Atul Shatavart Nadig",
    "James Douberley",
    "Melanie Matchett Wood",
    "Nathan Fung",
    "Teddy McArthur",
  ],
  editors: ["Henry Wong", "Li-Mei Lim", "Robin Deits"],
  additional_credits: [
    {
      freeform:
        "Special thanks to Dan Katz of Setec Astronomy for unknowingly lending his puzzles to our Hunt!",
    },
    {
      for_what: "Art",
      who: ["Anna Brunner"],
    },
  ],
  content: {
    component: { lazy: () => import("./puzzle") },
    copyable: true,
  },
  solution: {
    component: { lazy: () => import("./solution") },
  },
  hints: [
    {
      order: 35.1,
      description: "Solvers don’t know how to solve MH5",
      keywords: ["MH5", "formula"],
      nudge:
        "Each part of the right hand side of this long formula is part of a well-known formula that resolves to a letter.",
    },
    {
      order: 40.1,
      description: "Solvers don’t know how to solve MH6",
      keywords: ["MH6"],
      nudge:
        "This is a puzzle about hacks. What do all these objects have in common, hinted at by the flavor text?",
    },
    {
      order: 40.2,
      description: "Solvers need a stronger hint on MH6",
      keywords: ["MH6", "hacks"],
      nudge: "Find out when all these Great Dome hacks were done.",
    },
    {
      order: 45.1,
      description: "Solvers don’t know how to solve MH7",
      keywords: ["MH7", "movies"],
      nudge:
        "Each item in the list is a paraphrased movie title. Identify the original titles and compare them.",
    },
    {
      order: 50.1,
      description: "Solvers don’t know how to start MH8",
      keywords: ["MH8", "accomplishments", "people"],
      nudge:
        "The people clued in this puzzle all “started off with the same important first step”: they attended MIT. Use their accomplishments to identify them, and their first initial to extract.",
    },
    {
      order: 55.1,
      description: "Solvers don’t know how to start MH9",
      keywords: ["MH9", "hydrant", "logic"],
      nudge:
        "This is a type of puzzle known as Akari, except the lightbulbs are fire hydrants. Follow the rules to place the hydrants in the grid and read the letters in those squares.",
    },
    {
      order: 60.1,
      description: "Solvers don’t know how to solve MH10",
      keywords: ["MH10", "units"],
      nudge:
        "This is a puzzle about unit conversions. Many of the units in this puzzle are named after people, but we’ve given you their first names instead of their last names. Googling a first name plus unit might help you find them.",
    },
    {
      order: 60.2,
      description: "Solvers are having trouble with the conversions in MH10",
      keywords: ["MH10", "conversion", "units"],
      nudge:
        "Try putting the conversions into WolframAlpha at https://www.wolframalpha.com/.",
    },
    {
      order: 60.3,
      description: "Solvers don’t know how to extract for MH10",
      keywords: ["mh10", "extraction"],
      nudge:
        "Did you remember to round to the nearest integer? Each number represents a letter 1-26.",
    },
    {
      order: 65.0,
      description: "Solvers don’t know how to find the first four minipuzzles",
      keywords: ["magazines", "mit magazines", "MH1", "MH2", "MH3", "MH4"],
      nudge:
        "These are illustrations of the covers of the most recent issues of two magazines that are strongly associated with MIT. MH1-4 can be found inside one of these magazines. You‘ll need to solve them to solve this mini meta.",
    },
    {
      order: 70.0,
      description: "Solvers ask for hints on MH1-4",
      keywords: ["MH1", "MH2", "MH3", "MH4"],
      nudge: "We will not be providing hints for these minipuzzles.",
    },
    {
      order: 90.0,
      description: "Solvers don’t know how to solve the meta",
      keywords: ["meta", "metapuzzle"],
      nudge:
        "Enter the answers from minipuzzles MH1-MH10 from the minipuzzle into the grid. First and last letters overlap and there is a single possible arrangement.",
    },
    {
      order: 100.0,
      description: "Solvers don’t know how to extract the final answer",
      keywords: ["meta extraction"],
      nudge:
        "The title of the puzzle tells you how to proceed. The answer will be read clockwise and starts in the middle of the answer to MH6.",
    },
  ],
  canned_responses: [
    {
      guess: [
        "ENRICO FERMI",
        "NOZZLE",
        "OPPROBRIUM",
        "READY SET GO",
        "REFRESH",
        "TEST CENTER",
      ],
      reply: "Keep going!",
    },
    {
      guess: ["ENTER BREGENZ FOREST"],
      reply: "Follow the instruction.",
    },
  ],
};

export default puzzle;
