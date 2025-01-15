import { type HTTPStatusCode } from "@ts-rest/core";
import { genId } from "../../../lib/id";
import { type Log, type RedisClient } from "../../api/redis";

type Listener<T> = {
  id: string;
  callback: (items: T[]) => void;
};

// ready: we have a live pubsub connection and have backfilled the log.
// stale: we have not received a message on pubsub for a while, or we have received one with an unexpected id, so we have a fetcher request outstanding
// fetch-error-wait: a backfill fetch failed and we are in exponential backoff waiting before we try to make another request
// fetch-error: a backfill fetch failed, the wait time passed, and we have a new backfill fetch in flight
type StreamTailerState =
  | "ready"
  | "stale"
  | "fetch-error-wait"
  | "fetch-error"
  | "shutdown";

const DEBUG_TAILER = true as boolean;

export type DatasetTailer<T extends { id: number }> = {
  start(): void;

  readyPromise(): Promise<void>;

  watchLog(onItems: (items: T[]) => void): () => void;

  stopWatch(id: string): void;

  shutdown(): void;
};

export class StreamDatasetTailer<T extends { id: number }> {
  // Our redis client handle.
  private redisClient: RedisClient;

  // The function we invoke to fetch the underlying data, which probably should bottom out in a FrontendClient (but we're not going to be particular for the purposes of this exercise)
  private fetcher: (since?: number) => Promise<T[]>;

  // The log we are subscribing to
  private redisLog: Pick<Log<T, T>, "getGlobalLog" | "key">;

  // Should we attempt to retain all entries observed, so they can be sent to additional future watchers?
  // If false, you must only call watchLog() once.
  private retainEntries: boolean;
  // If retainEntries is true, entries contains the full, sorted-by-id history of all confirmed events, which we have already emitted to all listeners
  // Otherwise, it is an empty list.
  private entries: T[];
  // The highest `id` of an entry we have encountered (and emitted)
  private _lastKnownId: number | undefined;

  // The list of observers which want to get updates when the dataset changes.  We dispatch in
  // batches as large as we receive them mostly to save on function call overhead.
  private listeners: Map<string, Listener<T>>;

  // The state of this dataset tailer overall
  private state: StreamTailerState;

  // After how many milliseconds of no message on pubsub should we consider our data potentially stale and trigger another
  private idleTimeoutMsec: number;
  // If defined, the handle for the setTimeout that will trigger the idle timeout
  private idleTimeoutHandle: NodeJS.Timeout | undefined;

  // How long, at maximum, will we block on the redis connection "thread" on a read attempt.
  // Setting this to 0 means "block indefinitely" which means we cannot gracefully shut down the dataset tailer.
  private blockTimeoutMsec: number;

  // How many fetches have failed in a row? (governs exponential backoff)
  private fetchFailureCount: number;

  // False until we believe we have read through the stream backlog (at which point we arm this.ready)
  private caughtUpWithBacklog: boolean;

  // Promise which fulfills once we have successfully set up pubsub listening and performed an initial backfill
  private ready: Promise<void>;

  // Callback thunk we call when the ready promise should resolve
  private fulfillReady: (() => void) | undefined;

  constructor({
    redisClient,
    fetcher,
    log,
    idleTimeoutMsec,
    blockTimeoutMsec,
    retainEntries,
  }: {
    redisClient: RedisClient;
    fetcher: (since?: number) => Promise<T[]>;
    log: StreamDatasetTailer<T>["redisLog"];
    idleTimeoutMsec?: number;
    blockTimeoutMsec?: number;
    retainEntries?: boolean;
  }) {
    this.redisClient = redisClient;
    this.fetcher = fetcher;
    this.redisLog = log;
    this.entries = [];
    this.listeners = new Map<string, Listener<T>>();
    this.state = "ready";
    this.idleTimeoutHandle = undefined;
    this.idleTimeoutMsec = idleTimeoutMsec ?? 60000;
    this.blockTimeoutMsec = blockTimeoutMsec ?? 0;
    this.retainEntries = retainEntries ?? true;
    this._lastKnownId = undefined;
    this.fetchFailureCount = 0;
    this.caughtUpWithBacklog = false;
    this.ready = new Promise((resolve) => {
      this.fulfillReady = resolve;
    });
  }

  protected log(...args: unknown[]) {
    if (DEBUG_TAILER) {
      console.log(
        `DatasetTailer(${this.redisLog.key}, ${this.state})`,
        ...args,
      );
    }
  }

  protected lastKnownId(): number | undefined {
    return this._lastKnownId;
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
    if (this.state === "shutdown") return;
    this.state = "ready";
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
    // Fulfill ready promise *after* dispatching the initial collection
    this.fulfillReady?.();

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
    if (this.state === "shutdown") return;
    this.state = "fetch-error";
    this.fetch();
  }

  protected async redisThread() {
    while (this.state !== "shutdown") {
      try {
        // N.B. executeIsolated will block until it has a usable client, using the backoff options passed to the client constructor.
        await this.redisClient.executeIsolated(async (redisClient) => {
          let lastLogged = undefined as number | undefined;
          while (this.state !== "shutdown") {
            const lastKnown = this.lastKnownId();
            if (lastLogged === undefined || lastKnown !== lastLogged) {
              this.log(`getGlobalLog(${lastKnown})`);
              lastLogged = lastKnown;
            }
            // Do reads without blocking until we have drained the stream, then switch to blocking
            // while tailing.
            const BLOCK_OPTIONS = this.caughtUpWithBacklog
              ? { BLOCK: this.blockTimeoutMsec }
              : {};
            const results = await this.redisLog.getGlobalLog(
              redisClient,
              lastKnown,
              BLOCK_OPTIONS,
            );
            if (results.entries.length > 0) {
              this.log(`Got ${results.entries.length} stream messages`);
              this.dispatch(results.entries);
            } else {
              this.caughtUpWithBacklog = true;
              this.fulfillReady?.();
            }
          }
        });
      } catch (e: unknown) {
        console.warn("redis executeIsolated failed:", e);
      }
    }
  }

  public start() {
    this.log("starting redis connection");
    void this.redisThread();
  }

  public shutdown() {
    this.state = "shutdown";
    if (this.listeners.size > 0) {
      this.log(
        "Shutdown called before all listeners were removed!  Do you have an error in your refcount logic?",
      );
    }
  }

  private dispatch(entries: T[]) {
    // Call all the listener callbacks on this batch of entries
    if (entries.length > 0) {
      this.listeners.forEach((listener) => {
        listener.callback(entries);
      });

      if (this.retainEntries) {
        this.entries = this.entries.concat(entries);
      }
      this._lastKnownId = entries[entries.length - 1]?.id;
    }

    this.caughtUpWithBacklog = true;
    this.fulfillReady?.();
  }

  // Public API
  readyPromise(): Promise<void> {
    return this.ready;
  }

  watchLog(onItems: (items: T[]) => void): () => void {
    if (!this.retainEntries && this.listeners.size > 0) {
      this.log(
        "WARNING: attempted to watchLog with multiple watchers with retainEntries: false.  Watchers other than the first will miss entries!",
      );
    }
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

export function newLogTailer<
  T extends { id: number; team_id?: number | undefined },
>({
  redisClient,
  fetchMethod,
  log,
  yieldAfter,
  retainEntries,
}: {
  redisClient: RedisClient;
  fetchMethod: (arg: {
    query: { since?: number };
  }) => Promise<
    { status: 200; body: T[] } | { status: Exclude<HTTPStatusCode, 200> }
  >;
  log: StreamDatasetTailer<T>["redisLog"];
  yieldAfter?: number;
  retainEntries?: boolean;
}) {
  const fetcher = (since?: number) => {
    return fetchMethod({
      query: {
        since,
      },
    }).then((response) => {
      if (response.status === 200) {
        return response.body;
      } else {
        throw new Error("Fetch failed");
      }
    });
  };

  const tailer = new StreamDatasetTailer<T>({
    redisClient,
    fetcher,
    log,
    blockTimeoutMsec: yieldAfter,
    retainEntries,
  });
  return tailer;
}
