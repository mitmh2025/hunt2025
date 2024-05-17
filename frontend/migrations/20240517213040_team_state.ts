import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema
        .createTable('team_puzzles', function(table) {
            table.string('username', 255).notNullable().references('teams.username').onDelete('CASCADE').onUpdate('CASCADE');
            table.string('slug', 255).notNullable();
            table.primary(['username', 'slug']);
            table.boolean('visible').notNullable().defaultTo(false);
            table.boolean('unlocked').notNullable().defaultTo(false);
            table.boolean('solved').notNullable().defaultTo(false);
            // TODO: Track solve time?
        })
        .createTable('team_puzzle_guesses', function (table) {
            table.string('username', 255).notNullable().references('teams.username').onDelete('CASCADE').onUpdate('CASCADE');
            table.string('slug', 255).notNullable();
            table.datetime('timestamp').defaultTo(knex.fn.now());
            table.string('canonical_input', 255).notNullable();
            // TODO: Enum for wrong/partial/correct?
            table.text('response');
        });
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema
        .dropTable('team_puzzles')
        .dropTable('team_puzzle_guesses');
}

