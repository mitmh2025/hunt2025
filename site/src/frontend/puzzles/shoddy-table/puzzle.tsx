import React from "react";
import { styled } from "styled-components";
import spreadsheet from "./assets/10000sheets.xlsx";

const BreakableCode = styled.code`
  overflow-wrap: anywhere;
`;

const Puzzle = () => {
  return (
    <>
      <p className="puzzle-flavor">Start with what you can see.</p>

      <p>
        <a href={spreadsheet}>10000sheets.xlsx</a> (size:{" "}
        <BreakableCode>13366337</BreakableCode> bytes; sha256{" "}
        <BreakableCode>
          12fa078ffc3c0c7513655d0224f60eddc3078ef3f512a74155c4e949eff94fc9
        </BreakableCode>
        )
      </p>
    </>
  );
};

export default Puzzle;
