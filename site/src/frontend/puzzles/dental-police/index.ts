import { type PuzzleDefinition } from "../types";
import Puzzle from "./puzzle";
import Solution from "./solution";

const puzzle: PuzzleDefinition = {
  title: "Any Coat Will Do",
  slug: "any_coat_will_do",
  initial_description:
    "A scene where there are 12 people wearing different coats of different colors. There is also a list of phrases included alongside the picture.",
  answer: "OPAL",
  authors: ["Genie Luzwick", "Kevin Hwang", "Sid Creutz"],
  editors: ["James Douberley", "Robin Deits", "tinaun"],
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
      description:
        "Solvers have identified some of the coat names but cannot figure out the significance of the colors.",
      keywords: ["coat names", "ordering", "colors"],
      nudge:
        "The title of the puzzle sounds familiar, almost like it is from a popular musical. Try looking at the songs in the musical to see if any may have a strong thematic connection to this puzzle.",
    },
    {
      order: 10.1,
      description:
        "Team has found the musical and song the puzzle is thematically linked to but not sure what to do next.",
      keywords: [
        "Joseph’s Coat",
        "song",
        "Joseph and the Amazing Technicolor Dreamcoat",
        "colors",
        "musical",
      ],
      nudge:
        "This song is such a banger. The part where the singer lists the coat’s colors is super catchy.",
    },
    {
      order: 40.0,
      description:
        "Solvers have found all or most of the coat names and have ordered them correctly but don’t know what to do next.",
      keywords: [
        "Joseph’s Song",
        "coat names",
        "ordering",
        "colors",
        "web colors",
        "html",
        "hex values",
      ],
      nudge:
        "Have you looked at the first letters of the coat names against the enumeration provided when the coats are in the correct color order?",
    },
    {
      order: 40.1,
      description:
        "The team has the correct coat names, colors, and ordering, but they don’t know what to do next.",
      keywords: [
        "nordine",
        "lp",
        "tip",
        "nor",
        "dine",
        "joseph’s coat",
        "colors",
        "coat names",
        "enumeration",
      ],
      nudge:
        "The first letter from each coat name spells out a strange phrase. Have you tried looking up the phrase or words from the phrase online?",
    },
    {
      order: 50.0,
      description:
        "The team has found the second relevant music album, but doesn’t know what to do next.",
      keywords: ["Ken", "Nordine", "Colors", "album", "LP"],
      nudge:
        "This jazz album’s colors look super familiar, almost like I just saw them. I wonder if there is some connection they have to the coat colors.",
    },
    {
      order: 60.0,
      description:
        "The solvers found the second album and found a connection between the colors from the song in part 1 of the puzzle. However, they don’t know what to do next.",
      keywords: ["album", "colors", "Nordine"],
      nudge:
        "These colors from the jazz album and the musical’s song match up pretty nicely. Is there something from the clue phrase from part 1 of the puzzle the team has not used yet?",
    },
    {
      order: 75.0,
      description:
        "Team has mapped the colors from the jazz album and coats, and they figured out they need information from the backside of the jazz album to complete the phrases in the set list, but they are having trouble pairing the the additional information to the set list phrases.",
      keywords: ["set list", "final ordering"],
      nudge:
        "Set lists are an order of songs. Do you know of anything else you’ve encountered that might also suggest a song order?",
    },
    {
      order: 100.0,
      description:
        "The team has gotten the final clue phrase but does not know what to do with it.",
      keywords: ["final cluephrase"],
      nudge:
        "Have you tried associating a color with the thing from the clue phrase?",
    },
  ],
  canned_responses: [
    {
      guess: ["NORDINE LP TIP"],
      reply: "That is a clue phrase. Keep going!",
    },
    {
      guess: ["STOP CODON UGA"],
      reply: "That is a correct cluephrase!",
    },
  ],
};

export default puzzle;
