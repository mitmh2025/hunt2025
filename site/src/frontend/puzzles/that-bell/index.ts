import { type PuzzleDefinition } from "../types";
import Puzzle from "./puzzle";
import Solution from "./solution";

const puzzle: PuzzleDefinition = {
  title: "Hello Darkness My Old Friend",
  slug: "hello_darkness_my_old_friend",
  initial_description: "A block of monospaced text and a bunch of circles",
  answer: "TODO PLACEHOLDER TODO PLACEHOLDER",
  authors: ["Wesley Graybill", "Eric Broder", "Sue Broder"],
  editors: ["Cyrus Eyster", "Kevin Hwang", "Robin Deits", "Steve Banzaert"],
  additional_credits: [],
  content: {
    component: Puzzle,
    copyable: true,
  },
  solution: {
    component: Solution,
  },
  hints: [],
  canned_responses: [
    {
      guess: [
        "CAESAR BELTS KING ECLIPSES SON",
        "COUNTRIES OF GREATEST ECLIPSE",
      ],
      reply: "Keep going!",
    },
    {
      guess: ["MAKE PARODY OF BONNIE TYLER HIT"],
      reply:
        "Correct! Please record a parody of a Bonnie Tyler song and send your parody to info@mitmh2025.com. Include your team name and the phrase MAKE PARODY OF BONNIE TYLER HIT.",
    },
  ],
};

export default puzzle;
