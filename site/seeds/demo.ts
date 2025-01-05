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
        password: "password",
        name: username,
        teamEmail: "team@mitmh2025.com",
        contactName: "Jack Florey",
        contactEmail: "jack@mitmh2025.com",
        contactPhone: "+16172531000",
        secondaryContactName: "James E. Tetazoo",
        secondaryContactEmail: "james@mitmh2025.com",
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

  const ensurePuzzleSolved = async (
    mutator: ActivityLogMutator,
    team_id: number,
    slug: string,
  ) => {
    const puzzle = PUZZLES[slug];
    const answer = puzzle ? puzzle.answer : "PLACEHOLDER ANSWER";
    if (
      !mutator.log.some(
        (entry) =>
          (entry.team_id === team_id || entry.team_id === undefined) &&
          entry.type === "puzzle_solved" &&
          entry.slug === slug,
      )
    ) {
      await mutator.appendLog({
        team_id,
        type: "puzzle_solved",
        slug,
        data: {
          answer,
        },
      });
    }
  };

  await createTeam("team");
  await createTeam("unlockable", async (team_id, mutator) => {
    for (const round of HUNT.rounds) {
      await ensureActivityLogEntry(
        mutator,
        team_id,
        "round_unlocked" as const,
        round.slug,
      );
    }
    for (const slug of slugs) {
      await ensureActivityLogEntry(mutator, team_id, "puzzle_unlockable", slug);
    }
  });
  await createTeam("unlocked", async (team_id, mutator) => {
    // For the "unlocked" team: create puzzle_unlocked entries for all rounds & puzzles
    for (const round of HUNT.rounds) {
      await ensureActivityLogEntry(
        mutator,
        team_id,
        "round_unlocked",
        round.slug,
      );
    }
    for (const slug of slugs) {
      await ensureActivityLogEntry(mutator, team_id, "puzzle_unlocked", slug);
    }
    for (const gate of gates) {
      await ensureActivityLogEntry(mutator, team_id, "gate_completed", gate);
    }
  });
  await createTeam("solved", async (team_id, mutator) => {
    // For the "solved" team:
    // unlock all rounds and puzzles
    for (const round of HUNT.rounds) {
      await ensureActivityLogEntry(
        mutator,
        team_id,
        "round_unlocked",
        round.slug,
      );
    }
    for (const slug of slugs) {
      await ensureActivityLogEntry(mutator, team_id, "puzzle_unlocked", slug);
    }
    // satisfy all gates
    for (const gate of gates) {
      await ensureActivityLogEntry(mutator, team_id, "gate_completed", gate);
    }
    // mark all puzzles as solved
    // SQLite doesn't play nice with bulk inserts with json columns, so fall back
    // to row-by-row here
    for (const slug of slugs) {
      await ensurePuzzleSolved(mutator, team_id, slug);
    }
  });

  await createTeam("is1", async (team_id, mutator) => {
    // Unlock the illegal_search round
    await ensureActivityLogEntry(
      mutator,
      team_id,
      "round_unlocked" as const,
      "illegal_search",
    );
  });

  const isRound = HUNT.rounds.find((round) => round.slug === "illegal_search");
  if (isRound === undefined) {
    throw new Error("Round illegal_search not found");
  }

  const isPart1Slugs = isRound.puzzles
    .slice(0, 10)
    .map((p) => getSlotSlug(p))
    .filter((slug): slug is string => slug !== false);

  const isPart1Gates = isRound.gates?.slice(0, 17).map((g) => g.id) ?? [];

  await createTeam("is2", async (team_id, mutator) => {
    // Unlock the illegal_search round
    await ensureActivityLogEntry(
      mutator,
      team_id,
      "round_unlocked" as const,
      "illegal_search",
    );

    // unlock, solve, and complete gates for everything in the main room
    for (const slug of isPart1Slugs) {
      await ensureActivityLogEntry(mutator, team_id, "puzzle_unlocked", slug);
      await ensurePuzzleSolved(mutator, team_id, slug);
    }

    for (const gate of isPart1Gates) {
      await ensureActivityLogEntry(mutator, team_id, "gate_completed", gate);
    }

    await ensurePuzzleSolved(mutator, team_id, "papas_bookcase");
  });

  const isPart2Slugs = isRound.puzzles
    .slice(10, 18)
    .map((p) => getSlotSlug(p))
    .filter((slug): slug is string => slug !== false);

  const isPart2Gates = isRound.gates?.slice(17, 27).map((g) => g.id) ?? [];

  await createTeam("is3", async (team_id, mutator) => {
    await ensureActivityLogEntry(
      mutator,
      team_id,
      "round_unlocked" as const,
      "illegal_search",
    );

    for (const slug of [...isPart1Slugs, ...isPart2Slugs]) {
      await ensureActivityLogEntry(mutator, team_id, "puzzle_unlocked", slug);
      await ensurePuzzleSolved(mutator, team_id, slug);
    }

    // satisfy all gates
    for (const gate of [...isPart1Gates, ...isPart2Gates]) {
      await ensureActivityLogEntry(mutator, team_id, "gate_completed", gate);
    }

    await ensurePuzzleSolved(mutator, team_id, "papas_bookcase");
    await ensurePuzzleSolved(mutator, team_id, "papas_stash");
  });

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
  const all_team_ids: number[] = await knex("teams").select("id").pluck("id");
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
