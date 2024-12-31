import React from "react";
import { hydrateRoot } from "react-dom/client";
import { type TeamHuntState } from "../../../../lib/api/client";
import useDataset from "../../client/useDataset";
import StrayLeadsBody from "./StrayLeadsBody";
import { type StrayLeadsState } from "./types";

const StrayLeadsManager = ({
  initialState,
  initialTeamState,
}: {
  initialState: StrayLeadsState;
  initialTeamState: TeamHuntState;
}) => {
  const state = useDataset("stray_leads", undefined, initialState);
  const teamState = useDataset("team_state", undefined, initialTeamState);
  return <StrayLeadsBody state={state} teamState={teamState} />;
};

const elem = document.getElementById("stray-leads-root");
if (elem) {
  const state = (
    window as unknown as { initialStrayLeadsState: StrayLeadsState }
  ).initialStrayLeadsState;
  const teamState = (window as unknown as { initialTeamState: TeamHuntState })
    .initialTeamState;
  hydrateRoot(
    elem,
    <StrayLeadsManager initialState={state} initialTeamState={teamState} />,
  );
} else {
  console.error(
    "Could not mount StrayLeadsManager because #stray-leads-root is nowhere to be found",
  );
}
