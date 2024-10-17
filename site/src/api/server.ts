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
  type InsertActivityLogEntry,
} from "knex/types/tables";
import { Passport } from "passport";
import { Strategy, ExtractJwt } from "passport-jwt";
import * as swaggerUi from "swagger-ui-express";
import { adminContract } from "../../lib/api/admin_contract";
import { type TeamState } from "../../lib/api/client";
import { c, authContract, publicContract } from "../../lib/api/contract";
import { frontendContract } from "../../lib/api/frontend_contract";
import { genId } from "../../lib/id";
import { nextAcceptableSubmissionTime } from "../../lib/ratelimit";
import { PUZZLES } from "../frontend/puzzles";
import { generateSlugToSlotMap } from "../huntdata";
import { type Hunt } from "../huntdata/types";
import { executeMutation, formatTeamState, type Mutator } from "./data";
import { getTeamState as dbGetTeamState } from "./db";
import {
  formatActivityLogEntryForApi,
  reducerDeriveTeamState,
  cleanupActivityLogEntryFromDB,
} from "./logic";
import type { RedisClient } from "./redis";

type PuzzleState = ServerInferResponseBody<
  typeof publicContract.getPuzzleState,
  200
>;

type JWTPayload = {
  user: string;
  team_id: number;
  sess_id: string;
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
        if (!jwtPayload.team_id) {
          console.warn(
            "JWT valid but missing team_id; treating as unauthorized",
            jwtPayload,
          );
          done(null, false);
        }
        if (!jwtPayload.sess_id) {
          console.warn(
            "JWT valid but missing sess_id; treating as unauthorized",
            jwtPayload,
          );
          done(null, false);
        }
        done(null, jwtPayload.team_id, {
          sess_id: jwtPayload.sess_id,
          adminUser: jwtPayload.adminUser,
        });
      },
    ),
  );
  return passport;
}

function canonicalizeInput(input: string) {
  // TODO: Make sure puzzles agrees with this definition.
  return input.replaceAll(/\s+/g, "").toUpperCase();
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

  const slugToSlotMap = generateSlugToSlotMap(hunt);
  const getTeamState = async (
    team_id: number,
    trx: Knex.Transaction,
  ): Promise<TeamState> => {
    const { team_name, activity_log } = await dbGetTeamState(team_id, trx);
    return formatTeamState(hunt, team_id, team_name, activity_log);
  };

  const formatPuzzleState = (
    slug: string,
    activity_log: ActivityLogEntry[],
  ) => {
    // Look up the slot for this slug.  If the slot does not exist in the hunt, we do not provide a
    // puzzle state for it.
    const slotEntry = slugToSlotMap.get(slug);
    if (!slotEntry) {
      return undefined;
    }

    // The slot entry contains the round slug for the round that canonically contains this puzzle slug.
    let round = slotEntry.roundSlug;

    // TODO: in the fullness of time, we should materialize puzzle_unlockable in activity_log so we can do purely point loads
    //       and not have to derive team state here at all.
    const data = reducerDeriveTeamState(hunt, activity_log);
    const round_unlocked = data.rounds_unlocked.has(round);
    // TODO: If the round to which the slug belongs is not unlocked, we mark it as in the "outlands" round.
    if (!round_unlocked) {
      round = "outlands"; // TODO: configurable?
    }

    // The puzzle must be either unlockable or unlocked.
    if (
      !data.puzzles_unlockable.has(slug) &&
      !data.puzzles_unlocked.has(slug)
    ) {
      return undefined;
    }

    const locked: "locked" | "unlockable" | "unlocked" =
      data.puzzles_unlocked.has(slug)
        ? "unlocked"
        : data.puzzles_unlockable.has(slug)
          ? "unlockable"
          : "locked";

    const guesses = activity_log.filter(
      (e): e is ActivityLogEntry & { type: "puzzle_guess_submitted" } =>
        e.type === "puzzle_guess_submitted" && e.slug === slug,
    );
    const correct_answers = guesses
      .filter((e) => e.data.status === "correct")
      .map((e) => e.data.canonical_input)
      .sort();

    const result: PuzzleState = {
      round,
      locked,
      guesses: guesses.map(
        ({ data: { canonical_input, status, response }, timestamp }) => ({
          canonical_input,
          status,
          response,
          timestamp: timestamp.toISOString(),
        }),
      ),
    };
    if (correct_answers.length > 0) {
      result.answer = correct_answers.join(", ");
    }
    return result;
  };

  const getPuzzleState = async (
    team_id: number,
    slug: string,
    trx: Knex.Transaction,
  ): Promise<PuzzleState | undefined> => {
    const { activity_log } = await dbGetTeamState(team_id, trx);
    return formatPuzzleState(slug, activity_log);
  };

  const executeTeamStateHandler = async (
    teamId: string,
    fn: (
      trx: Knex.Transaction,
      mutator: Mutator<ActivityLogEntry, InsertActivityLogEntry>,
      team_id: number,
    ) => Promise<boolean>,
  ) => {
    const team_id = parseInt(teamId, 10);
    const { result, teamStates } = await executeMutation(
      hunt,
      team_id,
      redisClient,
      knex,
      (trx, mutator) => fn(trx, mutator, team_id),
    );
    const newState = teamStates[team_id];
    if (result && newState !== undefined) {
      return {
        status: 200 as const,
        body: newState,
      };
    }
    return {
      status: 404 as const,
      body: null,
    };
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
              sess_id: genId(),
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
            body: await knex.transaction(getTeamState.bind(null, team_id), {
              readOnly: true,
            }),
          };
        },
      },
      getPuzzleState: {
        middleware: [authMiddleware],
        handler: async ({ params: { slug }, req }) => {
          const team_id = req.user as number;
          const state = await knex.transaction(
            getPuzzleState.bind(null, team_id, slug),
            { readOnly: true },
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
          const entries = await knex("activity_log")
            .where("team_id", team_id)
            .orWhereNull("team_id")
            .select("id", "timestamp", "type", "slug", "currency_delta", "data")
            .orderBy("id");
          const body = entries.flatMap((e) => {
            const parsedEntry = cleanupActivityLogEntryFromDB(e);
            const apiEntry = formatActivityLogEntryForApi(parsedEntry);
            return apiEntry !== undefined ? [apiEntry] : [];
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
          const slot = slugToSlotMap.get(slug);
          if (slot === undefined) {
            // If a puzzle is not assigned to a slot in the hunt, you should not be able to submit
            // guesses to it nor receive prizes for correct answers, even if the slug happens to be
            // typeset/exist.
            return {
              status: 404,
              body: null,
            };
          }

          const cannedResponseProvidesPrize =
            puzzle?.canned_responses.some(
              (cr) => cr.providesSolveReward === true,
            ) ?? false;
          const defaultPrize = slot.slot.is_meta ? 0 : 1;
          const prize = slot.slot.prize ?? defaultPrize;

          let canonical_input = canonicalizeInput(guess);
          const answers = puzzle
            ? [puzzle.answer]
            : process.env.NODE_ENV === "development"
              ? ["PLACEHOLDER ANSWER"]
              : [];

          const correct_answer = answers.find(
            (answer) => canonicalizeInput(answer) === canonical_input,
          );
          const correct_canned_response = puzzle?.canned_responses.find((cr) =>
            cr.guess.some(
              (guess) => canonicalizeInput(guess) === canonical_input,
            ),
          );

          const { result, activityLog } = await executeMutation(
            hunt,
            team_id,
            redisClient,
            knex,
            async function (_, mutator) {
              const puzzle_log = mutator.log.filter((e) => e.slug === slug);
              // Check that the puzzle is unlocked before allowing guess submission.
              const unlocked = puzzle_log.some(
                (e) => e.type === "puzzle_unlocked",
              );
              if (!unlocked) {
                return {
                  status: 404 as const,
                  body: null,
                };
              }

              // Basic rate-limiting: reject guess if more than n incorrect submissions in preceding
              // n^2 minutes "correct" and "other" guesses do not count towards rate-limits.
              // We allow an activity log entry type of "rate_limits_reset" on a puzzle to reset the
              // rate-limit -- we will simply not consider any guesses that occurred earlier than that reset entry
              // for the purposes of rate-limiting.
              const last_reset_time_record = puzzle_log.findLast(
                (e) => e.type === "rate_limits_reset",
              );
              const last_reset_time = last_reset_time_record?.timestamp;
              const previous_guess_times = puzzle_log
                .filter(
                  (e) =>
                    e.type === "puzzle_guess_submitted" &&
                    e.data.status === "incorrect",
                )
                .map((e) => e.timestamp);
              const effective_previous_guess_times =
                last_reset_time !== undefined
                  ? previous_guess_times.filter((t) => t > last_reset_time)
                  : previous_guess_times;
              const allowAfter = nextAcceptableSubmissionTime(
                effective_previous_guess_times,
              );
              const now = Date.now();
              if (now < allowAfter.getTime()) {
                return {
                  status: 429 as const,
                  body: {
                    retryAfter: allowAfter.toISOString(),
                  },
                };
              }

              // Determine our disposition on this submission.
              let responseText = "Incorrect";
              let status: GuessStatus = "incorrect";
              if (correct_answer) {
                canonical_input = correct_answer;
                responseText = "Correct!";
                status = "correct";
              } else if (correct_canned_response) {
                const matching_input = correct_canned_response.guess.find(
                  (g) => canonicalizeInput(g) === canonical_input,
                );
                canonical_input = matching_input ?? canonical_input;
                responseText = correct_canned_response.reply;
                status = "other";
              }

              // Attempt to insert a new guess.  If this guess's input matches some other canonical
              // input, inserted should be empty thanks to the unique index and
              // onConflict()/ignore().
              const inserted = await mutator.appendLog({
                team_id,
                slug,
                type: "puzzle_guess_submitted",
                data: {
                  canonical_input,
                  status,
                  response: responseText,
                },
              });

              // Only add relevant entries to the activity log if the guess was novel and inserted
              // a record.  Otherwise, we might grant double rewards for the same guess.
              if (inserted !== undefined) {
                // This was a new guess.
                if (correct_answer) {
                  // It was right and the puzzle is now solved.
                  await mutator.appendLog({
                    team_id,
                    slug,
                    type: "puzzle_solved",
                    currency_delta: cannedResponseProvidesPrize ? 0 : prize,
                    data: {
                      answer: canonical_input,
                    },
                  });
                } else if (correct_canned_response?.providesSolveReward) {
                  // The guess matched an intermediate for which we provide the solve reward.  We
                  // need to issue a prize for this particular canned response, which means we need
                  // an activity log entry for it.
                  await mutator.appendLog({
                    team_id,
                    slug,
                    type: "puzzle_partially_solved",
                    currency_delta: prize,
                    data: {
                      partial: canonical_input,
                    },
                  });
                }
              }
              return { status: 200 as const };
            },
          );
          if (result.status === 200) {
            return {
              status: 200 as const,
              /* eslint-disable-next-line @typescript-eslint/no-non-null-assertion --
               * We know the puzzle state exists because we checked the db above. */
              body: formatPuzzleState(slug, activityLog)!,
            };
          }
          return result;
        },
      },
      unlockPuzzle: {
        middleware: [authMiddleware],
        handler: async ({ params: { slug }, req }) => {
          const team_id = req.user as number;
          // The slot for the requested slug must exist in the hunt definition.
          // If it doesn't, we can bail without touching the DB.
          const slot = slugToSlotMap.get(slug)?.slot;
          if (!slot) {
            return {
              status: 404 as const,
              body: null,
            };
          }
          const { result, activityLog } = await executeMutation(
            hunt,
            team_id,
            redisClient,
            knex,
            async function (_, mutator) {
              // Verify puzzle is currently unlockable.
              const data = reducerDeriveTeamState(hunt, mutator.log);
              const unlock_cost = slot.unlock_cost;

              if (
                data.puzzles_unlockable.has(slug) &&
                !data.puzzles_unlocked.has(slug) &&
                unlock_cost &&
                data.available_currency >= unlock_cost
              ) {
                // Unlock puzzle.
                await mutator.appendLog({
                  team_id,
                  type: "puzzle_unlocked",
                  slug,
                  currency_delta: -unlock_cost,
                });
                return true;
              }
              return false;
            },
          );
          if (result) {
            return {
              status: 200 as const,
              /* eslint-disable-next-line @typescript-eslint/no-non-null-assertion --
               * We know the puzzle state exists because we checked the db above. */
              body: formatPuzzleState(slug, activityLog)!,
            };
          }
          return {
            status: 404 as const,
            body: null,
          };
        },
      },
    },
    admin: {
      getTeamState: {
        middleware: adminAuthMiddlewares,
        handler: async ({ params: { teamId } }) => {
          return {
            status: 200 as const,
            body: await knex.transaction(
              getTeamState.bind(null, parseInt(teamId, 10)),
              { readOnly: true },
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
            { readOnly: true },
          );
          if (!state) {
            return {
              status: 404 as const,
              body: null,
            };
          }
          return {
            status: 200 as const,
            body: state,
          };
        },
      },
    },
    frontend: {
      markTeamGateSatisfied: {
        middleware: [frontendAuthMiddleware],
        handler: ({ params: { teamId, gateId } }) =>
          executeTeamStateHandler(teamId, async (_, mutator, team_id) => {
            // Check if already satisfied.
            const existing = mutator.log.some(
              (e) =>
                (e.team_id === team_id || e.team_id === undefined) &&
                e.type === "gate_completed" &&
                e.slug === gateId,
            );
            // If not, insert gate completion.
            // If already present, no change
            if (!existing) {
              await mutator.appendLog({
                team_id,
                type: "gate_completed",
                slug: gateId,
              });
            }
            return true;
          }),
      },
      startInteraction: {
        middleware: [frontendAuthMiddleware],
        handler: ({ params: { teamId, interactionId } }) =>
          executeTeamStateHandler(teamId, async (_, mutator, team_id) => {
            const existing = mutator.log.filter(
              (e) =>
                (e.team_id === team_id || e.team_id === undefined) &&
                (e.type === "interaction_unlocked" ||
                  e.type === "interaction_started") &&
                e.slug === interactionId,
            );
            const is_unlocked = existing.some(
              (entry) => entry.type === "interaction_unlocked",
            );
            if (!is_unlocked) {
              return false;
            }
            const is_started = existing.some(
              (entry) => entry.type === "interaction_started",
            );
            if (!is_started) {
              await mutator.appendLog({
                team_id,
                type: "interaction_started",
                slug: interactionId,
              });
            }
            return true;
          }),
      },
      completeInteraction: {
        middleware: [frontendAuthMiddleware],
        handler: ({ params: { teamId, interactionId }, body }) =>
          executeTeamStateHandler(teamId, async (_, mutator, team_id) => {
            const existing = mutator.log.filter(
              (e) =>
                (e.team_id === team_id || e.team_id === undefined) &&
                (e.type === "interaction_unlocked" ||
                  e.type === "interaction_started" ||
                  e.type === "interaction_completed") &&
                e.slug === interactionId,
            );
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
              return false;
            }
            if (!is_completed) {
              await mutator.appendLog({
                team_id,
                type: "interaction_completed",
                slug: interactionId,
                data: {
                  result: body.result,
                },
              });
            }
            return true;
          }),
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

          const entries = await knex.transaction(
            async (trx) => {
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
                "internal_data",
              );
              return q;
            },
            { readOnly: true },
          );
          const body = entries.map((e) => {
            const entry = cleanupActivityLogEntryFromDB(e);
            return {
              ...entry,
              timestamp: entry.timestamp.toISOString(),
            };
          });
          return {
            status: 200,
            body,
          };
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
