import type { PuzzleDefinition } from "../types";
import Puzzle from "./puzzle";
import Solution from "./solution";

const puzzle: PuzzleDefinition = {
  title: "The Shell Game",
  slug: "the_shell_game",
  authors: [
    "David Greenspan",
    "James Douberley",
    "Li-Mei Lim",
    "Leland Aldridge",
  ],
  editors: ["Drew Fisher", "Henry Wong", "Li-Mei Lim", "Robin Deits"],
  additional_credits: [],
  content: {
    component: Puzzle,
    copyable: true,
  },
  solution: {
    component: Solution,
  },
  answer: "BLOW GLASS WHISTLE",
  hints: [
    {
      order: 1,
      description: "Solvers are not sure where to begin.",
      keywords: ["start"],
      nudge:
        "This supermeta puzzle requires understanding the structure of the entire round, including all of the feeder/submeta relationships.",
    },
    {
      order: 2,
      description: `Solvers still haven’t figured out what the "corporate web" refers to.`,
      nudge: `The entire "corporate structure" of feeders into metas (and metas as feeders into metas) can be represented as a directed (but not acyclic) graph.`,
    },
    {
      order: 3,
      description:
        "Solvers have the graph, but cannot figure out the next step.",
      nudge:
        "The instruction to follow the paper trails from each subsidiary and leave a piece behind indicates that you should traverse the graph, starting at each subsidiary (regular puzzle), and leave a letter from its answer with each move.",
    },
    {
      order: 3.5,
      description: "Solvers cannot get the traversal/letter placement to work.",
      nudge:
        "Letters should be left on edges of the graph. The edges between the subsidiaries and their respective shells are included.",
    },
    {
      order: 4,
      description:
        "Solvers have completed the graph and placed all of the letters from the subsidiaries.",
      nudge:
        "The additional words given in the flavortext must be placed on the graph, but all pass through a so-far hidden node, which has two connections with each shell.",
    },
    {
      order: 5,
      description:
        "Solvers have placed all of the extra words and labeled the edges to the hidden nodes, but don’t have the answer.",
      keywords: ["extraction"],
      nudge:
        "Each of your shells is numbered. Starting at Shell 1, and traversing in and out of the hidden node one by one to each other shell in order, will spell out the final answer.",
    },
  ],
  canned_responses: [],
};

export default puzzle;
