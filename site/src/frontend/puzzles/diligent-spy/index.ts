import { type PuzzleDefinition } from "../types";
import Puzzle from "./puzzle";
import Solution from "./solution";

const puzzle: PuzzleDefinition = {
  title: "Can-do Transmissions",
  slug: "can_do_transmissions",
  initial_description:
    "A radio broadcast of uninflected voices reading lists of words and numbers",
  answer: "BEAUTIFUL FRIENDSHIP",
  authors: [
    "Matt Behlmann",
    "Evan Broder",
    "James Douberley",
    "Steve Banzaert",
  ],
  editors: ["Chris Pringle", "Hubert Hwang", "Li-Mei Lim", "Robin Deits"],
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
        "Solvers have listened to the stream and transcribed it, but don’t know what to do with the phrases and numbers",
      nudge:
        "All of the “station identifier” phrases can be treated as crossword clues for common words, some of them appearing more than once.",
    },
    {
      order: 5.0,
      description:
        "Solvers have solved many of the crossword clues and found words, but are having trouble linking or using them.",
      nudge:
        "All of these crossword answers are part of a specific set, which is thematic to wartime radio communications. If you google several of them together, you should be able to find the grouping, and an idea of how to use them.",
    },
    {
      order: 10.0,
      description:
        "Solvers have found the first cluephrase, but are having trouble applying it.",
      nudge:
        "One-time pad ciphers are somewhat unintuitive. The text is broken into 5-digit sequences, but actually needs to be treated as a contiguous string. Letters are all consistently presented as two-digit sequences of numbers, including leading zeroes. And Vigenere/One-Time Pad ciphers use a zero-indexed alphabet, A=00…Z=25. The easiest way to decode is to plug the ciphertext into one of many online Vigenere tools. The one-time pad in this case also matches length with the encoded string, as an additional confirmation that you’re on the right track.",
    },
    {
      order: 20.0,
      description:
        "Solvers have found the second (longer) cluephrase and started following its instructions, but are having trouble getting anything at all.",
      nudge:
        "When we say “Read static on linear scale”, we are specifically referring to what’s called a “spectrogram” of the audio. If you record the audio from your radio, many free tools (we like Audacity) will help you view the spectrogram. It will be on log scale by default, but linear looks a lot better.",
    },
    {
      order: 30.0,
      description:
        "Solvers have found the image in the static, but are having trouble interpreting it.",
      nudge:
        "Make sure you’ve recorded at least a full loop and are sufficiently zoomed to see the full thing. The exact shape of the image drawn in the spectrogram—including the notching, the 12x80 aspect ratio, and the many small ticks with some holes—should evoke another era-appropriate communications technology.",
    },
    {
      order: 35.0,
      description:
        "Solvers have read the last clue and still don’t know what to look for.",
      nudge:
        "This is a punchcard, specifically in the style of an IBM 12-row punch. The wikipedia article about them has some information on how to read a punchcard as letters.",
    },
    {
      order: 40.0,
      description:
        "Solvers have read out the punchcard but don’t have the final answer",
      nudge:
        "The previous cluephrase gave you some instructions about a “new pad”. Use this to decrypt the punchcard output.",
    },
  ],
  canned_responses: [
    {
      guess: [
        "ONE TIME PAD IS THE RADIO MANUAL",
        "READ STATIC BETWEEN PM STATIONS ON LINEAR SCALE NEW PAD IS RADIO MANUFACTURER",
      ],
      reply: "Keep going!",
    },
  ],
};

export default puzzle;
