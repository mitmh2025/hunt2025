import { type PuzzleDefinition } from "../types";
import Puzzle from "./puzzle";
import Solution from "./solution";

const puzzle: PuzzleDefinition = {
  title: "No Notes",
  slug: "no_notes",
  initial_description: "A series of musical staves and text clues",
  answer: "CANINE PARTNER",
  authors: ["Kevin Hwang", "Sid Creutz"],
  editors: ["Anna Brunner", "Erin Price", "J. Heléne Andersson", "Robin Deits"],
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
      description: "Solvers are not sure how to start",
      keywords: ["clues"],
      nudge:
        "There are both musical staves and clues. Some of the clues look pretty specific, like they might only identify a single person.",
    },
    {
      order: 1.0,
      description: "Solvers are not sure what to do with the clues",
      keywords: ["clues", "musicians"],
      nudge:
        "A few of the clues are unique enough to serve as a starting point. However, some are unspecified enough that you’ll need to return to the clues after finding a way to disambiguate better.",
    },
    {
      order: 2.0,
      description:
        "Solvers are not sure what to do with the clues (specific starting point)",
      keywords: ["clues", "musicians", "starting point"],
      nudge:
        "“He wrote a guide on toilet training your cat” and “A Central Square sushi restaurant used to be named after him” are both specific enough that they can only really identify one person each.",
    },
    {
      order: 10.0,
      description: "Solvers are not sure what to do with the musical staves",
      keywords: ["musical notes", "key signature", "time signature", "sharps"],
      nudge:
        "Too much detail is missing from the musical staves for this to be real music. What else could these be?",
    },
    {
      order: 11.0,
      description:
        "Solvers are not sure what to do with the musical staves (big hint)",
      keywords: ["musical notes", "key signature", "time signature", "sharps"],
      nudge:
        "There are 26 different notes that are represented in all of the musical staves.",
    },
    {
      order: 12.0,
      description:
        "Solvers are not sure what to do with the musical staves (full instruction)",
      keywords: ["musical notes", "sharps"],
      nudge:
        "Each musical note corresponds to a letter. The same key is used throughout all of the staves.",
    },
    {
      order: 20.0,
      description:
        "Solvers do not know how to identify some of the clued people",
      keywords: ["clues are too vague", "too many people"],
      nudge:
        "There is a one to one correspondence between clued people and measures in the musical staves.",
    },
    {
      order: 25.0,
      description: "Solvers do not know how to extract from the musical staves",
      nudge:
        "What did Miles Davis say about jazz music? It’s not the notes you play…",
    },
    {
      order: 50.0,
      description:
        "Solvers have obtained the first cluephrase but don’t know what it means",
      keywords: ["cluephrase", "go have a great day", "partial confirmation"],
      nudge:
        "The phrase GO HAVE A GREAT DAY means something very specific in the context of this puzzle. In reading up about these different jazz musicians, did anything occasionally get cited about these contemporaneous musicians?",
    },
    {
      order: 51.0,
      description:
        "Solvers have obtained the first cluephrase but don’t know what it means (large hint)",
      keywords: ["cluephrase", "go have a great day", "partial confirmation"],
      nudge: "Try googling “Great Day” and “Jazz” together.",
    },
    {
      order: 75.0,
      description:
        "Solvers have identified a relevant image and need to extract",
      keywords: ["Great Day in Harlem", "photo"],
      nudge:
        "There’s one piece of the original puzzle that hasn’t been used yet.",
    },
    {
      order: 76.0,
      description:
        "Solvers have identified a relevant image and need to extract (larger hint)",
      keywords: ["Great Day in Harlem", "photo"],
      nudge:
        "Apply the listed compass directions to the identified jazz musicians. Start from their faces, the only part that is always visible. North is up.",
    },
  ],
  canned_responses: [
    {
      guess: ["GO HAVE A GREAT DAY"],
      reply: "Keep going!",
    },
    {
      guess: ["SHARE A TEAM PHOTO"],
      reply:
        "That is a correct answer instruction! Please take a photo of as many members of your team as possible and send it to us at info@mitmh2025.com. Include your team name and the phrase SHARE A TEAM PHOTO. Please also indicate in your submission if we can have permission to show these images at wrap-up.",
    },
  ],
};

export default puzzle;
