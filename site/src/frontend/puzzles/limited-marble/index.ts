import { type PuzzleDefinition } from "../types";

const puzzle: PuzzleDefinition = {
  title: "\u0c95\u0cbe\u0cac\u0cb5\u0ca6\u0ccb\u0cc0\u0ccd",
  slug: "\u0c95\u0cbe\u0cac\u0cb5\u0ca6\u0ccb\u0cc0\u0ccd",
  code_name: "limited-marble",
  initial_description: "List of words in different language scripts",
  answer: "SKETCHPAD",
  authors: ["Wesley Graybill"],
  editors: ["J. Heléne Andersson", "Joanna Murray", "Robin Deits"],
  additional_credits: [],
  content: {
    component: { lazy: () => import("./puzzle") },
    copyable: true,
  },
  solution: {
    component: { lazy: () => import("./solution") },
  },
  hints: [
    {
      order: 10.0,
      description:
        "Solvers are just starting out and don’t know what to do with all these scripts.",
      nudge: "Try using the skills that Mavis Beacon taught you.",
    },
    {
      order: 20.0,
      description:
        "Solvers have identified keyboards as relevant but are are unsure how to make sense of the foreign scripts",
      keywords: ["keyboard", "script"],
      nudge:
        "What would happen if you thought you were typing on a qwerty keyboard, but you had a different keyboard configured on your computer...",
    },
    {
      order: 30.0,
      description:
        "Solvers have started identifying what was typed but haven’t extracted the extra letters",
      nudge:
        "These roman characters that we tried to type look juuust a little bit off from other languages you might recognize by now",
    },
    {
      order: 90.0,
      description:
        "Solvers have identified the typed languages and are looking for an ordering",
      keywords: ["sort"],
      nudge:
        "On each keyboard, you’re typing the name of a different language. Try creating a chain.",
    },
    {
      order: 100.0,
      description:
        "Solvers have extracted the extra letters typed on each keyboard and have the cluephrase “type…on title”",
      keywords: ["extraction"],
      nudge:
        "Find the keyboard for the script in the title. Try typing the gibberish string of characters from the qwerty keyboard on this keyboard.",
    },
  ],
  canned_responses: [
    {
      guess: ["on title type mdkz;d hd/e[d", "type mdkz;d hd/e[d on title"],
      reply: "That sounds like a great idea! Why don’t you try that.",
    },
  ],
};

export default puzzle;
