import React from "react";
import spreadsheet from "./assets/10000sheets.xlsx";

const Puzzle = () => {
  return (
    <>
      <p className="puzzle-flavor">Start with what you can see.</p>

      <p>
        <a href={spreadsheet}>10000sheets.xlsx</a> (size: <code>13366337</code>{" "}
        bytes; sha256{" "}
        <code>
          12fa078ffc3c0c7513655d0224f60eddc3078ef3f512a74155c4e949eff94fc9
        </code>
        )
      </p>
    </>
  );
};

export default Puzzle;
