import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { type TeamState } from "../../../../lib/api/client";
import globalSocketManager from "../../client/SocketManager";
import StakeoutBody from "./StakeoutBody";
import { type StakeoutState } from "./types";

const StakeoutManager = ({
  initialState,
  initialTeamState,
}: {
  initialState: StakeoutState;
  initialTeamState: TeamState;
}) => {
  const [state, setState] = useState<StakeoutState>(initialState);
  const [teamState, setTeamState] = useState<TeamState>(initialTeamState);

  useEffect(() => {
    const stop = globalSocketManager.watch("stakeout", (value: object) => {
      setState(value as StakeoutState);
    });
    return stop;
  }, []);
  useEffect(() => {
    const stop = globalSocketManager.watch("team_state", (value: object) => {
      setTeamState(value as TeamState);
    });
    return stop;
  }, []);

  return <StakeoutBody state={state} teamState={teamState} />;
};

const elem = document.getElementById("stakeout-root");
if (elem) {
  const state = (window as unknown as { initialStakeoutState: StakeoutState })
    .initialStakeoutState;
  const teamState = (window as unknown as { initialTeamState: TeamState })
    .initialTeamState;
  const root = createRoot(elem);
  root.render(
    <StakeoutManager initialState={state} initialTeamState={teamState} />,
  );
}
