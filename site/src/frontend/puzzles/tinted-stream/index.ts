import { type PuzzleDefinition } from "../types";
import Puzzle from "./puzzle";
import Solution from "./solution";

const puzzle: PuzzleDefinition = {
  title: "Reuse and Recyclability",
  slug: "reuse_and_recyclability",
  initial_description: "A set of six genograms and several images below.",
  answer: "WATSONIA",
  authors: ["Erin Price", "Kevin Hwang", "Simone Agha"],
  editors: ["James Douberley", "Henry Wong", "Robin Deits"],
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
      order: 0.0,
      description: "Solvers don’t know what the diagrams represent.",
      keywords: ["diagrams", "circles", "squares"],
      nudge:
        "The title plays on the title of a famous work by a particular author. That author has six published works.",
    },
    {
      order: 50.0,
      description:
        "Solvers have identified the characters from the genograms and don’t know what the images represent",
      keywords: ["circles", "images", "fabric", "dresses"],
      nudge:
        "Each sample is shared between two characters. The resource hinted at by the title and the first sentence of the flavortext should help you identify what the sample is from.",
    },
    {
      order: 75.0,
      description: "Solvers don’t know what to put in the shapes",
      keywords: ["puzzle pieces", "names", "shapes"],
      nudge:
        "Each patch is connected to two characters from the genograms. The second sentence of the flavortext suggests where to get the names to fill into the patches. The resource hinted at by the title and the first sentence of the flavortext should help. The patches are ordered.",
    },
    {
      order: 100.0,
      description:
        "Solvers have the cluephrase but aren’t sure how to interpret it",
      keywords: ["abandoned", "plant genus", "extraction", "cluephrase"],
      nudge:
        "Jane Austen has six published novels but also several other unfinished works. Reframe an abandoned work as if it were an eight-letter Latin name for a plant genus.",
    },
  ],
  canned_responses: [
    {
      guess: [
        "ABANDONED AUSTEN AS PLANT GENUS",
        "ABANDONED AUSTEN AS PLANT GENUS EIGHT",
      ],
      reply: "Keep going!",
    },
  ],
};

export default puzzle;
