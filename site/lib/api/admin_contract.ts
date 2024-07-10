import { z } from "zod";
import { c, PuzzleStateSchema, TeamStateSchema } from "./contract";

const ForcePuzzleStateSchema = z.object({
  visible: z.boolean().optional(),
  unlockable: z.boolean().optional(),
  unlocked: z.boolean().optional(),
});

export const adminContract = c.router({
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
