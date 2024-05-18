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

const puzzleState: Record<
  string,
  ServerInferResponseBody<typeof contract.public.getPuzzleState, 200>
> = {
  "burger-king": {
    round: "first-round",
    locked: "unlocked",
  },
  automaton: {
    round: "wasteland",
  },
  the_casino: {
    round: "shadow_diamond",
    locked: "unlocked",
  },
};

type JWTPayload = {
  user: string;
};

function cookieExtractor(req: Request) {
  const token = req.cookies["mitmh2025_auth"] as string | undefined;
  return token ? token : null;
}

function newPassport(jwt_secret: string) {
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

export function getRouter({
  jwt_secret,
  knex,
}: {
  jwt_secret: string;
  knex: Knex;
}) {
  const app = Router();
  app.use(cors());
  app.use(cookieParser());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());

  const passport = newPassport(jwt_secret);

  const s = initServer();

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
        /* eslint-disable-next-line @typescript-eslint/no-unsafe-assignment --
         * I can't tell what's untyped here either.  knex table results? */
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
    /* eslint-disable @typescript-eslint/require-await --
     * These async functions really should return promises, even though they
     * don't currently await anything. */
    public: {
      getMyTeamState: {
        middleware: [authMiddleware],
        handler: async ({ req }) => {
          return {
            status: 200,
            body: {
              teamName: `Unicode Snowman ☃ (${req.user})`,
              rounds: {
                "first-round": {
                  name: "First Round",
                  slots: {
                    "1": "burger-king",
                    "2": "automaton",
                  },
                },
                shadow_diamond: {
                  name: "Shadow Diamond",
                  slots: {
                    sdm03: "the_casino",
                  },
                },
              },
              puzzles: puzzleState,
            },
          };
        },
      },
      getPuzzleState: {
        middleware: [authMiddleware],
        handler: async ({ params }) => {
          const state = puzzleState[params.slug];
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
