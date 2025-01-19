const IMMUTABLE_TEAMS = ["public"];

export default function teamIsImmutable(username: string): boolean {
  return IMMUTABLE_TEAMS.includes(username);
}
