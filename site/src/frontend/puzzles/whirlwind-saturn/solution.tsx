import React from "react";
import { styled } from "styled-components";
import LinkedImage from "../../components/LinkedImage";
import { HScrollTableWrapper, Mono } from "../../components/StyledUI";
import nurikabe from "./assets/nurikabe-solved.png";
import nurikabeWithLetters from "./assets/nurikabe-with-letters.png";
import walkthrough1 from "./assets/walkthrough1.png";
import walkthrough10 from "./assets/walkthrough10.png";
import walkthrough11 from "./assets/walkthrough11.png";
import walkthrough2 from "./assets/walkthrough2.png";
import walkthrough3 from "./assets/walkthrough3.png";
import walkthrough4 from "./assets/walkthrough4.png";
import walkthrough5 from "./assets/walkthrough5.png";
import walkthrough6 from "./assets/walkthrough6.png";
import walkthrough7 from "./assets/walkthrough7.png";
import walkthrough8 from "./assets/walkthrough8.png";
import walkthrough9 from "./assets/walkthrough9.png";

const SolutionTable = styled.table`
  border-collapse: collapse;

  & th,
  & td {
    padding: 0.5rem;
    border: 1px solid black;
  }
`;

const SizedImage = styled(LinkedImage)`
  & img {
    max-width: 400px;
  }
`;

const SolutionData: [url: string, island: string, letter: string][] = [
  ["https://en.wikipedia.org/wiki/Bacalao_(phantom_island)", "(B)ACALAO", "B"],
  ["https://en.wikipedia.org/wiki/Mayda", "M(A)YDA", "A"],
  ["https://en.wikipedia.org/wiki/Atlantis", "A(T)LANTIS", "T"],
  ["https://en.wikipedia.org/wiki/Hyperborea", "(H)YPERBOREA", "H"],
  ["https://en.wikipedia.org/wiki/Brasil_(mythical_island)", "(B)RASIL", "B"],
  ["https://en.wikipedia.org/wiki/Royllo", "(R)OYLLO", "R"],
  ["https://en.wikipedia.org/wiki/Frisland", "FR(I)SLAND", "I"],
  ["https://en.wikipedia.org/wiki/Groclant", "GRO(C)LANT", "C"],
  ["https://en.wikipedia.org/wiki/Kantia", "(K)ANTIA", "K"],
];

const Solution = () => {
  return (
    <>
      <p>
        Solvers are presented with a grid of letters and numbers as well as
        flavortext that asks them to solve the{" "}
        <em>puzzle of islands in the stream</em>. This refers to{" "}
        <a href="https://en.wikipedia.org/wiki/Nurikabe_(puzzle)">Nurikabe</a>,
        the logic puzzle that is also called “Islands in the stream.” It
        involves dividing the grid into connected groups of islands (with the
        number denoting its size) and a single other connected group that forms
        the stream, with no 2x2 squares. By ignoring the letters and using the
        numbers as Nurikabe clues, we can solve the logic puzzle. On solving the
        Nurikabe puzzle (one potential solve path is reproduced below), the
        following islands are obtained:
      </p>

      <SizedImage src={nurikabe} alt="Solved Nurikabe puzzle" />

      <p>
        On adding back the letters and only keeping the “islands”, we get the
        following:
      </p>

      <SizedImage
        src={nurikabeWithLetters}
        alt="Nurikabe puzzle with letters added"
      />

      <p>
        The letters of each island, when taken in reading order, seem to spell
        out a word. Solvers must then make the connection to phantom islands
        (also clued by the “unreal islands” title and the ghost shape of the
        grid), islands that were at some point thought to exist but were later
        discovered to not.
      </p>

      <p>
        Each word in the islands is the name of a phantom island but is missing
        one letter that has been replaced with the number. The “missing”
        letters, taken in reading order, spell out the answer:{" "}
        <code>BATH BRICK</code>.
      </p>

      <HScrollTableWrapper>
        <SolutionTable>
          <thead>
            <tr>
              <th>Phantom Island</th>
              <th>Letter</th>
            </tr>
          </thead>
          <tbody>
            {SolutionData.map(([url, island, letter]) => (
              <tr key={island}>
                <td>
                  <a href={url}>{island}</a>
                </td>
                <td>
                  <Mono>{letter}</Mono>
                </td>
              </tr>
            ))}
          </tbody>
        </SolutionTable>
      </HScrollTableWrapper>

      <h3>Full Solve Path</h3>

      <ol>
        <li>
          <p>
            Surround all the 1’s and separate all the other given islands with
            streams. This also allows filling in several squares with streams in
            the upper right to prevent an orphaned stream:
          </p>
          <p>
            <SizedImage
              src={walkthrough1}
              alt="A partially complete Nurikabe puzzle"
            />
          </p>
        </li>

        <li>
          <p>
            The 7 and 10 islands have only one direction to go in since islands
            must be contiguous. If the 10 island extends down the stream part to
            its left must also extend down so it is not orphaned, then connect
            to the rest of the stream to the left, as otherwise it would cut off
            the 10 or form a pool to the right of the 6. Additionally, we can
            identify two squares as part of the 10 island since if they were
            water there would not be room for the 10 island:
          </p>

          <p>
            <SizedImage
              src={walkthrough2}
              alt="A partially complete Nurikabe puzzle"
            />
          </p>
        </li>

        <li>
          <p>
            The top three squares next to Inky’s eye cannot be islands unless
            they are part of the 6 below, which would require the stream to
            block off the 5 island without suffifcient space. Since the stream
            cannot go up, it must connect in the other direction, and the square
            directly above the 6 island is also water. Also, the stream must
            extend into the region below the ghost’s mouth, and the connection
            to the left of the mouth is the only way to get there without
            leaving insufficient space for the 10 island on the right:
          </p>

          <p>
            <SizedImage
              src={walkthrough3}
              alt="A partially complete Nurikabe puzzle"
            />
          </p>
        </li>

        <li>
          <p>
            The “tube” to the left of the eye must connect to the stream from
            below. Connecting by going on the other side of the 6 island would
            leave insufficient room for that island. Also, the water under the
            other eye must connect to the rest of the stream, and cannot connect
            around the right side of the mouth:
          </p>

          <p>
            <SizedImage
              src={walkthrough4}
              alt="A partially complete Nurikabe puzzle"
            />
          </p>
        </li>

        <li>
          <p>
            There must be a path for water to reach the bottom-right region, and
            it cannot be around the right side of the mouth, so it must go past
            the top of the bottom right 8 island. If the stream extended another
            square left, the water would either be trapped or form a pool, so
            that square must be part of the closer 8 island (the farther would
            cause the stream not to connect). The stream and islands must be
            contiguous so this determines several more squares:
          </p>

          <p>
            <SizedImage
              src={walkthrough5}
              alt="A partially complete Nurikabe puzzle"
            />
          </p>
        </li>

        <li>
          <p>
            If the square below the bottom right 6 or the square below and to
            the left of the bottrom right 8 were water, they would create pools,
            so they must be part of islands. The square under the 8 must also be
            island since it would be orphaned:
          </p>

          <p>
            <SizedImage
              src={walkthrough6}
              alt="A partially complete Nurikabe puzzle"
            />
          </p>
        </li>

        <li>
          <p>
            The water in the upper right must exit that part from the current
            row, and not the one above, to leave space for the 7 island. To
            avoid a pool, the 7 island must extend across the top, since the 8
            island would leave insufficient space for the 7. The stream must be
            continuous (and must separate islands) so it can be extended 1
            square past the 8, and the 8 island can only be extended to the
            left.
          </p>
          <p>
            The square two to the left of the top 8 island must be water, since
            the 7 does not have enough area left to reach it and being part of
            the 8 island would cause the stream to be blocked. Similarly, the
            square above it must be water since if it were part of the 5 island
            the stream would be blocked:
          </p>

          <p>
            <SizedImage
              src={walkthrough7}
              alt="A partially complete Nurikabe puzzle"
            />
          </p>
        </li>

        <li>
          <p>
            The square down and to the right of the 5 must be part of the 5
            island to prevent a pool, forcing the 5 island’s shape and allowing
            us to fill in the stream below it. The stream to the right of the 5
            must extend right, and the next square to the right must be island
            to prevent a pool, completing the 7 island.
          </p>

          <p>
            We can also extend the top 8 island and the stream further down the
            middle. The 8 island can’t extend any further down in this column
            since that would block the stream from the right side, and since
            there is only one empty space to the right the island must extend to
            the left and then down to prevent blocking off the stream. Further,
            the 8 cannot block the stream on the right so its full shape is
            forced:
          </p>

          <p>
            <SizedImage
              src={walkthrough8}
              alt="A partially complete Nurikabe puzzle"
            />
          </p>
        </li>

        <li>
          <p>
            The 6 island must leave space for the 10 island, so its position is
            set and the 10 can extend through the right side. It must be
            separated from the 6 island below it and that stream must connect to
            the rest of the water, forcing the last two squares of the 10
            island.
          </p>

          <p>
            The stream must connect, which forces the placement of the bottom
            right 6 island, and the 8 island must extend to the right to prevent
            a pool:
          </p>

          <p>
            <SizedImage
              src={walkthrough9}
              alt="A partially complete Nurikabe puzzle"
            />
          </p>
        </li>

        <li>
          <p>
            The 6 island on the left is needed to prevent a pool in the middle,
            so it must extend to its right and the stream must connect above it.
            This forces placement of the 6 island.
          </p>

          <p>
            If the stream were to go under the bottom left 8 island, it would
            form a pool, so it must connect above it. The square immediately
            above and to the right of the 8 must be part of the 8 island to
            avoid a pool, as must the square immediately below it (and the one
            to its right). The two squares directly to the right of the bottom
            left 8 island also must be part of the island, since the bottom
            middle 8 island only has 2 squares left to set and cannot prevent
            pools in that area. Finally, the square immediately above the 8 must
            be part of its island to prevent a pool:
          </p>

          <p>
            <SizedImage
              src={walkthrough10}
              alt="A partially complete Nurikabe puzzle"
            />
          </p>
        </li>

        <li>
          <p>
            In order to prevent a pool, the bottom left 8 island must extend to
            the right (if the bottom middle 8 island prevented the pool it would
            block the stream). This island is complete and the stream can
            surround it.
          </p>

          <p>
            Now the bottom middle 8 island last square can be filled in to
            prevent a pool, and the remaining streams can be filled in too:
          </p>

          <p>
            <SizedImage
              src={walkthrough11}
              alt="A partially complete Nurikabe puzzle"
            />
          </p>
        </li>
      </ol>
    </>
  );
};

export default Solution;
