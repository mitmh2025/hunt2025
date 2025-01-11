import React from "react";
import { styled } from "styled-components";
import LinkedImage from "../../components/LinkedImage";
import { Math, MI, MN, MO, MText } from "../../components/MathML";
import { PuzzleAnswer } from "../../components/StyledUI";
import solution1 from "./assets/solution1.png";
import solution10 from "./assets/solution10.png";
import solution11 from "./assets/solution11.png";
import solution12 from "./assets/solution12.png";
import solution2 from "./assets/solution2.png";
import solution3 from "./assets/solution3.png";
import solution4 from "./assets/solution4.png";
import solution5 from "./assets/solution5.png";
import solution6 from "./assets/solution6.png";
import solution7 from "./assets/solution7.png";
import solution8 from "./assets/solution8.png";
import solution9 from "./assets/solution9.png";

const DATA = [
  [
    ["AMA", "Crowd-sourced interview on Reddit, for short"],
    ["ANY", "No particular one"],
    ["APT", "Well-put"],
    ["APU", "Kwik-E-Mart operator"],
    ["DNA", "Cellular code"],
    ["GEL", "Hair product"],
    ["IDS", "Driver’s licenses, e.g."],
    ["IRE", "Wrath"],
    ["IRS", "Tax org."],
    ["ISS", "Orbiting research hub"],
    ["MAU", "Egyptian ___ (cat breed)"],
    ["NEA", "Teachers’ org."],
    ["NED", "Homer’s neighbor"],
    ["NET", "It’s not gross"],
    ["NIC", "Actor Cage, to friends"],
    ["NIT", "Small quibble"],
    ["NOE", "San Francisco’s ___ Valley"],
    ["NOT", "Type of logic gate"],
    ["NPR", "“Fresh Air” network"],
    ["OAF", "Lout"],
    ["ODA", "___ Mae (Whoopi role)"],
    ["OER", "Poetic contraction"],
    ["OPA", "___-Locka, Florida"],
    ["OPI", "Nail polish brand"],
    ["OST", "Album of movie music (abbr.)"],
    ["PLA", "Popular plastic for 3D printing"],
    ["POR", "___ favor"],
    ["RAE", "Carly ___ Jepsen"],
    ["RPG", "D&D, e.g."],
    ["SRS", "12th graders (abbr.)"],
    ["TAE", "___ kwon do"],
    ["TED", "“Better Off ___” (2000s sitcom)"],
    ["TSE", "Repeated, a fly"],
    ["UNI", "College abroad, briefly"],
    ["YES", "Affirmative response"],
  ],
  [
    ["AERO", "Part of Course 16, for short"],
    ["ANON", "Shortly"],
    ["ASIA", "Largest continent"],
    ["AS IT", "___ were"],
    ["BALD", "Like a worn down tire"],
    ["BONY", "Gaunt"],
    ["BRAN", "Good source of fiber"],
    ["DION", "Singer Celine"],
    ["EKED", "Just managed, with “out”"],
    ["FACE", "Part of a die"],
    ["HIT A", "___ high note"],
    ["ID BE", "“___ delighted!”"],
    ["I LED", "“___ 3 Lives” (1950s TV drama)"],
    ["ILLY", "Poor way for something to bode"],
    ["LACY", "Like a doily"],
    ["LASH", "Eye irritant, potentially"],
    ["MAKE", "Earn"],
    ["MILD", "Bland"],
    ["MILE", "___ marker"],
    ["NOSY", "Like an eavesdropper"],
    ["OBEY", "Do as told"],
    ["ODIN", "Norse god"],
    ["PUMA", "Mountain lion"],
    ["TONY", "Classy"],
    ["UGLY", "Unsightly"],
    ["UNES", "French articles"],
    ["VIED", "Competed (for)"],
  ],
  [
    ["A HOOT", "“I don’t give ___!”"],
    ["EMMET", "The Lego Movie protagonist"],
    ["IGORS", "Discworld servant clan"],
    ["IT A GO", "“Give ___!”"],
    ["NALAS", "The Lion King character and others"],
    ["NAVEL", "Type of orange"],
    ["NESTS", "Makes a home"],
    ["NINER", "San Francisco footballer, for short"],
    ["NOTRE", "___ Dame"],
    ["NOT TO", "“What’s ___ like?”"],
    ["OCEAN", "Vast quantity"],
    ["ORATE", "Speak"],
    ["SHIVA", "Hindu god"],
    ["TABLA", "Indian drum"],
    ["TAMPA", "Florida city"],
    ["TUTTI", "All, in music"],
    ["UNITS", "Number place"],
    ["UNSAY", "Retract"],
    ["UNSEE", "“I wish I could ___ that”"],
    ["URSAE", "Bears in Latin"],
    ["USING", "Taking advantage of"],
  ],
  [
    ["ARAGON", "Neighbor of Catalonia"],
    ["I AGREE", "Clickwrap button title"],
    ["INSETS", "Pictures-in-picture"],
    ["NANTES", "Birthplace of Jules Verne"],
    ["NOT ANY", "Zero"],
    ["TELNET", "Insecure remote login protocol"],
    ["TOYOTA", "Tundra or Highlander"],
    ["UNITED", "One"],
    ["UNSTOP", "Remove a cork from"],
    ["USABLE", "Functional"],
  ],
  [
    ["CARAMBA", "“Ay, ___!”"],
    ["E L FUDGE", "Keebler cookie"],
    ["ELPHABA", "Wicked protagonist"],
    ["HESSIAN", "Square matrix having to do with curvature"],
    ["ISOMERS", "Related molecules"],
    ["LEAP OUT", "Be immediately obvious"],
    ["NISROCH", "Eagle-headed god mentioned in the Bible"],
    ["N Y TIMES", "Publication known for its crosswords, briefly"],
    ["PARFAIT", "Layered treat"],
    ["SAT IN ON", "Audited"],
    ["SMETANA", "Czech opera composer"],
    ["THEATER", "Show venue"],
    ["UNLATCH", "Open, as a gate"],
    ["UPSCALE", "High-end"],
  ],
];

const StyledTable = styled.table`
  margin: 1em 0;
  th,
  td {
    padding-right: 1em;
  }
`;

const Solution = (): JSX.Element => {
  return (
    <>
      <p>
        Solvers are given a list of clues, and a large black and white bitmap
        image.
      </p>
      <p>
        The clues are typical crossword clues, with answers grouped by length
        and sorted alphabetically. The clue answers are as follows:
      </p>
      {DATA.map((clues, i) => (
        <StyledTable key={i}>
          <tr>
            <th>Clue</th>
            <th>Answer</th>
          </tr>
          <React.Fragment key={i}>
            {clues.map(([answer, clue], j) => (
              <tr key={j}>
                <td>{clue}</td>
                <td>{answer}</td>
              </tr>
            ))}
          </React.Fragment>
        </StyledTable>
      ))}
      <p>
        The bitmap image is to be interpreted as a crossword puzzle, with each
        single white pixel being a white square, and each black pixel being a
        black square. It’s a standard American-style crossword, where every
        white square is part of two words of at least three letters. Words can
        go anywhere they fit, based on length and crossing words.
      </p>
      <p>
        When solvers analyze the image, they find it is 3569x3569 pixels. The
        image is composed out of a very small number of different 8x8 tiles
        (seven of them, counting the all-black tile and two tiles that are
        transposes of each other). Actually, the tiles connect together by
        interlocking ever so slightly, so you can think of it as 9x9 shapes on
        an 8x8 grid, and this is why the width and height of the image are one
        more than a multiple of 8.
      </p>
      <p>This image should make it clear how the tiles interlock:</p>
      <img
        src={solution1}
        alt="A zoomed-in crop of the black-and-white bitmap from the puzzle. Three vaguely houndstooth-shaped regions are highlighted, in yellow, blue, and pink respectively."
      />
      <p>
        Meanwhile, at the highest level of scale, we have a 6x6 grid of
        “blocks,” and solvers may determine (e.g. with Photoshop, or a program
        they write) that there are only four different kinds of blocks—differing
        only in very small ways along the right and bottom edge—arranged like
        this:
      </p>
      <LinkedImage
        src={solution2}
        alt="The bitmap from the puzzle, with a 6x6 grid of numbers 1-4 overlaid to indicate which sort of tile is which"
      />
      <p>
        Going back to the lowest level of scale, though (the crossword tiles):
      </p>
      <img
        src={solution1}
        alt="A zoomed-in crop of the black-and-white bitmap from the puzzle. Three vaguely houndstooth-shaped regions are highlighted, in yellow, blue, and pink respectively."
      />
      <p>
        Most tiles have multiple solutions. The tile highlighted in yellow, for
        example, has two solutions:
      </p>
      <LinkedImage
        src={solution3}
        alt="The grid from the yellow highlight in the bitmap, with its two possible solutions shown."
      />
      <p>
        Tiles always connect on the six-letter answers “NOT ANY” (which has a
        specially-marked clue of <strong>Zero</strong>), and “UNITED” (which has
        a clue of <strong>One</strong>). Because “NOT ANY,” “NOT,” “UNITED,” and
        “UNI” are all clued answers, tiles are fillable whether or not they have
        non-black connecting neighbor tiles up, down, left, or right of them.
      </p>
      <p>
        Because the yellow tile has the same answer (“NOT ANY” or “UNITED”) on
        all edges, it acts like a sort of “wire,” or a region that is either
        “all 0” or “all 1,” if we think of the crossword tiles as forming a
        logic circuit.
      </p>
      <p>
        The blue crossword tile represents two crossing wires, each of which may
        carry a 0 or 1 independently, and thus it has four solutions. The tile
        is symmetrical along the diagonal (that is, the same as its row/column
        transpose), and two of its solutions are transposes of each other, while
        the other two are symmetrical.
      </p>
      <LinkedImage
        src={solution4}
        alt="The grid from the blue highlight in the bitmap, with its four possible solutions filled in."
      />
      <p>
        The main other crossword tile of note is the one marked in pink. It’s
        the only one that does some actual “logic.”
      </p>
      <LinkedImage
        src={solution5}
        alt="The grid from the pink highlight in the bitmap, with its four possible solutions filled in."
      />
      <p>Solvers may notice:</p>
      <ul>
        <li>The right edge is the XOR of the top and left edges</li>
        <li>The bottom edge is the AND of the top and left edges</li>
      </ul>
      <p>
        This tile is asymmetrical and occurs in transposed form as well, in
        which case the solution is transposed.
      </p>
      <p>
        This tile is actually meant to represent a “half adder,” which adds two
        bits to get a “sum” bit (the XOR) and a “carry” bit (the AND), but that
        will be more clear in context.
      </p>
      <p>
        The only other tiles have one solution each. One enforces a 0 value
        below and/or to the right, while the other enforces a 1 value above
        and/or to the left:
      </p>
      <LinkedImage
        src={solution6}
        alt="The remaining two partial tiles from the bitmap. Each has its only possible solution filled in."
      />
      <p>
        What remains is to figure out what is going on in each of the 36 blocks.
      </p>
      <p>
        The block seems to contain a 5x5 arrangement of some sort of modules.
        Highlighted in yellow are what appear to be extra wires that don’t fit
        the pattern, which connect to the neighboring blocks. Outlined in
        magenta are the ten places where there is variation between the blocks.
        As noted earlier, there are only four different blocks. Each one has
        something different in the magenta boxes.
      </p>
      <LinkedImage
        src={solution7}
        alt="The bitmap from the puzzle, with some annotations. Some sections of grid are highlighted in yellow. Some others, along the edges, are circled in magenta."
      />
      <p>
        If we zoom in one of the modules in the 5x5, like row 2 column 3, for
        instance:
      </p>
      <img
        src={solution8}
        alt="A block from the grid, shapes highlighted in yellow and red."
      />
      <p>
        Note that everything except the “adder” tiles, shaded in red, is just
        crossing wires, propagating 0 or 1 through the grid.
      </p>
      <p>
        If the square area shaded in yellow is logical 0 (“NOT ANY” on every
        edge of every crossword tile), then the four wires running from left to
        right, and the four wires running from top to bottom, carry their values
        unchanged. Each one adds a 0 to its wire, producing a 0 carry bit, which
        propagates to the next adder.
      </p>
      <p>
        If the yellow square is logical 1, however, something interesting
        happens. If you interpret the four wires as binary numbers, with the
        lowest bit first, the number flowing from left to right (on the four
        horizontal wires) is incremented by 3, while the number flowing from top
        to bottom (on the vertical wires) is incremented by 2. You can work this
        out by starting with the four adders along the left side of the module,
        seeing how they implement “plus 1” by taking a bit from the top and
        propagating the carry bit downwards, and the results to the right. In
        the next column, the “yellow” bit skips the ones place and is added to
        the twos place of the binary number.
      </p>
      <p>Here it is visually:</p>
      <img
        src={solution9}
        alt="The same shape as before, with some symbols annotated around the edges."
      />
      <p>To summarize:</p>
      <ul>
        <li>
          The module at row 2 column3 has 4-bit inputs on the top and left
          (which we are calling{" "}
          <Math>
            <MI>H</MI>
          </Math>{" "}
          and{" "}
          <Math>
            <MI>V</MI>
          </Math>
          ), and 4-bit outputs on the right and bottom.
        </li>
        <li>
          There is a “free bit”{" "}
          <Math>
            <MI>x</MI>
            <MO>=</MO>
            <MN>0</MN>
            <MText>or</MText>
            <MN>1</MN>
          </Math>
          , and the output to the right is{" "}
          <Math>
            <MI>H</MI>
            <MO>+</MO>
            <MN>3</MN>
            <MI>x</MI>
          </Math>
          , while the output at the bottom is{" "}
          <Math>
            <MI>V</MI>
            <MO>+</MO>
            <MN>2</MN>
            <MI>x</MI>.
          </Math>
        </li>
      </ul>
      <p>
        Analyzing the 25 modules in this way, solvers realize that each block
        implements a 5x5 Kakurasu puzzle.
      </p>
      <p>
        In a Kakurasu puzzle, the solver must shade some cells in the puzzle
        such that the shaded cells in a row or column at up to the clued totals,
        where the first cell counts as 1, the second counts as 2, and so on. For
        example, here is an unsolved and a solved Kakurasu puzzle:
      </p>
      <LinkedImage
        src={solution10}
        alt="An unsolved and solved Kakurasu puzzle."
      />
      <p>
        In the first row,{" "}
        <Math>
          <MN>1</MN>
          <MO>+</MO>
          <MN>4</MN>
          <MO>+</MO>
          <MN>5</MN>
          <MO>=</MO>
          <MN>10</MN>
        </Math>
        . In the second row,{" "}
        <Math>
          <MN>2</MN>
          <MO>+</MO>
          <MN>3</MN>
          <MO>+</MO>
          <MN>5</MN>
          <MO>=</MO>
          <MN>10</MN>
        </Math>
        . And so on.
      </p>
      <p>So going back to the top-level 6x6 structure of the puzzle:</p>
      <LinkedImage
        src={solution7}
        alt="The bitmap from the puzzle, with some annotations. Some sections of grid are highlighted in yellow. Some others, along the edges, are circled in magenta."
      />
      <p>
        The magenta areas specify the 10 clues of the block’s Kakurasu puzzle.
        The yellow wires connect certain cells of the Kakurasu to the
        neighboring blocks.
      </p>
      <p>
        The four Kakurasu puzzles have multiple solutions, as follows, with the
        input/output cells highlighted in gold:
      </p>
      <LinkedImage
        src={solution11}
        alt="A bunch of solved Kakurasu puzzles. Some of their cells are highlighted in gold."
      />
      <p>
        Solving the final puzzle of determining which Kakurasu solution to use
        for each block (which is reminiscent of a “pipes” puzzle, where pipes
        with shapes like T and L must be rotated in place so that they are all
        connected), we draw the wires between 6x6 blocks that have a 1 value, to
        get a picture of the answer word, <PuzzleAnswer>FELON</PuzzleAnswer>:
      </p>
      <img src={solution12} alt="The letters FELON, drawn out on a 6x6 grid." />
    </>
  );
};

export default Solution;
