import { genId } from "../../../lib/id";
import { type RedisClient } from "../../api/redis";

function tabulateVotes(votes: Record<string, string>): Record<string, number> {
  const results: Record<string, number> = {};
  Object.entries(votes).forEach(([_sess_id, choice]) => {
    if (results[choice] === undefined) {
      results[choice] = 0;
    }
    results[choice] += 1;
  });
  return results;
}

type PollState = Record<string, number>;
type PollUpdatedCallback = (pollState: PollState) => void;
type MergedPollObserver = {
  key: string;
  stopHandle: () => void;
  // Map from observerId to callback
  observers: Map<string, PollUpdatedCallback>;
};

export class PollWatcher {
  private redisClient: RedisClient;

  private pubsubRedisClient: RedisClient;
  private pubsubRedisClientReady: Promise<RedisClient> | undefined;

  // Map from  to
  private mergedObservers: Map<string, MergedPollObserver>;

  constructor({ redisClient }: { redisClient: RedisClient }) {
    this.redisClient = redisClient;
    this.pubsubRedisClient = this.redisClient.duplicate();
    this.pubsubRedisClient.on("error", (err) => {
      console.error("PollWatcher redis error:", err);
    });

    this.mergedObservers = new Map<string, MergedPollObserver>();
  }

  public start() {
    this.pubsubRedisClientReady = this.pubsubRedisClient.connect();
  }

  private onPollUpdate(key: string, message: string, channel: string) {
    console.log("saw message published: ", message, " on channel ", channel);
    // Look up watchers for that key, if any
    const observer = this.mergedObservers.get(key);
    if (observer) {
      // Parse message into something cromulent
      const votedata = JSON.parse(message) as Record<string, string>;
      const counts = tabulateVotes(votedata);

      for (const cb of observer.observers.values()) {
        cb(counts);
      }
    }
  }

  private stopObserver(key: string, observerId: string) {
    const observer = this.mergedObservers.get(key);
    if (observer) {
      observer.observers.delete(observerId);
      if (observer.observers.size === 0) {
        observer.stopHandle(); // releases the underlying subscribe
        this.mergedObservers.delete(key);
      }
    }
  }

  public async observePoll(
    teamId: number,
    slug: string,
    pollId: string,
    callback: PollUpdatedCallback,
  ): Promise<() => void> {
    if (!this.pubsubRedisClientReady) {
      throw new Error(
        "Must attempt to connect to redis pubsub before observing poll",
      );
    }
    return this.pubsubRedisClientReady.then(async () => {
      // save the callback
      const key = `/team/${teamId}/polls/${slug}/${pollId}`;
      const observerId = genId();

      let mergedObserver = this.mergedObservers.get(key);
      if (!mergedObserver) {
        console.log("observePoll: creating new mergedObserver");
        const listener = this.onPollUpdate.bind(this, key);
        const observers = new Map<string, PollUpdatedCallback>();
        observers.set(observerId, callback);
        mergedObserver = {
          key,
          stopHandle: () => {
            void this.pubsubRedisClient.unsubscribe(key, listener);
          },
          observers,
        };
        this.mergedObservers.set(key, mergedObserver);
        await this.pubsubRedisClient.subscribe(key, listener);
        console.log("mergedObserver subscribe ready");
      } else {
        mergedObserver.observers.set(observerId, callback);
      }

      return this.stopObserver.bind(this, key, observerId);
    });
  }

  public async getCurrentPollState(
    teamId: number,
    slug: string,
    pollId: string,
  ) {
    const key = `/team/${teamId}/polls/${slug}/${pollId}`;
    let votedata = {};
    try {
      votedata = await this.redisClient.hGetAll(key);
    } catch (e) {
      // ignore empty vote set from nonexistent key
    }
    const counts = tabulateVotes(votedata);
    return counts;
  }
}
