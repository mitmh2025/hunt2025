import rootUrl from "../../utils/rootUrl";
import { type PuzzleDefinition } from "../types";
import Puzzle from "./puzzle";
import Receipt from "./receipt";
import Solution from "./solution";

const puzzle: PuzzleDefinition = {
  title: "Drunkens and Flagons",
  slug: "drunkens_and_flagons",
  code_name: "thorough-arm",
  initial_description: "Zebra style logic puzzle",
  answer: "SLEIGHT OF HAND",
  authors: ["Ariel Schwartz"],
  editors: ["Chris Gatesman", "Erin Price", "Hubert Hwang", "Robin Deits"],
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
      order: 1.0,
      description: "Solvers do not know where to start",
      keywords: ["start"],
      nudge:
        "This is a “Zebra-style” logic puzzle. If you google that phrase, you may find some example diagrams of grids you can use to organize your solve. Some information is given to you explicitly, so fill that in first.",
    },
    {
      order: 50.0,
      description:
        "Solvers have received the receipt and do not know what to do with it",
      keywords: ["receipt", "drink names"],
      nudge: "Did you notice that the receipt is itemized?",
    },
    {
      order: 75.0,
      description:
        "Solvers have matched the drink name to the drink type but do not know how to proceed",
      keywords: ["drink names, extraction"],
      nudge:
        "The characters insulted each other throughout the puzzle, but some of their insults were pretty strange. What’s up with that?",
    },
    {
      order: 99.0,
      description:
        "Solvers have received the cluephrase but do not know what it means",
      keywords: ["extraction"],
      nudge:
        "This puzzle is themed around Dungeons and Dragons. What sort of check would you roll in Dungeons and Dragons in order to steal from someone?",
    },
  ],
  canned_responses: [
    {
      guess: ["ANSWER CHECK TO PILFER BAG", "CHECK TO PILFER BAG"],
      reply: "This is a cluephrase for the final answer.",
    },
    {
      guess: [
        "ANSWER CHECK TO PILFER BAG SEVEN TWO FOUR",
        "CHECK TO PILFER BAG SEVEN TWO FOUR",
      ],
      reply: "This is a cluephrase and enumeration for the final answer.",
    },
    {
      guess: ["GO PAY TAB"],
      reply:
        "The bartender is glaring daggers at you. You’d better go to the Gala and pay up. Send someone who can act appropriately contrite.\n\nDuring Mystery Hunt, teams would be lambasted by bartenders for the mess they had made—there was often kneeling and groveling involved—but if they seemed sufficiently apologetic, they would be given a receipt. Fortunately, you won’t be subjected to quite that much hazing; you can find a copy of your tab ",
      link: {
        href: `${rootUrl}/ye_olde_mystery_hunt_tavern_receipt`,
        display: "here.",
      },
    },
  ],
  subpuzzles: [Receipt],
};

export default puzzle;
