import {
  ErrorReply,
  createClient as redisCreateClient,
  defineScript,
} from "redis";
import { createTimeout } from "retry";
import {
  type DehydratedTeamRegistrationLogEntry,
  type TeamRegistrationLogEntry,
  type DehydratedInternalActivityLogEntry,
  type InternalActivityLogEntry,
  type DehydratedPuzzleStateLogEntry,
  type PuzzleStateLogEntry,
  type DehydratedTeamInteractionStateLogEntry,
  type TeamInteractionStateLogEntry,
} from "../../lib/api/frontend_contract";
import { hydrateLogEntry } from "./logic";

export async function connect(redisUrl: string) {
  const reconnectStrategy = (retries: number) => {
    const timeout = createTimeout(retries, {
      factor: 2,
      minTimeout: 250,
      maxTimeout: 8000,
      randomize: true,
    });
    console.log(
      "reconnecting to redis on attempt",
      retries,
      "after",
      timeout,
      "ms",
    );
    return timeout;
  };
  const connectOptions = redisUrl.startsWith("unix://")
    ? { socket: { path: redisUrl.replace("unix://", ""), reconnectStrategy } }
    : { url: redisUrl, socket: { reconnectStrategy } };
  const options = {
    ...connectOptions,
    // Fail fast when we're not connected.
    disableOfflineQueue: true,
    isolationPoolOptions: {
      // We expect to use multiple dataset tailers, and each one uses a separate connection from the
      // isolation pool, which defaults to a maximum size of 1 (!).  This needs to be at least as
      // large as the number of concurrent connections tailing datasets.
      max: 100,
      // We would like to get some sort of backpressure in the form of errors if we're blocking
      // while trying to get an isolated client from the pool rather than waiting indefinitely for a
      // resource that won't come.
      acquireTimeoutMillis: 1000,
    },
    scripts: {
      extendLog: defineScript({
        SCRIPT: `
local key = KEYS[1]
local count = 0
for i=1,table.maxn(ARGV),2 do
  local id = ARGV[i]
  local entry = ARGV[i+1]
  local reply = redis.pcall('XADD', KEYS[1], id, 'entry', entry)
  if reply['err'] == 'ERR The ID specified in XADD is equal or smaller than the target stream top item' then
  elseif reply['err'] ~= nil then
    return reply
  else
    count = count + 1
  end
end
return count
`,
        NUMBER_OF_KEYS: 1,
        FIRST_KEY_INDEX: 1,
        transformArguments(
          key: string,
          entries: { id: string; entry: string }[],
        ): string[] {
          return [key, ...entries.flatMap((m) => [m.id, m.entry])];
        },
      }),
      // TODO: implement a castVote script which:
      // 1. calls HSET <key> <sess_id> <choice>
      // 2. calls HGETALL and counts the votes into a map of choice -> vote count
      // 3. emits a pubsub message with the tallied votes to <key>
      // and then replace the castVote implementation in src/api/server.ts with a call to this script
    },
  };
  const client = redisCreateClient(options);
  // We must set an error handler, or the whole process will get terminated if our connection to
  // redis ever fails!
  client.on("error", (err: Error) => {
    console.log("redis error", err.message);
  });
  // Only wait 5s for a connection, so we can still come up if Redis is down.
  const connected = client.connect();
  if (
    (await Promise.race([
      connected,
      new Promise((r) => setTimeout(r, 5000)),
    ])) === undefined
  ) {
    console.warn(
      "Failed to connect to Redis after 5s; will continue trying in the background",
    );
  }
  return client;
}

export type RedisClient = Awaited<ReturnType<typeof connect>>;

// Summary of Redis streams:
// stream global/activity_log - all activity log entries
// stream activity_log/$team - activity log entries that apply to $team (including global)
// sorted set activity_log - keys are $team, scores are the highest global activity log entry found

// Inside each stream, messages have an id of `0-${epoch}` and a body of {entry: JSON.stringify(entry)}

// Extract the high water mark from a (possibly empty) list of stream messages
function getHighWaterMark(messages?: { idNumber: number }[]) {
  const message = messages?.at(-1);
  if (message) {
    return message.idNumber;
  }
  return undefined;
}

// Parse a redis StreamMessageReply into a given type.
// If the parse fails, `entry` will be undefined.
function parseStreamMessage<S, T>(
  hydrate: (entry: S) => T,
  {
    id,
    message,
  }: {
    id: string;
    message: Record<string, string>;
  },
) {
  const entry = message.entry
    ? hydrate(JSON.parse(message.entry) as S)
    : undefined;
  return {
    id,
    idNumber: parseInt(id.slice(2), 10),
    message,
    entry,
  };
}

export abstract class Log<S, T extends { id: number; team_id?: number }> {
  private _key: string;

  constructor(key: string) {
    this._key = key;
  }

  get key() {
    return this._key;
  }

  protected abstract hydrateEntry(this: void, entry: S): T;

  private parseStreamMessage(
    message: Parameters<typeof parseStreamMessage<S, T>>[1],
  ): ReturnType<typeof parseStreamMessage<S, T>> {
    return parseStreamMessage(this.hydrateEntry, message);
  }

  // Read a Redis stream formatted with our schema.
  private async readStream(
    redisClient: RedisClient,
    key: string,
    since?: number,
    options?: { BLOCK?: number },
  ) {
    const results = await redisClient.xRead(
      {
        key,
        id: since ? `0-${since}` : "0-0",
      },
      options,
    );
    const messages = (results ?? [])[0]?.messages ?? [];
    return messages.map((m) => this.parseStreamMessage(m));
  }

  // Read the global log, starting from the beginning or from AFTER since.
  async getGlobalLog(
    redisClient: RedisClient,
    since?: number,
    options?: { BLOCK?: number },
  ) {
    const messages = await this.readStream(
      redisClient,
      `global/${this._key}`,
      since,
      options,
    );
    return {
      highWaterMark: getHighWaterMark(messages),
      entries: messages
        .filter((m) => m.idNumber > (since ?? 0))
        .map((m) => m.entry)
        .filter((m): m is T => !!m),
    };
  }
  // Read the log for a team, starting from the beginning or from AFTER since.
  async getTeamLog(redisClient: RedisClient, teamId: number, since?: number) {
    // Check the previous high water mark first, to make sure we don't miss anything.
    const prevHighWaterMark =
      (await redisClient.zScore(this._key, `${teamId}`)) ?? 0;

    // Read the team's existing log (may include items higher than prevHighWaterMark).
    const logMessages = await this.readStream(
      redisClient,
      `${this._key}/${teamId}`,
      since,
    );
    const teamHighWaterMark = Math.max(
      getHighWaterMark(logMessages) ?? 0,
      prevHighWaterMark,
    );
    // Read the global log from the team high water mark.
    // We can't filter with `since`, because otherwise we might miss some team entries.
    const globalLogMessages = await this.readStream(
      redisClient,
      `global/${this._key}`,
      teamHighWaterMark,
    );
    const newHighWaterMark = Math.max(
      getHighWaterMark(globalLogMessages) ?? 0,
      prevHighWaterMark,
    );
    const newLogMessages = globalLogMessages.filter(
      ({ entry }) =>
        entry?.team_id === teamId || (entry && entry.team_id === undefined),
    );

    // If we saw any new log entries, make sure we write them out
    await this.extendTeamLog(redisClient, teamId, newLogMessages);

    // If we saw any new log entries (whether or not they were for us), update the high water mark
    if (newHighWaterMark > prevHighWaterMark) {
      await redisClient.zAdd(
        this._key,
        {
          value: `${teamId}`,
          score: newHighWaterMark,
        },
        {
          GT: true,
          CH: true,
        },
      );
    }
    return {
      highWaterMark: newHighWaterMark,
      entries: logMessages
        .concat(newLogMessages)
        .filter((m) => m.idNumber > (since ?? 0))
        .map((m) => m.entry)
        .filter((m): m is T => !!m),
    };
  }
  // Get the id of the last processed log entry.
  async getGlobalHighWaterMark(redisClient: RedisClient) {
    const messages = await redisClient.xRevRange(
      `global/${this._key}`,
      "+",
      "-",
      { COUNT: 1 },
    );
    return getHighWaterMark(messages.map((m) => this.parseStreamMessage(m)));
  }
  // Append one or more entries to a team's log.
  private async extendTeamLog(
    redisClient: RedisClient,
    teamId: number,
    messages: { id: string; message: Record<string, string> }[],
  ) {
    const entries = messages.flatMap((m) =>
      m.message.entry
        ? [
            {
              id: m.id,
              entry: m.message.entry,
            },
          ]
        : [],
    );

    if (entries.length > 0) {
      // batch into groups of 250 -- the redis client splats script
      // arguments and there's a limit of 255 arguments per function
      // call in javascript
      for (let i = 0; i < entries.length; i += 250) {
        const entriesChunk = entries.slice(i, i + 250);

        await redisClient.extendLog(`${this._key}/${teamId}`, entriesChunk);
      }
    }
  }

  // Append one or more log entries to the global log.
  // For use only by data.refreshActivityLog.
  async extend<E extends { id: number }>(
    redisClient: RedisClient,
    entries: E[],
  ) {
    if (entries.length > 0) {
      // batch into groups of 250 -- the redis client splats script
      // arguments and there's a limit of 255 arguments per function
      // call in javascript
      for (let i = 0; i < entries.length; i += 250) {
        const entriesChunk = entries.slice(i, i + 250);
        await redisClient.extendLog(
          `global/${this._key}`,
          entriesChunk.map((entry) => ({
            id: `0-${entry.id}`,
            entry: JSON.stringify(entry),
          })),
        );
      }
    }
  }
}

export class ActivityLog extends Log<
  DehydratedInternalActivityLogEntry,
  InternalActivityLogEntry
> {
  constructor() {
    super("activity_log");
  }
  protected hydrateEntry(entry: DehydratedInternalActivityLogEntry) {
    return hydrateLogEntry(entry);
  }
}

export const activityLog = new ActivityLog();

export class TeamRegistrationLog extends Log<
  DehydratedTeamRegistrationLogEntry,
  TeamRegistrationLogEntry
> {
  constructor() {
    super("team_registration_log");
  }
  protected hydrateEntry(entry: DehydratedTeamRegistrationLogEntry) {
    return hydrateLogEntry(entry);
  }
}

export const teamRegistrationLog = new TeamRegistrationLog();

export class PuzzleStateLog extends Log<
  DehydratedPuzzleStateLogEntry,
  PuzzleStateLogEntry
> {
  constructor() {
    super("puzzle_state_log");
  }
  protected hydrateEntry(entry: DehydratedPuzzleStateLogEntry) {
    return hydrateLogEntry(entry);
  }
}

export const puzzleStateLog = new PuzzleStateLog();

export class TeamInteractionStateLog extends Log<
  DehydratedTeamInteractionStateLogEntry,
  TeamInteractionStateLogEntry
> {
  constructor() {
    super("team_interaction_state_log");
  }
  protected hydrateEntry(entry: DehydratedTeamInteractionStateLogEntry) {
    return hydrateLogEntry(entry);
  }
}

export const teamInteractionStateLog = new TeamInteractionStateLog();

// Publish a new state to a "stream", if it is newer, and trim older states.
async function publishState(
  redisClient: RedisClient,
  key: string,
  message: { id: string; message: Record<string, string> },
) {
  try {
    await redisClient.xAdd(key, message.id, message.message, {
      TRIM: {
        strategy: "MAXLEN",
        threshold: 1,
      },
    });
  } catch (e) {
    // Ignore duplicate keys
    if (
      e instanceof ErrorReply &&
      e.message ===
        "ERR The ID specified in XADD is equal or smaller than the target stream top item"
    ) {
      return;
    }
    throw e;
  }
}

export async function publishTeamCache(
  redisClient: RedisClient,
  teamId: number,
  state: { epoch: number; dehydrate: () => unknown },
  cacheTypeRedisKey: string,
) {
  await publishState(redisClient, `cache/${cacheTypeRedisKey}/${teamId}`, {
    id: `0-${state.epoch}`,
    message: {
      entry: JSON.stringify(state.dehydrate()),
    },
  });
}

type CacheableFactory<RedisType, HydratedType> = {
  redisKey: string;
  hydrate: (redisData?: RedisType) => HydratedType;
};

export function getTeamCaches<
  Factories extends CacheableFactory<unknown, unknown>[],
>(
  redisClient: RedisClient,
  teamId: number,
  ...cacheTypes: Factories
): Promise<{
  [K in keyof Factories]: ReturnType<Factories[K]["hydrate"]>;
}> {
  return Promise.all(
    cacheTypes.map((cacheType) =>
      redisClient
        .xRevRange(`cache/${cacheType.redisKey}/${teamId}`, "+", "-", {
          COUNT: 1,
        })
        .then((messages) => {
          const message = messages.at(-1);
          if (message) {
            return parseStreamMessage(
              (data) => cacheType.hydrate(data),
              message,
            ).entry;
          }
          return cacheType.hydrate();
        }),
    ),
  ) as Promise<{
    [K in keyof Factories]: ReturnType<Factories[K]["hydrate"]>;
  }>;
}

// export async function getTeamState(
//   redisClient: RedisClient | undefined,
//   knex: Knex,
//   teamId: number,
// ) {
//   if (redisClient !== undefined) {
//     const state = await redisClient.xRevRange(`team_state/${teamId}`, )
//   }
// }
