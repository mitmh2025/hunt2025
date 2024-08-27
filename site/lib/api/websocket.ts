import { z } from "zod";

// All messages from the client expect an rpc ID
const RPCBase = z.object({
  rpc: z.number(),
});

export const DatasetSchema = z.enum([
  "navbar",
  "team_state",
  "paper_trail",
  "shadow_diamond",
  "stakeout",
  "illegal_search_painting2",
  "illegal_search_rug",
  "illegal_search_cryptex",
  "illegal_search_bookcase",
  "background_check",
  "dev",
]);
export type Dataset = z.infer<typeof DatasetSchema>;

export const MessageFromClientSchema = z.discriminatedUnion("method", [
  // Request future updates push down the associated dataset.
  RPCBase.merge(
    z.object({
      method: z.literal("sub"),
      subId: z.string().length(16), // client picks the sub name
      dataset: DatasetSchema,
    }),
  ),
  // Cease sending updates for the specified dataset.
  RPCBase.merge(
    z.object({
      method: z.literal("unsub"),
      subId: z.string(),
    }),
  ),
]);
export type MessageFromClient = z.infer<typeof MessageFromClientSchema>;

export const MessageToClientSchema = z.discriminatedUnion("type", [
  // Sent as an initial message from server to client.
  z.object({
    type: z.literal("hello"),
    connId: z.string(),
    scriptUrl: z.string(),
  }),

  // Failure reply to whatever RPC was invoked.
  RPCBase.merge(z.object({ type: z.literal("fail"), error: z.string() })),
  // sub `subId` is ready.
  RPCBase.merge(z.object({ type: z.literal("sub"), subId: z.string() })),
  // sub `subId` will no longer send updates.
  RPCBase.merge(z.object({ type: z.literal("unsub"), subId: z.string() })),

  // Sent when an update to teamState should be pushed down to client.
  z.object({
    type: z.literal("update"),
    subId: z.string(),
    value: z.unknown(),
  }),
  // TODO: ping/pong?
]);
export type MessageToClient = z.infer<typeof MessageToClientSchema>;

// These types are used for messages to and from the SharedWorker
export type MessageToWorker =
  | {
      type: "sub";
      subId: string;
      dataset: Dataset;
    }
  | {
      type: "unsub";
      subId: string;
    }
  | {
      // Tabs will generate a random lock name, acquire it, and never release it.
      // The shared worker will attempt to acquire the lock, and if it ever
      // succeeds, it will consider the MessagePort on which this message
      // arrived dead, and drop the associated subscriptions.
      type: "bind";
      lock: string;
    }
  | {
      type: "set_initial_script_url";
      initialScriptUrl: string;
    };

export type MessageFromWorker =
  | {
      type: "update";
      subId: string;
      value: object;
    }
  | {
      type: "debug";
      value: string;
    }
  | {
      type: "new_script_url";
      scriptUrl: string;
    };
