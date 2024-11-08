import type { TeamHuntState } from "../../../lib/api/client.js";
import HUNT from "../../huntdata";
import type { PuzzleSlot } from "../../huntdata/types";
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

export type DevtoolsInteraction = {
  slug: string;
  state: "locked" | "unlocked" | "running" | "completed";
};

export type DevtoolsRound = {
  slug: string;
  title: string;
  metas: DevtoolsPuzzle[];
  puzzles: DevtoolsPuzzle[];
  gates: DevtoolsGate[];
  interactions: DevtoolsInteraction[];
  state: "locked" | "unlocked";
};

export type DevtoolsState = {
  epoch: number;
  teamId: number;
  teamName: string;
  currency: number;
  rounds: DevtoolsRound[];
};

function devtoolsPuzzleForSlot(
  puzzleSlot: PuzzleSlot,
  teamState: TeamHuntState,
) {
  const slug = puzzleSlot.slug ?? puzzleSlot.id;
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

export function devtoolsState(teamState: TeamHuntState) {
  if (process.env.NODE_ENV === "development") {
    return {
      epoch: teamState.epoch,
      currency: teamState.currency,
      rounds: HUNT.rounds.map((round) => {
        return {
          slug: round.slug,
          title: round.title,
          metas: round.puzzles
            .filter((slot) => !!slot.is_meta)
            .map((slot) => {
              return devtoolsPuzzleForSlot(slot, teamState);
            }),
          puzzles: round.puzzles
            .filter((slot) => !slot.is_meta)
            .map((slot) => {
              return devtoolsPuzzleForSlot(slot, teamState);
            }),
          gates: (round.gates ?? []).map((gate) => {
            return {
              id: gate.id,
              open: !!teamState.rounds[round.slug]?.gates?.includes(gate.id),
            };
          }),
          interactions: (round.interactions ?? []).map((interaction) => {
            const state =
              teamState.rounds[round.slug]?.interactions?.[interaction.id]
                ?.state ?? "locked";
            return {
              slug: interaction.id,
              state,
            };
          }),
          state: round.slug in teamState.rounds ? "unlocked" : "locked",
        };
      }),
    };
  } else {
    return {};
  }
}
