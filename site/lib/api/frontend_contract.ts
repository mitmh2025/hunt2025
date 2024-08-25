import { type ClientInferResponseBody } from "@ts-rest/core";
import { z } from "zod";
import { ActivityLogSchema, c, TeamStateSchema } from "./contract";

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
});

export type FullActivityLog = ClientInferResponseBody<
  typeof frontendContract.getFullActivityLog,
  200
>;
