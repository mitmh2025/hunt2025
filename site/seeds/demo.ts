import { type Knex } from "knex";
import { recalculateTeamState } from "../src/api/db";
import { PUZZLES } from "../src/frontend/puzzles";
import HUNT from "../src/huntdata";
import { getSlugsBySlot } from "../src/huntdata/logic";

const CUSTOM_BEHAVIOR_TEAMS = ["visible", "unlockable", "unlocked", "solved"];

export async function seed(knex: Knex): Promise<void> {
  const slotsToSlug = getSlugsBySlot(HUNT);
  const slugs = new Set(Object.values(slotsToSlug));

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
      await trx("team_puzzles").where("team_id", team_id).del();
      await trx("team_rounds").where("team_id", team_id).del();
    }
  });

  // Create correct guesses for all puzzles from the "solved" team
  await knex("team_puzzle_guesses").insert(
    Array.from(slugs).flatMap((slug) => {
      const puzzle = PUZZLES[slug];
      const answers = puzzle
        ? "answer" in puzzle
          ? [{ answer: puzzle.answer, submit_if: [] }]
          : puzzle.answers
        : [{ answer: "PLACEHOLDER ANSWER", submit_if: [] }];
      return answers.map((answer) => ({
        team_id: usernameToTeamId.get("solved"),
        slug,
        canonical_input: answer.answer,
        status: "correct",
      }));
    }),
  );

  // Backfill non-canonical states for each of the custom view users.  These probably need to go away soon.
  for (const username of CUSTOM_BEHAVIOR_TEAMS) {
    const team_id = usernameToTeamId.get(username);
    if (!team_id) continue; // guaranteed to be populated above

    // Unlock all rounds for all "custom behavior" teams.
    await knex("team_rounds")
      .insert(
        HUNT.rounds.map(({ slug }) => ({
          team_id,
          slug,
          unlocked: true, // We don't have a concept of "unlockable" rounds, so just make them all unlocked.
        })),
      )
      .onConflict(["team_id", "slug"])
      .ignore();

    // Set puzzle state as appropriate for a given username.
    await knex("team_puzzles").insert(
      Array.from(slugs).map((slug) => ({
        team_id,
        slug,
        visible: true,
        unlockable: username !== "visible",
        unlocked: username === "unlocked" || username === "solved",
      })),
    );
  }

  // Ensure we trigger any triggerable unlocks
  const all_team_ids = await knex("teams").select("id").pluck("id");
  await knex.transaction(async (trx) => {
    for (const team_id of all_team_ids) {
      await recalculateTeamState(HUNT, team_id, trx);
    }
  });
}
