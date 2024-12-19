import { type RawData, type WebSocket } from "ws";
import { z } from "zod";
import {
  AttributeScopeSchema,
  EntityTypeSchema,
  PageDataSchema,
  PageLinkSchema,
  ThingsboardError,
} from "./tbtypes";

const AggregationTypeSchema = z.enum([
  "MIN",
  "MAX",
  "AVG",
  "SUM",
  "COUNT",
  "NONE",
]);

const EntityKeyTypeSchema = z.enum([
  "ATTRIBUTE",
  "CLIENT_ATTRIBUTE",
  "SHARED_ATTRIBUTE",
  "SERVER_ATTRIBUTE",
  "TIME_SERIES",
  "ENTITY_FIELD",
  "ALARM_FIELD",
  "CONSTANT",
  "COUNT",
]);

const BaseWebsocketCmdSchema = z.object({
  cmdId: z.number(),
});

const BaseSubscriptionCmdSchema = BaseWebsocketCmdSchema.extend({
  keys: z.string().optional(),
  entityType: EntityTypeSchema.optional(),
  entityId: z.string().optional(),
  scope: AttributeScopeSchema.optional(),
  unsubscribe: z.boolean().optional(),
});

const EntityIdSchema = z.object({
  id: z.string(),
  entityType: EntityTypeSchema,
});

const EntityFilterSchema = z.discriminatedUnion("type", [
  z.object({
    type: z.literal("singleEntity"),
    singleEntity: EntityIdSchema,
  }),
  z.object({
    type: z.literal("entityType"),
    entityType: EntityTypeSchema,
  }),
]);

const WebsocketCmdSchema = z.discriminatedUnion("type", [
  BaseSubscriptionCmdSchema.extend({
    type: z.literal("ATTRIBUTES"),
  }),
  BaseSubscriptionCmdSchema.extend({
    type: z.literal("TIMESERIES"),
    startTs: z.number(),
    timeWindow: z.number(),
    interval: z.number(),
    limit: z.number(),
    agg: AggregationTypeSchema,
  }),
  BaseSubscriptionCmdSchema.extend({
    type: z.literal("ENTITY_DATA"),
    query: z.object({
      entityFilter: EntityFilterSchema,
      pageLink: PageLinkSchema,
      entityFields: z
        .array(
          z.object({
            type: EntityKeyTypeSchema,
            key: z.string(),
          }),
        )
        .optional(),
      // latestValues?: [],
      // keyFilters: [],
    }),
  }),
]);

type WebsocketCmd = z.infer<typeof WebsocketCmdSchema>;

const CmdUpdateTypeSchema = z.enum([
  "ENTITY_DATA",
  "ALARM_DATA",
  "ALARM_COUNT_DATA",
  "ALARM_STATUS",
  "COUNT_DATA",
  "NOTIFICATIONS_COUNT",
  "NOTIFICATIONS",
]);

const CmdUpdateMsgSchema = z.object({
  cmdId: z.number(),
  errorCode: z.number(),
  errorMsg: z.string().nullable(),
  cmdUpdateType: CmdUpdateTypeSchema,
});

const BaseDataUpdateMsgSchema = <S extends z.ZodTypeAny>(itemSchema: S) =>
  CmdUpdateMsgSchema.extend({
    data: PageDataSchema(itemSchema).optional(),
    update: z.array(itemSchema).nullable(),
  });

const TsValueSchema = z.object({
  ts: z.number(),
  value: z.string(),
  count: z.number().optional(),
});

const ComparisonTsValueSchema = z.object({
  current: TsValueSchema.optional(),
  previous: TsValueSchema.optional(),
});

const EntityDataSchema = z.object({
  entityId: EntityIdSchema,
  latest: z.record(z.record(TsValueSchema)),
  timeseries: z.record(z.array(TsValueSchema)),
  aggLatest: z.record(z.number(), ComparisonTsValueSchema),
});

const EntityDataUpdateMsgSchema = BaseDataUpdateMsgSchema(
  EntityDataSchema,
).extend({
  cmdUpdateType: z.literal("ENTITY_DATA"),
});

const WsUpdateMsgSchema = EntityDataUpdateMsgSchema;
type WsUpdateMsg = z.output<typeof WsUpdateMsgSchema>;
// or TelemetrySubscriptionUpdateMsg

type OmitUnion<Type, Keys> = {
  [Property in keyof Type as Exclude<Property, Keys>]: Type[Property];
};

export class SubscriptionClient {
  private _ws: WebSocket;
  private _commands: Map<
    number,
    {
      resolve: (result: WsUpdateMsg) => void;
      reject: (err: Error) => void;
    }
  >;
  private _cmdId: number;

  constructor(ws: WebSocket) {
    this._ws = ws;
    this._commands = new Map();
    this._cmdId = 1;
    this._ws.on("message", this._handleMessage.bind(this));
  }

  _handleMessage(data: RawData) {
    let msg;
    try {
      const str =
        data instanceof Buffer
          ? data.toString()
          : data instanceof ArrayBuffer
            ? new TextDecoder().decode(data)
            : data.map((b) => b.toString()).join("");
      msg = WsUpdateMsgSchema.parse(JSON.parse(str));
    } catch (e: unknown) {
      console.warn("failed to process WebSocket message", msg, e);
      return;
    }
    console.log("got message", msg);
    const { cmdId } = msg;
    const callbacks = this._commands.get(cmdId);
    if (!callbacks) {
      console.warn(`unexpected reply for cmdId ${cmdId}`);
      return;
    }
    this._commands.delete(cmdId);
    const { resolve, reject } = callbacks;
    if (msg.errorCode === 0) {
      resolve(msg);
    } else {
      reject(
        new ThingsboardError({
          status: 0,
          timestamp: 0,
          errorCode: msg.errorCode,
          message: msg.errorMsg ?? "",
        }),
      );
    }
  }

  async sendCommand(cmd: OmitUnion<WebsocketCmd, "cmdId">) {
    const cmdId = this._cmdId++;
    return await new Promise((resolve, reject) => {
      this._commands.set(cmdId, { resolve, reject });
      this._ws.send(
        JSON.stringify({
          cmds: [{ cmdId, ...cmd }],
        }),
      );
    });
  }
}
