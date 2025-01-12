import { type PuzzleDefinition } from "../types";
import Puzzle from "./puzzle";
import router from "./server";
import Solution from "./solution";

const puzzle: PuzzleDefinition = {
  title: "What Do They Call You?",
  slug: "what_do_they_call_you",
  code_name: "new-ketchup",
  initial_description: "A text-adventure-ish interface",
  answer: "LITTLE TOM",
  authors: ["Karen Rustad Tolva", "Drew Fisher"],
  editors: ["Anna Brunner", "James Douberley", "Robin Deits"],
  additional_credits: [],
  content: {
    component: Puzzle,
    copyable: false,
    entrypoint: "puzzle_new_ketchup",
  },
  solution: {
    component: Solution,
  },
  hints: [
    {
      order: 1.0,
      description: "The chatbot won’t stop talking about Spartacus",
      keywords: ["button", "chat", "response", "click", "spartacus"],
      nudge:
        "There is a famous scene in the 1960 film Spartacus. What do the other slaves do in that scene?",
    },
    {
      order: 1.1,
      description: "The chatbot STILL won’t stop talking about Spartacus!",
      keywords: ["button", "click", "number", "spartacus"],
      nudge:
        "If you have gotten a repeated reply from the character you are chatting with, it will not change purely with additional button presses. You will need to change something else to get a different result.",
    },
    {
      order: 20.0,
      description: "How do I know what name to use?",
      keywords: ["moonwalker", "skater", "name"],
      nudge:
        "Each character has a set of rules or constraints for who (or what) they will talk to. Read their statements carefully!",
    },
    {
      order: 30.0,
      description: "Are there multiple correct answers?",
      keywords: [
        "multiple",
        "correct",
        "answers",
        "which",
        "moon",
        "astronaut",
        "skater",
        "moonwalker",
      ],
      nudge:
        "Some characters are willing to talk to more than one other entity. Any such entity will get you the lead that you need.",
    },
    {
      order: 90.0,
      description: "What do we do with the dossier?",
      keywords: ["dossier", "list", "names", "extraction"],
      nudge: "Take a look at the names of the characters you have encountered.",
    },
    {
      order: 95.0,
      description: "I found the clue phrase. Now what?",
      keywords: ["index", "skip", "zeroes", "clue", "phrase", "extraction"],
      nudge:
        "You will need the number at the top of your dossier for the extraction.",
    },
    {
      order: 99.0,
      description: "The chatbot is finished. What is the answer?",
      keywords: ["little", "tom", "fin", "final", "end"],
      nudge: "You have the name that you sought. Call it in.",
    },
  ],
  canned_responses: [
    {
      guess: ["INDEX SKIP ZEROES"],
      reply: "Keep going!",
    },
  ],
  router,
};

export default puzzle;
