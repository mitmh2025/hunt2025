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

export type EntityId = z.infer<typeof EntityIdSchema>;

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

export type EntityFilter = z.input<typeof EntityFilterSchema>;

const EntityKeySchema = z.object({
  type: EntityKeyTypeSchema,
  key: z.string(),
});

export type EntityKey = z.input<typeof EntityKeySchema>;

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
  latest: z.record(EntityKeyTypeSchema, z.record(TsValueSchema)),
  timeseries: z.record(z.array(TsValueSchema)).nullable(),
  aggLatest: z.record(z.number(), ComparisonTsValueSchema).nullable(),
});

export type EntityData = z.infer<typeof EntityDataSchema>;

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

type CommandHandler =
  | {
      resolve: (result: WsDataMsg) => void;
      reject: (err: Error) => void;
      sub?: (result: WsDataMsg) => void;
    }
  | {
      sub: (result: WsDataMsg) => void;
    };

export class SubscriptionClient {
  private _ws: WebSocket;
  private _commands: Map<number, CommandHandler>;
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
      if ("resolve" in callbacks) {
        const { resolve, reject, sub } = callbacks;
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
        if (sub) {
          this._commands.set(cmdId, { sub });
        }
      } else {
        callbacks.sub(msg);
      }
    }
  }

  async sendCommand(
    cmd: OmitUnion<WebsocketCmd, "cmdId">,
    onMsg?: (msg: WsDataMsg) => void,
  ) {
    const cmdId = this._cmdId++;
    return await new Promise((resolve, reject) => {
      this._commands.set(cmdId, { resolve, reject, sub: onMsg });
      const data = JSON.stringify({
        cmds: [{ cmdId, ...cmd }],
      });
      console.log("sent", data);
      this._ws.send(data);
    });
  }

  async subscribeTelemetry(
    entityFilter: EntityFilter,
    keys: EntityKey[],
    onUpdate: (data: EntityData) => void,
  ) {
    const initial = await this.sendCommand(
      {
        type: "ENTITY_DATA",
        query: {
          entityFilter,
          pageLink: {
            pageSize: 1000,
            page: 0,
          },
          latestValues: keys,
        },
        latestCmd: {
          keys,
        },
      },
      (msg: WsDataMsg) => {
        if (
          "cmdUpdateType" in msg &&
          msg.cmdUpdateType === "ENTITY_DATA" && // eslint-disable-line @typescript-eslint/no-unnecessary-condition -- will be more types soon
          msg.update
        ) {
          for (const update of msg.update) {
            onUpdate(update);
          }
        }
      },
    );
    return initial;
  }
}
