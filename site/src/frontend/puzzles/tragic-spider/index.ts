import { type PuzzleDefinition } from "../types";

const puzzle: PuzzleDefinition = {
  title: "\u7687\u5e1d\u306e\u6697\u53f7",
  slug: "\u7687\u5e1d\u306e\u6697\u53f7",
  code_name: "tragic-spider",
  initial_description: "A switch and a series of images",
  answer: "THE END OF THE HEISEI ERA",
  authors: ["Leland Aldridge"],
  editors: [
    "Amanda Giermann",
    "James Douberley",
    "Nathan Fung",
    "Robin Deits",
    "Will Day",
  ],
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
      order: 10.0,
      description: "Solvers are at the very beginning of the puzzle",
      keywords: ["Beginning", "start"],
      nudge:
        "Each image should be identified in two different ways. These identifications determine the two different orderings of the images when the toggle switch is flipped. If this makes sense to you for only one of the two orderings, try investigating the proper noun in the flavor text. It is a person, and one thing this person is known for is referenced in the rest of the flavor text.",
    },
    {
      order: 15.0,
      description:
        "Solvers have considered the previous hint and would like more explicit instruction",
      keywords: ["Explicit", "more"],
      nudge:
        "“The colors are fragrant, but they” is one translation of the first line of the Iroha, a poem attributed to Kūkai. This poem has a special property of historical importance which informs the presentation of this puzzle.",
    },
    {
      order: 20.0,
      description:
        "Solvers have begun to identify English and Japanese words to apply to the images, but feel stuck / do not know what to do with these identifications",
      keywords: ["images", "words", "English", "Japanese"],
      nudge:
        "It will most likely be necessary to determine the puzzle’s mechanic before being able to fully identify every image. Consider the title of the puzzle and the parts of the flavor text that did not point to the Iroha poem. Particularly, try looking up the exact meaning of the first word in the title, and consider what/who that might be referring to.",
    },
    {
      order: 25.0,
      description:
        "Solvers have considered the title and flavor but cannot extract meaning from these",
      keywords: ["Koutei", "kotei", "emperor", "code", "cipher", "shift"],
      nudge:
        "The title translates to “the emperor’s code,” but specifically a non-Japanese emperor. The flavor mentions two shifts. The ideas of a foreign emperor, a code, and shifting are together intended to lead you to a specific puzzle mechanic.",
    },
    {
      order: 30.0,
      description:
        "Solvers think the general idea of Caesar shifting is important",
      keywords: ["Caesar", "shift"],
      nudge:
        "You’re right, Caesar shifts are important. Try some out on your image identifications!",
    },
    {
      order: 50.0,
      description:
        "Solvers have found some English Caesar shift pairs, but not any Iroha pairs",
      keywords: ["Caesar", "pairs", "English"],
      nudge:
        "You can expand the idea that you are working with, here. All a Caesar shift needs is a string, and an ordering of all possible characters that could make up that string. There’s nothing restricting that idea to just English...",
    },
    {
      order: 70.0,
      description:
        "Solvers have found some English and some Japanese Caesar shift pairs, but are concerned that not every image has a partner",
      keywords: ["Caesar", "iroha", "shift", "English", "Japanese"],
      nudge:
        "Not every image has a Caesar shift partner, and not every image has an Iroha shift partner. Consider the diagram with arrows near the bottom of the puzzle and what the squares and arrows in it represent.",
    },
    {
      order: 90.0,
      description:
        "Solvers have successfully formed some triplets of images and would like guidance on how to interpret them",
      keywords: ["Triplets", "chains"],
      nudge:
        "Consider the distance of each shift, and a pattern should emerge. Values may be interpreted in the usual ways.",
    },
    {
      order: 100.0,
      description:
        "Solvers have an set of triplets ordered by Caesar shift distances and numerical values based on Iroha shift distances",
      keywords: ["Distances", "ordering"],
      nudge:
        "Values in the Iroha context can be taken as indices into the Iroha itself, which produces a string of kana. The final answer of the puzzle is an English phrase; see the enumeration at the bottom of the puzzle.",
    },
  ],
  canned_responses: [
    {
      guess: [
        "\u3078\u3044\u305b\u3044\u306e\u304a\u308f\u308a",
        "heiseinoowari",
        "\u5e73\u6210\u306e\u7d42\u308f\u308a",
      ],
      reply: "Keep going!",
    },
  ],
};

export default puzzle;
