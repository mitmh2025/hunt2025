import { type TeamHuntState } from "../../../lib/api/client";
import { type HubState } from "./types";

export function hubState(teamState: TeamHuntState): HubState {
  const rounds = Object.entries(teamState.rounds).map(([slug, roundObj]) => {
    return {
      slug,
      title: roundObj.title,
    };
  });
  if (teamState.rounds.the_missing_diamond?.gates?.includes("hunt_started")) {
    rounds.push({
      slug: "stray_leads",
      title: "Stray Leads",
    });
  }
  return {
    epoch: teamState.epoch,
    rounds,
  };
}
