import { type FrontendClient } from "../../../lib/api/frontend_client";
import { type InternalActivityLogEntry } from "../../../lib/api/frontend_contract";
import { genId } from "../../../lib/id";
import { activityLog, type Log, type RedisClient } from "../../api/redis";

type Listener<T> = {
  id: string;
  callback: (items: T[]) => void;
};

// ready: we have a live pubsub connection and have backfilled the log.
// stale: we have not received a message on pubsub for a while, or we have received one with an unexpected id, so we have a fetcher request outstanding
// fetch-error-wait: a backfill fetch failed and we are in exponential backoff waiting before we try to make another request
// fetch-error: a backfill fetch failed, the wait time passed, and we have a new backfill fetch in flight
type StreamTailerState = "ready" | "stale" | "fetch-error-wait" | "fetch-error";

const DEBUG_TAILER = true as boolean;

export type DatasetTailer<T extends { id: number }> = {
  readyPromise(): Promise<void>;

  watchLog(onItems: (items: T[]) => void): () => void;

  stopWatch(id: string): void;
};

export class StreamDatasetTailer<T extends { id: number }> {
  // Our redis client handle.
  private redisClient: RedisClient;

  // The function we invoke to fetch the underlying data, which probably should bottom out in a FrontendClient (but we're not going to be particular for the purposes of this exercise)
  private fetcher: (since?: number) => Promise<T[]>;

  // The log we are subscribing to
  private redisLog: Log<T>;

  // The full, sorted-by-id history of all confirmed events, which we have already emitted to all listeners
  private entries: T[];

  // The list of observers which want to get updates when the dataset changes.  We dispatch in
  // batches as large as we receive them mostly to save on function call overhead.
  private listeners: Map<string, Listener<T>>;

  // The state of this dataset tailer overall
  private state: StreamTailerState;

  // After how many milliseconds of no message on pubsub should we consider our data potentially stale and trigger another
  private idleTimeoutMsec: number;
  // If defined, the handle for the setTimeout that will trigger the idle timeout
  private idleTimeoutHandle: NodeJS.Timeout | undefined;

  // How many fetches have failed in a row? (governs exponential backoff)
  private fetchFailureCount: number;

  // Promise which fulfills once we have successfully set up pubsub listening and performed an initial backfill
  private ready: Promise<void>;

  // Callback thunk we call when the ready promise should resolve
  private fulfillReady: (() => void) | undefined;

  constructor({
    redisClient,
    fetcher,
    log,
    idleTimeoutMsec,
  }: {
    redisClient: RedisClient;
    fetcher: (since?: number) => Promise<T[]>;
    log: Log<T>;
    idleTimeoutMsec?: number;
  }) {
    this.redisClient = redisClient;
    this.fetcher = fetcher;
    this.redisLog = log;
    this.entries = [];
    this.listeners = new Map<string, Listener<T>>();
    this.state = "ready";
    this.idleTimeoutHandle = undefined;
    this.idleTimeoutMsec = idleTimeoutMsec ?? 60000;
    this.fetchFailureCount = 0;
    this.ready = new Promise((resolve) => {
      this.fulfillReady = resolve;
    });
    this.start();
  }

  protected log(...args: unknown[]) {
    if (DEBUG_TAILER) {
      console.log(`DatasetTailer(${this.state})`, ...args);
    }
  }

  protected lastKnownId(): number | undefined {
    if (this.entries.length > 0) {
      return this.entries[this.entries.length - 1]?.id;
    } else {
      return undefined;
    }
  }

  protected setIdleTimer() {
    console.assert(this.idleTimeoutHandle === undefined);
    this.idleTimeoutHandle = setTimeout(
      this.onIdleTimerTimeout.bind(this),
      this.idleTimeoutMsec,
    );
  }

  protected clearIdleTimer() {
    if (this.idleTimeoutHandle !== undefined) {
      clearTimeout(this.idleTimeoutHandle);
      this.idleTimeoutHandle = undefined;
    }
  }

  protected resetIdleTimer() {
    this.clearIdleTimer();
    this.setIdleTimer();
  }

  protected onIdleTimerTimeout() {
    this.idleTimeoutHandle = undefined;
    if (this.state === "ready") {
      this.state = "stale";
      this.log("starting backfill fetch (idle timeout reached)");
      this.fetch();
    }
  }

  protected onFetch(entries: T[]) {
    this.state = "ready";
    this.fulfillReady?.();
    this.fetchFailureCount = 0;
    this.log(`fetch got ${entries.length} entries`);
    const lastKnown = this.lastKnownId();
    // Figure out what subset of the entries we should be dispatching.
    if (lastKnown === undefined) {
      // Implies this.entries is empty, so we should dispatch everything.
      this.dispatch(entries);
    } else {
      // We may need to drop some duplicate entries that we may have picked up via pubsub (while the
      // fetch was in flight) at the beginning of the list of entries.
      const firstNewIndex = entries.findIndex((entry) => entry.id > lastKnown);
      if (firstNewIndex === 0) {
        // Special case: avoid copying the array if the first element is fine
        this.dispatch(entries);
      } else if (firstNewIndex === -1) {
        // Nothing is new.  Dispatch nothing.
      } else {
        // Slice off just the relevant list of entries.  Dispatch it, and append that slice to the committed (dispatched) log.
        const newSlice = entries.slice(firstNewIndex);
        this.dispatch(newSlice);
      }
    }

    // Start background poll loop
    this.resetIdleTimer();
  }

  protected fetch() {
    // Triggers an update fetch against the backend
    if (this.state === "stale" || this.state === "fetch-error") {
      this.fetcher(this.lastKnownId())
        .then((entries) => {
          this.onFetch(entries);
        })
        .catch((err: unknown) => {
          this.state = "fetch-error-wait";
          this.log("Fetch failed :(", err);
          // exponential backoff on refetching, from 1 up to 32 sec between attempts
          const waitTimeMsec =
            Math.pow(2, Math.min(this.fetchFailureCount, 5)) * 1000;
          this.fetchFailureCount += 1;
          setTimeout(this.onFetchBackoffTimeout.bind(this), waitTimeMsec);
        });
    }
  }

  protected onFetchBackoffTimeout() {
    this.state = "fetch-error";
    this.fetch();
  }

  protected async redisThread() {
    for (;;) {
      try {
        await this.redisClient.executeIsolated(async (redisClient) => {
          try {
            for (;;) {
              const lastKnown = this.lastKnownId();
              const results = await this.redisLog.getGlobalLog(
                redisClient,
                lastKnown,
                { BLOCK: 0 },
              );
              this.log(`Got ${results.entries.length} stream messages`);
              this.dispatch(results.entries);
            }
          } catch (e: unknown) {
            this.log("getGlobalLog failed:", e);
          }
        });
      } catch (e: unknown) {
        this.log("redis executeIsolated failed:", e);
      }
    }
  }

  protected start() {
    this.log("starting redis connection");
    void this.redisThread();
  }

  private dispatch(entries: T[]) {
    this.fulfillReady?.();
    // Call all the listener callbacks on this batch of entries
    if (entries.length > 0) {
      this.listeners.forEach((listener) => {
        listener.callback(entries);
      });
    }
    this.entries = this.entries.concat(entries);
  }

  // Public API
  readyPromise(): Promise<void> {
    return this.ready;
  }

  watchLog(onItems: (items: T[]) => void): () => void {
    const id = genId();
    const listener = {
      id,
      callback: onItems,
    };
    this.listeners.set(id, listener);
    // Deliver initial state
    if (this.entries.length > 0) {
      onItems(this.entries);
    }
    return this.stopWatch.bind(this, id);
  }

  stopWatch(id: string) {
    this.listeners.delete(id);
  }
}

export function newActivityLogTailer({
  redisClient,
  frontendApiClient,
}: {
  redisClient: RedisClient;
  frontendApiClient: FrontendClient;
}) {
  const fetcher = (since?: number) => {
    return frontendApiClient
      .getFullActivityLog({
        query: {
          since,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          return response.body;
        } else {
          throw new Error("Fetch failed");
        }
      });
  };

  const tailer = new StreamDatasetTailer<InternalActivityLogEntry>({
    redisClient,
    fetcher,
    log: activityLog,
  });
  return tailer;
}
