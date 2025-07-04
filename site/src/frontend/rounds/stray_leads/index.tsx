import React from "react";
import { type TeamHuntState } from "../../../../lib/api/client";
import { PUZZLES } from "../../puzzles";
import archiveMode from "../../utils/archiveMode";
import StrayLeadsBody from "./StrayLeadsBody";
import { type StrayLeadsState } from "./types";

export function strayLeadsState(teamState: TeamHuntState): StrayLeadsState {
  const leads = Object.entries(teamState.puzzles).flatMap(
    ([slug, puzzleObj]) => {
      if (puzzleObj.stray) {
        const puzzleState = PUZZLES[slug];
        const round =
          puzzleObj.round === "stray_leads" ? undefined : puzzleObj.round;
        const roundTitle = round ? teamState.rounds[round]?.title : undefined;
        return [
          {
            slug,
            title: puzzleState?.title ?? `Stub puzzle for slug ${slug}`,
            ...(round ? { round, roundTitle } : {}),
          },
        ];
      } else {
        return [];
      }
    },
  );

  const reserveNote =
    archiveMode &&
    typeof window !== "undefined" &&
    teamState.gates_satisfied.includes("hunt_started") &&
    !teamState.gates_satisfied.includes("hunt_closed");

  return {
    epoch: teamState.epoch,
    leads,
    ...(reserveNote ? { reserveNote: true } : {}),
  };
}

const StrayLeadsRoundPage = ({ teamState }: { teamState: TeamHuntState }) => {
  const state = strayLeadsState(teamState);
  const inlineScript = `window.initialStrayLeadsState = ${JSON.stringify(state)}; window.initialTeamState = ${JSON.stringify(teamState)};`;
  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: inlineScript }} />
      <div id="stray-leads-root">
        <StrayLeadsBody state={state} teamState={teamState} />
      </div>
    </>
  );
};

export default StrayLeadsRoundPage;
