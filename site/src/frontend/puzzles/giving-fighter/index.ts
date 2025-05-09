import { type PuzzleDefinition } from "../types";
import Puzzle from "./puzzle";
import router from "./server";
import Solution from "./solution";

const puzzle: PuzzleDefinition = {
  title: "ChatGPT",
  slug: "chatgpt",
  code_name: "giving-fighter",
  initial_description: "A blank textbox with a text entry field below it",
  answer: "CREME CARAMEL",
  authors: ["Hubert Hwang", "Leland Aldridge", "Michele Pratusevich"],
  editors: ["Henry Wong", "Robin Deits", "Sid Creutz"],
  additional_credits: [],
  content: {
    component: Puzzle,
    entrypoint: "puzzle_giving_fighter",
  },
  solution: {
    component: Solution,
  },
  hints: [
    {
      order: 0.0,
      description: "Solvers are having trouble getting non-pffffft responses",
      nudge:
        "If you cannot get your chat partner to respond meaningfully to you, consider your chat partner’s identity and how that relates to the puzzle title.",
    },
    {
      order: 0.1,
      description:
        "Solvers are still having trouble getting non-pffffft responses",
      nudge: "This puzzle is in a language other than English.",
    },
    {
      order: 5.0,
      description:
        "Solvers are getting some valid responses but are not sure what to do",
      nudge:
        "There are four different ways that your chat partner is hiding information. What it is communicating in each way can be entered into the answer checker for confirmation.",
    },
    {
      order: 20.0,
      description: "Solvers are having trouble finding patterns in the output",
      nudge:
        "You will need to look at the first letters of several successive responses before you can get this piece of information.",
    },
    {
      order: 20.1,
      description:
        "Solvers are having trouble finding patterns in the output (pt 2)",
      keywords: ["first letters"],
      nudge:
        "The first sound of each response is always “miaou”, but the first letter is changed.  Those letters do not depend on your input.  Eventually, those letters will repeat after you’ve entered enough valid inputs.",
    },
    {
      order: 40.0,
      description: "Solvers see repeating sequences of miaou/ronron",
      nudge:
        "There are a number of different sequences of miaou/ronron that do not depend on your input.  They will eventually repeat.",
    },
    {
      order: 40.1,
      description: "Solvers see repeating sequences of miaou/ronron (pt 2)",
      keywords: ["binary"],
      nudge:
        "There are eight different sounds in each response.  The only options for each sound are miaou/ronron.  Consider what encoding mechanisms might involve eight binary choices.",
    },
    {
      order: 40.2,
      description: "Solvers see repeating sequences of miaou/ronron (pt 3)",
      keywords: ["binary", "ascii"],
      nudge:
        "In each response, treat miaou as 0 and ronron as 1, and decode the response as 8-bit binary.  You will need to decode several successive responses.",
    },
    {
      order: 60.0,
      description:
        "Solvers are wondering about the punctuation at the end of each response",
      keywords: ["punctuation"],
      nudge:
        "There are three different types of punctuation: exclamation marks, question marks, and periods.  There are always seven symbols, and the specific set of symbols will depend on your input.",
    },
    {
      order: 60.1,
      description:
        "Solvers are wondering about the punctuation at the end of each response (pt 2)",
      keywords: ["punctuation"],
      nudge:
        "The punctuation at the end of each response represents a game of Mastermind, which will use all of the letters in your input.",
    },
    {
      order: 60.2,
      description:
        "Solvers are wondering about the punctuation at the end of each response (pt 3)",
      keywords: ["punctuation", "mastermind"],
      nudge:
        "Exclamation marks represent a correct letter in the correct spot, question marks represent a correct letter in an incorrect spot, and a period represents a letter that was not in the input.",
    },
    {
      order: 80.0,
      description: "Solvers are wondering about the highlights",
      keywords: ["highlight", "glitch", "green"],
      nudge:
        "Whether cat sounds are highlighted will depend on your input and will change depending on how long you’ve been chatting in your current session.",
    },
    {
      order: 80.1,
      description: "Solvers are wondering about the highlights (pt 2)",
      keywords: ["highlight", "glitch", "green"],
      nudge:
        "The highlighting mechanic looks at the first eight letters of your input.",
    },
    {
      order: 90.0,
      description: "Blanks at the bottom",
      keywords: ["blanks"],
      nudge:
        "All the communicated words or sets of words can be placed uniquely into the blanks at the bottom of the puzzle to create a clue phrase, including an enumeration for the answer.",
    },
    {
      order: 95.0,
      description: "Solvers are having difficulty answering the clue phrase",
      keywords: ["extraction"],
      nudge: "The answer described by the clue phrase is a wobbly dessert.",
    },
  ],
  canned_responses: [
    {
      guess: ["AVEC SUCRE", "CHAUFFÉ", "CINQ SEPT", "CÔNE TRONQUÉ"],
      reply: "Cela fait partie de la phrase-indice. Continue!",
    },
    {
      guess: ["CÔNE TRONQUÉ AVEC SUCRE CHAUFFÉ CINQ SEPT"],
      reply:
        "La réponse comporte deux mots; le premier a cinq lettres et le second, sept.",
    },
  ],
  // #!if TARGET !== "client" && !ARCHIVE_MODE
  router,
  // #!endif
};

export default puzzle;
