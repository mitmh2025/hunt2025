import { type PuzzleDefinition } from "../types";
import Puzzle from "./puzzle";
import Solution from "./solution";

const puzzle: PuzzleDefinition = {
  title: "Star Crossed",
  slug: "star_crossed",
  initial_description:
    "A large isometric grid of letters in the shape of a circle",
  answer: "FISTS",
  authors: ["Joanna Murray"],
  editors: ["Henry Wong", "Julian West", "Robin Deits"],
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
      description: "Solvers have no idea where to start",
      nudge:
        "This puzzle is a wordsearch. Can you find any names for people or places hidden in the grid?",
    },
    {
      order: 10.0,
      description:
        "Solvers have found names for some people and places but don’t know how to continue.",
      keywords: [
        "Wordsearch",
        "King George III",
        "Maximilian Hell",
        "Lewestown",
      ],
      nudge: "There are 13 people and 13 places to find.",
    },
    {
      order: 15.0,
      description:
        "Solvers have found names of 13 people and 13 places but don’t know how they relate to each other.",
      keywords: ["King George III", "Richmond"],
      nudge:
        "These people all witnessed a particular astronomical event and recorded their observation of it.",
    },
    {
      order: 20.0,
      description:
        "Solvers have identified all the people and places and have paired them into 13 pairs but don’t know how to continue.",
      keywords: ["Transit of Venus 1769", "Astronomers", "Locations."],
      nudge:
        "The lines containing each astronomer and transit location intersect in only one position.",
    },
    {
      order: 30.0,
      description:
        "Solvers have found the intermediate key phrase SHIFT BY ELEVEN but aren’t sure what to do with it.",
      keywords: ["SHIFT BY ELEVEN"],
      nudge:
        "“Shift” here refers to a Caesar shift, i.e. replace each letter in the wordsearch with the letter 11 places ahead in the alphabet (mod 26).",
    },
    {
      order: 35.0,
      description:
        "Solvers have made the new grid (shifted by 11 from original) and the clue phrase “CROSS OUT LINES IN EVERY DIRECTION FROM YEAR STARTS” at the top but aren’t sure what the “years” refers to.",
      keywords: [
        "CROSSOUTLINESINEVERYDIRECTIONFROMYEARSTARTS",
        "CROSS OUT LINES IN EVERY DIRECTION FROM YEAR STARTS",
      ],
      nudge: "The “years” here are represented in Roman Numerals in the grid.",
    },
    {
      order: 40.0,
      description: "Solvers have found some years but not all",
      keywords: ["Years", "Roman numerals"],
      nudge:
        "Which event was referenced in the previous step that occurred in multiple years through history? Also note the flavortext.",
    },
    {
      order: 50.0,
      description:
        "Solvers have found most or all of the years in Roman numerals but aren’t sure what to do with “CROSS OUT LINES IN EVERY DIRECTION FROM YEAR STARTS”",
      keywords: [
        "Years",
        "Roman numerals",
        "CROSS OUT LINES IN EVERY DIRECTION FROM YEAR STARTS",
      ],
      nudge:
        "“Year starts” here refers to the first letter of the Roman numeral representation of each year. “Cross out lines in every direction” means cross out each letter in each of the six lines extending from that first letter in the isometric grid.",
    },
    {
      order: 60.0,
      description:
        "Solvers have crossed out the lines from all of the years in the grid but aren’t sure how to continue.",
      keywords: ["CROSS OUT LINES IN EVERY DIRECTION FROM YEAR STARTS"],
      nudge:
        "Once you’ve crossed out the letters as directed, what’s left? Look in the top half of the grid.",
    },
    {
      order: 70.0,
      description:
        "Solvers have found the intermediate message “SHIFT BACK AGAIN AND LOOK FOR NAMES OF VENUS IN CIRCLES” but aren’t sure what to do next.",
      keywords: [
        "START MESSAGE SHIFT BACK AGAIN AND LOOK FOR NAMES OF VENUS IN CIRCLES END MESSAGE",
      ],
      nudge:
        "“Shift back again” is directing you to look again at the original grid.",
    },
    {
      order: 80.0,
      description:
        "Solvers know they are supposed to be looking for names of Venus in circles in the original grid but are struggling to find any.",
      keywords: ["NAMES OF VENUS IN CIRCLES", "original grid"],
      nudge:
        "Look for names of Venus that are 6 letters long, arranged in a circle/hexagon shape.",
    },
    {
      order: 90.0,
      description:
        "Solvers have found some but not all of the names of Venus in the original grid.",
      keywords: ["Names of Venus", "6 letters", "Vesper"],
      nudge:
        "The names you are looking for are from cultures from all over the world, and are in a specific arrangement in the grid.",
    },
    {
      order: 100.0,
      description:
        "Solvers have found all 5 of the 6-letter names for Venus but are unsure what to do next.",
      keywords: [
        "Vesper",
        "Ishtar",
        "Sao Mai",
        "Chac Ek",
        "Zohrah",
        "extraction",
      ],
      nudge:
        "There’s a natural ordering to the Venus names based on their position in the grid, and because all the names are 6 letters long, there’s another letter in the centre of each.",
    },
  ],
  canned_responses: [
    {
      guess: [
        "CROSS OUT LINES IN EVERY DIRECTION FROM YEAR STARTS",
        "SHIFT BACK AGAIN AND LOOK FOR NAMES OF VENUS IN CIRCLES",
        "SHIFT BY ELEVEN",
        "START MESSAGE SHIFT BACK AGAIN AND LOOK FOR NAMES OF VENUS IN CIRCLES END MESSAGE",
      ],
      reply: "Keep going!",
    },
  ],
};

export default puzzle;
