import { generateLogEntries } from "../../../../src/frontend/puzzles/new-ketchup/logic";
import {
  fetchPuzzleStateLog,
  fetchTeamRegistrationLog,
  mutatePuzzleStateLog,
} from "../log";
import { reduceTeamInfoIntermediate } from "../reducers";
import { ARCHIVE_TEAM_ID } from "../storage";

export async function speak(): Promise<void> {
  const teamInfo = reduceTeamInfoIntermediate(
    fetchTeamRegistrationLog(),
  ).formatTeamInfoIfActive();
  if (!teamInfo) {
    // This shouldn't actually be possible
    throw new Error("Team not registered");
  }

  const { teamName } = teamInfo;

  await mutatePuzzleStateLog(fetchPuzzleStateLog(), async (mutator) => {
    const entries = generateLogEntries(ARCHIVE_TEAM_ID, teamName, mutator.log);
    for (const entry of entries) {
      await mutator.appendLog({
        team_id: ARCHIVE_TEAM_ID,
        slug: "what_do_they_call_you",
        data: entry,
      });
    }
  });
  return Promise.resolve();
}
