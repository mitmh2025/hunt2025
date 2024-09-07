import type { Knex } from "knex";
import { generatedPrimaryKey } from "../lib/migration_helper";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("teams", function (table) {
    generatedPrimaryKey(knex, table, "id");
    table.string("username", 255).notNullable();
    table.string("password", 255);
    table.unique("username");
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable("teams");
}
