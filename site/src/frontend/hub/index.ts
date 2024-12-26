import { type TeamHuntState } from "../../../lib/api/client";
import { type HubState } from "./types";

export function hubState(teamState: TeamHuntState): HubState {
  const rounds = Object.entries(teamState.rounds).map(([slug, roundObj]) => {
    return {
      slug,
      title: roundObj.title,
    };
  });
  return {
    epoch: teamState.epoch,
    rounds,
  };
}
