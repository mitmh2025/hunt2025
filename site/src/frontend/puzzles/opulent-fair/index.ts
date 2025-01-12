import { type PuzzleDefinition } from "../types";
import Puzzle from "./puzzle";
import Solution from "./solution";

const puzzle: PuzzleDefinition = {
  title: "Zulu Lima",
  slug: "zulu_lima",
  code_name: "opulent-fair",
  initial_description: "Transcript of a conversation",
  answer: "SPACE WARSHIPS",
  authors: ["Nine Morch"],
  editors: ["Elan Blaustein", "James Douberley", "Robin Deits"],
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
      description: "Solvers are stuck getting started",
      keywords: ["start"],
      nudge:
        "This puzzle features ships sending—or signalling—messages to each other. The puzzle title might help point you to a maritime communication standard.",
    },
    {
      order: 20.0,
      description:
        "Solvers are looking at maritime flag signalling, and have identified the NATO/ICS flags. Solvers haven’t figured out the Captain’s messages.",
      keywords: [
        "flags",
        "NATO",
        "ICS",
        "Maritime Signals",
        "captain’s message",
      ],
      nudge:
        "The captain is sending some very specific messages. Try identifying how a ship might signal each of these messages using the ICS standard.",
    },
    {
      order: 21.0,
      description:
        "Solvers are looking at the ICS standard for the Captain’s messages.",
      keywords: ["ICS", "NATO", "flags", "Captain"],
      nudge:
        "Under the ICS standard, there are many standard messages that a ship can signal using few flags…many of these messages are intended to be signaled with exactly two flags. Try associating pairs of flags to the messages that the Captain sends.",
    },
    {
      order: 40.0,
      description:
        "Solvers are looking at maritime flag signalling, and have identified the NATO/ICS flags. Solvers haven’t figured out the strange vessel’s messages.",
      keywords: [
        "flags",
        "NATO",
        "ICS",
        "Maritime Signals",
        "strange vessel’s message",
      ],
      nudge:
        "The signaler and Captain discuss the age of the ship as they look for the flags. Look for how a ship from the 1840’s might try to signal messages…especially in a way that the signaler might misidentify as NATO flags.",
    },
    {
      order: 60.0,
      description:
        "Solvers have found Marryat’s flags, and translated the strange vessel’s messages into numbers.",
      keywords: ["Marryat", "numbers", "strange vessel"],
      nudge:
        "Each message that the strange vessel sends starts with a NATO Tango flag. Looking deeper into the way the Marryat code was meant to be used may allow you to translate the actual message that the strange vessel is intending to send. The vessel is well versed in the full Marryat codebook and is using it as intended!",
    },
    {
      order: 80.0,
      description:
        "Solvers have words from the strange vessel and pairs of letters from the Captain.",
      keywords: [
        "words",
        "letter pairs",
        "NATO",
        "ICS",
        "Marryat",
        "flag signals",
        "extraction",
      ],
      nudge:
        "If your words and letter pairs are correctly identified, then each signal-response pair should have commonalities with each other. Specifically, look at what the strange vessel sends, and the Captain’s immediate response to that message. Once the commonalities are identified, an extracted letter should become apparent.",
    },
    {
      order: 81.0,
      description:
        "Solvers have words from the strange vessel and pairs of letters from the Captain, and are working on extraction.",
      keywords: [
        "words",
        "letter pairs",
        "NATO",
        "ICS",
        "Marryat",
        "flag signals",
        "extraction",
      ],
      nudge:
        "Every time the strange vessel sends a word, the Captain responds with a series of messages that result in letter pairs. The letters from the pairs in the reply can be matched 1:1 with letters from the strange vessel’s word, except for one letter in the word, which should be extracted. Once all letters are extracted, the answer may be read from them.",
    },
  ],
  canned_responses: [],
};

export default puzzle;
