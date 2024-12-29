import { type PuzzleDefinition } from "../types";
import Puzzle from "./puzzle";
import Solution from "./solution";

const puzzle: PuzzleDefinition = {
  title: "You're Playing It Wrong",
  slug: "youre_playing_it_wrong",
  initial_description:
    "A video of someone playing piano, along with sheet music",
  answer: "NONET",
  authors: ["Hubert Hwang"],
  editors: ["Elan Blaustein", "Nathan Fung", "Steve Banzaert"],
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
      description: "Solvers are having trouble getting started",
      keywords: ["start"],
      nudge:
        "Consider the name in the flavortext.  Does that name resemble any sort of code?",
    },
    {
      order: 1.5,
      description:
        "Solvers have noted the Vigenere cipher but do not know what to apply it to",
      keywords: ["start", "Vigenere"],
      nudge:
        "The sheet music and the video have different titles, but both titles are eight letters long.  Figure out what Vigenere key will get you from the sheet music title to the video title.",
    },
    {
      order: 30.0,
      description:
        "Solvers have a set of notes but are not sure what to do next",
      keywords: ["notes", "chords"],
      nudge:
        "The piano keys are numbered from 0 to 6, for a total of seven notes.  What codes exist that use groups of seven?",
    },
    {
      order: 45.0,
      description:
        "Solvers have turned the XOR-ed chords into binary but are not getting a legible message",
      keywords: ["XOR", "binary", "ASCII"],
      nudge:
        "The piano keys are labeled 0 to 6, and in binary, bit 0 conventionally refers to the least-significant bit.",
    },
    {
      order: 60.0,
      description:
        "Solvers have obtained the message “Interpret roots as Solresol” but aren’t sure what to do with it",
      keywords: ["Solresol"],
      nudge:
        "Although sol, re, and sol are all notes in solfege, note that Solresol is capitalized and all one word.  Look it up!",
    },
    {
      order: 60.5,
      description: "Solvers are not sure what “roots” to apply to Solresol",
      keywords: ["Solresol", "roots", "chords"],
      nudge:
        "The root of a chord is the “base” note that the chord is built off of.  In chord notation, the root is always the note written at the beginning of the chord.",
    },
    {
      order: 80.0,
      description:
        "Solvers have a string of solfege notes but are having trouble reading it in the Solresol language",
      keywords: ["Solresol"],
      nudge:
        "The sheet music suggests that each note should be played for four beats in a steady way.  However, the video does not do that.  How could you use that to break the notes into “words”?",
    },
  ],
  canned_responses: [
    {
      guess: ["INTERPRET ROOTS AS SOLRESOL"],
      reply: "Keep going!",
    },
  ],
};

export default puzzle;
