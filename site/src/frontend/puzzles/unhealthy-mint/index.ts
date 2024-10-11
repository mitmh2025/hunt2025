import { type PuzzleDefinition } from "../types";
import Puzzle from "./puzzle";
import router from "./server";
import Solution from "./solution";

const puzzle: PuzzleDefinition = {
  title: "_land",
  slug: "_land",
  initial_description:
    "A thin, multicoloured horizontal line, some shapes composed of squares, and a set of keyboard controls.",
  answer: "PALISADE",
  authors: ["Allen Blaumann"],
  editors: ["Chris Gatesman", "Melanie Matchett Wood", "Michele Pratusevich"],
  additional_credits: [],
  content: {
    component: Puzzle,
    entrypoint: "puzzle_unhealthy_mint",
  },
  solution: {
    component: Solution,
  },
  hints: [
    {
      order: 0.0,
      description:
        "Solvers are stuck on the initial puzzle page and haven’t made any progress",
      keywords: ["line", "polyomino", "letters"],
      nudge:
        "The symbols at the buttons have letters arranged in a specific order, try to consider what could they correspond to.",
    },
    {
      order: 5.0,
      description:
        "Solvers have found the interactive controls but are unsure of how/why the lines change [Weak Hint]",
      keywords: ["line", "move", "segment", "compass"],
      nudge:
        "The buttons are arranged according to a particular convention for certain types of interactive media. Try to visualise what each button does and how it changes the layout of the line.",
    },
    {
      order: 6.0,
      description:
        "Solvers have found the interactive controls but are unsure of how/why the lines change [Strong Hint]",
      keywords: ["line", "move", "segment", "compass"],
      nudge:
        "The line is a representation of Flatland, as clued by the title. The line is a 1-Dimensional camera “looking” into a 2-Dimensional world, where the colored line segments represent walls. The buttons correspond to WASD control scheme often used in interactive, explorative games, with additional controls to rotate the camera or snap the camera to an orthogonal direction.",
    },
    {
      order: 10.0,
      description:
        "Solvers have discovered Flatland and are navigating it, but are unsure of next steps",
      keywords: ["flatland", "line", "moving", "walls"],
      nudge:
        "As a 2D entity looking at a 2D world from within, it may make sense to try to visualise the world from an external perspective. Try mapping out the 2D world and the objects therein.",
    },
    {
      order: 15.0,
      description:
        "Solvers are having trouble navigating/visualising Flatland and the objects",
      keywords: ["flatland", "navigating", "difficult"],
      nudge:
        "Moving around in Flatland is difficult to visualise. The compass can be very useful for orienting yourself or aligning yourself against walls. Some walls are tricky to gauge the depth of, try to view the wall from all angles or push up against the wall and see if you slide along it. Having a high screen brightness may make examining depth easier.",
    },
    {
      order: 20.0,
      description:
        "Solvers have identified various 2D objects, but have not figured out what they mean [Weak Hint]",
      keywords: [
        "object",
        "letter",
        "binary",
        "flag",
        "morse",
        "braille",
        "semaphore",
        "pigpen",
        "resistor",
      ],
      nudge:
        "There are 8 “types” of objects in the world. Each object has their own meaning within their own type.",
    },
    {
      order: 21.0,
      description:
        "Solvers have identified various 2D objects, but have not figured out what they mean [Strong Hint]",
      keywords: [
        "object",
        "letter",
        "binary",
        "flag",
        "morse",
        "braille",
        "semaphore",
        "pigpen",
        "resistor",
      ],
      nudge:
        "Each object is a 2D representation of a well-known cipher or general representation of letters. There are 8 different ciphers used in the puzzle, and each one is almost entirely confined to their own cluster of objects in one part of the world.",
    },
    {
      order: 22.0,
      description:
        "Solvers have identified nearly all ciphers, but are stuck on 1 or 2",
      keywords: [
        "cipher",
        "code",
        "letter",
        "binary",
        "flag",
        "morse",
        "braille",
        "semaphore",
        "pigpen",
        "resistor",
      ],
      nudge:
        "The 8 cipher representations used in the puzzle are: Binary, Block letters, Braille, Maritime signal flags, Morse code, Pigpen, Resistor colors, and Semaphore.",
    },
    {
      order: 30.0,
      description:
        "Solvers have identified most cipher letters, but haven’t gone beyond listing and translating individual letters",
      keywords: [
        "letters",
        "polyominoes",
        "COMMEND",
        "CONSPIRACY",
        "DISPLAY",
        "HAIRCUT",
        "LAPSE",
        "OFFICER",
        "PRETENSION",
        "SCREWDRIVER",
      ],
      nudge:
        "The arrangement of the objects within the world must also be mapped. Using orthogonal compass directions may be very helpful for this step.",
    },
    {
      order: 35.0,
      description:
        "Solvers have identified most cipher letters, but are unsure of how they are used [Weak Hint]",
      keywords: [
        "letters",
        "polyominoes",
        "COMMEND",
        "CONSPIRACY",
        "DISPLAY",
        "HAIRCUT",
        "LAPSE",
        "OFFICER",
        "PRETENSION",
        "SCREWDRIVER",
      ],
      nudge:
        "There are 9 clusters of objects spread throughout the world. The middle cluster, where the player is positioned when the puzzle is opened, uses one letter from every cipher to spell out FLATLAND in two rows. The remaining 8 clusters each correspond to a given polyomino.",
    },
    {
      order: 36.0,
      description:
        "Solvers have identified most cipher letters, but only know how the polyominoes are used [Medium Hint]",
      keywords: [
        "letters",
        "polyominoes",
        "COMMEND",
        "CONSPIRACY",
        "DISPLAY",
        "HAIRCUT",
        "LAPSE",
        "OFFICER",
        "PRETENSION",
        "SCREWDRIVER",
      ],
      nudge:
        "Each polyomino-shaped cluster of objects encodes a word. The ordering of the letters is clued by the FLATLAND flavor in the middle of the world.",
    },
    {
      order: 37.0,
      description:
        "Solvers have identified most cipher letters, but only know how the polyominoes are used [Strong Hint]",
      keywords: [
        "letters",
        "polyominoes",
        "COMMEND",
        "CONSPIRACY",
        "DISPLAY",
        "HAIRCUT",
        "LAPSE",
        "OFFICER",
        "PRETENSION",
        "SCREWDRIVER",
      ],
      nudge:
        "Each polyomino-shaped cluster of objects encodes a word. Every object within each cipher cluster is can be associated with a unique color. As indicated by the letters in the FLATLAND clue in the center of the world, letters must be read according to rainbow color order, reading the red letter first, followed by orange, etc. This will extract a word for each polyomino.",
    },
    {
      order: 40.0,
      description:
        "Solvers have extracted from each polyomino, but haven’t figured out how the polyomino shapes are used",
      keywords: ["polyomino"],
      nudge:
        "There are 8 polyominoes in the world (ignoring the cluster of 8 objects in the center, which is not given a polyomino shape). Count the total number of cells in each polyomino, and see how they may be combined (no rotations or reflections are required).",
    },
    {
      order: 50.0,
      description:
        "Solvers have extracted words from each polyomino, and have figured out how the polyominoes combine, but are stuck [Weak Hint]",
      keywords: ["flat", "earth", "line", "screen", "foot", "head", "top"],
      nudge:
        "Each of the words extracted from each polyomino have a commonality. Consider the puzzle theme and try looking up the words to see how to connect them together.",
    },
    {
      order: 55.0,
      description:
        "Solvers have extracted words from each polyomino, and have figured out how the polyominoes combine, but are stuck [Strong Hint]",
      keywords: ["flat", "earth", "line", "screen", "foot", "head", "top"],
      nudge:
        "All of the words extracted from each polyomino are a synonym of or are associated with a word or phrase with the prefix FLAT. These FLAT-words can be used in the 8x8 grid of letters formed by the polyominoes.",
    },
    {
      order: 70.0,
      description:
        "Solvers have found most FLAT-words but are stuck on extraction [Medium Hint]",
      keywords: ["extraction", "flat", "_land"],
      nudge:
        "The 8x8 grid of letters formed by the polyominoes is a word search. The words with FLAT prefixes can partially be found in this grid; consider the repetition of the title in the given flavor text and what it means in this context.",
    },
    {
      order: 80.0,
      description:
        "Solvers have found most FLAT-words but are stuck on extraction [Strong Hint]",
      keywords: ["extraction", "flat", "_land"],
      nudge:
        "All of the FLAT-prefixed words can be found in the 8x8 grid treated as a word search, however each string is missing the FLAT prefix. The title of the puzzle, “_land” is missing the FLAT prefix, replacing it with an empty character. This suggests to extract the letter that replaces FLAT for each of the words found in the grid.",
    },
    {
      order: 100.0,
      description: "Solvers have not figured out the extraction order",
      keywords: ["extraction", "order"],
      nudge:
        "The polyominoes on the puzzle page are ordered alphabetically according to their extracted word, suggesting that they must be re-ordered. The FLATLAND flavor in the center of the world gives an ordering for each cipher. The extracted letters must be ordered according to the order of their corresponding ciphers in the FLATLAND clue.",
    },
  ],
  canned_responses: [],
  router,
};

export default puzzle;
