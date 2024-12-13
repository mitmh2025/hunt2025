import React from "react";
import { styled } from "styled-components";

const StyledTable = styled.table`
  width: 100%;
  td {
    text-align: center;
    vertical-align: middle;
    padding: 0 1em;
  }
`;

const Puzzle = () => {
  return (
    <>
      <p className="puzzle-flavor">How did Ferdinand get out of the country?</p>
      <StyledTable>
        <tbody>
          <tr>
            <td>January 1, 1921</td>
            <td>January 1, 1939</td>
            <td>January 1, 1946</td>
            <td>January 1, 1993</td>
          </tr>
        </tbody>
      </StyledTable>
    </>
  );
};

export default Puzzle;
