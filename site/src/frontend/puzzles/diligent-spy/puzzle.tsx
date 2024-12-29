import React from "react";
import { Math, MFrac, MI, MN, MRow } from "../../components/MathML";

import "./assets/numbers.opus";
import "./assets/static.opus";

const Puzzle = () => (
  <p>
    Scanning late at night, you notice a faint signal from your radio on a
    MITropolis-based numbers station, PM{" "}
    <Math>
      <MFrac>
        <MRow>
          <MN>37</MN>
          <MI>π</MI>{" "}
        </MRow>
        <MN>20</MN>
      </MFrac>
    </Math>
    .
  </p>
);

export default Puzzle;
