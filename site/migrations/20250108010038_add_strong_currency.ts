import type { Knex } from "knex";
import { jsonPathValue } from "../lib/migration_helper";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable("activity_log", function (table) {
    table.integer("strong_currency_delta").notNullable().defaultTo(0);
  });

  // Knex has a bug with dropping our complex unique index on PG without
  // an explicit constraint name, but we don't need to do the whole create-
  // new-column-copy-rename dance for postgres at all -- we just drop the
  // type constraint. On SQLite, we do need to do the whole dance.

  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access -- No TS types for knex.client
  if (knex.client.config.client === "pg") {
    await knex.raw(`
      ALTER TABLE activity_log
      DROP CONSTRAINT activity_log_type_check;
    `);
  } else {
    // Knex does not support altering enum types, so we have to create a new
    // column, copy the data over, and rename
    await knex.schema.alterTable("activity_log", function (table) {
      table.dropIndex(["team_id", "slug", "type"]);
      table.dropUnique([
        "team_id",
        "slug",
        jsonPathValue(knex, "data", ["canonical_input"]),
      ]);

      table.renameColumn("type", "type_old");
    });

    await knex.schema.alterTable("activity_log", function (table) {
      table.text("type");
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any -- we're using raw SQL
    await knex<any>("activity_log").update({
      type: knex.raw("type_old"),
    });

    await knex.schema.alterTable("activity_log", function (table) {
      table.dropColumn("type_old");

      table.text("type").notNullable().alter();

      table.index(["team_id", "slug", "type"]);
      table.unique(
        ["team_id", "slug", jsonPathValue(knex, "data", ["canonical_input"])],
        {
          predicate: knex.where("type", knex.raw("'puzzle_guess_submitted'")),
        },
      );
    });
  }
}

export async function down(_knex: Knex): Promise<void> {
  // This migration is not reversible, but it's fine to run against
  // the newer version of the schema, since the new enum is a superset
  // of the old one.
}
