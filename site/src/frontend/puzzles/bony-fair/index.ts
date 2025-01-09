import { type PuzzleDefinition } from "../types";
import Puzzle from "./puzzle";
import Solution from "./solution";

const puzzle: PuzzleDefinition = {
  title: "A Map and a Shade (or Four)",
  slug: "a_map_and_a_shade_or_four",
  initial_description:
    "A chart with letters, colors, ticks, crosses and some other symbols, as well as a series of pie charts with colors.",
  answer: "STATE OF UNDRESS",
  authors: ["Stratton Vakirtzis", "Rad Z"],
  editors: ["James Douberley", "Melanie Matchett Wood", "Teddy McArthur"],
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
      description: "Starting the puzzle",
      keywords: ["starting", "grid"],
      nudge:
        "There is a 25x25 grid and four colors. The colors come into play at a later stage but what could the grid represent and how is this related to a map?",
    },
    {
      order: 10.0,
      description:
        "Solvers have identified this grid is an adjacency matrix for some map but are not sure how it works.",
      keywords: ["adjacency matrix", "map"],
      nudge:
        "There are a total of 50 rows and columns (or circles), where each of the 50 circles represents something different in this adjacency matrix. The two circles with no adjacencies are labelled with “A” and “H”. What could these be?",
    },
    {
      order: 20.0,
      description:
        "Solvers have identified this is an adjacency matrix of the 50 US states but are struggling to start assigning",
      keywords: ["US states"],
      nudge:
        "The A 🔴 and H 🔴 can be assigned as the two states with no adjacencies. The M ⚪ and P ⚪ in the rows are also a good place to start, there is only one state starting with P and only one state starting with M that has at least 6 other adjacent states. The A ⚪ A ⚪ A ⚪ in the columns don’t start with the letter A (there are less than 5 states starting with A), look at the ➖⚪ symbols for guidance.",
    },
    {
      order: 40.0,
      description:
        "Solvers have started filling out the US states in the grid rows and columns.",
      keywords: ["stuck on grid", "wave emoji", "dot emoji"],
      nudge:
        "If you are noticing logic errors with state borders, it may be worthwhile to restart your progress from the beginning and take careful note of all potential adjacent states for each case. The 🌊 and ⏺️ each represent a special type of adjacency. Solving Northeastern US should be relatively contained and a good start in the grid. Identifying the first A ⚪ and third A ⚪ in the columns is also possible early in the puzzle. The M ⚪ and the Row 13 ⚪ share at least 3 adjacent states and the Row 13 ⚪ also borders a ⏺️ state.",
    },
    {
      order: 50.0,
      description:
        "Solvers have most of the grid filled out but are struggling to finish.",
      keywords: ["grid mostly complete"],
      nudge:
        "Each set of circles in the rows and columns are alphabetical order by the letter in the circle (except for MAP). Use this to assist with finishing filling in the grid.",
    },
    {
      order: 60.0,
      description: "Solvers have completed the grid",
      keywords: ["grid complete"],
      nudge:
        "We have eighteen states assigned one of four colors. According to the table legend, only different colors can be adjacent. Is there a map theorem that applies to this? Don’t forget to bring your map too!",
    },
    {
      order: 80.0,
      description:
        "Solvers have started solving the four color theorem logic of the US map.",
      keywords: ["four color theorem logic puzzle", "coloring US map"],
      nudge:
        "You need use logic beyond typical color adjacencies to completely color in the map. Look at Florida/Mississippi/South Carolina and consider what color Tennessee could be. You can also do the same with Oklahoma afterwards. 🌊 and ⏺️ adjacencies are counted as 0️⃣ within the grid so the same rules apply here.",
    },
    {
      order: 90.0,
      description:
        "Solvers have completely colored a map of the US with the four color theorem",
      keywords: ["extraction", "color wheels"],
      nudge:
        "Each color wheel represents a unique state but how do we extract a letter from each? Where have we seen a white circle before? Thick black lines represent a break in adjacencies.",
    },
  ],
  canned_responses: [],
};

export default puzzle;
