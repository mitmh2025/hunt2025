import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  // Knex does not support altering enum types, so we have to create a new
  // column, copy the data over, and rename
  await knex.schema.alterTable("team_registration_log", function (table) {
    table.renameColumn("type", "type_old");
  });

  await knex.schema.alterTable("team_registration_log", function (table) {
    table.enu("type", [
      "team_registered",
      "team_name_changed",
      "team_registration_updated",
    ]);
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- we're using raw SQL
  await knex<any>("team_registration_log").update({
    type: knex.raw("type_old"),
  });

  await knex.schema.alterTable("team_registration_log", function (table) {
    table.dropColumn("type_old");

    table
      .enum("type", [
        "team_registered",
        "team_name_changed",
        "team_registration_updated",
      ])
      .notNullable()
      .alter();
  });
}

export async function down(_knex: Knex): Promise<void> {
  // This migration is not reversible, but it's fine to run against
  // the newer version of the schema, since the new enum is a superset
  // of the old one.
}
