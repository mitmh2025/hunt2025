import { type NextFunction, type Request } from "express";
import type { WSResponse } from "websocket-express";
import workersManifest from "../../../dist/worker-manifest.json";
import { type ActivityLogEntry, type TeamState } from "../../../lib/api/client";
import { type FrontendClient } from "../../../lib/api/frontend_client";
import { type InternalActivityLogEntry } from "../../../lib/api/frontend_contract";
import {
  type MessageFromClient,
  type MessageToClient,
  type Dataset,
  MessageFromClientSchema,
} from "../../../lib/api/websocket";
import { genId } from "../../../lib/id";
import { formatTeamStateFromFormattable } from "../../api/data";
import {
  parseInternalActivityLogEntry,
  formatActivityLogEntryForApi,
  TeamStateIntermediate,
  teamStateFromReducedIntermediate,
} from "../../api/logic";
import { type RedisClient } from "../../api/redis";
import { type Hunt } from "../../huntdata/types";
import { navBarState } from "../components/ContentWithNavBar";
import { backgroundCheckState } from "../rounds/background_check";
import {
  bookcaseState,
  cryptexState,
  painting2State,
  rugState,
} from "../rounds/illegal_search";
import { paperTrailState } from "../rounds/paper_trail";
import { stakeoutState } from "../rounds/stakeout";
import { missingDiamondState } from "../rounds/the_missing_diamond";
import { murderState } from "../rounds/the_murder";
import { type DatasetTailer, newActivityLogTailer } from "./dataset_tailer";
import { devtoolsState } from "./devtools";
import { allPuzzlesState } from "./routes/all_puzzles";

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
  all_puzzles: {
    type: "team_state",
    callback: allPuzzlesState,
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
  the_missing_diamond: {
    type: "team_state",
    callback: missingDiamondState,
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
  the_murder: {
    type: "team_state",
    callback: murderState,
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
  observeTeamState(teamId: number, conn: ConnHandler): () => void;
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
  // A unique id for this particular client connection.  One-to-one with WebSocket.
  private _connId: string;

  // The team id that is associated with this particular client connection.  Ultimately, the `id` field from the `Team` object in the `teams` table in the DB.
  private _teamId: number;

  // The last-known team state for this team.  This may be stale if there are no subs that rely on
  // teamState.  This is initially populated with req.teamState and currently primarily serves as a
  // place to yank teamName back out of, since the activity log doesn't give us any team name
  // information.
  private _lastTeamState: TeamState;

  private sock: WebSocket;
  private onClose: (connId: string) => void;
  private teamStateObserverProvider: TeamStateObserverProvider;
  private activityLogObserverProvider: ActivityLogObserverProvider;
  private guessLogObserverProvider: GuessLogObserverProvider;

  // key: subId
  private subs: Map<string, SubscriptionHandler<object>>;
  private teamStateObserverStopHandle?: () => void;

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
    this._teamId = initialTeamState.teamId;
    this._lastTeamState = initialTeamState;
    this.onClose = onClose;
    this.teamStateObserverProvider = teamStateObserverProvider;
    this.activityLogObserverProvider = activityLogObserverProvider;
    this.guessLogObserverProvider = guessLogObserverProvider;

    this._connId = genId();
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
      // Stop any outstanding subscriptions
      this.subs.forEach((sub) => {
        switch (sub.type) {
          case "activity_log":
            sub.stop();
            break;
          case "guess_log":
            sub.stop();
            break;
        }
      });
      if (this.teamStateObserverStopHandle) {
        this.teamStateObserverStopHandle();
        this.teamStateObserverStopHandle = undefined;
      }
      this.onClose(this.connId);
    });
  }

  get connId() {
    return this._connId;
  }

  get teamId() {
    return this._teamId;
  }

  get teamName() {
    return this._lastTeamState.teamName;
  }

  get lastTeamState() {
    return this._lastTeamState;
  }

  private log(...args: unknown[]): void {
    console.log(`ws ${this.connId}:`, ...args);
  }

  public send(message: MessageToClient): void {
    this.sock.send(JSON.stringify(message));
  }

  public updateTeamState(teamState: TeamState) {
    // Ensure we discard updates that do not increase the epoch, so we never backslide, even if the
    // backend is giving us stale results, or if pubsub gets events out-of-order.
    if (this._lastTeamState.epoch < teamState.epoch) {
      // Save the new team state.
      this._lastTeamState = teamState;
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
  }

  public appendActivityLogEntry(subId: string, entry: ActivityLogEntry) {
    const sub = this.subs.get(subId);
    if (sub && isActivityLogSubscription(sub)) {
      this.send({ subId, type: "update", value: entry });
    }
  }

  public appendGuessLogEntry(
    subId: string,
    entry: InternalActivityLogEntry & { type: "puzzle_guess_submitted" },
  ) {
    const sub = this.subs.get(subId);
    if (sub && isGuessLogSubscription(sub)) {
      this.send({
        subId,
        type: "update",
        value: {
          id: entry.id,
          status: entry.data.status,
          canonical_input: entry.data.canonical_input,
          response: entry.data.response,
          timestamp: entry.timestamp,
        },
      });
    }
  }

  private handle(message: MessageFromClient, _e: MessageEvent): void {
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
          const value = handler(this._lastTeamState);
          const subHandler: SubscriptionHandler<object> = {
            type: "team_state",
            dataset,
            computeFromTeamState: handler,
            cachedValue: value,
          };
          this.subs.set(subId, subHandler);
          if (this.teamStateObserverStopHandle === undefined) {
            // If we're not already watching for team state updates, start up monitoring
            this.teamStateObserverStopHandle =
              this.teamStateObserverProvider.observeTeamState(
                this.teamId,
                this,
              );
          }
          // Once the pubsub watch is set up, send an initial update and that the sub is ready
          // push down the initial state as an update
          this.send({ subId, type: "update" as const, value });
          // reply with an ack of the sub ID, indicating successful completion of the RPC
          this.send({ rpc, type: "sub" as const, subId });
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
            this.teamStateObserverStopHandle?.();
            this.teamStateObserverStopHandle = undefined;
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
  // Map from connId to ConnHandler
  connSubMap: Map<string, ConnHandler>;
  // A function which, when called, will stop the teamState observation.
  stopHandle: () => void;
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

  private activityLogTailer: DatasetTailer<InternalActivityLogEntry>;

  private hunt: Hunt;

  constructor({
    hunt,
    redisClient,
    frontendApiClient,
  }: {
    hunt: Hunt;
    redisClient: RedisClient;
    frontendApiClient: FrontendClient;
  }) {
    this.hunt = hunt;
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
  }

  public async connectToRedis() {
    await this.redisClient.connect();
  }

  private dispatchTeamStateUpdate(teamId: number, teamState: TeamState) {
    // console.log(`dispatchTeamStateUpdate for team ${teamId}: epoch ${teamState.epoch}`);
    const connHandlerMap = this.teamStateSubs.get(teamId);
    if (connHandlerMap) {
      for (const connHandler of connHandlerMap.connSubMap.values()) {
        connHandler.updateTeamState(teamState);
      }
    }
  }

  public observeTeamState(teamId: number, conn: ConnHandler): () => void {
    let teamStateSubState = this.teamStateSubs.get(teamId);
    if (!teamStateSubState) {
      // No conns were observing this team's teamState yet.  Set up an observer to be shared by all
      // conns that want to observe teamState for this team.
      // console.log(`Starting teamState observer for team ${teamId}`);
      const connSubMap = new Map<string, ConnHandler>();
      let intermediate = new TeamStateIntermediate();
      let latestTeamState = conn.lastTeamState;
      // Avoid dispatching teamState updates while processing the initial backlog
      let ready = false;
      const stopHandle = this.activityLogTailer.watchLog(
        (entries: InternalActivityLogEntry[]) => {
          intermediate = entries
            .map(parseInternalActivityLogEntry)
            .filter((e) => e.team_id === teamId || e.team_id === undefined)
            .reduce((acc, entry) => acc.reduce(entry), intermediate);
          const data = teamStateFromReducedIntermediate(intermediate);
          // TODO: figure out how to deal with teamName changing?
          const teamName = conn.teamName;
          latestTeamState = formatTeamStateFromFormattable(
            this.hunt,
            teamId,
            teamName,
            data,
          );
          if (ready) {
            this.dispatchTeamStateUpdate(teamId, latestTeamState);
          }
        },
      );
      // The initial backlog should be processed by now, so set up to dispatch future updates
      ready = true;
      // We didn't dispatch a teamStateUpdate yet, because teamStateSubState wasn't truthy yet, to
      // avoid initial startup of the watcher generating a bunch of older teamStates.
      // But now we're ready, so let's dispatch the latest state if the watchLog callback triggered
      // at least once and thus latestTeamState differs from what we started with.
      if (latestTeamState !== conn.lastTeamState) {
        this.dispatchTeamStateUpdate(teamId, latestTeamState);
      }
      // Save the sub state.
      teamStateSubState = { connSubMap, stopHandle };
      this.teamStateSubs.set(teamId, teamStateSubState);
    }

    // Add this connection to the collection of connections subscribed to teamState updates for this team.
    teamStateSubState.connSubMap.set(conn.connId, conn);
    // console.log(`Added conn ${conn.connId} to teamState observer map for team ${teamId} (total observers now ${teamStateSubState.connSubMap.size})`);

    const stop = () => {
      const subState = this.teamStateSubs.get(teamId);
      if (subState) {
        // Drop this conn from the map of conns watching this team's team state
        subState.connSubMap.delete(conn.connId);
        // console.log(`Removed conn ${conn.connId} from teamState observer map for team ${teamId} (total observers now ${subState.connSubMap.size})`);
        // If no more conns are watching this team's teamState, drop the whole observer too.
        if (subState.connSubMap.size === 0) {
          // console.log(`Stopping teamState observer for team ${teamId}`);
          subState.stopHandle();
          this.teamStateSubs.delete(teamId);
        }
      }
    };
    return stop;
  }

  public observeActivityLog(
    teamId: number,
    subId: string,
    conn: ConnHandler,
  ): () => void {
    const stop = this.activityLogTailer.watchLog(
      (entries: InternalActivityLogEntry[]) => {
        entries.forEach((internalEntry) => {
          // Convert serialized InternalActivityLogEntry to working format
          const entry = parseInternalActivityLogEntry(internalEntry);
          if (entry.team_id === teamId || entry.team_id === undefined) {
            const apiEntry = formatActivityLogEntryForApi(entry);
            if (apiEntry !== undefined) {
              conn.appendActivityLogEntry(subId, apiEntry);
            }
          }
        });
      },
    );

    return stop;
  }

  public activityLogReadyPromise(): Promise<void> {
    return this.activityLogTailer.readyPromise();
  }

  public observeGuessLog(
    teamId: number,
    slug: string,
    subId: string,
    conn: ConnHandler,
  ): () => void {
    const stop = this.activityLogTailer.watchLog(
      (entries: InternalActivityLogEntry[]) => {
        entries.forEach((entry) => {
          if (
            entry.team_id === teamId &&
            entry.type === "puzzle_guess_submitted" &&
            entry.slug === slug
          ) {
            conn.appendGuessLogEntry(subId, entry);
          }
        });
      },
    );

    return stop;
  }

  public guessLogReadyPromise(): Promise<void> {
    return this.activityLogTailer.readyPromise();
  }

  public async requestHandler(
    req: Request,
    res: WSResponse,
    next: NextFunction,
  ) {
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
  }
}
