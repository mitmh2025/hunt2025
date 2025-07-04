import { z } from "zod";
import { type SocketState } from "../SocketManager";

// All messages from the client expect an rpc ID
const RPCBase = z.object({
  rpc: z.number(),
});

export const DatasetSchema = z.enum([
  "activity_log",
  "all_puzzles",
  "guess_log",
  "hint_log",
  "hub",
  "navbar",
  "team_info",
  "team_registration",
  "team_state",
  "paper_trail",
  "missing_diamond",
  "stakeout",
  "illegal_search_painting2",
  "illegal_search_rug",
  "illegal_search_cryptex",
  "illegal_search_bookcase",
  "background_check",
  "murder_in_mitropolis",
  "stray_leads",
  "dev",
  "puzzle_state_log",
  "events",
  "interaction_state_log",
  "poll_responses",
  "virtual_interaction_state",
  "interaction_link_state",
]);
export type Dataset = z.infer<typeof DatasetSchema>;

export const DatasetParamsSchema = z
  .object({
    slug: z.string(),
    pollId: z.string().optional(),
  })
  .optional();
export type DatasetParams = z.infer<typeof DatasetParamsSchema>;

export const ObjectWithIdSchema = z
  .object({
    id: z.number(),
  })
  .passthrough();
export type ObjectWithId = z.infer<typeof ObjectWithIdSchema>;
export const ObjectWithEpochSchema = z
  .object({
    epoch: z.number(),
  })
  .passthrough();
export type ObjectWithEpoch = z.infer<typeof ObjectWithEpochSchema>;
export const DatasetValueSchema = z.union([
  ObjectWithEpochSchema,
  z.array(ObjectWithIdSchema),
]);
export type DatasetValue = z.infer<typeof DatasetValueSchema>;

export const MessageFromClientSchema = z.discriminatedUnion("method", [
  // Request future updates push down the associated dataset.
  RPCBase.merge(
    z.object({
      method: z.literal("sub"),
      subId: z.string().length(16), // client picks the sub name
      dataset: DatasetSchema,
      params: DatasetParamsSchema,
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
      params: DatasetParams;
      initialValue: DatasetValue;
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
    }
  | {
      type: "connection_state_change";
      state: SocketState;
    };
