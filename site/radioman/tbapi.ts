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
  status: z.number().optional(),
  message: z.string().optional(),
  errorCode: z.number().optional(),
  timestamp: z.number().optional(),
});

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

const CustomerSchema = z.object({
  id: IdSchema("CUSTOMER").optional(),
  createdTime: z.number(), // milliseconds, readOnly
  country: z.string().optional(),
  state: z.string().optional(),
  city: z.string().optional(),
  address: z.string().optional(),
  address2: z.string().optional(),
  zip: z.string().optional(),
  phone: z.string().optional(),
  email: z.string().email(),
  title: z.string(),
  tenantId: IdSchema("TENANT").optional(),
  version: z.number(),
  name: z.string().optional(), // readOnly
  additionalInfo: z.any(),
});

const BaseTenantSchema = z.object({
  id: IdSchema("TENANT").optional(),
  version: z.number().nullable().optional(),
  country: z.string().nullable().optional(),
  state: z.string().nullable().optional(),
  city: z.string().nullable().optional(),
  address: z.string().nullable().optional(),
  address2: z.string().nullable().optional(),
  zip: z.string().nullable().optional(),
  phone: z.string().nullable().optional(),
  email: z.string().email().nullable().optional(),
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
export const authContract = c.router({
  tenant: tenantContract,
  customer: customerContract,
});

function newLoginClient(baseUrl: string) {
  return initClient(loginContract, {
    baseUrl,
  });
}

type PagedQuery<F> = F extends ({ query }: { query: infer Q }) => unknown
  ? Omit<Q, "pageSize" | "page">
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
    const response = await getPage({
      query: {
        ...query,
        pageSize: 100,
        page,
      },
    });
    if (response.status === 200) {
      if (response.body.data) {
        result.push(...response.body.data);
      }
      if (response.body.hasNext === false || !response.body.data) {
        return result;
      }
    } else {
      throw new Error(`failed to list: ${response.body.message}`);
    }
  }
}

type LoginClient = InitClientReturn<typeof loginContract, InitClientArgs>;
type APIClient = InitClientReturn<typeof authContract, InitClientArgs>;

type APIResponse<T> = { status: 200; body: T } | ErrorResponses;

export async function check<T>(
  p: PromiseLike<APIResponse<T>> | APIResponse<T>,
): Promise<T> {
  const response = await p;
  if (response.status === 200) {
    return response.body;
  }
  throw new Error(`API call failed: ${response.body.message}`);
}

export class Client {
  private _loginClient: LoginClient;
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
    this._loginClient = newLoginClient(baseUrl);
    this.client = initClient(authContract, {
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
          const response = await this._loginClient.login({
            body: { username, password },
          });
          if (response.status === 200) {
            this._token = response.body.token;
          } else {
            throw new Error(response.body.message);
          }
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
}
