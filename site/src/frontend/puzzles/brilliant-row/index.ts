import { type PuzzleDefinition } from "../types";
import Puzzle from "./puzzle";
import Solution from "./solution";

const puzzle: PuzzleDefinition = {
  title: "A-B-C, Easy as 1-2-3",
  slug: "a_b_c_easy_as_1_2_3",
  code_name: "brilliant-row",
  initial_description: "A series of song lyrics.",
  answer: "PLACEHOLDER ANSWER",
  authors: ["Teddy McArthur"],
  editors: [
    "Chris Gatesman",
    "James Douberley",
    "Laura Nicholson",
    "Robin Deits",
  ],
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
      order: 10.1,
      description: "Solvers are unsure of where to start.",
      keywords: ["starting", "where to start"],
      nudge:
        "This puzzle features several sets of song lyrics with some words and letters obscured. Does the scansion of the lyrics remind you of any other songs you may have heard of?",
    },
    {
      order: 10.2,
      description: "Solvers are still unsure where to start.",
      nudge:
        "Each set of lyrics is rewritten from another well-known song that spells out a word in its lyrics. The lyrics have been changed to describe something new that is spelled out. You’ll need to extract those new letters in the order given to solve the puzzle.",
    },
    {
      order: 25.1,
      description: "Solvers cannot identify song number 1.",
      keywords: ["song 1", "song one"],
      nudge: "Song one is rewritten from “Respect,” by Aretha Franklin.",
    },
    {
      order: 25.2,
      description: "Solvers cannot identify song number 2.",
      keywords: ["song 2", "song two"],
      nudge: "Song two is rewritten from “Hot to Go,” by Chappell Roan.",
    },
    {
      order: 25.3,
      description: "Solvers cannot identify song number 3.",
      keywords: ["song 3", "song three"],
      nudge: "Song three is rewritten from “S.O.S.,” by ABBA.",
    },
    {
      order: 25.4,
      description: "Solvers cannot identify song number 4.",
      keywords: ["song 4", "song four"],
      nudge: "Song four is rewritten from “L-O-V-E,” by Nat King Cole.",
    },
    {
      order: 25.5,
      description: "Solvers cannot identify song number 5.",
      keywords: ["song 5", "song five"],
      nudge: "Song five is rewritten from “T.N.T.,” by AC/DC.",
    },
    {
      order: 25.6,
      description: "Solvers cannot identify song number 6.",
      keywords: ["song 6", "song six"],
      nudge:
        "Song six is rewritten from “F.U.N. Song,” from the television show Spongebob SquarePants.",
    },
  ],
  canned_responses: [
    {
      guess: ["SPELL FOR US"],
      reply:
        "Show off your spelling skills! Come to the Gala, tell the bartender you’re here to spell for them, and then perform a rewritten version of the chorus to “Hot to Go” using a seven-letter word or phrase of your choice. Arm-spelling is mandatory!\n\nSince this puzzle was never used during Mystery Hunt, it does not have a real answer assigned. However, we will accept the answer PLACEHOLDER ANSWER.",
    },
  ],
};

export default puzzle;
