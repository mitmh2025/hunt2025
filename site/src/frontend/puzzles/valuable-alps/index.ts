import { type PuzzleDefinition } from "../types";
import Puzzle from "./puzzle";
import Solution from "./solution";

const puzzle: PuzzleDefinition = {
  title: "Cross Dash Word",
  slug: "cross_dash_word",
  code_name: "valuable-alps",
  initial_description:
    "Physical Puzzle. Alternatively, there’s a PDF that you can print and cut if you’re a masochist. Godspeed.",
  answer: "DEAD BIRD",
  authors: ["Andrew Russell"],
  editors: ["Kevin Hwang", "Steve Banzaert", "Teddy McArthur"],
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
      order: 5.0,
      description:
        "Solvers don’t know how to assemble the cut out pieces of paper.",
      keywords: ["assemble", "3D", "physical", "solids", "alignment"],
      nudge:
        "Fold along dashed lines, and insert numbered tabs in matching slots. When fully assembled, they form three nested platonic solids.",
    },
    {
      order: 15.0,
      description:
        "Solvers have the physical part assembled, and have some/most of the answer words, but don’t know how to enter them.",
      keywords: [
        "enter",
        "words",
        "alignment",
        "letters",
        "grid",
        "sphere",
        "clockwise",
      ],
      nudge:
        "Answer words for each face form a list in given order clockwise around the perimeter of each face. Letters that align across an edge must match.",
    },
    {
      order: 20.0,
      description:
        "Each solid is correctly filled in but solvers don’t know how to align them to each other.",
      keywords: ["Align", "fit together"],
      nudge:
        "Vertices that are shared between different solids must have the same letter",
    },
    {
      order: 40.0,
      description:
        "Solvers have done the assembly and entered the answer words but don’t know what to do next.",
      keywords: ["filled", "done"],
      nudge:
        "You need to find some letters that occur in pairs…i.e., two copies of each letter.",
    },
    {
      order: 50.0,
      description:
        "Solvers have done assembly and filling in answers, and know they have to find several pair of letters but don’t know what pairs.",
      keywords: ["stuck", "letters", "pairs", "copies", "find"],
      nudge: "Look at the hyphenated answers.",
    },
    {
      order: 60.0,
      description:
        "Solvers have done assembly, filled in all answers, and found 8 pairs of letters, but don’t know how to perform extraction from that.",
      keywords: ["found copies", "extraction", "extrapolation", "poke"],
      nudge:
        "Draw a line passing through the two copies of a letter and extend that line in 3D space, and see what other letter it passes through.",
    },
    {
      order: 75.0,
      description:
        "Solvers have done assembly, filling in answers and found the pairs of hyphenated clues, but don’t know how to accurately draw a straight line through 3D space",
      keywords: ["extrapolation", "stabbing", "tool"],
      nudge:
        "Wooden skewers can be found at a supermarket. Physically stabbing the object is probably the best way to find a solution.",
    },
    {
      order: 80.0,
      description:
        "They have the 8 extracted letters but don’t know the sort order",
      keywords: ["Sort", "order", "ordering"],
      nudge: "Order by letter that you found two copies of, A through H.",
    },
    {
      order: 90.0,
      description:
        "Solvers have extracted 8 letters but cant make sense of them.",
      keywords: ["nonsense"],
      nudge:
        "Check your stabbing. The relative geometry of all 8 triplets is exactly the same to within rotation and reflection. That fact might provide a method of error checking.",
    },
  ],
  canned_responses: [],
};

export default puzzle;
