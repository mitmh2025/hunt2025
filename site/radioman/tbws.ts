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
  z.object({
    type: z.literal("entityList"),
    entityType: EntityTypeSchema,
    entityList: z.array(z.string()),
  }),
]);

const EntityKeySchema = z.object({
  type: EntityKeyTypeSchema,
  key: z.string(),
});

const LatestValueCmdSchema = z.object({
  keys: z.array(EntityKeySchema),
});

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
      // latestValues fetches a single latest value and reports it
      latestValues: z.array(EntityKeySchema).optional(),
      // keyFilters: [],
    }),
    // latestCmd subscribes to updates
    latestCmd: LatestValueCmdSchema.optional(),
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
    data: PageDataSchema(itemSchema).nullable(),
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
  timeseries: z.record(z.array(TsValueSchema)).nullable(),
  aggLatest: z.record(z.number(), ComparisonTsValueSchema).nullable(),
});

const EntityDataUpdateMsgSchema = BaseDataUpdateMsgSchema(
  EntityDataSchema,
).extend({
  cmdUpdateType: z.literal("ENTITY_DATA"),
});

const SubscriptionUpdateMsg = z.object({
  subscriptionId: z.number(),
  errorCode: z.number(),
  errorMsg: z.string(),
  data: z
    .record(
      z.string(),
      z.array(
        z.union([
          z.tuple([z.number(), z.any()]),
          z.tuple([z.number(), z.any(), z.number()]),
        ]),
      ),
    )
    .nullable(),
});

const WebsocketDataMsg = z.union([
  EntityDataUpdateMsgSchema,
  SubscriptionUpdateMsg,
  // EntityCountUpdateMsg | NotificationCountUpdateMsg | NotificationsUpdateMsg
]);
type WsDataMsg = z.output<typeof WebsocketDataMsg>;

type OmitUnion<Type, Keys> = {
  [Property in keyof Type as Exclude<Property, Keys>]: Type[Property];
};

export class SubscriptionClient {
  private _ws: WebSocket;
  private _commands: Map<
    number,
    {
      resolve: (result: WsDataMsg) => void;
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
      console.log("received", str);
      msg = WebsocketDataMsg.parse(JSON.parse(str));
    } catch (e: unknown) {
      console.warn("failed to process WebSocket message", e);
      return;
    }
    console.log("got message", msg);
    if ("cmdId" in msg) {
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
  }

  async sendCommand(cmd: OmitUnion<WebsocketCmd, "cmdId">) {
    const cmdId = this._cmdId++;
    return await new Promise((resolve, reject) => {
      this._commands.set(cmdId, { resolve, reject });
      const data = JSON.stringify({
        cmds: [{ cmdId, ...cmd }],
      });
      console.log("sent", data);
      this._ws.send(data);
    });
  }
}
