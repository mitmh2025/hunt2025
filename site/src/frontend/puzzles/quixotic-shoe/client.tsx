import React from "react";
import { createRoot } from "react-dom/client";
import type { TeamHuntState } from "../../../../lib/api/client";
import type { PuzzleStateLogEntry } from "../../../../lib/api/frontend_contract";
import useAppendDataset from "../../client/useAppendDataset";
import useDataset from "../../client/useDataset";
import { PuzzlingWordFromOurSponsors } from "./PuzzlingWordFromOurSponsors";

const PuzzlingWordFromOurSponsorsManager = ({
  initialTeamState,
  initialPuzzleStateLog,
}: {
  initialTeamState: TeamHuntState;
  initialPuzzleStateLog: PuzzleStateLogEntry[];
}): JSX.Element => {
  const teamState = useDataset("team_state", undefined, initialTeamState);
  const puzzleStateLog = useAppendDataset(
    "puzzle_state_log",
    { slug: "and_now_a_puzzling_word_from_our_sponsors" },
    initialPuzzleStateLog,
  );

  return (
    <PuzzlingWordFromOurSponsors
      teamState={teamState}
      puzzleStateLog={puzzleStateLog}
    />
  );
};

const elem = document.getElementById(
  "and-now-a-puzzling-word-from-our-sponsors-root",
);
if (elem) {
  const root = createRoot(elem);
  const initialTeamState = (
    window as unknown as { initialTeamState: TeamHuntState }
  ).initialTeamState;
  const initialPuzzleStateLog = (
    window as unknown as {
      initialPuzzleStateLog: PuzzleStateLogEntry[];
    }
  ).initialPuzzleStateLog;
  root.render(
    <PuzzlingWordFromOurSponsorsManager
      initialTeamState={initialTeamState}
      initialPuzzleStateLog={initialPuzzleStateLog}
    />,
  );
} else {
  console.error(
    "Could not mount App because #and-now-a-puzzling-word-from-our-sponsors-root was nowhere to be found",
  );
}
