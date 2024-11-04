import React from "react";
import { styled } from "styled-components";
import { Display, OutputBlock } from "./shared";

const CenteredMonospaceP = styled.p`
  display: block;
  text-align: center;
  font-family: monospace;
`;

const CenteredDivRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  text-align: center;
  margin-bottom: 32px;
  > * {
    margin: 16px;
  }
`;

const CustomLabeledDisplay = ({
  outputs,
  labels,
}: {
  outputs: [
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
  ];
  labels: (string | number | undefined)[];
}) => {
  return (
    <table>
      <tbody>
        <tr>
          <td>
            <OutputBlock state={outputs[0]} label={labels[0] ?? ""} />
          </td>
          <td>
            <OutputBlock state={outputs[1]} label={labels[1] ?? ""} />
          </td>
          <td>
            <OutputBlock state={outputs[2]} label={labels[2] ?? ""} />
          </td>
        </tr>
        <tr>
          <td>
            <OutputBlock state={outputs[3]} label={labels[3] ?? ""} />
          </td>
          <td>
            <OutputBlock state={outputs[4]} label={labels[4] ?? ""} />
          </td>
          <td>
            <OutputBlock state={outputs[5]} label={labels[5] ?? ""} />
          </td>
        </tr>
        <tr>
          <td>
            <OutputBlock state={outputs[6]} label={labels[6] ?? ""} />
          </td>
          <td>
            <OutputBlock state={outputs[7]} label={labels[7] ?? ""} />
          </td>
          <td>
            <OutputBlock state={outputs[8]} label={labels[8] ?? ""} />
          </td>
        </tr>
      </tbody>
    </table>
  );
};

const Solution = () => {
  return (
    <>
      <p>
        Solvers are presented with two side-by-side 3x3 grids of lights. The
        left-hand grid is initially all dark, while the right-hand grid
        initially has one light lit. The right-hand grid also has its cells
        numbered one through nine. Solvers will shortly find that the left-hand
        grid can be interacted with to cycle each light between three states:
        dark, dim, and bright. As they do so, the lights in the right-hand grid
        change in response.
      </p>
      <p>
        Through experimentation, solvers should discover the rules that govern
        the state of the right-hand grid’s lights. These rules are based on the
        state of the input grid on the left-hand side. All references to cells,
        columns, rows, etc. in the rules refer only to the state of the input
        grid. Where numerical values are described, 0 is dark, 1 is dim, and 2
        is bright. The rules, with numbers given by the output grid labeling,
        are:
      </p>
      <ol>
        <li>The brightness level of the central cell.</li>
        <li>
          The number of pairwise swaps needed to sort the central column so that
          brighter lights are higher.
        </li>
        <li>
          The total value of the four lights on the edges of the grid, modulo 3.
        </li>
        <li>The number of grid-aligned mirror symmetries of the grid.</li>
        <li>
          The absolute difference between the upper-left and lower-right lights.
        </li>
        <li>
          The absolute difference between the upper-right and lower-left lights.
        </li>
        <li>The number of brightnesses present, less one.</li>
        <li>
          The brightness of the longest grid-aligned, contiguous run of lights;
          ties in length go to brighter lights.
        </li>
        <li>
          The zero-indexed position of the dimmest column; ties in dimness go to
          lower indices.
        </li>
      </ol>
      <p>
        As the input grid is manipulated and the output grid changes, a line of
        nine lights below the two grids “fills up” to various levels, lighting
        up from left to right. Solvers should discover that the number of lit
        lights in this row is equal to the number of lights in the output grid
        that are of the same brightness as the light in the input grid in the
        same position. This indicates that the goal here is to make the input
        and output grids identical.
      </p>
      <p>There is exactly one input grid which accomplishes this:</p>
      <CenteredDivRow>
        <Display outputs={[0, 1, 0, 0, 0, 1, 1, 1, 0]} />
      </CenteredDivRow>
      <p>
        When solvers manipulate the input grid to this state, the output grid is
        the same, and the nine indicator lights are lit.
      </p>

      <p>
        At this time, solvers are provided with five grids of numbers each the
        total set 1-9, namely:
      </p>

      <CenteredMonospaceP>
        123
        <br />
        456
        <br />
        789
        <br />
        <br />
        584
        <br />
        231
        <br />
        967
        <br />
        <br />
        869
        <br />
        245
        <br />
        317
        <br />
        <br />
        428
        <br />
        375
        <br />
        961
        <br />
        <br />
        612
        <br />
        593
        <br />
        847
      </CenteredMonospaceP>

      <p>
        These represent orderings of the same nine rules as the interactive
        portion of the puzzle, the first being the ordering originally given.
        Solvers must determine what input grids would produce matching output
        grids if the rules were arranged in the output grids in these orders,
        rather than in the sequential 1-9 of the originally presented output
        grid. As before, each new arrangement of the rules has exactly one input
        grid which will produce an identical output grid. These are:
      </p>

      <CenteredDivRow>
        <CustomLabeledDisplay
          outputs={[1, 1, 0, 1, 0, 0, 1, 1, 2]}
          labels={[]}
        />
      </CenteredDivRow>
      <CenteredDivRow>
        <CustomLabeledDisplay
          outputs={[1, 1, 1, 0, 0, 1, 2, 0, 2]}
          labels={[]}
        />
      </CenteredDivRow>
      <CenteredDivRow>
        <CustomLabeledDisplay
          outputs={[0, 1, 0, 0, 2, 2, 0, 0, 2]}
          labels={[]}
        />
      </CenteredDivRow>
      <CenteredDivRow>
        <CustomLabeledDisplay
          outputs={[1, 2, 0, 1, 2, 0, 1, 0, 2]}
          labels={[]}
        />
      </CenteredDivRow>

      <p>
        With an understanding of the rules, these grids may be logically deduced
        without evaluating all 3<sup>9</sup> = 19,683 possible grids. See below
        for an example deduction of the first grid.
      </p>

      <p>
        The format of these grids lends itself to a ternary (base 3)
        interpretation, especially as 3-digit ternary numbers run in value from
        0 to 26, the same number of letters as the alphabet. Reading each row in
        the self-reproducing grids as a 3-digit ternary number and interpreting
        these as letters, the five grids read <code>CAL LIN MAT CHB OOK</code>,
        instructing the solver to call in the answer <code>MATCHBOOK</code>.
      </p>

      <p>Example deduction of the first grid:</p>
      <p>
        In discussing this deduction, a through i will be used to refer to the
        value of each cell, and 1 through 9 to refer to the rules. To achieve
        the desired result of the output grid being the same as the input grid,
        1 must evaluate to the value of a, 2 to the value of b, etc.
      </p>

      <CenteredDivRow>
        <CustomLabeledDisplay
          outputs={[2, 2, 2, 2, 2, 2, 2, 2, 2]}
          labels={["a", "b", "c", "d", "e", "f", "g", "h", "i"]}
        />
        <span>→</span>
        <CustomLabeledDisplay
          outputs={[2, 2, 2, 2, 2, 2, 2, 2, 2]}
          labels={[1, 2, 3, 4, 5, 6, 7, 8, 9]}
        />
      </CenteredDivRow>

      <p>Some immediate facts:</p>
      <ul>
        <li>a and e are equal per 1.</li>
        <li>
          b is not white, as 2 only evaluates to white when the central column
          has all three colors out of place.
        </li>
        <li>
          g is not black, as per 7 this would make the entire grid black, but an
          all black grid would have 4 evaluate to white.
        </li>
        <li>a and e being equal restricts i, as 5 compares a and i.</li>
      </ul>
      <p>
        These considerations on a, e, and i leave us with four candidate grids.
      </p>

      <CenteredDivRow>
        <CustomLabeledDisplay
          outputs={[0, 2, 2, 2, 0, 2, 2, 2, 0]}
          labels={["", "?", "?", "?", "", "?", "?", "?", ""]}
        />
        <CustomLabeledDisplay
          outputs={[1, 2, 2, 2, 1, 2, 2, 2, 0]}
          labels={["", "?", "?", "?", "", "?", "?", "?", ""]}
        />
      </CenteredDivRow>
      <CenteredDivRow>
        <CustomLabeledDisplay
          outputs={[1, 2, 2, 2, 1, 2, 2, 2, 2]}
          labels={["", "?", "?", "?", "", "?", "?", "?", ""]}
        />
        <CustomLabeledDisplay
          outputs={[2, 2, 2, 2, 2, 2, 2, 2, 0]}
          labels={["", "?", "?", "?", "", "?", "?", "?", ""]}
        />
      </CenteredDivRow>

      <p>
        Looking further at the first grid, we know g is not black. This means,
        comparing g to a and i, both horizontal and vertical symmetries are
        broken. d is black to match 4.
      </p>

      <CenteredDivRow>
        <CustomLabeledDisplay
          outputs={[0, 2, 2, 0, 0, 2, 2, 2, 0]}
          labels={["", "?", "?", "", "", "?", "?", "?", ""]}
        />
      </CenteredDivRow>

      <p>
        As g is not black, the leftmost column has total brightness greater than
        zero. i being black, 9 says that the leftmost column is not brighter
        than either other column. If b were black, by 2 the center column would
        have to already be sorted, making h black and the central column all
        black, dimmer than the left column. b therefore is not black, and must
        be grey. h must then also be grey, as h being black would make 2 return
        black and h being white would make 2 return white.
      </p>

      <CenteredDivRow>
        <CustomLabeledDisplay
          outputs={[0, 1, 2, 0, 0, 2, 2, 1, 0]}
          labels={["", "", "?", "", "", "?", "?", "", ""]}
        />
      </CenteredDivRow>

      <p>
        h being grey, 8 says that the longest run of cells is grey. As there are
        already black runs of 2, there must be a grey run of at least 2. This is
        only possible if at least one of c or g are grey. This means that 6,
        comparing c and g, must return either black or grey, setting f. 3 takes
        the sum of b, d, f, and h. If f is black, 3 returns white, and if f is
        grey, 3 returns black. Thus c is either white or black, not grey. As we
        have said at least one of c or g is grey, this means g is grey.
      </p>

      <CenteredDivRow>
        <CustomLabeledDisplay
          outputs={[0, 1, 2, 0, 0, 2, 1, 1, 0]}
          labels={["", "", "?", "", "", "?", "", "", ""]}
        />
      </CenteredDivRow>

      <p>
        For 7 to return grey, there can only be two brightnesses present on the
        board. Neither c nor f can be white. Considering the two options laid
        out in the previous step, only one matches this criterion.
      </p>

      <CenteredDivRow>
        <CustomLabeledDisplay
          outputs={[0, 1, 0, 0, 0, 1, 1, 1, 0]}
          labels={[]}
        />
      </CenteredDivRow>

      <p>
        Checking each of the nine rules, we find that this grid returns itself
        as an output for the original ordering of the rule outputs, as desired.
        This is a solution.
      </p>
      <p>
        To be complete, we should also show that this is the only solution. Each
        of the other three candidate grids can be shown to be unsatisfiable. The
        key to the method used here is to determine that g must be white, which
        will sometimes take some additional steps.
      </p>
      <p>
        In all three cases, b being black would produce an unsorted middle
        column, contradicting 2, meaning that b must be grey.
      </p>

      <CenteredDivRow>
        <CustomLabeledDisplay
          outputs={[1, 1, 2, 2, 1, 2, 2, 2, 0]}
          labels={["", "", "?", "?", "", "?", "?", "?", ""]}
        />
        <CustomLabeledDisplay
          outputs={[1, 1, 2, 2, 1, 2, 2, 2, 2]}
          labels={["", "", "?", "?", "", "?", "?", "?", ""]}
        />
        <CustomLabeledDisplay
          outputs={[2, 1, 2, 2, 2, 2, 2, 2, 0]}
          labels={["", "", "?", "?", "", "?", "?", "?", ""]}
        />
      </CenteredDivRow>

      <p>
        In the first of these candidate grids, the only way to have 2 evaluate
        to grey is to have h be white. With this in place, the grid has all
        three brightnesses, making g white to match 7.
      </p>

      <CenteredDivRow>
        <CustomLabeledDisplay
          outputs={[1, 1, 2, 2, 1, 2, 2, 2, 0]}
          labels={["", "", "?", "?", "", "?", "", "", ""]}
        />
      </CenteredDivRow>

      <p>
        As i is black, all columns must be at least as bright as the leftmost
        column, meaning that c+f ≥ 3. 6 compares c and g, so that f = 2 - c. c +
        f = 2, which is less than 3. This grid offers no solutions.
      </p>

      <p>
        The second of the candidates above also must have h white for the same
        reason.
      </p>

      <CenteredDivRow>
        <CustomLabeledDisplay
          outputs={[1, 1, 2, 2, 1, 2, 2, 2, 2]}
          labels={["", "", "?", "?", "", "?", "?", "", ""]}
        />
      </CenteredDivRow>

      <p>
        This has broken vertical symmetry. With i being white, the grid cannot
        have horizontal symmetry. By the tie-breaking of rule 9, a grid with
        horizontal symmetry will always have 9 return either black or grey. As
        such, 4 must return black, setting d to black. This makes all three
        brightnesses present, setting g to white to match 7.
      </p>

      <CenteredDivRow>
        <CustomLabeledDisplay
          outputs={[1, 1, 2, 0, 1, 2, 2, 2, 2]}
          labels={["", "", "?", "", "", "?", "", "", ""]}
        />
      </CenteredDivRow>

      <p>
        As i is white, 9 must return white, meaning the right column is strictly
        dimmer than all other columns. This is only satisfied if c and f are
        both black. However, this would make 6 return white, not matching f.
        This grid offers no solutions.
      </p>

      <p>
        Looking at the last candidate grid, all three colors are present,
        setting g to white to match 7.
      </p>

      <CenteredDivRow>
        <CustomLabeledDisplay
          outputs={[2, 1, 2, 2, 2, 2, 2, 2, 0]}
          labels={["", "", "?", "?", "", "?", "", "?", ""]}
        />
      </CenteredDivRow>

      <p>
        For 9 to return black, no column can be dimmer than the left column. The
        total brightness of that column is at least 4. This means c+f ≥ 4. By
        rule 6, f = |g - c| = 2 - c, so c+f = 2, which is less than 4. This grid
        is unsatisfiable and offers no solutions.
      </p>

      <p>
        Thus the solution found earlier is proved to be the unique solution.
      </p>

      <h2>Author’s Note</h2>
      <p>
        This puzzle was created as a sequel to 2018’s Lest You Be, which I was
        also the lead author on. Both are in the genre of determining unknown
        rules based on observing inputs and outputs, then using understanding of
        the rules for the next step. Lest You Be was directly inspired by a
        “post making contest” on an online community message board I frequented,
        and this puzzle by a “Grid Zendo” game in another online community.
      </p>
      <p>
        The original title of this puzzle was Gin and Tonic. This was based on
        my thinking of the input grids with identical outputs as quines, so that
        each was a nine-digit quine. Quine nine, quinine, gin and tonic.
        However, this wasn’t helpful in leading solvers to see what they should
        be doing, so the title was changed to the more useful Follow The Rules.
      </p>
    </>
  );
};

export default Solution;
