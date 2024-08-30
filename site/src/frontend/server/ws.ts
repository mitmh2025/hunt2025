import type { NextFunction, Request } from "express";
import type { WSResponse } from "websocket-express";
import workersManifest from "../../../dist/worker-manifest.json";
import { type TeamState } from "../../../lib/api/client";
import { type FrontendClient } from "../../../lib/api/frontend_client";
import {
  type MessageFromClient,
  type MessageToClient,
  type Dataset,
  MessageFromClientSchema,
} from "../../../lib/api/websocket";
import { genId } from "../../../lib/id";
import { type RedisClient } from "../../app";
import { navBarState } from "../components/ContentWithNavBar";
import { backgroundCheckState } from "../rounds/background_check";
import {
  bookcaseState,
  cryptexState,
  painting2State,
  rugState,
} from "../rounds/illegal_search";
import { paperTrailState } from "../rounds/paper_trail";
import { shadowDiamondState } from "../rounds/shadow_diamond";
import { stakeoutState } from "../rounds/stakeout";
import {
  type DatasetTailer,
  type ActivityLogEntry,
  newActivityLogTailer,
  newGuessLogTailer,
  type GuessLogEntry,
} from "./dataset_tailer";
import { devtoolsState } from "./devtools";

type DatasetHandler =
  | {
      type: "team_state";
      callback: (teamState: TeamState) => object;
    }
  | {
      type: "activity_log";
    }
  | {
      type: "guess_log";
    };

const DATASET_REGISTRY: Record<Dataset, DatasetHandler> = {
  activity_log: {
    type: "activity_log",
  },
  dev: {
    type: "team_state",
    callback: devtoolsState,
  },
  guess_log: {
    type: "guess_log",
  },
  navbar: {
    type: "team_state",
    callback: navBarState,
  },
  paper_trail: {
    type: "team_state",
    callback: paperTrailState,
  },
  shadow_diamond: {
    type: "team_state",
    callback: shadowDiamondState,
  },
  stakeout: {
    type: "team_state",
    callback: stakeoutState,
  },
  team_state: {
    type: "team_state",
    callback: (teamState: TeamState) => {
      return teamState;
    },
  },
  illegal_search_painting2: {
    type: "team_state",
    callback: painting2State,
  },
  illegal_search_rug: {
    type: "team_state",
    callback: rugState,
  },
  illegal_search_cryptex: {
    type: "team_state",
    callback: cryptexState,
  },
  illegal_search_bookcase: {
    type: "team_state",
    callback: bookcaseState,
  },
  background_check: {
    type: "team_state",
    callback: backgroundCheckState,
  },
};

type TeamStateSubscriptionHandler<T> = {
  type: "team_state";
  dataset: Dataset;
  computeFromTeamState: (teamState: TeamState) => T;
  cachedValue: T;
};

type ActivityLogSubscriptionHandler = {
  type: "activity_log";
  dataset: Dataset;
  stop: () => void;
};

type GuessLogSubscriptionHandler = {
  type: "guess_log";
  dataset: Dataset;
  slug: string;
  stop: () => void;
};

type SubscriptionHandler<T> =
  | TeamStateSubscriptionHandler<T>
  | ActivityLogSubscriptionHandler
  | GuessLogSubscriptionHandler;

function isTeamStateSubscription<T>(
  sub: SubscriptionHandler<T>,
): sub is TeamStateSubscriptionHandler<T> {
  return sub.type === "team_state";
}

function isActivityLogSubscription<T>(
  sub: SubscriptionHandler<T>,
): sub is ActivityLogSubscriptionHandler {
  return sub.type === "activity_log";
}

function isGuessLogSubscription<T>(
  sub: SubscriptionHandler<T>,
): sub is GuessLogSubscriptionHandler {
  return sub.type === "guess_log";
}

type TeamStateObserverProvider = {
  observeTeamState(
    teamId: number,
    conn: ConnHandler,
  ): Promise<() => Promise<void>>;
};

type ActivityLogObserverProvider = {
  observeActivityLog(
    teamId: number,
    subId: string,
    conn: ConnHandler,
  ): () => void;
  activityLogReadyPromise(): Promise<void>;
};

type GuessLogObserverProvider = {
  observeGuessLog(
    teamId: number,
    slug: string,
    subId: string,
    conn: ConnHandler,
  ): () => void;
  guessLogReadyPromise(): Promise<void>;
};

class ConnHandler {
  public connId: string;
  private teamId: number;
  private sock: WebSocket;
  private onClose: (connId: string) => void;
  private teamStateObserverProvider: TeamStateObserverProvider;
  private activityLogObserverProvider: ActivityLogObserverProvider;
  private guessLogObserverProvider: GuessLogObserverProvider;

  // TODO: cache this in response to
  private lastTeamState: TeamState;

  // key: subId
  private subs: Map<string, SubscriptionHandler<object>>;
  private teamStateObserverHandlePromise?: Promise<() => void>;

  constructor({
    sock,
    initialTeamState,
    onClose,
    teamStateObserverProvider,
    activityLogObserverProvider,
    guessLogObserverProvider,
  }: {
    sock: WebSocket;
    initialTeamState: TeamState;
    onClose: (connId: string) => void;
    teamStateObserverProvider: TeamStateObserverProvider;
    activityLogObserverProvider: ActivityLogObserverProvider;
    guessLogObserverProvider: GuessLogObserverProvider;
  }) {
    this.sock = sock;
    this.teamId = initialTeamState.teamId;
    this.lastTeamState = initialTeamState;
    this.onClose = onClose;
    this.teamStateObserverProvider = teamStateObserverProvider;
    this.activityLogObserverProvider = activityLogObserverProvider;
    this.guessLogObserverProvider = guessLogObserverProvider;

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
      if (isTeamStateSubscription(sub)) {
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
      }
    });
  }

  appendActivityLogEntry(subId: string, entry: ActivityLogEntry) {
    const sub = this.subs.get(subId);
    if (sub && isActivityLogSubscription(sub)) {
      this.send({ subId, type: "update", value: entry });
    }
  }

  appendGuessLogEntry(subId: string, entry: GuessLogEntry) {
    const sub = this.subs.get(subId);
    if (sub && isGuessLogSubscription(sub)) {
      // Unpack only the desired fields
      const { status, canonical_input, response, timestamp } = entry;
      this.send({
        subId,
        type: "update",
        value: { status, canonical_input, response, timestamp },
      });
    }
  }

  handle(message: MessageFromClient, _e: MessageEvent): void {
    if (message.method === "sub") {
      const { rpc, subId, dataset, params } = message;

      // Guard dev dataset
      if (dataset === "dev" && process.env.NODE_ENV !== "development") {
        this.send({
          rpc,
          type: "fail" as const,
          error: `No dataset "${dataset}" known`,
        });
        return;
      }

      // Look up what dataset we need to observe.  Ask for it if we don't have it.
      const datasetHandler = DATASET_REGISTRY[dataset];
      switch (datasetHandler.type) {
        case "team_state": {
          const handler = datasetHandler.callback;
          // compute the initial value
          const value = handler(this.lastTeamState);
          const subHandler: SubscriptionHandler<object> = {
            type: "team_state",
            dataset,
            computeFromTeamState: handler,
            cachedValue: value,
          };
          this.subs.set(subId, subHandler);
          if (this.teamStateObserverHandlePromise === undefined) {
            // If we're not already watching for team state updates, start up monitoring
            this.teamStateObserverHandlePromise =
              this.teamStateObserverProvider.observeTeamState(
                this.teamId,
                this,
              );
          }
          // Once the pubsub watch is set up, send an initial update and that the sub is ready
          void this.teamStateObserverHandlePromise.then(() => {
            // push down the initial state as an update
            this.send({ subId, type: "update" as const, value });
            // reply with an ack of the sub ID, indicating successful completion of the RPC
            this.send({ rpc, type: "sub" as const, subId });
          });
          break;
        }
        case "activity_log": {
          // observeActivityLog() will synchronously trigger sending all activity log entries as updates as observeActivityLog is called.
          // Since our dispatch path goes through this.subs
          const subHandler: SubscriptionHandler<object> = {
            type: "activity_log",
            dataset,
            stop: () => {
              /* stub */
            },
          };
          this.subs.set(subId, subHandler);
          subHandler.stop = this.activityLogObserverProvider.observeActivityLog(
            this.teamId,
            subId,
            this,
          );
          // Reply that we're ready
          this.activityLogObserverProvider
            .activityLogReadyPromise()
            .then(() => {
              this.send({ rpc, type: "sub" as const, subId });
            })
            .catch(() => {
              this.send({
                rpc,
                type: "fail" as const,
                error: "activity log ready promise rejected",
              });
            });
          break;
        }
        case "guess_log": {
          if (!params?.slug) {
            this.send({
              rpc,
              type: "fail" as const,
              error: `No slug provided to sub to ${dataset}`,
            });
            return;
          }
          const subHandler: SubscriptionHandler<object> = {
            type: "guess_log",
            dataset,
            slug: params.slug,
            stop: () => {
              /* stub */
            },
          };
          this.subs.set(subId, subHandler);
          subHandler.stop = this.guessLogObserverProvider.observeGuessLog(
            this.teamId,
            params.slug,
            subId,
            this,
          );
          this.guessLogObserverProvider
            .guessLogReadyPromise()
            .then(() => {
              this.send({ rpc, type: "sub" as const, subId });
            })
            .catch(() => {
              this.send({
                rpc,
                type: "fail" as const,
                error: "guess log ready promise rejected",
              });
            });
        }
      }

      return;
    } else {
      const { rpc, subId } = message;
      const sub = this.subs.get(subId);
      if (!sub) {
        this.send({ rpc, type: "fail", error: `No known sub ${subId}` });
      } else {
        if (isTeamStateSubscription(sub)) {
          // Remove from the map of subs
          this.subs.delete(subId);
          // If the map of subs is empty, stop observing teamState
          if (this.subs.size === 0) {
            const promise = this.teamStateObserverHandlePromise;
            this.teamStateObserverHandlePromise = undefined;
            void promise?.then((stop) => {
              stop();
            });
          }
        } else if (isActivityLogSubscription(sub)) {
          this.subs.delete(subId);
          if (isActivityLogSubscription(sub)) {
            sub.stop();
          }
        }
        this.send({ rpc, type: "unsub", subId });
      }
    }
  }
}

type TeamStateSubState = {
  // The listener we registered with redis, so we can unsubscribe it when connSubMap goes empty
  listener: (message: string, channel: string) => void;
  // Map from connId to ConnHandler
  connSubMap: Map<string, ConnHandler>;
};

export class WebsocketManager
  implements
    TeamStateObserverProvider,
    ActivityLogObserverProvider,
    GuessLogObserverProvider
{
  private redisClient: RedisClient;

  // key: connId
  private connections: Map<string, ConnHandler>;

  // key: team_id
  private teamStateSubs: Map<number, TeamStateSubState>;

  private activityLogTailer: DatasetTailer<ActivityLogEntry>;

  private guessLogTailer: DatasetTailer<GuessLogEntry>;

  constructor({
    redisClient,
    frontendApiClient,
  }: {
    redisClient: RedisClient;
    frontendApiClient: FrontendClient;
  }) {
    this.redisClient = redisClient.duplicate();
    this.redisClient.on("error", (err) => {
      console.error("ws redis error:", err);
    });
    this.connections = new Map<string, ConnHandler>();
    this.teamStateSubs = new Map<number, TeamStateSubState>();
    this.activityLogTailer = newActivityLogTailer({
      redisClient,
      frontendApiClient,
    });
    this.guessLogTailer = newGuessLogTailer({ redisClient, frontendApiClient });
  }

  async connectToRedis() {
    await this.redisClient.connect();
  }

  dispatchTeamStateUpdate(teamId: number, message: string, _channel: string) {
    try {
      const data = JSON.parse(message) as TeamState;
      const connHandlerMap = this.teamStateSubs.get(teamId);
      if (connHandlerMap) {
        for (const connHandler of connHandlerMap.connSubMap.values()) {
          connHandler.updateTeamState(data);
        }
      }
    } catch (e) {
      if (e instanceof SyntaxError) {
        console.error(
          "received unparseable JSON from Redis",
          `team_state.${teamId}`,
          message,
        );
      }
    }
  }

  async observeTeamState(
    teamId: number,
    conn: ConnHandler,
  ): Promise<() => Promise<void>> {
    let teamStateSubState = this.teamStateSubs.get(teamId);
    const existed = teamStateSubState !== undefined;
    if (!teamStateSubState) {
      const listener = this.dispatchTeamStateUpdate.bind(this, teamId);
      const connSubMap = new Map<string, ConnHandler>();
      teamStateSubState = { listener, connSubMap };
      this.teamStateSubs.set(teamId, teamStateSubState);
    }
    teamStateSubState.connSubMap.set(conn.connId, conn);

    const channel = `team_state.${teamId}`;
    if (!existed) {
      // Do async work *after* we've updated the sub maps.
      await this.redisClient.subscribe(channel, teamStateSubState.listener);
    }

    return async () => {
      teamStateSubState.connSubMap.delete(conn.connId);
      if (teamStateSubState.connSubMap.size === 0) {
        this.teamStateSubs.delete(teamId);
        await this.redisClient.unsubscribe(channel, teamStateSubState.listener);
      }
    };
  }

  observeActivityLog(
    teamId: number,
    subId: string,
    conn: ConnHandler,
  ): () => void {
    const stop = this.activityLogTailer.watchLog(
      (entries: ActivityLogEntry[]) => {
        entries.forEach((entry) => {
          if (entry.team_id === teamId || entry.team_id === undefined) {
            conn.appendActivityLogEntry(subId, entry);
          }
        });
      },
    );

    return stop;
  }

  activityLogReadyPromise(): Promise<void> {
    return this.activityLogTailer.readyPromise();
  }

  observeGuessLog(
    teamId: number,
    slug: string,
    subId: string,
    conn: ConnHandler,
  ): () => void {
    const stop = this.guessLogTailer.watchLog((entries: GuessLogEntry[]) => {
      entries.forEach((entry) => {
        if (entry.team_id === teamId && entry.slug === slug) {
          conn.appendGuessLogEntry(subId, entry);
        }
      });
    });

    return stop;
  }

  guessLogReadyPromise(): Promise<void> {
    return this.guessLogTailer.readyPromise();
  }

  async requestHandler(req: Request, res: WSResponse, next: NextFunction) {
    if (!req.teamState) {
      // Client is not logged in.
      next();
      return;
    }
    const ws = await res.accept();
    const connHandler = new ConnHandler({
      sock: ws,
      initialTeamState: req.teamState,
      onClose: (connId: string) => {
        this.connections.delete(connId);
      },
      teamStateObserverProvider: this,
      activityLogObserverProvider: this,
      guessLogObserverProvider: this,
    });
    this.connections.set(connHandler.connId, connHandler);
    const helloMessage: MessageToClient = {
      type: "hello" as const,
      connId: connHandler.connId,
      scriptUrl: workersManifest["websocket_worker.js"],
    };
    connHandler.send(helloMessage);

    // TODO: make this be something the ConnHandler initiates when it gets a sub, rather than automatically started
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
    await this.redisClient.subscribe(channel, listener);
    ws.addEventListener("close", () => {
      void this.redisClient.unsubscribe(channel, listener);
    });
  }
}
