import { z } from "zod";

// All messages from the client expect an rpc ID
const RPCBase = z.object({
  rpc: z.number(),
});

export const DatasetSchema = z.enum(["navbar", "stakeout"]);
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
  z.object({ type: z.literal("hello"), connId: z.string() }),

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
