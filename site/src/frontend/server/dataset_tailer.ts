import { type FrontendClient } from "../../../lib/api/frontend_client";
import {
  type FullGuessHistory,
  type InternalActivityLogEntry,
} from "../../../lib/api/frontend_contract";
import { genId } from "../../../lib/id";
import { type RedisClient } from "../../app";

type Listener<T> = {
  id: string;
  callback: (items: T[]) => void;
};

// disconnected: initial state, no socket
// connecting: attempting to connect to pubsub server
// subscribing: connected to pubsub server, attempting to subscribe to topic
// ready: subscribed successfully
// reconnecting: attempting to reconnect to pubsub server after having previously established the connection successfully
// error: something went wrong; we do not currently recover from this
type TailerPubsubState =
  | "disconnected"
  | "connecting"
  | "subscribing"
  | "ready"
  | "error";

// initial: initial construction state, no connections attempted yet (because async & constructors don't get along)
// need-pubsub: attempting to connect/subscribe to pubsub, waiting for
// backfill: we have a live pubsub connection that should get updates, but we haven't gotten the initial state from the fetcher yet.
// ready: we have a live pubsub connection and have backfilled the log.
// stale: we have not received a message on pubsub for a while, or we have received one with an unexpected id, so we have a fetcher request outstanding
// pubsub-error: pubsub state is in error; it will attempt to reconnect
// fetch-error-wait: a backfill fetch failed and we are in exponential backoff waiting before we try to make another request
// fetch-error: a backfill fetch failed, the wait time passed, and we have a new backfill fetch in flight
type TailerState =
  | "initial"
  | "need-pubsub"
  | "need-backfill"
  | "ready"
  | "stale"
  | "pubsub-error"
  | "fetch-error-wait"
  | "fetch-error";

const DEBUG_TAILER = true as boolean;

export class DatasetTailer<T extends { id: number }> {
  // Our redis client handle.
  private redisClient: RedisClient;

  // The function we invoke to fetch the underlying data, which probably should bottom out in a FrontendClient (but we're not going to be particular for the purposes of this exercise)
  private fetcher: (since?: number) => Promise<T[]>;

  // The pubsub channel we are subscribing to
  private topic: string;

  // The full, sorted-by-id history of all confirmed events, which we have already emitted to all listeners
  private entries: T[];

  // A list of messages we have received but not dispatched.  Used primarily when doing initial backfill.
  // Theoretically we could consider buffering pubsub messages here to reduce the likelihood we have
  // to poll the backend if pubsub messages are delivered in an order different from the DB commit
  // order, but that's not implemented at this time.
  private unhandledPubsubMessages: T[];

  // The list of observers which want to get updates when the dataset changes.  We dispatch in
  // batches as large as we receive them mostly to save on function call overhead.
  private listeners: Map<string, Listener<T>>;

  // The state of the pubsub socket
  private pubsubState: TailerPubsubState;

  // Have we successfully established our subscriber, ever?  This is needed to avoid
  // double-subscriptions because node-redis will automatically restart subscriptions on
  // reconnection, and we don't want to set up double listener callbacks.
  private subscriberEstablished: boolean;

  // The state of this dataset tailer overall
  private state: TailerState;

  // After how many milliseconds of no message on pubsub should we consider our data potentially stale and trigger another
  private idleTimeoutMsec: number;
  // If defined, the handle for the setTimeout that will trigger the idle timeout
  private idleTimeoutHandle: NodeJS.Timeout | undefined;

  // How many fetches have failed in a row? (governs exponential backoff)
  private fetchFailureCount: number;
  // If defined, the handle for the setTimeout that will trigger fetch retry
  private fetchBackoffHandle: NodeJS.Timeout | undefined;

  // Promise which fulfills once we have successfully set up pubsub listening and performed an initial backfill
  private ready: Promise<void>;

  // Callback thunk we call when the ready promise should resolve
  private fulfillReady: (() => void) | undefined;

  constructor({
    redisClient,
    fetcher,
    topic,
    idleTimeoutMsec,
  }: {
    redisClient: RedisClient;
    fetcher: (since?: number) => Promise<T[]>;
    topic: string;
    idleTimeoutMsec?: number;
  }) {
    // Using pubsub requires having an isolated/separate redis connection.  The docs recommend
    // achieving this by duplicating an existing client.
    this.redisClient = redisClient.duplicate();
    // We must set an error handler, or the whole process will get terminated if our connection to
    // redis ever fails.
    this.redisClient.on("error", this.onPubsubError.bind(this));
    this.redisClient.on("ready", this.onPubsubConnected.bind(this));
    this.fetcher = fetcher;
    this.topic = topic;
    this.entries = [];
    this.unhandledPubsubMessages = [];
    this.listeners = new Map<string, Listener<T>>();
    this.pubsubState = "disconnected";
    this.subscriberEstablished = false;
    this.state = "initial";
    this.idleTimeoutHandle = undefined;
    this.idleTimeoutMsec = idleTimeoutMsec ?? 60000;
    this.fetchFailureCount = 0;
    this.fetchBackoffHandle = undefined;
    this.ready = new Promise((resolve) => {
      this.fulfillReady = resolve;
    });
    this.start();
  }

  log(...args: unknown[]) {
    if (DEBUG_TAILER) {
      console.log(`DatasetTailer(${this.pubsubState} ${this.state})`, ...args);
    }
  }

  lastKnownId(): number | undefined {
    if (this.entries.length > 0) {
      return this.entries[this.entries.length - 1]?.id;
    } else {
      return undefined;
    }
  }

  expectedNextId(): number {
    const lastKnown = this.lastKnownId();
    return lastKnown !== undefined ? lastKnown + 1 : 0;
  }

  setIdleTimer() {
    console.assert(this.idleTimeoutHandle === undefined);
    this.idleTimeoutHandle = setTimeout(
      this.onIdleTimerTimeout.bind(this),
      this.idleTimeoutMsec,
    );
  }

  clearIdleTimer() {
    if (this.idleTimeoutHandle !== undefined) {
      clearTimeout(this.idleTimeoutHandle);
      this.idleTimeoutHandle = undefined;
    }
  }

  resetIdleTimer() {
    this.clearIdleTimer();
    this.setIdleTimer();
  }

  onIdleTimerTimeout() {
    this.idleTimeoutHandle = undefined;
    if (this.state === "ready") {
      this.state = "stale";
      this.log("starting backfill fetch (idle timeout reached)");
      this.fetch();
    }
  }

  onFetch(entries: T[]) {
    this.state = "ready";
    this.fulfillReady?.();
    this.fetchFailureCount = 0;
    this.log(`fetch got ${entries.length} entries`);
    const lastKnown = this.lastKnownId();
    // Figure out what subset of the entries we should be dispatching.
    if (lastKnown === undefined) {
      // Implies this.entries is empty, so we should dispatch everything.
      this.dispatch(entries);
      this.entries = entries;
    } else {
      // We may need to drop some duplicate entries that we may have picked up via pubsub (while the
      // fetch was in flight) at the beginning of the list of entries.
      const firstNewIndex = entries.findIndex((entry) => entry.id > lastKnown);
      if (firstNewIndex === 0) {
        // Special case: avoid copying the array if the first element is fine
        this.dispatch(entries);
        this.entries = this.entries.concat(entries);
      } else if (firstNewIndex === -1) {
        // Nothing is new.  Dispatch nothing.
      } else {
        // Slice off just the relevant list of entries.  Dispatch it, and append that slice to the committed (dispatched) log.
        const newSlice = entries.slice(firstNewIndex);
        this.dispatch(newSlice);
        this.entries = this.entries.concat(newSlice);
      }
    }

    // attempt to process any queued pubsub messages
    this.processQueuedPubsubMessages();

    // Start background poll loop
    this.resetIdleTimer();
  }

  fetch() {
    // Triggers an update fetch against the backend
    if (
      this.state === "need-backfill" ||
      this.state === "stale" ||
      this.state === "fetch-error"
    ) {
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
          this.fetchBackoffHandle = setTimeout(
            this.onFetchBackoffTimeout.bind(this),
            waitTimeMsec,
          );
        });
    }
  }

  onFetchBackoffTimeout() {
    this.fetchBackoffHandle = undefined;
    this.state = "fetch-error";
    this.fetch();
  }

  start() {
    this.log("starting redis connection");
    this.state = "need-pubsub";
    this.pubsubState = "connecting";
    void this.redisClient.connect();
  }

  onPubsubError(err: unknown) {
    this.log("failed to connect to redis", err);
    this.pubsubState = "error";
    this.state = "pubsub-error";
    // We don't have to do anything in particular -- the redis client code will automatically
    // attempt to reconnect, and since we subscribed to the `ready` event in the constructor, we'll
    // get the onPubsubConnected callback whenever it eventually succeeds.

    // stop fetch retries; we want to have pubsub live *before* we try a backfill or we may miss events
    if (this.fetchBackoffHandle) {
      clearTimeout(this.fetchBackoffHandle);
      this.fetchBackoffHandle = undefined;
    }
  }

  onPubsubConnected() {
    if (!this.subscriberEstablished) {
      this.log("redis connection established, subscribing to", this.topic);
      this.pubsubState = "subscribing";
      this.redisClient
        .subscribe(this.topic, this.onPubsubEvent.bind(this))
        .then(
          () => {
            this.onPubsubSubscribed();
          },
          (err: unknown) => {
            this.onPubsubError(err);
          },
        );
    } else {
      // node-redis emits the `ready` event only after running the socketInitiator code, which
      // includes resubscribing to previously-established subscriptions, so if we successfully
      // established the sub before, getting here means that the sub is active once more.
      this.log("redis connection re-established");
      this.onPubsubReady();
    }
  }

  onPubsubSubscribed() {
    this.log(
      "redis subscription established, pubsub ready on topic:",
      this.topic,
    );
    this.subscriberEstablished = true;
    this.onPubsubReady();
  }

  onPubsubReady() {
    // Called when:
    // 1. we first establish the pubsub listener, and
    // 2. we know we have re-established the pubsub listener after a disconnection + reconnection
    this.pubsubState = "ready";
    this.state = "need-backfill";
    this.log("starting backfill fetch");
    this.fetch();
  }

  onPubsubEvent(message: string, _channel: string) {
    this.log(`Got pubsub message on channel ${_channel}:`, message);
    this.resetIdleTimer();
    try {
      // Decode the message
      const data = JSON.parse(message) as T;
      this.unhandledPubsubMessages.push(data);
      // If state is "need-backfill", we should just save this message until later.
      // If state is "ready", we should try handling it immediately.
      if (this.state === "ready") {
        this.processQueuedPubsubMessages();
      }
    } catch (err: unknown) {
      // IDK what to do here, disconnect and complain loudly?
    }
  }

  processQueuedPubsubMessages() {
    // First, sort the queued messages by id.  We can trivially recover from out-of-order messages here.
    this.unhandledPubsubMessages.sort((a, b) => a.id - b.id);

    const toDispatch: T[] = [];
    const toSave: T[] = [];
    let expectedNext = this.expectedNextId();
    let wantBackfill = false as boolean;
    // For each entry in the queued pubsub messages list:
    this.unhandledPubsubMessages.forEach((entry) => {
      if (entry.id < expectedNext) {
        // If the entry id is less than or equal to the greatest entry id in the committed log, drop it.  We've already handled that message.
        return;
      } else if (entry.id === expectedNext) {
        // If the entry id is exactly one more than the greatest entry id in the committed log, dispatch it, then append it to the committed log.
        toDispatch.push(entry);
        expectedNext += 1;
      } else {
        // If the entry id is *more* than one greater than the greatest entry id in the committed
        // log, we believe the pubsub system may have dropped a message or the backend may have
        // raced causing an out-of-order publish.  We'll initiate a backfill fetch, and while we'll
        // avoid dispatching this entry for now, we'll save it for a future attempt.
        toSave.push(entry);
        wantBackfill = true;
      }
    });

    // Dispatch any messages we should be dispatching
    if (toDispatch.length > 0) {
      this.dispatch(toDispatch);
      this.entries = this.entries.concat(toDispatch);
    }

    // Drop any messages we're not saving for later
    this.unhandledPubsubMessages = toSave;

    // Kick off backfill fetch if needed.
    if (wantBackfill) {
      this.clearIdleTimer();
      this.state = "stale";
      this.log("starting backfill fetch (saw out-of-order pubsub messages)");
      this.fetch();
    }
  }

  dispatch(entries: T[]) {
    // Call all the listener callbacks on this batch of entries
    if (entries.length > 0) {
      this.listeners.forEach((listener) => {
        listener.callback(entries);
      });
    }
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

  const tailer = new DatasetTailer<InternalActivityLogEntry>({
    redisClient,
    fetcher,
    topic: "global/activity_log",
  });
  return tailer;
}

export type GuessLogEntry = FullGuessHistory[number];
export function newGuessLogTailer({
  redisClient,
  frontendApiClient,
}: {
  redisClient: RedisClient;
  frontendApiClient: FrontendClient;
}) {
  const fetcher = (since?: number) => {
    return frontendApiClient
      .getFullGuessHistory({
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
  const tailer = new DatasetTailer<GuessLogEntry>({
    redisClient,
    fetcher,
    topic: "global/guess_log",
  });
  return tailer;
}
