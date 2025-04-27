import type datasetManager from "@hunt_client/globalDatasetManager";
import workersManifest from "../../../dist/worker-manifest.json";
import huntLocalStorage from "../../../src/frontend/utils/huntLocalStorage";
import {
  SocketManager,
  actionForDataset,
  type SocketState,
  type SocketStateChangeCallback,
} from "../../SocketManager";
import { genId } from "../../id";
import {
  type Dataset,
  type DatasetParams,
  type DatasetValue,
  type MessageFromWorker,
  type MessageToWorker,
  type ObjectWithEpoch,
  type ObjectWithId,
} from "../websocket";

type DatasetManager = typeof datasetManager;

class DirectDatasetManager {
  private socketManager: SocketManager;

  constructor({
    onConnectionStateChange,
  }: {
    onConnectionStateChange: SocketStateChangeCallback;
  }) {
    this.socketManager = new SocketManager({
      onConnectionStateChange,
    });
  }

  watch(
    dataset: Dataset,
    params: DatasetParams,
    initialValue: DatasetValue,
    onUpdate: (value: object) => void,
  ): () => void {
    return this.socketManager.watch(dataset, params, initialValue, onUpdate);
  }
}

type Watch = {
  id: string;
  dataset: Dataset;
  params: DatasetParams;
  value: DatasetValue;
  callback: (value: object) => void;
};

class SharedWorkerDatasetManager {
  // reference to shared worker
  private sharedWorker: SharedWorker;
  // map from subid to watch
  private watches: Map<string, Watch>;

  private lockId: string;

  private scriptUrl: string;

  private username: string;

  private handleMessageFromWorkerBound: (
    e: MessageEvent<MessageFromWorker>,
  ) => void;

  private onConnectionStateChange: SocketStateChangeCallback;

  constructor(
    username: string,
    {
      onConnectionStateChange,
    }: {
      onConnectionStateChange: SocketStateChangeCallback;
    },
  ) {
    this.onConnectionStateChange = onConnectionStateChange;
    this.username = username;
    this.watches = new Map<string, Watch>();
    this.scriptUrl = workersManifest["websocket_worker.js"];
    this.handleMessageFromWorkerBound = this.handleMessageFromWorker.bind(this);
    this.sharedWorker = new SharedWorker(
      this.scriptUrl + `?username=${username}`,
    );
    this.sharedWorker.port.addEventListener(
      "message",
      this.handleMessageFromWorkerBound,
    );
    this.sharedWorker.port.start();
    this.notifyWorkerInitialScript();
    // Generate a random lock ID for this tab
    this.lockId = genId();
    if ("locks" in navigator) {
      void navigator.locks.request(this.lockId, (_lock: Lock | null) => {
        // Tell the shared worker what lock to monitor for this channel.
        this.sharedWorker.port.postMessage({ type: "bind", lock: this.lockId });
        // Return a promise that never resolves nor rejects, so that we never release the lock.
        // Dropping the lock is intended to be interpreted as the death of the client.
        return new Promise((_resolve, _reject) => {
          // Do nothing.
        });
      });
    }
  }

  handleMessageFromWorker(e: MessageEvent<MessageFromWorker>) {
    if (e.data.type === "debug") {
      console.log("worker debug", e.data.value);
    }
    if (e.data.type === "update") {
      const { subId, value } = e.data;
      const watch = this.watches.get(subId);
      if (watch) {
        if (actionForDataset(watch.dataset) === "append") {
          (watch.value as ObjectWithId[]).push(value as ObjectWithId);
        } else {
          watch.value = value as ObjectWithEpoch;
        }
        watch.callback(value);
      }
    }
    if (e.data.type === "new_script_url") {
      const { scriptUrl } = e.data;
      if (this.scriptUrl !== scriptUrl) {
        console.log(
          `worker scriptUrl changed from ${this.scriptUrl} to ${scriptUrl}, restarting worker`,
        );
        this.scriptUrl = scriptUrl;
        this.restartWorker();
      }
    }

    if (e.data.type === "connection_state_change") {
      this.onConnectionStateChange(e.data.state);
    }
  }

  notifyWorkerInitialScript() {
    const startupMessage: MessageToWorker = {
      type: "set_initial_script_url",
      initialScriptUrl: this.scriptUrl,
    };
    this.sharedWorker.port.postMessage(startupMessage);
  }

  restartWorker() {
    // Executed when we get notified of a new script URL from the current shared worker.
    // We will, in order:
    // * Close our port to the old worker, so it can be GC’d by the browser.  It
    //   will terminate itself after telling us the new worker script URL.
    this.sharedWorker.port.close();
    // * Remove the event listener, so we will no longer receive messages from the worker.
    this.sharedWorker.port.removeEventListener(
      "message",
      this.handleMessageFromWorkerBound,
    );
    // * Create a new worker (precondition: this.scriptUrl should have been updated to the new URL)
    this.sharedWorker = new SharedWorker(
      this.scriptUrl + `?teamId=${this.username}`,
    );
    this.sharedWorker.port.addEventListener(
      "message",
      this.handleMessageFromWorkerBound,
    );
    this.sharedWorker.port.start();
    this.notifyWorkerInitialScript();
    // * if web locks are available, bind the port with our lockId, which we should already be holding.
    if ("locks" in navigator) {
      this.sharedWorker.port.postMessage({ type: "bind", lock: this.lockId });
    }
    // * re-post the watch requests, so the new worker will establish them
    this.watches.forEach((watch) => {
      const { id, dataset, params, value } = watch;
      const subMessage: MessageToWorker = {
        type: "sub",
        subId: id,
        dataset,
        params,
        initialValue: value, // Resubscribe starting from last-known state
      };
      this.sharedWorker.port.postMessage(subMessage);
    });
  }

  watch(
    dataset: Dataset,
    params: DatasetParams,
    initialValue: DatasetValue,
    onUpdate: (value: object) => void,
  ): () => void {
    const watchId = genId();
    console.log(
      `starting watch ${watchId} for ${dataset}:${JSON.stringify(params)}`,
    );
    // If this is an append dataset, detach from initialValue lest we inadvertently modify it
    // in-place in a manner surprising to the caller when we get updates.
    const value =
      actionForDataset(dataset) === "append"
        ? [...(initialValue as ObjectWithId[])]
        : initialValue;
    const watch = {
      id: watchId,
      dataset,
      params,
      value,
      callback: onUpdate,
    };
    this.watches.set(watchId, watch);
    const subMessage: MessageToWorker = {
      type: "sub",
      subId: watchId,
      dataset,
      params,
      initialValue,
    };
    this.sharedWorker.port.postMessage(subMessage);
    return () => {
      console.log(`dropping watch ${watchId}`);
      this.watches.delete(watchId);
      const unsubMessage: MessageToWorker = { type: "unsub", subId: watchId };
      this.sharedWorker.port.postMessage(unsubMessage);
    };
  }
}

const initialUsername = huntLocalStorage.getItem("username");
const newUsername = new URLSearchParams(document.location.search).get(
  "loginUsername",
);

if (newUsername) {
  if (initialUsername !== newUsername) {
    // Team username changed; clear localStorage and reload
    huntLocalStorage.clear();
    huntLocalStorage.setItem("username", newUsername);

    location.reload();
  }

  huntLocalStorage.setItem("username", newUsername);

  // Remove the loginUsername query parameter
  const newSearch = new URLSearchParams(document.location.search);
  newSearch.delete("loginUsername");
  document.location.search = newSearch.toString();
}

// Use the SharedWorkerDatasetManager implementation if the user agent supports it.
// Otherwise, use the DirectDatasetManager implementation (e.g. Chrome for Android)

function handleConnectionStateChange(state: SocketState) {
  console.log(`Connection state changed: ${state}`);
  document.dispatchEvent(
    new CustomEvent("hunt:socketStateChange", { detail: state }),
  );

  (
    window as unknown as { huntConnectionState: SocketState }
  ).huntConnectionState = state;
}

const USE_WORKER = !!window.SharedWorker as boolean;
const globalDatasetManager = USE_WORKER
  ? new SharedWorkerDatasetManager(initialUsername ?? "unknown", {
      onConnectionStateChange: handleConnectionStateChange,
    })
  : new DirectDatasetManager({
      onConnectionStateChange: handleConnectionStateChange,
    });
export default globalDatasetManager satisfies DatasetManager;

huntLocalStorage.addEventListener("storage", (evt) => {
  if (evt.key === "username") {
    // Check for team ID change
    if (evt.newValue !== initialUsername) {
      // Team ID changed; reload
      location.reload();
    }
  }
});
