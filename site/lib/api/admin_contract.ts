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
  PuzzleDefinitionMetadataSchema.pick({
    title: true,
    slug: true,
    code_name: true,
  }),
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

export const FermitAnswerSchema = z.object({
  teamId: z.number(),
  sessionId: z.number(),
  // index of the question within the session, NOT the question id
  questionIndex: z.number(),
  answer: z.number().nullable(),
});

export type FermitAnswer = z.infer<typeof FermitAnswerSchema>;

export type FermitQuestionJSON = {
  text: string;
  geoguessr: number | null;
  answer: number;
  scoringMethod: string;
  categories: string[];
};

export const FermitSessionSchema = z.object({
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

export type FermitSession = z.infer<typeof FermitSessionSchema>;

export const FermitRegistrationSchema = z.object({
  sessionId: z.number(),
  teamId: z.number(),
  status: z.string(),
});

export type FermitRegistration = z.infer<typeof FermitRegistrationSchema>;

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
            addresses: z.array(
              z.object({
                name: z.string(),
                address: z.string(),
              }),
            ),
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
  grantStrongCurrency: {
    method: "POST",
    path: "/admin/grantStrongCurrency",
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
  resetPuzzleRateLimit: {
    method: "POST",
    path: "/admin/puzzles/:slug/resetRateLimit",
    body: z.object({
      teamIds: z.union([z.array(z.number()), z.literal("all")]),
    }),
    responses: {
      200: InternalActivityLogSchema,
    },
  },
  unlockHints: {
    method: "POST",
    path: "/admin/puzzles/:slug/unlock-hints",
    body: z.object({ minimumUnlockHours: z.number() }),
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
  markGateSatistfied: {
    method: "POST",
    path: "/admin/gates/:gateId/satisfy",
    body: z.object({
      teamIds: z.union([z.array(z.number()), z.literal("all")]),
    }),
    responses: {
      200: InternalActivityLogSchema,
    },
  },
  createFermitSession: {
    method: "POST",
    path: "/admin/fermit/create-session",
    body: z.object({ title: z.string() }),
    responses: {
      200: FermitSessionSchema,
      500: z.null(),
    },
    summary: "Create a deserted-ninja session",
  },
  updateFermitSession: {
    method: "POST",
    path: "/admin/fermit/update-session/:sessionId",
    body: FermitSessionSchema,
    responses: {
      200: FermitSessionSchema,
      500: z.null(),
    },
    summary: "Update a deserted-ninja session",
  },
  getFermitSessions: {
    method: "GET",
    path: "/admin/fermit/get-sessions",
    responses: {
      200: FermitSessionSchema.array(),
    },
    summary: "Get all deserted-ninja sessions",
  },
  completeFermitSession: {
    method: "POST",
    path: "/admin/fermit/complete-session/:sessionId",
    body: z.object({}),
    responses: {
      200: FermitSessionSchema,
      400: z.null(),
      404: z.null(),
      500: z.string(),
    },
    summary: "Complete a deserted-ninja session, updating team logs",
  },
  getFermitAnswers: {
    method: "GET",
    path: "/admin/fermit/get-answers/:sessionId",
    responses: {
      200: FermitAnswerSchema.array(),
    },
    summary: "Get deserted-ninja answers for a session (all teams)",
  },
  saveFermitAnswers: {
    method: "POST",
    path: "/admin/fermit/save-answers/:sessionId",
    body: FermitAnswerSchema.array(),
    responses: {
      200: z.boolean(),
      400: z.string(),
      404: z.null(),
    },
    summary: "Save a set of deserted-ninja scores",
  },
  createFermitRegistration: {
    method: "POST",
    path: "/admin/fermit/create-registration/:sessionId/:teamId",
    body: z.object({}),
    responses: {
      200: FermitRegistrationSchema.array(),
    },
    summary: "Register a team for a deserted-ninja session",
  },
  deleteFermitRegistration: {
    method: "POST",
    path: "/admin/fermit/delete-registration/:sessionId/:teamId",
    body: z.object({}),
    responses: {
      200: FermitRegistrationSchema.array(),
      404: z.null(),
    },
    summary: "Unregister a team for a deserted-ninja session",
  },
  updateFermitRegistration: {
    method: "POST",
    path: "/admin/fermit/update-registration/:sessionId/:teamId",
    body: z.object({ status: z.string() }),
    responses: {
      200: FermitRegistrationSchema.array(),
      404: z.null(),
    },
    summary: "Unregister a team for a deserted-ninja session",
  },
  issueErratum: {
    method: "POST",
    path: "/admin/puzzles/:slug/issueErratum",
    body: z.object({}),
    responses: {
      200: InternalActivityLogSchema,
    },
  },
});
