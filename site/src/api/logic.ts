import type { ActivityLogEntry } from "knex/types/tables";
import { calculateTeamState } from "../huntdata/logic";
import type { Hunt } from "../huntdata/types";

export function fixTimestamp(value: string | Date): Date {
  if (typeof value === "string") {
    // TODO: sqlite returns timestamps as "YYYY-MM-DD HH:MM:SS" in UTC, and the driver doesn't automatically turn them back into Date objects.
    return new Date(value + "Z");
  }
  return value;
}

export function fixData(value: string | object): ActivityLogEntry["data"] {
  // SQLite returns json fields as strings, and the driver doesn't automatically parse them.
  if (typeof value === "string") {
    return JSON.parse(value) as ActivityLogEntry["data"];
  }
  return value as ActivityLogEntry["data"];
}

export type TeamStateIntermediate = {
  rounds_unlocked: Set<string>;
  puzzles_unlocked: Set<string>;
  puzzles_solved: Set<string>;
  gates_satisfied: Set<string>;
  interactions_completed: Set<string>;
  available_currency: number;
  correct_answers: Record<string, string>;
  interactions: Record<
    string,
    { state: "unlocked" | "running" | "completed"; result?: string }
  >;
};

export function teamStateReducer(
  acc: TeamStateIntermediate,
  entry: ActivityLogEntry,
) {
  acc.available_currency += entry.currency_delta;
  switch (entry.type) {
    case "currency_adjusted":
      break;
    case "round_unlocked":
      acc.rounds_unlocked.add(entry.slug);
      break;
    case "gate_completed":
      acc.gates_satisfied.add(entry.slug);
      break;
    case "puzzle_unlocked":
      acc.puzzles_unlocked.add(entry.slug);
      break;
    case "puzzle_solved":
      acc.puzzles_solved.add(entry.slug);
      acc.correct_answers[entry.slug] = (
        fixData(entry.data) as typeof entry.data
      ).answer;
      break;
    case "interaction_unlocked":
      {
        const interaction = { state: "unlocked" as const };
        acc.interactions[entry.slug] = interaction;
      }
      break;
    case "interaction_started":
      {
        const interaction = acc.interactions[entry.slug];
        if (interaction) {
          interaction.state = "running";
        }
      }
      break;
    case "interaction_completed":
      {
        acc.interactions_completed.add(entry.slug);
        const interaction = acc.interactions[entry.slug];
        if (interaction) {
          interaction.state = "completed";
          interaction.result = (
            fixData(entry.data) as typeof entry.data
          ).result;
        }
      }
      break;
  }
  return acc;
}

export function reducerDeriveTeamState(
  teamName: string,
  hunt: Hunt,
  teamActivityLogEntries: ActivityLogEntry[],
) {
  const initialState: TeamStateIntermediate = {
    rounds_unlocked: new Set(),
    puzzles_unlocked: new Set(),
    puzzles_solved: new Set(),
    gates_satisfied: new Set(),
    interactions_completed: new Set(),
    available_currency: 0,
    correct_answers: {},
    interactions: {},
  };
  const intermediate = teamActivityLogEntries.reduce(
    teamStateReducer,
    initialState,
  );
  const derivedState = calculateTeamState({
    hunt,
    unlocked_rounds: intermediate.rounds_unlocked,
    gates_satisfied: intermediate.gates_satisfied,
    interactions_completed: intermediate.interactions_completed,
    puzzles_unlocked: intermediate.puzzles_unlocked,
    puzzles_solved: intermediate.puzzles_solved,
  });

  const interactions: Record<
    string,
    { state: "unlocked" | "running" | "completed"; result?: string }
  > = {};
  for (const unlocked of derivedState.unlocked_interactions.keys()) {
    interactions[unlocked] = { state: "unlocked" as const };
  }
  Object.assign(interactions, intermediate.interactions);

  return {
    team_name: teamName,
    available_currency: intermediate.available_currency,
    unlocked_rounds: derivedState.unlocked_rounds,
    visible_puzzles: derivedState.visible_puzzles,
    unlockable_puzzles: derivedState.unlockable_puzzles,
    unlocked_puzzles: derivedState.unlocked_puzzles,
    correct_answers: intermediate.correct_answers,
    satisfied_gates: intermediate.gates_satisfied,
    interactions,
  };
}
