import { type PuzzleDefinition } from "../types";
import Puzzle from "./puzzle";
import Solution from "./solution";

const puzzle: PuzzleDefinition = {
  title: "Shell Corporation 8: Zoological Garden",
  slug: "shell_corporation_8",
  authors: ["Leland Aldridge", "James Douberley"],
  editors: ["James Douberley", "Li-Mei Lim", "Robin Deits"],
  additional_credits: [
    {
      for_what: "Art",
      who: ["Arcturus Wang"],
    },
  ],
  answer: "ALPACA LAND",
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
      description: "Solvers are at the beginning of the puzzle",
      keywords: ["animals", "meaning"],
      nudge:
        "It is relevant to the puzzle that all of these animals are from a particular geographical range. With that in mind, take a close read of the text with an eye out for double meanings.",
    },
    {
      order: 15.0,
      description:
        "Solvers are concerned that some of these animals are symbols of multiple states",
      keywords: ["multiple", "many", "options", "white-tailed deer"],
      nudge:
        'The map shows "a state" of each animal. Which one is to be determined — other constraints in the puzzle ensure there is only one possibility for each animal.',
    },
    {
      order: 25.0,
      description:
        "Solvers have identified the animals as state symbols. They are considering how this can be used in the grid.",
      keywords: ["grid", "fill", "write"],
      nudge:
        "Letters must be placed in each cell of the grid along each animal’s path. The animal cells take two letters each.",
    },
    {
      order: 50.0,
      description:
        "Solvers are considering what should be written into the grid and how it relates to the animal’s path.",
      keywords: ["path", "write", "string"],
      nudge:
        "Each animal’s path is made up of a feeder answer. If this appears underconstrained or unsatisfiable, you may wish to return to this puzzle after finding more answers.",
    },
    {
      order: 75.0,
      description:
        "Solvers have determined the feeder answers but are stuck on the logic puzzle portion",
      keywords: ["logic", "determining", "paths"],
      nudge:
        "[The solution document contains a step-by-step solution for the logic puzzle. Cross-reference with the solvers’ reported progress]",
    },
    {
      order: 90.0,
      description:
        "The logic puzzle is complete and the first grid filled out.",
      keywords: ["numbers", "shifts", "second grid"],
      nudge:
        "Note that the two given grids are of equal dimensions, and that except for the cells which in the first grid contain animals, the second grid’s numbers are never of magnitude larger than 25. Some of the animal cells have larger numbers, but those cells are also filled differently - what property could those large numbers make sense for?",
    },
    {
      order: 100.0,
      description:
        "Solvers have solved the logic puzzle and applied the shifts from the second grid, but do not know what to do with the results.",
      keywords: [
        "solved",
        "shifts",
        "cotton",
        "keystone",
        "creole",
        "golden",
        "peace garden",
      ],
      nudge:
        "The grid of letters you’ve obtained is five strings separated by Xs. If these five strings are not familiar to you, it may be useful to search all of them at once in a search engine.",
    },
  ],
  canned_responses: [],
};

export default puzzle;
