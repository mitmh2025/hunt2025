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
});
