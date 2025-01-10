import { type PuzzleDefinition } from "../types";
import Puzzle from "./puzzle";
import Solution from "./solution";

const puzzle: PuzzleDefinition = {
  title: "Sing Like a Canary",
  slug: "sing_like_a_canary",
  initial_description: "Some audio files, some pictures, and a musical stave",
  answer: "EARTH ANGEL",
  authors: ["Karen Rustad Tolva"],
  editors: ["Hubert Hwang", "Robin Deits"],
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
      order: 1.0,
      description:
        "Solvers have not figured out what the images are referencing.",
      keywords: ["card", "picture", "bird", "game", "wingspan"],
      nudge: "The pictures represent cards in the board game Wingspan.",
    },
    {
      order: 7.0,
      description:
        "Solvers have only seen the images and not any other content",
      keywords: ["audio", "music", "clip", "stave", "identified"],
      nudge: "There are buttons next to the musical stave.",
    },
    {
      order: 10.0,
      description:
        "Solvers are stuck and think there are only 3-4 notes in the music",
      keywords: ["stave", "music", "note", "three", "four"],
      nudge: "The music stave at the top of the page scrolls horizontally.",
    },
    {
      order: 40.0,
      description: "Solvers are asking about Wingspan expansions",
      keywords: [
        "identification",
        "wingspan",
        "expansion",
        "game",
        "europe",
        "asia",
        "oceania",
        "base",
        "north america",
      ],
      nudge:
        "This puzzle includes all Wingspan expansions released as of January 2025.",
    },
    {
      order: 60.0,
      description:
        "Solvers have identified most or all of the birds but haven’t figured out how to put them together",
      keywords: ["bird", "names", "identified"],
      nudge:
        "What is the least interesting part of the names of the birds in each row? Try removing it.",
    },
    {
      order: 70.0,
      description:
        "Solvers are down a rabbit hole involving attributes of the Wingspan birds other than the name (e.g. trying to index or sort by point value)",
      keywords: [
        "wingspan",
        "bird",
        "point",
        "food",
        "habitat",
        "nest",
        "egg",
        "power",
        "brown",
        "white",
        "yellow",
        "blue",
        "pink",
      ],
      nudge:
        "The bird name is the only piece of information you need from the Wingspan card.",
    },
    {
      order: 71.0,
      description: "Solvers are down a rabbit hole of music metadata",
      keywords: [
        "metadata",
        "song",
        "music",
        "title",
        "year",
        "band",
        "musician",
        "album",
        "order",
      ],
      nudge:
        "The song title is the only information you need to extract from the audio clips. The order/placement of the buttons that play the clips is also relevant.",
    },
    {
      order: 80.0,
      description:
        "Solvers have a bird name grid but haven’t tried mapping it to the stave",
      keywords: ["extraction", "music", "note", "stave", "beat", "quarter"],
      nudge: "How many beats long is the stave at the top of the page?",
    },
    {
      order: 80.1,
      description:
        "Solvers have a bird name grid but don’t know how to map it to the stave",
      keywords: [
        "music",
        "note",
        "stave",
        "line",
        "space",
        "row",
        "extraction",
      ],
      nudge:
        "Consider the number of whole notes in a music stave and the number of rows of birds you were given.",
    },
    {
      order: 99.0,
      description:
        "Solvers have mapped the bird grid to the notes but don’t know how to extract their answer",
      keywords: ["extraction", "chord", "note"],
      nudge:
        "You’re almost there. Try reading off the letters as chords, vertically.",
    },
  ],
  canned_responses: [
    {
      guess: ["PENGUINS WILL YOU BE MINE"],
      reply: "Keep going!",
    },
  ],
};

export default puzzle;
