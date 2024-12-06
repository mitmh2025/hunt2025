import React from "react";
import { hydrateRoot } from "react-dom/client";
import { type TeamHuntState } from "../../../../lib/api/client";
import useDataset from "../../client/useDataset";
import BackgroundCheckBody from "./BackgroundCheckBody";
import { type BackgroundCheckState } from "./types";

const BackgroundCheckManager = ({
  initialState,
  initialTeamState,
}: {
  initialState: BackgroundCheckState;
  initialTeamState: TeamHuntState;
}) => {
  const state = useDataset("background_check", undefined, initialState);
  const teamState = useDataset("team_state", undefined, initialTeamState);
  return <BackgroundCheckBody state={state} teamState={teamState} />;
};

const elem = document.getElementById("background-check-root");
if (elem) {
  const state = (
    window as unknown as { initialBackgroundCheckState: BackgroundCheckState }
  ).initialBackgroundCheckState;
  const teamState = (window as unknown as { initialTeamState: TeamHuntState })
    .initialTeamState;
  hydrateRoot(
    elem,
    <BackgroundCheckManager
      initialState={state}
      initialTeamState={teamState}
    />,
  );
} else {
  console.error(
    "Could not mount BackgroundCheckManager because #background-check-root was nowhere to be found",
  );
}
