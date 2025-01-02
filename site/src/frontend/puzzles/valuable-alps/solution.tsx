import React from "react";
import { styled } from "styled-components";
import LinkedImage from "../../components/LinkedImage";
import { HScrollTableWrapper, PuzzleAnswer } from "../../components/StyledUI";
import diagram1 from "./assets/diagram1.png";
import diagram2 from "./assets/diagram2.png";
import diagram3 from "./assets/diagram3.png";
import step1 from "./assets/step1.png";
import step2 from "./assets/step2.png";
import step3 from "./assets/step3.png";
import step4 from "./assets/step4.png";
import step5 from "./assets/step5.png";
import { CLUES, VERTEX_ADJACENCY } from "./data";

const StyledTable = styled.table`
  margin: 1em 0;
  border-collapse: collapse;
  th,
  td {
    padding: 0 8px;
    border-bottom: 1px solid black;
  }
`;

const StyledSpan = styled.span`
  background-color: white;
  margin: auto;
`;

const SizedTable = styled(StyledTable)`
  table-layout: fixed;
  td:first-child {
    width: 500px;
  }
  td:last-child {
    width: 200px;
  }
`;

const StyledTd = styled.td<{ $backgroundColor: string }>`
  background-color: ${({ $backgroundColor }) => $backgroundColor};
  text-align: center;
  font-family: "Roboto Mono", monospace;
`;

const Solution = (): JSX.Element => {
  return (
    <>
      <p>
        This puzzle is based on nested Platonic solids, as hinted at in the clue
        for SOLID. There is a regular tetrahedron nested inside a cube, nested
        inside of a regular dodecahedron. The nested aspect is hinted at in the
        clue for AH, which refers to a turducken; a chicken inside of a duck
        inside of a turkey.
      </p>
      <p>
        Each of the faces is labelled with a large letter, and the clues for
        each face are given. The first step is to find the answers to the clues.
        These are given below.
      </p>
      <p>
        Several clues contain hints for how to solve this puzzle, and are shown
        below with their answers highlighted in yellow. The special extraction
        words are shown in green and will be explained later.
      </p>
      <HScrollTableWrapper>
        {CLUES.map((group, i) => (
          <SizedTable key={`group-${i}`}>
            {group.slice(0, 1).map(({ clue }, j) => (
              <tr key={`clue-${i}-${j}`}>
                <td>
                  <strong>{clue}</strong>
                </td>
                <td />
              </tr>
            ))}
            {group.slice(1).map(({ clue, answer, highlight }, j) => (
              <tr key={`clue-${i}-${j + 1}`}>
                <td>{clue}</td>
                <StyledTd $backgroundColor={highlight ?? "transparent"}>
                  {answer}
                </StyledTd>
              </tr>
            ))}
          </SizedTable>
        ))}
      </HScrollTableWrapper>
      <p>
        The answer words for each face form a loop (see clue for LOOP), and are
        entered in a clockwise direction (see clue for VINYL). You must
        determine where each loop starts by aligning with answers for adjacent
        faces. Each cell is really an imaginary sphere (see clue for CELL), and
        the same letter gets entered for both faces that share the sphere’s
        edge, or for several faces when the center of the sphere lands on a
        vertex. By matching up the letters at the vertex spheres, you can align
        the tetrahedron, the cube and the dodecahedron with each other. Because
        the letters match, answers from one face will help you find or confirm
        the answers from adjacent faces.
      </p>
      <p>
        The letters that get entered around the perimeter of each face are shown
        below, as well as arrows showing which edges come together in the 3D
        construction.
      </p>
      <LinkedImage
        src={diagram1}
        alt="An unfolded tetrahedron with letters—the answers to faces A through D above—written around the edges of each triangle. Arrows show which edges are adjacent to each other."
      />
      <LinkedImage
        src={diagram2}
        alt="An unfolded cube with letters—the answers to faces E through J above—written around the edges of each square. Arrows show which edges are adjacent to each other."
      />
      <LinkedImage
        src={diagram3}
        alt="An unfolded dodecahedron with letters—the answers to faces K through V above—written around the edges of each pentagon. Arrows show which edges are adjacent to each other."
      />
      <p>
        To assemble the cutouts, fold along the dashed lines and insert the
        numbered tabs into their corresponding slots. When assembled correctly,
        these cutouts look like this:
      </p>
      <p>1. Base Tetrahedron:</p>
      <LinkedImage
        src={step1}
        alt="A paper tetrahedron, the folded version of the diagram above. Faces A and B are visible."
      />
      <p>2. First wrap layer:</p>
      <LinkedImage
        src={step2}
        alt="A bunch of paper pyramids attached to an unfolded tetrahedron. Faces E, F, and I of the cube are visible, each valley-folded."
      />
      <p>3. First layer wrapped around the base tetrahedron to give a cube:</p>
      <LinkedImage
        src={step3}
        alt="A paper cube, the folded version of the diagram above. Faces F, G, and I are visible."
      />
      <p>4. Second wrap layer:</p>
      <LinkedImage
        src={step4}
        alt="A bunch of paper pyramids attached to an unfolded cube. Faces K, L, P, R, and U of the dodecahedron are visible, each valley-folded."
      />
      <p>5. Second layer wrapped around cube to make the dodecahedron:</p>
      <LinkedImage
        src={step5}
        alt="A paper dodecahedron, the folded version of the diagram above. Faces Q, R, and S are visible."
      />
      <p>
        After constructing the base tetrahedron (image 1), you need to build 4
        triangular pyramids, each having a base that is an equilateral triangle
        which will fit onto the carrier made of 4 triangles (image 2), that can
        then wrap around the tetrahedron to form a cube (image 3).{" "}
      </p>
      <p>
        You can align the cube to the tetrahedron because the letter occupying
        the cells at the touching vertices must match. Now that you have made
        the cube, you need to construct 6 square-based “tents” which will then
        be attached to the 6-square carrier (image 4) that can be wrapped around
        the cube. When fully assembled, this will form a regular dodecahedron,
        with 12 regular pentagon faces (image 5). Just as before, you can align
        the dodecahedron to the cube by matching the letters in the vertex
        cells.
      </p>
      <p>
        The following table shows which vertices of the different solids
        coincide. Vertices are identified by the three faces that meet at that
        vertex. The colors used in the table have also been used in the earlier
        figures to identify the vertices.
      </p>
      <StyledTable>
        <tr>
          <th>Tetrahedron Faces</th>
          <th>Cube Faces</th>
          <th>Dodecahedron Faces</th>
          <th>Letter entered in cell</th>
        </tr>
        {VERTEX_ADJACENCY.map(
          ({ tetrahedron, cube, dodecahedron, letter, color }, i) => (
            <tr key={i}>
              <StyledTd $backgroundColor={i < 4 ? color : "#666666"}>
                <StyledSpan>{tetrahedron}</StyledSpan>
              </StyledTd>
              <StyledTd $backgroundColor={color}>
                <StyledSpan>{cube}</StyledSpan>
              </StyledTd>
              <StyledTd $backgroundColor={color}>
                <StyledSpan>{dodecahedron}</StyledSpan>
              </StyledTd>
              <StyledTd $backgroundColor={color}>
                <StyledSpan>{letter}</StyledSpan>
              </StyledTd>
            </tr>
          ),
        )}
      </StyledTable>
      <p>
        You are told that you need to find pairs of letters, the last of which
        is H (see clue for CEE, and ETA). The clues for EN also hints that the
        hyphenated answers are important. You need to find 8 pairs of answer
        words of the form X-WORD, as hinted at in the title of this puzzle,
        “Cross Dash Word”.
      </p>
      <p>
        There are two A’s (A-ROD and A-TEAM) two B’s (B-BALL and B-GIRL) etc.,
        all the way through H. These special answers have been highlighted in
        green in the earlier table, and filled in green in the earlier figures.
      </p>
      <p>
        You need to find where those two matching letters appear in 3D space
        with the solids assembled, and draw a straight line that passes through
        the center of the corresponding spheres. This is hinted at in the clue
        for ABDOMEN, which says you could use any of the ALL-CAPS objects to
        help you perform the extrapolation… meaning draw a straight line that
        passes through the two A’s and find the third letter that it passes
        through, just like head-thorax-abdomen. These items all look the same, a
        thin straight sharp/pointy object. This is telling you that you could
        use any object that is like that, and poke it through your assembled
        shape such that it passes through both letters. The clue for LASER also
        clues this. If you do that, you will see that the straight line will
        pass through exactly one additional sphere, as hinted at in the clue for
        ONCE. The three spheres are always taken one from each of the Platonic
        solids (see clue for ALL). Taking the extra letters that those 8 lines
        pass through in order from A to H spells{" "}
        <PuzzleAnswer>DEAD BIRD</PuzzleAnswer>, the answer for this puzzle. As a
        confirmation, the clue for AH suggests that when you find this final
        answer, the reference to a <em>turducken</em> will make sense, as each
        of the platonic solids in this puzzle corresponds to a dead bird. Each
        bird is even more dead after being stabbed 8 times.
      </p>
    </>
  );
};

export default Solution;
