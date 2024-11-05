import { type PuzzleDefinition } from "../types";
import Puzzle from "./puzzle";
import Solution from "./solution";

const puzzle: PuzzleDefinition = {
  title: "Fight Night at Mo’s",
  slug: "fight_night_at_mos",
  initial_description:
    "A tournament bracket with ten competitors, represented by wacky images",
  answer: "JADE",
  authors: ["Anna Brunner", "Alex St Claire", "Erin Price", "Sid Creutz"],
  editors: ["Hubert Hwang", "Jesse Moeller", "Michele Pratusevich"],
  additional_credits: [],
  content: {
    component: Puzzle,
  },
  solution: {
    component: Solution,
  },
  hints: [
    {
      order: 0.0,
      description:
        "The solvers have not figured out that the images represent the canonical minerals of the Mohs hardness scale",
      nudge: "It’s hard to scratch the surface at Mo’s.",
    },
    {
      order: 20.0,
      description:
        "The solvers have not confidently identified any of the images and want a hint on how to get started",
      nudge:
        "It seems like whoever put together the bracket only knew what these fighters’ names sound like.",
    },
    {
      order: 90.0,
      description:
        "The solvers have ID’ed the images but don’t know how to fill out the bracket",
      nudge:
        "Now that you’ve determined what they are, how might you determine which fighter will defeat the other in a given match in the tournament? What useful set for determining their battle-worthiness do these fighters all belong to?",
    },
    {
      order: 95.0,
      description:
        "The solvers have ID’ed the images and placed them in the bracket but are confused by the numbered boxes highlighted in red.",
      keywords: ["red boxes", "question marks"],
      nudge:
        "The red boxes represent the order in the final extraction. Each fighter will give one letter.",
    },
    {
      order: 100.0,
      description:
        "The solvers have figured out everything except the final extraction.",
      keywords: ["extraction"],
      nudge:
        "Each highlighted box will give one letter, in the order listed in the circles with the question marks. How can you associate the highlighted fighters with canonical numbers (perhaps numbers that you’ve already used)? Then, how can you turn those numbers into letters?",
    },
  ],
  canned_responses: [],
};

export default puzzle;
