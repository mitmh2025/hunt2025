import { type PuzzleDefinition } from "../types";

const puzzle: PuzzleDefinition = {
  title: "Mastering the Art of Conch Frocking",
  slug: "mastering_the_art_of_conch_frocking",
  code_name: "mature-atlantis",
  initial_description: "A series of hand-drawn pictures going down the page",
  answer: "LAMOTTA",
  authors: ["Mike Mannis"],
  editors: ["Anna Brunner", "Chris Pringle", "Jesse Moeller", "Robin Deits"],
  additional_credits: [],
  content: {
    component: { lazy: () => import("./puzzle") },
    copyable: false,
  },
  solution: {
    component: { lazy: () => import("./solution") },
  },
  hints: [
    {
      order: 5.0,
      description:
        "Solvers are totally stuck initially and have not figured out the transform or matched any pairs of pictures",
      nudge:
        "The pictures must be matched up between the before and after set.  Focus on the puzzle title as an example of what is happening to the words that are depicted in the images.  The title is a reference to a famous recipe book.",
    },
    {
      order: 30.0,
      description:
        "Solvers have matched a few pairs correctly but now seem stuck on matching more pairs.",
      nudge:
        "Make sure you understand the exact transform for the words.  The ones you’ve matched should be in the same pattern as the one shown in the puzzle title.  It can help to type out the transform instead of trying to do it in your head for any other “before” pictures you have guessed at.",
    },
    {
      order: 50.0,
      description:
        "Solvers have matched all or most pairs but haven’t figured out the extraction",
      nudge:
        "Look at what has changed between the before and after words.  Does it form (possibly odd) words?",
    },
    {
      order: 80.0,
      description: "Solvers have the extraction correct but not the answer",
      nudge:
        "You should try doing the transform again to whatever you extracted, in pairs of words.",
    },
  ],
  canned_responses: [
    {
      guess: ["BAKING RULE NEST LIME"],
      reply: "Doesn’t seem like you’ve quite mastered the art...keep going!",
    },
    {
      guess: ["RAGING BULL LAST NAME"],
      reply: "Which is...?",
    },
  ],
};

export default puzzle;
