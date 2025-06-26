import { type PuzzleDefinition } from "../types";

const puzzle: PuzzleDefinition = {
  title: "Good Fences Make Good Otherwise Incompatible Neighbors",
  slug: "good_fences_make_good_otherwise_incompatible_neighbors",
  code_name: "enchanted-pyrite",
  initial_description: "A hexagonal logic puzzle",
  answer: "SUFFOLK EWES",
  authors: ["Denis Auroux"],
  editors: ["James Douberley", "Henry Wong", "Li-Mei Lim"],
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
      order: 5.0,
      description:
        "Solvers aren’t sure how to start / whether they can solve the slitherlink grids independently.",
      keywords: ["slitherlink", "start"],
      nudge:
        "Each slitherlink link grid can be solved on its own and has a unique solution.",
    },
    {
      order: 8.0,
      description: "Solvers are stuck on the slitherlink grids",
      keywords: ["slitherlink"],
      nudge:
        "There are various hexagonal slitherlink tutorials online, for example this one should teach you more than enough of the standard techniques:\r\nhttps://www.youtube.com/watch?v=vvGmNliPDfs&list=PLVBrAsG80gZ7KrqpQpM45QQy4aqGY0AOo\r\nAlso keep in mind that our slitherlinks have prescribed sheep cells that are inside the loop; keeping track of which cells are inside/outside the loop will help you use this information, but also note that any path between two sheep cells crosses the loop an even number of times.",
    },
    {
      order: 10.0,
      description: "Solvers aren’t sure if sheep’s movements are unique",
      keywords: ["sheep movements", "unique"],
      nudge:
        "The new positions of sheep on each day are uniquely determined, but exactly which sheep moves to which position is not necessarily unique (and isn’t relevant).",
    },
    {
      order: 20.0,
      description: "Solvers can’t figure out the sheep movements after day 1",
      keywords: ["sheep movements", "first night"],
      nudge:
        "Figuring out the sheep movements during the first night requires first solving the day 2 slitherlink grid.  Once this is done:  the sheep positions on day 2 lie inside both day 1 and day 2 loops, and do not contain sheep on day 1. Moreover, they can be reached by travelling by a distance of at most 3 cells inside the day 1 loop.",
    },
    {
      order: 40.0,
      description: "Solvers can’t figure out the wolf movements after day 2",
      keywords: ["wolf movements", "second night"],
      nudge:
        "The wolf movements from day 2 to day 3 are mostly unambiguous. When two sheep are seen at equal distances along grid directions, the choice is determined by other information we have about the wolves’ movements: (1) the paths traced by different wolves over the whole 5-day period do not overlap each other; (2) the wolves’ positions on day 3 lie outside of the day 4 loop, since during the third night the fence gets redrawn before the wolves move; (3) each wolf did move by at least one cell in its chosen direction.",
    },
    {
      order: 60.0,
      description: "Solvers can’t figure out the sheep movements after day 3",
      keywords: ["sheep movements", "third night"],
      nudge:
        "Nine sheep positions are given in the day 4 grid; a tenth one is forced by that sheep having only one valid square (inside both day 3 and day 4 loops) to move to.  The five remaining sheep positions can be inferred from the knowledge that, after the sheep move to their day 4 positions and the fence has switched to the day 4 configuration, each wolf will be able to move towards a closest seen sheep without any two wolves’ trajectories overlapping (in other terms: each wolf will see a sheep in an appropriate direction).",
    },
    {
      order: 70.0,
      description: "Solvers can’t figure out one wolf’s movement after day 3",
      keywords: ["wolf movement", "third night"],
      nudge:
        "One of the wolves has two possible directions of movement during the third night (even taking the non-overlapping constraint into account). One of the two candidate positions can be eliminated a posteriori by noting that one of the sheep moved to a space adjacent to it during the subsequent night, which they wouldn’t have done if a wolf was there.",
    },
    {
      order: 80.0,
      description: "Solvers can’t figure out the sheep movements after day 4",
      keywords: ["sheep movements", "fourth night"],
      nudge:
        "Besides the usual restrictions on candidate cells where sheep can move to (must lie inside both day 4 and day 5 loops, reachable within distance 3, do not contain a sheep on day 4, and are not adjacent to a wolf on day 4), keep in mind that a sheep cannot move to a position where it would become the closest seen sheep to a wolf and force it to attempt moving in a direction where the day 5 fence blocks the wolf’s movement.  More generally, the new sheep positions must be such that every wolf is subsequently able to move in a legal manner.",
    },
    {
      order: 95.0,
      description: "Solvers are stuck on extraction",
      keywords: ["extraction", "letters"],
      nudge: "Have you traced the wolves’ paths? Do these look like letters?",
    },
    {
      order: 98.0,
      description:
        "Solvers are unsure what some of the letters in the wolves’ paths are",
      keywords: ["extraction", "letters"],
      nudge:
        "If you’re having trouble reading a letter in some of the wolf paths in the top-right portion of the grid: those are F’s.",
    },
  ],
  canned_responses: [],
};

export default puzzle;
