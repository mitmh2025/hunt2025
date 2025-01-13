import { type PuzzleDefinition } from "../types";
import Puzzle from "./puzzle";
import Solution from "./solution";

const puzzle: PuzzleDefinition = {
  title: "Paw Print Detective",
  slug: "paw_print_detective",
  code_name: "rural-helicopter",
  initial_description:
    "A list of nucleotide sequences and suspect cards with disease names",
  answer: "SLEDDER",
  authors: ["Max Wolf"],
  editors: ["Joanna Murray", "Kevin Hwang", "Michele Pratusevich"],
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
      description:
        "Solvers have identified that the sequeces are nucleotide sequences but are unsure where to start.",
      keywords: ["DNA", "search"],
      nudge:
        "Consider reviewing the flavor text for a tool which can take nucleotide sequences as the input.",
    },
    {
      order: 10.1,
      description:
        "Solvers have found the sequences using BLAST but are unsure how to relate them to the suspects.",
      keywords: ["Conditions", "Diseases", "Suspects", "search results"],
      nudge:
        "The conditions which the suspects have are associated with genomic variants in specific genes.",
    },
    {
      order: 20.0,
      description:
        "Solvers have been able to identify the genes but don’t know how to connect them to specific diseases listed on the suspect cards",
      keywords: ["Diseases", "Conditions", "Suspects", "Matching"],
      nudge:
        "The title hints at a website which might be helpful in identifying a genetic basis for various conditions.",
    },
    {
      order: 30.0,
      description:
        "Solvers have found the sequences using BLAST but are unsure which sequence to choose in the results",
      keywords: ["Sequence", "match", "BLAST result", "search result"],
      nudge:
        "The flavor hints at a specific species you might be interested in. The conditions the suspects have are caused by a single mutation in the genome.",
    },
    {
      order: 50.0,
      description:
        "Solvers have matched sequences to the suspect cards but are unsure how to proceed",
      keywords: ["Matched", "extraction", "ID"],
      nudge:
        "Have you looked at the lengths of the given sequences? Is there any info you can use from your search result?",
    },
    {
      order: 100.0,
      description:
        "Solvers have identified the instruction using mismatched bases in the sequences but do not know how to perform it.",
      keywords: ["Cluephrase", "Instruction", "extraction"],
      nudge:
        "Each sequence maps directly to a suspect. A “codon” is a set of three nucleotides which can be translated by a ribosome.",
    },
  ],
  canned_responses: [
    {
      guess: ["GET CODON AT DOG ID"],
      reply: "Keep going!",
    },
  ],
};

export default puzzle;
