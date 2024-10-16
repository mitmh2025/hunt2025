import type Knex from "knex";
import {
  type ActivityLogEntry,
  type InsertActivityLogEntry,
} from "knex/types/tables";
import { type z } from "zod";
import { type TeamState } from "../../lib/api/client";
import { type InteractionStateSchema } from "../../lib/api/contract";
import { type InternalActivityLogEntry } from "../../lib/api/frontend_contract";
import { getSlotSlug } from "../huntdata/logic";
import { type Hunt } from "../huntdata/types";
import {
  appendActivityLog as dbAppendActivityLog,
  getActivityLog as dbGetActivityLog,
  getTeamNames,
  retryOnAbort,
} from "./db";
import { parseInternalActivityLogEntry, reducerDeriveTeamState } from "./logic";
import {
  type RedisClient,
  activityLog as redisActivityLog,
  publishTeamState,
} from "./redis";

export class Mutator<T extends { id: number; team_id?: number }, I> {
  private _trx: Knex.Knex.Transaction;
  private _log: T[];
  private _allTeams: Set<number>;
  private _affectedTeams: Set<number> | undefined;
  private _dbAppendLog: (
    entry: I,
    trx: Knex.Knex.Transaction,
  ) => Promise<T | undefined>;

  constructor(
    trx: Knex.Knex.Transaction,
    log: T[],
    allTeams: Set<number>,
    dbAppendLog: (
      entry: I,
      trx: Knex.Knex.Transaction,
    ) => Promise<T | undefined>,
  ) {
    this._trx = trx;
    this._log = log;
    this._affectedTeams = new Set();
    this._allTeams = allTeams;
    this._dbAppendLog = dbAppendLog;
  }

  async appendLog(entry: I) {
    const inserted_entry = await this._dbAppendLog(entry, this._trx);
    if (inserted_entry !== undefined) {
      this._log = this._log.concat([inserted_entry]);
      if (inserted_entry.team_id === undefined) {
        this._affectedTeams = undefined; // We don't know yet
      } else if (this._affectedTeams !== undefined) {
        this._affectedTeams.add(inserted_entry.team_id);
      }
    }
    return inserted_entry;
  }

  // Get the complete log so far (both the starting log and any added entries)
  get log() {
    return this._log;
  }

  // Get the list of teams contained in the log entries.
  get allTeams(): Set<number> {
    return this._allTeams;
  }

  // Get the list of teams affected by log entries pushed on this Mutator.
  get affectedTeams(): Set<number> {
    return this._affectedTeams ?? this.allTeams;
  }
}

export class ActivityLogMutator extends Mutator<
  ActivityLogEntry,
  InsertActivityLogEntry
> {
  constructor(
    trx: Knex.Knex.Transaction,
    log: ActivityLogEntry[],
    allTeams: Set<number>,
  ) {
    super(trx, log, allTeams, dbAppendActivityLog);
  }

  // Refresh the state for every team that was affected.
  // We assume that this.activityLog contains the full activity log for all affected teams.
  async recalculateState(hunt: Hunt, all?: boolean) {
    for (const team_id of all ? this.allTeams : this.affectedTeams) {
      await recalculateTeamState(
        hunt,
        team_id,
        this.log.filter(
          (e) => e.team_id === team_id || e.team_id === undefined,
        ),
        this,
      );
    }
  }
}

async function recalculateTeamState(
  hunt: Hunt,
  team_id: number,
  activity_log: ActivityLogEntry[],
  mutator: Mutator<ActivityLogEntry, InsertActivityLogEntry>,
) {
  const start = performance.now();

  // What is already present in the activity log?
  // Somewhat surprisingly, this is faster than the equivalent single-pass for-of loop with an
  // if-else chain to mutate six Sets.
  const old = {
    unlocked_rounds: new Set(
      activity_log
        .filter((e) => e.type === "round_unlocked")
        .map((e) => e.slug),
    ),
    unlockable_puzzles: new Set(
      activity_log
        .filter((e) => e.type === "puzzle_unlockable")
        .map((e) => e.slug),
    ),
    unlocked_puzzles: new Set(
      activity_log
        .filter((e) => e.type === "puzzle_unlocked")
        .map((e) => e.slug),
    ),
    interactions_unlocked: new Set(
      activity_log
        .filter((e) => e.type === "interaction_unlocked")
        .map((e) => e.slug),
    ),
    interactions_completed: new Set(
      activity_log
        .filter((e) => e.type === "interaction_completed")
        .map((e) => e.slug),
    ),
    gates_satisfied: new Set(
      activity_log
        .filter((e) => e.type === "gate_completed")
        .map((e) => e.slug),
    ),
    solved_puzzles: new Set(
      activity_log.filter((e) => e.type === "puzzle_solved").map((e) => e.slug),
    ),
  };

  // What /should/ be in the activity log, based on the hunt description?
  const next = reducerDeriveTeamState(hunt, activity_log);
  const calculate_team_state_done = performance.now();

  // Compute the differences, and generate the requisite inserts.
  for (const slug of next.unlocked_rounds.difference(old.unlocked_rounds)) {
    await mutator.appendLog({
      team_id,
      type: "round_unlocked",
      slug,
    });
  }
  const unlock_rounds_done = performance.now();
  const diff = {
    // visible_puzzles: next.visible_puzzles.difference(old.visible_puzzles),
    unlockable_puzzles: next.unlockable_puzzles.difference(
      old.unlockable_puzzles,
    ),
    unlocked_puzzles: next.unlocked_puzzles.difference(old.unlocked_puzzles),
    unlocked_interactions: new Set(Object.keys(next.interactions)).difference(
      old.interactions_unlocked,
    ),
  };
  const diff_done = performance.now();
  for (const slug of diff.unlockable_puzzles) {
    await mutator.appendLog({
      team_id,
      type: "puzzle_unlockable",
      slug,
    });
  }
  const puzzles_unlockable_done = performance.now();
  for (const slug of diff.unlocked_puzzles) {
    await mutator.appendLog({
      team_id,
      type: "puzzle_unlocked",
      slug,
    });
  }
  const puzzles_unlock_done = performance.now();
  for (const id of diff.unlocked_interactions) {
    await mutator.appendLog({
      team_id,
      type: "interaction_unlocked",
      slug: id,
    });
  }
  const interactions_unlock_done = performance.now();
  console.log(`recalculateTeamState for team ${team_id}: ${interactions_unlock_done - start} msec
  * calculateTeamState:  ${calculate_team_state_done - start} msec
  * unlock rounds:       ${unlock_rounds_done - calculate_team_state_done} msec
  * compute diffs:       ${diff_done - unlock_rounds_done} msec
  * unlockable puzzles:  ${puzzles_unlockable_done - diff_done} msec
  * unlock puzzles:      ${puzzles_unlock_done - puzzles_unlockable_done} msec
  * unlock interactions: ${interactions_unlock_done - puzzles_unlock_done} msec`);
  return next;
}

// Execute a mutation on a team. Note that fn must not have any side effects; if the transaction aborts, it may be called multiple times.
export async function executeMutation<T>(
  hunt: Hunt,
  team_id: number,
  redisClient: RedisClient | undefined,
  knex: Knex.Knex,
  fn: (trx: Knex.Knex.Transaction, mutator: ActivityLogMutator) => Promise<T>,
) {
  // All mutations need to follow a similar pattern for correctness:
  // 1. read the current activity log from cache if possible
  // 2. start transaction
  //   2a. select * from activity_log where (team_id is null or team_id is ?) and id > ?
  //   2b. execute mutation, tracking the added activity log entries with their ids
  //   2c. commit transaction
  // 3. compute team/puzzle state using the combined activity log, with the last added activity log id as the epoch
  let cached_log: {
    highWaterMark?: number;
    entries: InternalActivityLogEntry[];
  } = {
    highWaterMark: undefined,
    entries: [],
  };
  // TODO: Generalize this function to support operations against all teams.
  if (redisClient) {
    try {
      cached_log = await redisActivityLog.getTeamLog(redisClient, team_id);
    } catch (err) {
      console.error("failed to query redis:", err);
    }
  }
  const { result, activityLog, allTeams, affectedTeams, teamNames } =
    await retryOnAbort(knex, async function (trx: Knex.Knex.Transaction) {
      const new_log = await dbGetActivityLog(
        team_id,
        cached_log.highWaterMark,
        trx,
      );
      const combined_log = cached_log.entries
        .map(parseInternalActivityLogEntry)
        .concat(new_log);
      const mutator = new ActivityLogMutator(
        trx,
        combined_log,
        new Set([team_id]),
      );
      const result = await fn(trx, mutator);
      await mutator.recalculateState(hunt);
      const teamNames = await getTeamNames(mutator.allTeams, trx);
      return {
        result,
        activityLog: mutator.log,
        allTeams: mutator.allTeams,
        affectedTeams: mutator.affectedTeams,
        teamNames,
      };
    });
  if (redisClient && affectedTeams.size > 0) {
    // TODO: Do this in the background?
    await refreshActivityLog(redisClient, knex);
  }
  const teamStates: Record<number, TeamState> = {};
  for (const team_id of allTeams) {
    const team_activity_log = activityLog.filter(
      (e) => e.team_id === undefined || e.team_id === team_id,
    );
    const state = formatTeamState(
      hunt,
      team_id,
      teamNames[team_id] ?? "",
      team_activity_log,
    );
    teamStates[team_id] = state;
    if (redisClient && affectedTeams.has(team_id)) {
      await publishTeamState(redisClient, team_id, state);
    }
  }
  return { result, activityLog, teamStates };
}

export async function refreshActivityLog(
  redisClient: RedisClient,
  knex: Knex.Knex,
) {
  // Read the latest activity log entry we already have in Redis.
  const latest = await redisActivityLog.getGlobalHighWaterMark(redisClient);
  // Find any newer entries in the DB
  const entries = await knex.transaction(
    (trx) => dbGetActivityLog(undefined, latest, trx),
    { readOnly: true },
  );
  // Publish them!
  await redisActivityLog.extend(redisClient, entries);
}

type InteractionState = z.infer<typeof InteractionStateSchema>;

export function formatTeamState(
  hunt: Hunt,
  team_id: number,
  team_name: string,
  activity_log: ActivityLogEntry[],
): TeamState {
  const data = reducerDeriveTeamState(hunt, activity_log);
  //console.log(data);
  const rounds = Object.fromEntries(
    hunt.rounds
      .filter(({ slug: roundSlug }) => data.unlocked_rounds.has(roundSlug))
      .map(({ slug, title, puzzles, gates, interactions }) => {
        const interactionsData: [string, InteractionState][] = (
          interactions ?? []
        ).flatMap((interaction) => {
          if ("interactions" in data) {
            const v = data.interactions[interaction.id];
            if (v) {
              return [[interaction.id, v]];
            }
          }
          return [];
        });
        const interactionsMap =
          interactionsData.length > 0
            ? Object.fromEntries(interactionsData)
            : undefined;
        const interactionsMixin =
          interactionsMap !== undefined
            ? { interactions: interactionsMap }
            : {};
        return [
          slug,
          {
            title,
            slots: Object.fromEntries(
              puzzles.flatMap((slot) => {
                const slug = getSlotSlug(slot);
                if (slug && data.visible_puzzles.has(slug)) {
                  const obj = { slug, is_meta: slot.is_meta };
                  return [[slot.id, obj]];
                }
                return [];
              }),
            ),
            gates: gates?.flatMap((gate) => {
              if (gate.id && data.satisfied_gates.has(gate.id)) {
                return [gate.id];
              }
              return [];
            }),
            // Don't include interactions until one has been reached
            ...interactionsMixin,
          },
        ];
      }),
  );
  const puzzleRounds = Object.fromEntries(
    Object.entries(rounds).flatMap(([roundSlug, { slots }]) =>
      Object.entries(slots).map(([_id, { slug: puzzleSlug }]) => [
        puzzleSlug,
        roundSlug,
      ]),
    ),
  );
  return {
    epoch: data.epoch,
    teamId: team_id,
    teamName: team_name,
    rounds,
    currency: data.available_currency,
    puzzles: Object.fromEntries(
      [...data.visible_puzzles].map((slug) => [
        slug,
        {
          round: puzzleRounds[slug] ?? "outlands", // TODO: Should this be hardcoded?
          locked: data.unlocked_puzzles.has(slug)
            ? "unlocked"
            : data.unlockable_puzzles.has(slug)
              ? "unlockable"
              : "locked",
          answer: data.correct_answers[slug],
        },
      ]),
    ),
  };
}
