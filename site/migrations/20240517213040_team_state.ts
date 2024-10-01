import type { Knex } from "knex";
import { generatedPrimaryKey } from "../lib/migration_helper";

export async function up(knex: Knex): Promise<void> {
  await knex.schema
    .createTable("team_puzzle_guesses", function (table) {
      generatedPrimaryKey(knex, table, "id");
      table
        .integer("team_id")
        .notNullable()
        .references("teams.id")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
      table.string("slug", 255).notNullable();
      table.string("canonical_input", 255).notNullable();
      table.datetime("timestamp").notNullable().defaultTo(knex.fn.now());
      table.enu("status", ["incorrect", "correct", "other"]);
      table.text("response");

      table.unique(["team_id", "slug", "canonical_input"]);
    })
    .createTable("activity_log", function (table) {
      generatedPrimaryKey(knex, table, "id");
      table.datetime("timestamp").notNullable().defaultTo(knex.fn.now());
      table.integer("team_id"); // if null, action should apply to all teams
      table.enu("type", [
        "currency_adjusted",
        "round_unlocked",
        "puzzle_unlocked",
        "puzzle_partially_solved",
        "puzzle_solved",
        "interaction_unlocked",
        "interaction_started",
        "interaction_completed",
        "gate_completed",
        "rate_limits_reset",
      ]);
      table.string("slug", 255);
      table.integer("currency_delta").notNullable().defaultTo(0);
      table.jsonb("data");
      table.jsonb("internal_data");

      table.index(["team_id", "type"]);
    });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable("team_puzzle_guesses").dropTable("activity_log");
}
