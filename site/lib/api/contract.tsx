// contract.ts

import { initContract } from "@ts-rest/core";
import { z } from "zod";

const c = initContract();

const slug = z.string();

const GuessSchema = z.object({
  canonicalInput: z.string(),
  response: z.string(),
  timestamp: z.string().datetime(),
});

const PuzzleLockEnum = z
  .enum(["locked", "unlockable", "unlocked"])
  .default("locked");

const PuzzleSummarySchema = z.object({
  round: slug,
  // visible implied by existence
  locked: PuzzleLockEnum,
  answer: z.string().optional(),
});

const PuzzleStateSchema = PuzzleSummarySchema.extend({
  guesses: z.array(GuessSchema).default([]),
});

const RoundStateSchema = z.object({
  title: z.string(),
  slots: z.record(z.string(), slug),
});

const TeamStateSchema = z.object({
  teamName: z.string(),
  currency: z.number(),
  rounds: z.record(slug, RoundStateSchema),
  puzzles: z.record(slug, PuzzleSummarySchema),
});

const SubmitGuessSchema = z.object({
  guess: z.string(),
});

const ActivityLogEntryBaseSchema = z.object({
  timestamp: z.string().datetime(),
  currency_delta: z.number(),
});

const ActivityLogEntrySchema = z.discriminatedUnion("type", [
  ActivityLogEntryBaseSchema.merge(
    z.object({ type: z.literal("currency_adjusted") }),
  ),
  ActivityLogEntryBaseSchema.merge(
    z.object({ type: z.literal("round_unlocked"), slug: z.string() }),
  ),
  ActivityLogEntryBaseSchema.merge(
    z.object({ type: z.literal("puzzle_unlocked"), slug: z.string() }),
  ),
  ActivityLogEntryBaseSchema.merge(
    z.object({
      type: z.literal("puzzle_solved"),
      slug: z.string(),
      answer: z.string(),
    }),
  ),
  ActivityLogEntryBaseSchema.merge(
    z.object({ type: z.literal("interaction_unlocked"), slug: z.string() }),
  ),
  ActivityLogEntryBaseSchema.merge(
    z.object({ type: z.literal("interaction_completed"), slug: z.string() }),
  ),
]);

const ActivityLogSchema = z.array(ActivityLogEntrySchema);

const ForcePuzzleStateSchema = z.object({
  visible: z.boolean().optional(),
  unlockable: z.boolean().optional(),
  unlocked: z.boolean().optional(),
});

const LoginRequestSchema = z.object({
  username: z.string(),
  password: z.string(),
});

const LoginResponseSchema = z.object({
  token: z.string(),
});

const authContract = c.router({
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

const publicContract = c.router({
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

const adminContract = c.router({
  getTeamState: {
    method: "GET",
    path: `/teams/:team`,
    responses: {
      200: TeamStateSchema,
      404: z.null(),
    },
    summary: "Get a team's state",
  },
  getPuzzleState: {
    method: "GET",
    path: `/teams/:team/puzzle/:slug`,
    responses: {
      200: PuzzleStateSchema,
      404: z.null(),
    },
    summary: "Get the state of one puzzle",
  },
  forcePuzzleState: {
    method: "PATCH",
    path: `/teams/:team/puzzle/:slug`,
    body: ForcePuzzleStateSchema,
    responses: {
      200: PuzzleStateSchema,
    },
    summary: "Force the state of one puzzle",
  },
});

export const contract = c.router({
  auth: authContract,
  public: publicContract,
  admin: adminContract,
});
