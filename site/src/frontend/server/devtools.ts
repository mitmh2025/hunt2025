import type { TeamState } from "../../../lib/api/client.js";
import HUNT from "../../huntdata";
import type { PuzzleSlot, Round } from "../../huntdata/types";
import { PUZZLES } from "../puzzles";

export type DevtoolsPuzzle = {
  slot: string;
  slug: string;
  title: string;
  state: "locked" | "unlockable" | "unlocked" | "solved";
};

export type DevtoolsGate = {
  id: string;
  open: boolean;
};

export type DevtoolsRound = {
  slug: string;
  title: string;
  metas: DevtoolsPuzzle[];
  puzzles: DevtoolsPuzzle[];
  gates: DevtoolsGate[];
  state: "locked" | "unlocked";
};

export type DevtoolsInteraction = {
  slug: string;
  state: "locked" | "unlocked" | "running" | "completed";
};

export type DevtoolsState = {
  teamId: number;
  teamName: string;
  currency: number;
  rounds: DevtoolsRound[];
  interactions: DevtoolsInteraction[];
};

function devtoolsPuzzleForSlot(
  round: Round,
  puzzleSlot: PuzzleSlot,
  teamState: TeamState,
) {
  const slug =
    teamState.rounds[round.slug]?.slots[puzzleSlot.id]?.slug ?? puzzleSlot.id;
  const puzzleDefinition = PUZZLES[slug];
  const title =
    puzzleDefinition?.title ?? `stub puzzle for slot ${puzzleSlot.id}`;
  const puzzleState = teamState.puzzles[slug];
  const state =
    puzzleState?.locked === "unlocked" && !!puzzleState.answer
      ? "solved"
      : puzzleState?.locked ?? "locked";
  return {
    slot: puzzleSlot.id,
    slug,
    title,
    state,
  };
}

export function devtoolsState(teamState: TeamState) {
  if (process.env.NODE_ENV === "development") {
    return {
      teamId: teamState.teamId,
      teamName: teamState.teamName,
      currency: teamState.currency,
      rounds: HUNT.rounds.map((round) => {
        return {
          slug: round.slug,
          title: round.title,
          metas: round.puzzles
            .filter((slot) => !!slot.is_meta)
            .map((slot) => {
              return devtoolsPuzzleForSlot(round, slot, teamState);
            }),
          puzzles: round.puzzles
            .filter((slot) => !slot.is_meta)
            .map((slot) => {
              return devtoolsPuzzleForSlot(round, slot, teamState);
            }),
          gates: (round.gates ?? []).map((gate) => {
            return {
              id: gate.id,
              open: !!teamState.rounds[round.slug]?.gates?.includes(gate.id),
            };
          }),
          state: round.slug in teamState.rounds ? "unlocked" : "locked",
        };
      }),
      interactions: HUNT.interactions.map((interaction) => {
        const state =
          teamState.interactions?.[interaction.id]?.state ?? "locked";
        return {
          slug: interaction.id,
          state,
        };
      }),
    };
  } else {
    return {};
  }
}
