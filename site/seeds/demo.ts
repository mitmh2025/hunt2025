import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  // Inserts seed entries
  await knex("teams")
    .insert([{ username: "team", password: "password" }])
    .onConflict("username")
    .ignore();
}
