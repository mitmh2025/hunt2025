import { z } from "zod";

export const EntityTypeSchema = z.enum([
  "TENANT",
  "TENANT_PROFILE",
  "CUSTOMER",
  "USER",
  "DASHBOARD",
  "ASSET",
  "DEVICE",
  "DEVICE_PROFILE",
  "ASSET_PROFILE",
  "ALARM",
  "RULE_CHAIN",
  "RULE_NODE",
  "EDGE",
  "ENTITY_VIEW",
  "WIDGETS_BUNDLE",
  "WIDGET_TYPE",
  "API_USAGE_STATE",
  "TB_RESOURCE",
  "OTA_PACKAGE",
  "RPC",
  "QUEUE",
  "QUEUE_STATS",
  "NOTIFICATION",
  "NOTIFICATION_REQUEST",
  "NOTIFICATION_RULE",
  "NOTIFICATION_TARGET",
  "NOTIFICATION_TEMPLATE",
  "OAUTH2_CLIENT",
  "DOMAIN",
  "MOBILE_APP_BUNDLE",
  "MOBILE_APP",
]);

export const AttributeScopeSchema = z.enum([
  "CLIENT_SCOPE",
  "SERVER_SCOPE",
  "SHARED_SCOPE",
]);

export const PageLinkSchema = z.object({
  pageSize: z.number(),
  page: z.number(),
  textSearch: z.string().optional(),
  sortOrder: z.enum(["ASC", "DESC"]).optional(),
});

export const PageDataSchema = <S extends z.ZodTypeAny>(itemSchema: S) =>
  z.object({
    data: z.array(itemSchema).optional(),
    totalPages: z.number().optional(),
    totalElements: z.number().optional(),
    hasNext: z.boolean().optional(),
  });

export const ThingsboardErrorResponseSchema = z.object({
  status: z.number(),
  message: z.string(),
  errorCode: z.number(),
  timestamp: z.number(),
});
export type ThingsboardErrorResponse = z.output<
  typeof ThingsboardErrorResponseSchema
>;

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
