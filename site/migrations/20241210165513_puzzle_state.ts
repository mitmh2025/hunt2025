import type { Knex } from "knex";
import { generatedPrimaryKey } from "../lib/migration_helper";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("puzzle_state_log", function (table) {
    generatedPrimaryKey(knex, table, "id");
    table.integer("team_id").notNullable();
    table.datetime("timestamp").notNullable().defaultTo(knex.fn.now());
    table.string("slug", 255);
    table.jsonb("data").notNullable();
    table.index(["team_id", "slug"]);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable("puzzle_state_log");
}
