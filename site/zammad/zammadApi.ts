import { initContract } from "@ts-rest/core";
import { z } from "zod";

const ZammadTicketStateSchema = z.object({
  id: z.number(),
  name: z.string(),
});

const ZammadOrganizationSchema = z.object({
  id: z.number(),
  name: z.string(),
  active: z.boolean(),
  team_id_num: z.number().nullable(),
  team_name: z.string().nullable(),
  team_username: z.string().nullable(),
  team_on_campus: z.boolean().nullable(),
  people_total: z.number().nullable(),
  people_undergrad: z.number().nullable(),
  people_grad: z.number().nullable(),
  people_alum: z.number().nullable(),
  people_staff: z.number().nullable(),
  people_affiliates: z.number().nullable(),
  people_on_campus: z.number().nullable(),
});

const ZammadUserSchema = z.object({
  id: z.number(),
  firstname: z.string(),
  lastname: z.string(),
  organization_id: z.number().nullable(),
  email: z.string(),
  phone: z.string(),
});

const ZammadGroupSchema = z.object({
  id: z.number(),
  name: z.string(),
  follow_up_possible: z.enum(["yes", "new_ticket"]),
});
export type ZammadGroupType = z.infer<typeof ZammadGroupSchema>;

// Ticket articles are pretty bare for our purposes; the only useful piece of
// information for synchronization is the ticket ID for cross-referencing, and
// the article ID for tracking our high water mark
//
// (We'll need to revisit this when we get to hints as well as touchpoints)
const ZammadTicketArticleSchema = z.object({
  id: z.number(),
  sender_id: z.number(),
  ticket_id: z.number(),
  body: z.string(),
  updated_at: z.string(),
});

export type ZammadTicketArticleType = z.infer<typeof ZammadTicketArticleSchema>;

const ZammadTicketSchemaCommon = z.object({
  id: z.number(),
  group_id: z.number(),
  state_id: z.number(),
  customer_id: z.number(),
  title: z.string(),
  article: z
    .object({
      type: z.enum(["email", "web", "note"]),
      internal: z.boolean(),
      body: z.string(),
    })
    .optional(),
  touchpoint_type: z.string().nullable(),
  touchpoint_slug: z.string().nullable(),
  interaction_slug: z.string().nullable(),
  hint_puzzle_slug: z.string().nullable(),
  hint_last_request_entry: z.number().nullable(),
  puzzle_slug: z.string().nullable(),
});

const ZammadTicketSchema = ZammadTicketSchemaCommon.extend({
  organization_id: z.number(),
  updated_at: z.string(),
});

const ZammadCreateTicketSchema = ZammadTicketSchemaCommon.partial();

const ZammadSearchTicketSchema = z.object({
  tickets: z.number().array(),
  assets: z.object({
    Ticket: z.record(z.number(), ZammadTicketSchema),
  }),
});

export type ZammadTicketType = z.infer<typeof ZammadTicketSchema>;

const c = initContract();
export const zammadContract = c.router({
  listTicketStates: {
    method: "GET",
    path: "/api/v1/ticket_states",
    query: z.object({
      page: z.number(),
      per_page: z.number(),
    }),
    responses: {
      200: z.array(ZammadTicketStateSchema),
    },
  },
  listOrganizations: {
    method: "GET",
    path: "/api/v1/organizations",
    query: z.object({
      page: z.number(),
      per_page: z.number(),
    }),
    responses: {
      200: z.array(ZammadOrganizationSchema),
    },
  },
  createOrganization: {
    method: "POST",
    path: "/api/v1/organizations",
    body: ZammadOrganizationSchema.omit({ id: true })
      .partial()
      .extend({ name: z.string() }),
    responses: {
      201: ZammadOrganizationSchema,
    },
  },
  updateOrganization: {
    method: "PUT",
    path: "/api/v1/organizations/:id",
    pathParams: z.object({ id: z.number() }),
    body: ZammadOrganizationSchema.omit({ id: true }).partial(),
    responses: {
      200: ZammadOrganizationSchema,
    },
  },
  listUsers: {
    method: "GET",
    path: "/api/v1/users",
    query: z.object({
      page: z.number(),
      per_page: z.number(),
    }),
    responses: {
      200: z.array(ZammadUserSchema),
    },
  },
  // On creation, one of firstname, lastname, email, or phone must be provided
  createUser: {
    method: "POST",
    path: "/api/v1/users",
    body: ZammadUserSchema.omit({ id: true })
      .partial()
      .and(
        z.union([
          z.object({ firstname: z.string() }),
          z.object({ lastname: z.string() }),
          z.object({ email: z.string() }),
          z.object({ phone: z.string() }),
        ]),
      ),
    responses: {
      201: ZammadUserSchema,
    },
  },
  updateUser: {
    method: "PUT",
    path: "/api/v1/users/:id",
    pathParams: z.object({ id: z.number() }),
    body: ZammadUserSchema.omit({ id: true }).partial(),
    responses: {
      200: ZammadUserSchema,
    },
  },
  listGroups: {
    method: "GET",
    path: "/api/v1/groups",
    query: z.object({
      page: z.number(),
      per_page: z.number(),
    }),
    responses: {
      200: z.array(ZammadGroupSchema),
    },
  },
  createGroup: {
    method: "POST",
    path: "/api/v1/groups",
    body: ZammadGroupSchema.omit({ id: true })
      .partial()
      .extend({ name: z.string() }),
    responses: {
      201: ZammadGroupSchema,
    },
  },
  updateGroup: {
    method: "PUT",
    path: "/api/v1/groups/:id",
    pathParams: z.object({ id: z.number() }),
    body: ZammadGroupSchema.omit({ id: true }).partial(),
    responses: {
      200: ZammadGroupSchema,
    },
  },

  // This is a variant on the list endpoint that we're using just to get the
  // total count
  getTicketArticleCount: {
    method: "GET",
    path: "/api/v1/ticket_articles",
    query: z.object({
      per_page: z.literal(0),
      full: z.literal(1),
    }),
    responses: {
      200: z.object({ total_count: z.number() }),
    },
  },
  listTicketArticles: {
    method: "GET",
    path: "/api/v1/ticket_articles",
    query: z.object({
      page: z.number(),
      per_page: z.number(),
      sort_by: z.string().optional(),
      order_by: z.enum(["asc", "desc"]).optional(),
    }),
    responses: {
      200: z.array(ZammadTicketArticleSchema),
    },
  },

  getTicket: {
    method: "GET",
    path: "/api/v1/tickets/:id",
    pathParams: z.object({ id: z.number() }),
    responses: {
      200: ZammadTicketSchema,
      403: z.object({ error: z.string() }),
    },
  },
  createTicket: {
    method: "POST",
    path: "/api/v1/tickets",
    body: ZammadCreateTicketSchema,
    responses: {
      201: ZammadTicketSchema,
    },
  },
  updateTicket: {
    method: "PUT",
    path: "/api/v1/tickets/:id",
    pathParams: z.object({ id: z.number() }),
    body: ZammadTicketSchema.omit({ id: true }).partial(),
    responses: {
      200: ZammadTicketSchema,
    },
  },
  searchTickets: {
    method: "GET",
    path: "/api/v1/tickets/search",
    query: z.object({
      sort_by: z.string().optional(),
      order_by: z.enum(["asc", "desc"]).optional(),
      page: z.number(),
      per_page: z.number(),
    }),
    responses: {
      200: ZammadSearchTicketSchema,
    },
  },
});
