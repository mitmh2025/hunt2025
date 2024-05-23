import path from "path";
import Knex from "knex";
import {
  type InsertActivityLogEntry,
  type TeamPuzzle,
} from "knex/types/tables";
import connections from "../../knexfile";
import { calculateTeamState } from "../huntdata/logic";
import { type Hunt } from "../huntdata/types";

class WebpackMigrationSource {
  context: webpack.Context;

  constructor(context: webpack.Context) {
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
  context: webpack.Context;

  constructor(context: webpack.Context) {
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

  if (environment == "memory" || environment == "development" || environment == "ci") {
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
  interface Team {
    username: string;
    password?: string;
  }

  interface TeamRound {
    username: string;
    slug: string;
    unlocked: boolean;
  }

  interface TeamPuzzle {
    username: string;
    slug: string;
    visible: boolean;
    unlockable: boolean;
    unlocked: boolean;
    solved: boolean;
  }

  interface TeamPuzzleGuess {
    username: string;
    slug: string;
    canonical_input: string;
    timestamp: Date;
    correct: boolean;
    response?: string;
  }

  interface TeamInteraction {
    username: string;
    id: string;
    unlocked: boolean;
    completed: boolean;
  }

  type InsertActivityLogEntry = {
    username?: string;
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
        type: "interaction_completed";
        slug: string;
      }
  );

  type ActivityLogEntry = {
    id: number;
    timestamp: Date;
    currency_delta: number;
  } & InsertActivityLogEntry;

  interface Tables {
    teams: Team;
    team_rounds: TeamRound;
    team_puzzles: TeamPuzzle;
    team_puzzle_guesses: TeamPuzzleGuess;
    team_interactions: TeamInteraction;
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

export async function getTeamState(team: string, trx: Knex.Knex.Transaction) {
  const puzzle_status = await trx("team_puzzles")
    .where("username", team)
    .select("slug", "visible", "unlockable", "unlocked");
  const correct_answers = (await trx("team_puzzle_guesses")
    .where("username", team)
    .where("correct", true)
    .select("slug", { answer: string_agg(trx, "canonical_input", ", ") })
    .groupBy("slug")) as {
    slug: string;
    answer: string;
  }[]; /* I can't tell how to tell TypeScript that answer is a string without forcing it here. */
  const available_currency = Number(
    (
      await trx("activity_log")
        .where("username", team)
        .orWhere("username", null)
        .sum({ sum: "currency_delta" })
        .first()
    )?.sum || 0,
  );
  return {
    available_currency,
    unlocked_rounds: new Set(
      await trx("team_rounds").where("username", team).pluck("slug"),
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
  };
}

export async function appendActivityLog(
  entry: InsertActivityLogEntry,
  trx: Knex.Knex.Transaction,
) {
  await trx("activity_log").insert(entry);
}

export function fixTimestamp(value: string | Date): Date {
  if (typeof value == "string") {
    // TODO: sqlite returns timestamps as "YYYY-MM-DD HH:MM:SS" in UTC, and the driver doesn't automatically turn them back into Date objects.
    return new Date(value + "Z");
  }
  return value;
}

export async function getPuzzleState(
  team: string,
  slug: string,
  trx: Knex.Knex.Transaction,
) {
  const unlocked_rounds = new Set(
    await trx("team_rounds")
      .where("username", team)
      .where("unlocked", true)
      .pluck("slug"),
  );
  const puzzle_status = await trx("team_puzzles")
    .where("username", team)
    .where("slug", slug)
    .select("slug", "visible", "unlockable", "unlocked")
    .first();
  const correct_answers: { answer: string } | undefined = await trx(
    "team_puzzle_guesses",
  )
    .where("username", team)
    .where("slug", slug)
    .where("correct", true)
    .select({ answer: string_agg(trx, "canonical_input", ", ") })
    .first();
  const guesses = (
    await trx("team_puzzle_guesses")
      .where("username", team)
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
  team: string,
  trx: Knex.Knex.Transaction,
) {
  const interactions_completed = new Set(
    await trx("team_interactions").where("username", team).pluck("id"),
  );
  const puzzle_solution_count = Object.fromEntries(
    (
      await trx("team_puzzle_guesses")
        .select("slug")
        .where("username", team)
        .where("correct", true)
        .count("*", { as: "count" })
        .groupBy("slug")
    ).map(({ slug, count }) => [slug, Number(count || 0)]),
  );
  console.log(interactions_completed);
  console.log(puzzle_solution_count);
  const old = await getTeamState(team, trx);
  const next = calculateTeamState({
    hunt,
    interactions_completed,
    puzzle_solution_count,
  });
  console.log(next);
  for (const slug of next.unlocked_rounds.difference(old.unlocked_rounds)) {
    await appendActivityLog(
      {
        username: team,
        type: "round_unlocked",
        slug,
      },
      trx,
    );
    await trx("team_rounds")
      .insert({
        username: team,
        slug: slug,
        unlocked: true,
      })
      .onConflict(["username", "slug"])
      .merge({
        unlocked: true,
      });
  }
  const diff = {
    visible_puzzles: next.visible_puzzles.difference(old.visible_puzzles),
    unlockable_puzzles: next.unlockable_puzzles.difference(
      old.unlockable_puzzles,
    ),
    unlocked_puzzles: next.unlocked_puzzles.difference(old.unlocked_puzzles),
  };
  const diff_puzzles = diff.visible_puzzles
    .union(diff.unlockable_puzzles)
    .union(diff.unlocked_puzzles);
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
      await appendActivityLog(
        {
          username: team,
          type: "puzzle_unlocked",
          slug,
        },
        trx,
      );
    }
    await trx("team_puzzles")
      .insert(
        Object.assign(
          {
            username: team,
            slug: slug,
          },
          record,
        ),
      )
      .onConflict(["username", "slug"])
      .merge(record);
  }
}
