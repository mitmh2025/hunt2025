import type { ActivityLogEntryRow } from "knex/types/tables";
import { type DehydratedActivityLogEntry } from "../../lib/api/contract";
import {
  type DehydratedInternalActivityLogEntry,
  type InternalActivityLogEntry,
} from "../../lib/api/frontend_contract";
import { INTERACTIONS } from "../frontend/interactions";
import { PUZZLES } from "../frontend/puzzles";
import HUNT, { generateSlugToSlotMap, type SlotLookup } from "../huntdata";
import { LogicTeamState } from "../huntdata/logic";
import type { Hunt } from "../huntdata/types";

// Fix a timestamp that has come from the database.
function fixTimestamp(value: string | Date): Date {
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

// Fix a JSON field that has come from the database.
function fixData(value: string | object): object {
  // SQLite returns json fields as strings, and the driver doesn't automatically parse them.
  if (typeof value === "string") {
    return JSON.parse(value) as object;
  }
  return value;
}

export class TeamStateIntermediate extends LogicTeamState {
  epoch: number; // The largest value of `id` that was processed/relevant
  private slugToSlotMap: Map<string, SlotLookup>;

  constructor(hunt: Hunt, initial?: Partial<TeamStateIntermediate>) {
    super(initial);
    this.epoch = -1;
    this.slugToSlotMap = generateSlugToSlotMap(hunt);
  }

  reduce(entry: InternalActivityLogEntry) {
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
      case "puzzle_unlocked": {
        this.puzzles_unlocked.add(entry.slug);
        // If this puzzle is not assigned to a round, or if the round to which
        // it is assigned is not unlocked at the time the puzzle unlocks, then
        // it will be included henceforth in the puzzle outlands.
        const slot = this.slugToSlotMap.get(entry.slug);
        if (!slot || !this.rounds_unlocked.has(slot.roundSlug)) {
          this.puzzles_stray.add(entry.slug);
        }
        break;
      }
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
  teamActivityLogEntries: InternalActivityLogEntry[],
): LogicTeamState {
  const intermediate = teamActivityLogEntries.reduce(
    (acc, entry) => acc.reduce(entry),
    new TeamStateIntermediate(hunt),
  );
  // Return the LogicTeamState because the recalculated team state no longer represents a committed epoch.
  return intermediate.recalculateTeamState(hunt);
}

// Fix the various inconsistencies in queried data across Postgres and SQLite.
export function cleanupActivityLogEntryFromDB(
  dbEntry: ActivityLogEntryRow,
): InternalActivityLogEntry {
  const res: Partial<InternalActivityLogEntry> = {
    id: dbEntry.id,
    team_id: dbEntry.team_id ?? undefined,
    timestamp: fixTimestamp(dbEntry.timestamp),
    currency_delta: dbEntry.currency_delta ?? undefined,
    type: dbEntry.type as InternalActivityLogEntry["type"],
  };
  if (dbEntry.slug) {
    (res as InternalActivityLogEntry & { slug?: string }).slug = dbEntry.slug;
  }
  if (dbEntry.data) {
    (res as InternalActivityLogEntry & { data?: object }).data = fixData(
      dbEntry.data,
    );
  }
  if (dbEntry.internal_data) {
    res.internal_data = fixData(dbEntry.internal_data);
  }
  return res as InternalActivityLogEntry;
}

// Converts from the serialized activity log entry (which e.g. has a string for timestamp)
// into the in-memory representation (which e.g. has a Date object).
export function parseInternalActivityLogEntry(
  ie: DehydratedInternalActivityLogEntry,
): InternalActivityLogEntry {
  const ts = new Date(ie.timestamp);
  return { ...ie, timestamp: ts };
}

export function formatActivityLogEntryForApi(
  e: InternalActivityLogEntry,
): DehydratedActivityLogEntry | undefined {
  switch (e.type) {
    case "puzzle_guess_submitted":
      return undefined;
  }
  let entry: Partial<DehydratedActivityLogEntry> = {
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
  if ("data" in e) {
    // SQLite doesn't parse JSON automatically
    const data = fixData(e.data);
    entry = Object.assign(entry, data);
  }

  return entry as DehydratedActivityLogEntry;
}
