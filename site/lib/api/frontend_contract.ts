import { z } from "zod";
import { PuzzleDefinitionMetadataSchema } from "../../src/frontend/puzzles/types";
import {
  c,
  TeamHuntStateSchema,
  ActivityLogEntryBaseSchema,
  GuessStatus,
  TeamRegistrationSchema,
  CannedResponseLinkSchema,
  MutableTeamRegistrationSchema,
  SubpuzzleStateSchema,
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
  InternalActivityLogEntryBaseSchema.merge(
    z.object({
      type: z.literal("teams_notified"),
      data: z.object({ message: z.string() }),
    }),
  ),
  InternalActivityLogEntryBaseSchema.merge(
    z.object({ type: z.literal("strong_currency_adjusted") }),
  ),
  InternalActivityLogEntryBaseSchema.merge(
    z.object({ type: z.literal("strong_currency_exchanged") }),
  ),
  InternalActivityLogEntryWithSlug.merge(
    z.object({
      type: z.literal("puzzle_answer_bought"),
      data: z.object({ answer: z.string() }),
    }),
  ),
  InternalActivityLogEntryWithSlug.merge(
    z.object({ type: z.literal("erratum_issued") }),
  ),
  InternalActivityLogEntryWithSlug.merge(
    z.object({
      type: z.literal("puzzle_hint_requested"),
      data: z.object({ request: z.string().max(2500) }),
    }),
  ),
  InternalActivityLogEntryWithSlug.merge(
    z.object({
      type: z.literal("puzzle_hint_responded"),
      data: z.object({
        response: z.string(),
        zammad_article_id: z.number(),
      }),
    }),
  ),
  InternalActivityLogEntryWithSlug.merge(
    z.object({
      type: z.literal("team_hints_unlocked"),
      data: z.object({ hints_available_at: z.string().datetime() }),
    }),
  ),
  // Entry types below this point do not appear in the team-visible activity log.
  InternalActivityLogEntryWithSlug.merge(
    z.object({
      type: z.literal("puzzle_guess_submitted"),
      data: z.object({
        canonical_input: z.string(),
        link: CannedResponseLinkSchema.optional(),
        status: GuessStatus,
        response: z.string(),
      }),
    }),
  ),
  InternalActivityLogEntryWithSlug.merge(
    z.object({
      type: z.literal("global_hints_unlocked"),
      data: z.object({ minimum_unlock_hours: z.number() }),
    }),
  ),
]);
export type InternalActivityLogEntry = z.output<
  typeof InternalActivityLogEntrySchema
>;
export type DehydratedInternalActivityLogEntry = z.input<
  typeof InternalActivityLogEntrySchema
>;
export const InternalActivityLogSchema = z.array(
  InternalActivityLogEntrySchema,
);

const TeamRegistrationLogEntryBaseSchema = z.object({
  id: z.number(),
  team_id: z.number(),
  timestamp: z.string().datetime().pipe(z.coerce.date()),
});

export const TeamRegistrationLogEntrySchema = z.discriminatedUnion("type", [
  TeamRegistrationLogEntryBaseSchema.merge(
    z.object({
      type: z.literal("team_registered"),
      data: TeamRegistrationSchema,
    }),
  ),
  TeamRegistrationLogEntryBaseSchema.merge(
    z.object({
      type: z.literal("team_name_changed"),
      data: TeamRegistrationSchema.pick({ name: true }),
    }),
  ),
  TeamRegistrationLogEntryBaseSchema.merge(
    z.object({
      type: z.literal("team_registration_updated"),
      data: MutableTeamRegistrationSchema.omit({ name: true }),
    }),
  ),
  TeamRegistrationLogEntryBaseSchema.merge(
    z.object({
      type: z.literal("team_deactivated"),
      data: z.object({}),
    }),
  ),
  TeamRegistrationLogEntryBaseSchema.merge(
    z.object({
      type: z.literal("team_reactivated"),
      data: z.object({}),
    }),
  ),
  TeamRegistrationLogEntryBaseSchema.merge(
    z.object({
      type: z.literal("team_password_change"),
      data: z.object({
        new_password: z.string(),
      }),
    }),
  ),
]);

export type TeamRegistrationLogEntry = z.output<
  typeof TeamRegistrationLogEntrySchema
>;
export type DehydratedTeamRegistrationLogEntry = z.input<
  typeof TeamRegistrationLogEntrySchema
>;
export const TeamRegistrationLogSchema = z.array(
  TeamRegistrationLogEntrySchema,
);

export type MutableTeamRegistration = z.output<
  typeof MutableTeamRegistrationSchema
>;

export const PuzzleStateLogEntrySchema = z.object({
  id: z.number(),
  timestamp: z.string().datetime().pipe(z.coerce.date()),
  team_id: z.number(),
  slug: z.string(),
  data: z.object({}).passthrough(),
});
export type PuzzleStateLogEntry = z.output<typeof PuzzleStateLogEntrySchema>;
export type DehydratedPuzzleStateLogEntry = z.input<
  typeof PuzzleStateLogEntrySchema
>;
export const PuzzleStateLogSchema = z.array(PuzzleStateLogEntrySchema);

export const TeamInteractionStateLogEntrySchema = z.object({
  id: z.number(),
  team_id: z.number(),
  slug: z.string(),
  node: z.string(),
  predecessor: z.string().optional(),
  timestamp: z.string().datetime().pipe(z.coerce.date()),
  graph_state: z.object({}).passthrough(),
});
export type TeamInteractionStateLogEntry = z.output<
  typeof TeamInteractionStateLogEntrySchema
>;
export type DehydratedTeamInteractionStateLogEntry = z.input<
  typeof TeamInteractionStateLogEntrySchema
>;
export const TeamInteractionStateLogSchema = z.array(
  TeamInteractionStateLogEntrySchema,
);

export const AdvanceInteractionFailure = z.object({
  reason: z.enum([
    "no-log", // We were unable to retrieve the interaction log for this team/interaction pair, or it was empty
    "invalid-from-node", // The requested fromNode is a terminal node and the caller should request completeInteraction instead
    "wrong-from-node", // The requested fromNode is, at the time of the request being serviced, no longer the latest node for this team/interaction
    "too-soon", // The request was received before this node's timeout was reached.  We only advance state once the full audio line has had a chance to play back.
  ]),
});

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

export const frontendContract = c.router({
  getPuzzleMetadata: {
    method: "GET",
    path: "/admin/puzzles",
    responses: {
      200: PuzzleAPIMetadataSchema,
    },
    summary: "Get all puzzle metadata",
  },
  markTeamGateSatisfied: {
    method: "POST",
    path: `/teams/:teamId/:gateId`,
    body: z.object({}),
    responses: {
      200: TeamHuntStateSchema,
      404: z.null(),
    },
  },
  startInteraction: {
    method: "POST",
    path: `/teams/:teamId/interactions/:interactionId/start`,
    body: z.object({}),
    responses: {
      200: TeamHuntStateSchema,
      404: z.null(),
    },
  },
  advanceInteraction: {
    method: "POST",
    path: "/teams/:teamId/interactions/:interactionId/advance/:fromNode",
    body: z.object({}),
    responses: {
      200: z.object({}), // TODO: maybe plumb next node through?
      400: AdvanceInteractionFailure, // fromNode exists but is final
      404: z.null(), // invalid interactionId or invalid fromNode
      500: z.string(),
    },
  },
  completeInteraction: {
    method: "POST",
    path: `/teams/:teamId/interactions/:interactionId/complete`,
    body: z.object({}),
    responses: {
      200: TeamHuntStateSchema,
      404: z.null(),
    },
  },
  forceSkipInteraction: {
    method: "POST",
    path: `/teams/:teamId/interactions/:interactionId/skip`,
    body: z.object({}),
    responses: {
      200: TeamHuntStateSchema,
      404: z.null(),
    },
  },
  getFullActivityLog: {
    method: "GET",
    path: "/frontend/log/activity",
    query: z.object({
      since: z.number().optional(),
    }),
    responses: {
      200: InternalActivityLogSchema,
      401: z.null(),
    },
  },
  getFullTeamRegistrationLog: {
    method: "GET",
    path: "/frontend/log/team",
    query: z.object({
      since: z.number().optional(),
    }),
    responses: {
      200: TeamRegistrationLogSchema,
      401: z.null(),
    },
  },
  getFullPuzzleStateLog: {
    method: "GET",
    path: "/frontend/log/puzzle",
    query: z.object({
      since: z.number().optional(),
      team_id: z.number().optional(),
      slug: z.string().optional(),
    }),
    responses: {
      200: PuzzleStateLogSchema,
      401: z.null(),
    },
  },
  getFullTeamInteractionStateLog: {
    method: "GET",
    path: "/frontend/log/interaction",
    query: z.object({
      since: z.number().optional(),
      team_id: z.number().optional(),
      slug: z.string().optional(),
    }),
    responses: {
      200: TeamInteractionStateLogSchema,
      401: z.null(),
    },
  },
  getVotes: {
    method: "GET",
    path: "/teams/:teamId/elections/:slug/:pollId/votes",
    responses: {
      200: z.object({}).passthrough(),
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
  speakNewKetchup: {
    method: "POST",
    path: "/teams/:teamId/puzzles/new-ketchup/speak",
    body: z.object({}),
    responses: {
      200: PuzzleStateLogSchema,
      401: z.null(),
    },
  },
  adFrequencyQuixoticShoe: {
    method: "POST",
    path: "/teams/:teamId/puzzles/quixotic-shoe/adFrequency",
    body: z.object({
      status: z.union([z.literal("plus"), z.literal("minus"), z.null()]),
    }),
    responses: {
      200: PuzzleStateLogSchema,
    },
  },
  respondToHintRequest: {
    method: "POST",
    path: "/teams/:teamId/puzzles/:slug/respondToHintRequest",
    body: z.object({
      response: z.string(),
      zammad_article_id: z.number(),
    }),
    responses: {
      200: TeamHuntStateSchema,
      404: z.null(),
    },
  },
  markSubpuzzleUnlocked: {
    method: "POST",
    path: `/teams/:teamId/subpuzzles/:slug/unlock`,
    body: z.object({}),
    responses: {
      200: SubpuzzleStateSchema,
      404: z.null(),
    },
  },
});
