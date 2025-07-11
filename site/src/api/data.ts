import type Knex from "knex";
import {
  type InsertTeamRegistrationLogEntry,
  type InsertActivityLogEntry,
  type InsertPuzzleStateLogEntry,
  type InsertTeamInteractionStateLogEntry,
} from "knex/types/tables";
import {
  type FermitSession,
  type FermitAnswer,
  type FermitRegistration,
} from "../../lib/api/admin_contract";
import { type TeamRegistration } from "../../lib/api/contract";
import {
  type DehydratedTeamRegistrationLogEntry,
  type TeamRegistrationLogEntry,
  type DehydratedInternalActivityLogEntry,
  type InternalActivityLogEntry,
  type DehydratedPuzzleStateLogEntry,
  type PuzzleStateLogEntry,
  type TeamInteractionStateLogEntry,
  type DehydratedTeamInteractionStateLogEntry,
} from "../../lib/api/frontend_contract";
import { type Hunt } from "../huntdata/types";
import teamIsImmutable from "../utils/teamIsImmutable";
import {
  appendActivityLog as dbAppendActivityLog,
  getActivityLog as dbGetActivityLog,
  appendTeamRegistrationLog as dbAppendTeamRegistrationLog,
  getTeamRegistrationLog as dbGetTeamRegistrationLog,
  registerTeam as dbRegisterTeam,
  getTeamIds,
  getPuzzleStateLog as dbGetPuzzleStateLog,
  appendPuzzleStateLog as dbAppendPuzzleStateLog,
  getTeamInteractionStateLog as dbGetTeamInteractionStateLog,
  appendTeamInteractionStateLog as dbAppendTeamInteractionStateLog,
  retryOnAbort,
  getFermitSession as dbGetFermitSession,
  getFermitSessions as dbGetFermitSessions,
  insertFermitSession as dbInsertFermitSession,
  updateFermitSession as dbUpdateFermitSession,
  getFermitAnswers as dbGetFermitAnswers,
  insertFermitAnswers as dbInsertFermitAnswers,
  getFermitRegistrations as dbGetFermitRegistrations,
  insertFermitRegistration as dbInsertFermitRegistration,
  deleteFermitRegistration as dbDeleteFermitRegistration,
  updateFermitRegistration as dbUpdateFermitRegistration,
  getTeamUsername,
} from "./db";
import {
  type ActivityLogMutatorInterface,
  TeamInfoIntermediate,
  TeamStateIntermediate,
  recalculateTeamState,
} from "./logic";
import {
  type RedisClient,
  activityLog as redisActivityLog,
  teamRegistrationLog as redisTeamRegistrationLog,
  puzzleStateLog as redisPuzzleStateLog,
  teamInteractionStateLog as redisTeamInteractionStateLog,
  type Log as RedisLog,
  getTeamCaches,
  publishTeamCache,
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

export class ActivityLogMutator
  extends Mutator<InternalActivityLogEntry, InsertActivityLogEntry>
  implements ActivityLogMutatorInterface
{
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

    let state = this._teamStates.get(teamId);
    if (!state) {
      state = {
        entryCount: 0,
        state: new TeamStateIntermediate(hunt),
      };

      this._teamStates.set(teamId, state);
    }

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

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions -- This cannot be represented as a type.
interface Reducer<Entry extends { id: number }, RedisType> {
  epoch: number;
  reduce(entry: Entry): this;
  dehydrate(): RedisType;
}

type ReducerConstructor<
  Entry extends { id: number },
  RedisType,
  HydratedType extends Reducer<Entry, RedisType>,
> = {
  hydrate: (redisData?: RedisType) => HydratedType;
  redisKey: string;
};

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

  async getCachedReducers<
    ReducerConstructors extends ReducerConstructor<
      T,
      unknown,
      Reducer<T, unknown>
    >[],
  >(
    knex: Knex.Knex,
    redisClient: RedisClient | undefined,
    teamId: number,
    ...reducerTypes: ReducerConstructors
  ): Promise<{
    [K in keyof ReducerConstructors]: ReturnType<
      ReducerConstructors[K]["hydrate"]
    >;
  }> {
    if (redisClient) {
      try {
        const cached = await getTeamCaches(
          redisClient,
          teamId,
          ...reducerTypes,
        );
        const lowWaterMark = Math.max(
          0,
          Math.min(...cached.map((c) => c.epoch)),
        );

        const extraEntries = await this._redisLog.getTeamLog(
          redisClient,
          teamId,
          lowWaterMark,
        );
        const reduced = cached.map((start) => {
          const end = extraEntries.entries.reduce(
            (acc, entry) => (entry.id > acc.epoch ? acc.reduce(entry) : acc),
            start,
          );
          return end;
        });

        // TODO: perhaps elide publishing state if it didn't change
        await Promise.all(
          reduced.map((updatedState, i) => {
            const type = reducerTypes[i];
            if (!type) {
              throw new Error("Mismatched length of reducerTypes");
            }

            return publishTeamCache(
              redisClient,
              teamId,
              updatedState,
              type.redisKey,
            );
          }),
        );

        return reduced as {
          [K in keyof ReducerConstructors]: ReturnType<
            ReducerConstructors[K]["hydrate"]
          >;
        };
      } catch (err) {
        console.error("failed to read caches from redis:", err);
      }
    }
    const entries = await this.dbGetLog(knex, teamId);
    return reducerTypes.map((reducerType) =>
      entries.reduce((acc, entry) => acc.reduce(entry), reducerType.hydrate()),
    ) as {
      [K in keyof ReducerConstructors]: ReturnType<
        ReducerConstructors[K]["hydrate"]
      >;
    };
  }

  async getCachedLog(
    knex: Knex.Knex,
    redisClient: RedisClient | undefined,
    teamId?: number,
  ) {
    if (redisClient) {
      try {
        if (teamId === undefined) {
          return await this._redisLog.getGlobalLog(redisClient);
        }
        return await this._redisLog.getTeamLog(redisClient, teamId);
      } catch (err) {
        console.error("failed to read team activity log from redis:", err);
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
    { allowImmutable = false } = {},
  ) {
    if (!allowImmutable && team_id) {
      const username = await getTeamUsername(knex, team_id);

      if (!username) {
        throw new Error(`Team with id ${team_id} not found`);
      }

      if (teamIsImmutable(username)) {
        throw new Error("Cannot make changes to an immutable team");
      }
    }
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
    const { result, logEntries, affectedTeams } = await retryOnAbort(
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
          logEntries: mutator.log,
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
    return { result, logEntries };
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
    { allowImmutable = false } = {},
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
      { allowImmutable },
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
  private _teamInfos: Map<
    number,
    { entryCount: number; info: TeamInfoIntermediate }
  >;
  _dbAppendLog = dbAppendTeamRegistrationLog;

  constructor(
    trx: Knex.Knex.Transaction,
    log: TeamRegistrationLogEntry[],
    allTeams: Set<number>,
  ) {
    super(trx, log, allTeams);
    this._teamInfos = new Map();
  }

  // Get the team registration as represented by all known registration logs for the team.
  getTeamRegistration(teamId: number) {
    let info = this._teamInfos.get(teamId);
    if (!info) {
      info = {
        entryCount: 0,
        info: new TeamInfoIntermediate(),
      };

      this._teamInfos.set(teamId, info);
    }

    const allNewEntries = this.log.slice(info.entryCount);
    if (allNewEntries.length > 0) {
      info.entryCount += allNewEntries.length;
      info.info = allNewEntries
        .filter((e) => e.team_id === teamId)
        .reduce((acc, entry) => acc.reduce(entry), info.info);
    }

    return info.info.formatTeamRegistrationState();
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
    { allowImmutable = false } = {},
  ) {
    return await this.executeRawMutation(team_id, redisClient, knex, fn, {
      allowImmutable,
    });
  }
}

export const teamRegistrationLog = new TeamRegistrationLog();

export async function registerTeam(
  hunt: Hunt,
  redisClient: RedisClient | undefined,
  knex: Knex.Knex,
  data: TeamRegistration,
): Promise<
  { usernameAvailable: false } | { usernameAvailable: true; teamId: number }
> {
  return await retryOnAbort(knex, async (trx) => {
    const regResult = await dbRegisterTeam(trx, data);
    if (!regResult.usernameAvailable) {
      return { usernameAvailable: false };
    }

    const team_id = regResult.teamId;

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
      { allowImmutable: true },
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
      { allowImmutable: true },
    );

    return { usernameAvailable: true, teamId: team_id };
  });
}

export class PuzzleStateLogMutator extends Mutator<
  PuzzleStateLogEntry,
  InsertPuzzleStateLogEntry
> {
  _dbAppendLog = dbAppendPuzzleStateLog;
}

export class PuzzleStateLog extends Log<
  DehydratedPuzzleStateLogEntry,
  PuzzleStateLogEntry,
  PuzzleStateLogMutator
> {
  constructor() {
    super(redisPuzzleStateLog, PuzzleStateLogMutator);
  }

  protected dbGetLog(knex: Knex.Knex, teamId?: number, since?: number) {
    return dbGetPuzzleStateLog(teamId, since, knex);
  }

  async executeMutation<R>(
    team_id: number,
    redisClient: RedisClient | undefined,
    knex: Knex.Knex,
    fn: (
      trx: Knex.Knex.Transaction,
      mutator: PuzzleStateLogMutator,
    ) => R | PromiseLike<R>,
  ) {
    return await this.executeRawMutation(team_id, redisClient, knex, fn);
  }
}

export const puzzleStateLog = new PuzzleStateLog();

export async function createFermitSession(
  title: string,
  questionIds: number[],
  knex: Knex.Knex,
): Promise<FermitSession | undefined> {
  return dbInsertFermitSession(
    {
      title: title,
      question_ids: JSON.stringify(questionIds),
    },
    knex,
  );
}

export class TeamInteractionStateLogMutator extends Mutator<
  TeamInteractionStateLogEntry,
  InsertTeamInteractionStateLogEntry
> {
  _dbAppendLog = dbAppendTeamInteractionStateLog;
}

export class TeamInteractionStateLog extends Log<
  DehydratedTeamInteractionStateLogEntry,
  TeamInteractionStateLogEntry,
  TeamInteractionStateLogMutator
> {
  constructor() {
    super(redisTeamInteractionStateLog, TeamInteractionStateLogMutator);
  }

  protected dbGetLog(knex: Knex.Knex, teamId?: number, since?: number) {
    return dbGetTeamInteractionStateLog(teamId, since, undefined, knex);
  }

  async executeMutation<R>(
    team_id: number,
    redisClient: RedisClient | undefined,
    knex: Knex.Knex,
    fn: (
      trx: Knex.Knex.Transaction,
      mutator: TeamInteractionStateLogMutator,
    ) => R | PromiseLike<R>,
  ) {
    return await this.executeRawMutation(team_id, redisClient, knex, fn);
  }
}

export const teamInteractionStateLog = new TeamInteractionStateLog();
export async function updateFermitSession(
  session: FermitSession,
  knex: Knex.Knex,
): Promise<FermitSession | undefined> {
  const dbSession = await dbUpdateFermitSession(
    session.id,
    {
      title: session.title,
      status: session.status,
      question_ids: JSON.stringify(session.questionIds),
    },
    knex,
  );
  if (dbSession) {
    return {
      ...dbSession,
      id: session.id,
      teams: session.teams,
    };
  } else {
    return undefined;
  }
}

export async function getFermitSession(
  sessionId: number,
  knex: Knex.Knex,
): Promise<FermitSession | undefined> {
  const [session, registrations] = await Promise.all([
    dbGetFermitSession(sessionId, knex),
    dbGetFermitRegistrations(sessionId, knex),
  ]);
  if (!session) {
    return undefined;
  }
  registrations.forEach((r) => {
    if (r.sessionId === session.id) {
      session.teams.push({
        id: r.teamId,
        status: r.status,
      });
    }
  });
  return session;
}

export async function getFermitSessions(
  knex: Knex.Knex,
): Promise<FermitSession[]> {
  const sessions = await dbGetFermitSessions(knex);
  const registrations = await dbGetFermitRegistrations(undefined, knex);
  const teamsBySession = new Map<number, { id: number; status: string }[]>();

  registrations.forEach((r) => {
    const teams = teamsBySession.get(r.sessionId) ?? [];
    teams.push({ id: r.teamId, status: r.status });
    teamsBySession.set(r.sessionId, teams);
  });

  sessions.forEach((s) => {
    s.teams = teamsBySession.get(s.id) ?? [];
  });

  return sessions;
}

export async function getFermitAnswers(
  sessionId: number,
  knex: Knex.Knex,
): Promise<FermitAnswer[]> {
  return dbGetFermitAnswers(sessionId, knex);
}

export async function saveFermitAnswers(
  answers: FermitAnswer[],
  knex: Knex.Knex,
): Promise<number> {
  // TODO: precondition is that these answers share a session
  // TODO: only allow this for answers where the session is in "in_progress" status
  return dbInsertFermitAnswers(answers, knex);
}

export async function getFermitRegistrations(
  sessionId: number | undefined,
  knex: Knex.Knex,
): Promise<FermitRegistration[]> {
  return dbGetFermitRegistrations(sessionId, knex);
}

export async function createFermitRegistration(
  sessionId: number,
  teamId: number,
  knex: Knex.Knex,
): Promise<FermitRegistration | undefined> {
  // abort if the session isn't in "not_started" status
  const session = await dbGetFermitSession(sessionId, knex);
  if (session?.status === "not_started") {
    return dbInsertFermitRegistration(sessionId, teamId, "checked_in", knex);
  }
  return undefined;
}

export async function deleteFermitRegistration(
  sessionId: number,
  teamId: number,
  knex: Knex.Knex,
): Promise<boolean> {
  // abort if the session isn't in "not_started" status
  const session = await dbGetFermitSession(sessionId, knex);
  if (session?.status === "not_started") {
    return dbDeleteFermitRegistration(sessionId, teamId, knex);
  }
  return false;
}

export async function updateFermitRegistration(
  sessionId: number,
  teamId: number,
  status: string,
  knex: Knex.Knex,
): Promise<FermitRegistration | undefined> {
  const session = await dbGetFermitSession(sessionId, knex);
  if (session?.status === "not_started") {
    return dbUpdateFermitRegistration(sessionId, teamId, status, knex);
  }
  return undefined;
}
