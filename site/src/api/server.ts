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
  TeamPuzzleGuess,
} from "knex/types/tables";
import { Passport } from "passport";
import { Strategy, ExtractJwt } from "passport-jwt";
import * as swaggerUi from "swagger-ui-express";
import { adminContract } from "../../lib/api/admin_contract";
import { type TeamState } from "../../lib/api/client";
import {
  c,
  authContract,
  publicContract,
} from "../../lib/api/contract";
import { frontendContract } from "../../lib/api/frontend_contract";
import { genId } from "../../lib/id";
import { nextAcceptableSubmissionTime } from "../../lib/ratelimit";
import type { RedisClient } from "./redis";
import { PUZZLES } from "../frontend/puzzles";
import { DeferredPublications } from "../frontend/server/deferred_publications";
import { generateSlugToSlotMap } from "../huntdata";
import { type Hunt } from "../huntdata/types";
import { executeMutation, formatTeamState } from "./data";
import {
  getTeamState as dbGetTeamState,
  getPuzzleState as dbGetPuzzleState,
  recalculateTeamState,
  appendActivityLog,
} from "./db";
import {
  formatActivityLogEntryForApi,
  fixTimestamp,
  reducerDeriveTeamState,
  cleanupActivityLogEntryFromDB,
} from "./logic";

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
    { answer, guesses }: { answer?: string; guesses: TeamPuzzleGuess[] },
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
    const round_unlocked = data.unlocked_rounds.has(round);
    // TODO: If the round to which the slug belongs is not unlocked, we mark it as in the "outlands" round.
    if (!round_unlocked) {
      round = "outlands"; // TODO: configurable?
    }

    // The puzzle must be either unlockable or unlocked.
    if (
      !data.unlockable_puzzles.has(slug) &&
      !data.unlocked_puzzles.has(slug)
    ) {
      return undefined;
    }

    const locked: "locked" | "unlockable" | "unlocked" =
      data.unlocked_puzzles.has(slug)
        ? "unlocked"
        : data.unlockable_puzzles.has(slug)
          ? "unlockable"
          : "locked";
    const result: PuzzleState = {
      round,
      locked,
      guesses: guesses.map(
        ({ canonical_input, status, response, timestamp }) => ({
          canonical_input,
          status,
          response,
          timestamp: timestamp.toISOString(),
        }),
      ),
    };
    if (answer) {
      result.answer = answer;
    }
    return result;
  };

  const getPuzzleState = async (
    team_id: number,
    slug: string,
    trx: Knex.Transaction,
  ): Promise<PuzzleState | undefined> => {
    const { activity_log } = await dbGetTeamState(team_id, trx);
    // TODO: Fetch relevant puzzle state from the DB -- puzzle status, answer, guesses, is the round it belongs to unlocked
    const { answer, guesses } = await dbGetPuzzleState(team_id, slug, trx);
    return formatPuzzleState(slug, activity_log, { answer, guesses });
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
          const body = entries.map((e) => {
            const parsedEntry = cleanupActivityLogEntryFromDB(e);
            return formatActivityLogEntryForApi(parsedEntry);
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
          // TODO: Make sure that we retry/wait for conflicts.

          const [response, deferred] = await knex.transaction(
            async function (trx) {
              const deferredPublications = new DeferredPublications({});
              // Check that the puzzle is unlocked before allowing guess submission.
              const unlocked = await trx<
                ActivityLogEntry & { type: "puzzle_unlocked" }
              >("activity_log")
                .where((builder) => {
                  void builder.where("team_id", team_id).orWhereNull("team_id");
                })
                .where("type", "puzzle_unlocked")
                .where("slug", slug)
                .select("slug")
                .first();
              if (unlocked === undefined) {
                return [
                  {
                    status: 404 as const,
                    body: null,
                  },
                  deferredPublications,
                ];
              }

              // Basic rate-limiting: reject guess if more than n incorrect submissions in preceding
              // n^2 minutes "correct" and "other" guesses do not count towards rate-limits.
              // We allow an activity log entry type of "rate_limits_reset" on a puzzle to reset the
              // rate-limit -- we will simply not consider any guesses that occurred earlier than that reset entry
              // for the purposes of rate-limiting.
              const last_reset_time_record = await trx<ActivityLogEntry>(
                "activity_log",
              )
                .where((builder) => {
                  void builder.where("team_id", team_id).orWhereNull("team_id");
                })
                .where("type", "rate_limits_reset")
                .where("slug", slug)
                .orderBy("id", "desc")
                .select("timestamp")
                .first();
              const last_reset_time = last_reset_time_record
                ? fixTimestamp(last_reset_time_record.timestamp)
                : undefined;
              const previous_guess_times = (
                await trx("team_puzzle_guesses")
                  .where("team_id", team_id)
                  .where("slug", slug)
                  .where("status", "incorrect")
                  .orderBy("timestamp")
                  .pluck("timestamp")
              ).map(fixTimestamp);
              const effective_previous_guess_times =
                last_reset_time !== undefined
                  ? previous_guess_times.filter((t) => t > last_reset_time)
                  : previous_guess_times;
              const allowAfter = nextAcceptableSubmissionTime(
                effective_previous_guess_times,
              );
              const now = Date.now();
              if (now < allowAfter.getTime()) {
                return [
                  {
                    status: 429 as const,
                    body: {
                      retryAfter: allowAfter.toISOString(),
                    },
                  },
                  deferredPublications,
                ];
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

              // Only add relevant entries to the activity log if the guess was novel and inserted
              // a record.  Otherwise, we might grant double rewards for the same guess.
              if (inserted.length > 0) {
                // This was a new guess.
                if (correct_answer) {
                  // It was right and the puzzle is now solved.
                  const entry = await appendActivityLog(
                    {
                      team_id,
                      slug,
                      type: "puzzle_solved",
                      currency_delta: cannedResponseProvidesPrize ? 0 : prize,
                      data: {
                        answer: canonical_input,
                      },
                    },
                    trx,
                  );
                  deferredPublications.addActivityLogEntries([entry]);
                } else if (correct_canned_response?.providesSolveReward) {
                  // The guess matched an intermediate for which we provide the solve reward.  We
                  // need to issue a prize for this particular canned response, which means we need
                  // an activity log entry for it.
                  const entry = await appendActivityLog(
                    {
                      team_id,
                      slug,
                      type: "puzzle_partially_solved",
                      currency_delta: prize,
                      data: {
                        partial: canonical_input,
                      },
                    },
                    trx,
                  );
                  deferredPublications.addActivityLogEntries([entry]);
                }

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
            {
              isolationLevel: "serializable",
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
              const data = reducerDeriveTeamState(hunt, mutator.activityLog);
              const unlock_cost = slot.unlock_cost;

              if (
                data.unlockable_puzzles.has(slug) &&
                !data.unlocked_puzzles.has(slug) &&
                unlock_cost &&
                data.available_currency >= unlock_cost
              ) {
                // Unlock puzzle.
                await mutator.appendActivityLog({
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
            const { answer, guesses } = await knex.transaction(
              (trx) => dbGetPuzzleState(team_id, slug, trx),
              { readOnly: true },
            );
            return {
              status: 200 as const,
              /* eslint-disable-next-line @typescript-eslint/no-non-null-assertion --
               * We know the puzzle state exists because we checked the db above. */
              body: formatPuzzleState(slug, activityLog, { answer, guesses })!,
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
        handler: async ({ params: { teamId, gateId } }) => {
          const [response, deferred] = await knex.transaction(
            async (trx) => {
              const deferredPublications = new DeferredPublications({});
              const team_id = parseInt(teamId, 10);
              // Check if already satisfied.
              const existing = await trx("activity_log")
                .where((builder) => {
                  void builder.where("team_id", team_id).orWhereNull("team_id");
                })
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
            },
            {
              isolationLevel: "serializable",
            },
          );
          await deferred.publish(redisClient);
          return response;
        },
      },
      startInteraction: {
        middleware: [frontendAuthMiddleware],
        handler: async ({ params: { teamId, interactionId } }) => {
          const [response, deferred] = await knex.transaction(
            async (trx) => {
              const deferredPublications = new DeferredPublications({});
              const team_id = parseInt(teamId, 10);
              const existing = await trx("activity_log")
                .where((builder) => {
                  void builder.where("team_id", team_id).orWhereNull("team_id");
                })
                .whereIn("type", [
                  "interaction_unlocked",
                  "interaction_started",
                ])
                .where("slug", interactionId)
                .select("type");
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
            },
            {
              isolationLevel: "serializable",
            },
          );
          await deferred.publish(redisClient);
          return response;
        },
      },
      completeInteraction: {
        middleware: [frontendAuthMiddleware],
        handler: async ({ params: { teamId, interactionId }, body }) => {
          const [response, deferred] = await knex.transaction(
            async (trx) => {
              const deferredPublications = new DeferredPublications({});
              const team_id = parseInt(teamId, 10);
              const existing = (await trx("activity_log")
                .where((builder) => {
                  void builder.where("team_id", team_id).orWhereNull("team_id");
                })
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
            },
            {
              isolationLevel: "serializable",
            },
          );
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
      getFullGuessHistory: {
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
              let q = trx("team_puzzle_guesses");
              if (effectiveSince !== undefined) {
                q = q.where("id", ">", effectiveSince);
              }
              q = q.select(
                "id",
                "team_id",
                "slug",
                "canonical_input",
                "status",
                "response",
                "timestamp",
              );
              return q;
            },
            { readOnly: true },
          );
          const body = entries.map(
            ({
              id,
              team_id,
              slug,
              canonical_input,
              status,
              response,
              timestamp,
            }) => {
              return {
                id,
                team_id,
                slug,
                canonical_input,
                status,
                response,
                timestamp: fixTimestamp(timestamp).toISOString(),
              };
            },
          );
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
