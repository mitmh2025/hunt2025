import { type Knex } from "knex";
import {
  type ActivityLogMutator,
  activityLog,
  registerTeam,
} from "../src/api/data";
import { retryOnAbort } from "../src/api/db";
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
    let team_id = await retryOnAbort(knex, async (trx) => {
      const existing_id = (
        await trx("teams").where("username", username).select("id").first()
      )?.id;

      if (populator !== undefined && existing_id !== undefined) {
        await trx("activity_log").where("team_id", existing_id).del();
      }
      return existing_id;
    });

    if (team_id === undefined) {
      team_id = await registerTeam(HUNT, undefined, knex, {
        username,
        password: "password",
        name: username,
        teamEmail: "team@example.com",
        contactName: "Jack Florey",
        contactEmail: "jack@example.com",
        contactPhone: "+16172531000",
        contactMailingAddress: "123 Main St, Cambridge, MA 02139",
        peopleTotal: 1,
        peopleUndergrad: 0,
        peopleGrad: 0,
        peopleAlum: 0,
        peopleStaff: 0,
        peopleAffiliates: 1,
        peopleMinor: 0,
        peopleOther: 0,
        peopleRemote: 0,
        peopleOnCampus: 1,
        teamLocation: "Room Requested",
        acceptUnattached: true,
        teamGoal: "We’d like to complete the Hunt.",
        teamValues: ["Being in the running to win"],
        teamExcitedAboutWinning: "Yes",
        teamYearEstablished: 2021,
        teamMemberLocations: "MIT",
        referrer: "We have Hunted in the past.",
      });
    }

    if (populator !== undefined) {
      await activityLog.executeMutation(
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
  await createTeam("unlockable", async (team_id, mutator) => {
    for (const round of HUNT.rounds) {
      await mutator.appendLog({
        team_id,
        type: "round_unlocked",
        slug: round.slug,
      });
    }
    for (const slug of slugs) {
      await mutator.appendLog({
        team_id,
        type: "puzzle_unlockable",
        slug,
      });
    }
  });
  await createTeam("unlocked", async (team_id, mutator) => {
    // For the "unlocked" team: create puzzle_unlocked entries for all rounds & puzzles
    for (const round of HUNT.rounds) {
      await mutator.appendLog({
        team_id,
        type: "round_unlocked",
        slug: round.slug,
      });
    }
    for (const slug of slugs) {
      await mutator.appendLog({
        team_id,
        type: "puzzle_unlocked",
        slug,
      });
    }
    for (const gate of gates) {
      await mutator.appendLog({
        team_id,
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
        team_id,
        type: "round_unlocked",
        slug: round.slug,
      });
    }
    for (const slug of slugs) {
      await mutator.appendLog({
        team_id,
        type: "puzzle_unlocked",
        slug,
      });
    }
    // satisfy all gates
    for (const gate of gates) {
      await mutator.appendLog({
        team_id,
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
        team_id,
        type: "puzzle_solved",
        slug,
        data: {
          answer,
        },
      });
    }
  });

  await activityLog.executeMutation(
    HUNT,
    undefined,
    undefined,
    knex,
    async (_, mutator) => {
      // Do an initial currency grant of 8 unlocks, if we haven't given such a
      // grant out yet.
      if (
        !mutator.log.some(
          (e) => e.type === "currency_adjusted" && e.team_id === undefined,
        )
      ) {
        await mutator.appendLog({
          // Give the initial currency grant to all teams.
          type: "currency_adjusted",
          currency_delta: 8,
        });
      }
    },
  );

  // Ensure that we trigger any triggerable unlocks
  const all_team_ids = await knex("teams").select("id").pluck("id");
  for (const team_id of all_team_ids) {
    // TODO: Do all of this in one mutation.
    await activityLog.executeMutation(
      HUNT,
      team_id,
      undefined,
      knex,
      async (_, mutator) => {
        await mutator.recalculateTeamState(HUNT, team_id);
      },
    );
  }
}
