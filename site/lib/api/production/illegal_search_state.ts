import HUNT from "../../../src/huntdata";
import type { PuzzleSlot } from "../../../src/huntdata/types";
import type { TeamHuntState } from "../client";

// eslint-disable-next-line @typescript-eslint/require-await -- This needs to be an aync function to satisfy the API
export async function markGateSatisfied(gateId: string): Promise<void> {
  const gatesStr = localStorage.getItem("illegalSearchGates") ?? "";
  const gates = gatesStr.split(",");

  if (!gates.includes(gateId)) {
    gates.push(gateId);
    localStorage.setItem("illegalSearchGates", gates.join(","));
  }
}

export function getTeamState(): TeamHuntState {
  const puzzles =
    HUNT.rounds
      .find((r) => r.slug === "illegal_search")
      ?.puzzles.filter((p): p is PuzzleSlot & { slug: string } => !!p.slug) ??
    [];

  const gatesStr = localStorage.getItem("illegalSearchGates") ?? "";
  const gates = gatesStr.split(",");
  return {
    gates_satisfied: gates,
    rounds: {
      illegal_search: {
        slots: Object.fromEntries(puzzles.map((p) => [p.id, p])),
        title: "The Illegal Search",
        interactions: {},
        gates,
      },
    },
    epoch: 1,
    currency: 0,
    outstanding_hint_requests: [],
    puzzles: Object.fromEntries(
      puzzles.map((p) => [
        p.slug,
        { round: "illegal_search", locked: "unlocked" },
      ]),
    ),
    strong_currency: 0,
  };
}

export function useTeamState(_initialTeamState: TeamHuntState): TeamHuntState {
  return getTeamState();
}
