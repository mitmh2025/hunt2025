import { ServerInferResponseBody } from "@ts-rest/core";
import { createExpressEndpoints, initServer } from "@ts-rest/express";
import { generateOpenApi } from "@ts-rest/open-api";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import { Request, Router } from "express";
import jwt from "jsonwebtoken";
import { Knex } from "knex";
import { Passport } from "passport";
import { Strategy, ExtractJwt } from "passport-jwt";
import * as swaggerUi from "swagger-ui-express";
import { contract } from "../../lib/api/contract";
import { PUZZLES } from "../frontend/puzzles";
import { getSlotSlug } from "../huntdata/logic";
import { Hunt } from "../huntdata/types";
import {
  getTeamState as dbGetTeamState,
  getPuzzleState as dbGetPuzzleState,
  recalculateTeamState,
} from "./db";

type PuzzleState = ServerInferResponseBody<
  typeof contract.public.getPuzzleState,
  200
>;

type JWTPayload = {
  user: string;
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
        done(null, jwt_payload.user);
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
  const authMiddleware = passport.authenticate("jwt", { session: false });

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
          // TODO: Recalculate on every mutation.
          await knex.transaction(
            recalculateTeamState.bind(null, hunt, req.user as string),
          );
          const data = await knex.transaction(dbGetTeamState.bind(null, team));
          console.log(data);
          const rounds = Object.fromEntries(
            hunt.rounds
              .filter(({ slug: roundSlug }) =>
                data.unlocked_rounds.has(roundSlug),
              )
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
            status: 200,
            body: {
              teamName: team,
              rounds,
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
            },
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
      submitGuess: {
        middleware: [authMiddleware],
        handler: async ({ params: { slug }, body: { guess }, req }) => {
          const team = req.user as string;
          const puzzle = PUZZLES[slug];
          let canonical_input = canonicalizeInput(guess);
          const answers = puzzle
            ? "answer" in puzzle
              ? [{ answer: puzzle.answer, submit_if: [] }]
              : puzzle.answers
            : process.env.NODE_ENV == "development"
              ? [{ answer: "PLACEHOLDER ANSWER", submit_if: [] }]
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
    /* eslint-enable @typescript-eslint/require-await */
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
