import { genId } from "./id";
import {
  type Dataset,
  type MessageFromClient,
  type MessageToClient,
} from "./websocket";

type Watcher = {
  // A unique id for the watcher (so we can remove particular watchers from the list)
  id: string;
  // The function that should be called when the observed data changes
  callback: (value: object) => void;
};

type SubscriptionState = {
  dataset: Dataset;

  // A unique client-chosen 16-character string, echoed by the server in
  // updates, and used as the identifier to request subscription cancelation.
  subId: string;

  // awaiting-socket means we want to make this subscription but the socket is not ready yet
  // requesting means our sub rpc is in flight but has not been answered yet
  // active means out sub rpc completed successfully and we expect to receive updates
  // stopping means our unsub rpc is in flight but has not been answered yet
  // stopped means our unsub rpc completed.  we keep the sub around so that we can reuse the lastValue if the sub is started up again.
  state:
    | "awaiting-socket"
    | "requesting"
    | "active"
    | "stopping"
    | "stopped"
    | "error";

  // The last-known value of the subscription as provided by the server.
  lastValue: object | undefined;

  // A list of watchers of the data for this dataset.
  watchers: Watcher[];
};

const getWsUrl = () =>
  `${location.protocol === "https" ? "wss" : "ws"}://${location.host}/ws`;

export class SocketManager {
  private sockState:
    | "connecting"
    | "connected-waiting-hello"
    | "connected"
    | "reconnect-wait"
    | "reconnecting"
    | "closing";
  private sock: WebSocket;

  // Server-assigned connection ID.  Potentially useful for debugging?
  private connId: string | undefined;

  // Map from dataset to subscription state
  private subsByDataset: Map<Dataset, SubscriptionState>;
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

  private debug: boolean;

  constructor(debug = false) {
    this.subsByDataset = new Map<Dataset, SubscriptionState>();
    this.subsBySubId = new Map<string, SubscriptionState>();
    this.pendingRPCs = new Map<number, MessageFromClient>();

    this.nextRpc = 1;
    this.failureCount = 0;

    this.onOpenBound = this.onOpen.bind(this);
    this.onMessageBound = this.onMessage.bind(this);
    this.onSocketConnectErrorBound = this.onSocketConnectError.bind(this);
    this.onSocketCloseBound = this.onSocketClose.bind(this);

    this.debug = debug;

    this.sockState = "connecting";
    this.connId = undefined;
    this.sock = new WebSocket(getWsUrl());
    this.sock.addEventListener("open", this.onOpenBound);
    this.sock.addEventListener("message", this.onMessageBound);
    this.sock.addEventListener("error", this.onSocketConnectErrorBound);
    this.sock.addEventListener("close", this.onSocketCloseBound);
  }

  tryReconnect() {
    // Drop the event listeners on the old socket.  They don't matter any more,
    // and we don't want them to trigger additional events now.
    this.sock.removeEventListener("close", this.onSocketCloseBound);
    this.sock.removeEventListener("error", this.onSocketConnectErrorBound);
    this.sock.removeEventListener("message", this.onMessageBound);
    this.sock.removeEventListener("open", this.onOpenBound);

    // Reset state & connection id.
    this.sockState = "reconnecting";
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
    this.sockState = "connected-waiting-hello";
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
          this.sockState = "connected";
          this.failureCount = 0;
          this.tryDispatchPendingSubRequests();
        } else {
          const { type } = data;
          if (type === "update") {
            const { subId, value } = data;
            const sub = this.subsBySubId.get(subId);
            if (sub) {
              // update the cached data for the corresponding sub
              sub.lastValue = value as object;
              // notify watchers
              if (value) {
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
                sub.state = "active";
              }
            }
            this.pendingRPCs.delete(rpc);
          } else if (type === "unsub") {
            // if the sub's state is stopping, mark the sub as stopped
            const { rpc, subId } = data;
            const sub = this.subsBySubId.get(subId);
            if (sub) {
              if (sub.state === "stopping") {
                sub.state = "stopped";
              }
            }
            // This subId is fully terminated.  We leave the SubscriptionState
            // around in subsByDataset so we can reuse the lastValue, but we can
            // now drop it from subsBySubId.
            this.subsBySubId.delete(subId);
            this.pendingRPCs.delete(rpc);
          } else if (type === "fail") {
            const { rpc } = data;
            // This is bad.  Maybe we should disconnect and try again?
            this.logAlways(
              "Got RPC failure",
              data,
              "for RPC",
              this.pendingRPCs.get(rpc),
            );
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
    this.sockState = "reconnect-wait";
    this.failureCount += 1;
    // Attempt reconnection with exponential backoff (up to 256 seconds)
    const waitTimeMsec = Math.pow(2, Math.min(this.failureCount, 8)) * 1000;
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
    // Reset all subscription states to awaiting-socket
    this.subsByDataset.forEach((subState) => {
      subState.state = "awaiting-socket";
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
    this.sockState = "closing";
    this.sock.close();
  }

  tryDispatchPendingSubRequests() {
    // Can't dispatch sub requests unless we're connected, so check that first.
    if (this.sockState === "connected") {
      // For each subscription in the map, if the subscription has state "awaiting-socket",
      // send the request and update the state to requesting by calling requestSub
      this.subsByDataset.forEach((subState, dataset) => {
        const subId = subState.subId;
        if (subState.state === "awaiting-socket") {
          this.requestSub(dataset, subId);
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

  requestSub(dataset: Dataset, subId: string) {
    const rpcId = this.getNextRpcId();
    const request = {
      rpc: rpcId,
      method: "sub" as const,
      subId,
      dataset,
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

  addWatcher(dataset: Dataset, watcher: Watcher) {
    let sub = this.subsByDataset.get(dataset);
    if (
      !sub ||
      sub.state === "stopping" ||
      sub.state === "stopped" ||
      sub.state === "error"
    ) {
      const subId = genId();
      sub = {
        dataset,
        subId,
        state: "awaiting-socket",
        lastValue: sub?.lastValue, // Reuse the last-known sub value.
        watchers: [],
      };
      this.subsByDataset.set(dataset, sub);
      this.subsBySubId.set(subId, sub);
      this.tryDispatchPendingSubRequests();
    }
    sub.watchers.push(watcher);
  }

  dropWatcher(dataset: Dataset, watchId: string) {
    const sub = this.subsByDataset.get(dataset);
    if (sub) {
      sub.watchers = sub.watchers.filter((w) => {
        return w.id !== watchId;
      });
      if (sub.watchers.length === 0) {
        // we're no longer using this subscription; tell the backend we can cancel it
        sub.state = "stopping";
        this.cancelSub(sub.subId);
      }
    }
  }

  watch(dataset: Dataset, onUpdate: (value: object) => void): () => void {
    const watchId = genId();
    const watcher = {
      id: watchId,
      callback: onUpdate,
    };
    this.addWatcher(dataset, watcher);
    return () => {
      this.dropWatcher(dataset, watchId);
    };
  }
}
