import path from "path";
import Knex from "knex";
import {
  type TeamRegistrationLogEntryRow,
  type ActivityLogEntryRow,
  type InsertActivityLogEntry,
  type InsertTeamRegistrationLogEntry,
  type PuzzleStateLogEntryRow,
  type InsertPuzzleStateLogEntry,
  type FermitRegistrationRow,
  type FermitSessionRow,
  type InsertFermitSession,
  type UpdateFermitSession,
} from "knex/types/tables";
import pRetry from "p-retry"; // eslint-disable-line import/default, import/no-named-as-default -- eslint fails to parse the import
import connections from "../../knexfile";
import {
  type FermitSession,
  type FermitAnswer,
  type FermitRegistration,
} from "../../lib/api/admin_contract";
import { type TeamRegistration } from "../../lib/api/contract";
import {
  type TeamRegistrationLogEntry,
  type InternalActivityLogEntry,
  type PuzzleStateLogEntry,
} from "../../lib/api/frontend_contract";
import { jsonPathValue } from "../../lib/migration_helper";
import { type CannedResponseLink } from "../frontend/puzzles/types";

export {
  type ActivityLogEntryRow,
  type TeamRegistrationLogEntryRow,
  type PuzzleStateLogEntryRow,
};

class WebpackMigrationSource {
  context: Rspack.Context;

  constructor(context: Rspack.Context) {
    this.context = context;
  }

  getMigrations() {
    return Promise.resolve(this.context.keys().sort());
  }

  getMigrationName(migration: string) {
    return path.parse(migration).base;
  }

  getMigration(migration: string): Promise<Knex.Knex.Migration> {
    return this.context(migration) as Promise<Knex.Knex.Migration>;
  }
}

class WebpackSeedSource {
  context: Rspack.Context;

  constructor(context: Rspack.Context) {
    this.context = context;
  }

  getSeeds() {
    const seeds = (process.env.SEED_FILES ?? "demo.ts")
      .split(",")
      .map((f) => f.trim());

    const keys = this.context
      .keys()
      .filter((key) => {
        return seeds.find((seed) => key.endsWith(`/${seed}`));
      })
      .sort();

    console.log("Running seeds:", keys);

    return Promise.resolve(keys);
  }

  getSeed(seed: string): Promise<Knex.Knex.Seed> {
    return this.context(seed) as Promise<Knex.Knex.Seed>;
  }
}

export async function connect(environment: string) {
  const config = connections[environment];
  if (!config) {
    throw new Error("unrecognized environment");
  }

  const knex = Knex(config);

  const migrationContext = import.meta.webpackContext("../../migrations", {
    regExp: /^\.\/.*\.ts$/,
  });

  // Perform any pending migrations.
  await knex.migrate.latest({
    migrationSource: new WebpackMigrationSource(migrationContext),
  });

  if (
    environment === "memory" ||
    environment === "development" ||
    environment === "ci"
  ) {
    const seedContext = import.meta.webpackContext("../../seeds", {
      regExp: /^\.\/.*\.ts$/,
    });

    await knex.seed.run({
      seedSource: new WebpackSeedSource(seedContext),
    });
  }
  return knex;
}

export async function retryOnAbort<T>(
  knex: Knex.Knex,
  fn: (trx: Knex.Knex.Transaction) => Promise<T>,
): Promise<T> {
  return await pRetry(
    async () =>
      await knex.transaction(fn, {
        isolationLevel: "serializable",
      }),
    {
      shouldRetry: (error) =>
        "code" in error &&
        // https://www.postgresql.org/docs/current/errcodes-appendix.html
        (error.code === "40002" || // transaction_integrity_constraint_violation
          error.code === "40001" || // serialization_failure
          error.code === "40003" || // statement_completion_unknown
          error.code === "40P01"), // deadlock_detected
      onFailedAttempt: (err) => {
        console.error("transaction failed:", err);
      },
      retries: 5,
      minTimeout: 0,
      factor: 1, // No need for exponential backoff
    },
  );
}

declare module "knex/types/tables" {
  type Team = {
    id: number;
    username: string;
    password?: string;
    deactivated: boolean;
  };

  type InsertTeam = Omit<Team, "id" | "deactivated"> & {
    deactivated?: boolean;
  };

  // "correct" means the puzzle is solved and no longer allows new answer submissions
  // "incorrect" guesses count towards rate limits
  // "other" is used for canned responses (which we don't want to count towards incorrect-answer rate limits)
  type GuessStatus = "correct" | "incorrect" | "other";

  type InsertActivityLogEntry = {
    team_id?: number;
    currency_delta?: number;
    strong_currency_delta?: number;
    internal_data?: {
      operator?: string;
    };
  } & (
    | {
        type: "currency_adjusted";
      }
    | {
        type: "round_unlocked";
        slug: string;
      }
    | {
        type: "puzzle_unlockable";
        slug: string;
      }
    | {
        type: "puzzle_unlocked";
        slug: string;
      }
    | {
        type: "puzzle_guess_submitted";
        slug: string;
        data: {
          status: GuessStatus;
          canonical_input: string;
          response: string;
          link?: CannedResponseLink;
        };
      }
    | {
        type: "puzzle_partially_solved";
        slug: string;
        data: {
          partial: string;
        };
      }
    | {
        type: "puzzle_solved";
        slug: string;
        data: {
          answer: string;
        };
      }
    | {
        type: "interaction_unlocked";
        slug: string;
      }
    | {
        type: "interaction_started";
        slug: string;
      }
    | {
        type: "interaction_completed";
        slug: string;
        data: {
          result: string;
        };
      }
    | {
        type: "gate_completed";
        slug: string; // the id of the gate
      }
    | {
        type: "rate_limits_reset";
        slug: string; // the puzzle which is having its rate limit reset
      }
    | {
        type: "strong_currency_adjusted";
      }
    | {
        type: "strong_currency_exchanged";
      }
    | {
        type: "puzzle_answer_bought";
        slug: string; // the puzzle which had its answer bought
        data: {
          answer: string;
        };
      }
  );

  // ActivityLogEntryRow is the type as returned by the various database engines.
  type ActivityLogEntryRow = {
    id: number;
    // SQLite returns timestamps as strings.
    timestamp: Date | string;
    team_id: number | null;
    type: string;
    slug: string | null;
    currency_delta: number;
    strong_currency_delta: number;
    // SQLite returns JSON fields as strings.
    data: string | object | null;
    internal_data: string | object | null;
  };

  type TeamRegistrationLogEntryRow = {
    id: number;
    // SQLite returns timestamps as strings.
    timestamp: Date | string;
    team_id: number;
    type: string;
    // SQLite returns JSON fields as strings.
    data: string | object | null;
  };

  type InsertTeamRegistrationLogEntry = Pick<
    TeamRegistrationLogEntry,
    "team_id" | "type" | "data"
  >;

  type PuzzleStateLogEntryRow = {
    id: number;
    // SQLite returns timestamps as strings.
    timestamp: Date | string;
    team_id: number;
    slug: string;
    // SQLite returns JSON fields as strings.
    data: string | object;
  };

  type InsertPuzzleStateLogEntry = Pick<
    PuzzleStateLogEntryRow,
    "team_id" | "slug" | "data"
  >;

  type FermitSessionRow = {
    id: number;
    status: string;
    title: string;
    // SQLite returns JSON fields as string.
    question_ids: string | number[];
  };

  type InsertFermitSession = Pick<FermitSessionRow, "title" | "question_ids">;

  type UpdateFermitSession = Partial<Omit<FermitSessionRow, "id">>;

  type FermitAnswerRow = {
    id: number;
    session_id: number;
    team_id: number;
    question_index: number;
    answer: number | null;
  };

  type FermitRegistrationRow = {
    id: number;
    session_id: number;
    team_id: number;
    status: string;
  };

  /* eslint-disable-next-line @typescript-eslint/consistent-type-definitions --
   * This must be defined as an interface as it's extending a declaration from
   * knex
   */
  interface Tables {
    teams: Knex.Knex.CompositeTableType<Team, InsertTeam>;
    activity_log: Knex.Knex.CompositeTableType<
      ActivityLogEntryRow,
      InsertActivityLogEntry
    >;
    team_registration_log: Knex.Knex.CompositeTableType<
      TeamRegistrationLogEntryRow,
      InsertTeamRegistrationLogEntry
    >;
    puzzle_state_log: Knex.Knex.CompositeTableType<
      PuzzleStateLogEntryRow,
      InsertPuzzleStateLogEntry
    >;
    fermit_sessions: Knex.Knex.CompositeTableType<
      FermitSessionRow,
      InsertFermitSession,
      UpdateFermitSession
    >;
    fermit_answers: FermitAnswerRow;
    fermit_registrations: FermitRegistrationRow;
  }
}

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
export function fixData(value: string | object): object {
  // SQLite returns json fields as strings, and the driver doesn't automatically parse them.
  if (typeof value === "string") {
    return JSON.parse(value) as object;
  }
  return value;
}

// Fix a JSON field that has come from the database.
export function fixArray<T>(value: string | T[]): T[] {
  // SQLite returns json fields as strings, and the driver doesn't automatically parse them.
  if (typeof value === "string") {
    return JSON.parse(value) as T[];
  }
  return value;
}

// Fix the various inconsistencies in queried data across Postgres and SQLite.
export function cleanupActivityLogEntryFromDB(
  dbEntry: ActivityLogEntryRow,
): InternalActivityLogEntry {
  const res: Partial<InternalActivityLogEntry> = {
    id: dbEntry.id,
    team_id: dbEntry.team_id ?? undefined,
    timestamp: fixTimestamp(dbEntry.timestamp),
    currency_delta: dbEntry.currency_delta,
    strong_currency_delta: dbEntry.strong_currency_delta,
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

// Fix the various inconsistencies in queried data across Postgres and SQLite.
export function cleanupTeamRegistrationLogEntryFromDB(
  dbEntry: TeamRegistrationLogEntryRow,
): TeamRegistrationLogEntry {
  const res: Partial<TeamRegistrationLogEntry> = {
    id: dbEntry.id,
    team_id: dbEntry.team_id,
    timestamp: fixTimestamp(dbEntry.timestamp),
    type: dbEntry.type as TeamRegistrationLogEntry["type"],
  };
  if (dbEntry.data) {
    (res as TeamRegistrationLogEntry | { data?: object }).data = fixData(
      dbEntry.data,
    );
  }
  return res as TeamRegistrationLogEntry;
}

export function cleanupPuzzleStateLogEntryFromDB(
  dbEntry: PuzzleStateLogEntryRow,
): PuzzleStateLogEntry {
  const res: Partial<PuzzleStateLogEntry> = {
    id: dbEntry.id,
    team_id: dbEntry.team_id,
    timestamp: fixTimestamp(dbEntry.timestamp),
    slug: dbEntry.slug,
  };
  if (dbEntry.data) {
    (res as PuzzleStateLogEntry | { data?: object }).data = fixData(
      dbEntry.data,
    );
  }
  return res as PuzzleStateLogEntry;
}

export async function getTeamIds(
  trx: Knex.Knex.Transaction,
): Promise<number[]> {
  return trx("teams").pluck("id");
}

export async function getActivityLog(
  team_id: number | undefined,
  since: number | undefined,
  trx: Knex.Knex,
) {
  let query = trx<ActivityLogEntryRow>("activity_log");
  if (team_id !== undefined) {
    query = query.where((builder) => {
      void builder.where("team_id", team_id).orWhereNull("team_id");
    });
  }
  if (since !== undefined) {
    query = query.andWhere("id", ">", since);
  }
  const activity_log = await query.orderBy("id");

  return activity_log.map(cleanupActivityLogEntryFromDB);
}

export async function appendActivityLog(
  entry: InsertActivityLogEntry,
  trx: Knex.Knex.Transaction,
): Promise<InternalActivityLogEntry | undefined> {
  return await trx("activity_log")
    .insert(entry)
    // You need to specify the exact columns and predicate on the index, and sqlite doesn't allow ? placeholders.
    .onConflict(
      trx.raw("(??, ??, ??) where ?? = 'puzzle_guess_submitted'", [
        "team_id",
        "slug",
        jsonPathValue(trx, "data", ["canonical_input"]),
        "type",
      ]),
    )
    .ignore()
    .returning([
      "id",
      "team_id",
      "type",
      "slug",
      "data",
      "internal_data",
      "currency_delta",
      "strong_currency_delta",
      "timestamp",
    ])
    .then((objs) => {
      if (objs.length === 0) {
        return undefined;
      }
      const insertedEntry = objs[0] as ActivityLogEntryRow;
      const fixedEntry = cleanupActivityLogEntryFromDB(insertedEntry);
      // console.log("inserted", fixedEntry);
      return fixedEntry;
    });
}

export async function registerTeam(
  trx: Knex.Knex.Transaction,
  data: TeamRegistration,
) {
  const team = (
    await trx("teams")
      .insert([{ username: data.username, password: data.password }])
      .onConflict("username")
      .ignore()
      .returning(["id"])
  )[0];
  if (team === undefined) {
    return { usernameAvailable: false } as const;
  }
  return { usernameAvailable: true, teamId: team.id } as const;
}

export async function getTeamRegistrationLog(
  team_id: number | undefined,
  since: number | undefined,
  trx: Knex.Knex,
) {
  let query = trx<TeamRegistrationLogEntryRow>("team_registration_log");
  if (team_id !== undefined) {
    query = query.where((builder) => {
      void builder.where("team_id", team_id).orWhereNull("team_id");
    });
  }
  if (since !== undefined) {
    query = query.andWhere("id", ">", since);
  }
  const activity_log = await query.orderBy("id");

  return activity_log.map(cleanupTeamRegistrationLogEntryFromDB);
}

export async function appendTeamRegistrationLog(
  entry: InsertTeamRegistrationLogEntry,
  trx: Knex.Knex.Transaction,
): Promise<TeamRegistrationLogEntry | undefined> {
  return await trx("team_registration_log")
    .insert(entry)
    .returning(["id", "team_id", "type", "data", "timestamp"])
    .then((objs) => {
      if (objs.length === 0) {
        return undefined;
      }
      const insertedEntry = objs[0] as TeamRegistrationLogEntryRow;
      const fixedEntry = cleanupTeamRegistrationLogEntryFromDB(insertedEntry);
      // console.log("inserted", fixedEntry);
      return fixedEntry;
    });
}

export async function changeTeamDeactivation(
  team_id: number,
  deactivated: boolean,
  trx: Knex.Knex.Transaction,
) {
  await trx("teams").where("id", team_id).update({ deactivated });
}

export async function changeTeamPassword(
  team_id: number,
  password: string,
  trx: Knex.Knex.Transaction,
) {
  await trx("teams").where("id", team_id).update({ password });
}

export async function getCurrentTeamName(
  team_id: number,
  trx: Knex.Knex,
): Promise<string | undefined> {
  let query = trx<TeamRegistrationLogEntryRow & { data: { name: string } }>(
    "team_registration_log",
  ).where("team_id", team_id);
  query = query.where((builder) => {
    void builder
      .where("type", "team_registered")
      .orWhere("type", "team_name_changed");
  });

  const rows = await query.orderBy("id", "desc").limit(1);
  const parsedRows = rows.map(cleanupTeamRegistrationLogEntryFromDB);
  const first = parsedRows[0];
  if (first) {
    return (first as { data: { name: string } }).data.name;
  }
  throw new Error(`No team name found for team ${team_id}`);
}

export async function getPuzzleStateLog(
  team_id: number | undefined,
  since: number | undefined,
  trx: Knex.Knex,
) {
  let query = trx<PuzzleStateLogEntryRow>("puzzle_state_log");
  if (team_id !== undefined) {
    query = query.where("team_id", team_id);
  }
  if (since !== undefined) {
    query = query.andWhere("id", ">", since);
  }
  const puzzle_state_log = await query.orderBy("id");
  return puzzle_state_log.map(cleanupPuzzleStateLogEntryFromDB);
}

export async function appendPuzzleStateLog(
  entry: InsertPuzzleStateLogEntry,
  trx: Knex.Knex.Transaction,
): Promise<PuzzleStateLogEntry | undefined> {
  return await trx("puzzle_state_log")
    .insert(entry)
    .returning(["id", "team_id", "slug", "data", "timestamp"])
    .then((objs) => {
      if (objs.length === 0) {
        return undefined;
      }
      const insertedEntry = objs[0] as PuzzleStateLogEntryRow;
      const fixedEntry = cleanupPuzzleStateLogEntryFromDB(insertedEntry);
      return fixedEntry;
    });
}

export async function getFermitSession(
  sessionId: number,
  knex: Knex.Knex,
): Promise<FermitSession | undefined> {
  const sessionRows = await knex("fermit_sessions")
    .where("id", sessionId)
    .select();

  if (sessionRows.length === 0) {
    return undefined;
  } else {
    const obj = sessionRows[0];
    if (obj) {
      return {
        id: obj.id,
        status: obj.status,
        title: obj.title,
        teams: [],
        questionIds: fixArray<number>(obj.question_ids),
      };
    } else {
      return undefined;
    }
  }
}

export async function getFermitSessions(
  knex: Knex.Knex,
): Promise<FermitSession[]> {
  const sessionRows = await knex("fermit_sessions").select();

  return sessionRows.map((obj) => ({
    id: obj.id,
    status: obj.status,
    title: obj.title,
    teams: [],
    questionIds: fixArray<number>(obj.question_ids),
  }));
}

export async function insertFermitSession(
  session: InsertFermitSession,
  knex: Knex.Knex,
): Promise<FermitSession | undefined> {
  return await knex("fermit_sessions")
    .insert({
      title: session.title,
      question_ids: session.question_ids,
    })
    .returning(["id", "title", "status", "question_ids"])
    .then((objs) => {
      const insertedSession = objs[0] as FermitSessionRow;

      return {
        id: insertedSession.id,
        title: insertedSession.title,
        status: insertedSession.status,
        teams: [],
        questionIds: fixArray<number>(insertedSession.question_ids),
      };
    });
}

export async function updateFermitSession(
  id: number,
  session: UpdateFermitSession,
  knex: Knex.Knex,
): Promise<FermitSession | undefined> {
  return await knex("fermit_sessions")
    .where("id", id)
    .update(session)
    .returning(["id", "title", "status", "question_ids"])

    .then((objs) => {
      if (objs.length === 0) {
        return undefined;
      }
      const insertedSession = objs[0] as FermitSessionRow;
      return {
        id: insertedSession.id,
        title: insertedSession.title,
        status: insertedSession.status,
        teams: [],
        questionIds: fixArray<number>(insertedSession.question_ids),
      };
    });
}

export async function getFermitAnswers(
  sessionId: number,
  knex: Knex.Knex,
): Promise<FermitAnswer[]> {
  return await knex("fermit_answers")
    .where("session_id", sessionId)
    .select()
    .returning(["session_id", "team_id", "question_index", "answer"])
    .then((objs) =>
      objs.map((obj) => ({
        sessionId: obj.session_id,
        teamId: obj.team_id,
        questionIndex: obj.question_index,
        answer: obj.answer,
      })),
    );
}

export async function insertFermitAnswers(
  answers: FermitAnswer[],
  knex: Knex.Knex,
): Promise<number> {
  return (
    await knex("fermit_answers")
      .insert(
        answers.map((ans) => ({
          session_id: ans.sessionId,
          team_id: ans.teamId,
          question_index: ans.questionIndex,
          answer: ans.answer,
        })),
      )
      .returning(["id"])
      .onConflict(["session_id", "team_id", "question_index"])
      .merge()
  ).length;
}

export async function getFermitRegistrations(
  sessionId: number | undefined,
  knex: Knex.Knex,
): Promise<FermitRegistration[]> {
  let registrationRows;
  if (sessionId) {
    registrationRows = await knex("fermit_registrations")
      .where("session_id", sessionId)
      .select();
  } else {
    registrationRows = await knex("fermit_registrations").select();
  }

  return registrationRows.map((obj) => ({
    id: obj.id,
    sessionId: obj.session_id,
    teamId: obj.team_id,
    status: obj.status,
  }));
}

export async function insertFermitRegistration(
  sessionId: number,
  teamId: number,
  status: string,
  knex: Knex.Knex,
): Promise<FermitRegistration | undefined> {
  return await knex("fermit_registrations")
    .insert({ session_id: sessionId, team_id: teamId, status: status })
    .returning(["id", "session_id", "team_id", "status"])
    .then((objs) => {
      if (objs.length === 0) {
        return undefined;
      }
      const insertedEntry = objs[0] as FermitRegistrationRow;
      return {
        sessionId: insertedEntry.session_id,
        teamId: insertedEntry.team_id,
        status: insertedEntry.status,
      };
    });
}

export async function deleteFermitRegistration(
  sessionId: number,
  teamId: number,
  knex: Knex.Knex,
): Promise<boolean> {
  return (
    (await knex("fermit_registrations")
      .where({
        session_id: sessionId,
        team_id: teamId,
      })
      .del()) > 0
  );
}

export async function updateFermitRegistration(
  sessionId: number,
  teamId: number,
  status: string,
  knex: Knex.Knex,
): Promise<FermitRegistration> {
  await knex("fermit_registrations")
    .where({
      session_id: sessionId,
      team_id: teamId,
    })
    .update("status", status);
  return {
    sessionId: sessionId,
    teamId: teamId,
    status: status,
  };
}
