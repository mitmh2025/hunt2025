import { type Knex } from "knex";
import { recalculateTeamState } from "../src/api/db";
import { PUZZLES } from "../src/frontend/puzzles";
import HUNT from "../src/huntdata";
import { getSlugsBySlot } from "../src/huntdata/logic";

const CUSTOM_BEHAVIOR_TEAMS = ["visible", "unlockable", "unlocked", "solved"];

export async function seed(knex: Knex): Promise<void> {
  const slotsToSlug = getSlugsBySlot(HUNT);
  const slugs = new Set(Object.values(slotsToSlug));
  const gates = new Set(
    HUNT.rounds.flatMap((round) => (round.gates ?? []).map((gate) => gate.id)),
  );

  // Ensure users exist in the teams table.
  const usernameToTeamId = new Map<string, number>();
  for (const username of ["team", ...CUSTOM_BEHAVIOR_TEAMS]) {
    await knex("teams")
      .insert([{ username, password: "password" }])
      .onConflict("username")
      .ignore();
  }

  // Prepare username -> id lookup map for later
  for (const username of CUSTOM_BEHAVIOR_TEAMS) {
    const team = await knex("teams")
      .where("username", username)
      .select("id")
      .first();
    if (!team) continue; // guaranteed to be truthy because we just inserted the row above
    const team_id = team.id;
    usernameToTeamId.set(username, team_id);
  }

  // Wipe the activity log and other canonical stateful tables for the "custom behavior" teams
  const custom_team_ids = await knex("teams")
    .whereIn("username", CUSTOM_BEHAVIOR_TEAMS)
    .select("id")
    .pluck("id");
  await knex.transaction(async (trx) => {
    for (const team_id of custom_team_ids) {
      await trx("activity_log").where("team_id", team_id).del();
      await trx("team_puzzle_guesses").where("team_id", team_id).del();
    }
  });

  // For the "unlockable" team: unlock all rounds, then mark all puzzles as unlockable
  await knex.transaction(async (trx) => {
    await trx("activity_log").insert(
      HUNT.rounds.map((round) => {
        return {
          team_id: usernameToTeamId.get("unlockable"),
          type: "round_unlocked",
          slug: round.slug,
        };
      }),
    );
    // TODO: create puzzle_unlockable activity log entries, once that's a type that exists
  });

  // For the "unlocked" team: create puzzle_unlocked entries for all rounds & puzzles
  await knex.transaction(async (trx) => {
    await trx("activity_log").insert(
      HUNT.rounds.map((round) => {
        return {
          team_id: usernameToTeamId.get("unlocked"),
          type: "round_unlocked",
          slug: round.slug,
        };
      }),
    );
    await trx("activity_log").insert(
      Array.from(slugs).flatMap((slug) => {
        return {
          team_id: usernameToTeamId.get("unlocked"),
          type: "puzzle_unlocked",
          slug,
        };
      }),
    );
    await trx("activity_log").insert(
      Array.from(gates).flatMap((gate) => {
        return {
          team_id: usernameToTeamId.get("unlocked"),
          type: "gate_completed",
          slug: gate,
        };
      }),
    );
  });

  // For the "solved" team:
  await knex.transaction(async (trx) => {
    // unlock all rounds and puzzles
    await trx("activity_log").insert(
      HUNT.rounds.map((round) => {
        return {
          team_id: usernameToTeamId.get("solved"),
          type: "round_unlocked",
          slug: round.slug,
        };
      }),
    );
    await trx("activity_log").insert(
      Array.from(slugs).flatMap((slug) => {
        return {
          team_id: usernameToTeamId.get("solved"),
          type: "puzzle_unlocked",
          slug,
        };
      }),
    );
    // satisfy all gates
    await trx("activity_log").insert(
      Array.from(gates).flatMap((gate) => {
        return {
          team_id: usernameToTeamId.get("solved"),
          type: "gate_completed",
          slug: gate,
        };
      }),
    );
    // create correct guesses
    await trx("team_puzzle_guesses").insert(
      Array.from(slugs).flatMap((slug) => {
        const puzzle = PUZZLES[slug];
        const answer = puzzle ? puzzle.answer : "PLACEHOLDER ANSWER";
        return {
          team_id: usernameToTeamId.get("solved"),
          slug,
          canonical_input: answer,
          status: "correct",
          response: "Correct!",
        };
      }),
    );
    // mark all puzzles as solved
    // SQLite doesn't play nice with bulk inserts with json columns, so fall back
    // to row-by-row here
    for (const slug of slugs) {
      const puzzle = PUZZLES[slug];
      const answer = puzzle ? puzzle.answer : "PLACEHOLDER ANSWER";
      await trx("activity_log").insert({
        team_id: usernameToTeamId.get("solved"),
        type: "puzzle_solved",
        slug,
        data: {
          answer,
        },
      });
    }
  });

  // Ensure we trigger any triggerable unlocks
  const all_team_ids = await knex("teams").select("id").pluck("id");
  await knex.transaction(async (trx) => {
    for (const team_id of all_team_ids) {
      await recalculateTeamState(HUNT, team_id, trx);
    }
  });
}
