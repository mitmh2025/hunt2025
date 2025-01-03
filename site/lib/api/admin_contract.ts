import { z } from "zod";
import { PuzzleDefinitionMetadataSchema } from "../../src/frontend/puzzles/types";
import {
  c,
  PuzzleStateSchema,
  TeamRegistrationSchema,
  TeamStateSchema,
} from "./contract";
import { InternalActivityLogSchema } from "./frontend_contract";

export const PuzzleAPIMetadataSchema = z.record(
  z.string(),
  // We may eventually include the full metadata, but we'll wait until
  // auth is finalized for the admin endpoints
  PuzzleDefinitionMetadataSchema.pick({ title: true, slug: true }),
);

export type PuzzleAPIMetadata = z.infer<typeof PuzzleAPIMetadataSchema>;

const TeamContactsSchema = z.array(
  TeamRegistrationSchema.pick({
    username: true,

    name: true,
    teamEmail: true,

    contactName: true,
    contactEmail: true,
    contactPhone: true,
    contactMailingAddress: true,

    secondaryContactName: true,
    secondaryContactEmail: true,
    secondaryContactPhone: true,
  }),
);

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
  getTeamContacts: {
    method: "GET",
    path: `/admin/teamContacts`,
    responses: {
      200: TeamContactsSchema,
    },
  },
  sendTeamEmail: {
    method: "POST",
    path: "/admin/sendTeamEmail",
    body: z.object({
      dryRun: z.boolean().default(true),
      wholeTeam: z.boolean().default(false),
      templateAlias: z.string(),
    }),
    responses: {
      200: z.object({
        messages: z.array(
          z.object({
            address: z.object({
              name: z.string(),
              address: z.string(),
            }),
            success: z.boolean().optional(),
          }),
        ),
      }),
    },
  },
  grantKeys: {
    method: "POST",
    path: "/admin/grant-keys",
    body: z.object({
      teamIds: z.union([z.array(z.number()), z.literal("all")]),
      amount: z.number(),
    }),
    responses: {
      200: InternalActivityLogSchema,
    },
  },
});
