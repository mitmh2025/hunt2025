import React from "react";
import type { TeamHuntState } from "../../../../lib/api/client";
import { type PuzzleStateLogEntry } from "../../../../lib/api/frontend_contract";
import { PuzzlingWordFromOurSponsors } from "./PuzzlingWordFromOurSponsors";

const Puzzle = ({
  teamState,
  puzzleStateLog,
}: {
  teamState: TeamHuntState;
  puzzleStateLog?: PuzzleStateLogEntry[];
}): JSX.Element => {
  const inlineScript = `window.initialTeamState = ${JSON.stringify(teamState)};`;
  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: inlineScript }} />
      <div id="and-now-a-puzzling-word-from-our-sponsors-root">
        <PuzzlingWordFromOurSponsors
          teamState={teamState}
          puzzleStateLog={puzzleStateLog ?? []}
        />
      </div>
    </>
  );
};

export default Puzzle;
