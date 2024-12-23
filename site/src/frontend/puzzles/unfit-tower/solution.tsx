import React from "react";
import { styled } from "styled-components";
import {
  CharacterMessages,
  Characters,
  type Edge,
  rooms,
  startRoom,
} from "./data";

const SolvedGrid = `
814569723
952137648
371248965
695324871
486712359
723856194
569481237
137695482
248973516
`
  .trim()
  .split("\n")
  .map((row) => row.split("").map(Number));

const SolutionTable = styled.table`
  border-collapse: collapse;
  margin-bottom: 1em;
`;
const GridCell = styled.td`
  width: 50px;
  height: 50px;
  font-size: 24px;
  text-align: center;
`;
const GridGiven = styled.span``;
const GridCharacter = styled.span`
  color: #66f;
`;
const GridStart = styled.span`
  font-size: 12px;
`;

const CharacterName = styled.dt`
  font-weight: bold;
`;

const CharacterStatement = styled.dd`
  font-style: italic;
`;

const formatBorder = (edge: Edge) => {
  switch (edge) {
    case "wall":
      return "6px black solid";
    case "door":
      return "6px red solid";
    case "passage":
      return "2px black dashed";
  }
};

const Solution = () => {
  return (
    <>
      <p>
        This is a Sudoku-style logic puzzle disguised as a text adventure, where
        each (irregularly-shaped) region of the Sudoku grid has some additional
        rule.
      </p>

      <p>After exploring the maze, one arrives at the following map:</p>

      <SolutionTable>
        {rooms.map((row, i) => (
          <tr key={i}>
            {row.map((room, j) => {
              const style = {
                borderTop: formatBorder(room.northEdge),
                borderRight: formatBorder(room.eastEdge),
                borderBottom: formatBorder(room.southEdge),
                borderLeft: formatBorder(room.westEdge),
              };
              return (
                <GridCell key={j} style={style}>
                  {room.given !== undefined && (
                    <GridGiven>{room.given}</GridGiven>
                  )}
                  {room.character !== undefined && (
                    <GridCharacter>
                      {(Characters[room.character] ?? "")[0]}.
                    </GridCharacter>
                  )}
                  {room === startRoom && <GridStart>Start</GridStart>}
                </GridCell>
              );
            })}
          </tr>
        ))}
      </SolutionTable>

      <p>
        Doors are in red. The initials in blue stand for the characters present
        in the maze, listed below in the order in which they might be
        encountered:
      </p>

      <dl>
        {Characters.map((character, i) => (
          <>
            <CharacterName>{character}</CharacterName>
            <CharacterStatement>{CharacterMessages[i]}</CharacterStatement>
          </>
        ))}
      </dl>

      <p>One can determine that:</p>

      <ul>
        <li>
          Daniel lies, while Stephanie and Maurice tell the truth. (So this is
          using Sudoku rules)
        </li>
        <li>
          Vladimir is a lier, as the proposed constraint (all perfect squares)
          can’t be satisfied in the top-left region of the grid.
        </li>
        <li>Hence, Patrick tells the truth, and so does Helen.</li>
        <li>
          Thus, there are indeed either 3 or 4 liars, so Jessica tells the
          truth; Annabelle lies; and Caroline tells the truth.
        </li>
      </ul>

      <p>
        In summary, the truth tellers are: Stephanie, Maurice, Patrick, Helen,
        Jessica, and Caroline. The liars are: Daniel, Vladimir, and Annabelle.
      </p>

      <p>
        Our grid must satisfy standard Sudoku rules (i.e. each row, column, and
        region contains the numbers 1-9 uniquely without repeats). Additionally,
        each region satisfies one of the following additional constraints:
      </p>

      <ul>
        <li>
          One region has the same contents as another identically shaped region.
          (Clone)
        </li>

        <li>
          In one of the regions, the largest and smallest digits encountered
          along the shortest path between the only two doors are those right
          next to the doors. (Between)
        </li>

        <li>
          In one of the regions, along the shortest path between the only two
          doors, the digit right next to one door is equal to the sum of all the
          others. (Arrow)
        </li>

        <li>
          In one of the regions, the digits encountered along the shortest path
          between the only two doors are in increasing or decreasing order along
          the path. (Thermo)
        </li>

        <li>
          In one of the regions, any two adjacent rooms (not separated by a wall
          or door) may not contain digits which differ by 1. (Nonconsecutive)
        </li>

        <li>
          In a region whose only door opens to the West, any two adjacent rooms
          (not separated by a wall or door) must contain digits which differ by
          at least 4. (Dutch Whisper)
        </li>

        <li>
          In one of the regions, any two adjacent rooms (not separated by a wall
          or door) must contain digits which differ by a power of 2.
        </li>

        <li>
          In a region whose only door opens to the North, any two adjacent rooms
          (not separated by a wall or door) may not both contain digits that are
          prime numbers.
        </li>

        <li>
          In a region whose only door opens to the East, any two adjacent rooms
          (not separated by a wall or door) must contain digits whose difference
          is 1 or whose ratio is 2. (Kropki)
        </li>
      </ul>

      <p>
        In order to solve the Sudoku, one first identifies the respective
        regions for various rules:
      </p>

      <ul>
        <li>
          The identically shaped cloned regions are those at North (N) and
          Southwest (SW). (NW might be construed as having the same shape if one
          allows rotations, but using it for the cloned pair would lead to
          identical digits within a row or column.)
        </li>

        <li>
          Dutch Whispers is the SE region (one door opening W), the region
          without prime neighbors is the central region (one door opening N),
          and the Kropki region is the SW region (one door opening E).
        </li>

        <li>
          The three regions with only two doors are NE, W, and E. Of those, the
          Arrows region must be E since the paths in the other regions are too
          long. The NE region can’t be Thermo (the 5 in the middle would
          conflict with the clone of the given 5), so must be Between, and W is
          Thermo.
        </li>
      </ul>

      <p>
        (The two remaining rules correspond to the S and NW regions; we don’t
        know yet which is which.)
      </p>

      <p>
        The two most constrained genres are Dutch Whispers and Kropki, so those
        are where we start. (One of these break-in points is hinted at by one of
        the characters, who suggests the possibility of placing some 5’s early
        on; besides the cloned region, the only region where this might be
        feasible is Dutch Whispers. The Kropki region also seems advantageous
        since it gives the cloned region for free.)
      </p>

      <p>
        In the Dutch Whispers region, large (6-9) and small (1-4) clues must
        alternate on a checkerboard pattern, with 5 necessarily at a dead end
        with 1 or 9 as the only neighbor. (In general 5 could also have had both
        1 and 9 as neighbors, but then it must disconnect the region into two
        distinct checkerboard patterns; one easily checks that this can’t happen
        in our grid). For parity reasons (the checkerboard pattern of the other
        8 cells must have 4 cells of each parity to contain 1-4 and 6-9
        respectively), 5 must be in R6C8 or R9C7. But R6C8 must equal R7C3 (by
        standard Irregular Sudoku logic), so can’t contain 5; hence 5 is in
        R9C7.
      </p>

      <p>
        Next we work on the Kropki region (Southwest). Among the many
        constraints imposed by the rule: 1 and 9 must be in dead ends, with 2
        and 8 next to them; and if 7 isn’t next to 8 then it also lies in a
        dead-end with 6 next to it. 2, 3, 4, 6, 8 are the only values that can
        have more than two neighbors, but for 2 and 8 one of these neighbors
        must be a dead-end. And so on. (Drawing a graph of possible adjacencies
        between digits may be helpful.) The contents of the region are in fact
        uniquely determined (cf. the solved grid below) up to possibly swapping
        7 and 9. (We also duplicate those contents into the cloned region.)
      </p>

      <p>
        In the Between region (NE), the extremities are 1 and 9 in either order.
        This can be used to determine the placement of 7 and 9 in the Kropki
        region: if 9 is in R8C3 and R2C6, then the ends of the Between region
        are 1 in R1C6 and 9 in R4C9. By standard Irregular Sudoku logic, the
        latter forces the 9 of row 3 to be in column 3 (impossible) or column 8
        (also impossible as the Dutch Whispers region no longer can contain a
        9). Hence R8C3 and R2C6 are 7, R9C4 and R3C7 are 9.
      </p>

      <p>
        This in turn implies that R9C8 must be 1 rather than 9, thus determining
        which cells in the Dutch Whispers region are small (1-4) and which ones
        are large (6-9), and allowing us to complete the rest of this region
        (keeping in mind that R6C8 = R7C3).
      </p>

      <p>
        Since R4C9 must equal one of R3C3 or R3C8 by Irregular Sudoku logic, it
        can’t be 9; this determines which end point of the Between (NE) region
        is 1 and which is 9. We can now also complete rows 8 and 9 of the grid,
        and place all the remaining 9’s, as well as the 1’s in rows 1 and 3.
      </p>

      <p>
        By standard Irregular logic, R5C6 = R7C7, and the only possibilities are
        1 and 2. Since R5C7, R5C8 and R6C7 sum to 9 (Arrows constraint), R5C6-8
        and R6C7 sum to 10 or 11, hence the set of digits in these cells is 1,
        2, 3, and either 4 or 5. Since 4 and 5 are already placed in column 7,
        R5-7C7 must be 1-3 in some order, and R5C8 is 4 or 5.
      </p>

      <p>
        In the central region (No prime neighbors), the only possible positions
        for 7 are in column 4, and the only possible positions for 3 are in
        columns 3 and 4; since 3 and 7 can’t touch, we place 7 in R5C4 and 3 in
        R6C3. This implies that there are also 3’s in R4C4 and in R5C7.
      </p>

      <p>
        One now checks that the Nonconsecutive region must be the NW region (at
        this point the S region must contain at least one pair of consecutive
        adjacent digits), and its contents can be determined uniquely. The
        Thermo region (W) can be completed next, and from there it is easy to
        finish solving the grid.
      </p>

      <p>Here is the completed grid:</p>

      <SolutionTable>
        {rooms.map((row, i) => (
          <tr key={i}>
            {row.map((room, j) => {
              const style = {
                borderTop: formatBorder(room.northEdge),
                borderRight: formatBorder(room.eastEdge),
                borderBottom: formatBorder(room.southEdge),
                borderLeft: formatBorder(room.westEdge),
              };
              return (
                <GridCell key={j} style={style}>
                  <GridGiven>{(SolvedGrid[i] ?? "")[j]}</GridGiven>
                </GridCell>
              );
            })}
          </tr>
        ))}
      </SolutionTable>

      <p>
        Finally, in order to extract the answer, look at the values where the
        characters are located and use those values to index into each name:
      </p>

      <SolutionTable>
        <thead>
          <tr>
            <th>Character</th>
            <th>Value</th>
            <th>Letter</th>
          </tr>
        </thead>
        <tbody>
          {rooms.flatMap((row, i) =>
            row.map((room, j) => {
              if (room.character === undefined) {
                return null;
              }

              const character = Characters[room.character] ?? "";
              const value = (SolvedGrid[i] ?? [])[j] ?? 1;
              const letter = character[value - 1]?.toUpperCase();
              return (
                <tr key={`${i},${j}`}>
                  <td>{character}</td>
                  <td>{value}</td>
                  <td>
                    <code>{letter}</code>
                  </td>
                </tr>
              );
            }),
          )}
        </tbody>
      </SolutionTable>

      <p>
        This yields <code>RED BUCKET</code>, which is the answer to the puzzle.
      </p>
    </>
  );
};

export default Solution;
