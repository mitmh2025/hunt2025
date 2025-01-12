import type { Knex } from "knex";
import { generatedPrimaryKey } from "../lib/migration_helper";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("team_interaction_states", function (table) {
    generatedPrimaryKey(knex, table, "id");
    table.integer("team_id").notNullable();
    table.string("slug", 255).notNullable();
    table.string("node", 255).notNullable();
    table.string("predecessor", 255);
    table.datetime("timestamp").notNullable().defaultTo(knex.fn.now());
    table.jsonb("graph_state");

    // Index fetching the history for a particular interaction and looking up
    // any particular state
    table.index(["team_id", "slug", "node"]);

    // Make it impossible for paths though the interaction to diverge
    table.unique(["team_id", "slug", "predecessor"]);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable("team_interaction_states");
}
