import path from "path";
import Knex from "knex";
import {
  type ActivityLogEntry,
  type InsertActivityLogEntry,
} from "knex/types/tables";
import pRetry from "p-retry"; // eslint-disable-line import/default, import/no-named-as-default -- eslint fails to parse the import
import connections from "../../knexfile";
import { jsonPathValue } from "../../lib/migration_helper";
import { cleanupActivityLogEntryFromDB } from "./logic";

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

  // We specify some more general field types here even though InsertActivityLogEntry has narrower
  // constraints to make working with Pick types more pleasant.
  type ActivityLogEntry = {
    id: number;
    timestamp: Date;
    currency_delta: number;
    type: string;
    slug?: string;
    data?:
      | {
          answer: string;
        }
      | {
          partial: string;
        }
      | {
          result: string;
        }
      | {
          status: GuessStatus;
          canonical_input: string;
          response: string;
        };
  } & InsertActivityLogEntry;

  /* eslint-disable-next-line @typescript-eslint/consistent-type-definitions --
   * This must be defined as an interface as it's extending a declaration from
   * knex
   */
  interface Tables {
    teams: Team;
    activity_log: Knex.Knex.CompositeTableType<
      ActivityLogEntry,
      InsertActivityLogEntry
    >;
  }
}

export async function getTeamNames(
  team_ids: Iterable<number>,
  trx: Knex.Knex.Transaction,
): Promise<Record<number, string>> {
  return Object.fromEntries(
    (
      await trx("teams")
        .where("id", "in", Array.from(team_ids))
        .select("id", "username")
    ).map(({ id, username }) => [id, username]),
  );
}

// TODO: rename to loadCanonicalTeamStateInputs or something like that
export async function getTeamState(
  team_id: number,
  trx: Knex.Knex.Transaction,
) {
  const team = await trx("teams")
    .where("id", team_id)
    .select("username")
    .first();
  if (!team) throw new Error(`No team found for team_id ${team_id}`);
  return {
    team_name: team.username,
    activity_log: await getActivityLog(team_id, undefined, trx),
  };
}

export async function getActivityLog(
  team_id: number | undefined,
  since: number | undefined,
  trx: Knex.Knex.Transaction,
) {
  let query = trx<ActivityLogEntry>("activity_log");
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
): Promise<ActivityLogEntry | undefined> {
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
      const insertedEntry = objs[0] as ActivityLogEntry;
      const fixedEntry = cleanupActivityLogEntryFromDB(insertedEntry);
      // console.log("inserted", fixedEntry);
      return fixedEntry;
    });
}
