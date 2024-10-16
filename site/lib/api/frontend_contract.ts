import { type ClientInferResponseBody } from "@ts-rest/core";
import { z } from "zod";
import {
  c,
  TeamStateSchema,
  ActivityLogEntryBaseSchema,
  GuessStatus,
} from "./contract";

const InternalActivityLogEntryBaseSchema = ActivityLogEntryBaseSchema.merge(
  z.object({
    internal_data: z
      .object({
        operator: z.string().optional(),
      })
      .optional(),
  }),
);

export const InternalActivityLogEntryWithSlug =
  InternalActivityLogEntryBaseSchema.merge(z.object({ slug: z.string() }));

// A represenatation of what is actually stored in the DB, since that's what we need to use for the
// DB tailer since that's what will be put into the pubsub channel.
export const InternalActivityLogEntrySchema = z.discriminatedUnion("type", [
  InternalActivityLogEntryBaseSchema.merge(
    z.object({ type: z.literal("currency_adjusted") }),
  ),
  InternalActivityLogEntryWithSlug.merge(
    z.object({ type: z.literal("round_unlocked") }),
  ),
  InternalActivityLogEntryWithSlug.merge(
    z.object({ type: z.literal("puzzle_unlockable") }),
  ),
  InternalActivityLogEntryWithSlug.merge(
    z.object({ type: z.literal("puzzle_unlocked") }),
  ),
  InternalActivityLogEntryWithSlug.merge(
    z.object({
      type: z.literal("puzzle_partially_solved"),
      data: z.object({ partial: z.string() }),
    }),
  ),
  InternalActivityLogEntryWithSlug.merge(
    z.object({
      type: z.literal("puzzle_solved"),
      data: z.object({ answer: z.string() }),
    }),
  ),
  InternalActivityLogEntryWithSlug.merge(
    z.object({ type: z.literal("interaction_unlocked") }),
  ),
  InternalActivityLogEntryWithSlug.merge(
    z.object({ type: z.literal("interaction_started") }),
  ),
  InternalActivityLogEntryWithSlug.merge(
    z.object({
      type: z.literal("interaction_completed"),
      data: z.object({ result: z.string() }),
    }),
  ),
  InternalActivityLogEntryWithSlug.merge(
    z.object({ type: z.literal("gate_completed") }),
  ),
  InternalActivityLogEntryWithSlug.merge(
    z.object({ type: z.literal("rate_limits_reset") }),
  ),
  // Entry types below this point do not appear in the team-visible activity log.
  InternalActivityLogEntryWithSlug.merge(
    z.object({
      type: z.literal("puzzle_guess_submitted"),
      data: z.object({
        canonical_input: z.string(),
        status: GuessStatus,
        response: z.string(),
      }),
    }),
  ),
]);
export type InternalActivityLogEntry = z.infer<
  typeof InternalActivityLogEntrySchema
>;
export const InternalActivityLogSchema = z.array(
  InternalActivityLogEntrySchema,
);

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
      200: InternalActivityLogSchema,
      401: z.null(),
    },
  },
});

export type FullActivityLog = ClientInferResponseBody<
  typeof frontendContract.getFullActivityLog,
  200
>;
