import { type ServerInferResponseBody } from "@ts-rest/core";
import type { ActivityLogEntry } from "knex/types/tables";
import { type publicContract } from "../../lib/api/contract";
import { type InternalActivityLogEntry } from "../../lib/api/frontend_contract";
import { INTERACTIONS } from "../frontend/interactions";
import { PUZZLES } from "../frontend/puzzles";
import HUNT from "../huntdata";
import { TeamState as LogicTeamState } from "../huntdata/logic";
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

export class TeamStateIntermediate extends LogicTeamState {
  epoch: number; // The largest value of `id` that was processed/relevant

  constructor(initial?: Partial<TeamStateIntermediate>) {
    super(initial);
    this.epoch = -1;
  }

  reduce(entry: ActivityLogEntry) {
    this.available_currency += entry.currency_delta;
    // Update the max known epoch if this entry is newer
    if (entry.id > this.epoch) {
      this.epoch = entry.id;
    } else {
      throw new Error(
        `Attempting to reduce activity log entry ${entry.id} on top of team state that already includes ${this.epoch}`,
      );
    }
    switch (entry.type) {
      case "currency_adjusted":
        break;
      case "round_unlocked":
        this.rounds_unlocked.add(entry.slug);
        break;
      case "gate_completed":
        this.gates_satisfied.add(entry.slug);
        break;
      case "puzzle_solved":
        this.puzzles_solved.add(entry.slug);
        this.correct_answers[entry.slug] = entry.data.answer;
      // fallthrough - solved implies unlocked
      case "puzzle_unlocked":
        this.puzzles_unlocked.add(entry.slug);
        break;
      case "puzzle_unlockable":
        this.puzzles_unlockable.add(entry.slug);
        break;
      case "interaction_completed":
        this.interactions_completed.set(entry.slug, entry.data.result);
      // fallthrough - completed implies started
      case "interaction_started":
        this.interactions_started.add(entry.slug);
      // fallthrough - started implies unlocked
      case "interaction_unlocked":
        this.interactions_unlocked.add(entry.slug);
        break;
    }
    return this;
  }
}

export function reducerDeriveTeamState(
  hunt: Hunt,
  teamActivityLogEntries: ActivityLogEntry[],
): LogicTeamState {
  const intermediate = teamActivityLogEntries.reduce(
    (acc, entry) => acc.reduce(entry),
    new TeamStateIntermediate(),
  );
  // Return the LogicTeamState because the recalculated team state no longer represents a committed epoch.
  return intermediate.recalculateTeamState(hunt);
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
    case "puzzle_guess_submitted":
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
): ActivityLog[number] | undefined {
  switch (e.type) {
    case "puzzle_guess_submitted":
      return undefined;
  }
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
