import workersManifest from "../../../dist/worker-manifest.json";
import { SocketManager } from "../../../lib/SocketManager";
import {
  type MessageFromWorker,
  type MessageToWorker,
  type Dataset,
  type DatasetParams,
} from "../../../lib/api/websocket";
import { genId } from "../../../lib/id";

class DirectDatasetManager {
  private socketManager: SocketManager;
  constructor() {
    this.socketManager = new SocketManager();
  }

  watch(
    dataset: Dataset,
    params: DatasetParams,
    onUpdate: (value: object) => void,
  ): () => void {
    return this.socketManager.watch(dataset, params, onUpdate);
  }
}

type Watch = {
  id: string;
  dataset: Dataset;
  params: DatasetParams;
  callback: (value: object) => void;
};

class SharedWorkerDatasetManager {
  // reference to shared worker
  private sharedWorker: SharedWorker;
  // map from subid to watch
  private watches: Map<string, Watch>;

  private lockId: string;

  private scriptUrl: string;

  private handleMessageFromWorkerBound: (
    e: MessageEvent<MessageFromWorker>,
  ) => void;

  constructor() {
    this.watches = new Map<string, Watch>();
    this.scriptUrl = workersManifest["websocket_worker.js"];
    this.handleMessageFromWorkerBound = this.handleMessageFromWorker.bind(this);
    this.sharedWorker = new SharedWorker(this.scriptUrl);
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
    // * Close our port to the old worker, so it can be GC'd by the browser.  It
    //   will terminate itself after telling us the new worker script URL.
    this.sharedWorker.port.close();
    // * Remove the event listener, so we will no longer receive messages from the worker.
    this.sharedWorker.port.removeEventListener(
      "message",
      this.handleMessageFromWorkerBound,
    );
    // * Create a new worker (precondition: this.scriptUrl should have been updated to the new URL)
    this.sharedWorker = new SharedWorker(this.scriptUrl);
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
      const { id, dataset, params } = watch;
      const subMessage: MessageToWorker = {
        type: "sub",
        subId: id,
        dataset,
        params,
      };
      this.sharedWorker.port.postMessage(subMessage);
    });
  }

  watch(
    dataset: Dataset,
    params: DatasetParams,
    onUpdate: (value: object) => void,
  ): () => void {
    const watchId = genId();
    console.log(
      `starting watch ${watchId} for ${dataset}:${JSON.stringify(params)}`,
    );
    const watch = {
      id: watchId,
      dataset,
      params,
      callback: onUpdate,
    };
    this.watches.set(watchId, watch);
    const subMessage: MessageToWorker = {
      type: "sub",
      subId: watchId,
      dataset,
      params,
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

// Use the SharedWorkerDatasetManager implementation if the user agent supports it.
// Otherwise, use the DirectDatasetManager implementation (e.g. Chrome for Android)
const USE_WORKER = !!window.SharedWorker as boolean;
const globalDatasetManager = USE_WORKER
  ? new SharedWorkerDatasetManager()
  : new DirectDatasetManager();
export default globalDatasetManager;
