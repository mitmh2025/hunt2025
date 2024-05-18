import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("teams", function (table) {
    table.string("username", 255).notNullable();
    table.primary(["username"]);
    table.string("password", 255);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable("teams");
}
