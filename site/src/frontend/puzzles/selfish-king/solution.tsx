import React from "react";
import { styled } from "styled-components";
import LinkedImage from "../../components/LinkedImage";
import { PuzzleAnswer } from "../../components/StyledUI";
import day1solved from "./assets/day1-solved.svg";
import day2solved from "./assets/day2-solved.svg";
import day3solved from "./assets/day3-solved.svg";
import day4solved from "./assets/day4-solved.svg";
import day5solved from "./assets/day5-solved.svg";
import extraction from "./assets/extraction.svg";

const ImageWrapper = styled.div`
  margin-bottom: 1em;
`;

const ExtractionWrapper = styled.div`
  width: 150px;
`;

const Solution = (): JSX.Element => {
  return (
    <>
      <p>
        The appearance of certain letters in the p.m. grids (E on day 3, T on
        day 4, a third R on day 5) forces certain ships to have disappeared in
        the vortex zone and reappeared the next day: the length 3 ship ERS on
        day 2, a ship containing a T on day 3, and a ship containing an R on day
        4. With these constraints in mind, the pairs of battleship grids
        (A.M./P.M. for each day) can be solved uniquely (and one finds that no
        other ships jumped to the next day).
      </p>
      <p>
        Solving the grids mostly involves usual battleship logic (different
        ships can’t touch, so the rows with large clued numbers are the most
        constrained), keeping in mind that the grayed area is invisible. The
        a.m./p.m. grids for each day should be considered together as a single
        puzzle, given the constraint that every ship moves straight (by a
        distance equal to its length) from one grid to the other (except for
        ships that disappear into the vortex and jump to the next day). In
        particular, the morning and evening positions of a length 1 ship are
        adjacent to each other.
      </p>
      <p>
        Another important constraint concerns the ships that jump from one day
        to the next: since their path takes them entirely into the vortex area,
        and the ship reappears entirely within the vortex area and continues to
        move forward to travel a total distance equal to its length, ship
        segments that are outside the vortex on the morning of day N must lie
        inside the vortex on the evening of day (N+1); and conversely, ship
        segments that are outside the vortex on the evening of day (N+1) must be
        inside the vortex on the morning of day N. (The ship doesn’t travel far
        enough in total for a segment to enter the vortex on day N and exit on
        day (N+1)).
      </p>
      <ImageWrapper>
        <LinkedImage
          src={day1solved}
          alt="Two solved, triangular Battleship puzzles with a darker triangle in the center"
        />
      </ImageWrapper>
      <p>
        After crossing out the cells seen by the 0 clues, there is only one way
        to place the occupied cells along the diagonal pointed at by the “4”
        clue at right (and since there are no ships of length greater than 3,
        the gray cell remains empty). Since ships can’t touch, the position of
        the F in the diagonal just above is uniquely determined; this gives us
        the length 2 ship FO.
      </p>
      <p>
        The length 3 ship we have placed in the morning grid must travel East;
        we place it in the afternoon grid. The FO ship must then travel NW
        (otherwise it would touch the length 3 ship).
      </p>
      <p>
        Now there is only one way to simultaneously satisfy the two “3” clues to
        the left of the p.m. grid: the cell just to the right of the vortex is
        occupied, and so are the cells pointed at in the first and third columns
        from left, while those in the second column remain empty. Given the clue
        “2” at the top of the grid, we have just placed the length 2 ship
        labeled XX. Since the length 2 ships have now been accounted for, the
        cells in the third column are part of the other length 3 ship.
      </p>
      <p>
        The A clue in the a.m. grid must be part of the SEA ship, which is
        therefore the ship traveling in the third column from left. We place A
        in the a.m. grid, and since it must lie 3 cells away in the p.m. grid,
        we can place the SEA ship in both grids.
      </p>
      <p>
        Since all other ships are accounted for, the clues “1” and “3” below the
        p.m. grid must see all the length 1 ships (and we know that no ships
        disappeared on Day 1). The E ship can be placed immediately. Since
        length 1 ships only travel by a distance of 1 and the lower-right
        portion of the a.m. grid is unavailable, the last two ships must lie in
        the upper part of the grid. There is only one possible position for the
        ship pointed at by the “1” clue; it must be the R ship. The last
        remaining length 1 ship (C) is then uniquely placed in the p.m. grid.
      </p>
      <p>
        Next, we place XX and the length 1 ships in the a.m. grid. Recall that
        the morning positions of the length 1 ships are adjacent to their
        evening positions. The R ship can be placed first (thanks to the “R”
        clue at the top of the grid); this then forces the positions of the
        other ships.
      </p>
      <p>
        Last but not least, we place the letters in the length 3 ship RCH, with
        the R top-most due to the “R” clue at the left of the a.m. grid.
      </p>
      <ImageWrapper>
        <LinkedImage
          src={day2solved}
          alt="Two solved, triangular Battleship puzzles with a darker triangle in the center"
        />
      </ImageWrapper>
      <p>
        As noted above, the length 3 ship ERS must disappear, to reappear in the
        day 3 p.m. grid. Since the E lies outside of the vortex on day 3 p.m.,
        it must be inside the vortex on day 2 a.m.
      </p>
      <p>
        We start by crossing out the cells pointed at by “0” clues, and examine
        the “4” clue below the a.m. grid. This can’t consist of two ships of
        length 2 (they would run into each other and overlap in the evening
        grid), so there is a length 3 ship and an isolated ship segment. Since
        the length 3 ship must be able to move by three cells without hitting
        the grid boundary, it must be in the top-most 3 cells; and it must be
        the LOS ship (with L at the bottom, given the “L” clue at the top-right
        of the grid). We also place this ship (moved by 3 cells to the SE) in
        the p.m. grid.
      </p>
      <p>
        The ship segment seen by the “S” clue below the a.m. grid can be placed
        uniquely; this gives us the SS ship in the a.m. grid, and also in the
        p.m. grid (it must travel West, not East, to avoid touching the LOS
        ship).
      </p>
      <p>
        We can determine which cells are occupied among those pointed at by the
        “1” and “3” clues to the left of the a.m. grid; it follows that the only
        occupied cell pointed at by the “1” clue to the right of the grid is the
        top-most one along that diagonal.
      </p>
      <p>
        The M at the far right of the p.m. grid must be part of the MI ship;
        looking at possibilities in the a.m. grid, it must have traveled SE from
        rows 4-5 from bottom to rows 2-3 from bottom, and we can place it in
        both grids.
      </p>
      <p>
        We can place one of the length 1 ships in the bottom-left-most cell of
        the p.m. grid, and just above it in the a.m. grid. We can also identify
        the two occupied cells pointed at by the “2” clue below the p.m. grid;
        these are the remaining length 1 ships, since all other ships are
        accounted for (remember ERS must have disappeared).
      </p>
      <p>
        The positions of the length 1 ships in the a.m. grid are then determined
        uniquely, taking into account the “I” clue at the top.
      </p>
      <p>
        Finally, the last unaccounted-for ship segment at the right edge of the
        vortex in the a.m. grid must be part of the disappearing ship ERS; that
        ship must be facing West, with the E inside the vortex as noted
        previously.
      </p>
      <ImageWrapper>
        <LinkedImage
          src={day3solved}
          alt="Two solved, triangular Battleship puzzles with a darker triangle in the center"
        />
      </ImageWrapper>
      <p>
        As noted previously, the ERS ship from day 2 must appear in the p.m.
        grid, while a ship containing the letter T must disappear to reappear on
        day 4. In fact, this must be the FIT ship: the one-letter T ship doesn’t
        travel far enough to be in a position that isn’t immediately adjacent to
        the vortex on day 4, and the NOT ship must be present on day 3 p.m.
        since there is an N clue.
      </p>
      <p>
        The occupied cells seen by the “4” clue to the right of the a.m. grid
        can be determined uniquely; we can then place the T segment in the
        diagonal just below, as well as the occupied cells pointed at by the “4”
        and “2” clues at the bottom of the grid.
      </p>
      <p>
        The length 3 ship already placed must be the NOT ship, while the two
        segments placed in the sixth row of the a.m. grid must be a length 2
        ship (since the FIT ship must enter the vortex and these ships won’t).
        We can also place these two ships in the p.m. grid, and the “N” clue
        determines the orientation of the NOT ship.
      </p>
      <p>
        The “E” clue in the p.m. grid must be part of the ERS ship from day 2;
        since the S segment must lie within the vortex (it was outside on day
        2), the E segment is at most two cells away from the vortex. This allows
        us to place the ERS ship uniquely.
      </p>
      <p>
        The ship segment to the Northeast of the NOT ship in the a.m. grid can’t
        be a length 1 ship (it would end up touching NOT in the p.m. grid), so
        it is part of a length 2 ship. The “D” clue in the p.m. grid
        (necessarily part of the RD ship) then forces this ship to be the RD
        ship and to be traveling Northwest.
      </p>
      <p>
        The F clue in the p.m. grid now gives the orientation of the FO ship,
        while the Y clue forces the 1-cell Y ship to be in one of the first two
        cells of the 7th row from top. Since all other ships are accounted for
        in the p.m. grid, the U and T 1-cell ships must be pointed at by the “3”
        clue.
      </p>
      <p>
        The T segment in the lower-right part of the a.m. grid must be the
        1-cell T ship; its position in the p.m. grid is also uniquely determined
        since it is seen by the “3” clue.
      </p>
      <p>
        In the a.m. grid, the “F” clue must point to the F of the FIT ship;
        since the T is not immediately next to the vortex on day 4 p.m., the I
        must also be outside of the vortex on day 4, hence it must be inside the
        vortex on day 3 a.m., so the F segment must be immediately next to the
        vortex. This determines the position of the FIT ship uniquely.
      </p>
      <p>
        Finally, the two unattributed ship segments placed in the a.m. grid must
        be the U and Y 1-cell ships, with Y at top-left given its position in
        the p.m. grid, and U below the vortex. Their positions in the p.m. grid
        are now determined uniquely given that Y is pointed at by the “Y” clue
        and U is pointed at by the “3” clue.
      </p>
      <ImageWrapper>
        <LinkedImage
          src={day4solved}
          alt="Two solved, triangular Battleship puzzles with a darker triangle in the center"
        />
      </ImageWrapper>
      <p>
        As noted previously, the FIT ship from day 3 must appear in the p.m.
        grid, while a ship containing R (either PAR or the 1-cell ship R) must
        disappear to reappear on day 5.
      </p>
      <p>
        The occupied cells (outside of the vortex) pointed at by the “4” clue
        below the a.m. grid can be determined uniquely; since this includes the
        one segment seen by the “1” clue at the left, we can also determine the
        occupied cells pointed at by the “4” clue at the upper-right, and two of
        the three occupied cells for the “3” clue. These altogether account for
        all the ships of length ≥2 in the a.m. grid.
      </p>
      <p>
        Since a ship containing the letter R disappears through the vortex, the
        two R clues in the p.m. grid determine the location of the one remaining
        R letter. Since it does not lie along any of the possible paths of the
        length ≥2 ships from the a.m. grid, it must be the 1-cell R ship, and it
        is the 3-cell PAR ship that disappears to reappear on day 5.
      </p>
      <p>
        Given this, the length 3 ship along the bottom edge must be DIS (with
        the D in the right-most position); the ‘0’ clue in the p.m. grid
        indicates that it travels to the West. The “S” clue and the two “E”’
        clues in the p.m. grid indicate that the length 2 ships US and EN remain
        at least partially visible in the p.m. grid; thus, neither of them can
        account for the two ship segments placed left of the vortex in the a.m.
        grid; rather, those are the P and A segments of the disappearing PAR
        ship (the R segment must be inside the vortex since it is visible on day
        5).{" "}
      </p>
      <p>
        By elimination, the two length 2 ships (US and EN) lie just outside of
        the vortex in the columns clued “4” and “3” of the a.m. grid; and the
        final occupied cell pointed at by the “3” clue must be the one adjacent
        to the vortex (since otherwise that ship would be invisible in the p.m.
        grid).
      </p>
      <p>
        The position of the E clues in the p.m. grid implies that the EN ship is
        below the vortex in the morning grid, and traveling East; while the S
        clue tells us that the US ship (which lies right of the vortex) is
        traveling to the Northwest.
      </p>
      <p>
        In the p.m. grid, the F cell of the FIT ship, which was visible on day 3
        a.m., must be inside the vortex, while the T is seen by the “T” clue.
        Thus, the F must be in the lower-left-most cell of the vortex, with the
        I and T to its left so as to not touch the DIS ship.
      </p>
      <p>
        There remains to place the three ships of length 1. One of them has
        already been located in the a.m. grid (the final cell of the column with
        the “4” clue). In the p.m. grid, the R ship has already been placed, and
        the two others can be placed in the column clued “3” in the lower-right
        corner of the grid (the lowermost one being E to satisfy the “E” clue
        below the grid). We can then determine the position of these ships in
        the a.m. grid as well.
      </p>
      <ImageWrapper>
        <LinkedImage
          src={day5solved}
          alt="Two solved, triangular Battleship puzzles with a darker triangle in the center"
        />
      </ImageWrapper>
      <p>
        We place immediately the VOR ship in the a.m. grid, and hence in the
        p.m. grid as well, where the R segment completes the two “1” clues.
        There is then only one possible way to place ship segments in the p.m.
        grid to satisfy the “3” and “4” clues to the left. This gives (portions
        of) three other ships of length ≥2, all running parallel to the edges of
        the vortex; hence these are the remaining ships of length ≥2 of the
        day’s fleet (TEX, MY, and ST).
      </p>
      <p>
        The “X” clue in the a.m. grid lets us place the TEX ship in both grids
        (traveling Southeast along the right edge of the grid), while one of the
        two “Y” clues lets us place the MY ship (traveling Southwest along the
        left edge of the grid), and the “S” clue lets us place the ST ship
        (traveling Northwest along the right side of the vortex).
      </p>
      <p>
        We can place three more ship segments in the p.m. grid using the “3”
        clue at right and the “2” clue to the left. The four unassigned ship
        segments are the three ships of length 1 (E, R, Y) and the R segment of
        the PAR ship from Day 4. (The other two segments of that ship are hidden
        inside the vortex, since they were visible the previous day).
      </p>
      <p>
        In the a.m. grid, the three length 1 ships are pointed at by the “3”
        clue and the left-most of the two “Y” clues at the bottom of the grid.
        By considering their positions in the p.m. grid, we can place the three
        ships uniquely and assign them the letters E,R,Y in both grids. The last
        remaining unassigned segment in the p.m. grid is then the extremity of
        the PAR ship, which we can finally place.
      </p>
      <p>
        <strong>Answer extraction:</strong> Superimposing the central regions of
        the 10 grids to make an onverview, we get:
      </p>
      <ExtractionWrapper>
        <LinkedImage
          src={extraction}
          alt="A small triangular hex grid with partial battlships spelling out CARPENTER FISH"
        />
      </ExtractionWrapper>
      <p>
        Which yields the answer: <PuzzleAnswer>CARPENTER FISH</PuzzleAnswer>.
      </p>
    </>
  );
};

export default Solution;
