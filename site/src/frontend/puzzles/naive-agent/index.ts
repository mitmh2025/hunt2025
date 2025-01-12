import { type PuzzleDefinition } from "../types";
import Puzzle from "./puzzle";
import Solution from "./solution";

const puzzle: PuzzleDefinition = {
  title: "Missing Connections",
  slug: "missing_connections",
  code_name: "naive-agent",
  initial_description: "A grid of squares containing city names and sharks",
  answer: "DEVILS MARBLES",
  authors: ["Kevin Hwang"],
  editors: ["Joanna Murray", "Robin Deits", "Steve Banzaert"],
  additional_credits: [
    {
      for_what: "Numberlink generator",
      who: ["Thomas Ahle"],
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
      order: 1.0,
      description: "solvers have no idea where to start",
      keywords: ["where to start"],
      nudge:
        "Some sort of connections are missing. What might be connected and how?",
    },
    {
      order: 2.0,
      description: "solvers don’t know how to connect cities",
      keywords: ["don’t know how to connect cities"],
      nudge:
        "What might connect these cities IRL? What could have caused these connections to be broken?",
    },
    {
      order: 3.0,
      description: "solvers know the connection type but don’t know what to do",
      keywords: ["identifying city connections"],
      nudge:
        "If you have determined what type of connections are missing, you might find online references detailing which cities are connected in this way.",
    },
    {
      order: 10.0,
      description: "solvers don’t understand the grid",
      keywords: ["connecting logic"],
      nudge:
        "This puzzle is a logic puzzle type that is hinted at in the flavor text.",
    },
    {
      order: 11.0,
      description: "solvers don’t understand the grid (larger hint)",
      keywords: ["connecting logic (bigger hint)"],
      nudge:
        "This is a type of logic puzzle called a Number Link. Pairs of cities will be linked up following Number Link rules.",
    },
    {
      order: 90.0,
      description:
        "Solvers have finished the logic puzzle and need to extract.",
      keywords: ["extraction"],
      nudge:
        "Count the lengths of the paths in your finished grids. Is there anything about the cables connecting these cities (IRL) that matches up with these lengths?",
    },
    {
      order: 91.0,
      description:
        "Solvers have finished the logic puzzle and need to extract (direct hint)",
      keywords: ["extraction (direct hint)"],
      nudge:
        "Each path in the solved Number Link has has the same length as the name of the cable IRL. Place the cable names in the grid 1 letter per square. Direction is hinted via shark.",
    },
    {
      order: 92.0,
      description: "Solvers are stuck on final extraction",
      keywords: ["final extraction"],
      nudge:
        "There is one shark per column in the original grid. Read the sharkened letters from left to right.",
    },
  ],
  canned_responses: [],
};

export default puzzle;
