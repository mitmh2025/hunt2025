import React from "react";
import type { PuzzleState, TeamHuntState } from "../../../../lib/api/client";

const Puzzle = ({
  teamState,
  puzzleState,
}: {
  teamState: TeamHuntState;
  puzzleState: PuzzleState;
}): JSX.Element => {
  const inlineScript = `window.initialTeamState = ${JSON.stringify(teamState)}; window.initialPuzzleState = ${JSON.stringify(puzzleState)}`;
  return (
    <>
      <noscript>This puzzle requires Javascript.</noscript>
      <script dangerouslySetInnerHTML={{ __html: inlineScript }} />
      <div id="and-now-a-puzzling-word-from-our-sponsors-root" />
    </>
  );
};

export default Puzzle;
