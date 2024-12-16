import React from "react";
import { styled } from "styled-components";
import LinkedImage from "../../components/LinkedImage";
import solution1base10 from "./assets/solution1-base10.svg";
import solution1base12 from "./assets/solution1-base12.svg";
import solution10base10 from "./assets/solution10-base10.svg";
import solution10base12 from "./assets/solution10-base12.svg";
import solution2base10 from "./assets/solution2-base10.svg";
import solution2base12 from "./assets/solution2-base12.svg";
import solution3base10 from "./assets/solution3-base10.svg";
import solution3base12 from "./assets/solution3-base12.svg";
import solution4base10 from "./assets/solution4-base10.svg";
import solution4base12 from "./assets/solution4-base12.svg";
import solution5base10 from "./assets/solution5-base10.svg";
import solution5base12 from "./assets/solution5-base12.svg";
import solution6base10 from "./assets/solution6-base10.svg";
import solution6base12 from "./assets/solution6-base12.svg";
import solution7base10 from "./assets/solution7-base10.svg";
import solution7base12 from "./assets/solution7-base12.svg";
import solution8base10 from "./assets/solution8-base10.svg";
import solution8base12 from "./assets/solution8-base12.svg";
import solution9base10 from "./assets/solution9-base10.svg";
import solution9base12 from "./assets/solution9-base12.svg";

const ImageWrapper = styled.div`
  display: flex;
`;

const Mono = styled.span`
  font-family: monospace;
`;

const Solution = (): JSX.Element => {
  return (
    <>
      <p>
        Each of the ten individual logic puzzle grids is labeled with the
        genre/variant name, as well as a small example illustrating the rules
        (especially the manner in which novel variants differ from the base
        genres). Lists of standard logic puzzle genres and variants, and their
        rules (including some of the variants relevant to this puzzle) can be
        found at{" "}
        <a
          href="https://wpcunofficial.miraheze.org"
          target="_blank"
          rel="noreferrer"
        >
          https://wpcunofficial.miraheze.org/
        </a>
        ,
        <a
          href="https://logic-puzzles.ropeko.ch"
          target="_blank"
          rel="noreferrer"
        >
          https://logic-puzzles.ropeko.ch/
        </a>{" "}
        and{" "}
        <a
          href="https://tinyurl.com/puzzlerules"
          target="_blank"
          rel="noreferrer"
        >
          https://tinyurl.com/puzzlerules
        </a>
        .
      </p>
      <p>
        Each of the logic puzzles has a unique solution; two of the ?-ed clues
        on each puzzle (marked in color) point to cells in the extraction grid
        at the bottom.
      </p>
      <h3>Part 1 - solving the grids</h3>
      <h4>1. Kakuro:</h4>
      <ImageWrapper>
        <LinkedImage
          src={solution1base10}
          alt="A solved 9x9 Kakuro grid. One number has been substituted with a red-highlighted question mark, and one number has been substituted with a green-highlighted question mark."
        />
      </ImageWrapper>
      <p>
        This can be solved by standard Kakuro logic. Here is one way to get
        started:
      </p>
      <ul>
        <li>
          Just above the center cell, 24 down intersecting 22 across must be 7,
          and hence 24 down is 987. The top-left 16 down is therefore 97.
        </li>
        <li>
          Top-right corner, 21 down: the intersections with the 9 across clues
          must be at most 6 and 8 respectively, so the intersection with the 45
          is at least 7; in fact it must be 8 considering that 7 and 9 are
          already placed in the 45 across. The 21 down is therefore 867.
        </li>
        <li>
          Bottom-right corner, 22 down: the entries are ≥5, but the already
          placed 1,2,4 in 45 down force the 10 across to be 3+7. This also
          allows us to place 5 and 6 in 45 down, which in turn forces 22 down to
          be 679 rather than 976 (because the 25 across couldn’t be satisfied
          otherwise).
        </li>
        <li>
          Bottom-left corner, 20 across: this must contain an 8 or 9. Since the
          17 across in the top-left corner meeting 11 down must be 89, the only
          remaining option for 20 across is 857. The 14 across two rows above it
          must then be 671.
        </li>
      </ul>
      <p>
        Things are fairly straightforward after this. The two ? clues point to
        the extraction grid cell at R7C11, giving ‘R’.
      </p>
      <h4>2. Nonogram:</h4>
      <ImageWrapper>
        <LinkedImage
          src={solution2base10}
          alt="A solved 9x9 Kakuro grid. One number has been substituted with a red-highlighted question mark, and one number has been substituted with a green-highlighted question mark."
        />
      </ImageWrapper>
      <p>R1C5 = ‘E’</p>
      <p>
        This is a standard Nonogram (aka Paint it Black) puzzle, except ‘?’
        stands for one block of shaded cells (of unknown length), and ‘*’ stands
        for any number of blocks of shaded cells (including none)—as should be
        apparent from the provided example.
      </p>
      <p>
        The grid can be solved using usual techniques (start with the most
        constrained rows/columns, esp. those containing longer blocks of shaded
        cells). When the going gets rough, make sure you have thought about the
        bottom-most portions of columns 11 and 12; and later on, how to achieve
        all the required short blocks in rows 5 and 6.
      </p>
      <h4>3. Killer Sudoku:</h4>
      <ImageWrapper>
        <LinkedImage
          src={solution3base10}
          alt="A solved 9x9 Killer Sudoku grid. One number has been substituted with a red-highlighted question mark, and one number has been substituted with a green-highlighted question mark."
        />
      </ImageWrapper>
      <p>R11C4 = ‘D’</p>
      <p>This can be solved using standard techniques. For example:</p>
      <ul>
        <li>
          the 15 sum in R1 is 1-5, hence R1C8 is 6, and the 14 sum at the
          top-right corner is 9+5. It follows that the 12 sum at the
          bottom-right corner is 4+8 in either order. R1C7 is 4, and finally
          R3C7 is 7 and R2C7 is 8.
        </li>
        <li>
          since R2C6 is 3, so is R1C3, and the 14 sum in box 1 must be 7421
          (with 7 in R1C2). Also, the 12 sum in R3 must be 4+8, and R2C4-5 must
          be 7+9, while R3C4 is 6; the remainder of the 20 sum containing that
          last cell is 5+9 in either order.
        </li>
        <li>
          since 3 is placed in R1C3, the 3 needed to make the sum 10 in columns
          3-4 must be in R7C4. 1+2+4 are in rows 5-7 of column 3, and rows 8-9
          must be 7+8, while the 20 in the lower-left corner must be 5+6+9.
        </li>
        <li>
          this allows us to place 3 and 5 in the 11 sum at lower-left, and 4 in
          R7C3; the 12 sum in R7C8-9 is therefore 5+7. Meanwhile, the 20 sum in
          box 4 must be 3+4+6+7, leaving 8 and 9 for R4C2-3.
        </li>
        <li>
          the large sum 38 at center-right contains all digits except 7. The 7
          in that box must therefore be in R4C8; while the 5 needed for the 38
          cage must be in R8C6. Since in row 7 the 9 must be in column 6 or 7,
          hence in the 38 cage, the 9 in box 6 must be R5C7. Thus R7C5-7 must be
          896. This in turn implies the 6 in box 6 must be R6C9.
        </li>
      </ul>
      <p>At this point things become reasonably straightforward.</p>
      <h4>4. Fillomino:</h4>
      <ImageWrapper>
        <LinkedImage
          src={solution4base10}
          alt="A solved 10x12 Fillomino grid. One number has been substituted with a red-highlighted question mark, and one number has been substituted with a green-highlighted question mark."
        />
      </ImageWrapper>
      <p>R3C15 = ‘O’</p>
      <p>
        The key observation is that the two 12 clues are too far apart to belong
        to the same region, and since 30+19+15+2x12+10+6+5x2+3x1 = 117 out of
        120 grid cells, every other set of identical clues greater than 2 must
        belong to a single region of that size. This allows one to place
        immediately the 6 region, the 10 region, the 19 region, and most of the
        15 region. The final insight needed to complete the grid is that R9C5
        cannot belong to either 12 region as they would otherwise have to touch
        each other.
      </p>
      <h4>5. Average Snake:</h4>
      <ImageWrapper>
        <LinkedImage
          src={solution5base10}
          alt="A solved 12x12 Average Snake grid. One number has been substituted with a red-highlighted question mark, and one number has been substituted with a green-highlighted question mark."
        />
      </ImageWrapper>
      <p>R5C7 = ‘B’</p>
      <p>
        As in all snake puzzles, the goal is to draw a path that doesn’t touch
        itself, not even diagonally (i.e., adjacent cells that belong to the
        snake are consecutive along the snake, and cells that share a corner are
        2 apart along the snake). The variant here is new as far as we know. As
        shown by the example and suggested by the name, the cells are numbered
        from 1 to the length of the snake, and the clues next to the grid give
        the average of the numerical values of the cells occupied by the snake
        in that row or column. Furthermore, the gray cells must remain
        unoccupied. The notations above the grid indicate that the total length
        of the snake is 45 (so the end points are given, as is often the case in
        snake puzzles), and that the ? clues must take integer values.
      </p>
      <p>
        The starting point is to observe that, since the first column consists
        of blocks of at least 3 consecutive occupied cells, the average of 42
        can only be achieved by 41-42-43. The second column therefore contains
        44 and 40, hence the average of 41 can only be achieved by 39-40-44.
        This places the portion of the snake from 38 to 45 for us. Next, the
        bottom-most row cannot contain any values larger than 31, so the average
        of 30 must be 31-30-29. This allows us to place 28 to 37 uniquely.
      </p>
      <p>
        Next we get to the trickiest part of the grid. The key observation is
        that the average of 34 in row 8 which already contains 41, 40, 36, 35,
        and must have all remaining values at most 25, can only be achieved by
        having the only other occupied cell be numbered 18. By parity there are
        three possible positions for it (columns 8, 10, 12). Column 8 gives a
        quick contradiction as the average of 18 in the last column will be
        impossible to achieve; column 10 also gives a contradiction as the ‘?’
        clue in row 10 will be non-integer. Thus 18 is in R8C12.
      </p>
      <p>
        One then checks (by testing all the possible snake paths) that, if 20 is
        in R10C12, then the ? clue for row 10 cannot be an integer. Thus, 20
        must be in R9C11, and column 12 contains only 17-18-19. It then follows
        that 27 must be in R10C7 (no valid snake path exists from 27 in R11C8 to
        20 in R9C11), and 26 must be in R10C8 (if it were in R9C7 then the path
        would have 22 in column 10, making the average of 19 impossible to
        achieve); this allows us to complete the path from 20 to 27 uniquely.
      </p>
      <p>
        Finally, the average of 19 in column 10 must be achieved by placing only
        15 and 23 in that column; and since the snake must reach row 1 in order
        to produce a valid average, the only way to connect 14 to 1 while
        avoiding the gray cell in row 2 is to place 8 to 14 in column 9.
        Ensuring that the colored ‘?’ clues take integer values then forces the
        rest of the path.
      </p>
      <h4>6. Sum Skyscrapers with Mirrors:</h4>
      <ImageWrapper>
        <LinkedImage
          src={solution6base10}
          alt="A solved 7x7 Sum Skyscrapers with Mirrors grid. One number has been substituted with a red-highlighted question mark, and one number has been substituted with a green-highlighted question mark."
        />
      </ImageWrapper>
      <p>R5C9 = ‘A’</p>
      <p>
        This is a variant of Skyscrapers combining features of the existing
        variations “Sum Skyscrapers” and “Skyscrapers with mirrors”. Each row
        and column contains the numbers from 1 to 6 and one diagonal two-sided
        mirror. Each number in the grid represents the height of a building. The
        clues on the outside of the grid indicate the sum of the heights of the
        buildings that can be seen when looking from that direction. Taller
        buildings block the view of buildings of shorter or equal height, and
        when it hits a mirror the light coming in along a row gets reflected
        along a column and vice-versa.
      </p>
      <p>Here is a possible solution path:</p>
      <p>
        Since there is one mirror per row/column, every path from a clue through
        the grid makes a single turn at a mirror before exiting the grid. In
        particular, starting from the bottom of column 6, the first encountered
        number must be 2, and no higher value is encountered before exiting.
        This immediately gives us a mirror (oriented /) in R7C6, and 2 in R7C7.
      </p>
      <p>
        The sum 19 in column 1 must be 1+3+4+5+6; since R2C1 can’t contain a
        mirror (neither orientation allows us to achieve both the sum 2 in row 2
        and the sum 19 in column 1), it must contain a 2 (to achieve the sum 2),
        and R1C1 must contain a mirror (oriented \). We also place 1 and 3 in
        R1C2-R1C3. R1C4 could in principle be either 2 (hidden along the path
        from top of column 1) or 4 (visible), but the sum 16 in column 4 can’t
        be achieved if the first visible number is 4; hence R1C4 is 2, and we
        place 4,5,6 in R1C5-7.
      </p>
      <p>
        The sum 2 in row 2 now forces a mirror (oriented /) in R2C2. Since the
        path from the right of row 2 will encounter a 6, the sum 7 must be 1+6,
        so we have 1 in R2C7 and 6 in R2C6. Also, the sum 16 in column 4 must be
        2+3+5+6, so we place 3 in R2C4, and complete the rest of row 2.
      </p>
      <p>
        The sum 3 to the right of row 4 can’t be achieved if R4C7 contains a
        mirror (with either orientation), so R4C7 is 3, and all the other values
        encountered along that path must be at most 3; since we already have a
        mirror in column 6, R4C6 must be 1 or 2, and the mirror in row 4 must be
        in R4C5 (oriented /, with 1,2,3 below it in column 5) or in R4C4
        (oriented \, with 1,2,3 above it in column 4). The latter option isn’t
        compatible with the sum 16 in column 4. Thus, we place the mirror (/) in
        R4C5, and 2,3,1 in R5-7C5 (in that order, to achieve the sum 4 at the
        bottom of column 5); and then 6 in R3C5.
      </p>
      <p>
        The sum 10 to the right of row 3 can’t be achieved if we place a mirror
        in R3C7 (with either orientation); since the sum 10 can’t be achieved
        either if R3C7 is 5, we can place 4 in R3C7; R3C6 must be hidden from
        view, hence contains 1 or 2, and since R3-4C6 contain 1 and 2 in either
        order, 3 must be in R5C6.
      </p>
      <p>
        The sum 7 at the bottom of column 7 cannot be achieved if the mirror in
        column 7 is oriented \; thus it must be oriented / in R5C7, and R6C7 is
        5.
      </p>
      <p>
        In row 5, the digit 6 will be to the left of the mirror, so it will be
        seen from the left of row 5. The sum 6 implies that no other digit is
        visible, which forces 6 to be in R5C1.
      </p>
      <p>
        R7C4 is at least 4, so the sum 6 at the bottom of column 4 forces it to
        be 6. We can then complete the rest of row 7; and then column 1.
      </p>
      <p>
        R3C4 can’t contain a mirror (with either orientation), as this would
        make the sum 16=2+3+5+6 in column 4 impossible to achieve. It can’t
        contain 1 either, as the next visible cell down the 4th column would
        need to contain a 5, conflicting with R4C1. Thus, R3C4 is 5, and the
        last two mirrors are in R3C3 (necessarily oriented \, so the sum
        18=3+4+5+6 in column 3 can be achieved) and in R6C4 (necessarily
        oriented /, so the sum 16=2+3+5+6 in column 4 can be achieved).
      </p>
      <p>
        The rest of the grid is then easily completed using Latin square
        arguments.
      </p>
      <h4>7. Japanese Sums or Products:</h4>
      <ImageWrapper>
        <LinkedImage
          src={solution7base10}
          alt="A solved 8x8 Japanese Sums or Products grid. One number has been substituted with a red-highlighted question mark, and one number has been substituted with a green-highlighted question mark."
        />
      </ImageWrapper>
      <p>R6C9 = ‘S’</p>
      <p>
        This is a variant of Japanese Sums where the clues can be either the sum
        or the product of the digits in a consecutive group. (Note that, unlike
        Kakuro, in Japanese Sums the digits within a row or column must be all
        distinct). As in the Nonogram puzzle, ‘?’ stands for one block of
        occupied cells (of unknown sum/product), and ‘*’ stands for any number
        of blocks of occupied cells (including none)—as should be apparent from
        the provided example.
      </p>
      <p>
        A possible starting point is to look at “packed” rows/columns, such as
        row 1 where the last clue requires at least 2 occupied cells, so we
        determine that the occupied cells are R1C1, R1C3, R1C5, and R1C7-8
        (containing 1, 3, an unknown digit, and the product 7x8 in either
        order). Likewise in row 4 (except we can’t place any digits yet).
      </p>
      <p>
        Column 1 now requires 2 or 3 in R2C1, 4 in R4C1, 5 in R6C1, and 8 in
        R8C1, with the other cells remaining empty. The first clue 5 in row 2
        then gives us 2 or 3 in R2C2 (hence 2, because of the column clue),
        while R2C3 remains empty. Similarly, the first clue 6 in row 6 gives 1
        in R6C2, and R6C3 remains empty.
      </p>
      <p>
        In column 6, the three sums/products 6 must be 6, 5+1, and one of 4+2 or
        3x2, in any order. In any case, we conclude that R2C6, R3C6, R5C6 and
        R8C6 can’t be empty.
      </p>
      <p>
        In column 8, the product 840 = 7x5x8x3(x1) or 7x5x6x4(x1) or
        7x5x4x3x2(x1) and the product 48 = 8x6, 6x4x2, or 8x3x2(x1) require all
        the digits from 2 to 8, hence there is no space for a 1 in either
        product, and the only empty cell in column 8 is in row 5 or 6.
      </p>
      <p>
        In row 2, the three clues must be 5, 4+1 and 3+2 in some order. (3+2 is
        already placed). Thus, R2C8 is 5, R2C5-6 contain 1+4 in either order,
        and the other cells are empty.
      </p>
      <p>
        In column 5, the sum 34 requires 5 cells, while the clue 15 requires 2
        cells to achieve; hence the only empty cell is R6C5, the sum 34 is
        9+8+7+6+4 (with 4 in R2C5), and 15 must be a product 3x5.
      </p>
      <p>
        In row 8, the sum 11 requires R8C7 to be occupied, and so the sum
        11=5+3+2+1 occupies columns 5-8, and the sum 21 = 8+9+4 or 8+7+6
        occupies columns 1-3. Since the product 56 in column 2 must be 8x7x1 (we
        already have a 1 placed, and 7x4x2x1 isn’t an option since we already
        have a 2 placed in R2C2), R8C2 is 7, R8C3 is 6, and R7C2 is 8; the other
        cells in column 2 remain empty.
      </p>
      <p>
        Since R7C5 and R7C8 both contain digits, they must both be part of the
        clue 16 (necessarily a sum) and so R7C6 and C7 also contain digits.
        Thus, R6C6 is empty, R5C6 is 6, and so is R6C4; while R6C7-8 contain
        digits (and R5C8 is empty).
      </p>
      <p>
        In row 3, the clue 8 can’t stretch across columns 5-8, so R3C7 is empty
        and R3C8 is 8. This also gives us 8 and 7 in R1C7-8, and 3 in R4C8.
        Moreover, the product 48 in column 8 must be 4x6x2 (in that order given
        the row clues). We then place 5 in R4C7 and 2 in R6C7.
      </p>
      <p>
        In row 8, the remaining digits in the sum 11=5+3+2+1 can now be placed:
        first 1 in R8C7 (neither R8C5 nor C6 can be 1), then 3 in R8C6 and 5 in
        R8C5. We then place 3 in R7C5, and complete column 6.
      </p>
      <p>
        Since there is already a 5 in column 7, the sum 16 in row 7 requires
        R7C7 to be 4 and R7C4 to be 1. We also place 9 in R5C7 to complete the
        sum 21 in that column.
      </p>
      <p>
        Since column 3 already contains a 3 and a 6, the product 36 must be
        9x4(x1). Meanwhile, the sum 32 in row 5 occupies columns 3-7, and every
        digit in it must be at least 2; thus R5C3 is 4, and given the clue 12 in
        column 4 the only possibility to complete row 5 is 5 in R5C4 and 8 in
        R5C5.
      </p>
      <p>
        R3C5 is at most 7 due to the sum 12 in row 3, and at least 6 due to the
        sum 34 in column 5; it can’t be 6 since there is already a 1 in column
        4, so R3C5 is 7; R3C3-4 are empty; and R4C3 is 9. We then place the last
        two digits in column 5.
      </p>
      <h4>8. Hungarian Tapa:</h4>
      <ImageWrapper>
        <LinkedImage
          src={solution8base10}
          alt="A solved 10x10 Hungarian Tapa grid. One number has been substituted with a red-highlighted question mark, and one number has been substituted with a green-highlighted question mark."
        />
      </ImageWrapper>
      <p>R8C7 = ‘E’</p>
      <p>
        This variant of Tapa invented by Zoltan Horvath has made appearances in
        various competitions over the past decade. The shaded cells of the Tapa
        contain numbers in a given range (1-5 here), with each of these
        appearing exactly once in every row and column, and the clues give the
        sums of the values in consecutive blocks of shaded cells around the clue
        cells (rather than the lengths of the blocks). (The numbers appearing in
        a single sum need not be distinct.) The implied constraint that exactly
        5 cells per row/column are shaded is quite strong and important in
        solving this genre, in conjunction with the general rules of Tapa
        (shaded cells form a connected region and no 2x2 square is entirely
        shaded).
      </p>
      <p>
        The starting point here is to observe that the clue in R8C3 can’t be
        satisfied by having its four occupied neighboring cells be due E/S/N/W
        of it, as this would force R10 C1-5 to be occupied, hence the remaining
        cells of R10 empty, making the “8 4” clue in R10C8 impossible to
        achieve. So the occupied neighbors of R8C3 are the four diagonally
        adjacent cells.
      </p>
      <p>
        In fact, the “8 4” clue in R10C8 forces R9C7 to be occupied, as well as
        one of R9C9-10. Thus R9C1 and R9C5 can’t both be occupied, and thus
        connectedness of the shaded area forces R10C2-4 to be occupied. On the
        other hand, since R9C1 or R9C5 must be occupied, R9C6 and R9C8 must be
        empty. This in turn forces R8C7 and R8C9 to be occupied. R8C9 must be 2
        and the other neighbors of R7C10 must be empty. R8C8 and R9C9 must
        therefore be occupied, while R9C10 is empty.
      </p>
      <p>
        In R6C1, the 12 sum requires 3 occupied cells, which must be R6C2 and
        R7C1-2, while 1 is in R5C1 and R5C2 is empty. Thus R4C1-2 are occupied,
        and since column 2 now has five occupied cells, R1-3C2 remain empty; so
        do R1-2C1 by connectedness, and the remaining occupied cells in column 1
        must be R8C1 and one of R9C1-R10C1.
      </p>
      <p>
        Since R9-10C5 can’t both be empty, and neither can R10C7/9, the
        remaining occupied cells in rows 9 and 10 are one of R10C7 and R10C9,
        and either R9C1 and R10C5, or R9C5 and R10C1. Either way, R10C10 is
        empty, and the occupied cells in column 10 are in rows 1-5.
      </p>
      <p>
        R1C9 can’t be occupied (R2C9 would then have to be empty), and so the
        occupied cells in column 9 must be one of R2C9/R3C9, R5C9, and R8-10C9.
        R10C7 is therefore empty, R9C7 contains 4, and R9-10C9 contain 5+3—in
        this order since the 3’s in rows 7 and 9 must be in columns 2 and 4.
        Thus R5C9 contains 4, and 1 is in R2C9 or R3C9.
      </p>
      <p>
        The 10 sum in R1C8 requires at least 3 occupied cells to achieve, so
        R2C7-8 are both occupied; on the other hand, the “5 2 ?” clue in R3C7
        requires one of R4C7-8 to be occupied. Together with R4C1-3 and R4C10
        this makes 5 occupied cells in row 4, R4C4-6 must be empty, and
        necessarily R3C6 is occupied and R2C6 is empty.
      </p>
      <p>
        R1C4 must be occupied, and if the final occupied cell in column 4 were
        R2C4 the left portion of the grid would be disconnected from the rest;
        so R2C4 is empty, and the remaining occupied cells in row 2 are R2C5 and
        R2C9.
      </p>
      <p>
        If R1C6-7 aren’t both occupied, then connectivity forces R3C3-5 to be
        occupied, R5-6C4 are empty, and the left portion of the grid ends up
        disconnected from the rest. So R1C6-7 are both occupied, R1C3 is empty,
        R1C4 contains 4, and R3C3-4 must contain 4+5.
      </p>
      <p>
        The rest of column 4 is now empty, while R5-6C3 are occupied.
        Connectivity then forces R3C5, R7C5 and R5C8 to be occupied.
      </p>
      <p>
        In column 5, we now know that R5C5, R6C5 and R8C5 are empty; for
        connectivity reasons the final occupied cells in rows 9-10 are therefore
        R9C1 and R10C5. Moreover, R9C1 can’t be 3 (the 3 in row 9 must be in
        column 2 or 4), so it contains 2.
      </p>
      <p>
        At this point it is easy to determine the remaining occupied cells; it
        remains to assign their values.
      </p>
      <p>
        The sum 5 adjacent to R3C7 can’t be in R3C6 nor in R2C7-8, hence 5 is in
        R4C8, and 2 is in R3C6.
      </p>
      <p>
        Since R5C8 is 2 or 3, the sum of R3-5C10 is 8 or 9; by checking the
        various ways to achieve the sum 20 in R4C9, one sees that R5C10 must be
        5, and R3-4C10 must be 1 and 2 or 1 and 3. Thus, the 4 in column 10 is
        in R2C10. Moreover, the sum 10 in R1C8 can’t be achieved if R2C7-8 are 2
        and 3, so R2C7 must be 5.
      </p>
      <p>
        If R2C8 is 2, then R5C8 is 3, so R3-4C10 are 1 and 2, giving a
        contradiction since R2-3C5 would both need to be 3. Hence, R2C8 is 3,
        R2C5 is 2, R5C8 is 2, R3-4C10 are 1 and 3 in either order, and R1C10 is
        2. The rest of the grid follows fairly easily.
      </p>
      <h4>9. Doppelblock Sudoku:</h4>
      <ImageWrapper>
        <LinkedImage
          src={solution9base10}
          alt="A solved 9x9 Doppelblock Sudoku grid. One number has been substituted with a red-highlighted question mark, and one number has been substituted with a green-highlighted question mark."
        />
      </ImageWrapper>
      <p>R9C11 = ‘1’</p>
      <p>
        In this sudoku variant, each row, column, and 3x3 box contains the
        digits from 1 to 7 and two black squares. Each clue in the margin
        indicates the sum of the digits found between the two black squares in
        that row or column.
      </p>
      <p>
        To get started, note that since the largest value is 7, clues greater
        than 18 require the two black squares to be separated by at least 4
        white cells, hence the centermost square is white. In column 5 there are
        at least 5 white cells between the black squares, so R1C5 is black and
        the other black square of column 5 is in row 7 or 8.
      </p>
      <p>
        The sum 2 in row 1 implies that 2 is in R1C4 or R1C6, and the other
        black cell is in R1C3 or R1C7. Assume 2 is in R1C4 and R1C3 is black.
        Then R2C3 must be 1, and R3C3 must be black; since there can’t be a 1 in
        R3C2 (same box as R2C3), it must be in R3C4, and R4C4 must be black - a
        contradiction. Hence: 2 is in R1C6, and R1C7 is black.
      </p>
      <p>
        Since the two black cells of column 8 touch each other, R2C8 can’t be
        black. R3C9 can’t be black either due to the 1 clue in row 3. Hence the
        second black cell of box 3 must be R2C9.
      </p>
      <p>
        The sum 20 in column 9 must use either 4 or 5 cells, so the other black
        cell in column 9 is in row 7 or 8. Moreover, R5C8 must be black in order
        for box 6 to contain two black cells, given that the black cells in
        column 8 are adjacent to each other but in row 6 they aren’t. The other
        black cell for box 6 (and column 8) is R4C8 or R6C8.
      </p>
      <p>
        At this point we know that R9C7-9 all contain digits; thus the black
        cells in row 9 are R9C1 and R9C6, and R9C7-9 contain 1,2,3 in some
        order. We note that the 6 in row 9 must now be in column 2 or 3, and
        there is also a 6 in row 7 column 8 or 9.
      </p>
      <p>
        There is a black cell in R7C5 or R8C5; therefore R8C6 contains a digit,
        and necessarily R6C6 is black, while R7-8C6 are 1 and 4 in either order.
        It then follows that R9C5 is 5 (it is at most 5 due to the column 5
        clue, but at least 4 by the row 9 clue, and can’t be 4), and that R8C5
        is black.
      </p>
      <p>
        Since the black squares in row 7 are separated by at least 2 and at most
        4 white squares, one is in R7C7 and the other is in column 2 or 3; the
        other black square in box 9 is R8C9.
      </p>
      <p>
        There are two options for the placement of 1 and its surrounding black
        cells in row 3. Assume 1 is in R3C2, with black cells in R3C1 and R3C3.
        Then R2C1-3 contain digits; since the sum of the digits left of the
        black cells in row 2 must be 9, and those must be 2,3,4 in some order,
        and R2C4 is black. Thus R1C2-3 contain 5 and 7 in some order; there is a
        3 in R1C4; and R1C8-9 contain 1 and 4 in some order. This is impossible,
        since R1C9 and R9C9 must add up to 8. Hence the assumption was incorrect
        —we have a 1 in R3C3, with black cells in R3C2, R3C4, R2C3, and R4C3.
      </p>
      <p>
        Since R7C3 can’t be black, the sum 11 in row 7 is achieved over columns
        3-6, and R7C2 is black. The sum 11 requires 1+2+3+5; hence R7C3 is 5,
        R7C6 is 1, and R7C4-5 are 2 and 3 in either order. It follows that R8C6
        is 4 and R9C4 is 7. Hence, R9C2-3 are 4 and 6 in either order, and so
        are R7C8-9. We can now place 7 in R7C1, and 1 and 2 in R8C2-3. Since
        R8C7 can’t be 7 (due to the sum 21 in column 7), it must be 5 and R8C8
        is 7.
      </p>
      <p>
        The sum 6 in row 6 forces R6C4 to be black and R6C5 to contain 6. We can
        now place the last two black squares of the grid, in R5C1 and R4C8; the
        grid can then be completed without too much difficulty using the given
        sums and standard Sudoku techniques.
      </p>
      <h4>10. Index Yajilin:</h4>
      <ImageWrapper>
        <LinkedImage
          src={solution10base10}
          alt="A solved 12x12 Index Yajilin grid. One number has been substituted with a red-highlighted question mark, and one number has been substituted with a green-highlighted question mark."
        />
      </ImageWrapper>
      <p>R8C12 = ‘2’</p>
      <p>
        This variant of Yajilin has appeared in WPC round 7 of the 2021 WSPC:
        the clues give the sum of the distances to the black cells encountered
        in the direction of the arrow. Also, the path cannot cross the x-ed
        border in the next-to-last row.
      </p>
      <p>
        Recall that black cells can’t touch by an edge; thus the sum 3 in row 3
        indicates a single black cell at distance 3.
      </p>
      <p>
        White cells along the edges come in groups of length at least 2 (there
        can’t be any dead-ends for the loop); thus the sum 19 in the rightmost
        column indicates black cells at distances 10, 6, and 3; and the sum 18
        in the bottom row indicates black cells at distances 10, 7, and 1. The
        loop passes through all white cells, including all the immediate
        neighbors of black cells; several portions of the loop along the bottom
        and right edges of the grid can already be drawn.
      </p>
      <p>
        Since the loop occupies the last three empty cells of row 1 and of
        column 1, the sum 10 in column 1 must be 7+3, and the sum 11 in row 1
        must be 7+4. This gives more portions of the loop along the top and left
        edges.
      </p>
      <p>
        The sum 9 in R8C6 must be 1+3+5, with portions of the loop passing in
        between these black squares. The sum 16 in R10C2 must be 8+5+3 (the
        cells at distance 6, 7, 9, 10 are already occupied by loop portions and
        can’t be black). The sum 11 in R8C2 must be 1+3+7 (at this point the
        cells at distance 8, 9, 10 are already occupied by loop portions and
        can’t be black); and the sum 5 in R9C9 must be 1+4.
      </p>
      <p>
        At this point it is straightforward to draw the loop and place the
        remaining (unclued) black squares.
      </p>
      <p>
        <strong>Answer extraction:</strong> The clued cells in the extraction
        grid spell <Mono>REDO BASE 12</Mono>. Thus, we solve the grids a second
        time, this time interpreting all the givens in base 12.
      </p>
      <p>
        <strong>Note:</strong> for those who are unable to solve the last two
        grids, the value 12 can also be found by considering the constraint that
        every grid should admit a solution in the new base. The valid base
        cannot be less than 10 (as is clear from the fact that, in the Kakuro, a
        sum of length 6 can produce “22”—or from the many digits “9” used in the
        grids), nor more than 12 (otherwise the row “4 2 10” in Nonogram doesn’t
        fit, and “23” can’t be achieved as a sum in Doppelblock Sudoku). Base 11
        is problematic for the Japanese Sums or Products: for example “54” and
        “56” in base 11 (i.e., 59 and 61) cannot be expressed as sums or
        products of distinct digits. It is also incompatible with the Fillomino
        (the two “12” clues still can’t be in the same region if interpreted in
        base 11, so they represent two distinct areas, but then the sum of the
        given clues is more than the total area of the grid.) This leaves 12 as
        the only possibility besides 10.
      </p>
      <h3>Part 2 - solving the grids again, in base 12.</h3>
      <p>
        Notation: we denote by “A” and “B” the digits with decimal value 10 and
        11. When it is ambiguous, we denote by “xy” a number in base 12, and by
        (xy) the same number in base 10: for example, the sum of all the
        non-zero digits from 1 to B is “56” (66).
      </p>
      <h4>1. Kakuro (base 12):</h4>
      <ImageWrapper>
        <LinkedImage
          src={solution1base12}
          alt="A solved 9x9 Kakuro grid in base 12. One number has been substituted with a red-highlighted question mark, and one number has been substituted with a green-highlighted question mark."
        />
      </ImageWrapper>
      <p>R9C13 = ‘A’</p>
      <p>
        The valid values now range from 1 to B (the givens must be achieved as
        sums of distinct non-zero digits). In particular, the length 9 sums “45”
        (53) leave out two digits whose sum is 13.
      </p>
      <p>Here’s a way to get started:</p>
      <ul>
        <li>
          Top-right corner, “21” (25) down: the intersections with the 9 across
          clues must be at most 6 and 8 respectively, so the intersection with
          the 45 is at least “B” (11). Thus, we place B68 (+ complete the two 9
          across clues, and the 7 across clue at the top).
        </li>
        <li>
          Bottom-left corner, “20” (24) across: similarly, due to the
          intersections with the 9 and 8 down clues, this must be B67.
        </li>
        <li>
          Still in the bottom-left corner, “14” across: the second cell in “14”
          is at most A, so the first one is at least 5; thus 9 down in the
          left-most column must be 153 while “14” across must be 5A1.
        </li>
        <li>
          Top-left, “17” (19) across: the first cell is at most A (due to the
          “11” (13) down being at most A+1+2), and the second cell is at most 9
          (due to A and B already being placed in column 2), hence they are
          indeed A and 9.
        </li>
        <li>
          At this point, we know that the “45” sum in column 2 involves all
          digits except 5 and 8 (B,A,9 and 6 are already placed, and the missing
          digits add up to 13).
        </li>
        <li>
          Center-left, “22” (26) across: the first cell is at most 7 (no 8 in
          that column), the second is at most 8, hence this is 78B. We also
          place 1 and 2 in the row above.
        </li>
        <li>
          Center top, “24” (28) down: the second cell is at most 8, so the other
          two add up to at least 20, hence B+A or B+9. Hence, this is either 98B
          or A7B; either way there is a B in the bottom-most cell, and the rest
          of the “22” (26) across clue must be the digits 1-5 in some order (2
          is in column 1 and 1 in column 3).
        </li>
        <li>
          The remaining digits to place in column 2 are 1,2,3,4. Their positions
          are uniquely determined by what has already been placed in the
          respective rows.
        </li>
        <li>
          Bottom-right corner, 6 down must be 51. We can now conclude that the
          “45” across sum in the next-to-last row uses all digits except 6 and
          7; digits 8,9,A,B remain to be placed.
        </li>
        <li>
          In the “10” (12) down clue at center-bottom, the second cell is at
          least 3, and the last one is at least 8, so this must be 138.
        </li>
        <li>
          In the “26” (30) down clue just right of center, the next-to-last cell
          is at least 9, so this must be B+9+4+3+2+1. We can place 9, 4, and 1,
          and complete the “22” across to the left.
        </li>
        <li>
          Top-left, “18” (20) across must be one of 19A, 1A9, 1B8. However, the
          second cell can’t be B or 9 due to the “16” (18) down clue (row 2
          already contains a 7). So it must be 1A9.
        </li>
        <li>
          Top-left, “28” (32) down already has B, 9 and 5 placed, so the
          remaining cells adding to 7 must be 4, 1, and 2.
        </li>
        <li>
          At this point we know that the “45” sum in row 2 involves all digits
          except 3 and A. The missing digits 5 and 6 can be placed.
        </li>
        <li>
          We now know that the “45” sum in the next-to-last column also involves
          all digits except 3 and A. This lets us complete the next-to-last row.
        </li>
        <li>
          Bottom-right, “10” (12) across: the second cell must be at least 5 to
          achieve the “22” (26) sum down, but the only values yet to be placed
          in the next-to-last column are 7,8,9. Thus this is 7+5. At this point
          the rest of the grid can be completed easily.
        </li>
      </ul>
      <h4>2. Nonogram (base 12):</h4>
      <ImageWrapper>
        <LinkedImage
          src={solution2base12}
          alt="A solved 9x9 Kakuro grid in base 12. One number has been substituted with a red-highlighted question mark, and one number has been substituted with a green-highlighted question mark."
        />
      </ImageWrapper>
      <p>R8C3 = ‘B’</p>
      <p>
        Same general strategies as for the base 10 version—start with the
        rows/columns with large clues. This version of the grid is significantly
        more constrained, as the large clues are now larger—for example the row
        12 with clues “4 2 10” is uniquely determined, and row 4 with “2 11 2”
        is very constrained.
      </p>
      <h4>3. Killer Sudoku (base 12):</h4>
      <ImageWrapper>
        <LinkedImage
          src={solution3base12}
          alt="A solved 9x9 Killer Sudoku grid in base 12. One number has been substituted with a red-highlighted question mark, and one number has been substituted with a green-highlighted question mark."
        />
      </ImageWrapper>
      <p>R12C7 = ‘A’</p>
      <p>
        Since this is a sudoku, the digits are still 1-9—however the sums are
        now in base 12.
      </p>
      <p>To get started:</p>
      <ul>
        <li>
          The “14” (16) box at the top-right corner is 7+9 in some order, so the
          “12” (14) box at the bottom-right corner is 8+6 in some order, and the
          other “12” (14) box just above it must be 9+5 in that order.
        </li>
        <li>
          The two 3-cell “20” (24) boxes in the top-left and bottom-left corners
          must contain 7,8,9 in some order. In particular, 7,8,9 in column 3
          must be in rows 1, 3 and 4 (since rows 5-7 are in a “10” (12) box
          hence cannot be more than 6). Because the “15” (17) box in row 1 can’t
          contain anything larger than 7, R1C3 is 7, R3-4C3 contain 8 and 9 in
          some order, and R3C4 is 7. We also get R1C9 = 9, R2C9 = 7.
        </li>
        <li>
          Now we have that R1C4-7 contain 1-4 in some order, R1C8 must be 6, and
          R1C1-2 must be 5 and 8 in some order. Thus, R3C3 is 9 and R4C3 is 8.
          The “12” (14) box in R3C5-6 must then be 6+8 in some order, and in the
          other “12” (14) box next to it, R3C7 is 5 and R4C7 is 9.
        </li>
        <li>
          The two remaining cells in the “12” (14) box in zone 3 must be 1 and 4
          in some order; hence R1C7 must be 2, R2C7 is 8, R2C6 is 5, and R2C4-5
          are 2 and 9 in some order.
        </li>
        <li>
          The “38” (44) box contains all digits except 1. In particular, there
          must be a 9, which can only be in R8C6.
        </li>
        <li>
          In zone 1, the sum “14” (16) can’t be achieved without using 8, so
          R1C2 is 8, and the other cells in that sum are 4, 3, 1 in some order;
          R1C1 is 5, and R3C2 is 2. We can now place the 7,8,9 in the “20” box
          at the lower-left corner and the 6,8 in the “12” box at the bottom of
          column 9.
        </li>
        <li>
          In zone 6, the 5 and 8 must be in R5-6C8. (Note the “38” sum must
          include a 5). Thus, the 8 in row 7 must be in R7C5, which also places
          6 and 8 in row 3.
        </li>
        <li>
          In column 1, 9 can only be in row 5; and since 6 in zone 7 must be in
          column 1 or 2, hence inside the “11” (13) sum, the rest of that sum
          must be 4+2+1, and 7 can’t be in R6C1; hence it is in R4C1. We now
          have that 6 and 7 in zone 6 must be in R5-6C7 in some order; thus
          R7-9C7 contain 1,3,4 in some order, and R8-9C8 contain 2 and 7 (in
          that order).
        </li>
        <li>
          The 5 in column 2 must be in one of rows 4-6; hence the 5 in column 3
          is in row 8 or 9, and the sum “10” (12) in columns 3-4 can’t be
          5+4+2+1, hence it is 6+3+2+1, with the 6 necessarily in R7C4. We can
          now place another 6 in R8C1.
        </li>
        <li>
          5 and 6 in column 2 are both in rows 4-6, but they can’t both be
          inside the “20” (24) box; in fact 6 is in row 4, and rows 5-6 contain
          5+3 in some order. We also place 3’s in R7C3 and R2C1. Moreover, R7C7
          must be 4, and hence so is R6C1, while R7C1-2 are 2 and 1.
        </li>
      </ul>
      <p>
        At this point most of the grid can be completed easily; when one gets
        stuck, there is one last tricky point, namely sorting out the sums in
        zone 8. The “10” (12) sum in row 9 must be 417 or 237. If it were 417,
        then 2 would be in R9C5, and there would be no way to achieve the sum
        “15” (17). Thus R9C6-8 are 237. The rest follows easily.
      </p>
      <h4>4. Fillomino (base 12):</h4>
      <ImageWrapper>
        <LinkedImage
          src={solution4base12}
          alt="A solved 10x12 Fillomino grid in base 12. One number has been substituted with a red-highlighted question mark, and one number has been substituted with a green-highlighted question mark."
        />
      </ImageWrapper>
      <p>R1C12 = ‘D’</p>
      <p>
        The key observation is that 36+21+17+14+12+6+5x2+3x1 = 119, so every set
        of identical clues greater than 2 must be in a single region of that
        size. In particular, contrary to the base 10 version of this puzzle, the
        two “12” (14) clues must now connect to each other. And of course, the
        “10”, “15” and “19” clues must still connect to each other; once it is
        determined how that can happen (mostly in the same way as the base 10
        version), the whole grid is basically solved.
      </p>
      <h4>5. Average Snake (base 12):</h4>
      <ImageWrapper>
        <LinkedImage
          src={solution5base12}
          alt="A solved 12x12 Average Snake grid in base 12. One number has been substituted with a red-highlighted question mark, and one number has been substituted with a green-highlighted question mark."
        />
      </ImageWrapper>
      <p>R11C8 = ‘D’</p>
      <p>
        As in base 10, the starting point is the “42” average in column 1, which
        can only be achieved by “41-42-43”; and the “41” average in column 2
        must be “44”, “40”, and “3B”. Thus we place the snake cells from “3A” to
        “44” uniquely. Moreover we must reach the bottom-most row by “31” at the
        latest; this forces the snake to pass below the given gray square—we
        place “37-38-39”.
      </p>
      <p>
        Moreover, the contents of the bottom-most row must be one of “31-30-2B”,
        “32-31-30-2B-2A”, or “33-32-...-2A-29”; in all cases we place “31”, “30”
        and “2B” in columns 7-9. (One checks that “31-30-2B” in columns 5-7
        doesn’t fit.)
      </p>
      <p>
        We study row 8 (with the clued average “34” (40)) more closely,
        switching to base 10 for calculations. It turns out there is only one
        possibility for that row. To reach the average value of 40, the sum of
        the amounts by which the used cells greater than 40 exceed 40 must
        balance out the sum of the amounts by which the cells less than 40 are
        below 40. The already placed values “41”, “40”, “38”, “37” (49, 48, 44,
        43) exceed 40 by a total amount of 24, so depending on whether “36” and
        “35” (42 and 41) are also in this row, the total amount by which the
        cells greater than the average exceed 40 is one of 24, 26, or 27. On the
        other hand, since “2B” is in the bottom row, cells in row 8 which are
        below the average must be at most “27” (31), hence at least 9 below 40.
        Hence, we can’t have 3 such cells in the row (those would be at most 29,
        30, 31, bringing the average below 40). We can’t have a single such cell
        either, since it’d need to be one of 16, 14, or 13 (24, 26 or 27 below
        40)—which isn’t possible due to insufficient space in the last 4 rows of
        the grid. So row 8 must contain exactly two cells numbered less than 40,
        these must be consecutive, and by parity they must add up to 27 below.
        Hence: besides the four already placed cells, row 8 contains “36”, “35”,
        “23” and “22” (42, 41, 27 and 26).
      </p>
      <p>
        This allows us to continue drawing the snake up to the cell numbered
        “2A”. Moreover, if “23” were in R8C9 then “22” would be in R8C10 and
        there is no way to connect these to “2A” in R11C9. Thus “23” is in
        R8C11, “22” in column 10 or 12, and “24” in R9C11.
      </p>
      <p>
        There’s now only one possible path from “2A” to “24”, and onwards up to
        the cell numbered “21”.
      </p>
      <p>
        Rightmost column: given the placed cells “25-26-27” (29-30-31) which
        exceed the average “18” (20) by a total of 30, and the fact that only
        one single group of contiguous cells fits in rows 1-6, the possibilities
        for those cells are 9-10-11 or 11-12-13-14 or 12-13-14-15-16. The first
        of these options doesn’t allow the snake to reach the top row on the way
        from the given end “1” to the right-most column; the last one doesn’t
        allow for a sufficiently long path from “14” (16) to “21” (25); thus the
        values used must be 11-12-13-14, i.e. “B-10-11-12”.
      </p>
      <p>
        Since the snake must reach through the top row on the way from “1” to
        “B”, “B” must actually be in the top-right corner, and we can place the
        cells from “9” to “13”. In fact “14” must also be in row 4 (no
        sufficiently long path to “21” if it were in row 5), which in turn
        forces 6-7-8 to be in row 1.
      </p>
      <p>
        Achieving the average “19” (21) in column 10 then forces “15” to be in
        that column (necessarily in row 3, as there would be no valid path to
        “21” if it were in row 5), and the rest of the path follows easily.
      </p>
      <h4>6. Sum Skyscrapers with Mirrors (base 12):</h4>
      <ImageWrapper>
        <LinkedImage
          src={solution6base12}
          alt="A solved 7x7 Sum Skyscrapers with Mirrors grid in base 12. One number has been substituted with a red-highlighted question mark, and one number has been substituted with a green-highlighted question mark."
        />
      </ImageWrapper>
      <p>R10C14 = ‘E’</p>
      <p>
        As in the base 10 version, we place a mirror (/) in R7C6 and 2 in R7C7
        to achieve the sum 2 in column 7. To achieve the sum 2 in row 2, we need
        to place 2 in R2C1, and either 1 or a mirror (/) in R2C2. However, in
        the former case, we’d need a mirror (/) in R2C3, which is incompatible
        with the clue “18” (20) in column 3. So R2C2 contains a mirror (/), and
        R1C2 is 1 or 2. The clue 7 at right of row 2 then gives 1 in R2C7 and 6
        in R2C6.
      </p>
      <p>
        The sum “18” (20) in column 3 must be 2+3+4+5+6; this can’t be achieved
        if there is a mirror in R1C3, so R1C3 is 2, R2C3 is 3, and R1C2 is 1.
        The sum “16” (18) in column 4 can’t be achieved if there is a mirror in
        R1C4; so the sum must be 3+4+5+6, and we place 3 in R1C4 and 4 in R2C4
        (and hence 5 in R2C5).
      </p>
      <p>
        The sum “19” (21) in column 1 is 1+2+3+4+5+6, so the first digit
        encountered along that path must be 1. Since there is already a 1 in
        R1C2, R1C1 must be a mirror (\), and we complete the rest of row 1.
      </p>
      <p>
        The sum 3 at the right of row 4 can’t be achieved with a mirror in R4C7;
        so R4C7 is 3, R4C6 is 1 or 2, and there is a mirror in R4C4 or R4C5, and
        the digits above or below it in its column (depending on mirror
        orientation) are 1, 2 and 3. Thus, the mirror is in R4C5, oriented /,
        and we place 2,3,1 in R5-7C5 (in that order, to achieve the sum 4 at the
        bottom of column 5). We also place 6 in R3C5.
      </p>
      <p>
        The sum 7 in column 7 can’t be achieved if there is a mirror in R6C7; so
        R6C7 contains a digit, which must therefore be 5.
      </p>
      <p>
        R7C4 is either 5 or 6; the sum 6 at the bottom of column 4 forces it to
        be 6. And the 3 in row 7 must be in R7C2.
      </p>
      <p>
        R3C3 and R3C4 can’t contain mirrors, as there would be no way of
        achieving the column sums “18” (20) = 2+3+4+5+6 and “16” (18) = 3+4+5+6.
        Thus, the mirror in row 3 is in R3C7, necessarily oriented /, and R5C7
        is 4.
      </p>
      <p>
        In column 3, 4 must appear in row 3 or 4; hence R7C3 is 5 (and R7C1 is
        4). Since the column 3 sum requires 5 to be seen before 6 along the
        path, and the 5 in R7C3 isn’t visible from the top of column 3, the 6 in
        column 3 must also be shielded by the mirror; hence we place 6 in R6C3,
        and the last two mirrors are in R5C3 and R6C4 (orientations to be
        determined shortly).
      </p>
      <p>
        The last two 6’s are in R4-5 C1-2; the sum 6 at left forces them to be
        in R4C2 and R5C1. This in turn implies that the mirrors in R5C3 and R6C4
        are oriented /, so that the sums at the top of columns 3 and 4 can be
        achieved (a 6 must be seen along the path).
      </p>
      <p>
        The sum “18” (20) in column 3 now requires 5 to be in R5C2, and the rest
        of the grid then follows easily.
      </p>
      <h4>7. Japanese Sums or Products (base 12):</h4>
      <ImageWrapper>
        <LinkedImage
          src={solution7base12}
          alt="A solved 8x8 Japanese Sums or Products grid in base 12. One number has been substituted with a red-highlighted question mark, and one number has been substituted with a green-highlighted question mark."
        />
      </ImageWrapper>
      <p>R5C10 = ‘C’</p>
      <p>
        As in the base 10 version, we start with “packed” rows/columns: in rows
        1 and 4 the occupied cells are in columns 1, 3, 5, 7 and 8; we place 1
        and 3 in R1C1 and R1C3, while in R1C7-8 the product “56” (66) must be
        Bx6, in that order since “B” (11) doesn’t divide “840” (1200). Column 1
        now requires 2 or 3 in R2C1 (necessarily 3, with 2 in R2C2), 4 in R4C1,
        5 in R6C1, and 8 in R8C1, with the other cells remaining empty. As
        before, we place 2 in R2C2 and 1 in R6C2, while R2C3 and R6C3 remain
        empty.
      </p>
      <p>
        The sum “21” (25) in row 8 requires R8C2 and R8C3 to contain digits. In
        column 2, the product “56” (66) must be Bx6(x1) (Bx3x2(x1) isn’t an
        option since 2 is already in R2C2, and given the 1 in R6C2 we place 6
        and B in R7-8C2 (in that order due to the clue 8 in row 7). The other
        cells in column 2 remain empty. We can also place 2 in R7C3.
      </p>
      <p>
        And in column 6, the three sums/products 6 must be 6, 5+1, and one of
        4+2 or 3x2, in any order, so R2C6, R3C6, R5C6 and R8C6 can’t be empty.
      </p>
      <p>
        The product “840” (1200) in column 8 must be Ax6x5x4(x1) in some order
        (since we already have 6 in R1C8, the other possibilities Ax5x8x3(x1)
        and Ax5x4x3x2(x1) are excluded). In particular, R2-3C8 are occupied;
        since R2C6 is also occupied, R2C7 must be empty, R2C8 is 5, and R2C5-6
        contain 1 and 4 in either order. And since R3C8 can’t be 8, the two
        clues in row 3 must correspond to R3C3-4 and R3C6-8 respectively, while
        R3C5 remains empty.
      </p>
      <p>
        This in turn implies that “34” (40) in column 5 is a product Ax4 in that
        order (5x8 doesn’t fit); R2C6 is 1, and the clue 8 in row 3 must be a
        sum 5+2+1 in that order. We complete the product “840” (1200) in column
        8 by placing A in R4C8 (hence 7 in R3C8 to achieve the row sum “15”
        (17)) and 4 in R5C8. We then finish column 8: R6C8 is empty, and the
        product “48” (56) is 8x7 in this order.
      </p>
      <p>
        The “11” (13) clue in row 8 forces R8C7 to contain a digit, hence the
        sum “21” (25) in column 7 occupies all of rows 3-8. Moreover, R8C6 can’t
        be 6 (again due to the sum “11” in row 8), so R7C6 must contain a digit,
        R6C6 must remain empty, and R5C6 and R6C7 both contain 6.
      </p>
      <p>
        The clue “36” (42) in column 3 must be a product 7x6(x1) (the digits 2
        and 3 are already placed in column 3 so it can’t be 7x3x2). However 7
        can’t be in R3C3 (the clue “12” (14) in row 3 would then require a 2 in
        R3C4, but there is already a 2 in R3C7), nor in R4C3 (there is a 7 in
        R4C7), so 7 is in R5C3. We then place 1 in R4C3 and 6 in R3C3, as well
        as 8 in R3C4 to achieve the sum “12” (14) in row 3.
      </p>
      <p>
        R8C3 can’t be 6, so the sum “21” (25) in row 8 must occupy columns 1-4,
        and R8C5 is blank. The two sums in row 8 then give R8C3+R8C4 = R8C6+R8C7
        = 6: one of these is 1+5 and the other is 2+4. Since 1 and 5 are already
        placed in column 6, R8C6 and R8C7 must be 2 and 4 (in that order due to
        the 2 in R3C7), and R8C3-4 are 5 and 1.
      </p>
      <p>
        The two missing digits in the sum “21” (25) in column 7 (2,7,6,4 already
        placed) must add up to 6, hence R5C7 and R7C7 are 1 and 5 in either
        order.
      </p>
      <p>
        In row 5, the sum “32” (38) occupies columns 3-8. If R5C7 is 5, then
        R5C4-5 add up to 16, which isn’t possible without using twice the same
        digit. Thus R5C7 is 1, and R5C4-5 add up to 20, i.e. they are 9 and B in
        either order. Because of the sum “12” (14) in column 4, R5C4 must be B,
        while R5C5 is 9 (and we get 3 in R6C4 and 2 in R6C5).
      </p>
      <p>
        The sum “16” (18) in row 7 can’t be achieved without using R7C5; R7C5-6
        add up to 5, so they must be 1 and 4 in this order. Finally we place 5
        in R4C5 to achieve the column sum “15” (17).
      </p>
      <h4>8. Hungarian Tapa (base 12):</h4>
      <ImageWrapper>
        <LinkedImage
          src={solution8base12}
          alt="A solved 10x10 Hungarian Tapa grid in base 12. One number has been substituted with a red-highlighted question mark, and one number has been substituted with a green-highlighted question mark."
        />
      </ImageWrapper>
      <p>R9C5 = ‘A’</p>
      <p>
        The whole process of determining which cells are occupied or not is
        exactly as in the base 10 version—follow along the solution for that
        grid, up to the sentence “At this point it is easy to determine the
        remaining occupied cells; it remains to assign their values.” Only that
        final part of the solution differs. At this point you should have
        determined the occupied cells, the values of those in column 9, those
        which touch the “9 4” in R2C3, and placed 1, 2 and 4 in R5C1, R9C1 and
        R9C7 respectively.
      </p>
      <p>
        The “12” (14) sum in R6C1 must be 5+4+5. This in turn determines the
        position of the two 3’s touching R8C3, and we can also place 1 in R9C4
        and 2 in R10C4.
      </p>
      <p>
        The “20” (24) sum in R4C9 forces the partial sums by row to be as large
        as possible—12 in R5C8-10, 9 in R4C8-10, and 3 in R3C10. Thus we place 3
        in R3C10, 3+4+5 in R5C8-10, and 5+4 in R4C8-10.
      </p>
      <p>
        At this point we easily place the remaining digits in columns 1 and 10
        and in row 3, then those in row 7, and a 2 in R1C7, which then forces
        5+4 in R2C7-8 to achieve the sum “10” (12) in R1C8. The remaining digits
        are easy to place.
      </p>
      <h4>9. Doppelblock Sudoku (base 12):</h4>
      <ImageWrapper>
        <LinkedImage
          src={solution9base12}
          alt="A solved 9x9 Doppelblock Sudoku grid in base 12. One number has been substituted with a red-highlighted question mark, and one number has been substituted with a green-highlighted question mark."
        />
      </ImageWrapper>
      <p>R9C7 = ‘D’</p>
      <ul>
        <p>
          The “22” (26) sum in row 9 involves all digits except 2, which is in
          R9C1 or R9C9. The “23” (27) sum in column 5 involves all digits except
          1; since R9C5 can’t be black, we place black squares in R1C5 and R8C5,
          and 1 in R9C5.
        </p>
        <p>
          The “20” (24) sum in column 9 and the “21” (25) sum in column 7 both
          require a black square in rows 1-3 and another in rows 7-9. Thus the
          black squares of column 8 are in rows 4-6, and the black squares in
          row 9 are R9C2 and R9C9 (and R9C1 is 2).
        </p>
        <p>
          R9C7 can’t be 1 or 2, but the digits not between the black squares in
          column 7 add up to 3; so R9C7 is 3, and the black squares are in R1C7
          and R8C7. We also place 2 in R1C6.
        </p>
        <p>
          R3C9 can’t be black (due to the sum in row 3), so R2C9 is black and
          R1C9 is 4.
        </p>
        <p>
          Row 3: 1 is either in column 2 or 3, with the black squares on either
          side of it. But if 1 is in R3C2, then the black squares of box 1 are
          both in row 3, and R2C1-3 lie outside of the black squares of row 2;
          due to the sum “19” (21) in row 2, they add up to at most 7, hence
          must include the digit 1, which is impossible. So 1 is in R3C3, with
          black squares surrounding it on all four sides.
        </p>
        <p>
          Row 5: due to the sum “21” (25), the digits not between the black
          squares add up to 3; thus there is a black square in R5C1 or R5C2.
          Since both black squares have been placed in column 2, we conclude
          that R5C1 is black and R5C9 is 3.
        </p>
        <p>
          Looking at column 6, there is a black square in R4C6; we also place
          black squares in R6C8 and R7C1. Observing that R6C6 can’t be black (we
          can’t place a 6 in R6C7), we place the final two black squares in R6C4
          and R7C6.
        </p>
        <p>
          The sum 5 in column 6 must be 1+4, while the sum 6 in row 6 must be
          1+2+3. We place those digits uniquely, as well as the 1 and 3 in box
          4.
        </p>
        <p>
          The sum “11” (13) in row 7 requires a 1, which must be in R7C2.
          Moreover, the 3 in row 7 must be in R7C4. We can now also place the 1
          and 3 in box 4 (R4C1-2), and the 1 and 4 in box 6 (R5C7 and R4C8); we
          then get 4 in R7C7.
        </p>
        <p>
          It now follows that the sum “11” (13) in row 7 is 1+7+3+2, while
          R7C8-9 contain 5 and 6 in some order.
        </p>
        <p>
          Completing box 9, we must have 1 and 2 in R8C8-9 (in either order),
          and 7 in R9C8. We then place 6 in R9C3, while R9C5/7 are 4 and 5, and
          R8C6 is 7.
        </p>
      </ul>
      <p>
        The rest of the grid is now easily solved using standard Sudoku
        techniques (+ at some point, remembering that the “19” (21) clue in row
        2 forces R2C1-2 to add up to 7).
      </p>
      <h4>10. Index Yajilin (base 12):</h4>
      <ImageWrapper>
        <LinkedImage
          src={solution10base12}
          alt="A solved 12x12 Index Yajilin grid in base 12. One number has been substituted with a red-highlighted question mark, and one number has been substituted with a green-highlighted question mark."
        />
      </ImageWrapper>
      <p>R4C10 = ‘E’.</p>
      <p>
        As in the base 10 version, one starts with the sum 3 in row 3 (a single
        black cell at distance 3), and the edges of the grid, recalling that
        black cells along the edges are separated by groups of at least two
        white cells. In the rightmost column, the sum “19” (21) must be 10+7+4.
        In the bottom-most row, the sum “18” (20) must be 10+7+3. These also
        give us various portions of the loop along the bottom and right edges.
      </p>
      <p>
        Since the loop occupies the last three cells of row 1 and of column 1,
        the sum “10” (12) in column 1 must be 7+4+1, and the sum “11” (13) in
        row 1 must be 8+5. This gives us more portions of the loop along those
        edges.
      </p>
      <p>
        The sum “16” (18) in row 10 must be 9+5+3+1, forcing the path of the
        loop in the last 3 rows and also at the far right end of the two
        preceding rows.
      </p>
      <p>
        The sum “11” (13) in row 8 must be 10+3, given the already placed black
        square in the last column. Given this, the sum 5 in column 9 must be a
        single black square at distance 5. This forces the path of the loop in
        the upper-right part of the grid, and then some more at center-right.
        The sum 9 in column 6 must be 1+3+5, and it is then not hard to complete
        the rest of the grid.
      </p>
      <p>
        <strong>
          Solution: <Mono>A BAD DECADE</Mono>
        </strong>
      </p>
      <p>
        (as spelled out by the letters in the extraction grid pointed at by the
        base 12 grids.)
      </p>
    </>
  );
};

export default Solution;
