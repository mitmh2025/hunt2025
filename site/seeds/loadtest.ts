import { type Knex } from "knex";
import {
  activityLog,
  puzzleStateLog,
  registerTeam,
  teamRegistrationLog,
} from "../src/api/data";
import { PUZZLES } from "../src/frontend/puzzles";
import { type LogEntryData } from "../src/frontend/puzzles/new-ketchup/types";
import HUNT from "../src/huntdata";
import { omit } from "../src/utils/omit";

export async function seed(knex: Knex): Promise<void> {
  const teams = await knex("teams")
    .where("username", "=", "loadtest1")
    .select("id");
  if (teams.length > 0) {
    console.log("loadtest1 already exists; skipping loadtest seed");
    return;
  }

  async function createTeam(username: string) {
    // register the team
    const registration = {
      username,
      password: "password",
      name: username,
      teamEmail: `team+${username}@mitmh2025.com`,
      contactName: "Jack Florey",
      contactEmail: `jack+${username}@mitmh2025.com`,
      contactPhone: "+16172531000",
      secondaryContactName: "James E. Tetazoo",
      secondaryContactEmail: `james+${username}@mitmh2025.com`,
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
      teamLocation: "Room Requested" as const,
      acceptUnattached: true,
      teamGoal: "We’d like to complete the Hunt.",
      teamValues: ["Being in the running to win"],
      teamExcitedAboutWinning: "Yes",
      teamYearEstablished: 2021,
      teamMemberLocations: "MIT",
      referrer: "We have Hunted in the past.",
    };

    const regResult = await registerTeam(HUNT, undefined, knex, registration);

    if (!regResult.usernameAvailable) {
      throw new Error(`Username ${username} is not available`);
    }

    const teamId = regResult.teamId;

    // change their registration 10 times
    await teamRegistrationLog.executeMutation(
      teamId,
      undefined,
      knex,
      async (_, mutator) => {
        for (let i = 0; i < 10; i++) {
          await mutator.appendLog({
            type: "team_registration_updated",
            team_id: teamId,
            data: omit(registration, "username", "password", "name"),
          });
        }
      },
    );

    // change their name 100 times
    await teamRegistrationLog.executeMutation(
      teamId,
      undefined,
      knex,
      async (_, mutator) => {
        for (let i = 0; i < 100; i++) {
          await mutator.appendLog({
            type: "team_name_changed",
            team_id: teamId,
            data: {
              name: `${username} ${i}`,
            },
          });
        }
      },
    );

    // solve all the puzzles except Dead Thief, submitting 3 guesses for each
    await activityLog.executeMutation(
      HUNT,
      teamId,
      undefined,
      knex,
      async (_, mutator) => {
        for (const round of HUNT.rounds) {
          await mutator.appendLog({
            type: "round_unlocked",
            team_id: teamId,
            slug: round.slug,
          });

          if (round.slug === "murder_in_mitropolis") {
            // don't solve Dead Thief; we want some activity for the team to
            // still do
            continue;
          }

          for (const puzzle of round.puzzles) {
            const slug = puzzle.slug ?? puzzle.id;
            const puzzleDef = PUZZLES[slug];

            await mutator.appendLog({
              type: "puzzle_unlockable",
              team_id: teamId,
              slug,
            });

            await mutator.appendLog({
              type: "puzzle_unlocked",
              team_id: teamId,
              slug,
            });

            for (let i = 0; i < 2; i++) {
              await mutator.appendLog({
                type: "puzzle_guess_submitted",
                team_id: teamId,
                slug,
                data: {
                  status: "incorrect",
                  canonical_input: `GUESS${i}`,
                  response: "A response",
                },
              });
            }

            const partial = puzzleDef?.canned_responses.find(
              (r) => r.providesSolveReward,
            );
            if (partial) {
              await mutator.appendLog({
                type: "puzzle_guess_submitted",
                team_id: teamId,
                slug,
                data: {
                  status: "other",
                  canonical_input: partial.guess[0] ?? "",
                  response: partial.reply,
                },
              });

              await mutator.appendLog({
                type: "puzzle_partially_solved",
                team_id: teamId,
                slug,
                data: {
                  partial: partial.guess[0] ?? "",
                },
                currency_delta: puzzle.prize ?? 1,
              });
            }

            await mutator.appendLog({
              type: "puzzle_guess_submitted",
              team_id: teamId,
              slug,
              data: {
                status: "correct",
                canonical_input: puzzleDef?.answer ?? "PLACEHOLDER ANSWER",
                response: "Correct!",
              },
            });

            await mutator.appendLog({
              type: "puzzle_solved",
              team_id: teamId,
              slug,
              data: {
                answer: puzzleDef?.answer ?? "PLACEHOLDER ANSWER",
              },
              currency_delta: partial ? 0 : puzzle.prize ?? 1,
              strong_currency_delta: puzzle.strong_currency_prize ?? 0,
            });
          }

          for (const interaction of round.interactions ?? []) {
            await mutator.appendLog({
              type: "interaction_unlocked",
              team_id: teamId,
              slug: interaction.id,
            });

            await mutator.appendLog({
              type: "interaction_started",
              team_id: teamId,
              slug: interaction.id,
            });

            await mutator.appendLog({
              type: "interaction_completed",
              team_id: teamId,
              slug: interaction.id,
              data: {
                result: "A response",
              },
            });
          }

          for (const gate of round.gates ?? []) {
            await mutator.appendLog({
              type: "gate_completed",
              team_id: teamId,
              slug: gate.id,
            });
          }
        }
      },
    );

    // generate some puzzle states
    await puzzleStateLog.executeMutation(
      teamId,
      undefined,
      knex,
      async (_, mutator) => {
        for (let i = 0; i < 100; i++) {
          await mutator.appendLog({
            team_id: teamId,
            slug: "what_do_they_call_you",
            data: {
              line: "This is some line for the puzzle",
              isYou: false,
              speaker: "Some speaker",
              isDone: false,
            } satisfies LogEntryData,
          });
        }
      },
    );
  }

  for (let i = 0; i < 100; i++) {
    await createTeam(`loadtest${i}`);
  }
}
