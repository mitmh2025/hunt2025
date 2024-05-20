import { Knex } from "knex";
import { recalculateTeamState } from "../src/api/db";
import { PUZZLES } from "../src/frontend/puzzles";
import HUNT from "../src/huntdata";
import { getSlugsBySlot } from "../src/huntdata/logic";

export async function seed(knex: Knex): Promise<void> {
  // Inserts seed entries
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
    await knex("team_rounds")
      .insert(
        HUNT.rounds.map(({ slug }) => ({
          username,
          slug,
          unlocked: true, // We don't have a concept of "unlockable" rounds, so just make them all unlocked.
        })),
      )
      .onConflict(["username", "slug"])
      .ignore();
    await knex("team_puzzles").where("username", username).del();
    await knex("team_puzzle_guesses").where("username", username).del();
    await knex("team_puzzles").insert(
      Array.from(slugs).map((slug) => ({
        username,
        slug,
        visible: true,
        unlockable: username != "visible",
        unlocked: username == "unlocked" || username == "solved",
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
        username: "solved",
        slug,
        canonical_input: answer.answer,
        correct: true,
      }));
    }),
  );
  const usernames = await knex("teams").select("username").pluck("username");
  await knex.transaction(async (trx) => {
    for (const username of usernames) {
      await recalculateTeamState(HUNT, username, trx);
    }
  });
}
