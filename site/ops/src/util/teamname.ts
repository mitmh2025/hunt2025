import { getTeamName } from "../../../src/utils/teamNames";
import { type TeamData } from "../opsdata/types";

export function abbreviatedName(team: TeamData, includeUsername: boolean) {
  const teamName = getTeamName(team.username);
  const displayName =
    teamName.length <= 20 ? teamName : `${teamName.slice(0, 20)}...`;
  if (!includeUsername) {
    return displayName;
  } else {
    return `${displayName} (${team.username})`;
  }
}
