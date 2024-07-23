import { SocketManager } from "../lib/SocketManager";
import { type MessageFromWorker, type MessageToWorker } from "../lib/websocket";

type Watch = {
  subId: string;
  dataset: string;
  port: MessagePort;
  stop: () => void;
};

const DEBUG = false as boolean;

// global socket manager
const socketManager = new SocketManager();
// subId to Watch
const subs = new Map<string, Watch>();

(self as unknown as SharedWorkerGlobalScope).addEventListener(
  "connect",
  (e: MessageEvent) => {
    const port = e.ports[0];
    if (port) {
      port.addEventListener("message", (ev: MessageEvent<MessageToWorker>) => {
        if (DEBUG) {
          port.postMessage({
            type: "debug",
            value: `got message: ${JSON.stringify(ev.data)}`,
          });
        }
        if (ev.data.type === "sub") {
          const { dataset, subId } = ev.data;
          const stop = socketManager.watch(dataset, (value: object) => {
            if (DEBUG) {
              port.postMessage({
                type: "debug",
                value: `got update for sub ${subId}`,
              });
            }
            const update: MessageFromWorker = { type: "update", subId, value };
            port.postMessage(update);
          });
          subs.set(subId, {
            subId,
            dataset,
            port,
            stop,
          });
        } else {
          const { subId } = ev.data;
          const watch = subs.get(subId);
          if (watch) {
            watch.stop();
            if (DEBUG) {
              port.postMessage({
                type: "debug",
                value: `dropping watch for sub ${subId}`,
              });
            }
            subs.delete(subId);
          }
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
