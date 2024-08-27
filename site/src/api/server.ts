import { timingSafeEqual } from "node:crypto";
import { type ServerInferResponseBody } from "@ts-rest/core";
import { createExpressEndpoints, initServer } from "@ts-rest/express";
import { generateOpenApi } from "@ts-rest/open-api";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import {
  type NextFunction,
  type Request,
  type RequestHandler,
  type Response,
  Router,
} from "express";
import jwt from "jsonwebtoken";
import { type Knex } from "knex";
import {
  type GuessStatus,
  type ActivityLogEntry,
  type TeamPuzzleGuess,
} from "knex/types/tables";
import { Passport } from "passport";
import { Strategy, ExtractJwt } from "passport-jwt";
import * as swaggerUi from "swagger-ui-express";
import { adminContract } from "../../lib/api/admin_contract";
import { type TeamState } from "../../lib/api/client";
import { c, authContract, publicContract } from "../../lib/api/contract";
import { frontendContract } from "../../lib/api/frontend_contract";
import type { RedisClient } from "../app";
import { PUZZLES } from "../frontend/puzzles";
import { getSlotSlug } from "../huntdata/logic";
import { type Hunt } from "../huntdata/types";
import {
  getTeamState as dbGetTeamState,
  getPuzzleState as dbGetPuzzleState,
  recalculateTeamState,
  fixTimestamp,
  appendActivityLog,
} from "./db";

type PuzzleState = ServerInferResponseBody<
  typeof publicContract.getPuzzleState,
  200
>;

type ActivityLog = ServerInferResponseBody<
  typeof publicContract.getActivityLog,
  200
>;

type JWTPayload = {
  user: string;
  team_id: number;
  adminUser?: string;
};

function cookieExtractor(req: Request) {
  const token = req.cookies.mitmh2025_auth as string | undefined;
  return token ? token : null;
}

function newPassport(jwtSecret: string | Buffer) {
  const passport = new Passport();
  passport.use(
    new Strategy(
      {
        jwtFromRequest: ExtractJwt.fromExtractors([
          cookieExtractor,
          ExtractJwt.fromAuthHeaderAsBearerToken(),
        ]),
        secretOrKey: jwtSecret,
        //issuer: 'mitmh2025.com',
        //audience: 'mitmh2025.com',
      },
      function (jwtPayload: JWTPayload, done) {
        done(null, jwtPayload.team_id, { adminUser: jwtPayload.adminUser });
      },
    ),
  );
  return passport;
}

function canonicalizeInput(input: string) {
  // TODO: Make sure puzzles agrees with this definition.
  return input.replaceAll(/\s+/g, "").toUpperCase();
}

class DeferredPublications {
  private activityLog?: ActivityLogEntry[];
  private guessLog?: TeamPuzzleGuess[];
  private teamState?: TeamState[];

  constructor({
    activityLog,
    guessLog,
    teamState,
  }: {
    activityLog?: ActivityLogEntry[];
    guessLog?: TeamPuzzleGuess[];
    teamState?: TeamState[];
  }) {
    this.activityLog = activityLog;
    this.guessLog = guessLog;
    this.teamState = teamState;
  }

  addActivityLogEntries(entries: ActivityLogEntry[]) {
    this.activityLog = (this.activityLog ?? []).concat(entries);
  }

  addGuessLogEntries(guesses: TeamPuzzleGuess[]) {
    this.guessLog = (this.guessLog ?? []).concat(guesses);
  }

  addTeamState(teamStates: TeamState[]) {
    this.teamState = (this.teamState ?? []).concat(teamStates);
  }

  concat(other: DeferredPublications) {
    const activityLog = this.activityLog
      ? this.activityLog.concat(other.activityLog ?? [])
      : other.activityLog;
    const teamState = this.teamState
      ? this.teamState.concat(other.teamState ?? [])
      : other.teamState;
    const guessLog = this.guessLog
      ? this.guessLog.concat(other.guessLog ?? [])
      : other.guessLog;
    return new DeferredPublications({
      activityLog,
      guessLog,
      teamState,
    });
  }

  async publish(redisClient?: RedisClient) {
    if (redisClient) {
      try {
        if (this.activityLog) {
          for (const entry of this.activityLog) {
            await redisClient.publish(
              "global/activity_log",
              JSON.stringify(entry),
            );
          }
        }
        if (this.teamState) {
          for (const state of this.teamState) {
            const team_id = state.teamId;
            const topic = `team_state.${team_id}`;
            await redisClient.publish(topic, JSON.stringify(state));
          }
        }
        if (this.guessLog) {
          for (const guess of this.guessLog) {
            await redisClient.publish(
              "global/guess_log",
              JSON.stringify(guess),
            );
          }
        }
      } catch (e: unknown) {
        // Graceful fallback if Redis can't be reached.
        // It's okay if we drop activity log entries on pubsub; tailers will detect the missing id
        // and hit the API to get any missing entries
        console.error("redis publish error", e);
      }
    }
  }
}

export function getRouter({
  jwtSecret,
  frontendApiSecret,
  knex,
  hunt,
  redisClient,
}: {
  jwtSecret: string | Buffer;
  frontendApiSecret: string;
  knex: Knex;
  hunt: Hunt;
  redisClient?: RedisClient;
}) {
  const app = Router();
  app.use(cors());
  app.use(cookieParser());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());

  const passport = newPassport(jwtSecret);

  const s = initServer();

  const getTeamState = async (
    team_id: number,
    trx: Knex.Transaction,
  ): Promise<TeamState> => {
    const data = await dbGetTeamState(team_id, trx);
    //console.log(data);
    const rounds = Object.fromEntries(
      hunt.rounds
        .filter(({ slug: roundSlug }) => data.unlocked_rounds.has(roundSlug))
        .map(({ slug, title, puzzles, gates }) => [
          slug,
          {
            title,
            slots: Object.fromEntries(
              puzzles.flatMap((slot) => {
                const slug = getSlotSlug(slot);
                if (slug && data.visible_puzzles.has(slug)) {
                  const obj = { slug, is_meta: slot.is_meta };
                  return [[slot.id, obj]];
                }
                return [];
              }),
            ),
            gates: gates?.flatMap((gate) => {
              if (gate.id && data.satisfied_gates.has(gate.id)) {
                return [gate.id];
              }
              return [];
            }),
          },
        ]),
    );
    const puzzleRounds = Object.fromEntries(
      Object.entries(rounds).flatMap(([roundSlug, { slots }]) =>
        Object.entries(slots).map(([_id, { slug: puzzleSlug }]) => [
          puzzleSlug,
          roundSlug,
        ]),
      ),
    );
    // Narrow to only interactions declared in the hunt object
    const interactionData = Object.fromEntries(
      hunt.interactions.flatMap((interaction) => {
        if ("interactions" in data) {
          const v = data.interactions[interaction.id];
          if (v) {
            return [[interaction.id, v]];
          }
        }
        return [];
      }),
    );
    const interactions =
      Object.keys(interactionData).length > 0
        ? { interactions: interactionData }
        : {};
    return {
      teamId: team_id,
      teamName: data.team_name,
      rounds,
      currency: data.available_currency,
      puzzles: Object.fromEntries(
        [...data.visible_puzzles].map((slug) => [
          slug,
          {
            round: puzzleRounds[slug] ?? "outlands", // TODO: Should this be hardcoded?
            locked: data.unlocked_puzzles.has(slug)
              ? "unlocked"
              : data.unlockable_puzzles.has(slug)
                ? "unlockable"
                : "locked",
            answer: data.correct_answers[slug],
          },
        ]),
      ),
      // Don't include interactions until one has been reached
      ...interactions,
    };
  };

  const getPuzzleState = async (
    team_id: number,
    slug: string,
    trx: Knex.Transaction,
  ): Promise<PuzzleState | undefined> => {
    const { unlocked_rounds, puzzle_status, answer, guesses } =
      await dbGetPuzzleState(team_id, slug, trx);
    if (!puzzle_status) {
      return undefined;
    }
    let round: string | undefined;
    hunt.rounds.forEach(({ slug: roundSlug, puzzles }) => {
      if (!unlocked_rounds.has(roundSlug)) {
        return;
      }
      puzzles.forEach((slot) => {
        if (slug === getSlotSlug(slot)) {
          round = roundSlug;
        }
      });
    });
    if (!round) {
      round = "outlands"; // TODO: Configurable?
    }
    const locked: "locked" | "unlockable" | "unlocked" = puzzle_status.unlocked
      ? "unlocked"
      : puzzle_status.unlockable
        ? "unlockable"
        : "locked";
    const result: PuzzleState = {
      round,
      locked,
      guesses: guesses.map(({ canonical_input, response, timestamp }) => ({
        canonicalInput: canonical_input,
        response: response ?? "",
        timestamp: timestamp.toISOString(),
      })),
    };
    if (answer) {
      result.answer = answer;
    }
    return result;
  };

  const refreshTeamState = async (
    hunt: Hunt,
    team_id: number,
    trx: Knex.Transaction,
  ): Promise<[TeamState, DeferredPublications]> => {
    const activityLogWrites = await recalculateTeamState(hunt, team_id, trx);
    const teamState = await getTeamState(team_id, trx);
    return [
      teamState,
      new DeferredPublications({
        activityLog: activityLogWrites,
        teamState: [teamState],
      }),
    ];
  };

  const authMiddleware = passport.authenticate("jwt", {
    session: false,
  }) as RequestHandler;

  type Query = Record<
    string,
    | undefined
    | string
    | string[]
    | qs.ParsedQs
    | qs.ParsedQs[]
    | number
    | number[]
  >;
  const frontendAuthMiddleware = (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any -- want to override 4th type parameter to Request and the 2nd and 3rd default to any and I don't want to constrain them in middleware if I can avoid it
    req: Request<unknown, any, any, Query>,
    res: Response,
    next: NextFunction,
  ) => {
    const authHeader = Buffer.from(req.headers.authorization ?? "", "utf8");
    const expected = Buffer.from("frontend-auth " + frontendApiSecret, "utf8");
    if (
      authHeader.length === expected.length &&
      timingSafeEqual(expected, authHeader)
    ) {
      next();
      return;
    } else {
      res.status(403).send("not the frontend");
    }
  };

  const adminAuthMiddlewares: RequestHandler[] = [
    authMiddleware,
    (req, res, next) => {
      if (process.env.NODE_ENV === "development" || req.authInfo?.adminUser) {
        next();
        return;
      }
      res.status(403).send("not an admin");
    },
  ];

  // We merge contracts here so that we can implement additional contracts
  // without having to export them to the client since there's no value in
  // exposing schemas we don't intend to be public.
  const contract = c.router({
    auth: authContract,
    public: publicContract,
    admin: adminContract,
    frontend: frontendContract,
  });
  const router = s.router(contract, {
    auth: {
      login: async ({
        body: { username, password },
      }: {
        body: { username: string; password: string };
      }) => {
        const team = await knex("teams")
          .where({
            username,
            password,
          })
          .select("username", "id")
          .first();
        if (team !== undefined) {
          const token = jwt.sign(
            {
              user: team.username,
              team_id: team.id,
            },
            jwtSecret,
            {},
          );

          return {
            status: 200,
            body: {
              token: token,
            },
          };
        }
        return {
          status: 403,
          body: {},
        };
      },
    },
    public: {
      getMyTeamState: {
        middleware: [authMiddleware],
        handler: async ({ req }) => {
          const team_id = req.user as number;
          return {
            status: 200,
            body: await knex.transaction(getTeamState.bind(null, team_id)),
          };
        },
      },
      getPuzzleState: {
        middleware: [authMiddleware],
        handler: async ({ params: { slug }, req }) => {
          const team_id = req.user as number;
          const state = await knex.transaction(
            getPuzzleState.bind(null, team_id, slug),
          );
          if (!state) {
            return {
              status: 404,
              body: null,
            };
          }
          return {
            status: 200,
            body: state,
          };
        },
      },
      getActivityLog: {
        middleware: [authMiddleware],
        handler: async ({ req }) => {
          const team_id = req.user as number;
          const entries = (await knex("activity_log")
            .where("team_id", team_id)
            .orWhereNull("team_id")
            .select("id", "timestamp", "type", "slug", "currency_delta", "data")
            .orderBy("id", "desc")) as Pick<
            ActivityLogEntry,
            "id" | "timestamp" | "type" | "slug" | "currency_delta" | "data"
          >[];
          const body = entries.map((e) => {
            // TODO: Is there a type-safe way to do this that doesn't involve a switch on e.type?
            let entry: Partial<ActivityLog[number]> = {
              id: e.id,
              timestamp: fixTimestamp(e.timestamp).toISOString(),
              currency_delta: e.currency_delta,
              type: e.type,
            };
            if ("slug" in e && e.slug) {
              (entry as { slug: string }).slug = e.slug;
            }
            if ("data" in e) {
              // SQLite doesn't parse JSON automatically
              const data =
                typeof e.data === "string"
                  ? (JSON.parse(e.data as string) as typeof e.data)
                  : e.data;
              entry = Object.assign(entry, data);
            }
            return entry as ActivityLog[number];
          });
          return {
            status: 200,
            body,
          };
        },
      },
      submitGuess: {
        middleware: [authMiddleware],
        handler: async ({ params: { slug }, body: { guess }, req }) => {
          const team_id = req.user as number;
          const puzzle = PUZZLES[slug];
          let canonical_input = canonicalizeInput(guess);
          const answers = puzzle
            ? "answer" in puzzle
              ? [{ answer: puzzle.answer, prize: puzzle.prize, submit_if: [] }]
              : puzzle.answers
            : process.env.NODE_ENV === "development"
              ? [{ answer: "PLACEHOLDER ANSWER", prize: 1, submit_if: [] }]
              : [];
          // TODO: Figure out the semantics of a correct answer with false submit_if
          const correct_answer = answers.find(
            ({ answer }) => canonicalizeInput(answer) === canonical_input,
          );
          // TODO: Make sure that we retry/wait for conflicts.

          const [response, deferred] = await knex.transaction(
            async function (trx) {
              const deferredPublications = new DeferredPublications({});
              // Check that the puzzle is unlocked before allowing guess submission.
              const result = await trx("team_puzzles")
                .where("team_id", team_id)
                .where("slug", slug)
                .select("unlocked")
                .first();
              if (!result?.unlocked) {
                return [
                  {
                    status: 404 as const,
                    body: null,
                  },
                  deferredPublications,
                ];
              }
              let responseText = "Incorrect";
              let status: GuessStatus = "incorrect";
              if (correct_answer) {
                canonical_input = correct_answer.answer;
                responseText = "Correct!";
                status = "correct";
                const entry = await appendActivityLog(
                  {
                    team_id,
                    slug,
                    type: "puzzle_solved",
                    currency_delta: correct_answer.prize ?? 0,
                    data: {
                      answer: canonical_input,
                    },
                  },
                  trx,
                );
                deferredPublications.addActivityLogEntries([entry]);
              }
              // TODO: Recognize partial answers
              const inserted = await trx("team_puzzle_guesses")
                .insert({
                  team_id,
                  slug,
                  canonical_input,
                  status,
                  response: responseText,
                })
                .onConflict(["team_id", "slug", "canonical_input"])
                .ignore()
                .returning(["id", "timestamp"])
                .then((objs) => {
                  return objs.map(({ id, timestamp }) => {
                    return {
                      id,
                      team_id,
                      slug,
                      canonical_input,
                      status,
                      response: responseText,
                      timestamp: fixTimestamp(timestamp),
                    };
                  });
                });
              deferredPublications.addGuessLogEntries(inserted);

              if (inserted.length > 0) {
                const [_, newWrites] = await refreshTeamState(
                  hunt,
                  team_id,
                  trx,
                );
                // TODO: Invalidate caches

                return [
                  {
                    status: 200 as const,
                    /* eslint-disable-next-line @typescript-eslint/no-non-null-assertion --
                     * We know the puzzle state exists because we checked the db above. */
                    body: (await getPuzzleState(team_id, slug, trx))!,
                  },
                  deferredPublications.concat(newWrites),
                ];
              } else {
                // That guess had already been submitted; nothing to do.  Just return the body
                return [
                  {
                    status: 200 as const,
                    /* eslint-disable-next-line @typescript-eslint/no-non-null-assertion --
                     * We know the puzzle state exists because we checked the db above. */
                    body: (await getPuzzleState(team_id, slug, trx))!,
                  },
                  deferredPublications,
                ];
              }
            },
          );
          await deferred.publish(redisClient);
          return response;
        },
      },
      unlockPuzzle: {
        middleware: [authMiddleware],
        handler: async ({ params: { slug }, req }) => {
          const team_id = req.user as number;
          // TODO: Make sure that we retry/wait for conflicts.
          const [response, deferred] = await knex.transaction(
            async function (trx) {
              const deferredPublications = new DeferredPublications({});
              const data = await dbGetTeamState(team_id, trx);
              const slot = hunt.rounds
                .filter(({ slug }) => data.unlocked_rounds.has(slug))
                .flatMap(({ puzzles }) =>
                  puzzles.flatMap((slot) =>
                    getSlotSlug(slot) === slug ? [slot] : [],
                  ),
                )[0];
              const unlock_cost = slot?.unlock_cost;
              if (
                data.unlockable_puzzles.has(slug) &&
                unlock_cost &&
                data.available_currency >= unlock_cost
              ) {
                await trx("team_puzzles")
                  .where("team_id", team_id)
                  .where("slug", slug)
                  .update({ unlocked: true });
                const entry = await appendActivityLog(
                  {
                    team_id,
                    type: "puzzle_unlocked",
                    slug,
                    currency_delta: -unlock_cost,
                  },
                  trx,
                );
                deferredPublications.addActivityLogEntries([entry]);
                const [_, newWrites] = await refreshTeamState(
                  hunt,
                  team_id,
                  trx,
                );
                // TODO: Invalidate caches
                return [
                  {
                    status: 200 as const,
                    /* eslint-disable-next-line @typescript-eslint/no-non-null-assertion --
                     * We know the puzzle state exists because we checked the db above. */
                    body: (await getPuzzleState(team_id, slug, trx))!,
                  },
                  deferredPublications.concat(newWrites),
                ];
              }
              return [
                {
                  status: 404 as const,
                  body: null,
                },
                deferredPublications,
              ];
            },
          );
          await deferred.publish(redisClient);
          return response;
        },
      },
    },
    admin: {
      getTeamState: {
        middleware: adminAuthMiddlewares,
        handler: async ({ params: { teamId } }) => {
          return {
            status: 200,
            body: await knex.transaction(
              getTeamState.bind(null, parseInt(teamId, 10)),
            ),
          };
        },
      },
      getPuzzleState: {
        middleware: adminAuthMiddlewares,
        handler: async ({ params: { teamId, slug } }) => {
          const team_id = parseInt(teamId, 10);
          const state = await knex.transaction(
            getPuzzleState.bind(null, team_id, slug),
          );
          if (!state) {
            return {
              status: 404,
              body: null,
            };
          }
          return {
            status: 200,
            body: state,
          };
        },
      },
      forcePuzzleState: {
        middleware: adminAuthMiddlewares,
        handler: async ({ params: { teamId, slug }, body }) => {
          const [response, deferred] = await knex.transaction(async (trx) => {
            const team_id = parseInt(teamId, 10);
            await trx("team_puzzles")
              .insert(
                Object.assign(
                  {
                    team_id,
                    slug,
                  },
                  body,
                ),
              )
              .onConflict(["team_id", "slug"])
              .merge(body);
            const [_, newWrites] = await refreshTeamState(hunt, team_id, trx);
            // TODO: Invalidate caches
            return [
              {
                status: 200 as const,
                /* eslint-disable-next-line @typescript-eslint/no-non-null-assertion --
                 * We know the puzzle state exists because we checked the db above. */
                body: (await getPuzzleState(team_id, slug, trx))!,
              },
              newWrites,
            ];
          });
          await deferred.publish(redisClient);
          return response;
        },
      },
    },
    frontend: {
      markTeamGateSatisfied: {
        middleware: [frontendAuthMiddleware],
        handler: async ({ params: { teamId, gateId } }) => {
          const [response, deferred] = await knex.transaction(async (trx) => {
            const deferredPublications = new DeferredPublications({});
            const team_id = parseInt(teamId, 10);
            // Check if already satisfied.
            const existing = await trx("activity_log")
              .where("team_id", team_id)
              .where("type", "gate_completed")
              .where("slug", gateId)
              .select("id")
              .first();
            // If not, insert gate completion.
            // If already present, no change
            if (!existing) {
              const entry = await appendActivityLog(
                {
                  team_id,
                  type: "gate_completed",
                  slug: gateId,
                },
                trx,
              );
              deferredPublications.addActivityLogEntries([entry]);
            }
            // return the team state object regardless
            const [newState, newWrites] = await refreshTeamState(
              hunt,
              team_id,
              trx,
            );
            return [
              {
                status: 200 as const,
                body: newState,
              },
              deferredPublications.concat(newWrites),
            ];
          });
          await deferred.publish(redisClient);
          return response;
        },
      },
      startInteraction: {
        middleware: [frontendAuthMiddleware],
        handler: async ({ params: { teamId, interactionId } }) => {
          const [response, deferred] = await knex.transaction(async (trx) => {
            const deferredPublications = new DeferredPublications({});
            const team_id = parseInt(teamId, 10);
            const existing = (await trx("activity_log")
              .where("team_id", team_id)
              .whereIn("type", ["interaction_unlocked", "interaction_started"])
              .where("slug", interactionId)
              .select("type")) as Partial<ActivityLogEntry>[];
            const is_unlocked = existing.some(
              (entry) => entry.type === "interaction_unlocked",
            );
            if (!is_unlocked) {
              return [
                {
                  status: 404 as const,
                  body: null,
                },
                deferredPublications,
              ];
            }
            const is_started = existing.some(
              (entry) => entry.type === "interaction_started",
            );
            if (!is_started) {
              const entry = await appendActivityLog(
                {
                  team_id,
                  type: "interaction_started",
                  slug: interactionId,
                },
                trx,
              );
              deferredPublications.addActivityLogEntries([entry]);
            }

            const [newState, newWrites] = await refreshTeamState(
              hunt,
              team_id,
              trx,
            );
            return [
              {
                status: 200 as const,
                body: newState,
              },
              deferredPublications.concat(newWrites),
            ];
          });
          await deferred.publish(redisClient);
          return response;
        },
      },
      completeInteraction: {
        middleware: [frontendAuthMiddleware],
        handler: async ({ params: { teamId, interactionId }, body }) => {
          const [response, deferred] = await knex.transaction(async (trx) => {
            const deferredPublications = new DeferredPublications({});
            const team_id = parseInt(teamId, 10);
            const existing = (await trx("activity_log")
              .where("team_id", team_id)
              .whereIn("type", [
                "interaction_unlocked",
                "interaction_started",
                "interaction_completed",
              ])
              .where("slug", interactionId)
              .select("type")) as Partial<ActivityLogEntry>[];
            const is_unlocked = existing.some(
              (entry) => entry.type === "interaction_unlocked",
            );
            const is_started = existing.some(
              (entry) => entry.type === "interaction_started",
            );
            const is_completed = existing.some(
              (entry) => entry.type === "interaction_completed",
            );
            console.log("is_unlocked", is_unlocked);
            console.log("is_started", is_started);
            console.log("is_completed", is_completed);
            if (!is_unlocked || !is_started) {
              return [
                {
                  status: 404 as const,
                  body: null,
                },
                deferredPublications,
              ];
            }
            if (!is_completed) {
              const entry = await appendActivityLog(
                {
                  team_id,
                  type: "interaction_completed",
                  slug: interactionId,
                  data: {
                    result: body.result,
                  },
                },
                trx,
              );
              deferredPublications.addActivityLogEntries([entry]);
            }

            const [newState, newWrites] = await refreshTeamState(
              hunt,
              team_id,
              trx,
            );
            return [
              {
                status: 200 as const,
                body: newState,
              },
              deferredPublications.concat(newWrites),
            ];
          });
          await deferred.publish(redisClient);
          return response;
        },
      },
      getFullActivityLog: {
        middleware: [frontendAuthMiddleware],
        handler: async ({ query: { since } }) => {
          let effectiveSince = undefined;
          if (since) {
            const sinceParsed = Number(since);
            if (sinceParsed > 0) {
              effectiveSince = sinceParsed;
            }
          }

          return await knex.transaction(async (trx) => {
            let q = trx("activity_log");
            if (effectiveSince !== undefined) {
              q = q.where("id", ">", effectiveSince);
            }
            q = q.select(
              "id",
              "team_id",
              "type",
              "currency_delta",
              "slug",
              "timestamp",
              "data",
            );
            const entries = await q;
            const body = entries.map((e) => {
              // TODO: Is there a type-safe way to do this that doesn't involve a switch on e.type?
              let entry: Partial<ActivityLog[number]> = {
                id: e.id,
                team_id: e.team_id,
                timestamp: fixTimestamp(e.timestamp).toISOString(),
                currency_delta: e.currency_delta,
                type: e.type,
              };
              if ("slug" in e && e.slug) {
                (entry as { slug: string }).slug = e.slug;
              }
              if ("data" in e) {
                // SQLite doesn't parse JSON automatically
                const data =
                  typeof e.data === "string"
                    ? (JSON.parse(e.data as string) as typeof e.data)
                    : e.data;
                entry = Object.assign(entry, data);
              }
              return entry as ActivityLog[number];
            });

            return {
              status: 200,
              body,
            };
          });
        },
      },
    },
  });

  createExpressEndpoints(contract, router, app, {
    jsonQuery: true,
    responseValidation: true,
  });

  const openApiDocument = generateOpenApi(contract, {
    info: {
      title: "Hunt API",
      version: "2025",
    },
    servers: [
      {
        url: "/api/",
      },
    ],
  });

  app.use("/", swaggerUi.serve, swaggerUi.setup(openApiDocument));

  return app;
}
