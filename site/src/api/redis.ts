import { ErrorReply, createClient as redisCreateClient } from "redis";
import { type TeamState } from "../../lib/api/client";
import { type InternalActivityLogEntry } from "../../lib/api/frontend_contract";

export async function connect(redisUrl: string) {
  const options = redisUrl.startsWith("unix://")
    ? { socket: { path: redisUrl.replace("unix://", "") } }
    : { url: redisUrl };
  const client = redisCreateClient(options);
  // We must set an error handler, or the whole process will get terminated if our connection to
  // redis ever fails!
  client.on("error", (err) => {
    console.log("redis error", err);
  });
  await client.connect();
  if (process.env.NODE_ENV === "development") {
    // Wipe data every time we start in development, since the database might have regressed.
    for await (const stream of client.scanIterator({ TYPE: "stream" })) {
      await client.del(stream);
    }
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
function parseStreamMessage<T>({
  id,
  message,
}: {
  id: string;
  message: Record<string, string>;
}) {
  const entry = message.entry ? (JSON.parse(message.entry) as T) : undefined;
  return {
    id,
    idNumber: parseInt(id.slice(2), 10),
    message,
    entry,
  };
}

export class Log<T extends { id: number; team_id?: number }> {
  private _key: string;

  constructor(key: string) {
    this._key = key;
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
    return messages.map(parseStreamMessage<T>);
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
    const teamHighWaterMark =
      getHighWaterMark(logMessages) ?? prevHighWaterMark;
    // Read the global log from the team high water mark.
    // We can't filter with `since`, because otherwise we might miss some team entries.
    const globalLogMessages = await this.readStream(
      redisClient,
      `global/${this._key}`,
      teamHighWaterMark,
    );
    const newHighWaterMark =
      getHighWaterMark(globalLogMessages) ?? prevHighWaterMark;
    const newLogMessages = globalLogMessages.filter(
      ({ entry }) =>
        entry?.team_id === teamId || (entry && entry.team_id === undefined),
    );

    // If we saw any new log entries, make sure we write them out
    for (const message of newLogMessages) {
      await this.appendTeamLog(redisClient, teamId, message);
    }

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
    return getHighWaterMark(messages.map(parseStreamMessage<T>));
  }
  // Append an entry to a team's log.
  private async appendTeamLog(
    redisClient: RedisClient,
    teamId: number,
    message: { id: string; message: Record<string, string> },
  ) {
    await appendStream(redisClient, `${this._key}/${teamId}`, message);
  }

  // Append a log entry to the global log.
  // For use only by data.refreshActivityLog.
  async append<E extends { id: number }>(redisClient: RedisClient, entry: E) {
    await appendStream(redisClient, `global/${this._key}`, {
      id: `0-${entry.id}`,
      message: {
        entry: JSON.stringify(entry),
      },
    });
  }
}

// Append a message to a stream, ignoring duplicate or stale IDs.
async function appendStream(
  redisClient: RedisClient,
  key: string,
  message: { id: string; message: Record<string, string> },
) {
  try {
    await redisClient.xAdd(key, message.id, message.message);
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

export const activityLog = new Log<InternalActivityLogEntry>("activity_log");

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

export async function publishTeamState(
  redisClient: RedisClient,
  teamId: number,
  state: TeamState,
) {
  await publishState(redisClient, `team_state/${teamId}`, {
    id: `0-${state.epoch}`,
    message: {
      entry: JSON.stringify(state),
    },
  });
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
