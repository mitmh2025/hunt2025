export const IMMUTABLE_TEAM_USERNAMES = ["public_access"] as const;
export default function teamIsImmutable(username: string): boolean {
  return (IMMUTABLE_TEAM_USERNAMES as readonly string[]).includes(username);
}
