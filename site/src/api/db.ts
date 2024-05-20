import path from "path";
import Knex from "knex";
import { TeamPuzzle } from "knex/types/tables";
import connections from "../../knexfile";
import { calculateTeamState } from "../huntdata/logic";
import { Hunt } from "../huntdata/types";

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

  if (environment == "memory" || environment == "development") {
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

  interface Tables {
    teams: Team;
    team_rounds: TeamRound;
    team_puzzles: TeamPuzzle;
    team_puzzle_guesses: TeamPuzzleGuess;
    team_interactions: TeamInteraction;
  }
}

function string_agg(knex: Knex.Knex, field: string, delimeter: string) {
  const driverName = (knex.client as Knex.Knex.Client).driverName;
  switch (driverName) {
    case "sqlite3":
    case "better-sqlite3":
      return knex.raw<string>("(group_concat(??, ?))", [field, delimeter]);
    case "pg":
    case "pgnative":
      return knex.raw<string>("(string_agg(??, ?))", [field, delimeter]);
    default:
      throw new Error(`${driverName} does not have a string_agg function`);
  }
}

export async function getTeamState(team: string, trx: Knex.Knex.Transaction) {
  const puzzle_status = await trx("team_puzzles")
    .where("username", team)
    .select("slug", "visible", "unlockable", "unlocked");
  const correct_answers = (await trx("team_puzzle_guesses")
    .where("username", team)
    .where("correct", true)
    .select("slug", { answer: string_agg(trx, "canonical_input", ", ") })
    .orderBy("canonical_input")
    .groupBy("slug")) as {
    slug: string;
    answer: string;
  }[]; /* I can't tell how to tell TypeScript that answer is a string without forcing it here. */
  return {
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
