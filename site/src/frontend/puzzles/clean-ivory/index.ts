import { type PuzzleDefinition } from "../types";
import Puzzle from "./puzzle";
import Solution from "./solution";

const puzzle: PuzzleDefinition = {
  title: "The Inspectre",
  slug: "the_inspectre",
  initial_description:
    "Physical Puzzle—A bag of acrylic pieces and a sheet of paper",
  answer: "TILECUTTER",
  authors: ["Andrew Russell"],
  editors: ["Joel Fried", "Melanie Matchett Wood", "Sid Creutz"],
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
      order: 5.0,
      description: "Solvers have not filled in the jig-saw puzzle.",
      nudge:
        "All the pieces are supposed to be the same and interchangeable. Make sure they are not flipped over. They should have the etched side facing up.",
    },
    {
      order: 20.0,
      description: "They solved the jig-saw part but not sure what to do next",
      nudge: "Notice “increasing lengths” and exactness” in the flavor text.",
    },
    {
      order: 49.0,
      description: "They don’t know how to find the exact lengths (first hint)",
      nudge:
        "Notice the word “SPECTRE” in all caps in the title. Finding that will help.",
    },
    {
      order: 50.0,
      description: "They don’t know how to find the lengths (second hint)",
      nudge:
        "The shape is called Tile(1,1) because all edged are of length 1. It only has angles that are 90 degrees or 120 degrees.",
    },
    {
      order: 51.0,
      description: "They don’t know how to find the lengths (third hint)",
      nudge:
        "All the straight edges are along one of six possible angles…As a vector, they point toward the 12 directions of hours on a clock face. Use the geometry of a 30-60-90 triangle to find the components of each of these vectors and then calculate the total length of the sum of the vectors needed to get from one endpoint to the other.",
    },
    {
      order: 65.0,
      description: "They have exact lengths but not sure if they are correct",
      nudge:
        "Use a ruler to measure the lines, and compare these measurement to your calculated values. It is easy to make a mistake.",
    },
    {
      order: 75.0,
      description:
        "They have the correct exact lengths but not sure how to extract",
      nudge:
        "Write all lengths in the same format and notice the “irrational” in flavor text. Also, notice “increasing lengths” in the flavor text.",
    },
    {
      order: 85.0,
      description:
        "They have the exact lengths as mathematical expressions with irrational numbers, but don’t know what to do next.",
      nudge:
        "The word irrational in the title suggests finding the coefficients of the irrational term under the large square root.",
    },
    {
      order: 90.0,
      description:
        "They have found the coefficients of root-3, but don’t know what to do with them.",
      nudge:
        "Check your lengths to make sure you didn’t miscount.  The coefficient you need to look at should be in the range 1 to 26. Use a ruler to measure the lengths of the lines and compare to the exact length you have.",
    },
    {
      order: 91.0,
      description:
        "They have extracted the correct letters in the answer, but don’t know what order they go in",
      nudge: "Notice “increasing lengths” in the flavor text.",
    },
  ],
  canned_responses: [],
};

export default puzzle;
