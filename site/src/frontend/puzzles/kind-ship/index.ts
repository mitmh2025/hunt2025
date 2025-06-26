import { type PuzzleDefinition } from "../types";

const puzzle: PuzzleDefinition = {
  title: "T____OTT___P__Y",
  slug: "t____ott___p__y",
  code_name: "kind-ship",
  initial_description: "A series of plaid tiles",
  answer: "CHIVIPANE",
  authors: ["Karen Rustad Tolva", "Drew Fisher"],
  editors: ["James Douberley", "Jonathan Lay", "Melanie Matchett Wood"],
  additional_credits: [],
  content: {
    component: { lazy: () => import("./puzzle") },
    copyable: false,
  },
  solution: {
    component: { lazy: () => import("./solution") },
  },
  hints: [
    {
      order: 1.0,
      description: "Solvers don’t know where to start",
      keywords: [
        "tartan",
        "encoding",
        "letters",
        "sett",
        "scottish",
        "registry",
        "threadcount",
      ],
      nudge:
        "Compare the title to the sample square. You will want an encoding schema that is clued by the flavortext.",
    },
    {
      order: 1.5,
      description: "The solvers aren’t sure what sett notation/system to use",
      keywords: [
        "scottish",
        "registry",
        "tartans",
        "sett",
        "letters",
        "encoding",
        "threadcount",
        "color",
      ],
      nudge:
        "The Scottish Registry of Tartans is the canonical reference for this puzzle.",
    },
    {
      order: 2.0,
      description:
        "The solvers haven’t figured out what the puzzle is referencing",
      keywords: ["title"],
      nudge:
        "The title is written “wheel of fortune” style; it is a common theatrical euphemism that is the theme of this puzzle.",
    },
    {
      order: 3.1,
      description:
        "Solvers are having trouble interpreting the threads and are unsure whether to treat them as single threads or pairs",
      keywords: [
        "two",
        "pair",
        "threadcount",
        "thread",
        "color",
        "stripe",
        "weave",
      ],
      nudge:
        "2/2 twill fabrics need stripe thicknesses of at least two threads to show their pattern. All stripes in this puzzle are multiples of 2.",
    },
    {
      order: 8.1,
      description:
        "Solvers have decoded the list of fabric swatches but don’t know what to do with the extraction swatch at the bottom",
      keywords: ["extraction", "decode", "fabric", "bottom", "last"],
      nudge: "Each swatch has a “background” color. How can you use those?",
    },
    {
      order: 9.1,
      description:
        "The solvers don’t know what order to put the quotes that have the same color",
      keywords: ["extraction", "color", "same", "quote", "order"],
      nudge: "Each quote fits on only one line on the final piece of fabric.",
    },
    {
      order: 10.1,
      description:
        "The solvers have filled in the bottom swatch but don’t know how to extract letters",
      keywords: [
        "extraction",
        "grid",
        "squares",
        "stripes",
        "final",
        "last",
        "bottom",
      ],
      nudge: "What shapes do stripes on a 2/2 twill fabric make?",
    },
  ],
  canned_responses: [
    {
      guess: ["MAKE US A TEAM TARTAN"],
      reply:
        "Design a tartan for your team and send it to HQ (with a brief explanation of how it represents your team) to receive your answer! Please email your team tartan to info@mitmh2025.com. Be sure to include your team name and the phrase MAKE US A TEAM TARTAN in the subject line.\n\nDuring Mystery Hunt, teams who did so would receive in return the answer to the puzzle: CHIVIPANE.",
    },
  ],
};

export default puzzle;
