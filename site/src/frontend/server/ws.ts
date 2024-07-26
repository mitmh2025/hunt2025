import type { NextFunction, Request } from "express";
import type { WSResponse } from "websocket-express";
import workersManifest from "../../../dist/worker-manifest.json";
import { type TeamState } from "../../../lib/api/client";
import {
  type MessageFromClient,
  type MessageToClient,
  type Dataset,
  MessageFromClientSchema,
} from "../../../lib/api/websocket";
import { genId } from "../../../lib/id";
import { type RedisClient } from "../../app";
import { stakeoutState } from "../rounds/stakeout";
import { devtoolsState } from "./devtools";

type SubscriptionHandler<T> = {
  computeFromTeamState: (teamState: TeamState) => T;
  cachedValue: T;
};

const DATASET_REGISTRY: Record<Dataset, (teamState: TeamState) => object> = {
  dev: (teamState: TeamState) => {
    return devtoolsState(teamState);
  },
  stakeout: (teamState: TeamState) => {
    return stakeoutState(teamState);
  },
  team_state: (teamState: TeamState) => {
    return teamState;
  },
};

class ConnHandler {
  public connId: string;
  private sock: WebSocket;
  private onClose: (connId: string) => void;
  private lastTeamState: TeamState;
  private subs: Map<string, SubscriptionHandler<object>>;

  constructor({
    sock,
    initialTeamState,
    onClose,
  }: {
    sock: WebSocket;
    initialTeamState: TeamState;
    onClose: (connId: string) => void;
  }) {
    this.sock = sock;
    this.lastTeamState = initialTeamState;
    this.onClose = onClose;

    this.connId = genId();
    this.subs = new Map();
    this.sock.addEventListener("message", (e) => {
      // Dispatch inbound message from client
      if (e.data instanceof ArrayBuffer) {
        // we don't currently use binary frames
        this.log("ignoring binary frame:", e.data);
      } else if (typeof e.data === "string") {
        // text frame, handle
        this.log(e.data);
        try {
          const json = JSON.parse(e.data) as unknown as object;
          try {
            const data = MessageFromClientSchema.parse(json);
            this.log("got inbound message", data);
            this.handle(data, e);
          } catch (error) {
            // If the request was at least well-formed JSON and there was an RPC
            // id, try to send a fail message to the client so it can at least
            // flag the error and know that no reply is coming
            if (
              typeof json === "object" &&
              "rpc" in json &&
              typeof json.rpc === "number"
            ) {
              this.send({
                rpc: json.rpc,
                type: "fail",
                error: "invalid request",
              });
            }
            console.log("got invalid request, ignoring:", e.data, error);
          }
        } catch (jsonParseError) {
          console.log(
            "got invalid JSON message, ignoring:",
            e.data,
            jsonParseError,
          );
        }
      }
    });
    this.sock.addEventListener("close", () => {
      this.log("closed");
      this.onClose(this.connId);
    });
  }

  log(...args: unknown[]): void {
    console.log(`ws ${this.connId}:`, ...args);
  }

  send(message: MessageToClient): void {
    this.sock.send(JSON.stringify(message));
  }

  updateTeamState(teamState: TeamState) {
    // Save the new team state.
    this.lastTeamState = teamState;
    // for each sub in subs:
    this.subs.forEach((sub, subId) => {
      // compute the new resulting value
      const newValue = sub.computeFromTeamState(teamState);

      // if the result differs, generate an update message for that sub
      const newValueJSON = JSON.stringify(newValue);
      const oldValueJSON = JSON.stringify(sub.cachedValue);
      if (newValueJSON !== oldValueJSON) {
        // save the new cached value
        sub.cachedValue = newValue;
        // send the update message
        this.send({ subId, type: "update", value: newValue });
      }
    });
  }

  handle(message: MessageFromClient, _e: MessageEvent): void {
    if (message.method === "sub") {
      const { rpc, subId, dataset } = message;
      const handler = DATASET_REGISTRY[dataset];
      if (dataset === "dev" && process.env.NODE_ENV !== "development") {
        this.send({
          rpc,
          type: "fail" as const,
          error: `No dataset "${dataset}" known`,
        });
        return;
      }

      // compute the initial value
      const value = handler(this.lastTeamState);

      // register for updates
      const subHandler: SubscriptionHandler<object> = {
        computeFromTeamState: handler,
        cachedValue: value,
      };
      this.subs.set(subId, subHandler);

      // push down the initial state as an update
      this.send({ subId, type: "update" as const, value });

      // reply with an ack of the sub ID, indicating successful completion of the RPC
      this.send({ rpc, type: "sub" as const, subId });
      return;
    } else {
      const { rpc, subId } = message;
      const sub = this.subs.get(subId);
      if (!sub) {
        this.send({ rpc, type: "fail", error: `No known sub ${subId}` });
      }
      // Remove from the map of subs
      this.subs.delete(subId);
      this.send({ rpc, type: "unsub", subId });
    }
  }
}

export async function getWsHandler(redisClient?: RedisClient) {
  const subscriber = redisClient && redisClient.duplicate();
  if (subscriber) {
    await subscriber.connect();
  }
  const connections = new Map<string, ConnHandler>();
  return async function wsHandler(
    req: Request,
    res: WSResponse,
    next: NextFunction,
  ) {
    if (!req.teamState) {
      // Not logged in.
      next();
      return;
    }
    const ws = await res.accept();
    const connHandler = new ConnHandler({
      sock: ws,
      initialTeamState: req.teamState,
      onClose: (connId: string) => {
        connections.delete(connId);
      },
    });
    // Just a random ID for identifying the connection.
    connections.set(connHandler.connId, connHandler);
    const helloMessage: MessageToClient = {
      type: "hello" as const,
      connId: connHandler.connId,
      scriptUrl: workersManifest["websocket_worker.js"],
    };
    connHandler.send(helloMessage);

    if (subscriber) {
      const teamId = req.teamState.teamId;
      const channel = `team_state.${teamId}`;
      const listener = (message: string, _channel: string) => {
        try {
          const data = JSON.parse(message) as TeamState;
          connHandler.updateTeamState(data);
        } catch (e) {
          if (e instanceof SyntaxError) {
            console.error(
              "received unparseable JSON from Redis",
              channel,
              message,
            );
          }
        }
      };
      await subscriber.subscribe(channel, listener);
      ws.addEventListener("close", () => {
        void subscriber.unsubscribe(channel, listener);
      });
    }
  };
}
