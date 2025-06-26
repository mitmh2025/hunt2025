import type { PuzzleDefinition } from "../types";

const puzzle: PuzzleDefinition = {
  title: "The Casino",
  slug: "the_casino",
  code_name: "fortunate-calf",
  authors: ["Elan Blaustein"],
  editors: ["James Douberley", "Henry Wong", "Li-Mei Lim", "Robin Deits"],
  additional_credits: [
    {
      for_what: "Art",
      who: ["Nine Morch"],
    },
  ],
  content: {
    component: { lazy: () => import("./puzzle") },
    copyable: false,
  },
  solution: {
    component: { lazy: () => import("./solution") },
  },
  answer: "FACE CARD SHARKS",
  hints: [
    {
      order: 1.0,
      description: "Solvers have gotten about 3 or 4 feeders",
      keywords: ["keep rank", "conceal"],
      nudge:
        "How can you turn each answer into a card to play against the dealer?",
    },
    {
      order: 2.0,
      description:
        "Solvers have identified rank substrings but don’t know how to extend mapping to playing cards",
      keywords: ["playing card", "suit"],
      nudge:
        "Each feeder begins with a letter cluing a specific playing card suit.",
    },
    {
      order: 3.0,
      description:
        "Solvers have identified how each feeder maps to a playing card, but is stuck on what to do with them [Weak hint]",
      keywords: ["seven lucky cards", "down your sleeves"],
      nudge:
        "The feeders each correspond to a playing card; the collection of these cards make up the cards “down your sleeves” which you must play in the poker games.",
    },
    {
      order: 3.5,
      description:
        "Solvers don’t know how to use the poker round images [Weak Hint]",
      keywords: ["clean house", "win", "down your sleeves"],
      nudge:
        "Each image represents a round of Texas Hold’Em Poker against a dealer. You must figure out how to beat the dealer in each game.",
    },
    {
      order: 4.0,
      description:
        "Solvers have identified they must win in each round, and have identified that feeders map to playing cards which must be played, but haven’t identified the markings in the glasses.",
      keywords: ["dealer", "eagle-eyed", "glasses", "best hand"],
      nudge:
        "Look closely at the dealer, they have a tell giving away their hand.",
    },
    {
      order: 5.0,
      description:
        "Solvers have identified they must win in each round, that feeders map to playing cards which must be played, and the markings in the glasses, but don’t know how to use the cards in the round/assumed only one card is used per round.",
      keywords: ["seven lucky cards", "double up"],
      nudge:
        "Each of the feeder playing cards must be used twice across all 7 rounds.",
    },
    {
      order: 6.0,
      description:
        "Solvers have nearly associated the correct feeder cards to rounds, but are still hung up on ambiguities; haven’t figured out not to play cards when they’re already on the table.",
      keywords: ["double up", "conceal your con"],
      nudge:
        "If a card is already present on the table, you should not play it, otherwise the dealer will catch you cheating (“conceal your con”). There is only one unique way to beat the dealer in each round.",
    },
    {
      order: 7.0,
      description:
        "Solvers have paired up most of the cards correctly, but are stuck on extraction [Weak Hint]",
      keywords: ["extraction", "pairs"],
      nudge:
        "Beating the dealer in each round gives a pairing for two feeders. What property of each feeder can be used for extraction?",
    },
    {
      order: 7.1,
      description:
        "Solvers have paired up most of the cards correctly, but are stuck on extraction [Strong Hint]",
      keywords: ["extraction", "pairs"],
      nudge:
        "Each pair of cards associates two feeders with two ranks. Using Ace=1, King=13, index the rank of each card into its pair to extract a bigram.",
    },
    {
      order: 8.0,
      description:
        "Solvers have extracted most of the bigrams, but don’t know the order",
      keywords: ["extraction", "dealer chip", "order"],
      nudge:
        "The player’s cards indicate the ordering of each bigram, depending whether the left or right card is on top.",
    },
  ],
  canned_responses: [],
};

export default puzzle;
