import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema
        .createTable('teams', function(table) {
            table.string('username', 255);
            table.string('password', 255);
        });
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema
        .dropTable('teams');
}

