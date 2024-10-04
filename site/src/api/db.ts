import path from "path";
import Knex from "knex";
import {
  type ActivityLogEntry,
  type InsertActivityLogEntry,
} from "knex/types/tables";
import connections from "../../knexfile";
import { type Hunt } from "../huntdata/types";
import {
  cleanupActivityLogEntryFromDB,
  fixTimestamp,
  reducerDeriveTeamState,
} from "./logic";

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

  type TeamPuzzleGuess = {
    id: number;
    team_id: number;
    slug: string;
    canonical_input: string;
    timestamp: Date;
    status: GuessStatus;
    response: string;
  };

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
        type: "puzzle_unlocked";
        slug: string;
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
        };
  } & InsertActivityLogEntry;

  /* eslint-disable-next-line @typescript-eslint/consistent-type-definitions --
   * This must be defined as an interface as it's extending a declaration from
   * knex
   */
  interface Tables {
    teams: Team;
    team_puzzle_guesses: TeamPuzzleGuess;
    activity_log: Knex.Knex.CompositeTableType<
      ActivityLogEntry,
      InsertActivityLogEntry
    >;
  }
}

function string_agg(knex: Knex.Knex, field: string, delimeter: string) {
  const driverName = (knex.client as Knex.Knex.Client).driverName;
  let fn;
  switch (driverName) {
    case "sqlite3":
    case "better-sqlite3":
      fn = "group_concat";
      break;
    case "pg":
    case "pgnative":
      fn = "string_agg";
      break;
    default:
      throw new Error(`${driverName} does not have a string_agg function`);
  }
  return knex.raw<string>(`(${fn}(??, ? ORDER BY ??))`, [
    field,
    delimeter,
    field,
  ]);
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

  const activity_log = await trx<ActivityLogEntry>("activity_log")
    .where("team_id", team_id)
    .orWhereNull("team_id")
    .orderBy("id");

  const fixedActivityLog = activity_log.map(cleanupActivityLogEntryFromDB);
  return {
    team_name: team.username,
    activity_log: fixedActivityLog,
  };
}

export async function appendActivityLog(
  entry: InsertActivityLogEntry,
  trx: Knex.Knex.Transaction,
): Promise<ActivityLogEntry> {
  return await trx("activity_log")
    .insert(entry)
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
      const insertedEntry = objs[0] as ActivityLogEntry;
      const fixedEntry = cleanupActivityLogEntryFromDB(insertedEntry);
      // console.log("inserted", fixedEntry);
      return fixedEntry;
    });
}

export async function getPuzzleState(
  team_id: number,
  slug: string,
  trx: Knex.Knex.Transaction,
) {
  const correct_answers: { answer: string } | undefined = await trx(
    "team_puzzle_guesses",
  )
    .where("team_id", team_id)
    .where("slug", slug)
    .where("status", "correct")
    .select({ answer: string_agg(trx, "canonical_input", ", ") })
    .first();
  const guesses = (
    await trx("team_puzzle_guesses")
      .where("team_id", team_id)
      .where("slug", slug)
      .orderBy("timestamp", "desc")
  ).map((row) => {
    row.timestamp = fixTimestamp(row.timestamp);
    return row;
  });
  return {
    guesses,
    answer: correct_answers?.answer,
  };
}

export async function recalculateTeamState(
  hunt: Hunt,
  team_id: number,
  trx: Knex.Knex.Transaction,
): Promise<ActivityLogEntry[]> {
  const activityLogWrites: ActivityLogEntry[] = [];
  const start = performance.now();
  const { team_name, activity_log } = await getTeamState(team_id, trx);
  const canonical_queries_done = performance.now();

  // What is already present in the activity log?
  // TODO: consider doing this in a single pass instead
  const old = {
    unlocked_rounds: new Set(
      activity_log
        .filter((e) => e.type === "round_unlocked")
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
  const next = reducerDeriveTeamState(team_name, hunt, activity_log);
  const calculate_team_state_done = performance.now();

  // Compute the differences, and generate the requisite inserts.
  for (const slug of next.unlocked_rounds.difference(old.unlocked_rounds)) {
    activityLogWrites.push(
      await appendActivityLog(
        {
          team_id,
          type: "round_unlocked",
          slug,
        },
        trx,
      ),
    );
  }
  const unlock_rounds_done = performance.now();
  const diff = {
    // visible_puzzles: next.visible_puzzles.difference(old.visible_puzzles),
    // unlockable_puzzles: next.unlockable_puzzles.difference(
    //   old.unlockable_puzzles,
    // ),
    unlocked_puzzles: next.unlocked_puzzles.difference(old.unlocked_puzzles),
    unlocked_interactions: new Set(Object.keys(next.interactions)).difference(
      old.interactions_unlocked,
    ),
  };
  const diff_done = performance.now();
  for (const slug of diff.unlocked_puzzles) {
    activityLogWrites.push(
      await appendActivityLog(
        {
          team_id,
          type: "puzzle_unlocked",
          slug,
        },
        trx,
      ),
    );
  }
  const puzzles_unlock_done = performance.now();
  for (const id of diff.unlocked_interactions) {
    activityLogWrites.push(
      await appendActivityLog(
        {
          team_id,
          type: "interaction_unlocked",
          slug: id,
        },
        trx,
      ),
    );
  }
  const interactions_unlock_done = performance.now();
  console.log(`recalculateTeamState for team ${team_id}: ${interactions_unlock_done - start} msec
  * canonical queries:   ${canonical_queries_done - start} msec
  * calculateTeamState:  ${calculate_team_state_done - canonical_queries_done} msec
  * unlock rounds:       ${unlock_rounds_done - calculate_team_state_done} msec
  * compute diffs:       ${diff_done - unlock_rounds_done} msec
  * unlock puzzles:      ${puzzles_unlock_done - diff_done} msec
  * unlock interactions: ${interactions_unlock_done - puzzles_unlock_done} msec`);
  return activityLogWrites;
}
