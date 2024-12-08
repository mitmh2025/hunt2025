import React from "react";
import { hydrateRoot } from "react-dom/client";
import { type TeamHuntState } from "../../../../lib/api/client";
import useDataset from "../../client/useDataset";
import PaperTrailBody from "./PaperTrailBody";
import { type PaperTrailState } from "./types";

const PaperTrailManager = ({
  initialState,
  initialTeamState,
}: {
  initialState: PaperTrailState;
  initialTeamState: TeamHuntState;
}) => {
  const state = useDataset("paper_trail", undefined, initialState);
  const teamState = useDataset("team_state", undefined, initialTeamState);
  return <PaperTrailBody state={state} teamState={teamState} />;
};

const elem = document.getElementById("paper-trail-root");
if (elem) {
  const state = (
    window as unknown as { initialPaperTrailState: PaperTrailState }
  ).initialPaperTrailState;
  const teamState = (window as unknown as { initialTeamState: TeamHuntState })
    .initialTeamState;
  hydrateRoot(
    elem,
    <PaperTrailManager initialState={state} initialTeamState={teamState} />,
  );
} else {
  console.error(
    "Could not mount PaperTrailManager because #paper-trail-root was nowhere to be found",
  );
}
