import { type Knex } from "knex";
import { type ActivityLogMutator, executeMutation } from "../src/api/data";
import { PUZZLES } from "../src/frontend/puzzles";
import HUNT from "../src/huntdata";
import { getSlugsBySlot } from "../src/huntdata/logic";

export async function seed(knex: Knex): Promise<void> {
  const slotsToSlug = getSlugsBySlot(HUNT);
  const slugs = new Set(Object.values(slotsToSlug));
  const gates = new Set(
    HUNT.rounds.flatMap((round) => (round.gates ?? []).map((gate) => gate.id)),
  );

  const createTeam = async (
    username: string,
    populator?: (team_id: number, mutator: ActivityLogMutator) => Promise<void>,
  ) => {
    await knex("teams")
      .insert([{ username, password: "password" }])
      .onConflict("username")
      .ignore();
    const team = await knex("teams")
      .where("username", username)
      .select("id")
      .first();
    if (!team) return; // guaranteed to be truthy because we just inserted the row above
    const team_id = team.id;
    if (populator) {
      await knex.transaction(
        async (trx) => {
          await trx("activity_log").where("team_id", team_id).del();
        },
        {
          isolationLevel: "serializable",
        },
      );
      await executeMutation(
        HUNT,
        team_id,
        undefined,
        knex,
        async (_, mutator) => {
          await populator(team_id, mutator);
        },
      );
    }
  };

  await createTeam("team");
  await createTeam("visible", async () => {
    /* nothing to do */
  });
  await createTeam("unlockable", async (team_id, mutator) => {
    for (const round of HUNT.rounds) {
      await mutator.appendLog({
        team_id: team_id,
        type: "round_unlocked",
        slug: round.slug,
      });
    }
    for (const slug of slugs) {
      await mutator.appendLog({
        team_id: team_id,
        type: "puzzle_unlockable",
        slug,
      });
    }
  });
  await createTeam("unlocked", async (team_id, mutator) => {
    // For the "unlocked" team: create puzzle_unlocked entries for all rounds & puzzles
    for (const round of HUNT.rounds) {
      await mutator.appendLog({
        team_id: team_id,
        type: "round_unlocked",
        slug: round.slug,
      });
    }
    for (const slug of slugs) {
      await mutator.appendLog({
        team_id: team_id,
        type: "puzzle_unlocked",
        slug,
      });
    }
    for (const gate of gates) {
      await mutator.appendLog({
        team_id: team_id,
        type: "gate_completed",
        slug: gate,
      });
    }
  });
  await createTeam("solved", async (team_id, mutator) => {
    // For the "solved" team:
    // unlock all rounds and puzzles
    for (const round of HUNT.rounds) {
      await mutator.appendLog({
        team_id: team_id,
        type: "round_unlocked",
        slug: round.slug,
      });
    }
    for (const slug of slugs) {
      await mutator.appendLog({
        team_id: team_id,
        type: "puzzle_unlocked",
        slug,
      });
    }
    // satisfy all gates
    for (const gate of gates) {
      await mutator.appendLog({
        team_id: team_id,
        type: "gate_completed",
        slug: gate,
      });
    }
    // mark all puzzles as solved
    // SQLite doesn't play nice with bulk inserts with json columns, so fall back
    // to row-by-row here
    for (const slug of slugs) {
      const puzzle = PUZZLES[slug];
      const answer = puzzle ? puzzle.answer : "PLACEHOLDER ANSWER";
      await mutator.appendLog({
        team_id: team_id,
        type: "puzzle_solved",
        slug,
        data: {
          answer,
        },
      });
    }
  });

  // TODO: Recalculate team state for every team in the DB in case it has changed.
}
