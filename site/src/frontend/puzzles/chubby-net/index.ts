import { type PuzzleDefinition } from "../types";
import Puzzle from "./puzzle";
import Solution from "./solution";

const puzzle: PuzzleDefinition = {
  title: "Splits Used as History",
  slug: "splits_used_as_history",
  code_name: "chubby-net",
  initial_description:
    "A scrolling list of alphabetized letter n-grams with enumerations",
  answer: "YOUR WINNINGS SIR",
  authors: ["Joel Fried"],
  editors: ["Anna Brunner", "James Douberley", "Will Day"],
  additional_credits: [
    {
      for_what: "Tech mockup",
      who: ["Anna Brunner"],
    },
  ],
  content: {
    component: Puzzle,
    copyable: true,
  },
  solution: {
    component: Solution,
  },
  hints: [
    {
      order: 1.0,
      description:
        "A solver just starting and doesn’t know how to approach the puzzle and begin solving the ngrams",
      keywords: ["start"],
      nudge:
        "If you copy the puzzle into a document you will get a series of alphabetically ordered lettergrams with an enumeration.  Is there a way to reorder those letters (keeping each set together) in a way that matches enumerations to form something more useful?",
    },
    {
      order: 2.0,
      description:
        "Solvers have turned the ngrams into sentences, but don’t know what to do with them",
      keywords: ["clues"],
      nudge:
        "These are cryptic crossword clues. Does the length of each ngram give you any more information on what the possible answers are?",
    },
    {
      order: 3.0,
      description:
        "Solvers solve cryptic clues and have a list of 2-4 letter words",
      keywords: ["cryptics solved", "word list"],
      nudge:
        "Do these words have anything in common?  Does the presentation of the puzzle remind you of something else?  Can you use that to determine what each of these words represents?",
    },
    {
      order: 3.5,
      description:
        "Solvers still don’t know what their cryptic answers represent",
      keywords: ["word list"],
      nudge:
        "Each of these 2-4 letter words is also the stock ticker of a publicly traded company.",
    },
    {
      order: 4.0,
      description:
        "Solvers have identified all the stock codes, but don‘t know what to do with them or the “current prices”",
      keywords: ["Stocks", "Companies", "What to do with the price"],
      nudge:
        "Once you figure out the stock codes is there something associated with these stocks that might help make the prices more usable.  The puzzle title, as well as how the clues are initially presented, might give you some direction.",
    },
    {
      order: 4.5,
      description:
        "Solvers still don’t know how to transform the current prices",
      keywords: ["price"],
      nudge:
        "Each of these companies has undergone a stock split at least once. The cumulative total of their splits can be applied to the “current price” to calculate an “initial price”.",
    },
    {
      order: 6.0,
      description:
        "Solvers have adjusted the prices by the correct values and now have a list of integers",
      keywords: ["extraction", "have stock codes and list of prices"],
      nudge:
        "Now that you have a list of prices and stock codes can you put this information together.  There’s one other thing associated with each stock ticker that you can index into.",
    },
  ],
  canned_responses: [
    {
      guess: ["LAUNCH DART AT TGT IPO"],
      reply:
        "Well if that is your aim, we might be able to help you at the Gala. Tell the bartender that you need a Flying Scotsman to get over a bad split.",
    },
  ],
};

export default puzzle;
