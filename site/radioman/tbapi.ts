import {
  type InitClientArgs,
  initClient,
  type InitClientReturn,
  initContract,
  type ApiFetcherArgs,
  tsRestFetchApi,
  type ClientInferResponseBody,
} from "@ts-rest/core";
import { type ErrorEvent, WebSocket } from "ws";
import { z } from "zod";
import {
  AttributeScopeSchema,
  EntityTypeSchema,
  PageDataSchema,
  PageLinkSchema,
  ThingsboardError,
  ThingsboardErrorResponseSchema,
} from "./tbtypes";
import { SubscriptionClient } from "./tbws";

const c = initContract();

// type PageData<T> = Omit<
//   z.infer<ReturnType<typeof PageDataSchema<z.ZodTypeAny>>>,
//   "data"
// > & {
//   data?: T[];
// };

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

const BaseCustomerSchema = ContactBasedSchema.extend({
  id: IdSchema("CUSTOMER").optional(),
  title: z.string(),
  tenantId: IdSchema("TENANT").optional(),
  version: z.number().nullable().optional(),
  additionalInfo: z.any(),
});

const GetCustomerSchema = BaseCustomerSchema.required({
  id: true,
}).extend({
  createdTime: z.number(), // milliseconds, readOnly
  name: z.string().optional(), // readOnly
});

export type BaseCustomer = z.input<typeof BaseCustomerSchema>;
export type Customer = z.input<typeof GetCustomerSchema>;

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
    query: PageLinkSchema.extend({
      sortProperty: z
        .enum(["createdTime", "firstName", "lastName", "email"])
        .optional(),
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
    query: PageLinkSchema.extend({
      sortProperty: z
        .enum(["createdTime", "firstName", "lastName", "email"])
        .optional(),
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
    query: PageLinkSchema.extend({
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
    query: PageLinkSchema.extend({
      sortProperty: z
        .enum(["createdTime", "title", "email", "country", "city"])
        .optional(),
    }),
    responses: {
      200: PageDataSchema(GetCustomerSchema),
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
      200: GetCustomerSchema,
      ...errorResponses,
    },
    strictStatusCodes: true,
  },
  save: {
    method: "POST",
    path: `/api/customer`,
    body: BaseCustomerSchema,
    responses: {
      200: GetCustomerSchema,
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

const BaseDeviceProfileSchema = z.object({
  id: IdSchema("DEVICE_PROFILE").optional(),
  name: z.string(),
  description: z.string().nullable().optional(),
  image: z.string().url().nullable().optional(),
  type: z.enum(["DEFAULT"]).default("DEFAULT"),
  transportType: z
    .enum(["DEFAULT", "MQTT", "COAP", "LWM2M", "SNMP"])
    .default("DEFAULT"),
  provisionType: z
    .enum([
      "DISABLED",
      "ALLOW_CREATE_NEW_DEVICES",
      "CHECK_PRE_PROVISIONED_DEVICES",
      "X509_CERTIFICATE_CHAIN",
    ])
    .optional(),
  defaultRuleChainId: IdSchema("RULE_CHAIN").nullable().optional(),
  defaultDashboardId: IdSchema("DASHBOARD").nullable().optional(),
  defaultQueueName: z.string().nullable().optional(),
  provisionDeviceKey: z.string().nullable().optional(),
  firmwareId: IdSchema("OTA_PACKAGE").nullable().optional(),
  softwareId: IdSchema("OTA_PACKAGE").nullable().optional(),
  defaultEdgeRuleChainId: IdSchema("RULE_CHAIN").nullable().optional(),
  default: z.boolean().nullable().optional(),
  profileData: z.object({
    configuration: z
      .object({
        type: z.literal("DEFAULT"),
      })
      .nullable()
      .optional(),
    transportConfiguration: z.object({
      type: z.literal("DEFAULT"),
    }),
    provisionConfiguration: z.any(),
    alarms: z.any(),
  }),
  version: z.number().nullable().optional(),
});

const GetDeviceProfileSchema = BaseDeviceProfileSchema.required({
  id: true,
}).extend({
  tenantId: IdSchema("TENANT"),
  createdTime: z.number(), // milliseconds, readOnly
});

const deviceProfileContract = c.router({
  list: {
    method: "GET",
    path: `/api/deviceProfiles`,
    query: PageLinkSchema.extend({
      sortProperty: z
        .enum([
          "createdTime",
          "name",
          "type",
          "transportType",
          "description",
          "isDefault",
        ])
        .optional(),
    }),
    responses: {
      200: PageDataSchema(GetDeviceProfileSchema),
      ...errorResponses,
    },
    strictStatusCodes: true,
  },
  getById: {
    method: "GET",
    path: `/api/deviceProfile/:deviceProfileId`,
    pathParams: z.object({
      deviceProfileId: z.string().uuid(),
    }),
    query: z.object({
      inlineImages: z.enum(["true", "false"]).optional(),
    }),
    responses: {
      200: GetDeviceProfileSchema,
      ...errorResponses,
    },
    strictStatusCodes: true,
  },
  save: {
    method: "POST",
    path: `/api/deviceProfile`,
    body: BaseDeviceProfileSchema,
    responses: {
      200: GetDeviceProfileSchema,
      ...errorResponses,
    },
    strictStatusCodes: true,
  },
  delete: {
    method: "DELETE",
    path: `/api/deviceProfile/:deviceProfileId`,
    pathParams: z.object({
      deviceProfileId: z.string().uuid(),
    }),
    body: z.undefined(),
    responses: {
      200: z.undefined(),
      ...errorResponses,
    },
    strictStatusCodes: true,
  },
});

export const telemetryContract = c.router({
  saveEntityAttributes: {
    method: "POST",
    path: `/api/plugins/telemetry/:entityType/:entityId/attributes/:scope`,
    pathParams: z.discriminatedUnion("entityType", [
      z.object({
        entityType: z.literal("DEVICE"),
        entityId: z.string().uuid(),
        scope: z.enum(["SERVER_SCOPE", "SHARED_SCOPE"]),
      }),
      z.object({
        entityType: EntityTypeSchema.exclude(["DEVICE"]),
        entityId: z.string().uuid(),
        scope: z.literal("SERVER_SCOPE"),
      }),
    ]),
    body: z.record(z.string(), z.any()),
    responses: {
      200: c.noBody(),
      ...errorResponses,
    },
    strictStatusCodes: true,
  },
  getAttributesByScope: {
    method: "GET",
    path: `/api/plugins/telemetry/:entityType/:entityId/values/attributes/:scope`,
    pathParams: z.discriminatedUnion("entityType", [
      z.object({
        entityType: z.literal("DEVICE"),
        entityId: z.string().uuid(),
        scope: AttributeScopeSchema,
      }),
      z.object({
        entityType: EntityTypeSchema.exclude(["DEVICE"]),
        entityId: z.string().uuid(),
        scope: z.literal("SERVER_SCOPE"),
      }),
    ]),
    query: z.object({
      keys: z.array(z.string()).optional(),
    }),
    responses: {
      200: z.array(
        z.object({
          key: z.string(),
          value: z.any(),
          lastUpdateTs: z.number(), // millis
        }),
      ),
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
  deviceProfile: deviceProfileContract,
  telemetry: telemetryContract,
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
  private _baseUrl: string;
  private _username: string;
  private _password: string;

  constructor({
    baseUrl,
    username,
    password,
  }: {
    baseUrl: string;
    username: string;
    password: string;
  }) {
    this._baseUrl = baseUrl;
    this._username = username;
    this._password = password;
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
          await this.refreshToken();
        }
      },
    });
  }

  private async refreshToken() {
    this._token = (
      await this.loginClient
        .login({
          body: {
            username: this._username,
            password: this._password,
          },
        })
        .then(check)
    ).token;
  }

  async connectWS() {
    const url = new URL(this._baseUrl);
    url.protocol = url.protocol === "https:" ? "wss:" : "ws:";
    url.pathname = "/api/ws";
    await this.refreshToken();
    const ws = new WebSocket(url.href);
    await new Promise<void>((resolve, reject) => {
      const err = new Error("timeout waiting for command responses");
      const timer = setTimeout(reject, 10000, err);

      const onOpen = () => {
        clearTimeout(timer);
        ws.removeEventListener("open", onOpen);
        ws.removeEventListener("error", onError);
        resolve();
      };
      const onError = (err: ErrorEvent) => {
        clearTimeout(timer);
        ws.removeEventListener("open", onOpen);
        ws.removeEventListener("error", onError);
        reject(err); // eslint-disable-line @typescript-eslint/prefer-promise-reject-errors -- we get what we get from WebSocket
      };
      ws.addEventListener("open", onOpen);
      ws.addEventListener("error", onError);
    });
    ws.on("message", (msg) => {
      console.log("received", msg);
    });
    ws.send(
      JSON.stringify({
        authCmd: {
          cmdId: 0,
          token: this._token,
        },
      }),
    );
    return new SubscriptionClient(ws);
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

  listDeviceProfiles(
    query: PagedQuery<APIClient["deviceProfile"]["list"]> = {},
  ) {
    return getAllPages(
      this.client.deviceProfile.list.bind(this.client.deviceProfile),
      query,
    );
  }
}
