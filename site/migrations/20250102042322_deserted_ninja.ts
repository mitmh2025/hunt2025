import type { Knex } from "knex";
import { generatedPrimaryKey } from "../lib/migration_helper";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("deserted_ninja_questions", function (table) {
    generatedPrimaryKey(knex, table, "id");
    table.string("text", 255).notNullable();
    table.string("image_url", 255);
    table.decimal("answer").notNullable();
    table.string("scoring_method").notNullable();
  });
  await knex.schema.createTable("deserted_ninja_sessions", function (table) {
    generatedPrimaryKey(knex, table, "id");
    table.string("title", 255).notNullable();
    table
      .enu("status", ["not_started", "in_progress", "complete"])
      .notNullable();
    table.jsonb("question_ids");
  });
  await knex.schema.createTable(
    "deserted_ninja_registrations",
    function (table) {
      generatedPrimaryKey(knex, table, "id");
      table.integer("session_id").notNullable();
      table.integer("team_id").notNullable();
      table.enu("status", [
        "not_checked_in",
        "checked_in",
        "arrived_late",
        "no_show",
      ]);

      table.foreign("session_id").references("deserted_ninja_sessions.id");
      table.foreign("team_id").references("teams.id");
    },
  );
  await knex.schema.createTable("deserted_ninja_answers", function (table) {
    generatedPrimaryKey(knex, table, "id");
    table.integer("session_id").notNullable();
    table.integer("team_id").notNullable();
    table.integer("question_index").notNullable();
    table.decimal("answer");
    table.foreign("session_id").references("deserted_ninja_sessions.id");
    table.foreign("team_id").references("teams.id");
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema
    .dropTable("deserted_ninja_questions")
    .dropTable("deserted_ninja_sessions")
    .dropTable("deserted_ninja_registrations")
    .dropTable("deserted_ninja_answers");
}
