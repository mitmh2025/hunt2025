// contract.ts

import { initContract } from "@ts-rest/core";
import { parsePhoneNumber, type PhoneNumber } from "libphonenumber-js";
import { z } from "zod";

export const c = initContract();

const slug = z.string();

export const CannedResponseLinkSchema = z.object({
  display: z.string(),
  href: z.string(),
});

export const GuessStatus = z.enum(["correct", "incorrect", "other"]);
export const GuessSchema = z.object({
  id: z.number(),
  canonical_input: z.string(),
  link: CannedResponseLinkSchema.optional(),
  status: GuessStatus,
  response: z.string(),
  timestamp: z.string().datetime(),
});

export const HintSchema = z.discriminatedUnion("type", [
  z.object({
    id: z.number(),
    type: z.literal("puzzle_hint_requested"),
    timestamp: z.string().datetime(),
    data: z.object({
      request: z.string(),
    }),
  }),
  z.object({
    id: z.number(),
    type: z.literal("puzzle_hint_responded"),
    timestamp: z.string().datetime(),
    data: z.object({
      response: z.string(),
    }),
  }),
]);

export const RateLimitStateSchema = z.object({
  retryAfter: z.string().datetime(),
});

export const SubpuzzleStateSchema = z.object({
  answer: z.string().optional(),
  guesses: z.array(GuessSchema).default([]),
});

// Still unsure if we need to be able to return any information about puzzles in the "locked" state.
// We broadly do not care to service requests for puzzles that are neither unlockable nor unlocked.
const PuzzleLockEnum = z
  .enum(["locked", "unlockable", "unlocked"])
  .default("locked");

const PuzzleSummarySchema = z.object({
  round: slug,
  stray: z.boolean().optional(), // If true, this puzzle initially unlocked in stray leads, regardless of its current round assignment.
  // visible implied by existence
  locked: PuzzleLockEnum,
  partially_solved: z.boolean().optional(),
  unlocked_at: z.number().optional(), // epoch at which the puzzle was unlocked
  hints_unlocked_at: z.string().datetime().optional(),
  answer: z.string().optional(),
});

export const PuzzleStateSchema = PuzzleSummarySchema.omit({
  unlocked_at: true,
  hints_unlocked_at: true,
}).extend({
  guesses: z.array(GuessSchema).default([]),
  hints: z.array(HintSchema).default([]),
  epoch: z.number(),
});

const PuzzleSlotSchema = z.object({
  slug: z.string(),
  is_meta: z.boolean().optional(),
});

export const InteractionStateSchema = z.object({
  title: z.string(),
  state: z.enum(["unlocked", "running", "completed"]),
  result: z.string().optional(), // an interaction-specific result which may be reflected elsewhere in the UI
  virtual: z.boolean(),
});

export type InteractionState = z.infer<typeof InteractionStateSchema>;

const RoundStateSchema = z.object({
  title: z.string(),
  slots: z.record(z.string(), PuzzleSlotSchema),
  gates: z.array(z.string()).optional(),
  interactions: z.record(slug, InteractionStateSchema).optional(),
});

export const TeamHuntStateSchema = z.object({
  epoch: z.number(), // The largest value of `id` of the activity_log entries which were processed to produce this TeamState
  currency: z.number(),
  strong_currency: z.number(),
  rounds: z.record(slug, RoundStateSchema),
  puzzles: z.record(slug, PuzzleSummarySchema),
  gates_satisfied: z.array(z.string()),
  outstanding_hint_requests: z.array(z.string()),
  next_interaction: z.string().optional(),
  next_interaction_queued_at: z.string().datetime().optional(),
});

export const TeamStateSchema = z.object({
  teamId: z.number(),
  info: z.object({
    epoch: z.number(),
    teamName: z.string(),
    teamUsername: z.string(),
  }),
  state: TeamHuntStateSchema,
  whepUrl: z.string(),
});

const SubmitGuessSchema = z.object({
  guess: z.string(),
});

const SubmitHintRequestSchema = z.object({
  request: z.string(),
});

export const ActivityLogEntryBaseSchema = z.object({
  id: z.number(),
  team_id: z.number().optional(),
  timestamp: z.string().datetime().pipe(z.coerce.date()),
  currency_delta: z.number(),
  strong_currency_delta: z.number(),
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
    z.object({ type: z.literal("interaction_unlocked"), virtual: z.boolean() }),
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
      show_notification: z.boolean(),
    }),
  ),
  ActivityLogEntryWithSlugAndTitle.merge(
    z.object({ type: z.literal("rate_limits_reset") }),
  ),
  ActivityLogEntryBaseSchema.merge(
    z.object({ type: z.literal("strong_currency_adjusted") }),
  ),
  ActivityLogEntryBaseSchema.merge(
    z.object({ type: z.literal("strong_currency_exchanged") }),
  ),
  ActivityLogEntryWithSlugAndTitle.merge(
    z.object({
      type: z.literal("puzzle_answer_bought"),
      answer: z.string(),
    }),
  ),
  ActivityLogEntryWithSlugAndTitle.merge(
    z.object({ type: z.literal("erratum_issued") }),
  ),
  ActivityLogEntryWithSlugAndTitle.merge(
    z.object({
      type: z.literal("puzzle_hint_requested"),
    }),
  ),
  ActivityLogEntryWithSlugAndTitle.merge(
    z.object({
      type: z.literal("puzzle_hint_responded"),
    }),
  ),
  ActivityLogEntryWithSlugAndTitle.merge(
    z.object({
      type: z.literal("team_hints_unlocked"),
      hints_available_at: z.string().datetime().pipe(z.coerce.date()),
    }),
  ),
  ActivityLogEntryBaseSchema.merge(
    z.object({ type: z.literal("teams_notified"), message: z.string() }),
  ),
]);

export type DehydratedActivityLogEntry = z.input<typeof ActivityLogEntrySchema>;

export const ActivityLogSchema = z.array(ActivityLogEntrySchema);

const LoginRequestSchema = z.object({
  username: z.string(),
  password: z.string(),
});

const LoginResponseSchema = z.object({
  token: z.string(),
});

function zodPhoneNumber() {
  return z.string().transform((val, ctx) => {
    if (!val) {
      return val;
    }

    let parsed: PhoneNumber;
    try {
      parsed = parsePhoneNumber(val, {
        defaultCountry: "US",
        extract: false,
      });
    } catch (e) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Not a valid phone number",
      });
      return z.NEVER;
    }

    if (!parsed.isValid()) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Not a valid phone number",
      });
      return z.NEVER;
    }
    return parsed.number.toString();
  });
}

// Roughly based on 2024 registration form
// MutableTeamRegistrationSchema are the fields we allow to be changed after registration.
export const MutableTeamRegistrationSchema = z.object({
  // Team name must be 1-255 utf-8 characters
  name: z.string().min(1).max(255),
  teamEmail: z.string().email().min(1).max(255),

  // Team contact
  contactName: z.string().min(1).max(255),
  contactEmail: z.string().email(),
  contactPhone: zodPhoneNumber(),
  contactMailingAddress: z.string().min(1).max(255),

  secondaryContactName: z.string().max(255),
  secondaryContactEmail: z.string().email(),
  secondaryContactPhone: zodPhoneNumber(),

  // Team information
  teamGoal: z.string().min(1).max(255),
  teamValues: z.array(z.string().min(1).max(255)).max(5),
  teamValuesOther: z.string().max(255).optional(),
  teamExcitedAboutWinning: z.string().min(1).max(255),
  teamYearEstablished: z.number(),
  teamMemberLocations: z.string().min(1).max(255),

  // Team location
  teamLocation: z.enum(["Fully Remote", "Room Requested", "Room Not Required"]),
  teamLocationDetailsRemote: z.string().max(1024).optional(),
  teamLocationDetailsRoomRequest: z.string().max(1024).optional(),
  teamLocationDetailsNoRoomRequested: z.string().max(1024).optional(),

  // Team composition
  peopleTotal: z.number().min(0),

  peopleUndergrad: z.number().min(0),
  peopleGrad: z.number().min(0),
  peopleAlum: z.number().min(0),
  peopleStaff: z.number().min(0),
  peopleAffiliates: z.number().min(0),
  peopleMinor: z.number().min(0),
  peopleOther: z.number().min(0),

  peopleOnCampus: z.number().min(0),
  peopleRemote: z.number().min(0),

  acceptUnattached: z.boolean(),

  // Other
  referrer: z.string().min(1).max(255),
  referrerOther: z.string().max(255).optional(),
  otherNotes: z.string().max(1024).optional(),
});

export const TeamRegistrationSchema = MutableTeamRegistrationSchema.merge(
  z.object({
    // Username must be 1-32 printable ASCII characters
    username: z
      .string()
      .regex(/^(?=[\x21-\x7e])[\x20-\x7e]+(?<=[\x21-\x7e])$/, {
        message: "Must be printable ASCII and not start or end with space",
      })
      .min(1)
      .max(32),
    // Password must be 8-255 utf-8 charaters
    password: z.string().min(8).max(255),
  }),
);
export type TeamRegistration = z.output<typeof TeamRegistrationSchema>;

export const TeamRegistrationStateSchema = TeamRegistrationSchema.merge(
  z.object({
    epoch: z.number(),
  }),
);
export type TeamRegistrationState = z.output<
  typeof TeamRegistrationStateSchema
>;

export const authContract = c.router({
  login: {
    method: "POST",
    path: `/auth/login`,
    body: LoginRequestSchema,
    responses: {
      200: LoginResponseSchema,
      403: z.object({}),
    },
    summary: "Login to a team",
  },
  createRegistration: {
    method: "PUT",
    path: `/registration`,
    body: TeamRegistrationSchema,
    responses: {
      200: LoginResponseSchema,
    },
  },
  getRegistration: {
    method: "GET",
    path: `/registration`,
    responses: {
      200: TeamRegistrationStateSchema,
    },
  },
  updateRegistration: {
    method: "PATCH",
    path: `/registration`,
    body: MutableTeamRegistrationSchema,
    responses: {
      200: TeamRegistrationStateSchema,
    },
  },
  getJWKS: {
    method: "GET",
    path: `/jwks`,
    responses: {
      200: z.object({
        keys: z.array(
          z.object({
            kty: z.string(),
            kid: z.string().optional(),
            use: z.string().optional(),
            alg: z.string().optional(),
            e: z.string().optional(),
            n: z.string().optional(),
          }),
        ),
      }),
    },
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
  getSubpuzzleState: {
    method: "GET",
    path: `/subpuzzle/:slug`,
    responses: {
      200: SubpuzzleStateSchema,
      404: z.null(),
    },
    summary: "Get the state of one subpuzzle",
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
  submitHintRequest: {
    method: "PUT",
    path: `/puzzle/:slug/requestHint`,
    body: SubmitHintRequestSchema,
    responses: {
      200: PuzzleStateSchema,
      404: z.null(),
    },
  },
  submitSubpuzzleGuess: {
    method: "PUT",
    path: `/subpuzzle/:slug/guess`,
    body: SubmitGuessSchema,
    responses: {
      200: SubpuzzleStateSchema,
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
  exchangeStrongCurrency: {
    method: "POST",
    path: `/exchangeStrongCurrency`,
    body: z.object({}),
    responses: {
      200: z.object({
        currency: z.number(),
      }),
      400: z.object({
        code: z.enum(["INSUFFICIENT_STRONG_CURRENCY"]),
      }),
    },
  },
  buyPuzzleAnswer: {
    method: "POST",
    path: `/puzzle/:slug/buyAnswer`,
    body: z.object({}),
    responses: {
      200: z.object({
        answer: z.string(),
      }),
      400: z.object({
        code: z.enum([
          "INSUFFICIENT_STRONG_CURRENCY",
          "PUZZLE_NOT_UNLOCKED",
          "PUZZLE_ALREADY_SOLVED",
        ]),
      }),
    },
  },
  castVote: {
    method: "POST",
    path: `/polls/:slug/:pollId/votes`,
    body: z.object({
      choice: z.string(),
    }),
    responses: {
      200: z.object({}).passthrough(),
      400: z.null(), // If election slug is not valid
      404: z.null(),
    },
  },
  startVirtualInteractionEarly: {
    method: "POST",
    path: `/interactions/:interactionId/startVirtualEarly`,
    body: z.object({}),
    responses: {
      200: z.object({}),
      404: z.null(),
    },
  },
});
