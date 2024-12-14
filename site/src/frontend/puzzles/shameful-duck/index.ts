import { type PuzzleDefinition } from "../types";
import Puzzle from "./puzzle";
import Solution from "./solution";

const puzzle: PuzzleDefinition = {
  title: "Anything Is Popsicle",
  slug: "anything_is_popsicle",
  initial_description: "A bag of popsicle sticks.",
  answer: "AXE",
  authors: ["Steve Banzaert"],
  editors: ["Laura Nicholson", "Michele Pratusevich", "Nathan Fung"],
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
      description: "Solvers don’t know how to start",
      keywords: ["starting"],
      nudge: "Jokes usually come in setup-punchline pairs—can you find any?",
    },
    {
      order: 5.0,
      description:
        "Solvers have found setup-punchline pairs but don’t know what to do next",
      keywords: ["pairs", "punchline", "setup"],
      nudge:
        "This is a physical puzzle—can you treat the existence of paired setups and punchlines as a structure to do something physical with the popsicle sticks?",
    },
    {
      order: 10.0,
      description: "Solvers have completed the jigsaw puzzle and are stuck",
      keywords: ["jigsaw", "drop", "quote", "dropquote", "letters", "boxes"],
      nudge:
        "So far you have not used the large letters or boxes. What do you see if you read the large letters down the left and right edges of the assembled jigsaw puzzle? That is a message describing the rest of the unused letters and boxes.",
    },
    {
      order: 100.0,
      description: "Extraction",
      keywords: ["extraction", "lizzie", "borden"],
      nudge:
        "This puzzle has involved matching setups to punchlines. What’s the punchline? The last word in the dropquote message is an enumeration telling you how many letters there are in the solution/punchline.",
    },
  ],
  canned_responses: [
    {
      guess: ["WHAT IS LIZZIE BORDENS FAVORITE BODY SPRAY THREE"],
      reply: "That’s a good setup!",
    },
  ],
};

export default puzzle;
