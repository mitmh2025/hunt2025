import { SocketManager } from "../lib/SocketManager";
import { type MessageFromWorker, type MessageToWorker } from "../lib/websocket";

type Watch = {
  subId: string;
  dataset: string;
  port: MessagePort;
  stop: () => void;
};

const DEBUG = false as boolean;

class WatchManager {
  // List of subIds associated with each MessagePort, so we can drop them when we observe a port close
  private subIdsByPort: Map<MessagePort, string[]>;

  // Watches, indexed by subId
  private subsById: Map<string, Watch>;

  constructor() {
    this.subsById = new Map<string, Watch>();
    this.subIdsByPort = new Map<MessagePort, string[]>();
  }

  addWatch({ subId, dataset, port, stop }: Watch) {
    this.subsById.set(subId, { subId, dataset, port, stop });
    const existingSubsForPort: string[] = this.subIdsByPort.get(port) ?? [];
    const newSubsForPort = [...existingSubsForPort, subId];
    this.subIdsByPort.set(port, newSubsForPort);
  }

  dropSubId(subId: string) {
    const watch = this.subsById.get(subId);
    if (watch) {
      const { port, stop } = watch;
      stop();
      if (DEBUG) {
        console.log("dropping watch for sub", subId);
        port.postMessage({
          type: "debug",
          value: `dropping watch for sub ${subId}`,
        });
      }
      this.subsById.delete(subId);
      const remainingSubIds = (this.subIdsByPort.get(watch.port) ?? []).filter(
        (s: string) => {
          return s !== subId;
        },
      );
      if (remainingSubIds.length > 0) {
        this.subIdsByPort.set(port, remainingSubIds);
      } else {
        this.subIdsByPort.delete(port);
      }
    } else {
      console.log(
        "Got request to drop sub",
        subId,
        "but could not find it in subsById",
      );
    }
  }

  dropAllSubsForPort(port: MessagePort) {
    const subIds = this.subIdsByPort.get(port) ?? [];
    for (const subId of subIds) {
      this.dropSubId(subId);
    }
  }
}

// globals
const socketManager = new SocketManager();
const watchManager = new WatchManager();
// Attach these to the worker global scope, for debug convenience
(self as unknown as { socketManager: SocketManager }).socketManager =
  socketManager;
(self as unknown as { watchManager: WatchManager }).watchManager = watchManager;

(self as unknown as SharedWorkerGlobalScope).addEventListener(
  "connect",
  (e: MessageEvent) => {
    const port = e.ports[0];
    if (port) {
      port.addEventListener("message", (ev: MessageEvent<MessageToWorker>) => {
        if (DEBUG) {
          console.log("got message", ev);
          port.postMessage({
            type: "debug",
            value: `got message: ${JSON.stringify(ev.data)}`,
          });
        }
        if (ev.data.type === "sub") {
          const { dataset, subId } = ev.data;
          const stop = socketManager.watch(dataset, (value: object) => {
            if (DEBUG) {
              console.log("got update for sub", subId, value);
              port.postMessage({
                type: "debug",
                value: `got update for sub ${subId}`,
              });
            }
            const update: MessageFromWorker = { type: "update", subId, value };
            port.postMessage(update);
          });
          const watch = {
            subId,
            dataset,
            port,
            stop,
          };
          watchManager.addWatch(watch);
        } else if (ev.data.type === "unsub") {
          const { subId } = ev.data;
          watchManager.dropSubId(subId);
        } else {
          // type is bind
          const { lock } = ev.data;
          console.log("Bound port lifetime to lock", lock);
          // Request the named lock.  If we ever actually get it, the lock was
          // dropped by the tab because the tab died, so drop all subs for the
          // port.
          void navigator.locks.request(lock, () => {
            console.log(
              "Acquired lock",
              lock,
              "; dropping subs for associated port",
            );
            watchManager.dropAllSubsForPort(port);
            port.close();
          });
        }
      });
      port.start();
      port.addEventListener("messageerror", (_: MessageEvent) => {
        if (DEBUG) {
          port.postMessage({ type: "debug", value: `messageerror` });
        }
      });
      if (DEBUG) {
        port.postMessage({ type: "debug", value: "worker got connection" });
      }
    }
  },
);
