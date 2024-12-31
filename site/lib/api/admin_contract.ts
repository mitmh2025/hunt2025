import { z } from "zod";
import { PuzzleDefinitionMetadataSchema } from "../../src/frontend/puzzles/types";
import { c, PuzzleStateSchema, TeamStateSchema } from "./contract";

export const PuzzleAPIMetadataSchema = z.record(
  z.string(),
  // We may eventually include the full metadata, but we'll wait until
  // auth is finalized for the admin endpoints
  PuzzleDefinitionMetadataSchema.pick({ title: true, slug: true }),
);

export type PuzzleAPIMetadata = z.infer<typeof PuzzleAPIMetadataSchema>;

export const DesertedNinjaScoreSchema = z.object({
  sessionId: z.number(),
  teamId: z.number(),
  scores: z.number().min(0).max(5).array().length(17),
});

export type DesertedNinjaScore = z.infer<typeof DesertedNinjaScoreSchema>;

export const DesertedNinjaSessionSchema = z.object({
  sessionId: z.number(),
  title: z.string(),
  teamIds: z.number().array(),
  questionIds: z.number().array().length(17),
});

export type DesertedNinjaSession = z.infer<typeof DesertedNinjaSessionSchema>;

export const adminContract = c.router({
  getTeamState: {
    method: "GET",
    path: `/teams/:teamId`,
    responses: {
      200: TeamStateSchema,
      404: z.null(),
    },
    summary: "Get a team's state",
  },
  getPuzzleState: {
    method: "GET",
    path: `/teams/:teamId/puzzle/:slug`,
    responses: {
      200: PuzzleStateSchema,
      404: z.null(),
    },
    summary: "Get the state of one puzzle",
  },
  getPuzzleMetadata: {
    method: "GET",
    path: "/admin/puzzles",
    responses: {
      200: PuzzleAPIMetadataSchema,
    },
    summary: "Get all puzzle metadata",
  },
  createDesertedNinjaSession: {
    method: "POST",
    path: "/admin/create-dn-session",
    body: z.string(),
    responses: {
      200: DesertedNinjaSessionSchema,
    },
    summary: "Create a deserted-ninja session"
  },
  saveDesertedNinjaSession: {
    method: "POST",
    path: "/admin/save-dn-session/:session-id",
    body: DesertedNinjaSessionSchema,
    responses: {
      200: DesertedNinjaSessionSchema,
    },
    summary: "Save/update a deserted-ninja session",
  },
  getDesertedNinjaSessions: {
    method: "GET",
    path: "/admin/get-dn-sessions",
    responses: {
      200: DesertedNinjaSessionSchema.array(),
    },
    summary: "Get all deserted-ninja sessions",
  },
  getDesertedNinjaScores: {
    method: "GET",
    path: "/admin/get-dn-scores/:teamId",
    responses: {
      200: DesertedNinjaScoreSchema.array(),
    },
    summary: "Get deserted-ninja scores for a team (all sessions)",
  },
  saveDesertedNinjaScores: {
    method: "POST",
    path: "/admin/save-dn-scores/:sessionId",
    body: DesertedNinjaScoreSchema.array(),
    responses: {
      200: DesertedNinjaScoreSchema.array(),
    },
    summary: "Save deserted-ninja scores for a session",
  },
});
