import { type Knex } from "knex";
import {
  type ActivityLogMutator,
  activityLog,
  registerTeam,
} from "../src/api/data";
import { retryOnAbort } from "../src/api/db";
import { PUZZLES } from "../src/frontend/puzzles";
import HUNT from "../src/huntdata";
import { getSlotSlug, getSlugsBySlot } from "../src/huntdata/logic";

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

      return existing_id;
    });

    if (team_id === undefined) {
      const regResult = await registerTeam(HUNT, undefined, knex, {
        username,
        password: "cornfastcornfurious",
        name: "Illegal Search Testsolvers",
        teamEmail: "team@example.com",
        contactName: "Jack Florey",
        contactEmail: "jack@example.com",
        contactPhone: "+16172531000",
        secondaryContactName: "James E. Tetazoo",
        secondaryContactEmail: "james@example.com",
        secondaryContactPhone: "+16172532000",
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

      if (!regResult.usernameAvailable) {
        throw new Error(`Username ${username} is not available`);
      }

      team_id = regResult.teamId;
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

  const ensureActivityLogEntry = async (
    mutator: ActivityLogMutator,
    team_id: number,
    type:
      | "round_unlocked"
      | "puzzle_unlockable"
      | "puzzle_unlocked"
      | "gate_completed",
    slug: string,
  ) => {
    if (
      !mutator.log.some(
        (entry) =>
          (entry.team_id === team_id || entry.team_id === undefined) &&
          entry.type === type &&
          "slug" in entry &&
          entry.slug === slug,
      )
    ) {
      await mutator.appendLog({
        team_id,
        type,
        slug,
      });
    }
  };

  await createTeam("deathandmayhem");

  await activityLog.executeMutation(
    HUNT,
    undefined,
    undefined,
    knex,
    async (_, mutator) => {
      // Mark the hunt as started, by marking as completed the gate that
      // represents that for all teams.
      if (
        !mutator.log.some(
          (e) =>
            e.type === "gate_completed" &&
            e.slug === "hunt_started" &&
            e.team_id === undefined,
        )
      ) {
        await mutator.appendLog({
          type: "gate_completed",
          slug: "hunt_started",
        });
      }

      // Do an initial currency grant of 9 unlocks, if we haven't given such a
      // grant out yet.
      if (
        !mutator.log.some(
          (e) => e.type === "currency_adjusted" && e.team_id === undefined,
        )
      ) {
        await mutator.appendLog({
          // Give the initial currency grant to all teams.
          type: "currency_adjusted",
          currency_delta: 9,
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
