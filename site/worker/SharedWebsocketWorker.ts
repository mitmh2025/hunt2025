import { SocketManager } from "../lib/SocketManager";
import {
  type MessageFromWorker,
  type MessageToWorker,
} from "../lib/api/websocket";

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

// Additional globals

// The set of live ports.  We need to keep a list of them so we can notify them
// all about a new script URL, even if there are no active subscriptions.
const livePorts: Set<MessagePort> = new Set<MessagePort>();
// The script URL sent to us by the browser tab, based on what was known when
// that client script was bundled.
let clientExpectedScriptUrl: string | undefined = undefined;
// The script URL sent to us by the server in the hello message when the
// websocket first connected.
let serverExpectedScriptUrl: string | undefined = undefined;

socketManager.observeScriptUrl((scriptUrl: string) => {
  serverExpectedScriptUrl = scriptUrl;
  console.log("server url is now", scriptUrl);
  notifyScriptUrlsIfNeeded();
});

function notifyScriptUrlsIfNeeded() {
  // If the script URL known to the server is not the one known to the client,
  // the assumption is that we did a deploy which changed the worker's script
  // version.  In that circumstance, we would like to migrate to the new
  // version, which means 1) telling all the live tabs about it, and 2) shutting
  // this worker down.
  if (
    clientExpectedScriptUrl !== undefined &&
    serverExpectedScriptUrl !== undefined &&
    clientExpectedScriptUrl !== serverExpectedScriptUrl
  ) {
    console.log(
      `worker got new script URL (old: ${clientExpectedScriptUrl}, new ${serverExpectedScriptUrl}`,
    );
    // Notify all live ports that there's a new script URL and we're about to go
    // away, which should prompt them to drop their reference to us and spawn a
    // new SharedWorker.
    const scriptUrl = serverExpectedScriptUrl;
    const message: MessageFromWorker = {
      type: "new_script_url",
      scriptUrl,
    };
    console.log("Notifying each of", livePorts);
    livePorts.forEach((port) => {
      port.postMessage(message);
    });
    console.log("shutting self down");
    // Terminate ourselves.  The user-agent will clean up the websocket and message ports and such.
    self.close();
  }
}

(self as unknown as SharedWorkerGlobalScope).addEventListener(
  "connect",
  (e: MessageEvent) => {
    const port = e.ports[0];
    if (port) {
      livePorts.add(port);
      port.addEventListener("message", (ev: MessageEvent<MessageToWorker>) => {
        if (DEBUG) {
          console.log("got message", ev);
          port.postMessage({
            type: "debug",
            value: `got message: ${JSON.stringify(ev.data)}`,
          });
        }
        if (ev.data.type === "set_initial_script_url") {
          // We only care about setting this once, and it should always be the same URL.
          if (clientExpectedScriptUrl === undefined) {
            clientExpectedScriptUrl = ev.data.initialScriptUrl;
            console.log("client url is now", ev.data.initialScriptUrl);
            notifyScriptUrlsIfNeeded();
          }
        } else if (ev.data.type === "sub") {
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
            livePorts.delete(port);
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
