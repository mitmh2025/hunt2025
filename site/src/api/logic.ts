import { type ServerInferResponseBody } from "@ts-rest/core";
import type { ActivityLogEntry } from "knex/types/tables";
import { type publicContract } from "../../lib/api/contract";
import { type InternalActivityLogEntry } from "../../lib/api/frontend_contract";
import { INTERACTIONS } from "../frontend/interactions";
import { PUZZLES } from "../frontend/puzzles";
import HUNT from "../huntdata";
import { calculateTeamState } from "../huntdata/logic";
import type { Hunt } from "../huntdata/types";

export function fixTimestamp(value: string | Date): Date {
  if (typeof value === "string") {
    if (!value.endsWith("Z")) {
      // TODO: sqlite returns timestamps as "YYYY-MM-DD HH:MM:SS" in UTC, and the driver doesn't automatically turn them back into Date objects.
      return new Date(value + "Z");
    }
    // We may also have gotten a fixed-up string from the pubsub channel, where we also serialize
    // dates as strings.
    return new Date(value);
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

export function fixInternalData(
  value: string | object,
): ActivityLogEntry["internal_data"] {
  // SQLite returns json fields as strings, and the driver doesn't automatically parse them.
  if (typeof value === "string") {
    return JSON.parse(value) as ActivityLogEntry["internal_data"];
  }
  return value as ActivityLogEntry["internal_data"];
}

export type TeamStateIntermediate = {
  epoch: number; // The largest value of `id` that was processed/relevant
  rounds_unlocked: Set<string>;
  puzzles_unlockable: Set<string>;
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
  // Update the max known epoch if this entry is newer
  if (entry.id > acc.epoch) {
    acc.epoch = entry.id;
  }
  switch (entry.type) {
    case "currency_adjusted":
      break;
    case "round_unlocked":
      acc.rounds_unlocked.add(entry.slug);
      break;
    case "gate_completed":
      acc.gates_satisfied.add(entry.slug);
      break;
    case "puzzle_unlockable":
      acc.puzzles_unlockable.add(entry.slug);
      break;
    case "puzzle_unlocked":
      acc.puzzles_unlocked.add(entry.slug);
      break;
    case "puzzle_solved":
      acc.puzzles_solved.add(entry.slug);
      acc.correct_answers[entry.slug] = entry.data.answer;
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
          interaction.result = entry.data.result;
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
    epoch: -1,
    rounds_unlocked: new Set(),
    puzzles_unlockable: new Set(),
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
    puzzles_unlockable: intermediate.puzzles_unlockable,
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
    epoch: intermediate.epoch,
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

type ActivityLog = ServerInferResponseBody<
  typeof publicContract.getActivityLog,
  200
>;

export function cleanupActivityLogEntryFromDB(
  dbEntry: ActivityLogEntry,
): ActivityLogEntry {
  const res: Partial<ActivityLogEntry> = {
    id: dbEntry.id,
    team_id: dbEntry.team_id,
    timestamp: fixTimestamp(dbEntry.timestamp),
    currency_delta: dbEntry.currency_delta,
    type: dbEntry.type,
    slug: dbEntry.slug,
  };
  if (dbEntry.data) {
    res.data = fixData(dbEntry.data);
  }
  if (dbEntry.internal_data) {
    res.internal_data = fixInternalData(dbEntry.internal_data);
  }
  return res as ActivityLogEntry;
}

// Converts from the serialized activity log entry (which e.g. has a string for timestamp)
// into the in-memory representation (which e.g. has a Date object).
export function parseInternalActivityLogEntry(
  ie: InternalActivityLogEntry,
): ActivityLogEntry {
  const ts = new Date(ie.timestamp);
  switch (ie.type) {
    case "currency_adjusted":
      return {
        id: ie.id,
        team_id: ie.team_id,
        timestamp: ts,
        currency_delta: ie.currency_delta,
        type: ie.type,
        internal_data: ie.internal_data,
      };
    case "round_unlocked":
    case "gate_completed":
    case "puzzle_unlockable":
    case "puzzle_unlocked":
    case "interaction_started":
    case "interaction_unlocked":
    case "rate_limits_reset":
      return {
        id: ie.id,
        team_id: ie.team_id,
        timestamp: ts,
        currency_delta: ie.currency_delta,
        type: ie.type,
        slug: ie.slug,
        internal_data: ie.internal_data,
      };
    case "interaction_completed":
      return {
        id: ie.id,
        team_id: ie.team_id,
        timestamp: ts,
        currency_delta: ie.currency_delta,
        type: ie.type,
        slug: ie.slug,
        data: ie.data,
        internal_data: ie.internal_data,
      };
    case "puzzle_partially_solved":
      return {
        id: ie.id,
        team_id: ie.team_id,
        timestamp: ts,
        currency_delta: ie.currency_delta,
        type: ie.type,
        slug: ie.slug,
        data: ie.data,
        internal_data: ie.internal_data,
      };
    case "puzzle_solved":
      return {
        id: ie.id,
        team_id: ie.team_id,
        timestamp: ts,
        currency_delta: ie.currency_delta,
        type: ie.type,
        slug: ie.slug,
        data: ie.data,
        internal_data: ie.internal_data,
      };
  }
}

export function formatActivityLogEntryForApi(
  e: Pick<
    ActivityLogEntry,
    | "id"
    | "type"
    | "timestamp"
    | "currency_delta"
    | "team_id"
    | "slug"
    | "data"
    | "internal_data"
  >,
): ActivityLog[number] {
  let entry: Partial<ActivityLog[number]> = {
    id: e.id,
    timestamp: e.timestamp.toISOString(),
    currency_delta: e.currency_delta,
    type: e.type,
  };
  if ("team_id" in e && e.team_id) {
    (entry as { team_id: number }).team_id = e.team_id;
  }
  if ("slug" in e && e.slug) {
    (entry as { slug: string }).slug = e.slug;
    switch (entry.type) {
      case "currency_adjusted":
        break;
      case "round_unlocked":
        {
          const round = HUNT.rounds.find((round) => round.slug === e.slug);
          if (round) {
            entry = Object.assign(entry, { title: round.title });
          }
        }
        break;
      case "rate_limits_reset":
      case "puzzle_unlockable":
      case "puzzle_unlocked":
      case "puzzle_partially_solved":
      case "puzzle_solved":
        {
          const puzzle = PUZZLES[e.slug];
          entry = Object.assign(entry, {
            title: puzzle?.title ?? `Stub puzzle for slot ${e.slug}`,
          });
        }
        break;
      case "interaction_unlocked":
      case "interaction_started":
      case "interaction_completed":
        {
          const interaction = INTERACTIONS[
            e.slug as keyof typeof INTERACTIONS
          ] as undefined | (typeof INTERACTIONS)[keyof typeof INTERACTIONS];
          entry = Object.assign(entry, {
            title: interaction?.title ?? `Untitled interaction ${e.slug}`,
          });
        }
        break;
      case "gate_completed":
        {
          // TODO: add gate descriptions for activity log in the definition?
        }
        break;
    }
  }
  // Note: API objects flatten `data` into the object.
  // We do not expose anything from `internal_data` in the public API.
  if ("data" in e && e.data) {
    // SQLite doesn't parse JSON automatically
    const data = fixData(e.data);
    entry = Object.assign(entry, data);
  }

  return entry as ActivityLog[number];
}
