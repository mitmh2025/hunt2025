import { type ClientInferResponseBody } from "@ts-rest/core";
import { z } from "zod";
import { ActivityLogSchema, c, TeamStateSchema, GuessStatus } from "./contract";

const FullGuessSchema = z.object({
  id: z.number(),
  team_id: z.number(),
  slug: z.string(),
  canonical_input: z.string(),
  status: GuessStatus,
  response: z.string().optional(),
  timestamp: z.string().datetime(),
});

const FullGuessHistorySchema = z.array(FullGuessSchema);

export const frontendContract = c.router({
  markTeamGateSatisfied: {
    method: "POST",
    path: `/teams/:teamId/:gateId`,
    body: z.object({}),
    responses: {
      200: TeamStateSchema,
      404: z.null(),
    },
  },
  startInteraction: {
    method: "POST",
    path: `/teams/:teamId/interactions/:interactionId/start`,
    body: z.object({}),
    responses: {
      200: TeamStateSchema,
      404: z.null(),
    },
  },
  completeInteraction: {
    method: "POST",
    path: `/teams/:teamId/interactions/:interactionId/complete`,
    body: z.object({
      result: z.string(),
    }),
    responses: {
      200: TeamStateSchema,
      404: z.null(),
    },
  },
  getFullActivityLog: {
    method: "GET",
    path: "/fulllog",
    query: z.object({
      since: z.number().optional(),
    }),
    responses: {
      200: ActivityLogSchema,
      401: z.null(),
    },
  },
  getFullGuessHistory: {
    method: "GET",
    path: "/guesslog",
    query: z.object({
      since: z.number().optional(),
    }),
    responses: {
      200: FullGuessHistorySchema,
      401: z.null(),
    },
  },
});

export type FullActivityLog = ClientInferResponseBody<
  typeof frontendContract.getFullActivityLog,
  200
>;

export type FullGuessHistory = ClientInferResponseBody<
  typeof frontendContract.getFullGuessHistory,
  200
>;
