import {
  type InitClientArgs,
  initClient,
  type InitClientReturn,
  initContract,
  type ApiFetcherArgs,
  tsRestFetchApi,
  type ClientInferResponseBody,
} from "@ts-rest/core";
import { z } from "zod";

const c = initContract();

export const ThingsboardErrorResponseSchema = z.object({
  status: z.number(),
  message: z.string(),
  errorCode: z.number(),
  timestamp: z.number(),
});

type ThingsboardErrorResponse = z.output<typeof ThingsboardErrorResponseSchema>;

const PageDataSchema = <S extends z.ZodTypeAny>(itemSchema: S) =>
  z.object({
    data: z.array(itemSchema).optional(),
    totalPages: z.number().optional(),
    totalElements: z.number().optional(),
    hasNext: z.boolean().optional(),
  });

const IdSchema = <T extends string>(type: T) =>
  z.object({
    id: z.string().uuid(),
    entityType: z.enum([type]).default(type),
  });

const ContactBasedSchema = z.object({
  country: z.string().nullable().optional(),
  state: z.string().nullable().optional(),
  city: z.string().nullable().optional(),
  address: z.string().nullable().optional(),
  address2: z.string().nullable().optional(),
  zip: z.string().nullable().optional(),
  phone: z.string().nullable().optional(),
  email: z.string().email().nullable().optional(),
});

const CustomerSchema = ContactBasedSchema.extend({
  id: IdSchema("CUSTOMER").optional(),
  createdTime: z.number(), // milliseconds, readOnly
  title: z.string(),
  tenantId: IdSchema("TENANT").optional(),
  version: z.number(),
  name: z.string().optional(), // readOnly
  additionalInfo: z.any(),
});

const BaseTenantSchema = ContactBasedSchema.extend({
  id: IdSchema("TENANT").optional(),
  version: z.number().nullable().optional(),
  title: z.string(),
  region: z.string().nullable().optional(),
  tenantProfileId: IdSchema("TENANT_PROFILE").optional(),
  additionalInfo: z.any(),
});

const GetTenantSchema = BaseTenantSchema.required({
  id: true,
  tenantProfileId: true,
}).extend({
  createdTime: z.number(), // milliseconds, readOnly
  name: z.string().optional(), // readOnly, copy of title
});

const BaseUserSchema = z.object({
  id: IdSchema("USER").optional(),
  email: z.string().email(),
  authority: z.enum([
    "SYS_ADMIN",
    "TENANT_ADMIN",
    "CUSTOMER_ADMIN",
    "REFRESH_TOKEN",
    "PRE_VERIFICATION_TOKEN",
  ]),
  firstName: z.string().nullable().optional(),
  lastName: z.string().nullable().optional(),
  phone: z.string().nullable().optional(),
  version: z.number().nullable().optional(),
  tenantId: IdSchema("TENANT").optional(),
  customerId: IdSchema("CUSTOMER").optional(),
});

const GetUserSchema = BaseUserSchema.required({
  id: true,
  tenantId: true,
  customerId: true,
}).extend({
  name: z.string().optional(), // readOnly, copy of email
  additionalInfo: z.any(),
});

const errorResponses = {
  400: ThingsboardErrorResponseSchema,
  401: ThingsboardErrorResponseSchema,
  403: ThingsboardErrorResponseSchema,
  404: ThingsboardErrorResponseSchema,
  429: ThingsboardErrorResponseSchema,
};

type ErrorResponses = {
  status: keyof typeof errorResponses;
  body: z.output<typeof ThingsboardErrorResponseSchema>;
};

const loginContract = c.router({
  login: {
    method: "POST",
    path: `/api/auth/login`,
    body: z.object({
      username: z.string(),
      password: z.string(),
    }),
    responses: {
      200: z.object({
        token: z.string(),
        refreshToken: z.string(),
      }),
      401: ThingsboardErrorResponseSchema.extend({
        errorCode: z.literal(15),
        resetToken: z.string(),
      }).or(ThingsboardErrorResponseSchema),
    },
    strictStatusCodes: true,
  },
  activateUser: {
    method: "POST",
    path: `/api/noauth/activate`,
    query: z.object({
      sendActivationMail: z.enum(["true", "false"]),
    }),
    body: z.object({
      activateToken: z.string(),
      password: z.string(),
    }),
    responses: {
      200: z.object({
        token: z.string(),
        refreshToken: z.string(),
        scope: z.string(),
      }),
      ...errorResponses,
    },
    strictStatusCodes: true,
  },
});

const authContract = c.router({
  getUser: {
    method: "GET",
    path: `/api/auth/user`,
    responses: {
      200: GetUserSchema,
      ...errorResponses,
    },
    strictStatusCodes: true,
  },
  changePassword: {
    method: "POST",
    path: `/api/auth/changePassword`,
    body: z.object({
      currentPassword: z.string(),
      newPassword: z.string(),
    }),
    responses: {
      200: z.object({
        token: z.string(),
        refreshToken: z.string(),
        scope: z.string().optional(),
      }),
      ...errorResponses,
    },
    strictStatusCodes: true,
  },
});

const userContract = c.router({
  list: {
    method: "GET",
    path: `/api/users`,
    query: z.object({
      pageSize: z.number(),
      page: z.number(),
      textSearch: z.string().optional(),
      sortProperty: z
        .enum(["createdTime", "firstName", "lastName", "email"])
        .optional(),
      sortOrder: z.enum(["ASC", "DESC"]).optional(),
    }),
    responses: {
      200: PageDataSchema(GetUserSchema),
      ...errorResponses,
    },
    strictStatusCodes: true,
  },
  listByTenant: {
    method: "GET",
    path: `/api/tenant/:tenantId/users`,
    pathParams: z.object({
      tenantId: z.string().uuid(),
    }),
    query: z.object({
      pageSize: z.number(),
      page: z.number(),
      textSearch: z.string().optional(),
      sortProperty: z
        .enum(["createdTime", "firstName", "lastName", "email"])
        .optional(),
      sortOrder: z.enum(["ASC", "DESC"]).optional(),
    }),
    responses: {
      200: PageDataSchema(GetUserSchema),
      ...errorResponses,
    },
    strictStatusCodes: true,
  },
  save: {
    method: "POST",
    path: `/api/user`,
    query: z.object({
      sendActivationMail: z.enum(["true", "false"]),
    }),
    body: BaseUserSchema,
    responses: {
      200: GetUserSchema,
      ...errorResponses,
    },
    strictStatusCodes: true,
  },
  getActivationLink: {
    method: "GET",
    path: `/api/user/:userId/activationLink`,
    pathParams: z.object({
      userId: z.string().uuid(),
    }),
    responses: {
      200: c.otherResponse({
        contentType: "text/plain",
        body: z.string(),
      }),
      ...errorResponses,
    },
    strictStatusCodes: true,
  },
  getActivationLinkInfo: {
    method: "GET",
    path: `/api/user/:userId/activationLinkInfo`,
    pathParams: z.object({
      userId: z.string().uuid(),
    }),
    responses: {
      200: z.object({
        value: z.string(),
        ttlMs: z.number(),
      }),
      ...errorResponses,
    },
    strictStatusCodes: true,
  },
});

const tenantContract = c.router({
  list: {
    method: "GET",
    path: `/api/tenants`,
    query: z.object({
      pageSize: z.number(),
      page: z.number(),
      textSearch: z.string().optional(),
      sortProperty: z
        .enum([
          "createdTime",
          "title",
          "email",
          "country",
          "state",
          "city",
          "address",
          "address2",
          "zip",
          "phone",
          "email",
        ])
        .optional(),
      sortOrder: z.enum(["ASC", "DESC"]).optional(),
    }),
    responses: {
      200: PageDataSchema(GetTenantSchema),
      ...errorResponses,
    },
    strictStatusCodes: true,
  },
  getById: {
    method: "GET",
    path: `/api/tenant/:tenantId`,
    pathParams: z.object({
      tenantId: z.string().uuid(),
    }),
    responses: {
      200: GetTenantSchema,
      ...errorResponses,
    },
    strictStatusCodes: true,
  },
  save: {
    method: "POST",
    path: `/api/tenant`,
    body: BaseTenantSchema,
    responses: {
      200: GetTenantSchema,
      ...errorResponses,
    },
    strictStatusCodes: true,
  },
});

export type Tenant = ClientInferResponseBody<
  typeof tenantContract.getById,
  200
>;

const customerContract = c.router({
  list: {
    method: "GET",
    path: `/api/customers`,
    query: z.object({
      pageSize: z.number(),
      page: z.number(),
      textSearch: z.string().optional(),
      sortProperty: z
        .enum(["createdTime", "title", "email", "country", "city"])
        .optional(),
      sortOrder: z.enum(["ASC", "DESC"]).optional(),
    }),
    responses: {
      200: PageDataSchema(CustomerSchema),
      ...errorResponses,
    },
    strictStatusCodes: true,
  },
  getById: {
    method: "GET",
    path: `/api/customer/:customerId`,
    pathParams: z.object({
      customerId: z.string().uuid(),
    }),
    responses: {
      200: CustomerSchema,
      ...errorResponses,
    },
    strictStatusCodes: true,
  },
  save: {
    method: "POST",
    path: `/api/customer`,
    body: CustomerSchema,
    responses: {
      200: CustomerSchema,
      ...errorResponses,
    },
    strictStatusCodes: true,
  },
  delete: {
    method: "DELETE",
    path: `/api/customer/:customerId`,
    pathParams: z.object({
      customerId: z.string().uuid(),
    }),
    body: z.undefined(),
    responses: {
      200: z.undefined(),
      ...errorResponses,
    },
    strictStatusCodes: true,
  },
});
export const contract = c.router({
  auth: authContract,
  user: userContract,
  tenant: tenantContract,
  customer: customerContract,
});

function newLoginClient(baseUrl: string) {
  return initClient(loginContract, {
    baseUrl,
  });
}

type PagedQuery<F> = F extends (request: infer R) => unknown
  ? R extends { query: infer Q }
    ? Omit<Q, "pageSize" | "page">
    : never
  : never;

async function getAllPages<I, Q extends { pageSize: number; page: number }>(
  getPage: (request: {
    query: Omit<Q, "pageSize" | "page"> & { pageSize: number; page: number };
  }) => Promise<
    { status: 200; body: { data?: I[]; hasNext?: boolean } } | ErrorResponses
  >,
  query: Omit<Q, "pageSize" | "page">,
): Promise<I[]> {
  const result: I[] = [];
  for (let page = 0; ; page++) {
    const body = await getPage({
      query: {
        ...query,
        pageSize: 100,
        page,
      },
    }).then(check);
    if (body.data) {
      result.push(...body.data);
    }
    if (body.hasNext === false || !body.data) {
      return result;
    }
  }
}

type LoginClient = InitClientReturn<typeof loginContract, InitClientArgs>;
type APIClient = InitClientReturn<typeof contract, InitClientArgs>;

type APIResponse<T> = { status: 200; body: T } | ErrorResponses;

export class ThingsboardError extends Error {
  status: number;
  errorCode: number;
  timestamp: number;

  constructor(response: ThingsboardErrorResponse) {
    super(response.message);
    this.status = response.status;
    this.errorCode = response.errorCode;
    this.timestamp = response.timestamp;
  }
}

export async function check<T>(
  p: PromiseLike<APIResponse<T>> | APIResponse<T>,
): Promise<T> {
  const response = await p;
  if (response.status === 200) {
    return response.body;
  }
  throw new ThingsboardError(response.body);
}

export class Client {
  loginClient: LoginClient;
  client: APIClient;
  protected _token: string | undefined;

  constructor({
    baseUrl,
    username,
    password,
  }: {
    baseUrl: string;
    username: string;
    password: string;
  }) {
    this.loginClient = newLoginClient(baseUrl);
    this.client = initClient(contract, {
      baseUrl,
      validateResponse: true,
      api: async (args: ApiFetcherArgs) => {
        for (;;) {
          if (this._token) {
            const response = await tsRestFetchApi({
              ...args,
              headers: {
                ...args.headers,
                Authorization: `Bearer ${this._token}`,
              },
            });
            if (response.status !== 401) {
              return response;
            }
          }
          this._token = (
            await this.loginClient
              .login({
                body: { username, password },
              })
              .then(check)
          ).token;
        }
      },
    });
  }

  listTenants(query: PagedQuery<APIClient["tenant"]["list"]> = {}) {
    return getAllPages(this.client.tenant.list.bind(this.client.tenant), query);
  }

  listCustomers(query: PagedQuery<APIClient["customer"]["list"]> = {}) {
    return getAllPages(
      this.client.customer.list.bind(this.client.customer),
      query,
    );
  }

  listUsers(query: PagedQuery<APIClient["user"]["list"]> = {}) {
    return getAllPages(this.client.user.list.bind(this.client.user), query);
  }

  listTenantUsers(
    tenantId: string,
    query: PagedQuery<APIClient["user"]["listByTenant"]> = {},
  ) {
    return getAllPages(
      ({ query }) =>
        this.client.user.listByTenant({ params: { tenantId }, query }),
      query,
    );
  }
}
