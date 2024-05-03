// main.ts

import { createExpressEndpoints, initServer } from '@ts-rest/express';
import { contract } from './contract';
import { ServerInferResponseBody } from '@ts-rest/core';
import { Router } from 'express';
import { generateOpenApi } from '@ts-rest/open-api';
import * as swaggerUi from 'swagger-ui-express';
import bodyParser from 'body-parser';
import cors from 'cors';

const puzzleState: Record<string, ServerInferResponseBody<typeof contract.getPuzzleState, 200>> = {
    "burger-king": {
        round: "first-round",
        locked: "unlocked",
    },
    "automaton": {
        round: "wasteland",
    },
};

export function getRouter() {
    const app = Router();
    app.use(cors());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());

    const s = initServer();

    const router = s.router(contract,
        {
            auth: {
                login: async ({ body: { username, password } }) => {
                    if (password == "password") {
                        return {
                            status: 200,
                            body: {
                                token: username, // FIXME
                            }
                        };
                    }
                    return {
                        status: 403,
                        body: {},
                    };
                },
            },
            getMyTeamState: async ({ }) => {
                return {
                    status: 200,
                    body: {
                        teamName: "Unicode Snowman ☃",
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
            getPuzzleState: async ({ params }) => {
                const state = puzzleState[params.slug];
                if (!state) {
                    return {
                        status: 404,
                        body: null,
                    }
                }
                return {
                    status: 200,
                    body: state,
                };
            },
        },
    );

    createExpressEndpoints(contract, router, app, {
        jsonQuery: true,
        responseValidation: true,
    });

    const openApiDocument = generateOpenApi(contract, {
        info: {
            title: 'Hunt API',
            version: '2025',
        },
        servers: [{
            url: '/api/',
        }],
    });

    app.use('/', swaggerUi.serve, swaggerUi.setup(openApiDocument));

    return app;
}