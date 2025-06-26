import { type PuzzleDefinition } from "../types";

const puzzle: PuzzleDefinition = {
  title: "Be Mine",
  slug: "be_mine",
  code_name: "pleasing-racket",
  initial_description:
    "A bunch of multicolored candy hearts with words on them",
  answer: "SAY YOU LOVE ME",
  authors: ["Helena Wang"],
  editors: ["Anna Brunner", "Hubert Hwang", "Nathan Fung", "Steve Banzaert"],
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
      order: 1.0,
      description:
        "Solvers have identified/connected the franchises and do not know what to do next",
      keywords: ["clues", "reference", "franchise", "series", "media"],
      nudge:
        "Each of these series has a character that shares something in common (and matching the theme of this puzzle) with characters from the other series.",
    },
    {
      order: 1.5,
      description:
        "Solvers have gotten hint 1 but are still unsure what it means",
      keywords: ["clues", "reference", "franchise", "series", "media"],
      nudge:
        "A character from each of these series shares a thematically-appropriate surname with characters from the other series.",
    },
    {
      order: 50.0,
      description:
        "Solvers have identified characters but are struggling to extract further data",
      keywords: [
        "clues",
        "connections",
        "extraction",
        "valentine",
        "character",
        "franchise",
        "series",
        "media",
      ],
      nudge:
        "Maybe the random scattering of the hearts isn’t so random. Try looking for a way to connect hearts with matching colors.",
    },
    {
      order: 75.0,
      description:
        "Solvers have identified characters and connected the dots but are having trouble with further progress",
      keywords: [
        "characters",
        "connections",
        "extraction",
        "valentine",
        "character",
        "franchise",
        "series",
        "media",
      ],
      nudge:
        "Connect the hearts of each color in the order necessary to spell out the franchises. The shape of the path connecting the hearts can be interpreted as a number.",
    },
    {
      order: 100.0,
      description: "Solvers have the characters, franchises, and numbers",
      keywords: [
        "extraction",
        "numbers",
        "valentine",
        "character",
        "franchise",
        "series",
        "media",
      ],
      nudge:
        "Using the number traced out by the series’ path, index into the first name of the corresponding Valentine character from that series. Order the extracted letters by the color order in which the blank hearts at the bottom of the page appear.",
    },
  ],
  canned_responses: [],
};

export default puzzle;
