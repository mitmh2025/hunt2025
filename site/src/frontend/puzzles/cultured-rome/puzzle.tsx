import React from "react";
import { styled } from "styled-components";

const Mono = styled.span`
  font-family: monospace;
`;

const StyledTable = styled.table`
  margin-left: -16px;
  margin-bottom: 1em;
  border-spacing: 16px 4px;
  td {
    padding: 0px;
  }
  td:first-child {
    padding-left: 0px;
  }
`;

const WordBank = styled.table`
  border-collapse: separate;
  td {
    padding: 0px 16px;
  }
  td:first-child {
    padding-left: 0px;
  }
`;

const Highlighted = styled.td`
  background-color: var(--gold-500);
`;

const Puzzle = (): JSX.Element => {
  return (
    <>
      <p>
        We came up with a neat list of anagrams for puzzle answers (even though
        the spacing is all over the place). And we went to great lengths to pick
        just the right clue words, but due to a slight accident the clue words
        got sorted together. So now, uh, you get the answers instead of the
        clues. Please help?
      </p>
      <StyledTable>
        <tr>
          <td>1.</td>
          <td>
            <Mono>POTTER VISCERA</Mono>
          </td>
          <Highlighted>_____</Highlighted>
          <td>_____</td>
          <td>_____</td>
          <Highlighted>_____</Highlighted>
        </tr>
        <tr>
          <td>2.</td>
          <td>
            <Mono>COVERT PARTIES</Mono>
          </td>
          <td>_____</td>
          <Highlighted>_____</Highlighted>
          <Highlighted>_____</Highlighted>
          <Highlighted>_____</Highlighted>
        </tr>
        <tr>
          <td>3.</td>
          <td>
            <Mono>TRAVERSE TOPIC</Mono>
          </td>
          <Highlighted>_____</Highlighted>
          <Highlighted>_____</Highlighted>
          <td>_____</td>
          <Highlighted>_____</Highlighted>
        </tr>
        <tr>
          <td>4.</td>
          <td>
            <Mono>PIRATE VECTORS</Mono>
          </td>
          <Highlighted>_____</Highlighted>
          <Highlighted>_____</Highlighted>
          <Highlighted>_____</Highlighted>
        </tr>
        <tr>
          <td>5.</td>
          <td>
            <Mono>PRIVATE SECTOR</Mono>
          </td>
          <td>_____</td>
          <Highlighted>_____</Highlighted>
          <td>_____</td>
          <Highlighted>_____</Highlighted>
          <Highlighted>_____</Highlighted>
          <td>_____</td>
        </tr>
        <tr>
          <td>6.</td>
          <td>
            <Mono>CATERER PIVOTS</Mono>
          </td>
          <td>_____</td>
          <Highlighted>_____</Highlighted>
          <td>_____</td>
          <Highlighted>_____</Highlighted>
        </tr>
        <tr>
          <td>7.</td>
          <td>
            <Mono>ACTIVE REPORTS</Mono>
          </td>
          <Highlighted>_____</Highlighted>
          <td>_____</td>
          <Highlighted>_____</Highlighted>
          <Highlighted>_____</Highlighted>
          <td>_____</td>
        </tr>
        <tr>
          <td>8.</td>
          <td>
            <Mono>TAPER VORTICES</Mono>
          </td>
          <td>_____</td>
          <Highlighted>_____</Highlighted>
          <Highlighted>_____</Highlighted>
          <td>_____</td>
          <td>_____</td>
        </tr>
        <tr>
          <td>9.</td>
          <td>
            <Mono>REPEAT VICTORS</Mono>
          </td>
          <Highlighted>_____</Highlighted>
          <td>_____</td>
          <Highlighted>_____</Highlighted>
          <td>_____</td>
        </tr>
        <tr>
          <td>10.</td>
          <td>
            <Mono>CREATIVE PORTS</Mono>
          </td>
          <Highlighted>_____</Highlighted>
          <td>_____</td>
          <Highlighted>_____</Highlighted>
          <td>_____</td>
          <td>_____</td>
        </tr>
      </StyledTable>
      <p>Clue Words:</p>
      <WordBank>
        <tr>
          <td>
            <Mono>ACROSS</Mono>
          </td>
          <td>
            <Mono>GO</Mono>
          </td>
          <td>
            <Mono>SECRET</Mono>
          </td>
        </tr>
        <tr>
          <td>
            <Mono>AGAIN</Mono>
          </td>
          <td>
            <Mono>GRADUALLY</Mono>
          </td>
          <td>
            <Mono>SPIRAL</Mono>
          </td>
        </tr>
        <tr>
          <td>
            <Mono>AREA</Mono>
          </td>
          <td>
            <Mono>GROUP</Mono>
          </td>
          <td>
            <Mono>STANCE</Mono>
          </td>
        </tr>
        <tr>
          <td>
            <Mono>CERTAIN</Mono>
          </td>
          <td>
            <Mono>INSIDES</Mono>
          </td>
          <td>
            <Mono>STATE</Mono>
          </td>
        </tr>
        <tr>
          <td>
            <Mono>COMPUTER</Mono>
          </td>
          <td>
            <Mono>LIVELY</Mono>
          </td>
          <td>
            <Mono>SUBJECT</Mono>
          </td>
        </tr>
        <tr>
          <td>
            <Mono>CONNECTION</Mono>
          </td>
          <td>
            <Mono>MATTER</Mono>
          </td>
          <td>
            <Mono>TEENAGE</Mono>
          </td>
        </tr>
        <tr>
          <td>
            <Mono>CONTROL</Mono>
          </td>
          <td>
            <Mono>NETWORK</Mono>
          </td>
          <td>
            <Mono>TPS</Mono>
          </td>
        </tr>
        <tr>
          <td>
            <Mono>DIMINISH</Mono>
          </td>
          <td>
            <Mono>NOT</Mono>
          </td>
          <td>
            <Mono>TURNS</Mono>
          </td>
        </tr>
        <tr>
          <td>
            <Mono>ECONOMIC</Mono>
          </td>
          <td>
            <Mono>PATHS</Mono>
          </td>
          <td>
            <Mono>UNDER</Mono>
          </td>
        </tr>
        <tr>
          <td>
            <Mono>EVENTS</Mono>
          </td>
          <td>
            <Mono>PEOPLE</Mono>
          </td>
          <td>
            <Mono>UNUSUAL</Mono>
          </td>
        </tr>
        <tr>
          <td>
            <Mono>EXAMPLE</Mono>
          </td>
          <td>
            <Mono>POINTS</Mono>
          </td>
          <td>
            <Mono>VANQUISH</Mono>
          </td>
        </tr>
        <tr>
          <td>
            <Mono>FILES</Mono>
          </td>
          <td>
            <Mono>POOLS</Mono>
          </td>
          <td>
            <Mono>WATER</Mono>
          </td>
        </tr>
        <tr>
          <td>
            <Mono>FOOD</Mono>
          </td>
          <td>
            <Mono>PROVIDER</Mono>
          </td>
          <td>
            <Mono>WHO</Mono>
          </td>
        </tr>
        <tr>
          <td>
            <Mono>FOR</Mono>
          </td>
          <td>
            <Mono>ROBBER</Mono>
          </td>
          <td>
            <Mono>WIZARD</Mono>
          </td>
        </tr>
        <tr>
          <td>
            <Mono>FUN</Mono>
          </td>
          <td>
            <Mono>SEA</Mono>
          </td>
        </tr>
      </WordBank>
    </>
  );
};

export default Puzzle;
