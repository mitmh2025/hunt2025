import React from "react";
import { styled } from "styled-components";
import LinkedImage from "../../components/LinkedImage";
import {
  HScrollTableWrapper,
  Mono,
  PuzzleAnswer,
} from "../../components/StyledUI";
import img_flat_words from "./assets/solution-flat-words.png";
import img_full_layout from "./assets/solution-full-layout.png";
import img_grid_layout from "./assets/solution-grid-layout.png";
import img_initial_area from "./assets/solution-initial.png";
import img_square from "./assets/solution-square.png";

const CenteredDiv = styled.div`
  width: 100%;
  max-width: 784px;
  display: block;
  margin-left: auto;
  margin-right: auto;
`;

const INITIAL_ALT_DESC_ITEMS = [
  "A red capital letter F",
  "a resistor with a brown and red band and then a black band",
  "a yellow square and wide rectangle representing a .- in Morse code",
  "four green squares in the shape of the Braille letter T",
  "an octagon with two rectangles extending from the top-right and bottom-left edges, representing a semaphore L",
  "five hollow vertical bars, with the first four grey and the fifth blue, representing a binary 1 (for an A)",
  "a square with each edge composed of two blue and two white bars, as if in the outline of the maritime signal flag N, with a small purple square to its bottom-right",
  "and a magenta outline of a horizontally-mirrored C, representing a pigpen-encoded D.",
];

const Solution = () => {
  return (
    <>
      <p>
        Opening the puzzle, solvers will identify that the puzzle consists of a
        thin, horizontal line containing a few colored segments, alongside a set
        of polyominoes, a piece of flavor text repeating the puzzle title, and a
        graphic of what appears to be keyboard keys. After experimenting with
        the puzzle page, solvers will discover that pressing specific keys will
        affect the segments on the page. Pressing A / D will shift all the
        colored segments in one direction, causing new segments to appear.
        Pressing W / S or the up / down arrow keys will cause the segments to
        shrink or dilate and cause new segments to appear around the sides.
        Pressing Q / E or the left / right arrow keys will also shift the
        colored segments in one direction, but holding the keys down longer will
        cause the colored segments to come back into view from the other side.
        Pressing I / J / K / L will cause a similar shifting to occur, but much
        more rapidly and in an idempotent manner. Additionally, there is a red
        and white segment on the right side of the line that remains in place
        but changes scale when some of the keys are pressed.
      </p>

      <p>
        The idea is that the line is a visual representation of Flatland, the
        eponymous world from the short story of the same name, hinted at by the
        puzzle title. Flatland is a 2-dimensional world, containing
        2-dimensional entities that visualize the world in 1-dimension. Pressing
        the WASD or the up / down keys allows the player to traverse this 2D
        space, and pressing Q / E or the left / right arrow keys rotates the 1D
        camera viewing the world. Clued by the 4-point star representing a
        compass rose, pressing IJKL will snap the camera rotation to the
        corresponding orthogonal direction. Solvers must maneuver through
        Flatland with limited visual feedback, identifying the 2D shapes
        represented by the coloured segments. To aid navigation, a 1D compass is
        provided on the right side of the line, where the red segment always
        points to North (the direction the player faces when opening the puzzle
        page), and the white segment points South.
      </p>

      <p>
        The primary challenge of the puzzle is identifying the shapes, utilizing
        the directional and depth shading to spatially view each object. Below
        is a top-down view of the objects immediately surrounding the player’s
        spawn location.
      </p>

      <LinkedImage
        src={img_initial_area}
        alt={`A diagram showing in two rows of four columns each: ${INITIAL_ALT_DESC_ITEMS.join("; ")}`}
      />

      <p>
        Each of these objects is a 2D representation of a well-known cipher or
        representation of letters. Ordered from left-to-right, top-to-bottom,
        these are:
      </p>
      <ol>
        <li>Block letters</li>
        <li>Resistor colors</li>
        <li>Morse</li>
        <li>Braille</li>
        <li>Semaphore</li>
        <li>Binary</li>
        <li>Maritime Flags</li>
        <li>Pigpen</li>
      </ol>

      <p>
        Reading these ciphered letters in order gives <Mono>FLATLAND</Mono>,
        confirming the theming of the puzzle. The reading order of these objects
        also seem to be indicated by rainbow color-order, where an element of
        the cipher is colored in order from red to magenta. Note that all
        ciphers use North as up.
      </p>

      <p>
        Traveling beyond these objects, solvers will locate more objects
        arranged in groups. Each group uses one of the ciphers identified above.
        Within these groups, every object is assigned a unique color. By
        deciphering each letter and arranging them in rainbow color-order, a
        word is produced from each group. Below is a top-down view of the
        entirety of Flatland, and a deciphered version.
      </p>

      <LinkedImage
        src={img_full_layout}
        alt="A full top-down view of the puzzle contents"
      />

      <LinkedImage
        src={img_grid_layout}
        alt="A grid containing letters corresponding to the decoded shapes in the shape of the eight polyminoes presented to solvers"
      />

      <p>
        Each of the words that each object group clues has a commonality: they
        are a synonym of or are associated with a word or phrase with a FLAT
        prefix.
      </p>

      <HScrollTableWrapper>
        <table>
          <thead>
            <tr>
              <th>Cipher</th>
              <th>Word</th>
              <th>FLAT word</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Morse</td>
              <td>COMMEND</td>
              <td>FLAT-TER</td>
            </tr>
            <tr>
              <td>Maritime flags</td>
              <td>CONSPIRACY</td>
              <td>FLAT-EARTH</td>
            </tr>
            <tr>
              <td>Braille</td>
              <td>DISPLAY</td>
              <td>FLAT-SCREEN</td>
            </tr>
            <tr>
              <td>Pigpen</td>
              <td>HAIRCUT</td>
              <td>FLAT-TOP</td>
            </tr>
            <tr>
              <td>Block letters</td>
              <td>LAPSE</td>
              <td>FLAT-LINE</td>
            </tr>
            <tr>
              <td>Semaphore</td>
              <td>OFFICER</td>
              <td>FLAT-FOOT</td>
            </tr>
            <tr>
              <td>Resistor colors</td>
              <td>PRETENSION</td>
              <td>FLAT-ULENCE</td>
            </tr>
            <tr>
              <td>Binary</td>
              <td>SCREWDRIVER</td>
              <td>FLAT-HEAD</td>
            </tr>
          </tbody>
        </table>
      </HScrollTableWrapper>

      <p>
        From here, solvers should note that the arrangements of the cipher
        objects within each group have not been used, only using colors for
        ordering. If solvers reconstruct the arrangements carefully, they will
        notice that there are 64 objects in total (excluding the 8 center
        objects), and that within each group, objects are arranged in a
        grid-like manner and are orthogonally contiguous. These clusters of
        objects match up exactly with the 8 given polyominoes, giving
        confirmation for the mapping of the arrangements, ordered
        alphabetically. After experimenting with these polyominoes, solvers
        should identify that they can arrange them into an 8x8 grid (no
        reflections or rotations required). By arranging the letters of the
        object clusters into this shape, the following arrangement is produced.
      </p>

      <CenteredDiv>
        <LinkedImage
          src={img_square}
          alt="The same 8 polyminoes from earlier, now fit into an 8x8 grid with no gaps"
        />
      </CenteredDiv>

      <p>
        This arrangement produces a wordsearch, where each of the FLAT words can
        be found, missing the FLAT prefixes. The title, repeated in the flavor
        text, clues the extraction, where the substring FLAT in Flatland is
        replaced with a blank space. This suggests to extract the letter that
        replaces the FLAT prefix for each word. The ordering uses the order of
        the ciphers in the confirmation FLATLAND cipher in the center of
        Flatland.
      </p>

      <CenteredDiv>
        <LinkedImage
          src={img_flat_words}
          alt="The same 8x8 grid of letters with assorted strings of letters circled"
        />
      </CenteredDiv>
      <HScrollTableWrapper>
        <table>
          <thead>
            <tr>
              <th>Center letter</th>
              <th>Cipher</th>
              <th>Word</th>
              <th>FLAT word in grid</th>
              <th>Replaced letter</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>F</td>
              <td>Block letters</td>
              <td>LAPSE</td>
              <td>_LINE</td>
              <td>P</td>
            </tr>
            <tr>
              <td>L</td>
              <td>Resistor color</td>
              <td>PRETENSION</td>
              <td>_ULENCE</td>
              <td>A</td>
            </tr>
            <tr>
              <td>A</td>
              <td>Morse</td>
              <td>COMMEND</td>
              <td>_TER</td>
              <td>L</td>
            </tr>
            <tr>
              <td>T</td>
              <td>Braille</td>
              <td>DISPLAY</td>
              <td>_SCREEN</td>
              <td>I</td>
            </tr>
            <tr>
              <td>L</td>
              <td>Semaphore</td>
              <td>OFFICER</td>
              <td>_FOOT</td>
              <td>S</td>
            </tr>
            <tr>
              <td>A</td>
              <td>Binary</td>
              <td>SCREWDRIVER</td>
              <td>_HEAD</td>
              <td>A</td>
            </tr>
            <tr>
              <td>N</td>
              <td>Maritime flags</td>
              <td>CONSPIRACY</td>
              <td>_EARTH</td>
              <td>D</td>
            </tr>
            <tr>
              <td>D</td>
              <td>Pigpen</td>
              <td>HAIRCUT</td>
              <td>_TOP</td>
              <td>E</td>
            </tr>
          </tbody>
        </table>
      </HScrollTableWrapper>

      <p>
        The answer to the puzzle is <PuzzleAnswer>PALISADE</PuzzleAnswer>.
      </p>
    </>
  );
};

export default Solution;
