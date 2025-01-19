const IMMUTABLE_TEAMS = ["public", "unlocked"];

export default function teamIsImmutable(username: string): boolean {
  return IMMUTABLE_TEAMS.includes(username);
}
