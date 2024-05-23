import { type ServerInferResponseBody } from "@ts-rest/core";
import { createExpressEndpoints, initServer } from "@ts-rest/express";
import { generateOpenApi } from "@ts-rest/open-api";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import { type Request, type RequestHandler, Router } from "express";
import jwt from "jsonwebtoken";
import { type Knex } from "knex";
import { type ActivityLogEntry } from "knex/types/tables";
import { Passport } from "passport";
import { Strategy, ExtractJwt } from "passport-jwt";
import * as swaggerUi from "swagger-ui-express";
import { type TeamState } from "../../lib/api/client";
import { contract } from "../../lib/api/contract";
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
  typeof contract.public.getPuzzleState,
  200
>;

type ActivityLog = ServerInferResponseBody<
  typeof contract.public.getActivityLog,
  200
>;

type JWTPayload = {
  user: string;
  adminUser?: string;
};

function cookieExtractor(req: Request) {
  const token = req.cookies["mitmh2025_auth"] as string | undefined;
  return token ? token : null;
}

function newPassport(jwt_secret: string | Buffer) {
  const passport = new Passport();
  passport.use(
    new Strategy(
      {
        jwtFromRequest: ExtractJwt.fromExtractors([
          cookieExtractor,
          ExtractJwt.fromAuthHeaderAsBearerToken(),
        ]),
        secretOrKey: jwt_secret,
        //issuer: 'mitmh2025.com',
        //audience: 'mitmh2025.com',
      },
      function (jwt_payload: JWTPayload, done) {
        done(null, jwt_payload.user, { adminUser: jwt_payload.adminUser });
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
  jwt_secret,
  knex,
  hunt,
}: {
  jwt_secret: string | Buffer;
  knex: Knex;
  hunt: Hunt;
}) {
  const app = Router();
  app.use(cors());
  app.use(cookieParser());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());

  const passport = newPassport(jwt_secret);

  const s = initServer();

  const getTeamState = async (
    team: string,
    trx: Knex.Transaction,
  ): Promise<TeamState> => {
    const data = await dbGetTeamState(team, trx);
    console.log(data);
    const rounds = Object.fromEntries(
      hunt.rounds
        .filter(({ slug: roundSlug }) => data.unlocked_rounds.has(roundSlug))
        .map(({ slug, title, puzzles }) => [
          slug,
          {
            title,
            slots: Object.fromEntries(
              puzzles.flatMap((slot) => {
                const slug = getSlotSlug(slot);
                if (slug && data.visible_puzzles.has(slug)) {
                  return [[slot.id, slug]];
                }
                return [];
              }),
            ),
          },
        ]),
    );
    const puzzleRounds = Object.fromEntries(
      Object.entries(rounds).flatMap(([roundSlug, { slots }]) =>
        Object.entries(slots).map(([_id, puzzleSlug]) => [
          puzzleSlug,
          roundSlug,
        ]),
      ),
    );
    return {
      teamName: team,
      rounds,
      currency: data.available_currency,
      puzzles: Object.fromEntries(
        [...data.visible_puzzles].map((slug) => [
          slug,
          {
            round: puzzleRounds[slug] || "outlands", // TODO: Should this be hardcoded?
            locked: data.unlocked_puzzles.has(slug)
              ? "unlocked"
              : data.unlockable_puzzles.has(slug)
                ? "unlockable"
                : "locked",
            answer: data.correct_answers[slug],
          },
        ]),
      ),
    };
  };

  const getPuzzleState = async (
    team: string,
    slug: string,
    trx: Knex.Transaction,
  ): Promise<PuzzleState | undefined> => {
    const { unlocked_rounds, puzzle_status, answer, guesses } =
      await dbGetPuzzleState(team, slug, trx);
    if (!puzzle_status) {
      return undefined;
    }
    let round: string | undefined;
    hunt.rounds.forEach(({ slug: roundSlug, puzzles }) => {
      if (!unlocked_rounds.has(roundSlug)) {
        return;
      }
      puzzles.forEach((slot) => {
        if (slug == getSlotSlug(slot)) {
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
        response: response || "",
        timestamp: timestamp.toISOString(),
      })),
    };
    if (answer) {
      result.answer = answer;
    }
    return result;
  };

  /* eslint-disable-next-line @typescript-eslint/no-unsafe-assignment --
   * I can't tell what's untyped here, but maybe something in passport? */
  const authMiddleware: RequestHandler = passport.authenticate("jwt", {
    session: false,
  });

  const adminAuthMiddlewares: RequestHandler[] = [
    authMiddleware,
    (req, res, next) => {
      if (process.env.NODE_ENV == "development" || req.authInfo?.adminUser) {
        next();
        return;
      }
      res.status(403).send("not an admin");
    },
  ];

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
          .first("username");
        if (team !== undefined) {
          const token = jwt.sign(
            {
              user: username,
            },
            jwt_secret,
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
          const team = req.user as string;
          return {
            status: 200,
            body: await knex.transaction(getTeamState.bind(null, team)),
          };
        },
      },
      getPuzzleState: {
        middleware: [authMiddleware],
        handler: async ({ params: { slug }, req }) => {
          const state = await knex.transaction(
            getPuzzleState.bind(null, req.user as string, slug),
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
          const entries = (await knex("activity_log")
            .where("username", req.user as string)
            .select("timestamp", "type", "slug", "currency_delta", "data")
            .orderBy("timestamp", "desc")) as ActivityLogEntry[];
          const body = entries.map((e) => {
            // TODO: Is there a type-safe way to do this that doesn't involve a switch on e.type?
            let entry: Partial<ActivityLog[number]> = {
              timestamp: fixTimestamp(e.timestamp).toISOString(),
              currency_delta: e.currency_delta,
              type: e.type,
            };
            if ("slug" in e) {
              (entry as { slug: string }).slug = e.slug;
            }
            if ("data" in e) {
              // SQLite doesn't parse JSON automatically
              const data =
                typeof e.data == "string"
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
          const team = req.user as string;
          const puzzle = PUZZLES[slug];
          let canonical_input = canonicalizeInput(guess);
          const answers = puzzle
            ? "answer" in puzzle
              ? [{ answer: puzzle.answer, prize: puzzle.prize, submit_if: [] }]
              : puzzle.answers
            : process.env.NODE_ENV == "development"
              ? [{ answer: "PLACEHOLDER ANSWER", prize: 1, submit_if: [] }]
              : [];
          // TODO: Figure out the semantics of a correct answer with false submit_if
          const correct_answer = answers.find(
            ({ answer }) => canonicalizeInput(answer) == canonical_input,
          );
          // TODO: Make sure that we retry/wait for conflicts.
          return await knex.transaction(async function (trx) {
            const result = await trx("team_puzzles")
              .where("username", team)
              .where("slug", slug)
              .select("unlocked")
              .first();
            if (!result?.unlocked) {
              return {
                status: 404,
                body: null,
              };
            }
            let response = "Incorrect";
            if (correct_answer) {
              canonical_input = correct_answer.answer;
              response = "Correct!";
              await appendActivityLog(
                {
                  username: team,
                  slug,
                  type: "puzzle_solved",
                  currency_delta: correct_answer.prize || 0,
                  data: {
                    answer: canonical_input,
                  },
                },
                trx,
              );
            }
            // TODO: Recognize partial answers
            await trx("team_puzzle_guesses")
              .insert({
                username: team,
                slug,
                canonical_input,
                correct: !!correct_answer,
                response,
              })
              .onConflict(["username", "slug", "canonical_input"])
              .ignore();
            await recalculateTeamState(hunt, team, trx);
            // TODO: Invalidate caches
            return {
              status: 200,
              /* eslint-disable-next-line @typescript-eslint/no-non-null-assertion --
               * We know the puzzle state exists because we checked the db above. */
              body: (await getPuzzleState(team, slug, trx))!,
            };
          });
        },
      },
      unlockPuzzle: {
        middleware: [authMiddleware],
        handler: async ({ params: { slug }, req }) => {
          const team = req.user as string;

          // TODO: Make sure that we retry/wait for conflicts.
          return await knex.transaction(async function (trx) {
            const data = await dbGetTeamState(team, trx);
            const slot = hunt.rounds
              .filter(({ slug }) => data.unlocked_rounds.has(slug))
              .flatMap(({ puzzles }) =>
                puzzles.flatMap((slot) =>
                  getSlotSlug(slot) == slug ? [slot] : [],
                ),
              )[0];
            const unlock_cost = slot?.unlock_cost;
            if (
              data.unlockable_puzzles.has(slug) &&
              unlock_cost &&
              data.available_currency >= unlock_cost
            ) {
              await trx("team_puzzles")
                .where("username", team)
                .where("slug", slug)
                .update({ unlocked: true });
              await appendActivityLog(
                {
                  username: team,
                  type: "puzzle_unlocked",
                  slug,
                  currency_delta: -unlock_cost,
                },
                trx,
              );

              await recalculateTeamState(hunt, team, trx);
              // TODO: Invalidate caches
              return {
                status: 200,
                /* eslint-disable-next-line @typescript-eslint/no-non-null-assertion --
                 * We know the puzzle state exists because we checked the db above. */
                body: (await getPuzzleState(team, slug, trx))!,
              };
            }
            return {
              status: 404,
              body: null,
            };
          });
        },
      },
    },
    admin: {
      getTeamState: {
        middleware: adminAuthMiddlewares,
        handler: async ({ params: { team } }) => {
          return {
            status: 200,
            body: await knex.transaction(getTeamState.bind(null, team)),
          };
        },
      },
      getPuzzleState: {
        middleware: adminAuthMiddlewares,
        handler: async ({ params: { team, slug } }) => {
          const state = await knex.transaction(
            getPuzzleState.bind(null, team, slug),
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
        handler: async ({ params: { team, slug }, body }) => {
          return await knex.transaction(async (trx) => {
            await trx("team_puzzles")
              .insert(
                Object.assign(
                  {
                    username: team,
                    slug,
                  },
                  body,
                ),
              )
              .onConflict(["username", "slug"])
              .merge(body);
            await recalculateTeamState(hunt, team, trx);
            // TODO: Invalidate caches
            return {
              status: 200,
              /* eslint-disable-next-line @typescript-eslint/no-non-null-assertion --
               * We know the puzzle state exists because we checked the db above. */
              body: (await getPuzzleState(team, slug, trx))!,
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
