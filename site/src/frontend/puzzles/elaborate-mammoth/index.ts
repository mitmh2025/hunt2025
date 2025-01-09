import { type PuzzleDefinition } from "../types";
import Puzzle from "./puzzle";
import Solution from "./solution";

const puzzle: PuzzleDefinition = {
  title: "How I Earned My Gold Star",
  slug: "how_i_earned_my_gold_star",
  initial_description: "A rhyming poem.",
  answer: "BLANK TILE",
  authors: ["Teddy McArthur", "Cyrus Eyster"],
  editors: ["Anna Brunner", "Arcturus Wang", "Kevin Hwang"],
  additional_credits: [],
  content: {
    component: Puzzle,
  },
  solution: {
    component: Solution,
  },
  hints: [
    {
      order: 10.1,
      description: "Teams are having trouble getting started.",
      keywords: ["starting", "where to start"],
      nudge:
        "This puzzle is about sumo wrestling. Does the term “gold star” hold any significance in sumo wrestling?",
    },
    {
      order: 10.2,
      description:
        "Teams have received the starting nudge but are still unsure of where to proceed.",
      nudge:
        "“Gold star” translates to “kinboshi” in Japanese, and refers to a special kind of victory in sumo wrestling.",
    },
    {
      order: 25.1,
      description:
        "Teams have identified the significance of the gold stars, but not what links them together.",
      nudge:
        "All nine wrestlers seem to be talking about beating the same person for their gold star. Which person did all of them win a gold star against?",
    },
    {
      order: 60.1,
      description:
        "Teams have identified the commonality of the gold stars, but are unsure of how to proceed.",
      nudge:
        "You should consider these nine matches relative to all other matches in which Hakuho gave up a gold star.",
    },
    {
      order: 95.1,
      description:
        "Teams have identified that the broader set of gold stars are important, but have not determined what to do about it.",
      keywords: ["extraction"],
      nudge:
        "Even though this puzzle is about events that happened in Japan, this puzzle wouldn’t work in Japanese. (And not just because the authors don’t speak Japanese.) Why would that be?",
    },
    {
      order: 95.2,
      description: "Teams need the last push.",
      keywords: ["extraction"],
      nudge:
        "As Hakuho conceded 26 gold stars in his career, you can assign each gold star a letter between A and Z in chronological order of when the gold stars were received (A = 1st gold star, etc.). Then reorder by the order of wrestler names given in the second-to-last stanza of the poem.",
    },
  ],
  canned_responses: [
    {
      guess: ["WIN AT SUMO"],
      reply:
        "Great, so you’re ready to step into the dohyo! Go to the Gala and let them know you’re here for the sumo match. Send someone who you think can hold their own in sumo.",
    },
  ],
};

export default puzzle;
