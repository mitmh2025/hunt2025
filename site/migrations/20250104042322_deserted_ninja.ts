import type { Knex } from "knex";
import { generatedPrimaryKey } from "../lib/migration_helper";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("fermit_questions", function (table) {
    generatedPrimaryKey(knex, table, "id");
    table.string("text", 255).notNullable();
    table.jsonb("data");
  });
  await knex.schema.createTable("fermit_sessions", function (table) {
    generatedPrimaryKey(knex, table, "id");
    table.string("title", 255).notNullable();
    table
      .enu("status", ["not_started", "in_progress", "complete"])
      .defaultTo("not_started")
      .notNullable();
    table.jsonb("question_ids");
    table.unique("title");
  });
  await knex.schema.createTable("fermit_registrations", function (table) {
    generatedPrimaryKey(knex, table, "id");
    table.integer("session_id").notNullable();
    table.integer("team_id").notNullable();
    table.enu("status", ["not_checked_in", "checked_in", "no_show"]);
    table.foreign("session_id").references("fermit_sessions.id");
    table.foreign("team_id").references("teams.id");
    table.unique(["session_id", "team_id"]);
  });
  await knex.schema.createTable("fermit_answers", function (table) {
    generatedPrimaryKey(knex, table, "id");
    table.integer("session_id").notNullable();
    table.integer("team_id").notNullable();
    table.integer("question_index").notNullable();
    table.decimal("answer");
    table.foreign("session_id").references("fermit_sessions.id");
    table.foreign("team_id").references("teams.id");
    table.unique(["session_id", "team_id", "question_index"]);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.table("fermit_answers", (table) => {
    table.dropForeign("session_id");
    table.dropForeign("team_id");
  });
  await knex.schema.table("fermit_registrations", (table) => {
    table.dropForeign("session_id");
    table.dropForeign("team_id");
  });
  await knex.schema
    .dropTable("fermit_questions")
    .dropTable("fermit_sessions")
    .dropTable("fermit_registrations")
    .dropTable("fermit_answers");
}
