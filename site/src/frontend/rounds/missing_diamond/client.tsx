import React from "react";
import { hydrateRoot } from "react-dom/client";
import { type TeamHuntState } from "../../../../lib/api/client";
import useDataset from "../../client/useDataset";
import MissingDiamondBody from "./MissingDiamondBody";
import { type MissingDiamondState } from "./types";

const MissingDiamondManager = ({
  initialState,
  initialTeamState,
}: {
  initialState: MissingDiamondState;
  initialTeamState: TeamHuntState;
}) => {
  const state = useDataset("missing_diamond", undefined, initialState);
  const teamState = useDataset("team_state", undefined, initialTeamState);
  return <MissingDiamondBody state={state} teamState={teamState} />;
};

const elem = document.getElementById("missing-diamond-root");
if (elem) {
  const state = (
    window as unknown as { initialMissingDiamondState: MissingDiamondState }
  ).initialMissingDiamondState;
  const teamState = (window as unknown as { initialTeamState: TeamHuntState })
    .initialTeamState;
  hydrateRoot(
    elem,
    <MissingDiamondManager initialState={state} initialTeamState={teamState} />,
  );
} else {
  console.error(
    "Could not mount MissingDiamondManager because #missing-diamond-root was nowhere to be found",
  );
}
