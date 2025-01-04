import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  // Knex does not support altering enum types, so we have to create a new
  // column, copy the data over, and rename
  await knex.schema.alterTable("team_registration_log", function (table) {
    // rebuild index
    table.dropIndex(["team_id", "type"]);

    table.renameColumn("type", "type_old");
  });

  await knex.schema.alterTable("team_registration_log", function (table) {
    table.enu("type", [
      "team_registered",
      "team_name_changed",
      "team_registration_updated",
      "team_deactivated",
      "team_reactivated",
      "team_password_change",
    ]);
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- we're using raw SQL
  await knex<any>("team_registration_log").update({
    type: knex.raw("type_old"),
  });

  await knex.schema.alterTable("team_registration_log", function (table) {
    table.dropColumn("type_old");

    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access -- No TS types for knex.client
    if (knex.client.config.client !== "pg") {
      // Knex has a bug where altering enums in postgres generates invalid
      // syntax: https://stackoverflow.com/a/75950988 -- we're just trying
      // to make this non-nullable, so we can just do that with raw SQL below
      table
        .enum("type", [
          "team_registered",
          "team_name_changed",
          "team_registration_updated",
          "team_deactivated",
          "team_reactivated",
          "team_password_change",
        ])
        .notNullable()
        .alter();
    }

    // rebuild index
    table.index(["team_id", "type"]);
  });

  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access -- No TS types for knex.client
  if (knex.client.config.client === "pg") {
    // Fix the enum type to be non-nullable in postgres
    await knex.raw(`
      ALTER TABLE team_registration_log
      ALTER COLUMN type SET NOT NULL;
    `);
  }

  // Add a new column to the teams table to track the deactivation status
  await knex.schema.alterTable("teams", function (table) {
    table.boolean("deactivated").notNullable().defaultTo(false);
  });
}

export async function down(_knex: Knex): Promise<void> {
  // This migration is not reversible, but it's fine to run against
  // the newer version of the schema, since the new enum is a superset
  // of the old one.
}
