import path from "path";
import Knex from "knex";
import {
  type TeamRegistrationLogEntryRow,
  type ActivityLogEntryRow,
  type InsertActivityLogEntry,
  type InsertTeamRegistrationLogEntry,
  type DesertedNinjaRegistrationRow,
} from "knex/types/tables";
import pRetry from "p-retry"; // eslint-disable-line import/default, import/no-named-as-default -- eslint fails to parse the import
import connections from "../../knexfile";
import {
  type DesertedNinjaQuestion,
  type DesertedNinjaSession,
  type DesertedNinjaAnswer,
  type DesertedNinjaRegistration,
} from "../../lib/api/admin_contract";
import { type TeamRegistration } from "../../lib/api/contract";
import {
  type TeamRegistrationLogEntry,
  type InternalActivityLogEntry,
} from "../../lib/api/frontend_contract";
import { jsonPathValue } from "../../lib/migration_helper";
import { type CannedResponseLink } from "../frontend/puzzles/types";

export { type ActivityLogEntryRow, type TeamRegistrationLogEntryRow };

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
    // In this example we are just returning seed names
    return Promise.resolve(this.context.keys().sort());
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
  };

  // "correct" means the puzzle is solved and no longer allows new answer submissions
  // "incorrect" guesses count towards rate limits
  // "other" is used for canned responses (which we don't want to count towards incorrect-answer rate limits)
  type GuessStatus = "correct" | "incorrect" | "other";

  type InsertActivityLogEntry = {
    team_id?: number;
    currency_delta?: number;
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

  type DesertedNinjaQuestionRow = {
    id: number;
    text: string;
    image_url: string | null;
    answer: number;
    scoring_method: string;
  };

  type DesertedNinjaSessionRow = {
    id: number;
    status: string;
    title: string;
    // SQLite returns JSON fields as string.
    question_ids: string | number[];
  };

  type DesertedNinjaAnswerRow = {
    id: number;
    session_id: number;
    team_id: number;
    question_index: number;
    answer: number | null;
  };

  type DesertedNinjaRegistrationRow = {
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
    teams: Team;
    activity_log: Knex.Knex.CompositeTableType<
      ActivityLogEntryRow,
      InsertActivityLogEntry
    >;
    team_registration_log: Knex.Knex.CompositeTableType<
      TeamRegistrationLogEntryRow,
      InsertTeamRegistrationLogEntry
    >;
    deserted_ninja_questions: DesertedNinjaQuestionRow;
    deserted_ninja_sessions: DesertedNinjaSessionRow;
    deserted_ninja_answers: DesertedNinjaAnswerRow;
    deserted_ninja_registrations: DesertedNinjaRegistrationRow;
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

export async function getDesertedNinjaQuestions(
  knex: Knex.Knex,
): Promise<DesertedNinjaQuestion[]> {
  // TODO: is there a better way to do this?
  // Or should the properties be renamed to not be camelCase?
  return (await knex("deserted_ninja_questions").select()).map((obj) => ({
    id: obj.id,
    text: obj.text,
    imageUrl: obj.image_url,
    answer: obj.answer,
    scoringMethod: obj.scoring_method,
  }));
}

export async function insertDesertedNinjaQuestions(
  questions: DesertedNinjaQuestion[],
  knex: Knex.Knex,
): Promise<DesertedNinjaQuestion[]> {
  await knex("deserted_ninja_questions").insert(questions);
  return [];
}

export async function getDesertedNinjaSessions(
  knex: Knex.Knex,
): Promise<DesertedNinjaSession[]> {
  const sessionRows = await knex("deserted_ninja_sessions").select();

  return sessionRows.map((obj) => ({
    id: obj.id,
    status: obj.status,
    title: obj.title,
    teamIds: [],
    questionIds: fixArray<number>(obj.question_ids),
  }));
}

export async function insertDesertedNinjaSession(
  title: string,
  question_ids: string,
  status: string,
  knex: Knex.Knex,
): Promise<DesertedNinjaSession> {
  const session = await knex("deserted_ninja_sessions")
    .insert({
      status: status,
      title: title,
      question_ids: question_ids,
    })
    .returning(["id", "title", "status", "question_ids"]);

  if (session.length > 0 && session[0]) {
    return {
      id: session[0]?.id,
      title: session[0]?.title,
      status: session[0]?.status,
      teamIds: [],
      questionIds: fixArray<number>(session[0]?.question_ids),
    };
  } else {
    return {
      id: -1,
      title: "",
      status: "",
      teamIds: [],
      questionIds: [],
    };
  }
}

export async function updateDesertedNinjaSession(
  session: DesertedNinjaSession,
  knex: Knex.Knex,
): Promise<DesertedNinjaSession> {
  return await knex("deserted_ninja_sessions")
    .where("sessionId", session.id)
    .update(session);
}

export async function insertDesertedNinjaAnswers(
  answers: DesertedNinjaAnswer[],
  knex: Knex.Knex,
): Promise<number> {
  return (
    await knex("deserted_ninja_answers")
      .insert(
        answers.map((ans) => ({
          session_id: ans.sessionId,
          team_id: ans.teamId,
          question_index: ans.questionIndex,
          answer: ans.answer,
        })),
      )
      .returning(["id"])
      .onConflict("id")
      .merge()
  ).length;
}

export async function getDesertedNinjaRegistrations(
  sessionId: number | undefined,
  knex: Knex.Knex,
): Promise<DesertedNinjaRegistration[]> {
  let registrationRows;
  if (sessionId) {
    registrationRows = await knex("deserted_ninja_registrations")
      .where("session_id", sessionId)
      .select();
  } else {
    registrationRows = await knex("deserted_ninja_registrations").select();
  }

  return registrationRows.map((obj) => ({
    id: obj.id,
    sessionId: obj.session_id,
    teamId: obj.team_id,
    status: obj.status,
  }));
}

export async function insertDesertedNinjaRegistration(
  sessionId: number,
  teamId: number,
  status: string,
  knex: Knex.Knex,
): Promise<DesertedNinjaRegistration | undefined> {
  return await knex("deserted_ninja_registrations")
    .insert({ session_id: sessionId, team_id: teamId, status: status })
    .returning(["id", "session_id", "team_id", "status"])
    .then((objs) => {
      if (objs.length === 0) {
        return undefined;
      }
      const insertedEntry = objs[0] as DesertedNinjaRegistrationRow;
      return {
        sessionId: insertedEntry.session_id,
        teamId: insertedEntry.team_id,
        status: insertedEntry.status,
      };
    });
}

export async function deleteDesertedNinjaRegistration(
  sessionId: number,
  teamId: number,
  knex: Knex.Knex,
): Promise<boolean> {
  return (
    (await knex("deserted_ninja_registrations")
      .where({
        session_id: sessionId,
        team_id: teamId,
      })
      .del()) > 0
  );
}

export async function updateDesertedNinjaRegistration(
  sessionId: number,
  teamId: number,
  status: string,
  knex: Knex.Knex,
): Promise<DesertedNinjaRegistration> {
  await knex("deserted_ninja_registrations")
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
