import React from "react";
import renderRoot from "../../utils/renderRoot";
import {
  SolutionCannedResponseTable,
  SolutionHintTable,
} from "../components/SolutionLayout";
import type { CannedResponse, Hint } from "../puzzles/types";

const hintsElem = document.getElementById("solution-hints");
if (hintsElem) {
  const hints = (window as unknown as { hints: Hint[] }).hints;
  console.log("mounting hints");
  renderRoot(hintsElem, <SolutionHintTable hints={hints} />);
}

const cannedResponseElem = document.getElementById("solution-canned-responses");
if (cannedResponseElem) {
  const cannedRepsonses = (
    window as unknown as { cannedResponses: CannedResponse[] }
  ).cannedResponses;
  console.log("mounting canned responses");
  renderRoot(
    cannedResponseElem,
    <SolutionCannedResponseTable cannedResponses={cannedRepsonses} />,
  );
}
