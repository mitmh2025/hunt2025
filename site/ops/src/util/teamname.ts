import { getTeamName } from "../../../src/utils/teamNames";
import { type TeamData } from "../opsdata/types";

export function abbreviatedName(team: TeamData, includeUsername: boolean) {
  const teamName = getTeamName(team.username);
  const displayName =
    teamName.length <= 15 ? teamName : `${teamName.slice(0, 15)}...`;
  const displayUsername =
    team.username.length <= 15
      ? team.username
      : `${team.username.slice(0, 15)}...`;
  if (!includeUsername) {
    return displayName;
  } else {
    return `${displayName} (${displayUsername})`;
  }
}
