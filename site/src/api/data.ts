import type Knex from "knex";
import {
  type InsertTeamRegistrationLogEntry,
  type InsertActivityLogEntry,
} from "knex/types/tables";
import {
  type DehydratedTeamRegistrationLogEntry,
  type TeamRegistration,
  type TeamRegistrationLogEntry,
  type DehydratedInternalActivityLogEntry,
  type InternalActivityLogEntry,
} from "../../lib/api/frontend_contract";
import { type Hunt } from "../huntdata/types";
import { omit } from "../utils/omit";
import {
  appendActivityLog as dbAppendActivityLog,
  getActivityLog as dbGetActivityLog,
  appendTeamRegistrationLog as dbAppendTeamRegistrationLog,
  getTeamRegistrationLog as dbGetTeamRegistrationLog,
  registerTeam as dbRegisterTeam,
  getTeamIds,
  retryOnAbort,
} from "./db";
import { TeamInfoIntermediate, TeamStateIntermediate } from "./logic";
import {
  type RedisClient,
  activityLog as redisActivityLog,
  teamRegistrationLog as redisTeamRegistrationLog,
  type Log as RedisLog,
} from "./redis";

export abstract class Mutator<T extends { id: number; team_id?: number }, I> {
  protected _trx: Knex.Knex.Transaction;
  private _log: T[];
  private _allTeams: Set<number>;
  private _affectedTeams: Set<number> | undefined;
  protected abstract _dbAppendLog(
    entry: I,
    trx: Knex.Knex.Transaction,
  ): Promise<T | undefined>;

  constructor(trx: Knex.Knex.Transaction, log: T[], allTeams: Set<number>) {
    this._trx = trx;
    this._log = log;
    this._affectedTeams = new Set();
    this._allTeams = allTeams;
  }

  async appendLog(entry: I) {
    const inserted_entry = await this._dbAppendLog(entry, this._trx);
    if (inserted_entry !== undefined) {
      this._log = this._log.concat([inserted_entry]);
      this.dirtyTeam(inserted_entry.team_id);
    }
    return inserted_entry;
  }

  // Mark a team as dirty
  dirtyTeam(teamId?: number) {
    if (teamId === undefined) {
      this._affectedTeams = undefined; // We don't know yet
    } else if (this._affectedTeams !== undefined) {
      this._affectedTeams.add(teamId);
    }
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
  InternalActivityLogEntry,
  InsertActivityLogEntry
> {
  private _teamStates: Map<
    number,
    { entryCount: number; state: TeamStateIntermediate }
  >;
  _dbAppendLog = dbAppendActivityLog;

  constructor(
    trx: Knex.Knex.Transaction,
    log: InternalActivityLogEntry[],
    allTeams: Set<number>,
  ) {
    super(trx, log, allTeams);
    this._teamStates = new Map();
  }

  // Get the team state as represented by all known activity logs for the team.
  getTeamState(hunt: Hunt, teamId: number) {
    if (!this.allTeams.has(teamId)) {
      throw new Error(`Mutator does not contain state for team ${teamId}`);
    }
    const state = this._teamStates.get(teamId) ?? {
      entryCount: 0,
      state: new TeamStateIntermediate(hunt),
    };
    const allNewEntries = this.log.slice(state.entryCount);
    if (allNewEntries.length > 0) {
      state.entryCount += allNewEntries.length;
      state.state = allNewEntries
        .filter((e) => e.team_id === teamId || e.team_id === undefined)
        .reduce((acc, entry) => acc.reduce(entry), state.state);
    }
    return state.state;
  }

  async recalculateTeamState(hunt: Hunt, teamId: number) {
    if (!this.allTeams.has(teamId)) {
      throw new Error(`Mutator does not contain state for team ${teamId}`);
    }
    // TODO: Skip recalculation if there are no new entries since the last time we recalculated.
    await recalculateTeamState(hunt, teamId, this);
    return this.getTeamState(hunt, teamId);
  }
}

async function recalculateTeamState(
  hunt: Hunt,
  team_id: number,
  mutator: ActivityLogMutator,
) {
  const start = performance.now();

  // What is already present in the activity log?
  const old = mutator.getTeamState(hunt, team_id);

  // What /should/ be in the activity log, based on the hunt description?
  const next = old.recalculateTeamState(hunt);
  const calculate_team_state_done = performance.now();

  // Compute the differences, and generate the requisite inserts.
  for (const slug of next.rounds_unlocked.difference(old.rounds_unlocked)) {
    await mutator.appendLog({
      team_id,
      type: "round_unlocked",
      slug,
    });
  }
  const unlock_rounds_done = performance.now();
  // These diff against the next state to make sure we don't insert an activity log entry out-of-order.
  const diff = {
    // puzzles_visible: next.puzzles_visible.difference(old.puzzles_visible),
    puzzles_unlockable: next.puzzles_unlockable
      .difference(old.puzzles_unlockable)
      .difference(next.puzzles_unlocked),
    puzzles_unlocked: next.puzzles_unlocked
      .difference(old.puzzles_unlocked)
      .difference(next.puzzles_solved),
    interactions_unlocked: next.interactions_unlocked
      .difference(old.interactions_unlocked)
      .difference(next.interactions_started),
  };
  const diff_done = performance.now();
  for (const slug of diff.puzzles_unlockable) {
    await mutator.appendLog({
      team_id,
      type: "puzzle_unlockable",
      slug,
    });
  }
  const puzzles_unlockable_done = performance.now();
  for (const slug of diff.puzzles_unlocked) {
    await mutator.appendLog({
      team_id,
      type: "puzzle_unlocked",
      slug,
    });
  }
  const puzzles_unlock_done = performance.now();
  for (const id of diff.interactions_unlocked) {
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

abstract class Log<
  I,
  T extends { id: number; team_id?: number },
  M extends Mutator<T, I>,
> {
  private _redisLog: RedisLog<I, T>;
  private _mutatorClass: new (
    trx: Knex.Knex.Transaction,
    log: T[],
    allTeams: Set<number>,
  ) => M;
  constructor(
    redisLog: RedisLog<I, T>,
    mutatorClass: new (
      trx: Knex.Knex.Transaction,
      log: T[],
      allTeams: Set<number>,
    ) => M,
  ) {
    this._redisLog = redisLog;
    this._mutatorClass = mutatorClass;
  }

  protected abstract dbGetLog(
    knex: Knex.Knex,
    teamId?: number,
    since?: number,
  ): Promise<T[]>;

  async getCachedTeamLog(
    knex: Knex.Knex,
    redisClient: RedisClient | undefined,
    teamId: number,
  ) {
    if (redisClient) {
      try {
        return await this._redisLog.getTeamLog(redisClient, teamId);
      } catch (err) {
        console.error("failed to read activity log from redis:", err);
      }
    }
    const entries = await this.dbGetLog(knex, teamId);
    return {
      highWaterMark: entries.at(-1)?.id ?? 0,
      entries,
    };
  }

  // Execute a mutation, either on a specific team, or potentially against all teams.  Note that fn
  // must not have any side effects; if the transaction aborts, it may be called multiple times.
  protected async executeRawMutation<R>(
    team_id: number | undefined,
    redisClient: RedisClient | undefined,
    knex: Knex.Knex,
    fn: (trx: Knex.Knex.Transaction, mutator: M) => R | PromiseLike<R>,
  ) {
    // All mutations need to follow a similar pattern for correctness:
    // 1. read the current log from cache if possible
    // 2. start transaction
    //   2a. select * from log where (team_id is null or team_id is ?) and id > ?
    //   2b. execute mutation, tracking the added log entries with their ids
    //   2c. commit transaction
    // 3. compute new state using the combined log, with the last added log id as the epoch
    let cached_log: {
      highWaterMark?: number;
      entries: T[];
    } = {
      highWaterMark: undefined,
      entries: [],
    };
    if (redisClient) {
      try {
        if (team_id === undefined) {
          cached_log = await this._redisLog.getGlobalLog(redisClient);
        } else {
          cached_log = await this._redisLog.getTeamLog(redisClient, team_id);
        }
      } catch (err) {
        console.error("failed to query redis:", err);
      }
    }
    const { result, activityLogEntries, affectedTeams } = await retryOnAbort(
      knex,
      async (trx: Knex.Knex.Transaction) => {
        const new_log = await this.dbGetLog(
          trx,
          team_id,
          cached_log.highWaterMark,
        );
        const combined_log = cached_log.entries.concat(new_log);
        const relevant_teams = new Set(
          team_id !== undefined ? [team_id] : await getTeamIds(trx),
        );
        const mutator = new this._mutatorClass(
          trx,
          combined_log,
          relevant_teams,
        );
        const result = await fn(trx, mutator);
        return {
          result,
          activityLogEntries: mutator.log,
          affectedTeams: mutator.affectedTeams,
        };
      },
    );
    if (redisClient && affectedTeams.size > 0) {
      // TODO: Do this in the background?
      try {
        await this.refreshRedisLog(redisClient, knex);
      } catch (err) {
        console.error("failed to refresh redis:", err);
      }
    }
    return { result, activityLogEntries };
  }

  async refreshRedisLog(redisClient: RedisClient, knex: Knex.Knex) {
    // Read the latest activity log entry we already have in Redis.
    const latest = await this._redisLog.getGlobalHighWaterMark(redisClient);
    // Find any newer entries in the DB
    const entries = await knex.transaction(
      (trx) => this.dbGetLog(trx, undefined, latest),
      { readOnly: true },
    );
    // Publish them!
    await this._redisLog.extend(redisClient, entries);
  }
}

export class ActivityLog extends Log<
  DehydratedInternalActivityLogEntry,
  InternalActivityLogEntry,
  ActivityLogMutator
> {
  constructor() {
    super(redisActivityLog, ActivityLogMutator);
  }

  protected dbGetLog(knex: Knex.Knex, teamId?: number, since?: number) {
    return dbGetActivityLog(teamId, since, knex);
  }

  async executeMutation<R>(
    hunt: Hunt,
    team_id: number | undefined,
    redisClient: RedisClient | undefined,
    knex: Knex.Knex,
    fn: (
      trx: Knex.Knex.Transaction,
      mutator: ActivityLogMutator,
    ) => R | PromiseLike<R>,
  ) {
    const result = await super.executeRawMutation(
      team_id,
      redisClient,
      knex,
      async (trx: Knex.Knex.Transaction, mutator: ActivityLogMutator) => {
        const result = await fn(trx, mutator);
        const teamStates: Record<number, TeamStateIntermediate> = {};
        for (const teamId of mutator.affectedTeams) {
          teamStates[teamId] = await mutator.recalculateTeamState(hunt, teamId);
        }
        for (const teamId of mutator.allTeams) {
          // TODO: Only do this work if the caller needs it?
          if (teamStates[teamId] === undefined) {
            teamStates[teamId] = mutator.getTeamState(hunt, teamId);
          }
        }
        return { result, teamStates };
      },
    );
    return {
      ...result,
      ...result.result,
    };
  }
}

export const activityLog = new ActivityLog();

export class TeamRegistrationLogMutator extends Mutator<
  TeamRegistrationLogEntry,
  InsertTeamRegistrationLogEntry
> {
  _dbAppendLog = dbAppendTeamRegistrationLog;

  // Get the team registration as represented by all known registration logs for the team.
  getTeamRegistration(teamId: number) {
    const teamLogs = this.log.filter((e) => e.team_id === teamId);
    return teamLogs
      .reduce((acc, entry) => acc.reduce(entry), new TeamInfoIntermediate())
      .formatTeamRegistration();
  }
}

export class TeamRegistrationLog extends Log<
  DehydratedTeamRegistrationLogEntry,
  TeamRegistrationLogEntry,
  TeamRegistrationLogMutator
> {
  constructor() {
    super(redisTeamRegistrationLog, TeamRegistrationLogMutator);
  }
  protected dbGetLog(knex: Knex.Knex, teamId?: number, since?: number) {
    return dbGetTeamRegistrationLog(teamId, since, knex);
  }
  async executeMutation<R>(
    team_id: number,
    redisClient: RedisClient | undefined,
    knex: Knex.Knex,
    fn: (
      trx: Knex.Knex.Transaction,
      mutator: TeamRegistrationLogMutator,
    ) => R | PromiseLike<R>,
  ) {
    return await this.executeRawMutation(team_id, redisClient, knex, fn);
  }
}

export const teamRegistrationLog = new TeamRegistrationLog();

export async function registerTeam(
  hunt: Hunt,
  redisClient: RedisClient | undefined,
  knex: Knex.Knex,
  data: TeamRegistration,
) {
  return await retryOnAbort(knex, async (trx) => {
    const team_id = await dbRegisterTeam(trx, data);
    await teamRegistrationLog.executeMutation(
      team_id,
      redisClient,
      trx,
      async (_, mutator) => {
        await mutator.appendLog({
          type: "team_registered",
          team_id,
          data,
        });
      },
    );
    await activityLog.executeMutation(
      hunt,
      team_id,
      redisClient,
      trx,
      (_, mutator) => {
        // Force an initial recalculateTeamState for this new user
        mutator.dirtyTeam(team_id);
      },
    );
    return team_id;
  });
}
