import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { type TeamHuntState } from "../../../../lib/api/client";
import globalDatasetManager from "../../client/DatasetManager";
import StakeoutBody from "./StakeoutBody";
import { type StakeoutState } from "./types";

const StakeoutManager = ({
  initialState,
  initialTeamState,
}: {
  initialState: StakeoutState;
  initialTeamState: TeamHuntState;
}) => {
  const [state, setState] = useState<StakeoutState>(initialState);
  const [teamState, setTeamState] = useState<TeamHuntState>(initialTeamState);

  useEffect(() => {
    const stop = globalDatasetManager.watch(
      "stakeout",
      undefined,
      (value: object) => {
        setState(value as StakeoutState);
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

  return <StakeoutBody state={state} teamState={teamState} />;
};

const elem = document.getElementById("stakeout-root");
if (elem) {
  const state = (window as unknown as { initialStakeoutState: StakeoutState })
    .initialStakeoutState;
  const teamState = (window as unknown as { initialTeamState: TeamHuntState })
    .initialTeamState;
  // Note: we avoid hydration here because we save photo locations in
  // localStorage, which won't match the SSR'd DOM, and because we use
  // transitions on photo locations, which means they'll animate from their
  // initial positions to their saved positions on page load
  const root = createRoot(elem);
  root.render(
    <StakeoutManager initialState={state} initialTeamState={teamState} />,
  );
} else {
  console.error(
    "Could not mount StakeoutManager because #stakeout-root is nowhere to be found",
  );
}
