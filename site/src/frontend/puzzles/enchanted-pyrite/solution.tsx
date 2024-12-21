import React from "react";
import styled from "styled-components";
import LinkedImage from "../../components/LinkedImage";
import solution1 from "./assets/solution1.svg";
import solution10 from "./assets/solution10.svg";
import solution2 from "./assets/solution2.svg";
import solution3 from "./assets/solution3.svg";
import solution4 from "./assets/solution4.svg";
import solution5 from "./assets/solution5.svg";
import solution6 from "./assets/solution6.svg";
import solution7 from "./assets/solution7.svg";
import solution8 from "./assets/solution8.svg";
import solution9 from "./assets/solution9.svg";

const Mono = styled.span`
  font-family: monospace;
`;

const SizedImage = styled(LinkedImage)`
  display: block;
  width: 600px;
`;

const ALT_TEXT = "A solved hexagonal sheep-and-wolves slitherlink puzzle.";
const MOVEMENT_ALT_TEXT =
  "The movements of the sheep and the wolves are annotated on the grid with green arrows.";

const Solution = (): JSX.Element => {
  return (
    <>
      <h3>First part: Slitherlink</h3>
      <p>
        Each of the five slitherlink grids (hexagonal, sheep-and-wolves variant)
        can be solved on its own and has a unique solution, as follows:
      </p>
      <p>
        <strong>Day 1</strong>
      </p>
      <SizedImage src={solution1} alt={ALT_TEXT} />
      <p>
        <strong>Day 2</strong>
      </p>
      <SizedImage src={solution2} alt={ALT_TEXT} />
      <p>
        <strong>Day 3</strong>
      </p>
      <SizedImage src={solution3} alt={ALT_TEXT} />
      <p>
        <strong>Day 4</strong>
      </p>
      <SizedImage src={solution4} alt={ALT_TEXT} />
      <p>
        <strong>Day 5</strong>
      </p>
      <SizedImage src={solution5} alt={ALT_TEXT} />
      <h3>Second part: sheep and wolves’ movements</h3>
      <p>
        Next we figure out the movements of the sheep and the wolves from each
        day to the next; this involves comparing the loops for consecutive days.
        In the diagrams below, the slitherlink clues have been deleted and we
        focus only on the movements of the animals that happen while the fence
        is in a given configuration, namely, the movements of the wolves the
        previous night and the movements of the sheep the following night. (The
        area enclosed by the loop on the next day is highlighted in yellow, and
        the history of the wolves’ previous moves is shown in gray.)
      </p>
      <p>
        <strong>Day 1</strong>
      </p>
      <p>
        Sheep movements from day 1 to day 2: there are 17 cells which lie inside
        both day 1 and day 2 loops, and do not contain sheep on day 1. However,
        only 15 of those can be reached at distance ≤ 3 from a sheep’s day 1
        position; those must be the 15 cells to which the sheep move for day 2.
        (Which sheep moves to which cell is not uniquely determined, but isn’t
        relevant.)
      </p>
      <SizedImage src={solution6} alt={`${ALT_TEXT} ${MOVEMENT_ALT_TEXT}`} />
      <p>
        <strong>Day 2</strong>
      </p>
      <p>
        Wolf movements from day 1 to day 2: once the sheep have moved to their
        day 2 positions, each wolf sees a unique closest sheep along one of the
        grid directions, and moves towards it until it hits the day 2 fence, as
        shown on the diagram below.
      </p>
      <SizedImage src={solution7} alt={`${ALT_TEXT} ${MOVEMENT_ALT_TEXT}`} />
      <p>
        Sheep movements from day 2 to day 3: since 12 of the 15 sheep positions
        on day 3 are provided, only the three sheep in the NW quadrant remain to
        be figured out. However there are only three cells which are within both
        day 2 and day 3 loops, can be reached within distance 3 by one of these
        sheep, and are neither occupied by a sheep nor adjacent to a wolf on day
        2.
      </p>
      <p>
        <strong>Day 3</strong>
      </p>
      <p>
        Wolf movements from day 2 to day 3: for most of the wolves, there is a
        single sheep that is closest to them along one of the grid directions,
        and they unambiguously move towards that sheep until hitting the day 3
        fence. The exceptions are:
      </p>
      <ul>
        <li>
          One of the wolves in the SE part of the grid sees two sheep at equal
          distance, to its N and NE; since we know that the wolves’ trajectories
          do not intersect, and another wolf moves to a spot immediately to its
          Northeast, it must have chosen to go North.
        </li>
        <li>
          One of the wolves in the SW part of the grid sees two sheep at equal
          distance, to its NE and SE. Backtracking to the SE would bring it to a
          position that lies inside the day 4 fence, which can’t be the case
          (the wolves are still in their day 3 positions when the day 4 fence is
          built). So the wolf must have chosen to go NE.
        </li>
        <li>
          The wolf in the NW part of the grid sees two sheep at equal distance,
          to its NW and NE. Since we know it was able to move by at least one
          cell, it must have chosen to go NE.
        </li>
      </ul>
      <p>
        Hence, the day 3 positions of the wolves are as in the diagram below:
      </p>
      <SizedImage src={solution8} alt={`${ALT_TEXT} ${MOVEMENT_ALT_TEXT}`} />
      <p>
        Sheep movements from day 3 to day 4: 9 of the 15 sheep positions on day
        4 are provided (shown by stars in the diagram). For the remaining sheep,
        the candidate target cells are those which lie inside both day 3 and day
        4 loops, do not contain a sheep on day 3, and are not adjacent to a wolf
        on day 3. This determines a unique target position for the sheep in the
        4th cell of the 5th column (immediately to its Southeast), bringing our
        total to 10.
      </p>
      <p>
        The five remaining sheep positions can be inferred from the knowledge
        that, after the sheep move to their day 4 positions and the fence has
        switched to the day 4 configuration, each wolf will be able to move
        towards a closest seen sheep without any two wolves’ trajectories
        overlapping. Namely:
      </p>
      <ul>
        <li>
          The wolf in the NW corner (4th cell of 4th column) will be blocked to
          its NE and SE by the day 4 fence, and won’t see a day 4 sheep to its
          N, S, or SW (there are no suitable cells for a sheep to move to along
          those rows), so it will have a sheep to its NW, in the first cell of
          the first column.
        </li>
        <li>
          The wolf in the SE corner (3rd cell from bottom in the 4th column from
          right) won’t be moving NW, SW or S (that would take it into territory
          previously traversed by another wolf), nor N or SE (it is blocked by
          the day 4 fence), so it will have a sheep to its NE, in the 6th cell
          of the last column.
        </li>
        <li>
          The wolf in the SW corner (2nd cell from bottom in the 3rd column)
          will be blocked to its N and NE by the day 4 fence, and won’t see
          sheep to its NW, SW or S, so it will see a sheep to its SE,
          necessarily in the 2nd cell from bottom of the 5th column.
        </li>
        <li>
          The wolf in the NE corner (3rd cell in the 3rd column from right) will
          be blocked in four directions by the day 4 fence, and won’t see sheep
          to its NE. So it will see a sheep to its SW; the only candidate cell
          in that direction is in two cells away from the wolf.
        </li>
        <li>
          Finally, the wolf in the 2nd cell from bottom in the 5th column from
          right won’t be moving N or NE (this would meet the path of another
          wolf), nor SE (blocked by the fence) or S (no sheep in that
          direction), so it goes NW or SW. But in fact, there cannot be any
          sheep to its NW on day 4, as the only candidate cell in that direction
          (in column 2) no longer has any sheep available to move to it (all
          sheep in the western half of the grid are accounted for). So the wolf
          will move to the SW, which means there will be a sheep in the
          bottom-most cell of the 7th column.
        </li>
      </ul>
      <p>
        <strong>Day 4</strong>
      </p>
      <p>
        Wolf movements from day 3 to day 4: this is straightforward for most of
        the wolves. The one exception is the wolf at the bottom center of the
        grid, which has two sheep at distance 3 to its NW and to its N. However,
        that wolf can’t move N (to the fifth cell from bottom in the center
        column) because we know (from the given day 5 grid) that at the end of
        day 4 a sheep chooses to move to a cell adjacent to that position, so
        there can’t be a wolf in that location on day 4. Hence the wolf moves to
        the Northwest.
      </p>
      <SizedImage src={solution9} alt={`${ALT_TEXT} ${MOVEMENT_ALT_TEXT}`} />
      <p>
        Sheep movements from day 4 to day 5: as previously, the candidate target
        cells are those which lie inside both day 4 and day 5 loops, do not
        contain a sheep on day 4, and are not adjacent to a wolf on day 4.
      </p>
      <ul>
        <li>
          The two sheep in the leftmost column have a unique candidate target
          cell they can reach at distance 3.
        </li>
        <li>
          The four sheep in the South/Southwest portion of the grid have exactly
          four candidate target cells they can reach within distance 3 (one of
          which was already given).
        </li>
        <li>
          The two candidate target cells immediately to the northwest of the
          wolf in the next-to-last column cannot be used, as they would become
          the closest sheep seen by that wolf, causing it to attempt to move
          Northwest and be immediately blocked by the fence. We therefore remove
          them from the list of candidate target cells.
        </li>
        <li>
          This leaves only three valid target cells for the three sheep in the
          southeast corner, and only one valid target cell (not adjacent to a
          wolf) for the sheep in the fourth column from right.
        </li>
        <li>
          The sheep in the Northeast corner has only one valid target cell (not
          adjacent to a wolf).
        </li>
        <li>
          At this point, the sheep in the 5th cell of the 5th column from right
          has only one possible remaining target cell left (excluding target
          cells which are adjacent to wolves, already assigned to other sheep,
          or already eliminated from consideration).
        </li>
      </ul>
      <p>
        There are only three sheep remaining to sort out, though one of the
        positions (the second cell of column 5) is given in the day 5 grid, so
        there are only two positions left to find. We identify those by
        considering the manner in which the wolves will have to subsequently
        move:
      </p>
      <ul>
        <li>
          The wolf in the fourth cell of the 9th column will have to move North,
          as it will be blocked by the new fence in all other directions; hence
          there will be a sheep in the topmost cell of column 9.
        </li>
        <li>
          The wolf in the third cell of the central column will therefore have
          to move to the southwest (it can’t have sheep to its N or NW, it is
          blocked to the south by the fence, and moving NE or SE would make it
          overlap the path of the nearby wolf that is moving North). So there
          will be a sheep in the third cell of column 5 (as well as in the
          second cell, as given in the day 5 grid).
        </li>
      </ul>
      <p>
        <strong>Day 5</strong>
      </p>
      <p>
        The wolf movements from day 4 to day 5 are straightforward (keeping in
        mind the constraint that different wolves’ paths cannot overlap), see
        diagram.
      </p>
      <SizedImage src={solution10} alt={`${ALT_TEXT} ${MOVEMENT_ALT_TEXT}`} />
      <p>
        Looking at the paths traced by the movements of the wolves over the 5
        days, and reading “around the clock” (clockwise around the grid,
        starting from the top), as hinted in the puzzle instructions, we read
        the answer:{" "}
        <Mono>
          <strong>SUFFOLK EWES</strong>
        </Mono>
        .
      </p>
    </>
  );
};

export default Solution;
