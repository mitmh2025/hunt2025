import {
  type DatasetParams,
  type Dataset,
  type DatasetValue,
  type MessageFromClient,
  type MessageToClient,
  type ObjectWithId,
  type ObjectWithEpoch,
} from "./api/websocket";
import { type Branded } from "./brand";
import { genId } from "./id";

type Watcher = {
  // A unique id for the watcher (so we can remove particular watchers from the list)
  id: string;
  // The function that should be called when the observed data changes
  callback: (value: object) => void;
};

export function actionForDataset(dataset: Dataset) {
  if (
    dataset === "activity_log" ||
    dataset === "guess_log" ||
    dataset === "hint_log" ||
    dataset === "puzzle_state_log" ||
    dataset === "interaction_state_log"
  ) {
    return "append";
  }
  return "replace";
}

type DatasetKey = Branded<string, "DatasetKey">;

function deriveDatasetKey(dataset: Dataset, params: DatasetParams): DatasetKey {
  return `${dataset}:${JSON.stringify(params)}` as DatasetKey;
}

type SubscriptionState = {
  // Key of this subscription state, along which we dedupe subscriptions.
  // string which is "${dataset}:${JSON.stringify(params)}"
  datasetKey: DatasetKey;

  // The dataset we wish to request
  dataset: Dataset;
  // The params, if any, we wish to pass on to the server along with this dataset request
  params: DatasetParams;

  // When we get an update, should we replace the lastValue, or should we push it to lastValue?
  action: "replace" | "append";

  // A unique client-chosen 16-character string, echoed by the server in
  // updates, and used as the identifier to request subscription cancelation.
  subId: string;

  // awaiting-socket means we want to make this subscription but the socket is not ready yet
  // requesting means our sub rpc is in flight but has not been answered yet
  // active means our sub rpc completed successfully (which implies we have
  //   received the first update already) and we expect to receive future updates
  // stopping means our unsub rpc is in flight but has not been answered yet
  // error means our request to sub to the dataset got a failure reply, and a
  //   human should probably figure out why
  state: "awaiting-socket" | "requesting" | "active" | "stopping" | "error";

  // The last-known value of the subscription as provided by the server or the client.
  lastValue: DatasetValue;

  // A list of watchers of the data for this dataset.
  watchers: Watcher[];
};

const getWsUrl = () =>
  `${location.protocol === "https:" ? "wss" : "ws"}://${location.host}/ws`;

export type SocketState =
  | "connecting"
  | "connected-waiting-hello"
  | "connected"
  | "reconnect-wait"
  | "reconnecting"
  | "closing";

export type SocketStateChangeCallback = (state: SocketState) => void;

export class SocketManager {
  private sockState: SocketState;
  private sock: WebSocket;

  // Server-assigned connection ID.  Potentially useful for debugging?
  private connId: string | undefined;

  // Map from dataset to subscription state
  private subsByDataset: Map<DatasetKey, SubscriptionState>;
  private subsBySubId: Map<string, SubscriptionState>;

  // RPCs sent but for which we have not yet received a reply.  Cleared on reconnection, as we're abandoning those RPCs.
  private pendingRPCs: Map<number, MessageFromClient>;

  // The next unused RPC number.  Starts at 1 and increments for each RPC sent.  Resets to 1 on reconnection.
  private nextRpc: number;

  // How many times in a row our connection attempts have failed.
  private failureCount: number;

  // Bound event listener functions
  private onOpenBound: (e: Event) => void;
  private onMessageBound: (e: MessageEvent) => void;
  private onSocketConnectErrorBound: (e: Event) => void;
  private onSocketCloseBound: (e: CloseEvent) => void;

  private scriptUrl: string | undefined;
  private scriptUrlObserver: ((scriptUrl: string) => void) | undefined;
  private debug: boolean;

  private onConnectionStateChange: SocketStateChangeCallback;

  constructor(opts: {
    debug?: boolean;
    onConnectionStateChange: SocketStateChangeCallback;
  }) {
    this.subsByDataset = new Map<DatasetKey, SubscriptionState>();
    this.subsBySubId = new Map<string, SubscriptionState>();
    this.pendingRPCs = new Map<number, MessageFromClient>();

    this.nextRpc = 1;
    this.failureCount = 0;

    this.onOpenBound = this.onOpen.bind(this);
    this.onMessageBound = this.onMessage.bind(this);
    this.onSocketConnectErrorBound = this.onSocketConnectError.bind(this);
    this.onSocketCloseBound = this.onSocketClose.bind(this);

    this.debug = opts.debug ?? false;
    this.onConnectionStateChange = opts.onConnectionStateChange;

    this.sockState = "connecting";
    this.connId = undefined;
    this.sock = new WebSocket(getWsUrl());
    this.sock.addEventListener("open", this.onOpenBound);
    this.sock.addEventListener("message", this.onMessageBound);
    this.sock.addEventListener("error", this.onSocketConnectErrorBound);
    this.sock.addEventListener("close", this.onSocketCloseBound);

    this.onConnectionStateChange(this.sockState);
  }

  private updateConnectionState(newState: SocketState) {
    this.sockState = newState;

    try {
      this.onConnectionStateChange(newState);
    } catch (e) {
      console.error("Error in onConnectionStateChange", e);
    }
  }

  tryReconnect() {
    // Drop the event listeners on the old socket.  They don't matter any more,
    // and we don't want them to trigger additional events now.
    this.sock.removeEventListener("close", this.onSocketCloseBound);
    this.sock.removeEventListener("error", this.onSocketConnectErrorBound);
    this.sock.removeEventListener("message", this.onMessageBound);
    this.sock.removeEventListener("open", this.onOpenBound);

    // Reset state & connection id.
    this.updateConnectionState("reconnecting");
    this.connId = undefined;
    this.nextRpc = 1;
    this.pendingRPCs.clear();
    this.log(`attempting reconnect (failureCount ${this.failureCount})`);
    this.sock = new WebSocket(getWsUrl());
    this.sock.addEventListener("open", this.onOpenBound);
    this.sock.addEventListener("message", this.onMessageBound);
    this.sock.addEventListener("error", this.onSocketConnectErrorBound);
    this.sock.addEventListener("close", this.onSocketCloseBound);
  }

  log(...args: unknown[]) {
    if (this.debug) {
      this.logAlways(...args);
    }
  }

  logAlways(...args: unknown[]) {
    console.log(`ws: (${this.connId ?? "connId unknown"})`, ...args);
  }

  onOpen(_: Event) {
    this.updateConnectionState("connected-waiting-hello");
  }

  onMessage(e: MessageEvent) {
    const rawData = e.data as unknown;
    if (rawData instanceof ArrayBuffer) {
      this.log("ignoring binary frame", e);
    } else if (typeof rawData === "string") {
      this.log("msg", e);
      try {
        const data = JSON.parse(rawData) as MessageToClient;
        if (
          data.type === "hello" &&
          this.sockState === "connected-waiting-hello"
        ) {
          this.connId = data.connId;
          this.scriptUrl = data.scriptUrl;
          if (this.scriptUrlObserver) {
            this.scriptUrlObserver(data.scriptUrl);
          }
          this.log("Websocket connected & got hello");
          this.updateConnectionState("connected");
          this.failureCount = 0;
          this.tryDispatchPendingSubRequests();
        } else {
          const { type } = data;
          if (type === "update") {
            const { subId, value } = data;
            const sub = this.subsBySubId.get(subId);
            if (sub) {
              this.log(
                "Got update for sub",
                subId,
                "to dataset",
                sub.datasetKey,
              );
              // update the cached data for the corresponding sub
              let shouldDispatch =
                sub.state === "requesting" || sub.state === "active";
              switch (sub.action) {
                case "append":
                  {
                    const valueWithId = value as ObjectWithId;
                    if (
                      (sub.lastValue as ObjectWithId[]).findIndex(
                        (item: ObjectWithId) => item.id === valueWithId.id,
                      ) === -1
                    ) {
                      (sub.lastValue as ObjectWithId[]).push(valueWithId);
                    } else {
                      // Not new, don't dispatch.
                      shouldDispatch = false;
                    }
                  }
                  break;
                case "replace": {
                  const valueWithEpoch = value as ObjectWithEpoch;
                  if (
                    (sub.lastValue as ObjectWithEpoch).epoch <
                    valueWithEpoch.epoch
                  ) {
                    sub.lastValue = valueWithEpoch;
                  } else {
                    // Not newer than last-known, don't dispatch.
                    shouldDispatch = false;
                  }
                }
              }

              // notify watchers, if not stopping or failed
              if (value && shouldDispatch) {
                this.log("Dispatching to", sub.watchers.length, "watchers");
                sub.watchers.forEach((watcher) => {
                  watcher.callback(value);
                });
              }
            } else {
              this.log("Got update for unknown sub", subId, value);
            }
          } else if (type === "sub") {
            const { rpc, subId } = data;
            const sub = this.subsBySubId.get(subId);
            // if the sub's state is requesting, mark the sub as active.
            if (sub) {
              if (sub.state === "requesting") {
                this.log("Sub", subId, "for dataset", sub.datasetKey, "active");
                sub.state = "active";
              }
            }
            this.pendingRPCs.delete(rpc);
          } else if (type === "unsub") {
            // if the sub's state is stopping, mark the sub as stopped
            const { rpc, subId } = data;
            const sub = this.subsBySubId.get(subId);
            if (sub) {
              this.subsByDataset.delete(sub.datasetKey);
            }
            // This sub is fully terminated.
            this.subsBySubId.delete(subId);
            this.pendingRPCs.delete(rpc);
          } else if (type === "fail") {
            const { rpc } = data;
            const req = this.pendingRPCs.get(rpc);
            // This is bad.  Maybe we should disconnect and try again?
            this.logAlways("Got RPC failure", data, "for RPC", req);
            if (req) {
              const sub = this.subsBySubId.get(req.subId);
              if (sub) {
                sub.state = "error";
              }
            }
            this.pendingRPCs.delete(rpc);
          } else {
            this.log("Got unhandled message", e);
          }
        }
      } catch (err) {
        this.log("Failed to handle message:", err);
      }
    }
  }

  onSocketConnectError() {
    this.log("onSocketConnectError, state", this.sockState);
    this.updateConnectionState("reconnect-wait");
    this.failureCount += 1;
    // Attempt reconnection with exponential backoff (up to 64 seconds)
    const waitTimeMsec = Math.pow(2, Math.min(this.failureCount, 6)) * 1000;
    this.log(`Scheduling reconnect in ${waitTimeMsec} msec`);
    setTimeout(() => {
      this.tryReconnect();
    }, waitTimeMsec);
  }

  onSocketClose(_: CloseEvent) {
    this.log(
      "onSocketClose: socket closed, resetting sub states. state:",
      this.sockState,
    );
    const subsToDrop: SubscriptionState[] = [];
    this.subsByDataset.forEach((subState) => {
      if (subState.state === "active" || subState.state === "requesting") {
        // Rewind all active or starting-up subscription states to awaiting-socket.
        subState.state = "awaiting-socket";
      } else if (subState.state === "stopping") {
        // The socket is gone, so we no longer need to wait on the server to ack
        // our unsub to drop this subscription.
        subsToDrop.push(subState);
      }
    });
    subsToDrop.forEach((subState) => {
      this.subsByDataset.delete(subState.datasetKey);
      this.subsBySubId.delete(subState.subId);
    });

    // Start reconnect attempts with exponential backoff if we're not already
    // attempting recovery
    if (
      this.sockState !== "reconnect-wait" &&
      this.sockState !== "reconnecting"
    ) {
      this.onSocketConnectError();
    }
  }

  forceDisconnect() {
    // For supporting manual testing.
    this.updateConnectionState("closing");
    this.sock.close();
  }

  tryDispatchPendingSubRequests() {
    // Can't dispatch sub requests unless we're connected, so check that first.
    if (this.sockState === "connected") {
      // For each subscription in the map, if the subscription has state "awaiting-socket",
      // send the request and update the state to requesting by calling requestSub
      this.subsByDataset.forEach((subState) => {
        const { subId, dataset, params } = subState;
        if (subState.state === "awaiting-socket") {
          this.requestSub(dataset, params, subId);
          subState.state = "requesting";
        }
      });
    }
  }

  getNextRpcId(): number {
    const retval = this.nextRpc;
    this.nextRpc += 1;
    return retval;
  }

  requestSub(dataset: Dataset, params: DatasetParams, subId: string) {
    const rpcId = this.getNextRpcId();
    const request = {
      rpc: rpcId,
      method: "sub" as const,
      subId,
      dataset,
      params,
    };
    this.sendRpc(request);
  }

  cancelSub(subId: string) {
    const rpcId = this.getNextRpcId();
    const request = {
      rpc: rpcId,
      method: "unsub" as const,
      subId,
    };
    this.sendRpc(request);
  }

  sendRpc(request: MessageFromClient) {
    this.pendingRPCs.set(request.rpc, request);
    this.sock.send(JSON.stringify(request));
  }

  addWatcher(
    dataset: Dataset,
    params: DatasetParams,
    initialValue: DatasetValue,
    watcher: Watcher,
  ) {
    const datasetKey = deriveDatasetKey(dataset, params);
    let sub = this.subsByDataset.get(datasetKey);
    if (!sub || sub.state === "stopping" || sub.state === "error") {
      const subId = genId();
      const action = actionForDataset(dataset);
      // For append-type data sources, clone initialValue so that as we append to sub.lastValue
      // in-place, we're not modifying the initial value passed in in a way that might be surprising
      // to the caller.
      const lastValue =
        action === "append"
          ? [...(initialValue as ObjectWithId[])]
          : initialValue;
      sub = {
        datasetKey,
        dataset,
        params,
        action,
        subId,
        state: "awaiting-socket",
        lastValue,
        watchers: [],
      };
      this.subsByDataset.set(datasetKey, sub);
      this.subsBySubId.set(subId, sub);
      this.tryDispatchPendingSubRequests();
    }

    // If this client's initialValue is newer (or for append datasets: has any newer entries),
    // update (or merge them into) sub.lastValue, and dispatch the update to all other watchers.
    // Note that we do this *before* adding the requesting client to the list of watchers, so we
    // don't update it with its own data.
    //
    // Note that this works to dispatch updates to all tabs from other tabs, even if the websocket
    // is completely broken!
    switch (sub.action) {
      case "append": {
        const initialValueArray = initialValue as ObjectWithId[];
        const lastKnownId = (sub.lastValue as ObjectWithId[])
          .map((entry) => entry.id)
          .reduce((a, b) => (a > b ? a : b), -1);
        initialValueArray.forEach((entry) => {
          if (entry.id > lastKnownId) {
            this.log(
              `sub ${sub.subId} watcher initialValue entry ${entry.id} exceeds last known id ${lastKnownId}, dispatching to ${sub.watchers.length} watchers`,
            );
            (sub.lastValue as ObjectWithId[]).push(entry);
            sub.watchers.forEach((w) => {
              w.callback(entry);
            });
          }
        });
        break;
      }
      case "replace": {
        const initialValueWithEpoch = initialValue as ObjectWithEpoch;
        if (
          initialValueWithEpoch.epoch > (sub.lastValue as ObjectWithEpoch).epoch
        ) {
          sub.lastValue = initialValueWithEpoch;
          sub.watchers.forEach((w) => {
            w.callback(sub.lastValue);
          });
        }
        break;
      }
    }

    // Now that we've updated any existing watchers with anything newly learned from our
    // initialValue, we add this new client to the list of watchers, so we get future updates.
    sub.watchers.push(watcher);

    // Synthesize an event (or events) to deliver the last-known value to this new watcher, if it
    // differs from the initial value they passed in.  This is particularly relevant for the case
    // where another tab already has a watch on the same dataset, because the inital update will
    // have already been delivered by the server, and because we dedupe identical subscriptions on
    // the client, we would otherwise not trigger this callback until state changes and the server
    // pushes down an update.
    if (
      (sub.state === "requesting" || sub.state === "active") &&
      sub.lastValue !== initialValue
    ) {
      switch (sub.action) {
        case "append": {
          // Dispatch events for any entry with an id exceeding that provided in initialValue.
          const initialValueArray = initialValue as ObjectWithId[];
          const watcherLastDispatchedId = initialValueArray
            .map((entry) => entry.id)
            .reduce((a, b) => (a > b ? a : b), -1);
          (sub.lastValue as ObjectWithId[]).forEach((entry) => {
            if (entry.id > watcherLastDispatchedId) {
              watcher.callback(entry);
            }
          });
          // Now the new watcher should be caught up to what we have in `sub`.
          break;
        }
        case "replace": {
          watcher.callback(sub.lastValue);
        }
      }
    }
  }

  dropWatcher(dataset: Dataset, params: DatasetParams, watchId: string) {
    const datasetKey = deriveDatasetKey(dataset, params);
    const sub = this.subsByDataset.get(datasetKey);
    if (sub) {
      sub.watchers = sub.watchers.filter((w) => {
        return w.id !== watchId;
      });
      if (sub.watchers.length === 0) {
        // we're no longer using this subscription; tell the backend we can cancel it
        if (this.sockState === "connected") {
          this.log("Stopping sub", sub.subId, "for dataset", sub.datasetKey);
          sub.state = "stopping";
          this.cancelSub(sub.subId);
        } else {
          // If the socket is not connected, there's no way the sub is active,
          // so we can just delete it from the sub maps.
          this.subsByDataset.delete(sub.datasetKey);
          this.subsBySubId.delete(sub.subId);
        }
      }
    }
  }

  watch(
    dataset: Dataset,
    params: DatasetParams,
    initialValue: DatasetValue,
    onUpdate: (value: object) => void,
  ): () => void {
    const watchId = genId();
    const watcher = {
      id: watchId,
      callback: onUpdate,
    };
    this.log(
      "watch(",
      dataset,
      ",",
      JSON.stringify(params),
      ") => assigned watchId",
      watchId,
    );
    this.addWatcher(dataset, params, initialValue, watcher);
    return () => {
      this.log("stop(", watchId, ") for dataset", dataset);
      this.dropWatcher(dataset, params, watchId);
    };
  }

  // We expect only one observeScriptUrl caller
  observeScriptUrl(onUpdate: (scriptUrl: string) => void): () => void {
    this.scriptUrlObserver = onUpdate;
    if (this.scriptUrl) {
      this.scriptUrlObserver(this.scriptUrl);
    }
    return () => {
      this.scriptUrlObserver = undefined;
    };
  }
}
