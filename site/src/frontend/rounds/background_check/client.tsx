import React, { useEffect, useState } from "react";
import { hydrateRoot } from "react-dom/client";
import { type TeamHuntState } from "../../../../lib/api/client";
import globalDatasetManager from "../../client/DatasetManager";
import BackgroundCheckBody from "./BackgroundCheckBody";
import { type BackgroundCheckState } from "./types";

const BackgroundCheckManager = ({
  initialState,
  initialTeamState,
}: {
  initialState: BackgroundCheckState;
  initialTeamState: TeamHuntState;
}) => {
  const [state, setState] = useState<BackgroundCheckState>(initialState);
  const [teamState, setTeamState] = useState<TeamHuntState>(initialTeamState);

  useEffect(() => {
    const stop = globalDatasetManager.watch(
      "background_check",
      undefined,
      (value: object) => {
        setState(value as BackgroundCheckState);
      },
    );
    return stop;
  }, []);
  useEffect(() => {
    const stop = globalDatasetManager.watch(
      "team_state",
      undefined,
      (value: object) => {
        setTeamState(value as TeamHuntState);
      },
    );
    return stop;
  }, []);

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
