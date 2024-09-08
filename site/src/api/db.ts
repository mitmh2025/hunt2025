import path from "path";
import Knex from "knex";
import {
  type ActivityLogEntry,
  type InsertActivityLogEntry,
  type TeamPuzzle,
} from "knex/types/tables";
import connections from "../../knexfile";
import { calculateTeamState } from "../huntdata/logic";
import { type Hunt } from "../huntdata/types";

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

  type TeamRound = {
    team_id: number;
    slug: string;
    unlocked: boolean;
  };

  type TeamPuzzle = {
    team_id: number;
    slug: string;
    visible: boolean;
    unlockable: boolean;
    unlocked: boolean;
    solved: boolean;
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
          result: string;
        };
  } & InsertActivityLogEntry;

  /* eslint-disable-next-line @typescript-eslint/consistent-type-definitions --
   * This must be defined as an interface as it's extending a declaration from
   * knex
   */
  interface Tables {
    teams: Team;
    team_rounds: TeamRound;
    team_puzzles: TeamPuzzle;
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

export async function getTeamState(
  team_id: number,
  trx: Knex.Knex.Transaction,
) {
  const team = await trx("teams")
    .where("id", team_id)
    .select("username")
    .first();
  if (!team) throw new Error(`No team found for team_id ${team_id}`);
  const puzzle_status = await trx("team_puzzles")
    .where("team_id", team_id)
    .select("slug", "visible", "unlockable", "unlocked");
  const correct_answers = (await trx("team_puzzle_guesses")
    .where("team_id", team_id)
    .where("status", "correct")
    .select("slug", { answer: string_agg(trx, "canonical_input", ", ") })
    .groupBy("slug")) as {
    slug: string;
    answer: string;
  }[]; /* I can't tell how to tell TypeScript that answer is a string without forcing it here. */
  const satisfied_gates = (await trx("activity_log")
    .where("team_id", team_id)
    .where("type", "gate_completed")
    .pluck("slug")) as string[];

  const interaction_events = (await trx("activity_log")
    .where("team_id", team_id)
    .whereIn("type", [
      "interaction_unlocked",
      "interaction_started",
      "interaction_completed",
    ])
    .orderBy("id")
    .select("type", "slug", "data")) as Pick<
    ActivityLogEntry,
    "type" | "slug" | "data"
  >[];
  const interactions: Record<
    string,
    { state: "unlocked" | "running" | "completed"; result?: string }
  > = interaction_events.reduce((acc, entry) => {
    if (entry.slug) {
      // guaranteed to be nonnull in practice, but hard to prove to the typechecker
      switch (entry.type) {
        case "interaction_unlocked":
          return { ...acc, [entry.slug]: { state: "unlocked" } };
        case "interaction_started":
          return { ...acc, [entry.slug]: { state: "running" } };
        case "interaction_completed": {
          let result = "";
          if ("data" in entry) {
            result = (
              fixData(entry.data as unknown as string) as { result: string }
            ).result;
          }
          return {
            ...acc,
            [entry.slug]: {
              state: "completed",
              result,
            },
          };
        }
      }
    }
    return acc;
  }, {});

  const available_currency = Number(
    (
      await trx("activity_log")
        .where("team_id", team_id)
        .orWhere("team_id", null)
        .sum({ sum: "currency_delta" })
        .first()
    )?.sum ?? 0,
  );
  return {
    team_name: team.username,
    available_currency,
    unlocked_rounds: new Set(
      await trx("team_rounds").where("team_id", team_id).pluck("slug"),
    ),
    visible_puzzles: new Set(
      puzzle_status.flatMap(({ slug, visible }) => (visible ? [slug] : [])),
    ),
    unlockable_puzzles: new Set(
      puzzle_status.flatMap(({ slug, unlockable }) =>
        unlockable ? [slug] : [],
      ),
    ),
    unlocked_puzzles: new Set(
      puzzle_status.flatMap(({ slug, unlocked }) => (unlocked ? [slug] : [])),
    ),
    correct_answers: Object.fromEntries(
      correct_answers.map(({ slug, answer }) => [slug, answer]),
    ),
    satisfied_gates: new Set(satisfied_gates),
    interactions,
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
      "currency_delta",
      "timestamp",
    ])
    .then((objs) => {
      const insertedEntry = objs[0] as ActivityLogEntry;
      const fixedEntry = {
        id: insertedEntry.id,
        team_id: insertedEntry.team_id,
        type: insertedEntry.type,
        slug: insertedEntry.slug,
        data: insertedEntry.data ? fixData(insertedEntry.data) : undefined,
        currency_delta: insertedEntry.currency_delta,
        timestamp: fixTimestamp(insertedEntry.timestamp),
      } as ActivityLogEntry;
      // console.log("inserted", fixedEntry);
      return fixedEntry;
    });
}

export function fixTimestamp(value: string | Date): Date {
  if (typeof value === "string") {
    // TODO: sqlite returns timestamps as "YYYY-MM-DD HH:MM:SS" in UTC, and the driver doesn't automatically turn them back into Date objects.
    return new Date(value + "Z");
  }
  return value;
}

export function fixData(value: string | object): object {
  // SQLite returns json fields as strings, and the driver doesn't automatically parse them.
  if (typeof value === "string") {
    return JSON.parse(value) as object;
  }
  return value;
}

export async function getPuzzleState(
  team_id: number,
  slug: string,
  trx: Knex.Knex.Transaction,
) {
  const unlocked_rounds = new Set(
    await trx("team_rounds")
      .where("team_id", team_id)
      .where("unlocked", true)
      .pluck("slug"),
  );
  const puzzle_status = await trx("team_puzzles")
    .where("team_id", team_id)
    .where("slug", slug)
    .select("slug", "visible", "unlockable", "unlocked")
    .first();
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
    unlocked_rounds,
    puzzle_status,
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
  const start = Date.now();
  const interactions_completed = new Set(
    (await trx("activity_log")
      .where("team_id", team_id)
      .where("type", "interaction_completed")
      .pluck("slug")) as string[],
  );
  const puzzles_unlocked = new Set(
    (await trx("activity_log")
      .where("team_id", team_id)
      .where("type", "puzzle_unlocked")
      .pluck("slug")) as string[],
  );
  const gates_satisfied = new Set(
    (await trx("activity_log")
      .where("team_id", team_id)
      .where("type", "gate_completed")
      .pluck("slug")) as string[],
  );

  const puzzle_solution_count = Object.fromEntries(
    (
      await trx("team_puzzle_guesses")
        .select("slug")
        .where("team_id", team_id)
        .where("status", "correct")
        .count("*", { as: "count" })
        .groupBy("slug")
    ).map(({ slug, count }) => [slug, Number(count ?? 0)]),
  );
  const canonical_queries_done = Date.now();
  //console.log(interactions_completed);
  //console.log(puzzles_unlocked);
  //console.log(puzzle_solution_count);
  const old = await getTeamState(team_id, trx);
  const denormed_queries_done = Date.now();
  const next = calculateTeamState({
    hunt,
    gates_satisfied,
    interactions_completed,
    puzzles_unlocked,
    puzzle_solution_count,
  });
  const calculate_team_state_done = Date.now();
  //console.log(next);
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
    await trx("team_rounds")
      .insert({
        team_id,
        slug,
        unlocked: true,
      })
      .onConflict(["team_id", "slug"])
      .merge({
        unlocked: true,
      });
  }
  const unlock_rounds_done = Date.now();
  const old_interactions = new Set(Object.keys(old.interactions));
  const diff = {
    visible_puzzles: next.visible_puzzles.difference(old.visible_puzzles),
    unlockable_puzzles: next.unlockable_puzzles.difference(
      old.unlockable_puzzles,
    ),
    unlocked_puzzles: next.unlocked_puzzles.difference(old.unlocked_puzzles),
    unlocked_interactions:
      next.unlocked_interactions.difference(old_interactions),
  };
  const diff_puzzles = diff.visible_puzzles
    .union(diff.unlockable_puzzles)
    .union(diff.unlocked_puzzles);
  const diff_done = Date.now();
  for (const slug of diff_puzzles) {
    const record: Partial<TeamPuzzle> = {};
    if (diff.visible_puzzles.has(slug)) {
      record.visible = true;
    }
    if (diff.unlockable_puzzles.has(slug)) {
      record.unlockable = true;
    }
    if (diff.unlocked_puzzles.has(slug)) {
      record.unlocked = true;
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
    await trx("team_puzzles")
      .insert(
        Object.assign(
          {
            team_id,
            slug,
          },
          record,
        ),
      )
      .onConflict(["team_id", "slug"])
      .merge(record);
  }
  const puzzles_unlock_done = Date.now();
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
  const interactions_unlock_done = Date.now();
  console.log(`recalculateTeamState for team ${team_id}: ${interactions_unlock_done - start} msec
  * canonical queries:   ${canonical_queries_done - start} msec
  * denormed queries:    ${denormed_queries_done - canonical_queries_done} msec
  * calculateTeamState:  ${calculate_team_state_done - denormed_queries_done} msec
  * unlock rounds:       ${unlock_rounds_done - calculate_team_state_done} msec
  * compute diffs:       ${diff_done - unlock_rounds_done} msec
  * unlock puzzles:      ${puzzles_unlock_done - diff_done} msec
  * unlock interactions: ${interactions_unlock_done - puzzles_unlock_done} msec`);
  return activityLogWrites;
}
