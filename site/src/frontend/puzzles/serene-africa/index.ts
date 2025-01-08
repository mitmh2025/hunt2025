import { type PuzzleDefinition } from "../types";
import Puzzle from "./puzzle";
import Solution from "./solution";

const puzzle: PuzzleDefinition = {
  title: "Papa’s Bookcase",
  slug: "papas_bookcase",
  answer: "FEEL GOOD FICTION",
  authors: ["Hubert Hwang", "Alex St Claire", "James Douberley", "Mike Mannis"],
  editors: ["Kevin Hwang", "Li-Mei Lim", "Robin Deits"],
  additional_credits: [
    {
      for_what: "Art",
      who: [
        "Anna Brunner",
        "Arcturus Wang",
        "Gareth",
        "Karen Rustad Tolva",
        "Nine Morch",
        "rfong",
        "Simone Agha",
      ],
    },
    {
      for_what: "Tech",
      who: ["Drew Fisher", "Fuzzy Shonaldmann"],
    },
  ],
  content: {
    component: Puzzle,
    copyable: true,
  },
  solution: {
    component: Solution,
  },
  hints: [
    {
      order: 10.0,
      description: "Opening the drawer lock",
      keywords: ["lock"],
      nudge:
        "This is a directional lock. To unlock it, you’ll need a puzzle answer that somehow tells you a series of directions.",
    },
    {
      order: 13.0,
      description: "Opening the combination safe",
      keywords: ["lock"],
      nudge:
        "This is a combination safe lock, which turns left, right, and left. To unlock it, you’ll need a puzzle answer that provides three numbers.",
    },
    {
      order: 16.0,
      description: "Opening the digital safe lock",
      keywords: ["lock"],
      nudge:
        "This is a digital keypad lock. To unlock it, you’ll need a puzzle answer that provides numbers that are useful on a seven-segment display.",
    },
    {
      order: 19.0,
      description: "Opening the circuit breaker lock",
      keywords: ["lock"],
      nudge:
        "This lock consists of multiple switches that are either on or off. To unlock it, you’ll need a puzzle answer that can be converted into a series of 40 on/off positions somehow.",
    },
    {
      order: 20.0,
      description: "Opening the circuit breaker lock, more explicit hint",
      keywords: ["lock"],
      nudge:
        "Specifically, you’ll need a puzzle answer that can be encoded into hexadecimal, and then....",
    },
    {
      order: 22.0,
      description: "Opening the cryptex lock",
      keywords: ["lock"],
      nudge:
        "This is a regular cryptex lock. To open it, you’ll need a puzzle answer that you can enter into the lock.",
    },
    {
      order: 40.0,
      description:
        "Solvers are having trouble getting started, possibly not using the correct feeders",
      keywords: ["Bookshelf"],
      nudge:
        "Only the puzzle answers that were hidden behind the locks are used in the meta. The answers that opened the locks are not reused. Try comparing the five feeder answers with bookcase books.",
    },
    {
      order: 50.0,
      description: "Solvers not sure what mechanic they should be using",
      keywords: ["Bookshelf"],
      nudge:
        "The note next to the bookcase tells you an important property of the books.",
    },
    {
      order: 60.0,
      description: "Solvers still don’t know what to do with feeders",
      keywords: ["Bookshelf", "Extraction"],
      nudge:
        "Each of the feeder answers can be matched with a single book on the bookcase.",
    },
    {
      order: 70.0,
      description:
        "Solvers have associated feeder answers paired with books along with MDS number, but don’t know how to extract",
      keywords: ["Bookshelf", "extraction", "MDS", "DDC"],
      nudge:
        "Use the number associated with each book to index. Only digits before the decimal are used.",
    },
    {
      order: 90.0,
      description: "Solvers have the answer phrase but are stuck",
      keywords: ["Bookshelf interaction"],
      nudge:
        "Papa likes“feel-good” fiction. But there’s another way to interpret that phrase, which will tell you which books to slide out…",
    },
  ],
  canned_responses: [],
};

export default puzzle;
