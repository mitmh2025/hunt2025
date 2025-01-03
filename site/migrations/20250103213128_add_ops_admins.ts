import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("ops_admins", function (table) {
    table.string("email", 255).primary();
    table.string("name", 255).notNullable();
    table.string("added_by", 255).notNullable();
  });

  // simplify bootstrapping by adding fuzzy's email
  await knex("ops_admins").insert({
    email: "fuzzy@shonaldmann.com",
    name: "Fuzzy",
    added_by: "fuzzy@shonaldmann.com",
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable("ops_admins");
}
