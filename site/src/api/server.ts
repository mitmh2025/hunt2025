import { createPublicKey, type KeyObject, timingSafeEqual } from "node:crypto";
import { isDeepStrictEqual } from "util";
import {
  type ServerInferResponses,
  type AppRouter,
  type ServerInferResponseBody,
} from "@ts-rest/core";
import { createExpressEndpoints, initServer } from "@ts-rest/express";
import { generateOpenApi } from "@ts-rest/open-api";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import {
  type Request,
  type Response,
  type RequestHandler,
  type NextFunction,
  Router,
} from "express";
import {
  createRemoteJWKSet,
  exportJWK,
  exportSPKI,
  importPKCS8,
  type JWTPayload,
  type KeyLike,
  SignJWT,
} from "jose";
import { type Knex } from "knex";
import {
  type GuessStatus,
  type InsertActivityLogEntry,
} from "knex/types/tables";
import { type Address } from "nodemailer/lib/mailer";
import { Passport } from "passport";
import { Strategy as CustomStrategy } from "passport-custom";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import * as swaggerUi from "swagger-ui-express";
import { adminContract } from "../../lib/api/admin_contract";
import { c, authContract, publicContract } from "../../lib/api/contract";
import { dataContract } from "../../lib/api/data_contract";
import {
  type InternalActivityLogEntry,
  type MutableTeamRegistration,
  frontendContract,
  type TeamRegistrationLogEntry,
} from "../../lib/api/frontend_contract";
import { authentikJwtStrategy } from "../../lib/auth";
import { genId } from "../../lib/id";
import { nextAcceptableSubmissionTime } from "../../lib/ratelimit";
import { PUZZLES } from "../frontend/puzzles";
import { generateSlugToSlotMap } from "../huntdata";
import { type Hunt } from "../huntdata/types";
import { omit } from "../utils/omit";
import {
  activityLog,
  type Mutator,
  registerTeam,
  teamRegistrationLog,
} from "./data";
import dataContractImplementation from "./dataContractImplementation";
import {
  changeTeamDeactivation,
  changeTeamPassword,
  cleanupActivityLogEntryFromDB,
  cleanupTeamRegistrationLogEntryFromDB,
} from "./db";
import { confirmationEmailTemplate, type Mailer } from "./email";
import formatActivityLogEntryForApi from "./formatActivityLogEntryForApi";
import {
  formatTeamHuntState,
  reducerDeriveTeamState,
  TeamStateIntermediate,
  TeamInfoIntermediate,
} from "./logic";
import { type RedisClient } from "./redis";

const ADMIN_USER_ID = -1;
const FRONTEND_USER_ID = -2;

type PuzzleState = ServerInferResponseBody<
  typeof publicContract.getPuzzleState,
  200
>;

type HuntJWTPayload = {
  user?: string;
  team_id?: number;
  sess_id?: string;
  adminUser?: string;
};

type AuthentikJWTPayload = {
  iss: string;
  email?: string;
  name: string;
  nickname: string;
  ops?: boolean;
  admin?: boolean;
  groups?: string[];
};

function cookieExtractor(req: Request) {
  const token = req.cookies.mitmh2025_auth as string | undefined;
  return token ? token : null;
}

type PrivateKey =
  | {
      privateKey: KeyLike;
      alg: "RS256";
    }
  | {
      privateKey: Uint8Array;
      alg: "HS256";
    };

async function parseJWTSecret(secret: string | Buffer): Promise<PrivateKey> {
  const str = secret instanceof Buffer ? secret.toString("utf8") : secret;
  try {
    const alg = "RS256";
    const privateKey = await importPKCS8(str, alg);
    return { privateKey, alg };
  } catch (e: unknown) {
    // Not an RSA key
  }
  return { privateKey: new Uint8Array(Buffer.from(str, "utf8")), alg: "HS256" };
}

async function newPassport({
  jwtPrivateKey,
  frontendApiSecret,
  jwksUri,
}: {
  jwtPrivateKey: PrivateKey;
  frontendApiSecret: string;
  jwksUri?: string;
}) {
  const passport = new Passport();
  const jwtPublicKey =
    jwtPrivateKey.alg === "RS256"
      ? await exportSPKI(createPublicKey(jwtPrivateKey.privateKey as KeyObject))
      : new TextDecoder("utf8").decode(jwtPrivateKey.privateKey);
  passport.use(
    "teamJwt",
    new JwtStrategy(
      {
        jwtFromRequest: ExtractJwt.fromExtractors([
          cookieExtractor,
          ExtractJwt.fromAuthHeaderAsBearerToken(),
        ]),
        secretOrKey: jwtPublicKey,
        //issuer: 'mitmh2025.com',
        //audience: 'mitmh2025.com',
      },
      function (jwtPayload: HuntJWTPayload, done) {
        if (!jwtPayload.team_id) {
          console.warn(
            "JWT valid but missing team_id; treating as unauthorized",
            jwtPayload,
          );
          done(null, false);
          return;
        }
        if (!jwtPayload.sess_id) {
          console.warn(
            "JWT valid but missing sess_id; treating as unauthorized",
            jwtPayload,
          );
          done(null, false);
          return;
        }
        done(null, jwtPayload.team_id, {
          sess_id: jwtPayload.sess_id,
          adminUser: jwtPayload.adminUser,
        });
      },
    ),
  );

  const adminStrategies = ["adminJwt"];

  if (jwksUri) {
    passport.use(
      "authentikJwt",
      authentikJwtStrategy(
        jwksUri,
        ExtractJwt.fromAuthHeaderAsBearerToken(),
        function (_, jwtPayload: AuthentikJWTPayload, done) {
          if (!jwtPayload.ops) {
            console.warn(
              "JWT valid but missing ops; treating as unauthorized",
              jwtPayload,
            );
            done(null, false);
            return;
          }

          done(null, ADMIN_USER_ID, {
            jwtPayload,
            adminUser: jwtPayload.email,
            permissionAdmin: !!jwtPayload.admin,
            permissionOps: !!jwtPayload.ops,
          });
        },
      ),
    );
    adminStrategies.push("authentikJwt");
  }

  passport.use(
    "adminJwt",
    new JwtStrategy(
      {
        jwtFromRequest: ExtractJwt.fromExtractors([
          ExtractJwt.fromAuthHeaderAsBearerToken(),
        ]),
        secretOrKey: jwtPublicKey,
      },
      function (jwtPayload: HuntJWTPayload, done) {
        if (!jwtPayload.adminUser) {
          console.warn(
            "JWT valid but missing adminUser; treating as unauthorized",
            jwtPayload,
          );
          done(null, false);
          return;
        }

        done(null, ADMIN_USER_ID, {
          adminUser: jwtPayload.adminUser,
        });
      },
    ),
  );

  passport.use(
    "frontendSecret",
    new CustomStrategy(function (req, done) {
      const authHeader = Buffer.from(req.headers.authorization ?? "", "utf8");

      const expected = Buffer.from(
        "frontend-auth " + frontendApiSecret,
        "utf8",
      );

      if (
        authHeader.length === expected.length &&
        timingSafeEqual(expected, authHeader)
      ) {
        done(null, FRONTEND_USER_ID);
      } else {
        done(null, false);
      }
    }),
  );

  return {
    passport,
    adminStrategies,
  };
}

function canonicalizeInput(input: string) {
  return input
    .normalize("NFD")
    .replaceAll(/[^\p{L}\p{N}]/gu, "")
    .toUpperCase();
}

function formatInternalActivityLogEntryForApi(
  entry: InternalActivityLogEntry,
): ServerInferResponseBody<
  typeof frontendContract.getFullActivityLog,
  200
>[number] {
  return {
    ...entry,
    timestamp: entry.timestamp.toISOString(),
  };
}

function formatMutationResultForAdminApi(
  result: (InternalActivityLogEntry | undefined)[],
): ServerInferResponses<typeof frontendContract.getFullActivityLog, 200> {
  const filteredResults = result.filter(
    (r: InternalActivityLogEntry | undefined): r is InternalActivityLogEntry =>
      !!r,
  );

  return {
    status: 200,
    body: filteredResults.map(formatInternalActivityLogEntryForApi),
  };
}

function formatRegistrationLogEntryForApi(
  entry: TeamRegistrationLogEntry,
): ServerInferResponseBody<
  typeof frontendContract.getFullTeamRegistrationLog,
  200
>[number] {
  return {
    ...entry,
    timestamp: entry.timestamp.toISOString(),
  };
}

export async function getRouter({
  jwtSecret,
  jwksUri,
  frontendApiSecret,
  dataApiSecret,
  knex,
  hunt,
  redisClient,
  mailer,
}: {
  jwtSecret: string | Buffer;
  jwksUri?: string;
  frontendApiSecret: string;
  dataApiSecret: string;
  knex: Knex;
  hunt: Hunt;
  redisClient?: RedisClient;
  mailer: Mailer;
}) {
  const app = Router();
  app.use(cors());
  app.use(cookieParser());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());

  const jwtPrivateKey = await parseJWTSecret(jwtSecret);

  const jwksCache = jwksUri && createRemoteJWKSet(new URL(jwksUri));

  const { passport, adminStrategies } = await newPassport({
    jwtPrivateKey,
    frontendApiSecret,
    jwksUri,
  });

  const mintToken = (payload: JWTPayload) => {
    return new SignJWT(payload)
      .setProtectedHeader({
        alg: jwtPrivateKey.alg,
        kid: "hunt",
      })
      .sign(jwtPrivateKey.privateKey);
  };

  const s = initServer();

  const slugToSlotMap = generateSlugToSlotMap(hunt);
  const getTeamStateIntermediate = async (team_id: number) => {
    const team_state = (
      await activityLog.getCachedLog(knex, redisClient, team_id)
    ).entries.reduce(
      (acc, entry) => acc.reduce(entry),
      new TeamStateIntermediate(hunt),
    );
    return team_state;
  };
  const getTeamState = async (team_id: number) => {
    const team_registration_log = await teamRegistrationLog.getCachedLog(
      knex,
      redisClient,
      team_id,
    );

    const info = team_registration_log.entries
      .reduce((acc, entry) => acc.reduce(entry), new TeamInfoIntermediate())
      .formatTeamInfoIfActive();
    if (info === undefined) {
      return {
        status: 404 as const,
        body: null,
      };
    }
    const team_state = await getTeamStateIntermediate(team_id);
    return {
      status: 200 as const,
      body: {
        teamId: team_id,
        info,
        state: formatTeamHuntState(hunt, team_state),
      },
    };
  };

  const getTeamRegistration = async (team_id: number) => {
    const team_registration_log = await teamRegistrationLog.getCachedLog(
      knex,
      redisClient,
      team_id,
    );
    const registration = team_registration_log.entries
      .reduce((acc, entry) => acc.reduce(entry), new TeamInfoIntermediate())
      .formatTeamRegistrationStateIfActive();
    if (registration === undefined) {
      return {
        status: 404 as const,
        body: null,
      };
    }
    return {
      status: 200 as const,
      body: registration,
    };
  };

  const formatPuzzleState = (
    slug: string,
    activity_log: InternalActivityLogEntry[],
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
    // TODO: If the round to which the slug belongs is not unlocked, we mark it as in the "stray_leads" round.
    if (!round_unlocked) {
      round = "stray_leads"; // TODO: configurable?
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
      (e): e is InternalActivityLogEntry & { type: "puzzle_guess_submitted" } =>
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
        ({
          data: { canonical_input, link, status, response },
          id,
          timestamp,
        }) => ({
          id,
          canonical_input,
          ...(link !== undefined
            ? { link: { display: link.display, href: link.href } }
            : {}),
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
    knex: Knex,
  ): Promise<PuzzleState | undefined> => {
    return formatPuzzleState(
      slug,
      (await activityLog.getCachedLog(knex, redisClient, team_id)).entries,
    );
  };

  const executeTeamStateHandler = async (
    teamId: string,
    fn: (
      trx: Knex.Transaction,
      mutator: Mutator<InternalActivityLogEntry, InsertActivityLogEntry>,
      team_id: number,
    ) => Promise<boolean>,
  ) => {
    const team_id = parseInt(teamId, 10);
    const { result, teamStates } = await activityLog.executeMutation(
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
        body: formatTeamHuntState(hunt, newState),
      };
    }
    return {
      status: 404 as const,
      body: null,
    };
  };

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

  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- want to override 4th type parameter to Request and the 2nd and 3rd default to any and I don't want to constrain them in middleware if I can avoid it
  type RequestHandlerWithQuery = RequestHandler<unknown, any, any, Query>;

  const authMiddleware = passport.authenticate("teamJwt", {
    session: false,
  }) as RequestHandlerWithQuery;

  const adminAuthMiddleware = passport.authenticate(adminStrategies, {
    session: false,
  }) as RequestHandlerWithQuery;

  const frontendAuthMiddleware = passport.authenticate(
    [...adminStrategies, "frontendSecret"],
    {
      session: false,
    },
  ) as RequestHandlerWithQuery;

  function requireAdminPermission(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    if (req.user === FRONTEND_USER_ID) {
      // Frontend can access anything.
      next();
      return;
    }

    const userEmail = req.authInfo?.adminUser;
    if (!userEmail) {
      res.sendStatus(403);
      return;
    }

    if (!req.authInfo?.permissionAdmin) {
      res.sendStatus(403);
      return;
    }

    next();
  }

  // We merge contracts here so that we can implement additional contracts
  // without having to export them to the client since there's no value in
  // exposing schemas we don't intend to be public.
  const contract = c.router({
    auth: authContract,
    public: publicContract,
    admin: adminContract,
    frontend: frontendContract,
    data: dataContract,
  });

  const router = s.router(contract, {
    auth: {
      getJWKS: async () => {
        const keys = [];
        if (jwksCache) {
          if (!jwksCache.fresh) {
            await jwksCache.reload();
          }
          const jwks = jwksCache.jwks();
          if (jwks) {
            keys.push(...jwks.keys);
          }
        }
        if (jwtPrivateKey.alg === "RS256") {
          const jwk = await exportJWK(
            createPublicKey(jwtPrivateKey.privateKey as KeyObject),
          );
          keys.push({
            ...jwk,
            kid: "hunt",
          });
        }
        return {
          status: 200,
          body: {
            keys,
          },
        };
      },
      login: async ({
        body: { username, password },
      }: {
        body: { username: string; password: string };
      }) => {
        const team = await knex("teams")
          .where({
            username,
            password,
            deactivated: false,
          })
          .select("username", "id")
          .first();
        if (team !== undefined) {
          return {
            status: 200,
            body: {
              token: await mintToken({
                user: team.username,
                team_id: team.id,
                sess_id: genId(),
                media: [
                  {
                    action: "read",
                    path: `~^/teams/${team.id}/`,
                  },
                ],
              }),
            },
          };
        }
        return {
          status: 403,
          body: {},
        };
      },
      createRegistration: async ({ body }) => {
        const result = await registerTeam(hunt, redisClient, knex, body);
        if (!result.usernameAvailable) {
          return {
            status: 409,
            body: {
              error: "username_taken",
            },
          };
        }

        try {
          await mailer.sendEmail({
            to: {
              name: body.name,
              address: body.contactEmail,
            },
            subject: "MIT Mystery Hunt 2025 Registration Confirmation",
            text: confirmationEmailTemplate({
              registration: body,
            }),
          });
        } catch (e) {
          // Don't fail if sending email fails; just log the error and
          // return the auth token to the user.
          console.error("Error sending confirmation email", e);
        }

        const token = await mintToken({
          user: body.username,
          team_id: result.teamId,
          sess_id: genId(),
        });

        return {
          status: 200,
          body: {
            token,
          },
        };
      },
      updateRegistration: {
        middleware: [authMiddleware],
        handler: async ({ body, req }) => {
          const teamId = req.user as number;

          const { result } = await teamRegistrationLog.executeMutation(
            teamId,
            redisClient,
            knex,
            async (_, mutator) => {
              const previousRegistration = mutator.getTeamRegistration(teamId);
              if (!previousRegistration) {
                return undefined;
              }

              const nameHasChanged = previousRegistration.name !== body.name;
              const otherFieldsHaveChanged = Object.keys(body)
                .filter((k) => k !== "name")
                .some((k) => {
                  return !isDeepStrictEqual(
                    body[k as keyof MutableTeamRegistration],
                    previousRegistration[k as keyof MutableTeamRegistration],
                  );
                });

              if (nameHasChanged) {
                await mutator.appendLog({
                  type: "team_name_changed",
                  team_id: teamId,
                  data: { name: body.name },
                });
              }

              if (otherFieldsHaveChanged) {
                await mutator.appendLog({
                  type: "team_registration_updated",
                  team_id: teamId,
                  data: omit(body, "name"),
                });
              }

              return mutator.getTeamRegistration(teamId);
            },
          );

          if (!result) {
            return {
              status: 404,
              body: null,
            };
          }

          return {
            status: 200,
            body: result,
          };
        },
      },
      getRegistration: {
        middleware: [authMiddleware],
        handler: async ({ req }) => {
          const team_id = req.user as number;
          return getTeamRegistration(team_id);
        },
      },
    },
    public: {
      getMyTeamState: {
        middleware: [authMiddleware],
        handler: async ({ req }) => {
          const team_id = req.user as number;
          return await getTeamState(team_id);
        },
      },
      getPuzzleState: {
        middleware: [authMiddleware],
        handler: async ({ params: { slug }, req }) => {
          const team_id = req.user as number;
          const state = await getPuzzleState(team_id, slug, knex);
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
          const { entries } = await activityLog.getCachedLog(
            knex,
            redisClient,
            team_id,
          );
          const body = entries.flatMap((e) => {
            const apiEntry = formatActivityLogEntryForApi(e);
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

          const { result, activityLogEntries } =
            await activityLog.executeMutation(
              hunt,
              team_id,
              redisClient,
              knex,
              async function (_, mutator) {
                const teamState = await mutator.recalculateTeamState(
                  hunt,
                  team_id,
                );
                const puzzle_log = mutator.log.filter(
                  (e) => "slug" in e && e.slug === slug,
                );
                // Check that the puzzle is unlocked before allowing guess submission.
                if (!teamState.puzzles_unlocked.has(slug)) {
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
                let link;
                if (correct_answer) {
                  canonical_input = correct_answer;
                  responseText = "Correct!";
                  status = "correct";
                } else if (correct_canned_response) {
                  const matching_input = correct_canned_response.guess.find(
                    (g) => canonicalizeInput(g) === canonical_input,
                  );
                  canonical_input = matching_input ?? canonical_input;
                  link = correct_canned_response.link;
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
                    ...(link !== undefined ? { link } : {}),
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
              body: formatPuzzleState(slug, activityLogEntries)!,
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
          const { result, activityLogEntries } =
            await activityLog.executeMutation(
              hunt,
              team_id,
              redisClient,
              knex,
              async function (_, mutator) {
                // Verify puzzle is currently unlockable.
                const data = await mutator.recalculateTeamState(hunt, team_id);
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
              body: formatPuzzleState(slug, activityLogEntries)!,
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
      mintToken: {
        // Not expected to be called by the frontend, but will be called by ancillary processes.
        middleware: [frontendAuthMiddleware, requireAdminPermission],
        handler: async ({ body }) => {
          return {
            status: 200,
            body: await mintToken(body),
          };
        },
      },
      getTeamState: {
        middleware: [adminAuthMiddleware],
        handler: async ({ params: { teamId } }) => {
          return await getTeamState(parseInt(teamId, 10));
        },
      },
      getTeamContacts: {
        middleware: [adminAuthMiddleware],
        handler: async () => {
          const { entries } = await teamRegistrationLog.getCachedLog(
            knex,
            redisClient,
          );
          const teamInfos = entries.reduce(
            (acc: Map<number, TeamInfoIntermediate>, entry) => {
              const { team_id } = entry;
              acc.set(
                team_id,
                (acc.get(team_id) ?? new TeamInfoIntermediate()).reduce(entry),
              );
              return acc;
            },
            new Map<number, TeamInfoIntermediate>(),
          );
          return {
            status: 200,
            body: Array.from(teamInfos.values()).flatMap((teamInfo) => {
              if (teamInfo.registration === undefined) {
                return [];
              }
              return [
                {
                  username: teamInfo.registration.username,
                  name: teamInfo.registration.name,
                  teamEmail: teamInfo.registration.teamEmail,
                  contactName: teamInfo.registration.contactName,
                  contactEmail: teamInfo.registration.contactEmail,
                  contactPhone: teamInfo.registration.contactPhone,
                  contactMailingAddress:
                    teamInfo.registration.contactMailingAddress,
                  secondaryContactName:
                    teamInfo.registration.secondaryContactName,
                  secondaryContactEmail:
                    teamInfo.registration.secondaryContactEmail,
                  secondaryContactPhone:
                    teamInfo.registration.secondaryContactPhone,
                },
              ];
            }),
          };
        },
      },
      sendTeamEmail: {
        middleware: [adminAuthMiddleware, requireAdminPermission],
        handler: async ({ body }) => {
          const { entries } = await teamRegistrationLog.getCachedLog(
            knex,
            redisClient,
          );
          const teamInfos = entries.reduce(
            (acc: Map<number, TeamInfoIntermediate>, entry) => {
              const { team_id } = entry;
              acc.set(
                team_id,
                (acc.get(team_id) ?? new TeamInfoIntermediate()).reduce(entry),
              );
              return acc;
            },
            new Map<number, TeamInfoIntermediate>(),
          );
          const dryRun = body.dryRun;
          const messages = [];
          for (const teamInfo of teamInfos.values()) {
            const registration = teamInfo.formatTeamRegistrationIfActive();
            if (registration === undefined) {
              continue;
            }

            const addresses = [
              {
                name: registration.contactName,
                address: registration.contactEmail,
              },
              {
                name: registration.secondaryContactName,
                address: registration.secondaryContactEmail,
              },
            ];
            if (body.wholeTeam) {
              addresses.push({
                name: registration.name,
                address: registration.teamEmail,
              });
            }
            for (const address of addresses) {
              const result: {
                address: Address;
                success?: boolean;
              } = {
                address,
              };
              if (!dryRun) {
                try {
                  await mailer.sendEmail({
                    to: address,
                    messageStream: "hunt-announcements",
                    templateAlias: body.templateAlias,
                    templateModel: {
                      teamName: registration.name,
                    },
                  });
                  result.success = true;
                } catch (err: unknown) {
                  console.log("failed sending mail:", err);
                  result.success = false;
                }
              }
              messages.push(result);
            }
          }
          return {
            status: 200,
            body: {
              messages,
            },
          };
        },
      },
      getPuzzleState: {
        middleware: [adminAuthMiddleware],
        handler: async ({ params: { teamId, slug } }) => {
          const team_id = parseInt(teamId, 10);
          const state = await getPuzzleState(team_id, slug, knex);
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
      getPuzzleMetadata: {
        middleware: [adminAuthMiddleware],
        handler: () => {
          const metadata = Object.fromEntries(
            Object.entries(PUZZLES).map(([slug, definition]) => {
              // If we decide to expose the full metadata, we could do:
              // const { content, solution, router, ...rest } = definition;
              // return [slug, rest];
              return [
                slug,
                {
                  title: definition.title,
                  slug: definition.slug,
                },
              ];
            }),
          );

          return Promise.resolve({
            status: 200 as const,
            body: metadata,
          });
        },
      },
      grantKeys: {
        middleware: [adminAuthMiddleware, requireAdminPermission],
        handler: async ({ body: { teamIds, amount }, req }) => {
          let singleTeamId: number | undefined = undefined;
          if (teamIds !== "all" && teamIds.length === 1) {
            singleTeamId = teamIds[0];
          }

          const { result } = await activityLog.executeMutation(
            hunt,
            singleTeamId,
            redisClient,
            knex,
            async function (_, mutator) {
              if (teamIds === "all") {
                return [
                  await mutator.appendLog({
                    type: "currency_adjusted",
                    currency_delta: amount,
                    internal_data: {
                      operator: req.authInfo?.adminUser,
                    },
                  }),
                ];
              } else {
                const result: (InternalActivityLogEntry | undefined)[] = [];
                for (const team_id of teamIds) {
                  result.push(
                    await mutator.appendLog({
                      team_id,
                      type: "currency_adjusted",
                      currency_delta: amount,
                      internal_data: {
                        operator: req.authInfo?.adminUser,
                      },
                    }),
                  );
                }

                return result;
              }
            },
          );

          return formatMutationResultForAdminApi(result);
        },
      },
      opsAccount: {
        middleware: [adminAuthMiddleware],
        handler: ({ req }) => {
          const email = req.authInfo?.adminUser;
          if (!email) {
            throw new Error("No admin user in request");
          }

          return Promise.resolve({
            status: 200 as const,
            body: {
              email,
              isOpsAdmin: req.authInfo?.permissionAdmin ?? false,
            },
          });
        },
      },
      unlockPuzzle: {
        middleware: [adminAuthMiddleware, requireAdminPermission],
        handler: async ({ params: { slug }, body: { teamIds } }) => {
          let singleTeamId: number | undefined = undefined;
          if (teamIds !== "all" && teamIds.length === 1) {
            singleTeamId = teamIds[0];
          }
          const { result } = await activityLog.executeMutation(
            hunt,
            singleTeamId,
            redisClient,
            knex,
            async (_trx, mutator) => {
              // Check if already unlocked
              const teamIdsToUnlock = new Set(
                teamIds === "all" ? mutator.allTeams : teamIds,
              );

              for (const entry of mutator.log) {
                if (entry.type === "puzzle_unlocked" && entry.slug === slug) {
                  if (entry.team_id === undefined) {
                    // already unlocked for all teams
                    return [];
                  }

                  teamIdsToUnlock.delete(entry.team_id);
                }
              }

              if (
                teamIds === "all" &&
                teamIdsToUnlock.size === mutator.allTeams.size
              ) {
                // we are unlocking for all teams and no team has the puzzle locked
                return [
                  await mutator.appendLog({
                    type: "puzzle_unlocked",
                    slug,
                  }),
                ];
              }

              // need to unlock for specific teams
              const newEntries: (InternalActivityLogEntry | undefined)[] = [];
              for (const team_id of teamIdsToUnlock) {
                newEntries.push(
                  await mutator.appendLog({
                    team_id,
                    type: "puzzle_unlocked",
                    slug,
                  }),
                );
              }

              return newEntries;
            },
          );

          return formatMutationResultForAdminApi(result);
        },
      },
      changeTeamPassword: {
        middleware: [adminAuthMiddleware, requireAdminPermission],
        handler: async ({ params: { teamId }, body: { newPassword } }) => {
          const team_id = parseInt(teamId, 10);

          const { result } = await teamRegistrationLog.executeMutation(
            team_id,
            redisClient,
            knex,
            async function (trx, mutator) {
              const log = await mutator.appendLog({
                team_id,
                type: "team_password_change",
                data: {
                  new_password: newPassword,
                },
              });

              await changeTeamPassword(team_id, newPassword, trx);

              return [log];
            },
          );

          const filteredResults = result.filter(
            (
              r: TeamRegistrationLogEntry | undefined,
            ): r is TeamRegistrationLogEntry => !!r,
          );

          return {
            status: 200 as const,
            body: filteredResults.map(formatRegistrationLogEntryForApi),
          };
        },
      },
      deactivateTeam: {
        middleware: [adminAuthMiddleware, requireAdminPermission],
        handler: async ({ params: { teamId } }) => {
          const team_id = parseInt(teamId, 10);

          const { result } = await teamRegistrationLog.executeMutation(
            team_id,
            redisClient,
            knex,
            async function (trx, mutator) {
              const log = await mutator.appendLog({
                team_id,
                type: "team_deactivated",
                data: {},
              });

              await changeTeamDeactivation(team_id, true, trx);

              return [log];
            },
          );

          const filteredResults = result.filter(
            (
              r: TeamRegistrationLogEntry | undefined,
            ): r is TeamRegistrationLogEntry => !!r,
          );

          return {
            status: 200 as const,
            body: filteredResults.map(formatRegistrationLogEntryForApi),
          };
        },
      },
      reactivateTeam: {
        middleware: [adminAuthMiddleware, requireAdminPermission],
        handler: async ({ params: { teamId } }) => {
          const team_id = parseInt(teamId, 10);

          const { result } = await teamRegistrationLog.executeMutation(
            team_id,
            redisClient,
            knex,
            async function (trx, mutator) {
              const log = await mutator.appendLog({
                team_id,
                type: "team_reactivated",
                data: {},
              });

              await changeTeamDeactivation(team_id, false, trx);

              return [log];
            },
          );

          const filteredResults = result.filter(
            (
              r: TeamRegistrationLogEntry | undefined,
            ): r is TeamRegistrationLogEntry => !!r,
          );

          return {
            status: 200 as const,
            body: filteredResults.map(formatRegistrationLogEntryForApi),
          };
        },
      },
    },
    frontend: {
      markTeamGateSatisfied: {
        middleware: [frontendAuthMiddleware, requireAdminPermission],
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
        middleware: [frontendAuthMiddleware, requireAdminPermission],
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
        middleware: [frontendAuthMiddleware, requireAdminPermission],
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
              q = q
                .select(
                  "id",
                  "team_id",
                  "type",
                  "currency_delta",
                  "slug",
                  "timestamp",
                  "data",
                  "internal_data",
                )
                .orderBy("id", "asc");
              return q;
            },
            { readOnly: true },
          );
          const body = entries.map((e) =>
            formatInternalActivityLogEntryForApi(
              cleanupActivityLogEntryFromDB(e),
            ),
          );
          return {
            status: 200,
            body,
          };
        },
      },
      getFullTeamRegistrationLog: {
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
              let q = trx("team_registration_log");
              if (effectiveSince !== undefined) {
                q = q.where("id", ">", effectiveSince);
              }
              q = q
                .select("id", "team_id", "type", "data", "timestamp")
                .orderBy("id", "asc");
              return q;
            },
            { readOnly: true },
          );
          const body = entries.map((e) => {
            const entry = cleanupTeamRegistrationLogEntryFromDB(e);
            return formatRegistrationLogEntryForApi(entry);
          });
          return {
            status: 200,
            body,
          };
        },
      },
    },
    data: dataContractImplementation({ knex, dataApiSecret }),
  });

  createExpressEndpoints(contract, router, app, {
    jsonQuery: true,
    responseValidation: true,
  });

  const openApiDocumentFor = (c: AppRouter) =>
    generateOpenApi(c, {
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
  const prehuntApiDocument = openApiDocumentFor(authContract);
  const huntApiDocument = openApiDocumentFor(
    c.router({
      auth: authContract,
      public: publicContract,
    }),
  );
  const adminApiDocument = openApiDocumentFor(contract);

  app.use(
    "/",
    swaggerUi.serve,
    (req: Request, res: Response, next: NextFunction) => {
      (
        passport.authenticate(
          ["teamJwt", "adminJwt"],
          async (
            _err: unknown,
            user?: Express.User | false | null,
            info?: Express.AuthInfo,
          ) => {
            const huntStarted =
              user &&
              (user as number) > 0 &&
              (
                await getTeamStateIntermediate(user as number)
              ).gates_satisfied.has("hunt_started");
            const apiDoc =
              process.env.NODE_ENV === "development" || info?.adminUser
                ? adminApiDocument
                : huntStarted
                  ? huntApiDocument
                  : prehuntApiDocument;
            swaggerUi.setup(apiDoc)(req, res, next);
          },
        ) as RequestHandler
      )(req, res, next);
    },
  );

  return app;
}
