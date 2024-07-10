import { z } from "zod";
import { c, TeamStateSchema } from "./contract";

export const frontendContract = c.router({
  markTeamGateSatisfied: {
    method: "POST",
    path: `/teams/:teamId/:gateId`,
    body: z.object({}),
    responses: {
      200: TeamStateSchema,
      404: z.null(),
    },
  },
});
