import React from "react";
import { createRoot } from "react-dom/client";
import { type TeamState } from "../../../../lib/api/client";
import StakeoutBody from "./StakeoutBody";
import { type StakeoutState } from "./types";

const elem = document.getElementById("stakeout-root");
if (elem) {
  const state = (window as unknown as { initialStakeoutState: StakeoutState })
    .initialStakeoutState;
  const teamState = (window as unknown as { initialTeamState: TeamState })
    .initialTeamState;
  // TODO: subscribe to updates over websocket
  const root = createRoot(elem);
  root.render(<StakeoutBody state={state} teamState={teamState} />);
}
