import type Knex from "knex";
import { type InsertActivityLogEntry } from "knex/types/tables";
import { type z } from "zod";
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
import { TeamStateIntermediate } from "./logic";
import { type RedisClient, activityLog as redisActivityLog } from "./redis";

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
  InternalActivityLogEntry,
  InsertActivityLogEntry
> {
  private _teamStates: Map<
    number,
    { entryCount: number; state: TeamStateIntermediate }
  >;

  constructor(
    trx: Knex.Knex.Transaction,
    log: InternalActivityLogEntry[],
    allTeams: Set<number>,
  ) {
    super(trx, log, allTeams, dbAppendActivityLog);
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
  const { result, activityLog, affectedTeams, teamNames, teamStates } =
    await retryOnAbort(knex, async function (trx: Knex.Knex.Transaction) {
      const new_log = await dbGetActivityLog(
        team_id,
        cached_log.highWaterMark,
        trx,
      );
      const combined_log = cached_log.entries.concat(new_log);
      const mutator = new ActivityLogMutator(
        trx,
        combined_log,
        new Set([team_id]),
      );
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
      const teamNames = await getTeamNames(mutator.allTeams, trx);
      return {
        result,
        activityLog: mutator.log,
        affectedTeams: mutator.affectedTeams,
        teamNames,
        teamStates,
      };
    });
  if (redisClient && affectedTeams.size > 0) {
    // TODO: Do this in the background?
    await refreshActivityLog(redisClient, knex);
  }
  return { result, activityLog, teamNames, teamStates };
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
  data: TeamStateIntermediate,
) {
  const rounds = Object.fromEntries(
    hunt.rounds
      .filter(({ slug: roundSlug }) => data.rounds_unlocked.has(roundSlug))
      .map(({ slug, title, puzzles, gates, interactions }) => {
        const interactionsData: [string, InteractionState][] = (
          interactions ?? []
        ).flatMap((interaction) => {
          if (data.interactions_unlocked.has(interaction.id)) {
            return [
              [
                interaction.id,
                data.interactions_completed.has(interaction.id)
                  ? {
                      state: "completed" as const,
                      result: data.interactions_completed.get(interaction.id),
                    }
                  : data.interactions_started.has(interaction.id)
                    ? { state: "running" as const }
                    : { state: "unlocked" as const },
              ],
            ];
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
                if (slug && data.puzzles_visible.has(slug)) {
                  const obj = { slug, is_meta: slot.is_meta };
                  return [[slot.id, obj]];
                }
                return [];
              }),
            ),
            gates: gates?.flatMap((gate) => {
              if (gate.id && data.gates_satisfied.has(gate.id)) {
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
      [...data.puzzles_visible].map((slug) => [
        slug,
        {
          round: puzzleRounds[slug] ?? "outlands", // TODO: Should this be hardcoded?
          locked: data.puzzles_unlocked.has(slug)
            ? ("unlocked" as const)
            : data.puzzles_unlockable.has(slug)
              ? ("unlockable" as const)
              : ("locked" as const),
          answer: data.correct_answers[slug],
          ...(data.puzzles_stray.has(slug) ? { stray: true } : {}),
        },
      ]),
    ),
  };
}
