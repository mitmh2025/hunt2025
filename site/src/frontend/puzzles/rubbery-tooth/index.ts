import { type PuzzleDefinition } from "../types";
import Puzzle from "./puzzle";
import Solution from "./solution";

const puzzle: PuzzleDefinition = {
  title: "Synthetic Tagsonomy",
  slug: "synthetic_tagsonomy",
  initial_description:
    "A plastic bag filled with quirky drawings fastened by several bread tags.",
  answer: "CHEESE VENDORS",
  authors: ["Simone Agha", "David Anderson", "Eric Marion"],
  editors: ["Hubert Hwang", "Steve Banzaert", "tinaun"],
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
        "Hunters haven’t been able to find the dataset this puzzle is based on.",
      keywords: ["dataset"],
      nudge:
        "Try searching for the research group who studies this puzzle’s title.",
    },
    {
      order: 1.0,
      description:
        "Hunters have identified the dataset but don’t know what to do with the pictures.",
      keywords: ["images", "pictures", "drawings"],
      nudge:
        "Each of the things depicted in the pictures has a scientific name and a common name.",
    },
    {
      order: 2.0,
      description:
        "Hunters have identified the scientific names of the things in the pictures but don’t know what to do next.",
      keywords: ["scientific name", "genus", "species"],
      nudge:
        "After you've identified the pictures, look at the first letter of their scientific names in the correct order to discover what to do next.",
    },
    {
      order: 3.0,
      description:
        "Hunters have identified that they must use the bread tags on the grid but do not know how to match them up with the pictures.",
      nudge: "Have you tried seeing who belongs to which family?",
    },
    {
      order: 4.0,
      description:
        "Hunters know to align the bread tags on the letter grid but are having trouble orienting them correctly.",
      keywords: [
        "orientation",
        "coordinates",
        "corner",
        "corners",
        "dimensions",
        "size",
        "measurements",
        "grid",
      ],
      nudge:
        "When measuring your bread tags, it’s important to orient them in the correct way as demonstrated on the research group's website.",
    },
    {
      order: 5.0,
      description:
        "Hunters have aligned the bread tags on the letter grid but are looking at the wrong part of the tag to extract the answer.",
      keywords: ["extraction"],
      nudge:
        "When measuring your bread tags, pay attention to what they’re holding in their mouths.",
    },
  ],
  canned_responses: [
    {
      guess: ["MOUTHS AS A LENS"],
      reply: "That sounds like something you should try doing next.",
    },
    {
      guess: ["ORDER IS Y THEN X"],
      reply: "Try doing that to see what you get.",
    },
  ],
};

export default puzzle;
