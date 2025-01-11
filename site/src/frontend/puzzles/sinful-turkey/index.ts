import { type PuzzleDefinition } from "../types";
import Puzzle from "./puzzle";
import Solution from "./solution";

const puzzle: PuzzleDefinition = {
  title: "The Center Is In Plain Sight",
  slug: "the_center_is_in_plain_sight",
  initial_description: "Image of a box with mini-puzzles",
  answer: "FIORE SARDO", // TODO: set pt 2: "SPARE PARTS"
  authors: ["Elan Blaustein"],
  editors: ["Erin Price", "James Douberley", "Teddy McArthur"],
  additional_credits: [],
  content: {
    component: Puzzle,
    entrypoint: "puzzle_sinful_turkey",
    copyable: false,
  },
  solution: {
    component: Solution,
  },
  hints: [
    {
      order: 0.0,
      description:
        "Solvers have not identified the theme connecting the puzzles of the puzzle box",
      keywords: ["puzzle box"],
      nudge: "A clue to the puzzle box theme is hidden in the instructions.",
    },
    {
      order: 20.0,
      description:
        "Chess: Solvers are stuck identifying squares that white pieces attack more than black",
      keywords: ["chess", "squares", "attack"],
      nudge:
        "In chess, a square is controlled by a player if there are more pieces belonging to that player defending that square than pieces belonging to the opponent attacking that square. The piece occupying the square is not included. The rest of the instruction informs what to do with these squares.",
    },
    {
      order: 20.1,
      description:
        "Chess: Solvers are stuck determining what the checkmate clues",
      keywords: ["chess", "mate", "checkmate", "variational"],
      nudge:
        "The chessboard demonstrates a puzzle where white mates in 3 moves. You must find the moves that each player takes and read off the letter of the square that each piece is moved to. There are multiple variations of the checkmate sequence, however the squares that the pieces are moved to are invariant, every checkmate will extract the same letters.",
    },
    {
      order: 20.2,
      description:
        "Chess: Solvers don’t know how to apply ASCII to the attacked squares",
      keywords: ["chess", "ASCII", "attack"],
      nudge:
        "The pattern of squares attacked by white can be read off row-wise as 8-bit ASCII, where the white-controlled squares are 1’s and the rest are 0’s. Each rank (row) of the chessboard extracts a letter in ASCII from top to bottom.",
    },
    {
      order: 21.0,
      description: "Elements: Solvers are having trouble identifying elements",
      keywords: ["elements", "chip", "wafer", "matchbox", "discharge"],
      nudge:
        "The top-left image is a Silicon computer wafer.\r\nThe top-middle image is a gas discharge lamp containing Argon. It looks very similar to a Nitrogen lamp, but Nitrogen is slightly pinker.\r\nThe top-right image is a matchbox, where the dots are mainly composed of red Phosphorus.\r\nThe bottom-left image is a party balloon, typically filled with Helium.\r\nThe bottom-middle image is a heap of toothpaste which contains Fluoride, the ionic form of Fluorine.\r\nThe bottom-right image is the Hindenburg, which caught fire due to being filled with Hydrogen.",
    },
    {
      order: 21.1,
      description:
        "Elements: Solvers have identified the elements but are stuck",
      keywords: ["elements", "atomic number"],
      nudge:
        "The numbers below each object range from 1 to 7. Order the elements’ atomic numbers according to these values, repeating the toothpaste’s element, and translate into letters via A1Z26.",
    },
    {
      order: 22.0,
      description: "Stereogram: Solvers can’t see the image in the stereogram",
      keywords: ["stereogram", "difficult"],
      nudge:
        "The stereogram image is tricky to see, online stereogram/Magic Eye solvers can make visualising the image easier.",
    },
    {
      order: 23.0,
      description:
        "Fibonacci: Solvers are stuck finding the correct differences",
      keywords: ["fibonacci", "absolute"],
      nudge:
        "The minipuzzle depicts a Fibonacci spiral, where each square contains a number. Each square also represents a number in the Fibonacci sequence, where the number gives the square’s side length. Starting from the first square of side length 1, take the absolute difference of each pair of numbers, and A1Z26 the result.",
    },
    {
      order: 24.0,
      description: "Tic-Tac-Toe: Solvers don’t know how to decode Morse",
      keywords: ["tic tac toe", "morse"],
      nudge:
        "The mechanic of this minipuzzle is taken from the source of the puzzle theme; the O’s and X’s must be interpreted as dits and dahs in Morse code, respectively. Squares containing two O’s or two X’s will read as two dits or two dahs.",
    },
    {
      order: 25.0,
      description:
        "Constellations: Solvers are having trouble identifying the constellations",
      keywords: ["constellations", "identification"],
      nudge:
        "Each of the 11 constellations are, in alphabetical order: Boötes, Cancer, Centaurus, Corvus, Hercules, Libra, Pisces, Taurus, Ursa Major, Ursa Minor, Virgo.",
    },
    {
      order: 26.0,
      description: "Music: Solvers don’t know what to do for this minipuzzle",
      keywords: ["music", "beatles"],
      nudge:
        "The music file contains various excerpts from Beatles songs. As taken from the source of the puzzle theme, these songs are layered on top of each other so there are always two songs playing simultaneously. Each song is missing a single word from their lyrics.",
    },
    {
      order: 26.1,
      description:
        "Music: Solvers are having trouble identifying the Beatles songs",
      keywords: ["music", "beatles", "identification"],
      nudge:
        "Each of the 20 Beatles songs appearing in the music file are, in alphabetical order: And Your Bird Can Sing, Being for the Benefit of Mr. Kite!, Blackbird, Chains, Come Together, Eight Days A Week, Glass Onion, Hey Jude, I Am The Walrus, If I Needed Someone, Let It Be, Rock and Roll Music, Roll Over Beethoven, Taxman, When I Get Home, When I’m Sixty-Four, Yellow Submarine, Yes It Is, Yesterday, You Know My Name (Look Up the Number).",
    },
    {
      order: 27.0,
      description:
        "Orientation: Solvers haven’t identified the connection between the inscriptions along the perimeter",
      keywords: ["perimeter", "inscriptions", "orientation"],
      nudge:
        "“Cardinal Orientation” clues the four main compass points, North, East, South, West. These can be associated with the inscriptions along the perimeter.",
    },
    {
      order: 27.1,
      description:
        "Orientation: Solvers have identified the correct orientation but don’t know how to extract",
      keywords: ["perimeter", "inscriptions", "orientation", "blanks"],
      nudge:
        "Once rotated into the correct orientation, each 8-letter inscription along the perimeter should align with 8-length blanks in the center of the puzzle box. Write each inscription in the correct space and read off the blanks from 1 to 33.",
    },
    {
      order: 28.0,
      description: "Fifteen-Puzzle: Solvers don’t know how to move the squares",
      keywords: ["fifteen-puzzle", "squares"],
      nudge:
        "While this puzzle can be solved as a valid fifteen-puzzle by pasting the given image into a simulator, there is nothing stopping solvers from using an image editor to manually move around the tiles of the puzzle directly into their final arrangement.",
    },
    {
      order: 29.0,
      description:
        "Abacus: Solvers don’t understand how to solve for the LHS or order according to the RHS",
      keywords: ["abacus", "LHS", "RHS"],
      nudge:
        "In each equation, the Left-Hand Side (abbreviated LHS) describes a word equation. Solve each equation and write the answer in words (US English). The Right-Hand Side (RHS) of each equation are unique numbers from 1 to 17, providing an ordering.",
    },
    {
      order: 29.1,
      description:
        "Abacus: Solvers have solved the equations but don’t know how to assign answers to abacus racks",
      keywords: ["abacus", "rack", "beads"],
      nudge:
        "Reading each abacus rack (going top to bottom, left to right), the number of beads is always one less than the number of letters in the answer of the corresponding equation. The gap between beads in each rack suggests how to extract.",
    },
    {
      order: 50.0,
      description:
        "Solvers have gotten most cluephrases from each minipuzzle, but don’t know how to apply them",
      keywords: ["RGB", "binairo", "spectrogram", "libebehehehe", "zodiac"],
      nudge:
        "Taken from the puzzle’s source material, the underlying theme is that the puzzles layer over each other to provide new context. Every answer from each minipuzzle can be interpreted as a cluephrase for a different minipuzzle, suggesting a way to re-solve every minipuzzle in a different manner.",
    },
    {
      order: 70.0,
      description:
        "Chess Alt: Solvers don’t know which cluephrase applies to the chess minipuzzle",
      keywords: ["chess", "binairo"],
      nudge:
        "One of the cluephrases refers to a logic puzzle that involves black and white pieces (or 0’s and 1’s).",
    },
    {
      order: 70.1,
      description:
        "Chess Alt: Solvers have identified Binairo but can’t extract",
      keywords: ["chess", "binairo", "ambiguous"],
      nudge:
        "If the Binairo puzzle seems to have more than one answer, double-check the logic puzzle rules. Then, read off the letters in squares of the same color (ignore the red herrings).",
    },
    {
      order: 71.0,
      description:
        "Elements Alt: Solvers don’t know which cluephrase applies to the elements minipuzzle",
      keywords: ["elements", "index libebehehehe"],
      nudge:
        "One of the cluephrases refers to the mechanic of this minipuzzle, translating elements into their atomic numbers.",
    },
    {
      order: 71.1,
      description:
        "Elements Alt: Solvers have identified Index LiBeBeHeHeHe but can’t extract",
      keywords: ["elements", "index libebehehehe", "order"],
      nudge:
        "Since the given elemental symbols present only 6 numbers to index with, it is implied to use the given order of elements and not the previous ordering that uses Fluorine twice. Index these numbers into the names of each element from left to right, top to bottom.",
    },
    {
      order: 72.0,
      description:
        "Stereogram Alt: Solvers don’t know which cluephrase applies to the stereogram minipuzzle",
      keywords: ["stereogram", "RGB"],
      nudge:
        "One of the cluephrases refers to a way to manipulate digital images.",
    },
    {
      order: 72.1,
      description:
        "Stereogram Alt: Solvers have identified RGB but can’t see the answer",
      keywords: ["stereogram", "RGB", "dark"],
      nudge:
        "The clue suggests to view only the Blue channel of the RGB channels composing the image. This can be done in most image editors by isolating the blue channel and if the resulting image is too dark to see, turning the image black & white or increasing its brightness.",
    },
    {
      order: 73.0,
      description:
        "Fibonacci Alt: Solvers don’t know which cluephrase applies to the Fibonacci minipuzzle",
      keywords: ["Fibonacci", "record", "whole number chains"],
      nudge:
        "One of the cluephrases refers to a database of number patterns and an entry in that database.",
    },
    {
      order: 73.1,
      description:
        "Fibonacci Alt: Solvers have identified OEIS but don’t know how to extract",
      keywords: ["Fibonacci", "OEIS", "A135678"],
      nudge:
        "The cluephrase refers to a database of number patterns, where A135678 is an identifier for a specific number pattern. Repeat this minipuzzle’s mechanic using this new pattern with only numbers in the red squares.",
    },
    {
      order: 74.0,
      description:
        "Tic-Tac-Toe Alt: Solvers don’t know which cluephrase applies to the tic-tac-toe minipuzzle",
      keywords: ["tic tac toe", "morse", "grid"],
      nudge: "One of the cluephrases refers to the 3x3 Tic-Tac-Toe grid.",
    },
    {
      order: 74.1,
      description:
        "Tic-Tac-Toe Alt: Solvers have identified the grid image but don’t know how to extract",
      keywords: ["tic tac toe", "morse", "grid"],
      nudge:
        "The image contains a 3x3 grid, corresponding the the Tic-Tac-Toe board, with the numbers 1 to 6 along the edge, covering each row and column. Repeat this minipuzzle’s mechanic by reading along the row/column indicated by each number in order.",
    },
    {
      order: 75.0,
      description:
        "Constellations Alt: Solvers don’t know which cluephrase applies to the constellations minipuzzle",
      keywords: ["constellations", "zodiac", "bayer"],
      nudge:
        "One of the cluephrases refers to a category of constellations and properties of constellation stars.",
    },
    {
      order: 75.1,
      description:
        "Constellations Alt: Solvers have removed the zodiac constellations but don’t know how to order",
      keywords: ["constellations", "zodiac", "bayer", "order"],
      nudge:
        "The cluephrase suggests that new letters won’t be extracted, and instead the previously-extracted letters must be re-ordered, using the same names and numbers. Bayer Stars are constellation stars identified by greek letters, and every star has a Right Ascension (R.A.), suggesting how to order.",
    },
    {
      order: 76.0,
      description:
        "Music Alt: Solvers don’t know which cluephrase applies to the music minipuzzle",
      keywords: ["music", "spectrogram"],
      nudge:
        "One of the cluephrases refers to a way to manipulate digital audio.",
    },
    {
      order: 76.1,
      description: "Music Alt: Solvers don’t know how to view a spectrogram",
      keywords: ["music", "spectrogram"],
      nudge:
        "The spectrogram of an audio file can be viewed with audio software, such as Audacity, or online spectrogram viewers.",
    },
    {
      order: 77.0,
      description:
        "Orientation Alt: Solvers don’t know which cluephrase applies to the orientation minipuzzle",
      keywords: ["orientation", "inscription", "east", "climax", "semaphore"],
      nudge: "One of the cluephrases refers to cardinal directions.",
    },
    {
      order: 77.1,
      description:
        "Orientation Alt: Solvers can’t find climax or apply semaphore",
      keywords: ["orientation", "east", "climax", "semaphore"],
      nudge:
        "The word CLIMAX doesn’t appear in the inscriptions along the perimeter, but the letters in it do. Identify how many times each letter appears and where they appear, and the use that to apply semaphore in the orientation that the cluephrase specifies.",
    },
    {
      order: 78.0,
      description:
        "Fifteen-Puzzle Alt: Solvers don’t know which cluephrase applies to the fifteen-puzzle minipuzzle",
      keywords: ["fifteen-puzzle", "up", "left", "down", "right"],
      nudge:
        "One of the cluephrases refers to a sequence of moves on the given fifteen-puzzle.",
    },
    {
      order: 78.1,
      description: "Fifteen-Puzzle Alt: Solvers can’t determine the answer",
      keywords: ["fifteen-puzzle", "up", "left", "down", "right", "zig-zag"],
      nudge:
        "In the cluephrase, U, L, D, R stand for Up, Down, Left and Right, which indicate which direction tiles must be slid in the fifteen-puzzle. Read along the produced shape for the answer.",
    },
    {
      order: 79.0,
      description:
        "Abacus Alt: Solvers don’t know which cluephrase applies to the abacus minipuzzle",
      keywords: ["abacus", "odd prime", "operator"],
      nudge:
        "One of the cluephrases refers to a way to alter a mathematical expression.",
    },
    {
      order: 79.1,
      description:
        "Abacus Alt: Solvers have ordered the equations but don’t know how to extract",
      keywords: ["abacus", "odd prime", "operator"],
      nudge:
        "Inverting the Left-Hand Side of each equation where the Right-Hand Side is an odd prime results in a different value (swap plus/minus, swap times/divide). Some of the produced values don’t fit in the abacus rack, instead just convert each number to a letter via A1Z26 to attain the answer.",
    },
    {
      order: 90.0,
      description:
        "Solvers don’t know how to form the final cluephrase from the secondary minipuzzle answers",
      keywords: ["the center", "always", "plain sight"],
      nudge:
        "The order that each minipuzzle’s primary answer was fed into another minipuzzle isn’t random. Viewing the source material the puzzle references, the cluephrase assignment matches the order that the puzzles are solved, i.e. Instruction 1 produces the cluephrase for the 1st puzzle in the source material. The secondary answer of each minipuzzle is a 6-letter string. Arranging each string according to the above sequence leads to an final cluephrase.",
    },
    {
      order: 100.0,
      description:
        "Solvers have the final cluephrase but don’t know how to extract",
      keywords: [
        "the center was always in plain sight read instructions more closely",
      ],
      nudge:
        "The instructions were always in plain sight. Have you noticed that each one has an odd length?",
    },
    {
      order: 100.1,
      description:
        "Solvers have the blacklight cluephrase but don’t know how to extract",
      keywords: ["third quartile"],
      nudge:
        "For a sequence of N objects with a length congruent to 3 modulo 4, the Third Quartile is the [(N+1)/4*3]th object in the sequence.",
    },
  ],
  canned_responses: [
    {
      guess: [
        "THE CENTER WAS ALWAYS IN PLAIN SIGHT READ THE INSTRUCTIONS MORE CLOSELY",
      ],
      reply: "Keep going!",
    },
  ],
};

export default puzzle;
