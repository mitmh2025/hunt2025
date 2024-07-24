import workersManifest from "../../../dist/worker-manifest.json";
import { SocketManager } from "../../../lib/SocketManager";
import { genId } from "../../../lib/id";
import {
  type MessageFromWorker,
  type MessageToWorker,
  type Dataset,
} from "../../../lib/websocket";

class DirectDatasetManager {
  private socketManager: SocketManager;
  constructor() {
    this.socketManager = new SocketManager();
  }

  watch(dataset: Dataset, onUpdate: (value: object) => void): () => void {
    return this.socketManager.watch(dataset, onUpdate);
  }
}

class SharedWorkerDatasetManager {
  // reference to shared worker
  private sharedWorker: SharedWorker;
  // map from subid to callback
  private watches: Map<string, (value: object) => void>;

  private lockId: string;

  constructor() {
    this.watches = new Map<string, (value: object) => void>();
    this.sharedWorker = new SharedWorker(
      workersManifest["websocket_worker.js"],
    );
    this.sharedWorker.port.addEventListener(
      "message",
      (e: MessageEvent<MessageFromWorker>) => {
        if (e.data.type === "debug") {
          console.log("worker debug", e.data.value);
        }
        if (e.data.type === "update") {
          const { subId, value } = e.data;
          const update = this.watches.get(subId);
          if (update) {
            update(value);
          }
        }
      },
    );
    this.sharedWorker.port.start();
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

  watch(dataset: Dataset, onUpdate: (value: object) => void): () => void {
    const watchId = genId();
    console.log(`starting watch ${watchId}`);
    this.watches.set(watchId, onUpdate);
    const subMessage: MessageToWorker = {
      type: "sub",
      subId: watchId,
      dataset,
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
