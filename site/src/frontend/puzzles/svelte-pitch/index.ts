import { type PuzzleDefinition } from "../types";
import Puzzle from "./puzzle";
import Solution from "./solution";

const puzzle: PuzzleDefinition = {
  title: "Recipe Substitutions",
  slug: "recipe_substitutions",
  initial_description: "A recipe blog post and comments.",
  answer: "PINTO BEAN",
  authors: [
    "Kevin Hwang",
    "Dan Pappas",
    "John Silvio",
    "Stephanie Murray",
    "tinaun",
  ],
  editors: ["Anna Brunner", "Hubert Hwang", "Robin Deits", "Steve Banzaert"],
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
      order: 10.0,
      description: "Solvers are not sure where to start",
      keywords: ["puzzle structure"],
      nudge:
        "As hinted by the title, the main component of the puzzle is the recipe substitutions in the comments. There is a hint as to what to do in the flavor text/preamble.",
    },
    {
      order: 11.0,
      description: "Solvers are not sure what to do with the preamble",
      keywords: ["preamble", "flavor text", "backstory"],
      nudge:
        "Firstly, this story is ridiculous. Secondly…no, let's go back to the first thing.",
    },
    {
      order: 12.0,
      description:
        "Solvers are not sure what to do with the preamble (larger hint)",
      keywords: ["preamble", "flavor text", "backstory"],
      nudge:
        "The first letter of each line in the preamble can be read to form a cluephrase. This will be useful for interpreting the comments below.",
    },
    {
      order: 30.0,
      description: "Solvers don't know how to interpret the comments",
      keywords: ["comments", "substitutions"],
      nudge:
        "The comments describe people messing up the recipe and making a whole host of other things instead. The ingredients listed (and swapped) should not be read literally.",
    },
    {
      order: 31.0,
      description:
        "Solvers don't know how to interpret the comments (larger hint)",
      keywords: ["comments", "substitutions", "ingredients"],
      nudge:
        "Most of the ingredient swaps will only care about the first letter of the ingredient being swapped. Other things described in the comments are clues for wordplay transformations. There are hints to confirm the correct transformations in the comments as well.",
    },
    {
      order: 50.0,
      description: "Solvers are having trouble with extraction",
      keywords: ["extraction"],
      nudge:
        'Each comment has a rating (e.g. "5/7 perfect"). That is an index into the final transformed word (in this case, the fifth letter out of seven).',
    },
    {
      order: 90.0,
      description: "Solvers are having trouble interpreting final cluephrase",
      keywords: ["final cluephrase"],
      nudge:
        "The final cluephrase (ONE BIT BLENDED IN PAN FIVE FOUR) is another wordplay clue. FIVE FOUR is an enumeration.",
    },
    {
      order: 91.0,
      description:
        "Solvers are having trouble interpreting final cluephrase (larger hint)",
      keywords: ["final cluephrase"],
      nudge:
        "As per the puzzle, “blending” implies anagramming. Anagram the words “ONE BIT” and insert that into the letters PAN.",
    },
  ],
  canned_responses: [
    {
      guess: ["ONE BIT BLENDED IN PAN FIVE FOUR"],
      reply: "Keep going! This is a correct cluephrase.",
    },
  ],
};

export default puzzle;
