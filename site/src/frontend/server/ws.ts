import { type NextFunction, type Request } from "express";
import type { WSResponse } from "websocket-express";
import workersManifest from "../../../dist/worker-manifest.json";
import { type TeamState, type TeamHuntState } from "../../../lib/api/client";
import { type DehydratedActivityLogEntry } from "../../../lib/api/contract";
import { type FrontendClient } from "../../../lib/api/frontend_client";
import {
  type TeamRegistrationLogEntry,
  type InternalActivityLogEntry,
  type PuzzleStateLogEntry,
  type TeamInteractionStateLogEntry,
} from "../../../lib/api/frontend_contract";
import {
  type MessageFromClient,
  type MessageToClient,
  type Dataset,
  type ObjectWithEpoch,
  MessageFromClientSchema,
  type ObjectWithId,
} from "../../../lib/api/websocket";
import { genId } from "../../../lib/id";
import formatActivityLogEntryForApi from "../../api/formatActivityLogEntryForApi";
import {
  formatTeamHuntState,
  TeamInfoIntermediate,
  TeamStateIntermediate,
} from "../../api/logic";
import {
  type RedisClient,
  activityLog,
  puzzleStateLog,
  teamInteractionStateLog,
  teamRegistrationLog,
} from "../../api/redis";
import { type Hunt } from "../../huntdata/types";
import { navBarState } from "../components/ContentWithNavBar";
import { hubState } from "../hub";
import { INTERACTIONS } from "../interactions";
import virtualInteractionState from "../interactions/virtualInteractionState";
import { backgroundCheckState } from "../rounds/background_check";
import { eventsState } from "../rounds/events";
import {
  bookcaseState,
  cryptexState,
  painting2State,
  rugState,
} from "../rounds/illegal_search";
import { missingDiamondState } from "../rounds/missing_diamond";
import { murderState } from "../rounds/murder_in_mitropolis";
import { paperTrailState } from "../rounds/paper_trail";
import { stakeoutState } from "../rounds/stakeout";
import { strayLeadsState } from "../rounds/stray_leads";
import { PUZZLE_SLUGS_WITH_PUBLIC_STATE_LOG } from "./constants";
import { type DatasetTailer, newLogTailer } from "./dataset_tailer";
import { devtoolsState } from "./devtools";
import { PollWatcher } from "./poll_watcher";
import { allPuzzlesState } from "./routes/all_puzzles";

type DatasetHandler =
  | {
      type: "team_state";
      callback: (
        teamState: TeamHuntState,
        { username }: { username: string },
      ) => ObjectWithEpoch;
    }
  | {
      type: "activity_log";
      callback: (entry: DehydratedActivityLogEntry) => ObjectWithId | undefined;
    }
  | {
      type: "activity_log_with_slug";
      callback: (
        entry: InternalActivityLogEntry & { slug: string },
      ) => ObjectWithId | undefined;
    }
  | {
      type: "team_registration";
      callback: (teamInfoIntermediate: TeamInfoIntermediate) => ObjectWithEpoch;
    }
  | {
      type: "puzzle_state_log";
    }
  | {
      type: "interaction_state_log";
    }
  | {
      type: "poll_responses";
    };

const DATASET_REGISTRY: Record<Dataset, DatasetHandler> = {
  activity_log: {
    type: "activity_log",
    callback: (e) => e,
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
    type: "activity_log_with_slug",
    callback: (e) => {
      if (e.type !== "puzzle_guess_submitted") {
        return undefined;
      }

      return {
        id: e.id,
        status: e.data.status,
        canonical_input: e.data.canonical_input,
        link: e.data.link,
        response: e.data.response,
        timestamp: e.timestamp,
      };
    },
  },
  hint_log: {
    type: "activity_log_with_slug",
    callback: (e) => {
      if (
        e.type !== "puzzle_hint_requested" &&
        e.type !== "puzzle_hint_responded"
      ) {
        return undefined;
      }

      return {
        id: e.id,
        timestamp: e.timestamp,
        type: e.type,
        data: e.data,
      };
    },
  },
  hub: {
    type: "team_state",
    callback: hubState,
  },
  navbar: {
    type: "team_state",
    callback: navBarState,
  },
  paper_trail: {
    type: "team_state",
    callback: paperTrailState,
  },
  missing_diamond: {
    type: "team_state",
    callback: missingDiamondState,
  },
  stakeout: {
    type: "team_state",
    callback: stakeoutState,
  },
  stray_leads: {
    type: "team_state",
    callback: strayLeadsState,
  },
  team_info: {
    type: "team_registration",
    callback: (teamInfoIntermediate: TeamInfoIntermediate) => {
      const result = teamInfoIntermediate.formatTeamInfo();
      if (result) return result;
      return { epoch: -1 };
    },
  },
  team_registration: {
    type: "team_registration",
    callback: (teamInfoIntermediate: TeamInfoIntermediate) => {
      const result = teamInfoIntermediate.formatTeamRegistrationState();
      if (result) return result;
      return { epoch: -1 };
    },
  },
  team_state: {
    type: "team_state",
    callback: (teamState: TeamHuntState) => {
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
  murder_in_mitropolis: {
    type: "team_state",
    callback: murderState,
  },
  puzzle_state_log: {
    type: "puzzle_state_log",
  },
  events: {
    type: "team_state",
    callback: eventsState,
  },
  interaction_state_log: {
    type: "interaction_state_log",
  },
  poll_responses: {
    type: "poll_responses",
  },
  virtual_interaction_state: {
    type: "team_state",
    callback: virtualInteractionState,
  },
};

type TeamStateSubscriptionHandler<T> = {
  type: "team_state";
  dataset: Dataset;
  computeFromTeamState: (
    teamState: TeamHuntState,
    teamContext: { username: string },
  ) => T;
  cachedValue: T;
};

type ActivityLogSubscriptionHandler<T> = {
  type: "activity_log";
  dataset: Dataset;
  computeFromActivityLogEntry: (
    entry: DehydratedActivityLogEntry,
  ) => T | undefined;
  stop: () => void;
};

type ActivityLogWithSlugSubscriptionHandler<T> = {
  type: "activity_log_with_slug";
  dataset: Dataset;
  slug: string;
  computeFromActivityLogEntry: (
    entry: InternalActivityLogEntry & { slug: string },
  ) => T | undefined;
  stop: () => void;
};

type TeamRegistrationSubscriptionHandler<T> = {
  type: "team_registration";
  dataset: Dataset;
  computeFromTeamRegistrationIntermediate: (
    teamInfoIntermediate: TeamInfoIntermediate,
  ) => T;
  cachedValue: T | undefined;
  stop: () => void;
};

type PuzzleStateLogSubscriptionHandler = {
  type: "puzzle_state_log";
  dataset: Dataset;
  slug: string;
  stop: () => void;
};

type InteractionStateLogSubscriptionHandler = {
  type: "interaction_state_log";
  dataset: Dataset;
  slug: string;
  stop: () => void;
};

type PollResponseSubscriptionHandler = {
  type: "poll_responses";
  dataset: Dataset;
  slug: string;
  pollId: string;
  stop: () => void;
};

type SubscriptionHandler<T> =
  | TeamStateSubscriptionHandler<T>
  | ActivityLogSubscriptionHandler<T>
  | ActivityLogWithSlugSubscriptionHandler<T>
  | TeamRegistrationSubscriptionHandler<T>
  | PuzzleStateLogSubscriptionHandler
  | InteractionStateLogSubscriptionHandler
  | PollResponseSubscriptionHandler;

function isTeamStateSubscription<T>(
  sub: SubscriptionHandler<T>,
): sub is TeamStateSubscriptionHandler<T> {
  return sub.type === "team_state";
}

function isActivityLogSubscription<T>(
  sub: SubscriptionHandler<T>,
): sub is ActivityLogSubscriptionHandler<T> {
  return sub.type === "activity_log";
}

function isActivityLogWithSlugSubscription<T>(
  sub: SubscriptionHandler<T>,
): sub is ActivityLogWithSlugSubscriptionHandler<T> {
  return sub.type === "activity_log_with_slug";
}

function isTeamRegistrationSubscription<T>(
  sub: SubscriptionHandler<T>,
): sub is TeamRegistrationSubscriptionHandler<T> {
  return sub.type === "team_registration";
}

function isPuzzleStateLogSubscription<T>(
  sub: SubscriptionHandler<T>,
): sub is PuzzleStateLogSubscriptionHandler {
  return sub.type === "puzzle_state_log";
}

function isInteractionStateLogSubscription<T>(
  sub: SubscriptionHandler<T>,
): sub is InteractionStateLogSubscriptionHandler {
  return sub.type === "interaction_state_log";
}

function isPollResponseSubscription<T>(
  sub: SubscriptionHandler<T>,
): sub is PollResponseSubscriptionHandler {
  return sub.type === "poll_responses";
}

type ObserveResult = {
  readyPromise: Promise<void>;
  stop: () => void;
};

type ObserverProvider = {
  // This one is weird because we're guaranteed to have a plausible TeamState value because we got
  // one when the websocket was first opened.
  observeTeamState(teamId: number, conn: ConnHandler): () => void;

  observeTeamRegistration(
    teamId: number,
    subId: string,
    conn: ConnHandler,
  ): ObserveResult;

  observeActivityLog(
    teamId: number,
    subId: string,
    conn: ConnHandler,
  ): ObserveResult;

  observeActivityLogWithSlug(
    teamId: number,
    slug: string,
    subId: string,
    conn: ConnHandler,
  ): ObserveResult;

  observePuzzleStateLog(
    teamId: number,
    slug: string,
    subId: string,
    conn: ConnHandler,
  ): ObserveResult;

  observeInteractionStateLog(
    teamId: number,
    slug: string,
    subId: string,
    conn: ConnHandler,
  ): ObserveResult;

  observePollResponses(
    teamId: number,
    slug: string,
    pollId: string,
    subId: string,
    conn: ConnHandler,
  ): ObserveResult;
};

class ConnHandler {
  // A unique id for this particular client connection.  One-to-one with WebSocket.
  private _connId: string;

  // The team id that is associated with this particular client connection.  Ultimately, the `id` field from the `Team` object in the `teams` table in the DB.
  private _teamId: number;
  private _teamUsername: string;

  // The last-known team state for this team.  This may be stale if there are no subs that rely on
  // teamState.  This is initially populated with req.teamState.
  private _lastTeamState: TeamHuntState;

  private sock: WebSocket;
  private onClose: (connId: string) => void;
  private observerProvider: ObserverProvider;

  // key: subId
  private subs: Map<
    string,
    SubscriptionHandler<ObjectWithEpoch | ObjectWithId>
  >;
  private teamStateObserverStopHandle?: () => void;

  constructor({
    sock,
    initialTeamState,
    onClose,
    observerProvider,
  }: {
    sock: WebSocket;
    initialTeamState: TeamState;
    onClose: (connId: string) => void;
    observerProvider: ObserverProvider;
  }) {
    this.sock = sock;
    this._teamId = initialTeamState.teamId;
    this._teamUsername = initialTeamState.info.teamUsername;
    this._lastTeamState = initialTeamState.state;
    this.onClose = onClose;
    this.observerProvider = observerProvider;

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
          case "team_registration":
            sub.stop();
            break;
          case "activity_log":
            sub.stop();
            break;
          case "activity_log_with_slug":
            sub.stop();
            break;
          case "puzzle_state_log":
            sub.stop();
            break;
          case "interaction_state_log":
            sub.stop();
            break;
          case "poll_responses":
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

  get lastTeamState() {
    return this._lastTeamState;
  }

  private log(...args: unknown[]): void {
    console.log(`ws ${this.connId}:`, ...args);
  }

  public send(message: MessageToClient): void {
    this.sock.send(JSON.stringify(message));
  }

  public updateTeamState(teamState: TeamHuntState) {
    // Ensure we discard updates that do not increase the epoch, so we never backslide, even if the
    // backend is giving us stale results, or if pubsub gets events out-of-order.
    if (this._lastTeamState.epoch < teamState.epoch) {
      // Save the new team state.
      this._lastTeamState = teamState;
      // for each sub in subs:
      this.subs.forEach((sub, subId) => {
        if (isTeamStateSubscription(sub)) {
          // compute the new resulting value
          const newValue = sub.computeFromTeamState(teamState, {
            username: this._teamUsername,
          });

          const { epoch: _cachedEpoch, ...cachedLessEpoch } = sub.cachedValue;
          const { epoch: _newEpoch, ...newValueLessEpoch } = newValue;

          // if the result differs, in a field other than epoch, generate an update message for that sub
          const newValueJSON = JSON.stringify(newValueLessEpoch);
          const oldValueJSON = JSON.stringify(cachedLessEpoch);
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

  public updateTeamInfo(subId: string, teamInfo: TeamInfoIntermediate) {
    const sub = this.subs.get(subId);
    if (sub && isTeamRegistrationSubscription(sub)) {
      const newValue = sub.computeFromTeamRegistrationIntermediate(teamInfo);
      let needUpdate = false;
      if (sub.cachedValue === undefined) {
        needUpdate = true;
      } else {
        const { epoch: _cachedEpoch, ...cachedLessEpoch } = sub.cachedValue;
        const { epoch: _newEpoch, ...newValueLessEpoch } = newValue;
        const newValueJSON = JSON.stringify(newValueLessEpoch);
        const oldValueJSON = JSON.stringify(cachedLessEpoch);
        if (newValueJSON !== oldValueJSON) {
          needUpdate = true;
        }
      }
      if (needUpdate) {
        sub.cachedValue = newValue;
        this.send({ subId, type: "update", value: newValue });
      }
    }
  }

  public appendActivityLogEntry(
    subId: string,
    entry: DehydratedActivityLogEntry,
  ) {
    const sub = this.subs.get(subId);
    if (sub && isActivityLogSubscription(sub)) {
      const mappedEntry = sub.computeFromActivityLogEntry(entry);
      if (!mappedEntry) return;
      this.send({ subId, type: "update", value: mappedEntry });
    }
  }

  public appendActivityLogWithSlugEntry(
    subId: string,
    entry: InternalActivityLogEntry & { slug: string },
  ) {
    const sub = this.subs.get(subId);
    if (
      sub &&
      isActivityLogWithSlugSubscription(sub) &&
      sub.slug === entry.slug
    ) {
      const mappedEntry = sub.computeFromActivityLogEntry(entry);
      if (!mappedEntry) return;
      this.send({ subId, type: "update", value: mappedEntry });
    }
  }

  public appendPuzzleStateLogEntry(subId: string, entry: PuzzleStateLogEntry) {
    const sub = this.subs.get(subId);
    if (sub && isPuzzleStateLogSubscription(sub) && sub.slug === entry.slug) {
      this.send({ subId, type: "update", value: entry });
    }
  }

  public appendInteractionStateLogEntry(
    subId: string,
    entry: TeamInteractionStateLogEntry,
  ) {
    const sub = this.subs.get(subId);
    if (
      sub &&
      isInteractionStateLogSubscription(sub) &&
      sub.slug === entry.slug
    ) {
      // Format state log entry as appropriate for client
      const interaction = INTERACTIONS[entry.slug];
      if (interaction?.type === "virtual") {
        const value = interaction.handler.format(entry);
        this.send({ subId, type: "update", value });
      }
    }
  }

  public updatePollResponses(subId: string, pollState: Record<string, number>) {
    const sub = this.subs.get(subId);
    if (sub && isPollResponseSubscription(sub)) {
      const value = {
        epoch: Date.now(), // synthesize epochs for poll status based on timestamps; it's probably fine
        pollState,
      };
      this.send({ subId, type: "update", value });
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
        case "team_registration": {
          const subHandler: SubscriptionHandler<ObjectWithEpoch> = {
            type: "team_registration",
            dataset,
            computeFromTeamRegistrationIntermediate: datasetHandler.callback,
            cachedValue: undefined,
            stop: () => {
              /* stub */
            },
          };
          this.subs.set(subId, subHandler);
          const { stop, readyPromise } =
            this.observerProvider.observeTeamRegistration(
              this.teamId,
              subId,
              this,
            );
          subHandler.stop = stop;
          // Upon successful establishment of the registration log watcher, reply with an ack of the
          // sub ID, indicating successful completion of the RPC
          readyPromise
            .then(() => {
              this.send({ rpc, type: "sub" as const, subId });
            })
            .catch(() => {
              this.send({
                rpc,
                type: "fail" as const,
                error: "registration log ready promise rejected",
              });
            });

          break;
        }
        case "team_state": {
          const handler = datasetHandler.callback;
          // compute the initial value
          const value = handler(this._lastTeamState, {
            username: this._teamUsername,
          });
          const subHandler: SubscriptionHandler<ObjectWithEpoch> = {
            type: "team_state",
            dataset,
            computeFromTeamState: handler,
            cachedValue: value,
          };
          this.subs.set(subId, subHandler);
          if (this.teamStateObserverStopHandle === undefined) {
            // If we're not already watching for team state updates, start up monitoring
            this.teamStateObserverStopHandle =
              this.observerProvider.observeTeamState(this.teamId, this);
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
          const subHandler: SubscriptionHandler<ObjectWithId> = {
            type: "activity_log",
            dataset,
            computeFromActivityLogEntry: datasetHandler.callback,
            stop: () => {
              /* stub */
            },
          };
          this.subs.set(subId, subHandler);
          const { stop, readyPromise } =
            this.observerProvider.observeActivityLog(this.teamId, subId, this);
          subHandler.stop = stop;
          // Reply that we're ready
          readyPromise
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
        case "activity_log_with_slug": {
          if (!params?.slug) {
            this.send({
              rpc,
              type: "fail" as const,
              error: `No slug provided to sub to ${dataset}`,
            });
            return;
          }
          const subHandler: SubscriptionHandler<ObjectWithId> = {
            type: "activity_log_with_slug",
            dataset,
            slug: params.slug,
            computeFromActivityLogEntry: datasetHandler.callback,
            stop: () => {
              /* stub */
            },
          };
          this.subs.set(subId, subHandler);
          const { stop, readyPromise } =
            this.observerProvider.observeActivityLogWithSlug(
              this.teamId,
              params.slug,
              subId,
              this,
            );
          subHandler.stop = stop;
          readyPromise
            .then(() => {
              this.send({ rpc, type: "sub" as const, subId });
            })
            .catch(() => {
              this.send({
                rpc,
                type: "fail" as const,
                error: "puzzle activity log ready promise rejected",
              });
            });
          break;
        }
        case "puzzle_state_log": {
          if (!params?.slug) {
            this.send({
              rpc,
              type: "fail" as const,
              error: `No slug provided to sub to ${dataset}`,
            });
            return;
          }
          if (!PUZZLE_SLUGS_WITH_PUBLIC_STATE_LOG.includes(params.slug)) {
            this.send({
              rpc,
              type: "fail" as const,
              error: `puzzle_state_log not available for slug ${params.slug}`,
            });
            return;
          }
          const subHandler: SubscriptionHandler<object> = {
            type: "puzzle_state_log",
            dataset,
            slug: params.slug,
            stop: () => {
              /* stub */
            },
          };
          this.subs.set(subId, subHandler);
          const { stop, readyPromise } =
            this.observerProvider.observePuzzleStateLog(
              this.teamId,
              params.slug,
              subId,
              this,
            );
          subHandler.stop = stop;
          readyPromise
            .then(() => {
              this.send({ rpc, type: "sub" as const, subId });
            })
            .catch(() => {
              this.send({
                rpc,
                type: "fail" as const,
                error: "puzzle state log ready promise rejected",
              });
            });
          break;
        }
        case "interaction_state_log": {
          if (!params?.slug) {
            this.send({
              rpc,
              type: "fail" as const,
              error: `No slug provided to sub to ${dataset}`,
            });
            return;
          }
          // Only allow subscriptions for the 4 virtual interactions.
          const interaction = INTERACTIONS[params.slug];
          if (interaction?.type !== "virtual") {
            this.send({
              rpc,
              type: "fail" as const,
              error: `interaction_state_log not available for slug ${params.slug}`,
            });
            return;
          }
          const subHandler: SubscriptionHandler<object> = {
            type: "interaction_state_log",
            dataset,
            slug: params.slug,
            stop: () => {
              /* stub */
            },
          };
          this.subs.set(subId, subHandler);
          const { stop, readyPromise } =
            this.observerProvider.observeInteractionStateLog(
              this.teamId,
              params.slug,
              subId,
              this,
            );
          subHandler.stop = stop;
          readyPromise
            .then(() => {
              this.send({ rpc, type: "sub" as const, subId });
            })
            .catch(() => {
              this.send({
                rpc,
                type: "fail" as const,
                error: "interaction state log ready promise rejected",
              });
            });
          break;
        }
        case "poll_responses": {
          if (!params?.slug || !params.pollId) {
            this.send({
              rpc,
              type: "fail" as const,
              error: `Missing params to ${dataset}`,
            });
            return;
          }
          const subHandler: SubscriptionHandler<object> = {
            type: "poll_responses",
            dataset,
            slug: params.slug,
            pollId: params.pollId,
            stop: () => {
              /* stub */
            },
          };
          this.subs.set(subId, subHandler);
          const { stop, readyPromise } =
            this.observerProvider.observePollResponses(
              this.teamId,
              params.slug,
              params.pollId,
              subId,
              this,
            );
          subHandler.stop = stop;
          readyPromise
            .then(() => {
              this.send({ rpc, type: "sub" as const, subId });
            })
            .catch(() => {
              this.send({
                rpc,
                type: "fail" as const,
                error: "poll reponses ready promise rejected",
              });
            });
          break;
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

type PuzzleStateSubState = {
  // Key: [teamId, slug]
  teamId: number;
  slug: string;
  // Map from connId to ConnHandler
  connSubMap: Map<string, ConnHandler>;
  // A list of the entries that we have propagated to each ConnHandler in connSubMap.
  // Retained so that we can synthesize updates to subscribers while sharing the tailer.
  log: PuzzleStateLogEntry[];
  // The tailer.  When connSubMap becomes empty, we should stop the tailer and drop this
  // PuzzleStateSubState from the puzzleStateSubs map.
  tailer: DatasetTailer<PuzzleStateLogEntry>;
  tailerStopHandle: () => void;
};

type InteractionStateSubState = {
  teamId: number;
  slug: string;
  // Map from connId to ConnHandler
  connSubMap: Map<string, ConnHandler>;
  // A list of the entries that we have propagated to each ConnHandler in connSubMap.
  // Retained so that we can synthesize updates to subscribers while sharing the tailer.
  log: TeamInteractionStateLogEntry[];
  // The tailer.  When connSubMap becomes empty, we should stop the tailer and drop this
  // PuzzleStateSubState from the puzzleStateSubs map.
  tailer: DatasetTailer<TeamInteractionStateLogEntry>;
  tailerStopHandle: () => void;
};

export class WebsocketManager implements ObserverProvider {
  // key: connId
  private connections: Map<string, ConnHandler>;

  // Passed to new dataset tailers as they are constructed
  private redisClient: RedisClient;
  private frontendApiClient: FrontendClient;

  // key: team_id
  private teamStateSubs: Map<number, TeamStateSubState>;

  private activityLogTailer: DatasetTailer<InternalActivityLogEntry>;
  private teamRegistrationLogTailer: DatasetTailer<TeamRegistrationLogEntry>;

  // key: team_id
  private puzzleStateSubs: Map<string, PuzzleStateSubState>;
  private interactionStateSubs: Map<string, InteractionStateSubState>;

  private pollWatcher: PollWatcher;

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
    this.connections = new Map<string, ConnHandler>();
    this.teamStateSubs = new Map<number, TeamStateSubState>();
    this.redisClient = redisClient;
    this.frontendApiClient = frontendApiClient;
    this.activityLogTailer = newLogTailer({
      redisClient,
      fetchMethod: frontendApiClient.getFullActivityLog.bind(frontendApiClient),
      log: activityLog,
    });
    this.activityLogTailer.start();
    this.teamRegistrationLogTailer = newLogTailer({
      redisClient,
      fetchMethod:
        frontendApiClient.getFullTeamRegistrationLog.bind(frontendApiClient),
      log: teamRegistrationLog,
    });
    this.teamRegistrationLogTailer.start();
    this.puzzleStateSubs = new Map();
    this.interactionStateSubs = new Map();
    this.pollWatcher = new PollWatcher({ redisClient });
    this.pollWatcher.start();
  }

  private dispatchTeamStateUpdate(teamId: number, teamState: TeamHuntState) {
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
      let intermediate = new TeamStateIntermediate(this.hunt);
      let latestTeamState = conn.lastTeamState;
      // Avoid dispatching teamState updates while processing the initial backlog
      let ready = false;
      const stopHandle = this.activityLogTailer.watchLog(
        (entries: InternalActivityLogEntry[]) => {
          intermediate = entries
            .filter((e) => e.team_id === teamId || e.team_id === undefined)
            .reduce((acc, entry) => acc.reduce(entry), intermediate);
          latestTeamState = formatTeamHuntState(this.hunt, intermediate);
          if (ready) {
            this.dispatchTeamStateUpdate(teamId, latestTeamState);
          }
        },
      );
      // The initial backlog should be processed by now, so set up to dispatch future updates
      ready = true;

      // We didn't dispatch a teamStateUpdate yet, because ready wasn't truthy yet, to avoid initial
      // startup of the watcher generating (and dispatching!) a bunch of older teamStates.
      // But now we're ready.  We'll deliver future updates, but we should also synthesize
      // dispatching up-to-date initial state, because this subscribe request may have come from
      // e.g. a browser that was placed in sleep for a while and has resumed and is now
      // reconnecting, and we want such clients to pick up any updates that occurred in the interim
      // In the fullness of time, it's possible we might be able to elide this initial push if state
      // hasn't changed, but we'll need to thread what the browser thinks the latest state was
      // through, rather than using what this websocket server thinks the latest state was.
      this.dispatchTeamStateUpdate(teamId, latestTeamState);

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

  public observeTeamRegistration(
    teamId: number,
    subId: string,
    conn: ConnHandler,
  ): ObserveResult {
    let teamInfoIntermediate = new TeamInfoIntermediate();
    let ready = false;
    const stop = this.teamRegistrationLogTailer.watchLog(
      (entries: TeamRegistrationLogEntry[]) => {
        entries.forEach((entry) => {
          if (entry.team_id === teamId) {
            teamInfoIntermediate = teamInfoIntermediate.reduce(entry);
          }
        });
        if (ready) {
          conn.updateTeamInfo(subId, teamInfoIntermediate);
        }
      },
    );
    // The initial backlog should be processed now; dispatch subsequent updates.
    ready = true;
    // And synthesize one, like in observeTeamState.
    conn.updateTeamInfo(subId, teamInfoIntermediate);
    return {
      stop,
      readyPromise: this.teamRegistrationLogTailer.readyPromise(),
    };
  }

  public observeActivityLog(
    teamId: number,
    subId: string,
    conn: ConnHandler,
  ): ObserveResult {
    const stop = this.activityLogTailer.watchLog(
      (entries: InternalActivityLogEntry[]) => {
        entries.forEach((entry) => {
          // Convert serialized InternalActivityLogEntry to working format
          if (entry.team_id === teamId || entry.team_id === undefined) {
            const apiEntry = formatActivityLogEntryForApi(entry);
            if (apiEntry !== undefined) {
              conn.appendActivityLogEntry(subId, apiEntry);
            }
          }
        });
      },
    );

    return {
      stop,
      readyPromise: this.activityLogTailer.readyPromise(),
    };
  }

  public observeActivityLogWithSlug(
    teamId: number,
    slug: string,
    subId: string,
    conn: ConnHandler,
  ): ObserveResult {
    const stop = this.activityLogTailer.watchLog(
      (entries: InternalActivityLogEntry[]) => {
        entries.forEach((entry) => {
          if (
            (entry.team_id === teamId || entry.team_id === undefined) &&
            "slug" in entry &&
            entry.slug === slug
          ) {
            conn.appendActivityLogWithSlugEntry(subId, entry);
          }
        });
      },
    );
    return {
      stop,
      readyPromise: this.activityLogTailer.readyPromise(),
    };
  }

  public observePuzzleStateLog(
    teamId: number,
    slug: string,
    subId: string,
    conn: ConnHandler,
  ): ObserveResult {
    const key = JSON.stringify([teamId, slug]);
    // console.log(`observePuzzleStateLog(teamId=${teamId}, slug=${slug})`);

    // Look up if there's already a log tailer for this team/slug combo.
    // If so, reuse that one.
    let sub = this.puzzleStateSubs.get(key);
    if (sub === undefined) {
      // If not, construct a new puzzle state log tailer for this team/slug combination
      const tailer = newLogTailer({
        redisClient: this.redisClient,
        fetchMethod: (arg: { query: { since?: number } }) =>
          this.frontendApiClient.getFullPuzzleStateLog({
            query: { team_id: teamId, slug, since: arg.query.since },
          }),
        log: puzzleStateLog,
        yieldAfter: 15000, // Periodically interrupt the redis thread so we can quiesce it on shutdown
        retainEntries: false,
      });
      tailer.start();
      const connSubMap = new Map<string, ConnHandler>();
      sub = {
        teamId,
        slug,
        connSubMap,
        log: [],
        tailer,
        tailerStopHandle: () => {
          /* stub to be replaced momentarily */
        },
      };
      sub.tailerStopHandle = sub.tailer.watchLog(
        (entries: PuzzleStateLogEntry[]) => {
          entries.forEach((entry) => {
            // sub is guaranteed to be truthy by now, but the typechecker can't be sure
            if (entry.team_id === teamId && entry.slug === slug) {
              for (const [entrySubId, entryConn] of connSubMap.entries()) {
                entryConn.appendPuzzleStateLogEntry(entrySubId, entry);
              }
              sub?.log.push(entry);
            }
          });
        },
      );
      this.puzzleStateSubs.set(key, sub);
    } else {
      // Synthesize initial updates
      sub.log.forEach((entry) => {
        conn.appendPuzzleStateLogEntry(subId, entry);
      });
    }

    sub.connSubMap.set(subId, conn);
    // console.log(`${sub.connSubMap.size} watchers now`);

    const stop = () => {
      sub.connSubMap.delete(subId);
      // console.log("decref", key, "watcher count now", sub.connSubMap.size);
      if (sub.connSubMap.size === 0) {
        //console.log("destroy tailer");
        sub.tailerStopHandle();
        sub.tailer.shutdown();
        this.puzzleStateSubs.delete(key);
      }
    };

    return {
      readyPromise: sub.tailer.readyPromise(),
      stop,
    };
  }

  public observeInteractionStateLog(
    teamId: number,
    slug: string,
    subId: string,
    conn: ConnHandler,
  ): ObserveResult {
    const key = JSON.stringify([teamId, slug]);
    // console.log(`observeInteractionStateLog(teamId=${teamId}, slug=${slug})`);

    // Look up if there's already a log tailer for this team/slug combo.
    // If so, reuse that one.
    let sub = this.interactionStateSubs.get(key);
    if (sub === undefined) {
      // If not, construct a new puzzle state log tailer for this team/slug combination
      const tailer = newLogTailer({
        redisClient: this.redisClient,
        fetchMethod: (arg: { query: { since?: number } }) =>
          this.frontendApiClient.getFullTeamInteractionStateLog({
            query: { team_id: teamId, slug, since: arg.query.since },
          }),
        log: teamInteractionStateLog,
        yieldAfter: 15000, // Periodically interrupt the redis thread so we can quiesce it on shutdown
        retainEntries: false,
      });
      tailer.start();
      const connSubMap = new Map<string, ConnHandler>();
      sub = {
        teamId,
        slug,
        connSubMap,
        log: [],
        tailer,
        tailerStopHandle: () => {
          /* stub to be replaced momentarily */
        },
      };
      sub.tailerStopHandle = sub.tailer.watchLog(
        (entries: TeamInteractionStateLogEntry[]) => {
          entries.forEach((entry) => {
            // sub is guaranteed to be truthy by now, but the typechecker can't be sure
            if (entry.team_id === teamId && entry.slug === slug) {
              for (const [entrySubId, entryConn] of connSubMap.entries()) {
                entryConn.appendInteractionStateLogEntry(entrySubId, entry);
              }
              sub?.log.push(entry);
            }
          });
        },
      );
      this.interactionStateSubs.set(key, sub);
    } else {
      // Synthesize initial updates
      // console.log("Reusing existing sub", sub);
      sub.log.forEach((entry) => {
        conn.appendInteractionStateLogEntry(subId, entry);
      });
    }

    sub.connSubMap.set(subId, conn);
    // console.log(`${sub.connSubMap.size} watchers now`);

    const stop = () => {
      sub.connSubMap.delete(subId);
      // console.log("decref", key, "watcher count now", sub.connSubMap.size);
      if (sub.connSubMap.size === 0) {
        //console.log("destroy tailer");
        sub.tailerStopHandle();
        sub.tailer.shutdown();
        this.interactionStateSubs.delete(key);
      }
    };

    return {
      readyPromise: sub.tailer.readyPromise(),
      stop,
    };
  }

  public observePollResponses(
    teamId: number,
    slug: string,
    pollId: string,
    subId: string,
    conn: ConnHandler,
  ): ObserveResult {
    // PollWatcher deduplicates observers watching the same poll internally, so there's no need to dedupe here.
    const observePromise = this.pollWatcher.observePoll(
      teamId,
      slug,
      pollId,
      (pollState) => {
        conn.updatePollResponses(subId, pollState);
      },
    );
    const stop = () => {
      void observePromise.then((stopHandle) => {
        stopHandle();
      });
    };
    const readyPromise = this.pollWatcher
      .getCurrentPollState(teamId, slug, pollId)
      .then((pollState) => {
        conn.updatePollResponses(subId, pollState);
      });
    return {
      stop,
      readyPromise,
    };
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
      observerProvider: this,
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
