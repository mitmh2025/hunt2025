import { type PuzzleDefinition } from "../types";
import Puzzle from "./puzzle";
import Solution from "./solution";

const puzzle: PuzzleDefinition = {
  title: "Maze of Lies",
  slug: "maze_of_lies",
  code_name: "unfit-tower",
  initial_description: "A text adventure exploring a maze",
  answer: "RED BUCKET",
  authors: ["Denis Auroux", "Becca Chang"],
  editors: ["Arcturus Wang", "James Douberley", "tinaun"],
  additional_credits: [],
  content: {
    component: Puzzle,
    entrypoint: "puzzle_unfit_tower",
    copyable: false,
  },
  solution: {
    component: Solution,
  },
  hints: [
    {
      order: 5.0,
      description:
        "Solvers have explored the maze and talked to characters, but can’t figure out who is telling the truth.",
      keywords: ["liars", "truth"],
      nudge:
        "It is possible to determine who is lying and who is telling the truth uniquely.  Two pointers if you are stuck: first, note that Daniel says “Everyone here lies all the time”, not “Everyone but me”. Second, have you tried solving the first grid regions mentioned by Patrick and Vladimir according to their respective instructions, to figure out which one of them is telling the truth?   This should suffice for you to determine the truth values of everyone else’s statements.",
    },
    {
      order: 10.0,
      description:
        "Solvers are unable to figure out which rules apply in which regions.",
      keywords: ["regions", "rules", "identification"],
      nudge:
        "As stated by Stephanie, the nine true statements made about specific regions all refer to distinct regions. Three of the statements uniquely identify which region (with a single door) they apply to.  It is easy to figure out which region Helen’s statement applies to. Three other statements apply to regions with two doors, and by thinking it through (or just trying!) one can determine which region has which rule. Determining which of the remaining two regions correspond to which rule proposed by Patrick is not urgent and can be left off until you are farther along.",
    },
    {
      order: 20.0,
      description:
        "Solvers aren’t sure which region(s) to attempt solving first.",
      keywords: ["stuck", "sudoku"],
      nudge:
        "We suggest focusing first on the Southwest region, which can be solved uniquely up to swapping a pair of digits; and on the Southeast region, where 5 can be placed uniquely.",
    },
    {
      order: 25.0,
      description:
        "Solvers are unable to solve the Southwest region (where Stephanie is).",
      keywords: ["southwest", "stephanie"],
      nudge:
        "Writing a graph of all possible adjacent pairs of digits in the Southwest region is helpful, and should suffice to solve the region uniquely up to possibly swapping 7 and 9.  After you have placed one digit in the Southeast region, the positions of 7 and 9 in the Southwest region can be determined by trying both options and seeing which one fails rapidly (via deductions about the placement of 9s in the Northeast part of the grid and then in the Southeast region).",
    },
    {
      order: 26.0,
      description:
        "Solvers are unable to get started on the Southeast region (where Patrick is).",
      keywords: ["southeast", "Patrick"],
      nudge:
        "In the Southeast region, after removing the digit 5, small (1-4) and large (6-9) must alternate along a checkerboard pattern; and 5 can only be next to 1 and/or 9. These constraints determine uniquely the position of the digit 5.  To solve more of this region, you will likely first need to fully solve the Southwest region, including figuring out where 9 lies in it.",
    },
    {
      order: 30.0,
      description:
        "Solvers feel that they’re missing an important technique for solving Irregular Sudoku grids.",
      keywords: ["irregular sudoku", "stuck"],
      nudge:
        "An important tip about irregular sudoku: when three regions of the grid assemble to three whole rows (or columns) of the grid, plus 1-2 extra cells, minus 1-2 other cells, the extra cells and the missing cells must contain the same set of digits. (This is because the three regions contain each of 1-9 three times, but so do the three rows/columns that almost match the regions.)  In this grid, there are many places where this reasoning applies and tells you that specific pairs of cells must contain the same values.",
    },
    {
      order: 50.0,
      description:
        "Solvers are unsure how to continue after solving the SW and SE regions.",
      keywords: ["stuck"],
      nudge:
        "If not already done, you should first solve the SW region (including figuring out the positions of 7 and 9) (as well as the North region), and finish solving the SE region. After that, possible places to look include (possibly in that order):\r\n(1) locating 1 and 9 in the Northeast region\r\n(2) completing the two southern-most rows of the grid\r\n(3) placing all the remaining 9s, as well the 1s in rows 1 and 3\r\n(4) placing 3 and 7 in the central region\r\n(5) figuring out the only two possibilities for the left-most cell of the East region, and understanding how the sum then works out in that region.\r\n(6) figuring out the rule assignments for the final two regions.\r\n\r\nOnce you’ve done all of these things, solving the rest of the grid is comparatively easier.",
    },
    {
      order: 90.0,
      description: "The grid is solved, but solvers are stuck on extraction.",
      keywords: ["extraction"],
      nudge:
        "Have you tried indexing into the names of the characters in the maze (using the values of the cells where those characters are)?  This should give you one letter for each character.  If you are unsure of the ordering, we recommend writing each letter in its respective location in the grid.",
    },
  ],
  canned_responses: [],
};

export default puzzle;
