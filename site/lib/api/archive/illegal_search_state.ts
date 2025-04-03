import { formatTeamHuntState } from "../../../src/api/logic";
import useDataset from "../../../src/frontend/client/useDataset";
import HUNT from "../../../src/huntdata";
import type { TeamHuntState } from "../client";
import { fetchActivityLog, mutateActivityLog } from "./log";
import { reduceTeamStateIntermediate } from "./reducers";
import { ARCHIVE_TEAM_ID } from "./storage";

export async function markGateSatisfied(gateId: string): Promise<void> {
  await mutateActivityLog(fetchActivityLog(), async (mutator) => {
    if (
      mutator.getTeamState(HUNT, ARCHIVE_TEAM_ID).gates_satisfied.has(gateId)
    ) {
      return;
    }

    await mutator.appendLog({
      team_id: ARCHIVE_TEAM_ID,
      type: "gate_completed",
      slug: gateId,
    });
  });
}

export function getTeamState(): TeamHuntState {
  return formatTeamHuntState(
    HUNT,
    reduceTeamStateIntermediate(fetchActivityLog()),
  );
}

export function useTeamState(initialTeamState: TeamHuntState): TeamHuntState {
  return useDataset("team_state", undefined, initialTeamState);
}
