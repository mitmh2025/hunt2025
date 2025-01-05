import { z } from "zod";
import { PuzzleDefinitionMetadataSchema } from "../../src/frontend/puzzles/types";
import {
  c,
  PuzzleStateSchema,
  TeamRegistrationSchema,
  TeamStateSchema,
} from "./contract";
import {
  InternalActivityLogSchema,
  TeamRegistrationLogSchema,
} from "./frontend_contract";

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

export const DesertedNinjaAnswerSchema = z.object({
  teamId: z.number(),
  sessionId: z.number(),
  // index of the question within the session, NOT the question id
  questionIndex: z.number(),
  answer: z.number().nullable(),
});

export type DesertedNinjaAnswer = z.infer<typeof DesertedNinjaAnswerSchema>;

export const DesertedNinjaQuestionSchema = z.object({
  id: z.number(),
  text: z.string(),
  geoguessr: z.number().nullable(),
  answer: z.number(),
  scoringMethod: z.string(),
});

export type DesertedNinjaQuestion = z.infer<typeof DesertedNinjaQuestionSchema>;

export const DesertedNinjaSessionSchema = z.object({
  id: z.number(),
  title: z.string(),
  status: z.string(),
  teams: z
    .object({
      id: z.number(),
      status: z.string(),
    })
    .array(),
  questionIds: z.number().array().length(17),
});

export type DesertedNinjaSession = z.infer<typeof DesertedNinjaSessionSchema>;

export const DesertedNinjaRegistrationSchema = z.object({
  sessionId: z.number(),
  teamId: z.number(),
  status: z.string(),
});

export type DesertedNinjaRegistration = z.infer<
  typeof DesertedNinjaRegistrationSchema
>;

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
    path: "/admin/grantKeys",
    body: z.object({
      teamIds: z.union([z.array(z.number()), z.literal("all")]),
      amount: z.number(),
    }),
    responses: {
      200: InternalActivityLogSchema,
    },
  },
  opsAccount: {
    method: "GET",
    path: "/admin/account",
    responses: {
      200: z.object({
        email: z.string(),
        isOpsAdmin: z.boolean(),
      }),
    },
  },
  unlockPuzzle: {
    method: "POST",
    path: "/admin/puzzles/:slug/unlock",
    body: z.object({
      teamIds: z.union([z.array(z.number()), z.literal("all")]),
    }),
    responses: {
      200: InternalActivityLogSchema,
    },
  },
  deactivateTeam: {
    method: "POST",
    path: "/teams/:teamId/deactivate",
    body: z.object({}),
    responses: {
      200: TeamRegistrationLogSchema,
      404: z.null(),
    },
  },
  reactivateTeam: {
    method: "POST",
    path: "/teams/:teamId/reactivate",
    body: z.object({}),
    responses: {
      200: TeamRegistrationLogSchema,
      404: z.null(),
    },
  },
  changeTeamPassword: {
    method: "POST",
    path: "/teams/:teamId/changePassword",
    body: z.object({
      newPassword: z.string(),
    }),
    responses: {
      200: TeamRegistrationLogSchema,
      404: z.null(),
    },
  },
  mintToken: {
    method: "POST",
    path: "/admin/mintToken",
    body: z.object({}).catchall(z.unknown()),
    responses: {
      200: z.string(),
    },
  },
  createDesertedNinjaSession: {
    method: "POST",
    path: "/admin/create-dn-session",
    body: z.object({ title: z.string() }),
    responses: {
      200: DesertedNinjaSessionSchema,
      500: z.null(),
    },
    summary: "Create a deserted-ninja session",
  },
  updateDesertedNinjaSession: {
    method: "POST",
    path: "/admin/update-dn-session/:sessionId",
    body: DesertedNinjaSessionSchema,
    responses: {
      200: DesertedNinjaSessionSchema,
      500: z.null(),
    },
    summary: "Update a deserted-ninja session",
  },
  getDesertedNinjaSessions: {
    method: "GET",
    path: "/admin/get-dn-sessions",
    responses: {
      200: DesertedNinjaSessionSchema.array(),
    },
    summary: "Get all deserted-ninja sessions",
  },
  completeDesertedNinjaSession: {
    method: "POST",
    path: "/admin/complete-dn-session/:sessionId",
    body: z.object({}),
    responses: {
      200: DesertedNinjaSessionSchema,
      400: z.null(),
      404: z.null(),
      500: z.string(),
    },
    summary: "Complete a deserted-ninja session, updating team logs",
  },
  createDesertedNinjaQuestions: {
    method: "POST",
    path: "/admin/create-dn-questions",
    body: DesertedNinjaQuestionSchema.array(),
    responses: {
      200: DesertedNinjaQuestionSchema.array(),
    },
    summary: "Bulk-upload a set of deserted-ninja questions",
  },
  getDesertedNinjaQuestions: {
    method: "GET",
    path: "/admin/get-dn-questions",
    responses: {
      200: DesertedNinjaQuestionSchema.array(),
    },
    summary: "Get all deserted-ninja questions",
  },
  getDesertedNinjaAnswers: {
    method: "GET",
    path: "/admin/get-dn-answers/:sessionId",
    responses: {
      200: DesertedNinjaAnswerSchema.array(),
    },
    summary: "Get deserted-ninja answers for a session (all teams)",
  },
  saveDesertedNinjaAnswers: {
    method: "POST",
    path: "/admin/save-dn-answers/:sessionId",
    body: DesertedNinjaAnswerSchema.array(),
    responses: {
      200: z.boolean(),
      400: z.string(),
      404: z.null(),
    },
    summary: "Save a set of deserted-ninja scores",
  },
  createDesertedNinjaRegistration: {
    method: "POST",
    path: "/admin/create-dn-registration/:sessionId/:teamId",
    body: z.object({}),
    responses: {
      200: DesertedNinjaRegistrationSchema.array(),
    },
    summary: "Register a team for a deserted-ninja session",
  },
  deleteDesertedNinjaRegistration: {
    method: "POST",
    path: "/admin/delete-dn-registration/:sessionId/:teamId",
    body: z.object({}),
    responses: {
      200: DesertedNinjaRegistrationSchema.array(),
      404: z.null(),
    },
    summary: "Unregister a team for a deserted-ninja session",
  },
  updateDesertedNinjaRegistration: {
    method: "POST",
    path: "/admin/update-dn-registration/:sessionId/:teamId",
    body: z.string(),
    responses: {
      200: DesertedNinjaRegistrationSchema.array(),
      404: z.null(),
    },
    summary: "Unregister a team for a deserted-ninja session",
  },
});
