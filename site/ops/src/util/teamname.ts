import { type TeamData } from "../opsdata/types";

export function abbreviatedName(team: TeamData, includeUsername: boolean) {
  const displayName =
    team.name.length <= 20 ? team.name : `${team.name.slice(0, 20)}...`;
  if (!includeUsername) {
    return displayName;
  } else {
    return `${displayName} (${team.username})`;
  }
}
