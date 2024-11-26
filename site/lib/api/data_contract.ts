import { z } from "zod";
import { c } from "./contract";

export const dataContract = c.router({
  getRegistrations: {
    method: "GET",
    path: `/data/registrations`,
    responses: {
      200: c.otherResponse({
        contentType: "text/csv",
        body: z.string(),
      }),
    },
    summary: "Get a CSV of all team registrations",
  },
});
