import type { Knex } from "knex";
import { generatedPrimaryKey, jsonPathValue } from "../lib/migration_helper";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("activity_log", function (table) {
    generatedPrimaryKey(knex, table, "id");
    table.datetime("timestamp").notNullable().defaultTo(knex.fn.now());
    table.integer("team_id"); // if null, action should apply to all teams
    table
      .enu("type", [
        "currency_adjusted",
        "round_unlocked",
        "puzzle_unlockable",
        "puzzle_unlocked",
        "puzzle_guess_submitted",
        "puzzle_partially_solved",
        "puzzle_solved",
        "interaction_unlocked",
        "interaction_started",
        "interaction_completed",
        "gate_completed",
        "rate_limits_reset",
      ])
      .notNullable();
    table.string("slug", 255);
    table.integer("currency_delta").notNullable().defaultTo(0);
    table.jsonb("data");
    table.jsonb("internal_data");

    table.index(["team_id", "type", "slug"]);
    table.index(["team_id", "slug", "type"]);
    // If we use Knex's helpers, it tries to use ? placeholders but sqlite doesn't support them.
    table.unique(
      ["team_id", "slug", jsonPathValue(knex, "data", ["canonical_input"])],
      {
        predicate: knex.where("type", knex.raw("'puzzle_guess_submitted'")),
      },
    );
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable("activity_log");
}
