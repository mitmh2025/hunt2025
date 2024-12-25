import { type PuzzleDefinition } from "../types";
import Puzzle from "./puzzle";
import Solution from "./solution";

const puzzle: PuzzleDefinition = {
  title: "Cahfee, Regulah",
  slug: "cahfee_regulah",
  initial_description: "Dunk konundrum.",
  answer: "VOYAGERS",
  authors: ["Ariel Schwartz", "Sarah Leadbeater"],
  editors: ["Anna Brunner", "Laura Nicholson", "Nathan Fung"],
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
      description: "Solvers have not begun to read the instructions",
      keywords: ["start", "flavor"],
      nudge:
        "Does anything look strange in the flavor text? Try googling words in groups.",
    },
    {
      order: 1.1,
      description:
        "Solvers are overwhelmed by the list of rules and instructions",
      keywords: ["rules", "instructions", "why are you like this"],
      nudge:
        "This is a set of rules (mostly) typical of a variant time-speed-distance / regularity rally(e) called “gimmick rally(e)”. Of course, this would take much longer to drive than your regular rally(e). Too bad you didn’t pick up any coffee at the Dunkin’ in the student center, huh?",
    },
    {
      order: 1.2,
      description:
        "Solvers have read the rules but do not know what route to start with",
      keywords: ["first route", "order"],
      nudge:
        "One of the routes gives you an explicit starting address. Try starting with that one.",
    },
    {
      order: 1.3,
      description: "Solvers are getting garbage letters when OBSERVEing signs",
      keywords: ["letters", "oberve"],
      nudge:
        "If you don’t like the letters you’re getting, try following the navigation instructions first, and writing down where you’re going with each step. Then, after you think you’ve gotten to the correct endpoint, go back and make sure you’re applying all the Special Instructions.",
    },
    {
      order: 1.5,
      description:
        "Solvers are confused about where to leave Revere Beach Parkway / Sweetser Circle.",
      keywords: ["revere beach parkway", "sweetser circle"],
      nudge:
        "Hawthorne St., the Main St. spur, and West St. are all eligible rights off of Main St.",
    },
    {
      order: 1.6,
      description:
        "Solvers are confused about where to turn after Sullivan Square.",
      keywords: ["sullivan"],
      nudge: "Try performing these instructions in Google Street View.",
    },
    {
      order: 1.7,
      description:
        "Solvers have just gotten off I-93N and are trying to figure out where to turn left.",
      keywords: ["stoneham", "I-93"],
      nudge: "Try performing these instructions in Google Street View.",
    },
    {
      order: 1.8,
      description:
        "Solvers are trying to navigate the clusterfuck in downtown Chelsea.",
      keywords: ["chelsea"],
      nudge: "Try performing these instructions in Google Street View.",
    },
    {
      order: 1.9,
      description:
        "Solvers have gotten a donut flavor and a number of donuts to order, but do not know what to do with that information",
      keywords: ["donut", "number", "extraction"],
      nudge: "You are probably overthinking the extraction mechanic.",
    },
    {
      order: 1.99,
      description: "Solvers are stuck on extraction",
      keywords: ["extraction"],
      nudge:
        "On your Donut Ordering Card, index the number of donuts for each leg into the donut flavor for each leg to extract a letter. Read the letters in the order on the Donut Ordering Card to get an answer.",
    },
    {
      order: 2.0,
      description: "Solvers have received the post-solve message",
      keywords: ["re-solve", "why are you like this"],
      nudge:
        "You kept track of what Special Instructions applied where, right? Isn’t there one about... well, whatever you call them in your own idiolect?",
    },
    {
      order: 2.99,
      description:
        "Solvers have incremented their indices but one word is too short for the index to work",
      keywords: ["re-solve", "answer too short"],
      nudge:
        "Remember to apply Rule TUMMYACHE. It is the inevitable result of buying all of those donuts.",
    },
  ],
  canned_responses: [
    // TODO: implement re-solve mechanics
    // {
    //   guess: ["FOODCOURT"],
    //   reply:
    //     "Correct! You receive two additional Special Instructions. Rule ROTARY: You haven’t lived here long, have you? No one calls them “roundabouts” or “traffic circles”. In any case, add a donut to your purchase for each one you drove on. Rule TUMMYACHE: If you do not have enough donuts to fulfill your team’s request, do not extract any letters. Instead, feel shame.",
    // },
  ],
};

export default puzzle;
