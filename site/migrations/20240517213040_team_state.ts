import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema
    .createTable("team_rounds", function (table) {
      table
        .string("username", 255)
        .notNullable()
        .references("teams.username")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
      table.string("slug", 255).notNullable();
      table.primary(["username", "slug"]);
      table.boolean("unlocked").notNullable().defaultTo(false);
    })
    .createTable("team_puzzles", function (table) {
      table
        .string("username", 255)
        .notNullable()
        .references("teams.username")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
      table.string("slug", 255).notNullable();
      table.primary(["username", "slug"]);
      table.boolean("visible").notNullable().defaultTo(false);
      table.boolean("unlockable").notNullable().defaultTo(false);
      table.boolean("unlocked").notNullable().defaultTo(false);
      table.boolean("solved").notNullable().defaultTo(false);
      // TODO: Track solve time?
    })
    .createTable("team_puzzle_guesses", function (table) {
      table
        .string("username", 255)
        .notNullable()
        .references("teams.username")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
      table.string("slug", 255).notNullable();
      table.string("canonical_input", 255).notNullable();
      table.primary(["username", "slug", "canonical_input"]);
      table.datetime("timestamp").defaultTo(knex.fn.now());
      // TODO: Enum for wrong/partial/correct?
      table.boolean("correct").notNullable().defaultTo(false);
      table.text("response");
    })
    .createTable("team_interactions", function (table) {
      table
        .string("username", 255)
        .notNullable()
        .references("teams.username")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
      table.string("id", 255).notNullable();
      table.primary(["username", "id"]);
      table.boolean("unlocked").notNullable().defaultTo(false);
      table.boolean("completed").notNullable().defaultTo(false);
    });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema
    .dropTable("team_rounds")
    .dropTable("team_puzzles")
    .dropTable("team_puzzle_guesses")
    .dropTable("team_interactions");
}
