import { type PuzzleDefinition } from "../types";
import Puzzle from "./puzzle";
import Solution from "./solution";

const puzzle: PuzzleDefinition = {
  title: "The Thief",
  slug: "the_thief",
  answer: "RIDE SIDECAR",
  authors: ["Grant Elliott", "Erin Price", "John Silvio", "Kevin Hwang"],
  editors: ["Henry Wong", "James Douberley", "Li-Mei Lim", "Robin Deits"],
  additional_credits: [
    {
      for_what: "Round art",
      who: [
        "Simone Agha",
        "Karen Rustad Tolva",
        "Rebecca Engelke",
        "Nine Morch",
      ],
    },
  ],
  content: {
    component: Puzzle,
  },
  solution: {
    component: Solution,
  },
  hints: [
    {
      order: 1.0,
      description:
        "Solvers are on the runaround and don’t understand the first instruction",
      keywords: ["runaround", "stata", "grey and white creature"],
      nudge:
        "Why would Billie describe something that’s brown and white as grey and white? Did you hear their description of the weather?",
    },
    {
      order: 10.0,
      description:
        "Solvers have completed the runaround but aren’t sure what else to do",
      nudge:
        "This runaround pairs with the witness statements in the round to form a metapuzzle. You’ll need both the information collected on the runaround and other information from the round.",
    },
    {
      order: 25.0,
      description: "Solvers aren’t sure what to do with the witness statements",
      keywords: ["witnesses"],
      nudge:
        "Each witness gives you information about the movements of one or more of the characters when you solve their associated puzzle. Use this information to figure out the path each character took today.",
    },
    {
      order: 50.0,
      description:
        "Solvers have completed the logic puzzle and don’t know what to do with the characters’ paths",
      keywords: ["letters", "paths", "logic puzzle"],
      nudge:
        "This is a supermeta. It uses the answers you got from the four location round metapuzzles. Check the answer that goes with each character and compare it to the character’s path.",
    },
    {
      order: 90.0,
      description:
        "Solvers have completed the runaround and the logic puzzle, have used the submeta answers, and don’t know what to do next",
      keywords: ["now what", "runaround", "map", "other map"],
      nudge:
        "Did you note where you were on MIT’s campus when Billie was at E and 3rd, and where you were looking when Billie was at E and 9th? The map of MIT and the map of MITropolis can be overlaid to help you combine the logic puzzle solution with the runaround information.",
    },
    {
      order: 95.0,
      description: "Solvers don’t know how to extract",
      keywords: ["extraction", "letters", "which"],
      nudge:
        "Did you notice anything unusual on the runaround? Perhaps some of the appraiser’s Clues? We hope you noted their locations in your handy dandy notebook. If not, please contact HQ for assistance.",
    },
    {
      order: 100.0,
      description:
        "Solvers have extracted letters from the map but still can’t find the answer",
      keywords: ["race", "extraction"],
      nudge:
        "At the end of the runaround, Billie tells you to look back through your steps on paper. What could this wording be implying? You should have extracted 11 letters, one for each track.",
    },
  ],
  canned_responses: [],
};

export default puzzle;
