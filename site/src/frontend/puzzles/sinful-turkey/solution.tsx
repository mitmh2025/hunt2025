import React from "react";
import { styled } from "styled-components";
import LinkedImage from "../../components/LinkedImage";
import image10 from "./assets/image10.png";
import image11 from "./assets/image11.png";
import image12 from "./assets/image12.png";
import image13 from "./assets/image13.png";
import image14 from "./assets/image14.png";
import image15 from "./assets/image15.png";
import image16 from "./assets/image16.png";
import image9 from "./assets/image9.png";

const Mono = styled.span`
  font-family: monospace;
`;

const FlexWrapper = styled.div`
  display: flex;
  justify-content: space-around;
`;

const SizedImage = styled(LinkedImage)<{ $width: number }>`
  width: ${({ $width }) => $width}px;
`;

const StyledTable = styled.table`
  margin-bottom: 1em;
  th,
  td {
    padding: 1px 8px;
  }
`;

const Solution = (): JSX.Element => {
  return (
    <>
      <p>
        Solvers are presented with a list of 10 instructions. Clued by the
        title, and how all the instructions have an odd length, solvers must
        extract the center letter of each instruction to get the answer. That
        is, from an instruction of length N alphabetic characters, to extract
        the [(N+1)/2]th alphabetic character. This extracts the answer to the
        puzzle,{" "}
        <Mono>
          <strong>FIORE SARDO</strong>
        </Mono>
        .
      </p>
      <p>
        However, that is not the intended solve path. This line of thinking
        neglects the actual content of the instructions, which refer to an
        interactive image of a puzzle box, containing 10 minipuzzles. Solvers
        are expected to read through the instructions and use them to solve the
        puzzle box.
      </p>
      <p>
        The first letter of each instruction spells out <Mono>GLASSONION</Mono>,
        referring to the 2022 mystery film. Quote-searching the puzzle title
        will also lead solvers to a quote from the film, “I like the Glass
        Onion, as a metaphor. An object that seems densely layered, but in
        reality the center is in plain sight.” The film opens with a sequence
        where various characters collaborate to open a puzzle box.
      </p>
      <p>
        This scene is a thematic metaphor for the movie itself, as the puzzle
        box is nothing more than a game that the participants play willingly,
        even though they know what the prize is. They get motivated for solving
        simple recognition-based puzzles, indulging in the facade of
        intelligence, intricacy and credibility, being taken for a ride as the
        puzzles layer over themselves. This scene heavily foreshadows the themes
        of the movie, including the characters’ motivations, perspectives, and
        attitudes towards the puzzle sender. This attitude is heavily juxtaposed
        as one of the puzzle box recipients refuses to play along with the game,
        instead opting to smash the puzzle box in with a hammer.
      </p>
      <p>
        By refusing to play by the rules set out by puzzle conventions, solvers
        have the opportunity to solve the puzzle without solving a single
        minipuzzle, “brute-forcing” the answer. However, since that would go
        against “playing the game”, which is a significant element of puzzle
        hunts in general, solvers are more likely to go along with the game,
        despite the hints suggesting otherwise.
      </p>
      <p>
        The puzzle box on the puzzle page directly references the puzzle box
        from Glass Onion. Solvers are directly told to use the instructions and
        solve the ISIS-style minipuzzles, matching the actions of the characters
        from the film. Each minipuzzle produces a cluephrase answer. In the
        puzzle box scene (and the movie as a whole), the puzzles layer over
        themselves, providing a new context. Solvers may notice that the
        minipuzzles appear peculiarly unconstrained, and how the answer from one
        minipuzzle seems to pertain to the mechanics of a different minipuzzle.
      </p>
      <p>
        Every minipuzzle answer can be interpreted as a cluephrase to a
        different minipuzzle, instructing the solvers to re-solve the puzzles in
        a new manner. Re-solving these puzzles will produce a new series of
        answers. Illustrated below are the solutions for all 10 minipuzzles,
        including the “secret extractions” clued by another minipuzzle’s answer.
      </p>
      <h3>Chess Minipuzzle</h3>
      <p className="puzzle-flavor">
        Glance over the chessboard, and focus on the squares that white pieces
        attack more than black. Then, find the mate in three to deduce what to
        do with those squares (ignore variational mate differences).
      </p>
      <p>
        In chess, a square is controlled by a player if there are more pieces
        belonging to that player defending that square than pieces belonging to
        the opponent attacking that square. The piece occupying the square is
        not included. Mapping out the entire chessboard results in the following
        (yellow marking the squares white strictly controls):
      </p>
      <FlexWrapper>
        <SizedImage
          $width={596}
          src={image9}
          alt="An 8x8 grid of small integers, with some cells highlighted in yellow."
        />
      </FlexWrapper>
      <p>
        From there, solvers must find the mate in three. There are multiple
        variations of this mate, but the key takeaway is that the squares the
        pieces are moved to are invariant:
      </p>
      <ul>
        <li>1.Bf5+ Kc6 2.e8=Q+ Nd7 3.Qxd7</li>
        <li>1.Bf5+ Kc6 2.e8=Q+ Nd7 3.Bxd7</li>
        <li>1.Bf5+ Kc6 2.e8=B+ Nd7 3.Bexd7</li>
        <li>1.Bf5+ Kc6 2.e8=B+ Nd7 3.Bfxd7</li>
      </ul>
      <p>
        The pieces are moved to f5, c6, e8, d7, d7 in that order. Reading the
        letters at those squares spells out ASCII. Therefore, the square control
        pattern must be read as 8-bit ASCII, where the white-controlled squares
        are 1’s and the rest are 0’s, read row-wise. This results in the string
        01010010 01000111 01000010 01101111 01101110 01101100 01111001 01000010,
        which translates to <Mono>RGB ONLY B</Mono>.
      </p>
      <h4>Secret Extraction: Binairo</h4>
      <p>
        The chess puzzle can be re-solved as a Binairo logic puzzle, using the
        pieces as given 1’s (white pieces) and 0’s (black pieces). This leads to
        the following grid:
      </p>
      <FlexWrapper>
        <SizedImage
          $width={596}
          src={image10}
          alt="An 8x8 grid of 1’s and 0’s, with some cells highlighted in yellow."
        />
      </FlexWrapper>
      <p>
        Reading the letters on the 0’s gives the string FUCHSIA BASS CORAL CARP
        SCARLET PERCH, indicating that this is a red herring. Instead, read the
        1’s to produce the string{" "}
        <Mono>
          THE ANSWER TO THE MINIPUZZLE IS <strong>TERWAS</strong>
        </Mono>
        .
      </p>
      <h3>Elements Minipuzzle</h3>
      <p className="puzzle-flavor">
        Label each object with its main element, then identify their
        corresponding atomic number.
      </p>
      <p>
        This minipuzzle consists of 6 objects, each representative of a
        different chemical element. In order, these are:
      </p>
      <ul>
        <li>A semiconductor wafer, mainly composed of Silicon [14].</li>
        <li>
          A gas discharge lamp glowing violet-pink, indicating that it contains
          Argon [18] (not Nitrogen, which looks similar but is more pink).
        </li>
        <li>
          A matchbox, where the striking surface contains red Phosphorus [15].
        </li>
        <li>A party balloon, typically filled with Helium [2].</li>
        <li>
          Toothpaste, which contains Fluoride, the ionic form of Fluorine [9].
        </li>
        <li>
          The Hindenburg, which caught fire due to being filled with Hydrogen
          [1].
        </li>
      </ul>
      <p>
        The numbers below each object range from 1 to 7, using Fluorine twice.
        Ordering the elements’ atomic numbers according to these values results
        in the sequence 2, 9, 14, 1, 9, 18, 15. Translating via A1Z26 spells out
        the answer <Mono>BINAIRO</Mono>.
      </p>
      <h4>
        Secret Extraction: <Mono>INDEX LIBEBEHEHEHE</Mono>
      </h4>
      <p>
        This cluephrase doesn’t seem to make sense, unless you consider the
        second word to be a sequence of chemical symbols. This uniquely forms
        the sequence of elements LI BE BE HE HE HE, which can be transformed
        into the sequence 3, 4, 4, 2, 2, 2 according to the previous mechanic.
        Since there are only 6 numbers to index with, it is implied to use the
        given order of elements, not using the previous ordering that uses
        Fluorine twice. Indexing these numbers into the names of each element
        results in the extraction{" "}
        <Mono>
          <strong>LOSELY</strong>
        </Mono>
        .
      </p>
      <h3>Stereogram Minipuzzle</h3>
      <p className="puzzle-flavor">
        Acknowledge the stereogram encoded in the wood paneling pattern.
      </p>
      <p>
        The center of the puzzle box image contains a stereogram image. Various{" "}
        <a
          href="https://piellardj.github.io/stereogram-solver/"
          target="_blank"
          rel="noreferrer"
        >
          online tools
        </a>{" "}
        are useful for making it easier to visualize. This results in an image
        of a 3x3 grid of squares, with a 6 to the left of the top row, a 4 to
        the left of the middle row, a 5 to the left of the bottom row, a 1 above
        the left column, a 2 beneath the middle column, and a 3 above the right
        column.
      </p>
      <FlexWrapper>
        <SizedImage
          $width={200}
          src={image11}
          alt="A 3x3 grid of black squares, with a 6 to the left of the top row, a 4 to the left of the middle row, a 5 to the left of the bottom row, a 1 above the left column, a 2 beneath the middle column, and a 3 above the right column"
        />
      </FlexWrapper>
      <h4>Secret Extraction: RGB ONLY B</h4>
      <p>
        RGB refers to the color channels composing an image. Viewing only the
        Blue color channel of the stereogram image reveals the answer{" "}
        <Mono>
          <strong>THECEN</strong>
        </Mono>
        .
      </p>
      <FlexWrapper>
        <SizedImage
          $width={400}
          src={image12}
          alt="A wood-grain disc with vertically tiled letters spelling out THECEN"
        />
      </FlexWrapper>
      <h3>Fibonacci Minipuzzle</h3>
      <p className="puzzle-flavor">
        Subtract each integer (take the absolute difference) from its associated
        number from the Fibonacci sequence.
      </p>
      <p>
        The minipuzzle depicts a Fibonacci spiral, where each square contains a
        number. Each square also represents a number in the Fibonacci sequence,
        where the number gives the square’s side length. Starting from the first
        square of side length 1, take the absolute difference of each pair of
        numbers.
      </p>
      <StyledTable>
        <tr>
          <th>Number</th>
          <th>Fibonacci Number</th>
          <th>Absolute Difference</th>
        </tr>
        <tr>
          <td>-3</td>
          <td>1</td>
          <td>4</td>
        </tr>
        <tr>
          <td>13</td>
          <td>1</td>
          <td>12</td>
        </tr>
        <tr>
          <td>23</td>
          <td>2</td>
          <td>21</td>
        </tr>
        <tr>
          <td>21</td>
          <td>3</td>
          <td>18</td>
        </tr>
        <tr>
          <td>23</td>
          <td>5</td>
          <td>18</td>
        </tr>
        <tr>
          <td>29</td>
          <td>8</td>
          <td>21</td>
        </tr>
        <tr>
          <td>1</td>
          <td>13</td>
          <td>12</td>
        </tr>
        <tr>
          <td>33</td>
          <td>21</td>
          <td>12</td>
        </tr>
        <tr>
          <td>22</td>
          <td>34</td>
          <td>12</td>
        </tr>
        <tr>
          <td>34</td>
          <td>55</td>
          <td>21</td>
        </tr>
      </StyledTable>
      <p>
        Translating the difference values via A1Z26 gives the answer{" "}
        <Mono>DLURRULLLU</Mono>.
      </p>
      <h4>
        Secret Extraction:{" "}
        <Mono>
          USE ONLY RED LOOK UP A ONE THREE FIVE SIX SEVEN EIGHT IN ON LINE
          RECORD OF WHOLE NUMBER CHAINS
        </Mono>
      </h4>
      <p>
        Searching up “ON-LINE RECORD OF WHOLE NUMBER CHAINS” or “A135678” will
        point solvers to the On-Line Encyclopedia of Integer Sequences, a
        database of integer sequences indexed with alphanumeric identifiers
        (e.g. the Fibonacci numbers are designated A000045). A135678 designates
        the sequence Floor(n^(4/3)+n), which begins 2, 4, 7, 10, 13, 16… Only
        using the numbers in the red squares, the mechanic can be repeated with
        a new sequence of numbers:
      </p>
      <StyledTable>
        <tr>
          <th>Red Number</th>
          <th>A135678 Number</th>
          <th>Absolute Difference</th>
        </tr>
        <tr>
          <td>-3</td>
          <td>2</td>
          <td>5</td>
        </tr>
        <tr>
          <td>13</td>
          <td>4</td>
          <td>9</td>
        </tr>
        <tr>
          <td>21</td>
          <td>7</td>
          <td>14</td>
        </tr>
        <tr>
          <td>29</td>
          <td>10</td>
          <td>19</td>
        </tr>
        <tr>
          <td>33</td>
          <td>13</td>
          <td>20</td>
        </tr>
        <tr>
          <td>34</td>
          <td>16</td>
          <td>18</td>
        </tr>
      </StyledTable>
      <p>
        Translating the new difference values via A1Z26 gives the answer{" "}
        <Mono>
          <strong>EINSTR</strong>
        </Mono>
        .
      </p>
      <h3>Tic-Tac-Toe Minipuzzle</h3>
      <p className="puzzle-flavor">
        Scrutinize the Tic-Tac-Toe board encoded with Morse.
      </p>
      <p>
        This minipuzzle contains a Tic-Tac-Toe game board next to a telegraph.
        This mechanic is taken directly from the film, where the O’s and X’s
        must be interpreted as dits and dahs in Morse code, respectively. Each
        box below the game board shows an arrow to read the pieces along, each
        producing a string of Morse, reading two dits or two dahs when crossing
        over the squares holding two pieces. Translating the Morse gives the
        answer <Mono>EAST UP FIND CLIMAX USE SEMAPHORE</Mono>.
      </p>
      <h4>
        Secret Extraction: an image of a 3x3 grid of squares, with a 6 to the
        left of the top row, a 4 to the left of the middle row, a 5 to the left
        of the bottom row, a 1 above the left column, a 2 beneath the middle
        column, and a 3 above the right column
      </h4>
      <p>
        The numbers continue the mechanic, instructing to read along or down an
        entire column or row and then translate from Morse. In order, read down
        the left column, up the middle column, down the right column, across the
        middle row, across the bottom row, and across the top row. This
        translates to the answer{" "}
        <Mono>
          <strong>ALWAYS</strong>
        </Mono>
        .
      </p>
      <h3>Constellations Minipuzzle</h3>
      <p className="puzzle-flavor">
        Observe all the constellations, index into their names, and order via
        their corresponding greek letter label.
      </p>
      <p>
        First, all 11 constellations must be identified. To aid this, they are
        given clockwise in alphabetical order. Then, index into the names by the
        given numbers and order them with the given greek letters to produce the
        answer <Mono>SPECTROGRAM</Mono>.
      </p>
      <StyledTable>
        <tr>
          <th>Greek Letter</th>
          <th>Number</th>
          <th>Constellation Name</th>
          <th>Indexed Letter</th>
        </tr>
        <tr>
          <td>α</td>
          <td>3</td>
          <td>Ursa Minor</td>
          <td>S</td>
        </tr>
        <tr>
          <td>β</td>
          <td>1</td>
          <td>Pisces</td>
          <td>P</td>
        </tr>
        <tr>
          <td>γ</td>
          <td>5</td>
          <td>Boötes</td>
          <td>E</td>
        </tr>
        <tr>
          <td>δ</td>
          <td>4</td>
          <td>Hercules</td>
          <td>C</td>
        </tr>
        <tr>
          <td>ε</td>
          <td>1</td>
          <td>Taurus</td>
          <td>T</td>
        </tr>
        <tr>
          <td>ζ</td>
          <td>7</td>
          <td>Centaurus</td>
          <td>R</td>
        </tr>
        <tr>
          <td>η</td>
          <td>2</td>
          <td>Corvus</td>
          <td>O</td>
        </tr>
        <tr>
          <td>θ</td>
          <td>4</td>
          <td>Virgo</td>
          <td>G</td>
        </tr>
        <tr>
          <td>ι</td>
          <td>4</td>
          <td>Libra</td>
          <td>R</td>
        </tr>
        <tr>
          <td>κ</td>
          <td>2</td>
          <td>Cancer</td>
          <td>A</td>
        </tr>
        <tr>
          <td>λ</td>
          <td>5</td>
          <td>Ursa Major</td>
          <td>M</td>
        </tr>
      </StyledTable>
      <p>
        Secret Extraction:{" "}
        <Mono>IGNORE ZODIAC REORDER VIA BAYER STAR R.A.</Mono>
      </p>
      <p>
        The cluephrase refers to a star’s Bayer designation (a greek letter
        identifier for a star within a constellation) and a star’s Right
        Ascension (R.A.). Ignoring the five constellations that appear in the
        Zodiac, reorder the remaining constellations’ extracted letters
        according to the corresponding Bayer star’s right ascension.
      </p>
      <StyledTable>
        <tr>
          <th>Constellation</th>
          <th>Bayer Star</th>
          <th>Star R.A.</th>
          <th>Extracted Letter</th>
        </tr>
        <tr>
          <td>Ursa Minor</td>
          <td>α Ursae Minoris (Polaris)</td>
          <td>02h 31m 47.08s</td>
          <td>S</td>
        </tr>
        <tr>
          <td>Ursa Major</td>
          <td>λ Ursae Majoris (Tania Borealis)</td>
          <td>10h 17m 05.93s</td>
          <td>M</td>
        </tr>
        <tr>
          <td>Corvus</td>
          <td>η Corvi</td>
          <td>12h 32m 04.48s</td>
          <td>O</td>
        </tr>
        <tr>
          <td>Centaurus</td>
          <td>ζ Centauri (Alnair)</td>
          <td>13h 55m 32.43s</td>
          <td>R</td>
        </tr>
        <tr>
          <td>Boötes</td>
          <td>γ Boötis (Seginus)</td>
          <td>14h 32m 04.76s</td>
          <td>E</td>
        </tr>
        <tr>
          <td>Hercules</td>
          <td>δ Herculis</td>
          <td>17h 15m 01.92s</td>
          <td>C</td>
        </tr>
      </StyledTable>
      <p>
        This produces the answer <Mono>SMOREC.</Mono>
      </p>
      <h3>Music Minipuzzle</h3>
      <p className="puzzle-flavor">
        Notice the music layered over itself thematically, then ascertain the
        missing words.
      </p>
      <p>
        This minipuzzle consists of an audio file playing various Beatles songs.
        This minipuzzle is considered thematic, as the song Glass Onion (which
        the film takes its name from) appears in it, as well as Blackbird (which
        is played by a character in the film). Furthermore, the mechanic from
        the film’s musical puzzle is thematically representative of the puzzles
        layering over themselves, which is the main mechanic connecting this
        puzzle’s minipuzzles.
      </p>
      <p>
        Identifying the Beatles songs and the missing lyrics is tricky as there
        are always two songs playing at once, but arranging the missing lyrics
        in order produces the answer{" "}
        <Mono>
          USE ONLY RED LOOK UP A ONE THREE FIVE SIX SEVEN EIGHT IN ON LINE
          RECORD OF WHOLE NUMBER CHAINS
        </Mono>
        .
      </p>
      <StyledTable>
        <tr>
          <th>Song</th>
          <th>Missing Word from Lyrics</th>
        </tr>
        <tr>
          <td>Rock and Roll Music</td>
          <td>…Any old time you USE it…</td>
        </tr>
        <tr>
          <td>Blackbird</td>
          <td>…you were ONLY waiting…</td>
        </tr>
        <tr>
          <td>Yes It Is</td>
          <td>…For RED is the color that my baby wore…</td>
        </tr>
        <tr>
          <td>You Know My Name (Look Up the Number)</td>
          <td>…LOOK up the number…</td>
        </tr>
        <tr>
          <td>I Am The Walrus</td>
          <td>…Climbing UP the Eiffel Tower…</td>
        </tr>
        <tr>
          <td>Glass Onion</td>
          <td>…Looking through A glass onion…</td>
        </tr>
        <tr>
          <td>Yellow Submarine</td>
          <td>…Every ONE of us…</td>
        </tr>
        <tr>
          <td>Come Together</td>
          <td>…He say, “One and one and one is THREE”…</td>
        </tr>
        <tr>
          <td>Taxman</td>
          <td>…Should FIVE percent appear too small…</td>
        </tr>
        <tr>
          <td>Being for the Benefit of Mr. Kite!</td>
          <td>…The band begins at ten to SIX…</td>
        </tr>
        <tr>
          <td>And Your Bird Can Sing</td>
          <td>…You say you’ve seen SEVEN wonders…</td>
        </tr>
        <tr>
          <td>Eight Days A Week</td>
          <td>…EIGHT days a week…</td>
        </tr>
        <tr>
          <td>Yesterday</td>
          <td>…Oh, I believe IN yesterday…</td>
        </tr>
        <tr>
          <td>Hey Jude</td>
          <td>…The movement you need is ON your shoulder.…</td>
        </tr>
        <tr>
          <td>When I’m Sixty-Four</td>
          <td>…Drop me a LINE…</td>
        </tr>
        <tr>
          <td>Roll Over Beethoven</td>
          <td>…It’s a rockin’ little RECORD…</td>
        </tr>
        <tr>
          <td>Let It Be</td>
          <td>…When I find myself in times OF trouble…</td>
        </tr>
        <tr>
          <td>When I Get Home</td>
          <td>…I got a WHOLE lot of things to tell her…</td>
        </tr>
        <tr>
          <td>If I Needed Someone</td>
          <td>…Carve your NUMBER on my wall…</td>
        </tr>
        <tr>
          <td>Chains</td>
          <td>…Whoa, these CHAINS of love…</td>
        </tr>
      </StyledTable>
      <h4>
        Secret Extraction: <Mono>SPECTROGRAM</Mono>
      </h4>
      <p>
        A spectrogram is a visual representation of the frequencies of a signal,
        such as music. By taking the audio file and opening it in a spectrogram
        viewer (such as Audacity or{" "}
        <a
          href="https://academo.org/demos/spectrum-analyzer/"
          target="_blank"
          rel="noreferrer"
        >
          https://academo.org/demos/spectrum-analyzer/
        </a>
        ), the answer{" "}
        <Mono>
          <strong>READTH</strong>
        </Mono>{" "}
        can be found hidden in the upper frequencies of the file.
      </p>
      <FlexWrapper>
        <SizedImage
          $width={1000}
          src={image13}
          alt="A spectrogram in yellow, orange, and purple. The letters READTH are visible at the very top of the image."
        />
      </FlexWrapper>
      <h3>Orientation Minipuzzle</h3>
      <p className="puzzle-flavor">
        Inspect the inscriptions along the edge of the perimeter, then rotate
        them into the correct cardinal orientation.
      </p>
      <p>
        Along the perimeter of the box, there are 8 inscriptions, alternating
        between one 8-letter word and two 4-letter words. Additionally, at the
        center of the box, there are eight 8-letter blanks. These suggest that
        the words along the boundary should match up with the blanks in the
        center, however, the given ordering doesn’t produce a sensical
        extraction. By clicking and dragging the puzzle box, it can be rotated
        about its center. This allows for solvers to align the inscriptions
        along the outer edge of the box with those in the center. Given how each
        of the words along one side of the box all begin with the same letter
        (specifically N, E, S or W), this indicates that each edge of the box is
        associated with a cardinal direction, and each corner of the box is
        associated with an ordinal direction (combining the two 4-letter words
        on each corner). By rotating the puzzle box such that North is pointing
        up (the typical direction for maps), each of the 8 phrases associated
        with each of the 8 directions can fill out each of the 8 blanks.
        Extracting the letters in the blanks in order from 1 to 33 produces the
        answer <Mono>ORDER ODD PRIME RHS INVERT LHS OPERATOR</Mono>.
      </p>
      <h4>
        Secret Extraction: <Mono>EAST UP FIND CLIMAX USE SEMAPHORE</Mono>
      </h4>
      <p>
        Starting with the original orientation of the puzzle, where the side
        associated with East is pointing up, solvers may notice that each of the
        six letters that appear in the word CLIMAX appear only twice across all
        the inscriptions. The cluephrase suggests to translate these letters
        into semaphore depending on the directions of their appearances. For
        example, the letter C only appears in WARD NICE (down-left) and SCUM
        WOLF (down-right), which is N in semaphore. Repeating this process for
        the remaining letters produces the answer{" "}
        <Mono>
          <strong>NSIGHT</strong>
        </Mono>
        .
      </p>
      <h3>Fifteen-Puzzle Minipuzzle</h3>
      <p className="puzzle-flavor">
        Organize the tiles in the fifteen-puzzle, sliding them about to create a
        seamless gradient.
      </p>
      <p>
        While this puzzle can be solved as a valid fifteen-puzzle using a
        simulator, there is nothing stopping solvers from using an image editor
        to manually move around the tiles of the puzzle directly into their
        final arrangement, producing this image:
      </p>
      <FlexWrapper>
        <SizedImage
          $width={600}
          src={image14}
          alt="A 4x4 grid with rainbow colors in a radial gradient. Each grid square has two to six letters in it, and most squares have a thick black line segment as well. The letters outside the line spell out ONLY READ INSIDE SHAPE. The letters inside the line spell out ZODIAC REORDER VIA BAYER STAR R.A."
        />
      </FlexWrapper>
      <p>
        Reading the letters outside the boundary of the shape, left-to-right,
        top-to-bottom spell out <Mono>ONLY READ INSIDE SHAPE</Mono>. Reading the
        letters inside the shape spell out the answer{" "}
        <Mono>IGNORE ZODIAC REORDER VIA BAYER STAR R.A.</Mono>.
      </p>
      <h4>
        Secret Extraction: <Mono>DLURRULLLU</Mono>
      </h4>
      <p>
        The cluephrase is a sequence of 10 letters indicating moves to take on
        the initial fifteen-puzzle board, standing for Up, Down, Left and Right.
        Following these moves produces this image:
      </p>
      <FlexWrapper>
        <SizedImage
          $width={600}
          src={image15}
          alt="A 4x4 grid with rainbow colors, with each square having a different gradient. Each grid square has two to six letters in it, and most squares have a thick black line segment as well. Some of the line segments form a closed loop. The letters inside the loop spell INPLAI."
        />
      </FlexWrapper>
      <p>
        This creates a new shape, where reading along the zig-zag spells out the
        answer{" "}
        <Mono>
          <strong>INPLAI</strong>
        </Mono>
        .
      </p>
      <h3>Abacus Minipuzzle</h3>
      <p className="puzzle-flavor">
        Number the equations according to the RHS, then solve for the correct
        LHS answer in words and assign each one to an abacus rack.
      </p>
      <p>
        Below the abacus are 17 word equations, however none of them are
        correct. Instead, the equations must be ordered according to the right
        hand side (RHS) of each equation, as these numbers range from 1 to 17.
        Then, the left hand side (LHS) of each equation can be solved for the
        correct answer. Once that is done, every answer can be assigned to a row
        of beads in the abacus, where a single bead corresponds to one letter.
        However, there is always one missing bead, corresponding to the gap,
        which is the letter that must be extracted. Reading the missing letters
        out in-order (columnwise) spells out the answer{" "}
        <Mono>INDEX LIBEBEHEHEHE</Mono>.
      </p>
      <FlexWrapper>
        <SizedImage
          $width={800}
          src={image16}
          alt="An abacus with lettered rainbow beads. Some spaces between beads have letters; these letters spell out INDEX LIBEBEHEHEHE."
        />
      </FlexWrapper>
      <h4>
        Secret Extraction: <Mono>ORDER ODD PRIME RHS INVERT LHS OPERATOR</Mono>
      </h4>
      <p>
        Taking only the odd prime RHS numbers (THREE, FIVE, SEVEN, ELEVEN,
        THIRTEEN, SEVENTEEN), and inverting the LHS operation (swap + with –,
        and × with ÷) produces a new series of numbers. Translating these
        numbers with A1Z26 produces the answer{" "}
        <Mono>
          <strong>UCTION</strong>
        </Mono>
        .
      </p>
      <StyledTable>
        <tr>
          <th>RHS Number</th>
          <th>LHS Inverted</th>
          <th>New LHS Answer</th>
          <th>A1Z26 Letter</th>
        </tr>
        <tr>
          <td>THREE</td>
          <td>SIXTY ONE – FORTY</td>
          <td>21</td>
          <td>U</td>
        </tr>
        <tr>
          <td>FIVE</td>
          <td>THIRTY SIX – THIRTY THREE</td>
          <td>3</td>
          <td>C</td>
        </tr>
        <tr>
          <td>SEVEN</td>
          <td>TEN × TWO</td>
          <td>20</td>
          <td>T</td>
        </tr>
        <tr>
          <td>ELEVEN</td>
          <td>TWENTY SEVEN ÷ THREE</td>
          <td>9</td>
          <td>I</td>
        </tr>
        <tr>
          <td>THIRTEEN</td>
          <td>TEN + FIVE</td>
          <td>15</td>
          <td>O</td>
        </tr>
        <tr>
          <td>SEVENTEEN</td>
          <td>TWELVE + TWO</td>
          <td>14</td>
          <td>N</td>
        </tr>
      </StyledTable>
      <hr />
      <p>
        When figuring out the assignment of which minipuzzle cluephrase
        corresponds to which other minipuzzle, solvers may notice that the
        cluephrase assignment order matches with the order of the puzzles in the
        Glass Onion film. In order, that is Stereogram, Chess, Tic-Tac-Toe,
        Fifteen-Puzzle, Orientation, Music, Fibonacci, Constellations, Abacus,
        and Elements.
      </p>
      <p>
        After solving all 10 minipuzzles, solvers may notice that every secret
        extraction is a string of 6 characters. Ordering these strings according
        to the above sequence leads to the answerphrase{" "}
        <Mono>
          THE CENTER WAS ALWAYS IN PLAIN SIGHT READ THE INSTRUCTIONS MORE
          CLOSELY
        </Mono>
        . This tells solvers that the puzzle answer was always located in the
        instructions, leading to the answer. This puzzle too is a metaphor for a
        Glass Onion, “An object that seems densely layered, but in reality the
        center is in plain sight.”
      </p>
      <StyledTable>
        <tr>
          <th>Order</th>
          <th>Puzzle</th>
          <th>Cluephrase</th>
          <th>Cluephrase Puzzle</th>
          <th>Secret Extraction</th>
        </tr>
        <tr>
          <td>1</td>
          <td>Chess</td>
          <td>
            <Mono>RGB only B</Mono>
          </td>
          <td>Stereogram</td>
          <td>
            <Mono>
              <strong>THECEN</strong>
            </Mono>
          </td>
        </tr>
        <tr>
          <td>2</td>
          <td>Elements</td>
          <td>
            <Mono>BINAIRO</Mono>
          </td>
          <td>Chess</td>
          <td>
            <Mono>
              <strong>TERWAS</strong>
            </Mono>
          </td>
        </tr>
        <tr>
          <td>3</td>
          <td>Stereogram</td>
          <td>
            <Mono>an image of a 3x3 grid of squares</Mono>
          </td>
          <td>Tic-Tac-Toe</td>
          <td>
            <Mono>
              <strong>ALWAYS</strong>
            </Mono>
          </td>
        </tr>
        <tr>
          <td>4</td>
          <td>Fibonacci</td>
          <td>
            <Mono>DLURRULLLU</Mono>
          </td>
          <td>Fifteen-Puzzle</td>
          <td>
            <Mono>
              <strong>INPLAI</strong>
            </Mono>
          </td>
        </tr>
        <tr>
          <td>5</td>
          <td>Tic-Tac-Toe</td>
          <td>
            <Mono>EAST UP FIND CLIMAX USE SEMAPHORE</Mono>
          </td>
          <td>Orientation</td>
          <td>
            <Mono>
              <strong>NSIGHT</strong>
            </Mono>
          </td>
        </tr>
        <tr>
          <td>6</td>
          <td>Constellations</td>
          <td>
            <Mono>SPECTROGRAM</Mono>
          </td>
          <td>Music</td>
          <td>
            <Mono>
              <strong>READTH</strong>
            </Mono>
          </td>
        </tr>
        <tr>
          <td>7</td>
          <td>Music</td>
          <td>
            <Mono>
              USE ONLY RED LOOK UP A135678 IN ON LINE RECORD OF WHOLE NUMBER
              CHAINS
            </Mono>
          </td>
          <td>Fibonacci</td>
          <td>
            <Mono>
              <strong>EINSTR</strong>
            </Mono>
          </td>
        </tr>
        <tr>
          <td>8</td>
          <td>Orientation</td>
          <td>
            <Mono>ORDER ODD PRIME RHS INVERT LHS OPERATOR</Mono>
          </td>
          <td>Abacus</td>
          <td>
            <Mono>
              <strong>UCTION</strong>
            </Mono>
          </td>
        </tr>
        <tr>
          <td>9</td>
          <td>Fifteen-Puzzle</td>
          <td>
            <Mono>IGNORE ZODIAC REORDER VIA BAYER STAR R.A.</Mono>
          </td>
          <td>Constellations</td>
          <td>
            <Mono>
              <strong>SMOREC</strong>
            </Mono>
          </td>
        </tr>
        <tr>
          <td>10</td>
          <td>Abacus</td>
          <td>
            <Mono>INDEX LIBEBEHEHEHE</Mono>
          </td>
          <td>Elements</td>
          <td>
            <Mono>
              <strong>LOSELY</strong>
            </Mono>
          </td>
        </tr>
      </StyledTable>
      <p>
        After solving Papa’s Stash, solvers receive new information,{" "}
        <Mono>THE THIRD QUARTILE WAS ALSO ALWAYS IN PLAIN SIGHT</Mono>. This
        suggests that a secondary answer is also hidden in the instructions,
        also indicated by how the instructions don’t just have an odd length,
        but a length congruent to 3 modulo 4, allowing a unique letter to be
        extracted as the [(N+1)*3/4]th alphabetic character. This extracts the
        secondary answer to the puzzle,{" "}
        <Mono>
          <strong>SPARE PARTS</strong>
        </Mono>
        .
      </p>
    </>
  );
};

export default Solution;
