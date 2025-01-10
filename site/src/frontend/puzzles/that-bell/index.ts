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
  hints: [
    {
      order: 0.0,
      description: "Solvers are at the beginning",
      nudge: "Gee, this looks a lot a word search",
    },
    {
      order: 10.0,
      description: "Solvers have found that the clues identify monarchs",
      keywords: ["sort"],
      nudge:
        "All of these clues are oddly specific to just clue a monarch. Perhaps it’s time to sort out what to do with them.",
    },
    {
      order: 15.0,
      description:
        "Solvers have found that the clues identify monarchs and specific years",
      keywords: ["extraction"],
      nudge:
        "Each of these clues seems to have an extra X near the beginning. Try considering the position of the X.",
    },
    {
      order: 20.0,
      description:
        "Solvers have gotten the cluephrase COUNTRIES OF GREATEST ECLIPSE",
      nudge:
        "NASA has some totally great data on this. Try looking at the maps in their catalog.",
    },
    {
      order: 40.0,
      description:
        "Solvers have identified the countries of greatest (total) eclipse in each clued year",
      keywords: ["extraction"],
      nudge: "You still have those X’s. Try reusing them.",
    },
    {
      order: 60.0,
      description:
        "Solvers have gotten the cluephrase CAESAR BELTS, KING ECLIPSES SON",
      nudge:
        "“Belts” looks like a familiar vocab fun fact. Try to find the belts of the puzzle.",
    },
    {
      order: 70.0,
      description:
        "Solvers have identified the belts / equators of each of the circles they found",
      nudge:
        "Caesar was a shifty leader. He might be trying to hide some kings.",
    },
    {
      order: 80.0,
      description: "Solvers have found the caesar-shifted belts",
      keywords: ["extraction"],
      nudge:
        "Each of sons / suns seems to be eclipsed by their father (and some other things are clearly junk). But these look just a bit off…",
    },
    {
      order: 90.0,
      description:
        "Solvers have identified the incorrect letters in the caesar-shifted fathers in the belts",
      keywords: ["sort"],
      nudge:
        "Each father seems to be shifted by a certain amount. Take a look and see if you see anything unique stand out.",
    },
  ],
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
