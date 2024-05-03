// main.ts

import { createExpressEndpoints, initServer } from "@ts-rest/express";
import { contract } from "./contract";
import { ServerInferResponseBody } from "@ts-rest/core";
import { Router } from "express";
import { generateOpenApi } from "@ts-rest/open-api";
import * as swaggerUi from "swagger-ui-express";
import bodyParser from "body-parser";
import cors from "cors";
import { Strategy, ExtractJwt } from "passport-jwt";
import { Passport } from "passport";
import jwt from "jsonwebtoken";

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
};

const JWT_SECRET = "secret"; // FIXME

function newPassport() {
  const passport = new Passport();
  passport.use(
    new Strategy(
      {
        jwtFromRequest: ExtractJwt.fromExtractors([
          ExtractJwt.fromUrlQueryParameter("mitmh2025_auth"),
          ExtractJwt.fromAuthHeaderAsBearerToken(),
        ]),
        secretOrKey: JWT_SECRET,
        //issuer: 'mitmh2025.com',
        //audience: 'mitmh2025.com',
      },
      function (jwt_payload, done) {
        return done(null, jwt_payload.user);
      },
    ),
  );
  return passport;
}

export function getRouter() {
  const app = Router();
  app.use(cors());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());

  const passport = newPassport();

  const s = initServer();

  const authMiddleware = passport.authenticate('jwt', { session: false });

  const router = s.router(contract, {
    auth: {
      login: async ({ body: { username, password } }) => {
        if (password == "password") {
          // FIXME
          const token = jwt.sign(
            {
              user: username,
            },
            JWT_SECRET,
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
