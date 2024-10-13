import type Knex from "knex";
import {
  type TeamPuzzleGuess,
  type ActivityLogEntry,
  InsertActivityLogEntry,
} from "knex/types/tables";
import {
  appendActivityLog as dbAppendActivityLog,
  getActivityLog as dbGetActivityLog,
  retryOnAbort,
} from "./db";
import {
  type RedisClient,
  appendActivityLog,
  getGlobalHighWaterMark,
  getTeamActivityLog as redisGetTeamActivityLog,
} from "./redis";
import { type Hunt } from "../huntdata/types";
import { reducerDeriveTeamState } from "./logic";

export class Mutator {
  private _trx: Knex.Knex.Transaction;
  private _activityLog: ActivityLogEntry[];
  private _guessLog?: TeamPuzzleGuess[];
  private _affectedTeams: Set<number> | undefined;

  constructor(trx: Knex.Knex.Transaction, activityLog: ActivityLogEntry[]) {
    this._trx = trx;
    this._activityLog = activityLog;
    this._affectedTeams = new Set();
  }

  async appendActivityLog(entry: InsertActivityLogEntry) {
    const inserted_entry = await dbAppendActivityLog(entry, this._trx);
    this._activityLog = (this._activityLog ?? []).concat([inserted_entry]);
    if (inserted_entry.team_id === undefined) {
      this._affectedTeams = undefined; // We don't know yet
    } else if (this._affectedTeams !== undefined) {
      this._affectedTeams.add(inserted_entry.team_id);
    }
    return inserted_entry;
  }

  // Refresh the state for every team that was affected.
  // We assume that this.activityLog contains the full activity log for all affected teams.
  async recalculateState(hunt: Hunt) {
    for (const team_id of this.affectedTeams) {
      if (team_id != undefined) {
        await recalculateTeamState(
          hunt,
          team_id,
          this.activityLog.filter(
            (e) => e.team_id == team_id || e.team_id === undefined,
          ),
          this,
        );
      }
    }
  }

  get activityLog() {
    return this._activityLog;
  }

  get affectedTeams() {
    if (this._affectedTeams === undefined) {
      return new Set(
        this.activityLog
          .map((e) => e.team_id)
          .filter((t) => typeof t == "number"),
      );
    }
    return this._affectedTeams;
  }
}
export async function recalculateTeamState(
  hunt: Hunt,
  team_id: number,
  activity_log: ActivityLogEntry[],
  mutator: Mutator,
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
    await mutator.appendActivityLog({
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
    await mutator.appendActivityLog({
      team_id,
      type: "puzzle_unlockable",
      slug,
    });
  }
  const puzzles_unlockable_done = performance.now();
  for (const slug of diff.unlocked_puzzles) {
    await mutator.appendActivityLog({
      team_id,
      type: "puzzle_unlocked",
      slug,
    });
  }
  const puzzles_unlock_done = performance.now();
  for (const id of diff.unlocked_interactions) {
    await mutator.appendActivityLog({
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
  fn: (
    trx: Knex.Knex.Transaction,
    mutator: Mutator,
  ) => Promise<T>,
) {
  // All mutations need to follow a similar pattern for correctness:
  // 1. read the current activity log from cache if possible
  // 2. start transaction
  //   2a. select * from activity_log where (team_id is null or team_id is ?) and id > ?
  //   2b. execute mutation, tracking the added activity log entries with their ids
  //   2c. commit transaction
  // 3. compute team/puzzle state using the combined activity log, with the last added activity log id as the epoch
  let cached_log: { highWaterMark?: number; entries: ActivityLogEntry[] } = {
    highWaterMark: undefined,
    entries: [],
  };
  if (redisClient) {
    try {
      cached_log = await redisGetTeamActivityLog(redisClient, team_id);
    } catch (err) {
      console.error("failed to query redis:", err);
    }
  }
  const { result, activityLog, affectedTeams } = await retryOnAbort(
    knex,
    async function (trx: Knex.Knex.Transaction) {
      const new_log = await dbGetActivityLog(
        team_id,
        cached_log.highWaterMark,
        trx,
      );
      const combined_log = cached_log.entries.concat(new_log);
      const mutator = new Mutator(trx, combined_log);
      const result = await fn(trx, mutator);
      await mutator.recalculateState(hunt);
      return {
        result,
        activityLog: mutator.activityLog,
        affectedTeams: mutator.affectedTeams,
      };
    },
  );
  if (redisClient && affectedTeams) {
    // TODO: Do this in the background?
    await refreshActivityLog(redisClient, knex);
    // FIXME: Regenerate and publish modified team state
  }
  return { result, activityLog };
}

async function refreshActivityLog(redisClient: RedisClient, knex: Knex.Knex) {
  // Read the latest activity log entry we already have in Redis.
  const latest = await getGlobalHighWaterMark(redisClient);
  // Find any newer entries in the DB
  const entries = await knex.transaction(
    (trx) => dbGetActivityLog(undefined, latest, trx),
    { readOnly: true },
  );
  // Publish them!
  // TODO: Use Redis pipelining to make this faster
  for (const e of entries) {
    await appendActivityLog(redisClient, e);
  }
}
