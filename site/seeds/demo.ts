import { type Knex } from "knex";
import { recalculateTeamState } from "../src/api/db";
import { PUZZLES } from "../src/frontend/puzzles";
import HUNT from "../src/huntdata";
import { getSlugsBySlot } from "../src/huntdata/logic";

export async function seed(knex: Knex): Promise<void> {
  // Inserts seed entries
  const usernameToTeamId = new Map<string, number>();
  for (const username of [
    "team",
    "visible",
    "unlockable",
    "unlocked",
    "solved",
  ]) {
    await knex("teams")
      .insert([{ username, password: "password" }])
      .onConflict("username")
      .ignore();
  }
  const slotsToSlug = getSlugsBySlot(HUNT);
  const slugs = new Set(Object.values(slotsToSlug));

  for (const username of ["visible", "unlockable", "unlocked", "solved"]) {
    const team = await knex("teams")
      .where("username", username)
      .select("id")
      .first();
    if (!team) continue; // guaranteed to be truthy because we just inserted the row above
    const team_id = team.id;
    usernameToTeamId.set(username, team_id);
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
    await knex("team_puzzles").where("team_id", team_id).del();
    await knex("team_puzzle_guesses").where("team_id", team_id).del();
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
        correct: true,
      }));
    }),
  );
  const team_ids = await knex("teams").select("id").pluck("id");
  await knex.transaction(async (trx) => {
    for (const team_id of team_ids) {
      await trx("activity_log").where("team_id", team_id).del();
      await recalculateTeamState(HUNT, team_id, trx);
    }
  });
}
