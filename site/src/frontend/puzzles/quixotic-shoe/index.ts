import type { SubpuzzleDefinition, PuzzleDefinition } from "../types";
import BetterOprah from "./betteroprah";
import DraughtQueens from "./draughtqueens";
import HardlySafe from "./hardlysafe";
import HellFresh from "./hellfresh";
import Puzzle from "./puzzle";
import router from "./server";
import Solution from "./solution";
import TownSquareSpace from "./townsquarespace";

export const orderedQuixoticSubpuzzleSlugs = [
  "hellfresh",
  "betteroprah",
  "hardlysafe",
  "draughtqueens",
  "townsquarespace",
];
export const quixoticSubpuzzleDataBySlug: Record<
  string,
  { subpuzzle_name: string; answer: string; color: string }
> = {
  hellfresh: {
    subpuzzle_name: "HellFresh",
    answer: "HOTWINGS",
    color: "#ff0000",
  },
  betteroprah: {
    subpuzzle_name: "BetterOprah",
    answer: "MOVE",
    color: "#ffa500",
  },
  hardlysafe: {
    subpuzzle_name: "HardlySafe",
    answer: "IMAGE",
    color: "#3cb317",
  },
  draughtqueens: {
    subpuzzle_name: "DraughtQueens",
    answer: "CARTEL",
    color: "#0000ff",
  },
  townsquarespace: {
    subpuzzle_name: "TownSquareSpace",
    answer: "BEEF",
    color: "#ff00ff",
  },
};
export const mainPuzzleAccessGates = new Set([
  "ptg09",
  "ptg10",
  "ptg11",
  "ptg12",
  "ptg13",
]);

const subpuzzles: SubpuzzleDefinition[] = [
  BetterOprah,
  DraughtQueens,
  HardlySafe,
  HellFresh,
  TownSquareSpace,
];

const puzzle: PuzzleDefinition = {
  title: "And Now, a Puzzling Word From Our Sponsors",
  slug: "and_now_a_puzzling_word_from_our_sponsors",
  initial_description: "Suddenly, your radio feed is interspersed with ads.",
  answer: "TENET",
  authors: [
    "Ollie Shonaldmann",
    "Arcturus Wang",
    "Ariel Schwartz",
    "Eric Marion",
    "Fuzzy Shonaldmann",
    "Jesse Moeller",
    "Nine Morch",
    "Robert “Fro” Myers",
  ],
  editors: ["Kevin Hwang", "Steve Banzaert", "Teddy McArthur"],
  additional_credits: [
    {
      for_what: "Voice acting",
      who: [
        "Ariel Schwartz",
        "Eric Marion",
        "Fuzzy Shonaldmann",
        "Jesse Moeller",
        "Robert “Fro” Myers",
      ],
    },
  ],
  content: {
    component: Puzzle,
    entrypoint: "puzzle_quixotic_shoe",
  },
  solution: {
    component: Solution,
  },
  hints: [
    {
      order: 0.0,
      description: "Solvers have opened puzzle page.",
      nudge: "Listen to the ads on the radio. Could they tell you what to do?",
    },
    {
      order: 10.0,
      description: "HellFresh: Solvers have opened the puzzle page.",
      nudge:
        "The phrase “devilishly good bars” might clue a certain genre of wordplay here. If you’re looking for the grid, what do these brownie bars fit in?",
    },
    {
      order: 10.99,
      description:
        "HellFresh: Solvers have filled the grid in and are unsure what to extract.",
      nudge:
        "There’s one unclued entry in the grid with a thematic phrase. Could that be your promo code?",
    },
    {
      order: 20.0,
      description: "BetterOprah: Solvers have opened the puzzle page.",
      nudge: "This is a dropquotes puzzle",
    },
    {
      order: 20.99,
      description: "BetterOprah: Solvers have solved the dropquotes.",
      nudge:
        "These quotes are from a famous television personality. But could they be missing anything?",
    },
    {
      order: 30.0,
      description: "HardlySafe: Solvers have opened puzzle page",
      keywords: ["hardlysafe"],
      nudge: "This is a crossword, but some squares are handled differently.",
    },
    {
      order: 31.0,
      description: "Hardlysafe: Solvers are working on filling the grid",
      keywords: ["Hardlysafe", "grid"],
      nudge:
        "Some squares in this crossword are “rebus” squares, which means that more than one letter goes in the square.",
    },
    {
      order: 32.0,
      description: "HardlySafe: Solvers are still filling the grid",
      keywords: ["hardlysafe", "grid"],
      nudge:
        "The rebus squares in this grid read differently across and down—different letters go in the rebus squares for each direction.",
    },
    {
      order: 33.0,
      description: "HardlySafe: most explicit hint for filling the grid",
      keywords: ["hardlysafe", "grid"],
      nudge:
        "This grid has 4 rebus squares. Each rebus square is filled with the letters “CAMERA” when read in one direction, and 1-2 letters when read in the other direction.",
    },
    {
      order: 34.0,
      description:
        "HardlySafe: solvers have filled the grid and are working on extraction",
      keywords: ["hardlysafe", "extraction"],
      nudge:
        "Look at the letters in the rebus square for the direction where it doesn’t read “CAMERA”. What could those letters mean?",
    },
    {
      order: 35.0,
      description: "HardlySafe: extraction (more explicit)",
      keywords: ["hardlysafe", "extraction"],
      nudge:
        "The rebus squares in this puzzle read “CAMERA” in one direction, and a cardinal direction the other way (N/S/E/W/NE/NW/SE/SW). Thinking about the flavor text from the radio ad, what could that mean?",
    },
    {
      order: 36.0,
      description: "HardlySafe: extraction (most explicit)",
      keywords: ["hardlysafe", "extraction"],
      nudge:
        "The rebus squares in this puzzle read “CAMERA” in one direction, and a cardinal direction the other way (N/S/E/W/NE/NW/SE/SW). The flavor text from the ad tells us to think about camera that look at key points from multiple angled. Thinking of the rebus squares as cameras facing in the indicated direction, what squares in the grid are “looked at” by two cameras?",
    },
    {
      order: 40.0,
      description: "DraughtQueens: Solver has opened puzzle page",
      keywords: ["draughtqueens", "getting started"],
      nudge:
        "This is a cryptic crossword with a twist. What do you think ’spill a drop’ means here?",
    },
    {
      order: 40.5,
      description:
        "Solvers have solved some cryptic clues and have noticed some of the clues misbehave, or have strange wordplay.",
      keywords: ["draughtqueens", "weird wordplay"],
      nudge:
        "The wordplay for six clues solves to a style of beer. A drop (letter) must be “spilled” from each beer before it matches the given definition, and before it is entered into the grid.",
    },
    {
      order: 40.99,
      description:
        "Solvers have solved the cryptic crosswords and do not know how to extract.",
      keywords: ["extraction"],
      nudge: "Read the “spilled drops” in clue order.",
    },
    {
      order: 50.0,
      description: "TownSquareSpace: Solver has opened puzzle page.",
      nudge: "This is a Wordoku.",
    },
    {
      order: 50.1,
      description: "TownSquareSpace: Solver has opened puzzle page (part 2)",
      nudge: "Each image represents a single letter.",
    },
    {
      order: 50.99,
      description: "TownSquareSpace: Solver has filled in grid",
      nudge:
        "Wordoku puzzles often include a hidden word. What is the most common location for the hidden word in a Wordoku?",
    },
    {
      order: 80.0,
      description:
        "Solvers have solved all minipuzzles and redeemed a martini from the gala.",
      nudge:
        "Each of the 5 colored set of tiles matches back up to one of the 5 minipuzzles you solved.",
    },
    {
      order: 81.0,
      description: "Solvers have matched the tiles back up to the puzzles",
      keywords: ["extraction"],
      nudge:
        "Each set of tiles almost spells out a word from the matching minipuzzle grid. What could you do with the extra letters missing from the scrabble tiles?",
    },
    {
      order: 82.0,
      description:
        "Solvers have found the missing letters from the martini tiles",
      keywords: ["extraction"],
      nudge:
        "Looking at the puzzle page, you’ll notice that the minipuzzle answers are now displayed as scrabble racks. These racks are missing a few letters -- add the missing letters you added to each set of scrabble tiles to create a word from the minipuzzle grid to get the complete scrabble racks.",
    },
    {
      order: 83.0,
      description: "Solvers have the final cluephrase",
      keywords: ["cluephrase"],
      nudge:
        "You’re looking for a “Washington Movie” (a movie with someone named Washington) whose title also means “Central Belief”",
    },
  ],
  canned_responses: [
    {
      guess: subpuzzles.map(({ answer }) => answer ?? ""),
      reply:
        "You can’t submit promo codes here—you’ll have to submit them on the pages for their respective products.",
    },
    {
      guess: ["WASHINGTON MOVIE MEANING CENTRAL BELIEF"],
      reply: "Keep going!",
    },
  ],
  subpuzzles,
  router,
};

export default puzzle;
