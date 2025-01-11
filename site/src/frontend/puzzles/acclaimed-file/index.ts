import { type PuzzleDefinition } from "../types";
import image from "./assets/magic_i.svg";
import Puzzle from "./puzzle";
import Solution from "./solution";

export const CANONICALIZED_PARTIALS = [
  "LOOK A LITTLE CLOSER",
  "LOOK A LITTLE CLOSER FOR PART TWO",
];

const puzzle: PuzzleDefinition = {
  title: "Magic i",
  slug: "magic_i",
  initial_description: "Two columns of text",
  answer: "INSECT",
  authors: ["Robin Deits"],
  editors: ["James Douberley", "Li-Mei Lim", "Michele Pratusevich"],
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
      order: 0.0,
      description: "Solvers have no idea where to begin",
      keywords: ["stuck", "beginning"],
      nudge:
        "I’ve never heard of a “magic i” but it does sound a lot like something you may have seen before.",
    },
    {
      order: 1.0,
      description:
        "Solvers don’t understand how a magic eye could be relevant to part 1",
      keywords: ["magic eye", "text"],
      nudge:
        "A magic eye image just needs a repeating pattern. What if that were text?",
    },
    {
      order: 10.0,
      description: "Solvers can’t see the magic eye",
      keywords: ["can’t see"],
      nudge:
        "The internet is full of useful tools, though you might need to express your request in the form of an image.",
    },
    {
      order: 20.0,
      description:
        "Solvers have part 2, but can’t see anything in the magic eye",
      keywords: ["part 2", "magic eye", "can’t see"],
      nudge:
        "Hm, yeah, this one doesn’t seem to work as a regular magic eye. What did you have to do last time? And what was that phrase again?",
    },
    {
      order: 30.0,
      description:
        "Solvers have “delete all but dotted letter” but don’t know what to do with it",
      keywords: ["delete", "dotted"],
      nudge: "Many file formats are just fancy text files, even some images.",
    },
    {
      order: 50.0,
      description:
        "Solvers have the image with just the `i`s but don’t know what to do with it",
      keywords: ["just i"],
      nudge:
        "Oh, that looks a lot more like a magic i, err, a magic eye, to me!",
    },
    {
      order: 90.0,
      description:
        "Solvers see the magnifying glass + arrow icon but don’t know what to do with it",
      keywords: ["arrow"],
      nudge:
        "What would a magnifying glass indicate? And what was that phrase from last time again?",
    },
    {
      order: 95.0,
      description: "Solvers don’t know how to zoom in more",
      keywords: ["zoom"],
      nudge:
        "If you can’t find a program to help you with this, maybe Installing Neural Knowledge Subtly Can Aide Puzzle Extraction. No that’s nonsense, but maybe its initials can help?",
    },
  ],
  canned_responses: [
    {
      guess: [
        "CALL IN LOOK A LITTLE CLOSER FOR PART TWO",
        "DELETE ALL BUT DOTTED LETTER",
      ],
      reply: "That sounds like something you should do!",
    },
    {
      guess: CANONICALIZED_PARTIALS,
      reply: `Congratulations! `,
      link: {
        display: "Here’s part two.",
        href: image,
      },
    },
  ],
};

export default puzzle;
