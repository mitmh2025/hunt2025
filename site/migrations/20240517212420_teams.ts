import type { Knex } from "knex";
import { generatedPrimaryKey } from "../lib/migration_helper";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("teams", function (table) {
    generatedPrimaryKey(knex, table, "id");
    table.string("username", 255).notNullable();
    table.string("password", 255);
    table.unique("username");
  });
  await knex.schema.createTable("team_registration_log", function (table) {
    generatedPrimaryKey(knex, table, "id");
    table.datetime("timestamp").notNullable().defaultTo(knex.fn.now());
    table.integer("team_id").notNullable();
    table
      .enu("type", [
        "team_registered",
        "team_name_changed",
        "team_registration_updated",
      ])
      .notNullable();
    table.jsonb("data");
    table.index(["team_id", "type"]);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable("teams").dropTable("team_registration_log");
}
