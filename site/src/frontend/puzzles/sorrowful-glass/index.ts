import { type PuzzleDefinition } from "../types";
import Puzzle from "./puzzle";
import Solution from "./solution";

const puzzle: PuzzleDefinition = {
  title: "(A Puzzle of the Dead)",
  slug: "a_puzzle_of_the_dead",
  initial_description:
    "A self-destructing transmission",
  answer: "HELL HOLE",
  authors: ["Baltazar Ortiz", "Anisa Schardl"],
  editors: ["Hubert Hwang", "Robin Deits", "Steve Banzaert"],
  additional_credits: [],
  content: {
    component: Puzzle,
    entrypoint: "puzzle_sorrowful_glass",
  },
  solution: {
    component: Solution,
  },
  hints: [
    {
      order: 1.0,
      description:
        "Solvers are trying to figure out what to do with the text of the transmission",
      keywords: ["transmission", "poems", "separate", "sort"],
      nudge:
        "Have you tried finding another way to group the lines of the transmission?",
    },
    {
      order: 1.1,
      description:
        "Solvers have separated the transmission poems but aren’t sure what to do with them",
      keywords: ["transmission", "poems", "extract", "sort", "ordering"],
      nudge:
        "If you sort the deinterleaved poems from the transmission by the order their first lines appear and read down the first letters of each line, what does it say?",
    },
    {
      order: 1.3,
      description:
        "Solvers have found the cluephrase “THE FIRST DESTRUCTION USES THE AGRIPPA ENCODING” and know that they need to decode the first destruction according to the Agrippa encoding, but are having trouble with Python scripts.",
      keywords: [
        "Agrippa",
        "encoding",
        "decoding",
        "decode",
        "encode",
        "decrypt",
        "encrypt",
        "ASCII",
        "hex",
        "python",
        "first destruction",
      ],
      nudge: "Time to see The Agrippa Code in Action!",
    },
    {
      order: 2.1,
      description: "Solvers are unsure what to do with the second destruction.",
      keywords: ["second destruction", "DNA", "codons"],
      nudge:
        "The second stage self destruction is DNA. How do you turn that into something human-readable?",
    },
    {
      order: 2.1,
      description:
        "Solvers have only looked at a few of the destructions but aren’t sure how many there are.",
      keywords: ["second destruction", "DNA", "codons"],
      nudge:
        "Have you gone through at least 8 transmissions? What changes across them?",
    },
    {
      order: 3.0,
      description:
        "Solvers have decoded the DNA-encoded poems and Agrippa encoded instructions, but aren’t sure what to do with them.",
      keywords: ["poems", "instructions", "agrippa", "dna", "grouping"],
      nudge:
        "Have you figured out which DNA-encoded poem is which Agrippa-encoded poem type?",
    },
    {
      order: 3.1,
      description:
        "The solvers have paired the DNA-encoded poems and Agrippa encoded instructions but aren’t sure what to do with the instructions",
      keywords: ["poems", "instructions", "agrippa", "dna", "grouping"],
      nudge:
        "The Agrippa-encoded text can be interpreted as instructions for how to interleave the DNA encoded poems into a single large poem (similar to the large “poem” in the transmission, but more cohesive).",
    },
    {
      order: 3.2,
      description:
        "Solvers have reassembled the final megapoem but aren’t sure how to extract / how to interpret the cluephrase",
      keywords: ["rhyme", "second destruction", "agrippa", "extract"],
      nudge:
        "The final Agrippa-encoded first stage self destruction suggests that you want to look at the rhyme scheme!",
    },
    {
      order: 3.3,
      description:
        "Solvers still aren’t sure how to extract and need a more direct nudge",
      keywords: ["extraction"],
      nudge:
        "If you consider the re-interleaved DNA encoded poems as a single large poem and do a rhyme scheme analysis, what do you find?",
    },
  ],
  canned_responses: [
    {
      guess: [
        "AGRIPPA ENCODING",
        "THE AGRIPPA ENCODING",
        "THE FIRST DESTRUCTION USES THE AGRIPPA ENCODING",
      ],
      reply: "Keep going!",
    },
  ],
};

export default puzzle;
