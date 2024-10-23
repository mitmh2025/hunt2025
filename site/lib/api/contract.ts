// contract.ts

import { initContract } from "@ts-rest/core";
import { z } from "zod";

export const c = initContract();

const slug = z.string();

export const GuessStatus = z.enum(["correct", "incorrect", "other"]);
export const GuessSchema = z.object({
  canonical_input: z.string(),
  status: GuessStatus,
  response: z.string(),
  timestamp: z.string().datetime(),
});

export const RateLimitStateSchema = z.object({
  retryAfter: z.string().datetime(),
});

// Still unsure if we need to be able to return any information about puzzles in the "locked" state.
// We broadly do not care to service requests for puzzles that are neither unlockable nor unlocked.
const PuzzleLockEnum = z
  .enum(["locked", "unlockable", "unlocked"])
  .default("locked");

const PuzzleSummarySchema = z.object({
  round: slug,
  stray: z.boolean().optional(), // If true, this puzzle initially unlocked in the outlands, regardless of its current round assignment.
  // visible implied by existence
  locked: PuzzleLockEnum,
  answer: z.string().optional(),
});

export const PuzzleStateSchema = PuzzleSummarySchema.extend({
  guesses: z.array(GuessSchema).default([]),
});

const PuzzleSlotSchema = z.object({
  slug: z.string(),
  is_meta: z.boolean().optional(),
});

export const InteractionStateSchema = z.object({
  state: z.enum(["unlocked", "running", "completed"]),
  result: z.string().optional(), // an interaction-specific result which may be reflected elsewhere in the UI
});

const RoundStateSchema = z.object({
  title: z.string(),
  slots: z.record(z.string(), PuzzleSlotSchema),
  gates: z.array(z.string()).optional(),
  interactions: z.record(slug, InteractionStateSchema).optional(),
});

export const TeamStateSchema = z.object({
  epoch: z.number(), // The largest value of `id` of the activity_log entries which were processed to produce this TeamState
  teamId: z.number(),
  teamName: z.string(),
  currency: z.number(),
  rounds: z.record(slug, RoundStateSchema),
  puzzles: z.record(slug, PuzzleSummarySchema),
});

const SubmitGuessSchema = z.object({
  guess: z.string(),
});

export const ActivityLogEntryBaseSchema = z.object({
  id: z.number(),
  team_id: z.number().optional(),
  timestamp: z.string().datetime(),
  currency_delta: z.number(),
});

const ActivityLogEntryWithSlugAndTitle = ActivityLogEntryBaseSchema.merge(
  z.object({ slug: z.string(), title: z.string() }),
);

// Though they are not materialized in the DB, we include the title of rounds, puzzles, and
// interactions in the API-level activity log entries, because we're going to need them anyway to
// visualize the activity log or edge-triggered notifications driven by activity log entries.
const ActivityLogEntrySchema = z.discriminatedUnion("type", [
  ActivityLogEntryBaseSchema.merge(
    z.object({ type: z.literal("currency_adjusted") }),
  ),
  ActivityLogEntryWithSlugAndTitle.merge(
    z.object({ type: z.literal("round_unlocked") }),
  ),
  ActivityLogEntryWithSlugAndTitle.merge(
    z.object({ type: z.literal("puzzle_unlockable") }),
  ),
  ActivityLogEntryWithSlugAndTitle.merge(
    z.object({ type: z.literal("puzzle_unlocked") }),
  ),
  ActivityLogEntryWithSlugAndTitle.merge(
    z.object({
      type: z.literal("puzzle_partially_solved"),
      partial: z.string(),
    }),
  ),
  ActivityLogEntryWithSlugAndTitle.merge(
    z.object({
      type: z.literal("puzzle_solved"),
      answer: z.string(),
    }),
  ),
  ActivityLogEntryWithSlugAndTitle.merge(
    z.object({ type: z.literal("interaction_unlocked") }),
  ),
  ActivityLogEntryWithSlugAndTitle.merge(
    z.object({ type: z.literal("interaction_started") }),
  ),
  ActivityLogEntryWithSlugAndTitle.merge(
    z.object({
      type: z.literal("interaction_completed"),
      result: z.string(),
    }),
  ),
  ActivityLogEntryBaseSchema.merge(
    // Note: title is optional on gates; not all gates have a publicly-exposed label
    z.object({
      type: z.literal("gate_completed"),
      slug: z.string(),
      title: z.string().optional(),
    }),
  ),
  ActivityLogEntryWithSlugAndTitle.merge(
    z.object({ type: z.literal("rate_limits_reset") }),
  ),
]);

export const ActivityLogSchema = z.array(ActivityLogEntrySchema);

const LoginRequestSchema = z.object({
  username: z.string(),
  password: z.string(),
});

const LoginResponseSchema = z.object({
  token: z.string(),
});

export const authContract = c.router({
  login: {
    method: "POST",
    path: `/auth/login`,
    body: LoginRequestSchema,
    responses: {
      200: LoginResponseSchema,
      401: z.object({}),
    },
    summary: "Login to a team",
  },
});

export const publicContract = c.router({
  getMyTeamState: {
    method: "GET",
    path: `/me`,
    responses: {
      200: TeamStateSchema,
    },
    summary: "Get my team state",
  },
  getPuzzleState: {
    method: "GET",
    path: `/puzzle/:slug`,
    responses: {
      200: PuzzleStateSchema,
      404: z.null(),
    },
    summary: "Get the state of one puzzle",
  },
  getActivityLog: {
    method: "GET",
    path: "/activity",
    responses: {
      200: ActivityLogSchema,
    },
    summary: "Get activity log",
  },
  submitGuess: {
    method: "PUT",
    path: `/puzzle/:slug/guess`,
    body: SubmitGuessSchema,
    responses: {
      200: PuzzleStateSchema,
      429: RateLimitStateSchema,
      404: z.null(),
    },
  },
  unlockPuzzle: {
    method: "POST",
    path: `/puzzle/:slug/unlock`,
    body: z.object({}),
    responses: {
      200: PuzzleStateSchema,
      404: z.null(),
    },
  },
});
