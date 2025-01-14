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
import sanitizeHtml from "sanitize-html";
import * as swaggerUi from "swagger-ui-express";
import {
  adminContract,
  type FermitRegistration,
} from "../../lib/api/admin_contract";
import { c, authContract, publicContract } from "../../lib/api/contract";
import { dataContract } from "../../lib/api/data_contract";
import {
  type InternalActivityLogEntry,
  type MutableTeamRegistration,
  frontendContract,
  type TeamRegistrationLogEntry,
  type PuzzleStateLogEntry,
} from "../../lib/api/frontend_contract";
import { authentikJwtStrategy } from "../../lib/auth";
import canonicalizeInput from "../../lib/canonicalizeInput";
import { genId } from "../../lib/id";
import { nextAcceptableSubmissionTime } from "../../lib/ratelimit";
import { albumLookup } from "../../ops/src/opsdata/desertedNinjaImages";
import {
  type FermitQuestion,
  ALL_QUESTIONS,
} from "../../ops/src/opsdata/desertedNinjaQuestions";
import { INTERACTIONS } from "../frontend/interactions";
import {
  countVotes,
  type VirtualInteractionHandler,
} from "../frontend/interactions/virtual_interaction_handler";
import { PUZZLES, SUBPUZZLES } from "../frontend/puzzles";
import { generateLogEntries } from "../frontend/puzzles/new-ketchup/server";
import {
  orderedQuixoticSubpuzzleSlugs,
  quixoticSubpuzzleDataBySlug,
} from "../frontend/puzzles/quixotic-shoe";
import { generateSlugToSlotMap } from "../huntdata";
import { type Hunt } from "../huntdata/types";
import { fixData } from "../utils/fixData";
import { fixTimestamp } from "../utils/fixTimestamp";
import { omit } from "../utils/omit";
import {
  activityLog,
  type Mutator,
  puzzleStateLog,
  registerTeam,
  teamInteractionStateLog,
  teamRegistrationLog,
  getFermitSession,
  getFermitSessions,
  createFermitSession,
  updateFermitSession,
  getFermitRegistrations,
  createFermitRegistration,
  deleteFermitRegistration,
  updateFermitRegistration,
  getFermitAnswers,
  saveFermitAnswers,
} from "./data";
import dataContractImplementation from "./dataContractImplementation";
import {
  changeTeamDeactivation,
  changeTeamPassword,
  cleanupActivityLogEntryFromDB,
  cleanupTeamRegistrationLogEntryFromDB,
  cleanupPuzzleStateLogEntryFromDB,
  getCurrentTeamName,
  cleanupTeamInteractionStateLogEntryFromDB,
  getTeamInteractionStateLog,
  getLastTeamInteractionStateLogEntry,
  appendTeamInteractionStateLog,
} from "./db";
import { confirmationEmailTemplate, type Mailer } from "./email";
import formatActivityLogEntryForApi from "./formatActivityLogEntryForApi";
import {
  formatTeamHuntState,
  TeamStateIntermediate,
  TeamInfoIntermediate,
  PuzzleStateIntermediate,
} from "./logic";
import { type RedisClient } from "./redis";

const ADMIN_USER_ID = -1;
const FRONTEND_USER_ID = -2;

type PuzzleState = ServerInferResponseBody<
  typeof publicContract.getPuzzleState,
  200
>;

type SubpuzzleState = ServerInferResponseBody<
  typeof publicContract.submitSubpuzzleGuess,
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
  const teamJwtFromRequest = ExtractJwt.fromExtractors([
    cookieExtractor,
    ExtractJwt.fromAuthHeaderAsBearerToken(),
  ]);
  passport.use(
    "teamJwt",
    new JwtStrategy(
      {
        jwtFromRequest: teamJwtFromRequest,
        secretOrKey: jwtPublicKey,
        //issuer: 'mitmh2025.com',
        //audience: 'mitmh2025.com',
        passReqToCallback: true,
      },
      function (req: Request, jwtPayload: HuntJWTPayload, done) {
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
        const teamJwt = teamJwtFromRequest(req) ?? undefined;
        done(null, jwtPayload.team_id, {
          sessId: jwtPayload.sess_id,
          adminUser: jwtPayload.adminUser,
          teamJwt,
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
          permissionAdmin: true,
          permissionOps: true,
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
  mediaBaseUrl,
  knex,
  hunt,
  redisClient,
  mailer,
}: {
  jwtSecret: string | Buffer;
  jwksUri?: string;
  frontendApiSecret: string;
  dataApiSecret: string;
  mediaBaseUrl: string;
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
    const [team_state] = await activityLog.getCachedReducers(
      knex,
      redisClient,
      team_id,
      {
        redisKey: "team_state_intermediate",
        hydrate: (redisObj) => new TeamStateIntermediate(hunt, redisObj ?? {}),
      },
    );
    return team_state;
  };
  const getTeamState = async (req: Request, team_id: number) => {
    const [team_state, [team_info]] = await Promise.all([
      getTeamStateIntermediate(team_id),
      teamRegistrationLog.getCachedReducers(knex, redisClient, team_id, {
        redisKey: "team_info_intermediate",
        hydrate: (redisObj) => new TeamInfoIntermediate(redisObj ?? {}),
      }),
    ]);

    const info = team_info.formatTeamInfoIfActive();

    if (info === undefined) {
      return {
        status: 404 as const,
        body: null,
      };
    }

    const teamJwt = req.authInfo?.teamJwt;
    const whepUrl =
      process.env.OVERRIDE_WHEP_URL ??
      `${mediaBaseUrl}/teams/${team_id}/radio/whep${teamJwt ? `?jwt=${teamJwt}` : ""}`;
    return {
      status: 200 as const,
      body: {
        teamId: team_id,
        info,
        state: formatTeamHuntState(hunt, team_state),
        whepUrl,
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

  const formatSubpuzzleState = (
    slug: string,
    parent_slug: string,
    state_log: PuzzleStateLogEntry[],
  ) => {
    const guesses = state_log.filter(
      (e) =>
        e.data.type === "subpuzzle_guess_submitted" &&
        e.slug === parent_slug &&
        e.data.subpuzzle_slug === slug,
    );
    const correct_answers = guesses
      .filter((e) => e.data.status === "correct")
      .map((e) => e.data.canonical_input)
      .sort();
    const result: SubpuzzleState = {
      guesses: guesses.map(
        ({ data: { canonical_input, status, response }, id, timestamp }) => ({
          id: id,
          canonical_input: canonical_input as string,
          status: status as GuessStatus,
          response: response as string,
          timestamp: timestamp.toISOString(),
        }),
      ),
      ...(correct_answers.length > 0
        ? { answer: correct_answers.join(", ") }
        : {}),
    };
    return result;
  };

  const formatPuzzleState = (
    slug: string,
    team_state: TeamStateIntermediate,
    puzzle_state: PuzzleStateIntermediate,
  ) => {
    // Look up the slot for this slug.  If the slot does not exist in the hunt, we do not provide a
    // puzzle state for it.
    const slotEntry = slugToSlotMap.get(slug);
    if (!slotEntry) {
      return undefined;
    }

    // The slot entry contains the round slug for the round that canonically contains this puzzle slug.
    let round = slotEntry.roundSlug;

    const round_unlocked = team_state.rounds_unlocked.has(round);
    // TODO: If the round to which the slug belongs is not unlocked, we mark it as in the "stray_leads" round.
    if (!round_unlocked) {
      round = "stray_leads"; // TODO: configurable?
    }

    // The puzzle must be either unlockable or unlocked.
    if (
      !team_state.puzzles_unlockable.has(slug) &&
      !team_state.puzzles_unlocked.has(slug)
    ) {
      return undefined;
    }

    const locked: "locked" | "unlockable" | "unlocked" =
      team_state.puzzles_unlocked.has(slug)
        ? "unlocked"
        : team_state.puzzles_unlockable.has(slug)
          ? "unlockable"
          : "locked";

    const correct_answers = puzzle_state.guesses
      .filter((e) => e.data.status === "correct")
      .map((e) => e.data.canonical_input)
      .sort();

    const result: PuzzleState = {
      epoch: puzzle_state.epoch,
      round,
      locked,
      guesses: puzzle_state.guesses.map(
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
      hints: puzzle_state.hints.map((hint) => {
        if (hint.type === "puzzle_hint_requested") {
          return {
            id: hint.id,
            timestamp: hint.timestamp.toISOString(),
            type: "puzzle_hint_requested",
            data: hint.data,
          };
        } else {
          return {
            id: hint.id,
            timestamp: hint.timestamp.toISOString(),
            type: "puzzle_hint_responded",
            data: {
              request_id: hint.data.request_id,
              response: sanitizeHtml(hint.data.response),
            },
          };
        }
      }),
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
    const [teamState, puzzleState] = await activityLog.getCachedReducers(
      knex,
      redisClient,
      team_id,
      {
        hydrate: (initial) => new TeamStateIntermediate(hunt, initial ?? {}),
        redisKey: TeamStateIntermediate.redisKey,
      },
      {
        hydrate: (initial) => new PuzzleStateIntermediate(slug, initial ?? {}),
        redisKey: PuzzleStateIntermediate.redisKey(slug),
      },
    );
    return formatPuzzleState(slug, teamState, puzzleState);
  };

  const getSubpuzzleState = async (
    team_id: number,
    slug: string,
    knex: Knex,
  ): Promise<SubpuzzleState | undefined> => {
    const subpuzzle = SUBPUZZLES[slug];
    if (!subpuzzle) {
      return undefined;
    }
    return formatSubpuzzleState(
      slug,
      subpuzzle.parent_slug,
      (await puzzleStateLog.getCachedLog(knex, redisClient, team_id)).entries,
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
                    path: `~^teams/${team.id}/`,
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
          return await getTeamState(req, team_id);
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
      getSubpuzzleState: {
        middleware: [authMiddleware],
        handler: async ({ params: { slug }, req }) => {
          const team_id = req.user as number;
          const state = await getSubpuzzleState(team_id, slug, knex);
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

          const defaultPrize = slot.slot.is_meta ? 0 : 1;
          const prize = slot.slot.prize ?? defaultPrize;
          const strongCurrencyPrize = slot.slot.strong_currency_prize ?? 0;

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

          const { result, teamStates, logEntries } =
            await activityLog.executeMutation(
              hunt,
              team_id,
              redisClient,
              knex,
              async function (_, mutator) {
                const teamState = mutator.getTeamState(hunt, team_id);
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

                // Check if this puzzle has already been solved by this team;
                // short-circuit without mutating if so.
                const alreadySolved =
                  puzzle_log.find((e) => e.type === "puzzle_solved") ?? false;
                if (alreadySolved) {
                  return { status: 200 as const };
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
                    const hasGottenRewardFromCannedResponse = puzzle_log.some(
                      (e) => e.type === "puzzle_partially_solved",
                    );

                    await mutator.appendLog({
                      team_id,
                      slug,
                      type: "puzzle_solved",
                      currency_delta: hasGottenRewardFromCannedResponse
                        ? 0
                        : prize,
                      strong_currency_delta: strongCurrencyPrize,
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
              /* eslint-disable @typescript-eslint/no-non-null-assertion --
               * We know the puzzle state exists because we checked the db above. */
              body: formatPuzzleState(
                slug,
                teamStates[team_id]!,
                logEntries.reduce(
                  (acc, entry) => acc.reduce(entry),
                  new PuzzleStateIntermediate(slug),
                ),
              )!,
              /* eslint-enable @typescript-eslint/no-non-null-assertion -- done */
            };
          }
          return result;
        },
      },
      submitHintRequest: {
        middleware: [authMiddleware],
        handler: async ({ params: { slug }, body: { request }, req }) => {
          const team_id = req.user as number;
          const slot = slugToSlotMap.get(slug);
          if (slot === undefined) {
            // Puzzle does not exist
            return {
              status: 404,
              body: null,
            };
          }

          const { result, teamStates, logEntries } =
            await activityLog.executeMutation(
              hunt,
              team_id,
              redisClient,
              knex,
              async function (_, mutator) {
                const teamState = mutator.getTeamState(hunt, team_id);
                if (!teamState.puzzles_unlocked.has(slug)) {
                  return {
                    status: 404 as const,
                    body: null,
                  };
                }

                if (teamState.puzzles_solved.has(slug)) {
                  return {
                    status: 404 as const,
                    body: null,
                  };
                }

                if (teamState.outstanding_hint_requests.size > 0) {
                  return {
                    status: 409 as const,
                    body: null,
                  };
                }

                const hintsUnlockedAt =
                  teamState.team_hints_unlocked_timestamp.get(slug);
                if (
                  !hintsUnlockedAt ||
                  hintsUnlockedAt.getTime() > Date.now()
                ) {
                  return {
                    status: 404 as const,
                    body: null,
                  };
                }

                await mutator.appendLog({
                  team_id,
                  slug,
                  type: "puzzle_hint_requested",
                  data: {
                    request,
                  },
                });

                return { status: 200 as const };
              },
            );
          if (result.status === 200) {
            return {
              status: 200 as const,
              /* eslint-disable @typescript-eslint/no-non-null-assertion --
               * We know the puzzle state exists because we checked the db above. */
              body: formatPuzzleState(
                slug,
                teamStates[team_id]!,
                logEntries.reduce(
                  (acc, entry) => acc.reduce(entry),
                  new PuzzleStateIntermediate(slug),
                ),
              )!,
              /* eslint-enable @typescript-eslint/no-non-null-assertion -- done */
            };
          }
          return result;
        },
      },
      submitSubpuzzleGuess: {
        middleware: [authMiddleware],
        handler: async ({ params: { slug }, body: { guess }, req }) => {
          const puzzle = SUBPUZZLES[slug];
          if (!puzzle || !puzzle.answer) {
            // If a subpuzzle slug does not exist or the subpuzzle does not have an answer,
            // you should not be able to submit guesses for it.
            return {
              status: 404,
              body: null,
            };
          }
          const parent_slug = puzzle.parent_slug;
          const slot = slugToSlotMap.get(parent_slug);
          if (slot === undefined) {
            // If a subpuzzle's parent is not assigned to a slot in the hunt, you should
            // not be able to submit guesses to it nor receive prizes for correct answers,
            // even if the subpuzzle slug happens to be typeset/exist.
            return {
              status: 404,
              body: null,
            };
          }

          let canonical_input = canonicalizeInput(guess);
          const correct_answer = [puzzle.answer].find(
            (answer) => canonicalizeInput(answer) === canonical_input,
          );
          const team_id = req.user as number;
          const { result, logEntries } = await puzzleStateLog.executeMutation(
            team_id,
            redisClient,
            knex,
            async function (_, mutator) {
              const puzzle_log = mutator.log.filter(
                (e) => e.slug === parent_slug && e.data.subpuzzle_slug === slug,
              );

              // Basic rate-limiting: reject guess if more than n incorrect submissions in preceding
              // n^2 minutes "correct" and "other" guesses do not count towards rate-limits.
              // We allow an activity log entry type of "rate_limits_reset" on a puzzle to reset the
              // rate-limit -- we will simply not consider any guesses that occurred earlier than that reset entry
              // for the purposes of rate-limiting.
              const last_reset_time_record = puzzle_log.findLast(
                (e) => e.data.type === "rate_limits_reset",
              );
              const last_reset_time = last_reset_time_record?.timestamp;
              const previous_guesses = puzzle_log.filter(
                (e) =>
                  e.data.type === "subpuzzle_guess_submitted" &&
                  e.data.subpuzzle_slug === slug,
              );
              const previous_guess_times = previous_guesses
                .filter((e) => e.data.status === "incorrect")
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

              // Check if this subpuzzle has already been solved by this team; short-circuit without mutating if so.
              const alreadySolved =
                puzzle_log.find((e) => e.data.type === "subpuzzle_solved") ??
                false;
              if (alreadySolved) {
                return { status: 200 as const };
              }

              // Determine our disposition on this submission.
              let responseText = "Incorrect";
              let status: GuessStatus = "incorrect";
              if (correct_answer) {
                canonical_input = correct_answer;
                responseText = "Correct!";
                status = "correct";
              }

              // Check whether the same guess has already been submitted
              // for this slug.
              const isDuplicateGuess = previous_guesses.some(
                (e) => e.data.canonical_input === canonical_input,
              );
              if (!isDuplicateGuess) {
                await mutator.appendLog({
                  team_id,
                  slug: parent_slug,
                  data: {
                    type: "subpuzzle_guess_submitted",
                    subpuzzle_slug: slug,
                    canonical_input,
                    status,
                    response: responseText,
                  },
                });
                if (correct_answer) {
                  // It was right and the puzzle is now solved.
                  await mutator.appendLog({
                    team_id,
                    slug: parent_slug,
                    data: {
                      type: "subpuzzle_solved",
                      subpuzzle_slug: slug,
                      answer: canonical_input,
                    },
                  });

                  // Special case. If we have solved all the quixotic-shoe subpuzzles,
                  // push their colors to the puzzle state log.
                  if (
                    parent_slug === "and_now_a_puzzling_word_from_our_sponsors"
                  ) {
                    const quixotic_subpuzzle_slugs = Object.keys(
                      quixoticSubpuzzleDataBySlug,
                    );
                    const quixotic_subpuzzle_slugs_set = new Set(
                      quixotic_subpuzzle_slugs,
                    );
                    const quixotic_solve_logs = mutator.log.filter(
                      (e) =>
                        "slug" in e &&
                        e.slug === parent_slug &&
                        quixotic_subpuzzle_slugs_set.has(
                          e.data.subpuzzle_slug as string,
                        ) &&
                        e.data.type === "subpuzzle_solved",
                    );
                    const solved_quixotic_slugs = new Set(
                      quixotic_solve_logs.map((e) => e.data.subpuzzle_slug),
                    );
                    if (
                      quixotic_subpuzzle_slugs.every((slug) =>
                        solved_quixotic_slugs.has(slug),
                      )
                    ) {
                      const promises = quixotic_subpuzzle_slugs.map((slug) => {
                        return mutator.appendLog({
                          team_id,
                          slug: parent_slug,
                          data: {
                            type: "all_subpuzzles_solved",
                            subpuzzle_slug: slug,
                            ...quixoticSubpuzzleDataBySlug[slug],
                          },
                        });
                      });
                      await Promise.all(promises);
                    }
                  }
                }
              }
              return { status: 200 as const };
            },
          );
          if (result.status === 200) {
            const guesses = logEntries.filter(
              (e) =>
                e.data.type === "subpuzzle_guess_submitted" &&
                e.slug === parent_slug &&
                e.data.subpuzzle_slug === slug,
            );
            const correct_answers = guesses
              .filter((e) => e.data.status === "correct")
              .map((e) => e.data.canonical_input)
              .sort();

            // Special case. Unlock main quixotic-shoe puzzle when its subpuzzles are solved.
            const gateBySlug: Record<string, string> = {
              hellfresh: "ptg09",
              betteroprah: "ptg10",
              hardlysafe: "ptg11",
              draughtqueens: "ptg12",
              townsquarespace: "ptg13",
            };
            if (correct_answers.length > 0 && slug in gateBySlug) {
              // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- we checked membership just above
              const gate = gateBySlug[slug]!;
              await activityLog.executeMutation(
                hunt,
                team_id,
                redisClient,
                knex,
                async (_, mutator) => {
                  const existing = mutator.log.some(
                    (e) =>
                      (e.team_id === team_id || e.team_id === undefined) &&
                      e.type === "gate_completed" &&
                      e.slug === gate,
                  );
                  if (!existing) {
                    await mutator.appendLog({
                      team_id,
                      type: "gate_completed",
                      slug: gate,
                    });
                  }
                },
              );
            }

            const subpuzzleState: Omit<PuzzleState, "epoch"> = {
              round: slot.roundSlug,
              guesses: guesses.map(
                ({
                  data: { canonical_input, status, response },
                  id,
                  timestamp,
                }) => ({
                  id: id,
                  canonical_input: canonical_input as string,
                  status: status as GuessStatus,
                  response: response as string,
                  timestamp: timestamp.toISOString(),
                }),
              ),
              ...(correct_answers.length > 0
                ? { answer: correct_answers.join(", ") }
                : {}),
            };
            return {
              status: 200 as const,
              body: subpuzzleState,
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
          const { result, teamStates, logEntries } =
            await activityLog.executeMutation(
              hunt,
              team_id,
              redisClient,
              knex,
              async function (trx, mutator) {
                // Verify puzzle is currently unlockable.
                const data = mutator.getTeamState(hunt, team_id);
                const unlock_cost = slot.unlock_cost;

                // Special case for blank-rose. One of nine gates must be unlocked
                // for a team upon its unlock, in a round-robin pattern.
                if (slug === "📑🍝") {
                  const gates = [
                    "mdg03",
                    "mdg04",
                    "mdg05",
                    "mdg06",
                    "mdg07",
                    "mdg08",
                    "mdg09",
                    "mdg10",
                    "mdg11",
                  ];
                  // How many of these gates have been unlocked?
                  const gateUnlockResult = (await trx("activity_log")
                    .count("id", { as: "gateCount" })
                    .where("type", "=", "gate_completed")
                    .whereIn("slug", gates)
                    .first()) ?? { gateCount: 0 };
                  // Postgres helpfully returns everything as a string. Get a number if we don't already have one.
                  const gateCount =
                    typeof gateUnlockResult.gateCount === "string"
                      ? parseInt(gateUnlockResult.gateCount, 10)
                      : gateUnlockResult.gateCount;
                  // Open the gates in order as teams unlock this puzzle, defaulting
                  // to the first gate for the first team to unlock the puzzle.
                  const gateSlug = gates[gateCount % gates.length] ?? "mdg03";
                  await mutator.appendLog({
                    team_id,
                    type: "gate_completed",
                    slug: gateSlug,
                  });
                }

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
              /* eslint-disable @typescript-eslint/no-non-null-assertion --
               * We know the puzzle state exists because we checked the db above. */
              body: formatPuzzleState(
                slug,
                teamStates[team_id]!,
                logEntries.reduce(
                  (acc, entry) => acc.reduce(entry),
                  new PuzzleStateIntermediate(slug),
                ),
              )!,
              /* eslint-enable @typescript-eslint/no-non-null-assertion -- done */
            };
          }
          return {
            status: 404 as const,
            body: null,
          };
        },
      },
      buyPuzzleAnswer: {
        middleware: [authMiddleware],
        handler: async ({ params: { slug }, req }) => {
          const team_id = req.user as number;

          const slotAndRound = slugToSlotMap.get(slug);
          if (!slotAndRound) {
            return {
              status: 404 as const,
              body: null,
            };
          }

          const { slot, roundSlug } = slotAndRound;

          if (
            slot.is_meta === true ||
            slot.is_supermeta === true ||
            roundSlug === "events"
          ) {
            return {
              status: 404 as const,
              body: null,
            };
          }

          const puzzle = PUZZLES[slug];
          if (!puzzle) {
            return {
              status: 404 as const,
              body: null,
            };
          }

          const { result } = await activityLog.executeMutation(
            hunt,
            team_id,
            redisClient,
            knex,
            async function (_, mutator) {
              const data = mutator.getTeamState(hunt, team_id);
              if (data.available_strong_currency < 1) {
                return { error: "INSUFFICIENT_STRONG_CURRENCY" as const };
              }

              if (!data.puzzles_unlocked.has(slug)) {
                return { error: "PUZZLE_NOT_UNLOCKED" as const };
              }

              if (data.puzzles_solved.has(slug)) {
                return { error: "PUZZLE_ALREADY_SOLVED" as const };
              }

              const hasGottenRewardFromCannedResponse = mutator.log.some(
                (e) =>
                  e.type === "puzzle_partially_solved" &&
                  e.slug === slug &&
                  e.team_id === team_id,
              );

              const answer = puzzle.answer;

              await mutator.appendLog({
                team_id,
                type: "puzzle_answer_bought",
                slug,
                strong_currency_delta: -1,
                data: {
                  answer,
                },
              });

              await mutator.appendLog({
                team_id,
                slug,
                type: "puzzle_guess_submitted",
                data: {
                  canonical_input: answer,
                  status: "correct",
                  response: "Correct!",
                },
              });

              await mutator.appendLog({
                team_id,
                slug,
                type: "puzzle_solved",
                // We always grant the slot prize here, even for puzzles that
                // normally grant the prize for a partial answer, since the team
                // won't end up submitting the partial answer and we don't want
                // to deny them the prize.
                currency_delta: hasGottenRewardFromCannedResponse
                  ? 0
                  : slot.prize ?? 1,
                data: {
                  answer,
                },
              });

              return {};
            },
          );

          if (result.error) {
            return {
              status: 400 as const,
              body: {
                code: result.error,
              },
            };
          }

          return {
            status: 200 as const,
            body: {
              answer: puzzle.answer,
            },
          };
        },
      },
      exchangeStrongCurrency: {
        middleware: [authMiddleware],
        handler: async ({ req }) => {
          const EXCHANGE_RATE = 3;
          const team_id = req.user as number;
          const { result } = await activityLog.executeMutation(
            hunt,
            team_id,
            redisClient,
            knex,
            async (_, mutator) => {
              const data = mutator.getTeamState(hunt, team_id);
              if (data.available_currency < 1) {
                return { error: "INSUFFICIENT_STRONG_CURRENCY" as const };
              }

              await mutator.appendLog({
                team_id,
                type: "strong_currency_exchanged",
                currency_delta: EXCHANGE_RATE,
                strong_currency_delta: -1,
              });

              return {};
            },
          );

          if (result.error) {
            return {
              status: 400 as const,
              body: {
                code: result.error,
              },
            };
          }

          return {
            status: 200 as const,
            body: {
              currency: EXCHANGE_RATE,
            },
          };
        },
      },
      castVote: {
        middleware: [authMiddleware],
        handler: async ({
          params: { slug, pollId },
          body: { choice },
          req,
        }) => {
          const team_id = req.user as number;
          const sess_id = req.authInfo?.sessId;
          if (!sess_id) {
            // Must have a session id
            return {
              status: 400 as const,
              body: null,
            };
          }

          if (!redisClient) {
            console.error(
              "Cannot implement castVote without valid redis connection",
            );
            return {
              status: 500 as const,
              body: null,
            };
          }

          // TODO: maybe do all this from a redis script instead to avoid any chance of
          // set/read/publish interleavings confusing order?  But honestly it doesn't really matter
          const redisKey = `/team/${team_id}/polls/${slug}/${pollId}`;
          // Update our vote
          await redisClient.hSet(redisKey, sess_id, choice);
          // Read back the votes
          const votes = await redisClient.hGetAll(redisKey);
          // Count votes
          const results = countVotes(votes);
          // Publish updated tally
          await redisClient.publish(redisKey, JSON.stringify(votes));

          return {
            status: 200 as const,
            body: results,
          };
        },
      },
    },
    admin: {
      getTeamState: {
        middleware: [adminAuthMiddleware],
        handler: async ({ req, params: { teamId } }) => {
          return await getTeamState(req, parseInt(teamId, 10));
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
            const result: {
              addresses: Address[];
              success?: boolean;
            } = {
              addresses,
            };
            if (!dryRun) {
              try {
                await mailer.sendEmail({
                  to: addresses,
                  messageStream: "hunt-announcements",
                  templateAlias: body.templateAlias,
                  templateModel: {
                    teamName: registration.name,
                  },
                });
                result.success = true;
              } catch (err: unknown) {
                console.log("failed sending mail", addresses, err);
                result.success = false;
              }
            }
            messages.push(result);
          }
          return {
            status: 200,
            body: {
              messages,
            },
          };
        },
      },
      sendPushNotification: {
        middleware: [adminAuthMiddleware, requireAdminPermission],
        handler: async ({ body: { message }, req }) => {
          const { result } = await activityLog.executeMutation(
            hunt,
            undefined,
            redisClient,
            knex,
            async function (_, mutator) {
              return [
                await mutator.appendLog({
                  type: "teams_notified",
                  data: {
                    message,
                  },
                  internal_data: {
                    operator: req.authInfo?.adminUser,
                  },
                }),
              ];
            },
          );
          return formatMutationResultForAdminApi(result);
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
      grantStrongCurrency: {
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
                    type: "strong_currency_adjusted",
                    strong_currency_delta: amount,
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
                      type: "strong_currency_adjusted",
                      strong_currency_delta: amount,
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
        middleware: [adminAuthMiddleware],
        handler: async ({ params: { slug }, body: { teamIds }, req }) => {
          const adminPermissionRequired = ![
            "in_communicado_tonight",
            "control_room",
            "estimation_dot_jpg",
          ].includes(slug);

          if (adminPermissionRequired && !req.authInfo?.permissionAdmin) {
            return {
              status: 403 as const,
              body: null,
            };
          }

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

              // Special case for blank-rose. One of the nine gates must be
              // unlocked for a team upon unlocking this puzzle, in a round-
              // robin fashion.
              if (slug === "📑🍝") {
                const gates = [
                  "mdg03",
                  "mdg04",
                  "mdg05",
                  "mdg06",
                  "mdg07",
                  "mdg08",
                  "mdg09",
                  "mdg10",
                  "mdg11",
                ];
                // How many of these gates have been unlocked?
                const gateUnlockResult = (await _trx("activity_log")
                  .count("id", { as: "gateCount" })
                  .where("type", "=", "gate_completed")
                  .whereIn("slug", gates)
                  .first()) ?? { gateCount: 0 };
                // Postgres helpfully returns everything as a string. Get a number if we don't already have one.
                const gateCount =
                  typeof gateUnlockResult.gateCount === "string"
                    ? parseInt(gateUnlockResult.gateCount, 10)
                    : gateUnlockResult.gateCount;
                // Iterate through the gates in order.
                let counter = gateCount;
                const teamsAndGates: { teamId: number; slug: string }[] = [];
                for (const teamId of teamIdsToUnlock) {
                  // If for some reason we're bulk unlocking despite none of these gates being unlocked yet,
                  // default to the first gate.
                  const slugForTeam = gates[counter % gates.length] ?? "mdg03";
                  const teamAndGate = { teamId, slug: slugForTeam };
                  teamsAndGates.push(teamAndGate);
                  counter++;
                }
                const promises = [];
                for (const { teamId, slug } of teamsAndGates) {
                  promises.push(
                    mutator.appendLog({
                      team_id: teamId,
                      type: "gate_completed",
                      slug,
                    }),
                  );
                }
                await Promise.all(promises);
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
                    internal_data: {
                      operator: req.authInfo?.adminUser,
                    },
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
                    internal_data: {
                      operator: req.authInfo?.adminUser,
                    },
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
      issueErratum: {
        middleware: [adminAuthMiddleware],
        handler: async ({ params: { slug }, req }) => {
          const { result } = await activityLog.executeMutation(
            hunt,
            undefined,
            redisClient,
            knex,
            async (_trx, mutator) => {
              // Check if this team has already unlocked this puzzle
              let teamIdsToNotify = new Set<number>();

              for (const entry of mutator.log) {
                if (entry.type === "puzzle_unlocked" && entry.slug === slug) {
                  if (entry.team_id === undefined) {
                    // This puzzle has been unlocked for all teams by admin.
                    teamIdsToNotify = new Set(mutator.allTeams);
                  } else {
                    teamIdsToNotify.add(entry.team_id);
                  }
                }
              }

              if (teamIdsToNotify.size === mutator.allTeams.size) {
                return [
                  await mutator.appendLog({
                    type: "erratum_issued",
                    slug,
                    internal_data: {
                      operator: req.authInfo?.adminUser,
                    },
                  }),
                ];
              }

              const newEntries: (InternalActivityLogEntry | undefined)[] = [];
              for (const team_id of teamIdsToNotify) {
                newEntries.push(
                  await mutator.appendLog({
                    team_id,
                    type: "erratum_issued",
                    slug,
                    internal_data: {
                      operator: req.authInfo?.adminUser,
                    },
                  }),
                );
              }
              return newEntries;
            },
          );
          return formatMutationResultForAdminApi(result);
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
      markGateSatistfied: {
        middleware: [adminAuthMiddleware, requireAdminPermission],
        handler: async ({ params: { gateId }, body: { teamIds }, req }) => {
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
              // Check if already satisfied
              const teamIdsToSatisfy = new Set(
                teamIds === "all" ? mutator.allTeams : teamIds,
              );

              for (const entry of mutator.log) {
                if (entry.type === "gate_completed" && entry.slug === gateId) {
                  if (entry.team_id === undefined) {
                    // already unlocked for all teams
                    return [];
                  }

                  teamIdsToSatisfy.delete(entry.team_id);
                }
              }

              if (
                teamIds === "all" &&
                teamIdsToSatisfy.size === mutator.allTeams.size
              ) {
                // we are unlocking for all teams and no team has the puzzle locked
                return [
                  await mutator.appendLog({
                    type: "gate_completed",
                    slug: gateId,
                    internal_data: {
                      operator: req.authInfo?.adminUser,
                    },
                  }),
                ];
              }

              // need to unlock for specific teams
              const newEntries: (InternalActivityLogEntry | undefined)[] = [];
              for (const team_id of teamIdsToSatisfy) {
                newEntries.push(
                  await mutator.appendLog({
                    team_id,
                    type: "gate_completed",
                    slug: gateId,
                    internal_data: {
                      operator: req.authInfo?.adminUser,
                    },
                  }),
                );
              }

              return newEntries;
            },
          );

          return formatMutationResultForAdminApi(result);
        },
      },
      createFermitSession: {
        middleware: [adminAuthMiddleware],
        handler: async ({ body: { title } }) => {
          // generate random set of questions
          // requirements:
          // * pick 17 distinct questions;
          // * 4 of them must be geoguessr type
          // * geoguessrs cannot be consecutive, first, or last
          // * don't repeat categories

          function shuffle<T>(arr: T[]): T[] {
            return arr
              .map((v) => ({ v, sort: Math.random() }))
              .sort((a, b) => a.sort - b.sort)
              .map(({ v }) => v);
          }

          const normalQuestions: FermitQuestion[] = [];
          const geoguessrQuestions: FermitQuestion[] = [];
          ALL_QUESTIONS.forEach((q) => {
            (q.geoguessr === null ? normalQuestions : geoguessrQuestions).push(
              q,
            );
          });

          let tries = 0;
          let valid = false;
          // try repeatedly until a working question set comes up
          // limit to 200 iterations to prevent infinite looping
          while (tries < 200) {
            const shuffledN = shuffle(normalQuestions);
            const shuffledG = shuffle(geoguessrQuestions);
            const questions = shuffle([
              ...shuffledN.slice(0, 13),
              ...shuffledG.slice(0, 4),
            ]);
            valid = true;
            tries++;

            // is a geoguessr question first or last?
            if (questions[0]?.geoguessr ?? questions[16]?.geoguessr) {
              valid = false;
              //console.log("invalid: first/last question is geoguessr");
            }

            // are two consecutive questions geoguessrs?
            for (let i = 0; i < 16; i++) {
              if (questions[i]?.geoguessr && questions[i + 1]?.geoguessr) {
                valid = false;
                //console.log("invalid: consecutive geoguessrs");
              }
            }

            // are any categories repeated?
            const categories = new Set<string>();
            questions.forEach((q: FermitQuestion) => {
              for (const cat of q.categories) {
                if (categories.has(cat)) {
                  valid = false;
                  //console.log("invalid: repeated category " + cat);
                } else {
                  categories.add(cat);
                }
              }
            });

            const ids = questions.map((q) => q.id);

            if (valid) {
              console.log(`got an acceptable list in ${tries} tries`);
              const newSession = await createFermitSession(title, ids, knex);
              if (newSession) {
                return Promise.resolve({
                  status: 200 as const,
                  body: newSession,
                });
              } else {
                return Promise.resolve({
                  status: 500 as const,
                  body: null,
                });
              }
            } else {
              /*
              console.log(
                `question list ${ids} failed validation, regenerating`,
              );
               */
            }
          }
          console.log("ran out of attempts");
          return Promise.resolve({
            status: 500 as const,
            body: null,
          });
        },
      },
      updateFermitSession: {
        middleware: [adminAuthMiddleware],
        handler: async ({ params: { sessionId }, body }) => {
          if (sessionId === body.id.toString()) {
            const newSession = await updateFermitSession(body, knex);

            if (newSession) {
              if (body.status === "in_progress") {
                // when transitioning from "not_started" to "in_progress",
                // mark any team not checked in as "no_show"
                const promises: Promise<FermitRegistration | undefined>[] = [];
                const regs = await getFermitRegistrations(
                  parseInt(sessionId, 10),
                  knex,
                );
                regs.forEach((reg) => {
                  if (reg.status === "not_checked_in") {
                    promises.push(
                      updateFermitRegistration(
                        reg.sessionId,
                        reg.teamId,
                        "no_show",
                        knex,
                      ),
                    );
                  }
                });
                const updatedRegs = await Promise.all(promises);

                // TODO: what should behavior be if a no-show update fails?
                // does this whole thing need to be somehow transactionized?

                newSession.teams = newSession.teams.map((t) => {
                  const newReg = updatedRegs.find((r) => r?.teamId === t.id);
                  if (newReg) {
                    return {
                      id: t.id,
                      status: newReg.status,
                    };
                  } else {
                    return t;
                  }
                });
              }
            }

            if (newSession) {
              return Promise.resolve({
                status: 200 as const,
                body: newSession,
              });
            }
          }
          return Promise.resolve({
            status: 500 as const,
            body: null,
          });
        },
      },
      completeFermitSession: {
        middleware: [adminAuthMiddleware],
        handler: async ({ params: { sessionId } }) => {
          // To close out a session, score each team then update the puzzle_state log
          const [session, answers] = await Promise.all([
            getFermitSession(parseInt(sessionId, 10), knex),
            getFermitAnswers(parseInt(sessionId, 10), knex),
          ]);

          if (!session) {
            return Promise.resolve({
              status: 404,
              body: null,
            });
          }
          if (session.status !== "in_progress") {
            return Promise.resolve({
              status: 400,
              body: null,
            });
          }

          const questions = session.questionIds.map((qid) =>
            ALL_QUESTIONS.find((q) => q.id === qid),
          );
          if (!questions.every((q) => q !== undefined)) {
            return Promise.resolve({
              status: 500,
              body: `Some questions could not be found for session ${sessionId}`,
            });
          }

          function scoreHelper(ranges: number[], value: number) {
            const n = ranges.findIndex((thresh) => value <= thresh);
            return n === -1 ? 0 : 5 - n;
          }

          // run the scoring methods on each, which may involve DB lookups
          const teamScores = await Promise.all(
            session.teams.map(async ({ id, status }) => {
              if (status !== "checked_in") {
                return { id: id, scores: null };
              }
              const scores: number[] = await Promise.all(
                questions.map(async (question, index) => {
                  if (!question) {
                    // this shouldn't happen?  just assume they bombed it
                    return 0;
                  }

                  const answerObj = answers.find(
                    (ans) =>
                      ans.sessionId.toString() === sessionId &&
                      ans.teamId === id &&
                      ans.questionIndex === index + 1,
                  );

                  if (!answerObj) {
                    return 0;
                  }

                  const answer = answerObj.answer;
                  if (answer === null) {
                    return 0;
                  }

                  const percentage =
                    100 * Math.abs(answer / question.answer - 1);
                  const difference = Math.abs(answer - question.answer);

                  // two questions need to be computed on the fly via the DB:
                  //  team_puzzle_solves needs to look up that team's total solve count
                  //  all_puzzle_submissions needs to look up the global submission count
                  if (question.scoringMethod === "percent") {
                    return scoreHelper([2, 5, 10, 20, 50], percentage);
                  } else if (question.scoringMethod === "12345") {
                    return scoreHelper([1, 2, 3, 4, 5], difference);
                  } else if (question.scoringMethod === "12468") {
                    return scoreHelper([1, 2, 4, 6, 8], difference);
                  } else if (question.scoringMethod.endsWith("double")) {
                    const base = parseInt(question.scoringMethod.slice(0, -6));
                    return scoreHelper(
                      [base, base * 2, base * 4, base * 8, base * 16],
                      difference,
                    );
                  } else if (question.scoringMethod === "raw") {
                    // "raw" means take the number as a score, but if out of bounds default to 0
                    // if not an integer floor it
                    if (answer < 0 || answer > 5) {
                      return 0;
                    }
                    return Math.floor(answer);
                  } else if (question.scoringMethod === "team_puzzle_solves") {
                    // count the number of "puzzle_solved" entries in this team's activity log
                    const count: number =
                      (
                        (await knex("activity_log")
                          .where({
                            team_id: id,
                            type: "puzzle_solved",
                          })
                          .count("* as ct")) as { ct: number }[]
                      )[0]?.ct ?? 0;
                    console.log(
                      `counted ${count} correct answers for team ${id}`,
                    );

                    // score based on % error
                    return scoreHelper(
                      [2, 5, 10, 20, 50],
                      100 * Math.abs(answer / count - 1),
                    );
                  } else if (question.scoringMethod === "all_submissions") {
                    const count: number =
                      (
                        (await knex("activity_log")
                          .where("type", "puzzle_guess_submitted")
                          .count("* as ct")) as { ct: number }[]
                      )[0]?.ct ?? 0;
                    console.log(`counted ${count} puzzle submissions in total`);
                    return scoreHelper(
                      [2, 5, 10, 20, 50],
                      100 * Math.abs(answer / count - 1),
                    );
                  } else {
                    console.log(
                      `got unknown scoring method: ${question.scoringMethod}`,
                    );
                    return 0;
                  }
                }),
              );

              return { id: id, scores: scores };
            }),
          );

          // (3) for each team, add to the team state for this puzzle
          for (const obj of teamScores) {
            const id: number = obj.id;
            const scores: number[] | null = obj.scores;
            if (scores === null) {
              continue;
            }

            console.log(id);
            console.log(scores);

            const cachedLog = await puzzleStateLog.getCachedLog(
              knex,
              redisClient,
              id,
            );
            console.log(cachedLog);

            const iteration = cachedLog.entries.length;
            const imageUrls = scores.map((score, index) => {
              return albumLookup[index]?.[iteration % 3]?.[score];
            });

            void (await puzzleStateLog.executeMutation(
              id,
              redisClient,
              knex,
              async (_, mutator) => {
                await mutator.appendLog({
                  team_id: id,
                  slug: "estimation_dot_jpg",
                  data: {
                    scores: scores,
                    sessionId: session.id,
                    iteration: iteration,
                    imageUrls: imageUrls,
                  },
                });
              },
            ));
          }

          // when all of this is done, set the status to complete
          const newSession = await updateFermitSession(
            {
              ...session,
              status: "complete",
            },
            knex,
          );

          if (!newSession) {
            return Promise.resolve({
              status: 500 as const,
              body: `Error closing out ${sessionId}, check DB carefully`,
            });
          } else {
            return Promise.resolve({
              status: 200 as const,
              body: newSession,
            });
          }
        },
      },
      getFermitSessions: {
        middleware: [adminAuthMiddleware],
        handler: async () => {
          return Promise.resolve({
            status: 200 as const,
            body: await getFermitSessions(knex),
          });
        },
      },
      getFermitAnswers: {
        middleware: [adminAuthMiddleware],
        handler: async ({ params: { sessionId } }) => {
          const answers = await getFermitAnswers(parseInt(sessionId, 10), knex);
          return Promise.resolve({
            status: 200 as const,
            body: answers,
          });
        },
      },
      saveFermitAnswers: {
        middleware: [adminAuthMiddleware],
        handler: async ({ params: { sessionId }, body }) => {
          const answers = body;
          const session = await getFermitSession(parseInt(sessionId, 10), knex);
          if (!session) {
            return Promise.resolve({
              status: 404 as const,
              body: null,
            });
          }
          if (session.status !== "in_progress") {
            return Promise.resolve({
              status: 400 as const,
              body: "Session status is not 'in_progress'",
            });
          }

          // TODO: filter the passed in answers to the sessionId for safety?
          //console.log(answers);
          const updateCount = await saveFermitAnswers(answers, knex);
          //console.log(`${updateCount} vs ${answers.length.toString()}`);

          return Promise.resolve({
            status: 200 as const,
            body: updateCount > 0,
          });
        },
      },
      createFermitRegistration: {
        middleware: [adminAuthMiddleware],
        handler: async ({ params: { sessionId, teamId } }) => {
          const result = await createFermitRegistration(
            parseInt(sessionId, 10),
            parseInt(teamId, 10),
            knex,
          );
          if (result) {
            return Promise.resolve({
              status: 200 as const,
              body: await getFermitRegistrations(parseInt(sessionId, 10), knex),
            });
          } else {
            // invalid request, session in wrong status
            return Promise.resolve({
              status: 400,
              body: null,
            });
          }
        },
      },
      deleteFermitRegistration: {
        middleware: [adminAuthMiddleware],
        handler: async ({ params: { sessionId, teamId } }) => {
          const result = await deleteFermitRegistration(
            parseInt(sessionId, 10),
            parseInt(teamId, 10),
            knex,
          );
          if (result) {
            return Promise.resolve({
              status: 200 as const,
              body: await getFermitRegistrations(parseInt(sessionId, 10), knex),
            });
          } else {
            // invalid request, session in wrong status
            return Promise.resolve({
              status: 400,
              body: null,
            });
          }
        },
      },
      updateFermitRegistration: {
        middleware: [adminAuthMiddleware],
        handler: async ({
          params: { sessionId, teamId },
          body: { status },
        }) => {
          await updateFermitRegistration(
            parseInt(sessionId, 10),
            parseInt(teamId, 10),
            status,
            knex,
          );
          return Promise.resolve({
            status: 200 as const,
            body: await getFermitRegistrations(parseInt(sessionId, 10), knex),
          });
        },
      },
      resetPuzzleRateLimit: {
        middleware: [adminAuthMiddleware, requireAdminPermission],
        handler: async ({ params: { slug }, body: { teamIds }, req }) => {
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
              if (teamIds === "all") {
                return [
                  await mutator.appendLog({
                    type: "rate_limits_reset",
                    slug: slug,
                    internal_data: {
                      operator: req.authInfo?.adminUser,
                    },
                  }),
                ];
              }

              const result: (InternalActivityLogEntry | undefined)[] = [];
              for (const team_id of teamIds) {
                result.push(
                  await mutator.appendLog({
                    team_id,
                    type: "rate_limits_reset",
                    slug: slug,
                    internal_data: {
                      operator: req.authInfo?.adminUser,
                    },
                  }),
                );
              }

              return result;
            },
          );

          return formatMutationResultForAdminApi(result);
        },
      },
      unlockHints: {
        middleware: [adminAuthMiddleware, requireAdminPermission],
        handler: async ({ body: { puzzleSlugs, minimumUnlockHours }, req }) => {
          const { result } = await activityLog.executeMutation(
            hunt,
            undefined,
            redisClient,
            knex,
            async (_trx, mutator) => {
              const results: (InternalActivityLogEntry | undefined)[] = [];
              for (const slug of puzzleSlugs) {
                // Check if hints have already been released for this puzzle.
                const alreadyReleased = mutator.log.some(
                  (e) =>
                    "slug" in e &&
                    e.slug === slug &&
                    e.type === "global_hints_unlocked",
                );
                if (alreadyReleased) {
                  continue;
                }

                results.push(
                  await mutator.appendLog({
                    type: "global_hints_unlocked",
                    slug: slug,
                    data: { minimum_unlock_hours: minimumUnlockHours },
                    internal_data: {
                      operator: req.authInfo?.adminUser,
                    },
                  }),
                );
              }
              return results;
            },
          );

          return formatMutationResultForAdminApi(result);
        },
      },
    },

    frontend: {
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
      getPuzzleMetadata: {
        middleware: [frontendAuthMiddleware],
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
                  code_name: definition.code_name,
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
      respondToHintRequest: {
        middleware: [frontendAuthMiddleware, requireAdminPermission],
        handler: ({
          params: { teamId, slug },
          body: { response, request_id, zammad_article_id },
        }) =>
          executeTeamStateHandler(teamId, async (_, mutator, team_id) => {
            if (
              mutator.log.some(
                (e) =>
                  e.type === "puzzle_hint_responded" &&
                  e.data.zammad_article_id === zammad_article_id,
              )
            ) {
              // This response is already in the log
              return false;
            }

            await mutator.appendLog({
              team_id,
              type: "puzzle_hint_responded",
              slug: slug,
              data: {
                response,
                request_id,
                zammad_article_id,
              },
            });

            return true;
          }),
      },
      startInteraction: {
        middleware: [frontendAuthMiddleware, requireAdminPermission],
        handler: async ({ params: { teamId, interactionId } }) => {
          const result = await executeTeamStateHandler(
            teamId,
            async (trx, mutator, team_id) => {
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

              const interaction = INTERACTIONS[interactionId];

              if (!is_started) {
                // TODO: if interaction is virtual, ensure that no other incomplete virtual
                // interaction was unlocked before this one (if one exists, it should be completed
                // before we let this one proceed)

                await mutator.appendLog({
                  team_id,
                  type: "interaction_started",
                  slug: interactionId,
                });
                // Also insert the initial node into team_interaction_states
                if (interaction?.type === "virtual") {
                  const { node, state } = (
                    interaction.handler as VirtualInteractionHandler<
                      object,
                      unknown,
                      string,
                      unknown
                    >
                  ).startState();
                  await appendTeamInteractionStateLog(
                    {
                      team_id,
                      slug: interactionId,
                      node,
                      // no predecessor, we're starting here!
                      graph_state: state,
                    },
                    trx,
                  );
                }
              }
              return true;
            },
          );
          if (result.status === 200 && redisClient) {
            // Also refresh the redis state for teamInteractionStateLog, since we also inserted into that DB table
            await teamInteractionStateLog.refreshRedisLog(redisClient, knex);
          }
          return result;
        },
      },
      advanceInteraction: {
        middleware: [frontendAuthMiddleware, requireAdminPermission],
        handler: async ({ params: { teamId, interactionId, fromNode } }) => {
          const team_id = parseInt(teamId, 10);
          const interaction = INTERACTIONS[interactionId];
          if (interaction?.type !== "virtual") {
            console.log(`${interactionId} is not a valid virtual interaction`);
            return {
              status: 404 as const,
              body: null,
            };
          }
          if (!redisClient) {
            return {
              status: 500 as const,
              body: "Cannot reliably advance interactions without a valid redis client",
            };
          }

          // We should do as much work as we safely can *before* opening the DB transaction.
          const node = interaction.handler.lookupNode(fromNode);
          if (!node) {
            console.log(
              `Interaction node ${fromNode} not known to interaction graph ${interactionId} (requested for ${teamId})`,
            );
            return {
              status: 404 as const,
              body: null,
            };
          }
          if ("finalState" in node) {
            console.log(
              `Cannot advance team ${teamId}'s interaction ${interactionId} past final state`,
            );
            return {
              status: 400 as const,
              body: { reason: "invalid-from-node" as const },
            };
          }

          // The vote closing is inherently racy.  Votes live in redis.  We can tally the raw
          // results before opening a DB transaction, so we're not holding the DB transaction open
          // while we talk to redis over the network some more.
          const maybeVoteCounts = await interaction.handler.voteCountsForNode(
            team_id,
            node,
            redisClient,
          );

          // Okay now we have to see if this is still the current node, and what the interaction
          // graph state for this team is at that node, which does require looking at the DB.

          const { result } = await teamInteractionStateLog.executeMutation(
            team_id,
            redisClient,
            knex,
            async (_, mutator) => {
              // Look up the most recent entry in the log for this interaction.
              const interactionLog = mutator.log.filter(
                (e) => e.slug === interactionId,
              );
              const latest = interactionLog.at(-1);
              if (!latest) {
                console.log(
                  `no latest node for team ${teamId} slug ${interactionId}`,
                );
                // No log?  Can't advance.
                return {
                  status: 400 as const,
                  body: { reason: "no-log" as const },
                };
              }
              if (latest.node !== fromNode) {
                // Interaction is not currently at fromNode.
                console.log(
                  `latest node is not fromNode: ${latest.node} vs ${fromNode}`,
                );
                return {
                  status: 400 as const,
                  body: { reason: "wrong-from-node" as const },
                };
              }
              const now = Date.now();
              const ts = fixTimestamp(latest.timestamp);
              const nodeEntered = ts.getTime();
              const advanceAfter = interaction.handler.advanceAfterTime(
                fromNode,
                nodeEntered,
              );
              if (advanceAfter === undefined) {
                return {
                  status: 500 as const,
                  body: `Unable to determine time at which to advance ${interactionId} for team ${teamId} from ${fromNode}`,
                };
              }
              if (now >= advanceAfter) {
                // Okay we can actually do the work now.

                // Compute the next node & next state
                const maybeNext = await interaction.handler.computeNext({
                  teamId: team_id,
                  currentNode: node,
                  state: fixData(latest.graph_state),
                  maybeVoteCounts,
                  redisClient,
                });
                if (!maybeNext) {
                  // We couldn't figure out where we go next.
                  return {
                    status: 500 as const,
                    body: `Unable to determine next node for team ${teamId} in interaction ${interactionId} at ${fromNode}`,
                  };
                }
                // I don't actually know how to parameterize these over the various flavors of interaction graph so
                // here we are casting things around
                const { nextNode, nextState } = maybeNext as {
                  nextNode: { id: string };
                  nextState: object;
                };
                await mutator.appendLog({
                  team_id,
                  slug: interactionId,
                  predecessor: fromNode,
                  node: nextNode.id,
                  graph_state: nextState,
                });
                return {
                  status: 200 as const,
                  body: {},
                };
              } else {
                return {
                  status: 400 as const,
                  body: { reason: "too-soon" as const },
                };
              }
            },
          );
          return result;
        },
      },
      completeInteraction: {
        middleware: [frontendAuthMiddleware, requireAdminPermission],
        handler: async ({ params: { teamId, interactionId } }) => {
          const interaction = INTERACTIONS[interactionId];
          if (!interaction) {
            return {
              status: 404 as const,
              body: null,
            };
          }

          return executeTeamStateHandler(
            teamId,
            async (trx, mutator, team_id) => {
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
              if (!is_unlocked) {
                return false;
              }

              if (!is_completed) {
                let interactionResult = "";
                if (interaction.type === "virtual") {
                  if (!is_started) {
                    return false;
                  }
                  // Then we need to compute the result from the team.  Get the last log entry that
                  // applies to this interaction; we expect it to be a final node.
                  const finalNode = await getLastTeamInteractionStateLogEntry(
                    team_id,
                    interactionId,
                    trx,
                  );
                  if (!finalNode) return false;
                  const result = interaction.handler.finalState({
                    nodeId: finalNode.node,
                    state: finalNode.graph_state,
                  });
                  if (result === undefined) {
                    // No final result recorded for this interaction in the DB yet.  Finish the interaction.
                    return false;
                  }
                  interactionResult = result;
                }

                await mutator.appendLog({
                  team_id,
                  type: "interaction_completed",
                  slug: interactionId,
                  data: {
                    result: interactionResult,
                  },
                });
              }
              return true;
            },
          );
        },
      },
      forceSkipInteraction: {
        middleware: [frontendAuthMiddleware, requireAdminPermission],
        handler: async ({ params: { teamId, interactionId } }) => {
          const interaction = INTERACTIONS[interactionId];
          if (interaction?.type !== "virtual") {
            return {
              status: 404 as const,
              body: null,
            };
          }

          const state = interaction.handler.forceGenerateFinalState();
          if (!state) {
            return {
              status: 500 as const,
              body: null,
            };
          }

          return executeTeamStateHandler(
            teamId,
            async (_, mutator, team_id) => {
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
              if (!is_unlocked || !is_started || is_completed) {
                return false;
              }

              await mutator.appendLog({
                team_id,
                type: "interaction_completed",
                slug: interactionId,
                data: {
                  result: state,
                },
              });
              return true;
            },
          );
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
              q = q
                .select(
                  "id",
                  "team_id",
                  "type",
                  "currency_delta",
                  "strong_currency_delta",
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
      getFullPuzzleStateLog: {
        middleware: [frontendAuthMiddleware],
        handler: async ({ query: { since, team_id, slug } }) => {
          let effectiveSince = undefined;
          if (since) {
            const sinceParsed = Number(since);
            if (sinceParsed > 0) {
              effectiveSince = sinceParsed;
            }
          }
          let effectiveTeamId = undefined;
          if (team_id) {
            const teamIdParsed = Number(team_id);
            if (teamIdParsed > 0) {
              effectiveTeamId = teamIdParsed;
            }
          }
          const entries = await knex.transaction(
            async (trx) => {
              let q = trx("puzzle_state_log");
              if (effectiveSince !== undefined) {
                q = q.where("id", ">", effectiveSince);
              }
              if (effectiveTeamId !== undefined) {
                q = q.where("team_id", effectiveTeamId);
              }
              if (slug !== undefined) {
                q = q.where("slug", slug);
              }
              q = q
                .select("id", "team_id", "slug", "data", "timestamp")
                .orderBy("id", "asc");
              return q;
            },
            { readOnly: true },
          );
          const body = entries.map((e) => {
            const entry = cleanupPuzzleStateLogEntryFromDB(e);
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
      getFullTeamInteractionStateLog: {
        middleware: [frontendAuthMiddleware],
        handler: async ({ query: { since, team_id, slug } }) => {
          let effectiveSince = undefined;
          if (since) {
            const sinceParsed = Number(since);
            if (sinceParsed > 0) {
              effectiveSince = sinceParsed;
            }
          }
          let effectiveTeamId = undefined;
          if (team_id) {
            const teamIdParsed = Number(team_id);
            if (teamIdParsed > 0) {
              effectiveTeamId = teamIdParsed;
            }
          }
          const entries = await knex.transaction(
            async (trx) => {
              return getTeamInteractionStateLog(
                effectiveTeamId,
                effectiveSince,
                slug,
                trx,
              );
            },
            { readOnly: true },
          );
          const body = entries.map((e) => {
            const entry = cleanupTeamInteractionStateLogEntryFromDB(e);
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
      getVotes: {
        middleware: [frontendAuthMiddleware],
        handler: async ({ params: { teamId, slug, pollId } }) => {
          const team_id = parseInt(teamId, 10);
          if (!redisClient) {
            return {
              status: 500,
              body: null,
            };
          }
          const redisKey = `/team/${team_id}/polls/${slug}/${pollId}`;
          const votes = await redisClient.hGetAll(redisKey);
          const results = countVotes(votes);
          return {
            status: 200,
            body: results,
          };
        },
      },
      speakNewKetchup: {
        middleware: [frontendAuthMiddleware],
        handler: async ({ params: { teamId } }) => {
          const team_id = parseInt(teamId, 10);
          const { result } = await puzzleStateLog.executeMutation(
            team_id,
            redisClient,
            knex,
            async (trx, mutator) => {
              // Rate-limiting: quietly ignore a request that comes in within 5 seconds of the previous request.
              const lastWriteTime =
                mutator.log.length > 0
                  ? mutator.log[mutator.log.length - 1]?.timestamp.getTime() ??
                    0
                  : 0;
              const now = Date.now();
              if (now - lastWriteTime < 5000) {
                return [];
              }

              // We need to read the team name from the DB, not cache.
              const teamName = await getCurrentTeamName(team_id, trx);
              if (teamName) {
                // Do whatever puzzle logic is involved
                const newEntries = generateLogEntries(teamName, mutator.log);
                for (const entry of newEntries) {
                  await mutator.appendLog({
                    team_id,
                    slug: "what_do_they_call_you",
                    data: entry,
                  });
                }
              }

              return mutator.log.filter(
                (entry) =>
                  entry.slug === "what_do_they_call_you" &&
                  entry.team_id === team_id,
              );
            },
          );
          const body = result.map((entry) => {
            return {
              ...entry,
              timestamp: entry.timestamp.toISOString(),
            };
          });
          return {
            status: 200 as const,
            body,
          };
        },
      },
      adFrequencyQuixoticShoe: {
        middleware: [frontendAuthMiddleware],
        handler: async ({ params: { teamId }, body: { status } }) => {
          const team_id = parseInt(teamId, 10);
          const { result } = await puzzleStateLog.executeMutation(
            team_id,
            redisClient,
            knex,
            async (_, mutator) => {
              // TODO(ebroder): integrate with radio state
              await mutator.appendLog({
                team_id,
                slug: "and_now_a_puzzling_word_from_our_sponsors",
                data: { type: "ad_frequency", status },
              });

              return mutator.log.filter(
                (entry) =>
                  entry.slug === "and_now_a_puzzling_word_from_our_sponsors" &&
                  entry.team_id === team_id,
              );
            },
          );
          const body = result.map((entry) => {
            return {
              ...entry,
              timestamp: entry.timestamp.toISOString(),
            };
          });
          return {
            status: 200 as const,
            body,
          };
        },
      },
      markSubpuzzleUnlocked: {
        middleware: [frontendAuthMiddleware],
        handler: async ({ params: { teamId, slug } }) => {
          const team_id = parseInt(teamId, 10);
          const subpuzzle = SUBPUZZLES[slug];
          if (!subpuzzle) {
            return {
              status: 404 as const,
              body: null,
            };
          }
          const { result, logEntries } = await puzzleStateLog.executeMutation(
            team_id,
            redisClient,
            knex,
            async function (_, mutator) {
              // Has this puzzle already been accessed by this team?
              const existing = mutator.log.some(
                (e) =>
                  e.team_id === team_id &&
                  e.data.type === "subpuzzle_unlocked" &&
                  e.data.subpuzzle_slug === slug &&
                  e.slug === subpuzzle.parent_slug,
              );
              // If not, insert unlock log.
              // If already present, no change.
              if (!existing) {
                const data: {
                  type: string;
                  subpuzzle_slug: string;
                  subpuzzle_name?: string;
                  order?: number;
                } = {
                  type: "subpuzzle_unlocked",
                  subpuzzle_slug: slug,
                };
                // Special case. Hydrate data with quixotic-shoe data if this is a
                // quixotic-shoe unlock.
                if (
                  subpuzzle.parent_slug ===
                    "and_now_a_puzzling_word_from_our_sponsors" &&
                  slug in quixoticSubpuzzleDataBySlug
                ) {
                  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- membership checked just above
                  const subpuzzleDatum = quixoticSubpuzzleDataBySlug[slug]!;
                  data.subpuzzle_name = subpuzzleDatum.subpuzzle_name;
                  data.order = orderedQuixoticSubpuzzleSlugs.indexOf(slug);
                }
                await mutator.appendLog({
                  team_id,
                  slug: subpuzzle.parent_slug,
                  data,
                });
              }
              return true;
            },
          );
          if (result) {
            return {
              status: 200 as const,
              body: formatSubpuzzleState(
                slug,
                subpuzzle.parent_slug,
                logEntries,
              ),
            };
          }
          return {
            status: 404 as const,
            body: null,
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
