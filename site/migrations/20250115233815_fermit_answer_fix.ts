import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  // replace existing nulls with -1 sentinel
  await knex("fermit_answers").where("answer", null).update("answer", -1);
  await knex.schema.table("fermit_answers", (table) => {
    table.dropNullable("answer");
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.table("fermit_answers", (table) => {
    table.setNullable("answer");
  });
}
