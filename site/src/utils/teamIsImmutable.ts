const IMMUTABLE_TEAM_USERNAMES = ["public_access"];
export default function teamIsImmutable(username: string): boolean {
  return IMMUTABLE_TEAM_USERNAMES.includes(username);
}
