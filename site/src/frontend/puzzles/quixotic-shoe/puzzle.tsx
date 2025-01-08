import React from "react";
import type { PuzzleState, TeamHuntState } from "../../../../lib/api/client";

const Puzzle = ({ teamState }: { teamState: TeamHuntState }): JSX.Element => {
  const inlineScript = `window.initialTeamState = ${JSON.stringify(teamState)};`;
  return (
    <>
      <noscript>This puzzle requires Javascript.</noscript>
      <script dangerouslySetInnerHTML={{ __html: inlineScript }} />
      <div id="and-now-a-puzzling-word-from-our-sponsors-root" />
    </>
  );
};

export default Puzzle;
