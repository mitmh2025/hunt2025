import { type PuzzleDefinition } from "../types";
import Puzzle from "./puzzle";
import Solution from "./solution";

const puzzle: PuzzleDefinition = {
  title: "A Heap of Clards",
  slug: "a_heap_of_clards",
  initial_description:
    "A series of images of glitched baseball cards with text clues, a graphic comprising parts of emoji, and additional text.",
  answer: "BASEBALL MOUND",
  authors: ["John O’Brien"],
  editors: ["James Douberley", "Jesse Moeller", "Li-Mei Lim"],
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
      description:
        "Solvers may have identified some baseball players but don’t know what to do with the anagrams or clock charts",
      keywords: ["clock", "emoji", "anagram"],
      nudge:
        "As well as baseball, this puzzle has a second theme. Think about the puzzle title and how one of the words has been transformed from a more usual word you would expect, or try googling strange phrases from the flavor text. Each image represents a baseball player and a thing from this second theme.",
    },
    {
      order: 10.0,
      description:
        "Solvers have identified that the theme is Blaseball and may have solved some anagrams but don’t know what to do with the clock images",
      keywords: ["blaseball", "clock", "emoji"],
      nudge:
        "The “clock” images represent a pie-chart-like timeline, read from the top and clockwise around back to the top, of a Blaseball player’s team allegiance across the 26 seasons of Blaseball.\r\nTo identify the Blaseball player, it may help to look at where one image slice changes to another and think about what might have caused that and how you can look up such an event. The anagrammed terms are also related to the Blaseball player and may help you to identify them in some cases.",
    },
    {
      order: 30.0,
      description:
        "Solvers have identified most or all of the baseball players and some of the Blaseball players, but aren’t sure what to do with these pairs",
      keywords: ["blaseball"],
      nudge:
        "Once you have identified the baseball player and the Blaseball player for each card, you should notice that the two names have identical enumeration (i.e. the names are the same length). Knowing each pair has matching enumeration may help you to identify any players that are still missing.\r\nOnce you have all the names, use the common letters to progress.",
    },
    {
      order: 60.0,
      description:
        "Solvers have solved most anagrams but don’t know how to identify the missing ones",
      keywords: ["anagram", "blessing"],
      nudge:
        "The anagrammed terms are all the blessings that have affected the Blaseball player represented by the card. If you have identified the player, their wiki page should contain all the information about the blessings they have received. If you’re not sure about the player, looking at the appropriate season wiki page for that blessing should list affected players to help you confirm them.\r\nThe blessings are in alphabetical order, once solved (including the missing one).",
    },
    {
      order: 90.0,
      description:
        "Solvers have identified almost all the player pairs and want help extracting",
      keywords: ["INDEX MAIN POS INTO BLESSING", "extraction"],
      nudge:
        "For extraction you will need the most played (“main”) position that each baseball player played in the major leagues. Where it’s not explicitly given in the clue text in the image or is ambiguous, use the Baseball Reference player page’s Games Played section as a source of truth. Each position can be converted to a number in traditional baseball scoring, starting with Pitcher = 1.\r\nYou will also need the missing blessing from each Blaseball player. The player’s wiki page should contain all of their blessings, and the blessings are listed in alphabetical order in each image. Be careful, some blessings start with words like “The”.\r\nIndexing the position into the blessing in each pair will spell your final answer.",
    },
  ],
  canned_responses: [
    {
      guess: ["INDEXMAINPOSINTOBLESSING"],
      reply: "This is an intermediate clue step. Keep going!",
    },
  ],
};

export default puzzle;
