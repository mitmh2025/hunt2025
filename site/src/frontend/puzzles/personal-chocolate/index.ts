import { type PuzzleDefinition } from "../types";
import Puzzle from "./puzzle";
import Solution from "./solution";

const puzzle: PuzzleDefinition = {
  title: "Bar Talk",
  slug: "bar_talk",
  initial_description:
    "A picture of beer taps, accompanied by a list of audio files where someone is speaking.  Late round.",
  answer: "LISTEN",
  authors: ["rfong", "Steven Keyes"],
  editors: ["Alex Churchill", "Hubert Hwang", "Julian West", "Matt Behlmann"],
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
      description: "Solvers have made no progress yet.",
      nudge: "The audio files should sound like mispronunciations of clues.",
    },
    {
      order: 15.0,
      description:
        "Solvers have figured out that the audio files are mispronunciations of enumerated clues, but are not sure how to constrain the clue answers.",
      keywords: ["clue", "pronounce", "pronunciation"],
      nudge:
        "The clue answers all have something in common that is thematic to the puzzle in *more than one way*.",
    },
    {
      order: 20.0,
      description:
        "Solvers have figured out that the audio files are mispronunciations of enumerated clues for beers, but are still having trouble constraining the clue answers.",
      keywords: ["clue", "pronounce", "pronunciation", "beer"],
      nudge:
        "After you correct the mispronounced clues, the answers will all be beers of a specific type that is on-theme for the puzzle.",
    },
    {
      order: 60.0,
      description:
        "Solvers have solved the beer clues and are trying to figure out what chart they are supposed to use.",
      keywords: ["chart"],
      nudge:
        "The chart is canonically used to represent one of the types of data presented on the puzzle page; you can find examples of this chart on Wikipedia and other websites about this data. Different versions of the chart may look a little different, but for purposes of this puzzle they are all interchangeable.",
    },
    {
      order: 70.0,
      description:
        "Solvers have solved the beer clues, found the IPA vowel chart, and are trying to figure out what to draw on the chart.",
      keywords: ["chart", "draw"],
      nudge:
        "The data you should use on the chart was not previously used at all to solve the beer clues.",
    },
    {
      order: 80.0,
      description:
        "Solvers have tried plotting the provided vowels on the IPA vowel chart, but are not sure what they’re supposed to get from the drawings.",
      keywords: ["vowel", "chart", "draw"],
      nudge:
        "The drawings on the chart should make a type of symbol that you have already seen in the puzzle presentation.",
    },
  ],
  canned_responses: [
    {
      guess: [
        "BEYONCESONGORUSEEARS",
        "bij\u0251nses\u0251\u014b\u0254\u0279juzi\u0279z",
      ],
      reply: "That is a clue phrase. Keep going!",
    },
  ],
};

export default puzzle;
