import archiveMode from "../frontend/utils/archiveMode";

export const IMMUTABLE_TEAM_USERNAMES = ["public_access"] as const;
export default function teamIsImmutable(username: string): boolean {
  return (IMMUTABLE_TEAM_USERNAMES as readonly string[]).includes(username);
}

export function teamIsImmutableForForcedUnlock(
  username: string,
  force: boolean,
): boolean {
  return (
    teamIsImmutable(username) &&
    (!archiveMode || typeof window === "undefined" || force)
  );
}
