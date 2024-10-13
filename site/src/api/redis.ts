import { ErrorReply } from "redis";
import { type InternalActivityLogEntry } from "../../lib/api/frontend_contract";
import { type RedisClient } from "../app";
import { parseInternalActivityLogEntry } from "./logic";

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

// Read a Redis stream formatted with our schema.
async function readStream<T>(
  redisClient: RedisClient,
  key: string,
  since?: number,
) {
  const results = await redisClient.xRead({
    key,
    id: since ? `0-${since}` : "0-0",
  });
  const messages = (results ?? [])[0]?.messages ?? [];
  return messages.map(parseStreamMessage<T>);
}

// Read the global activity log, starting from the beginning or from AFTER since.
export async function getActivityLog(redisClient: RedisClient, since?: number) {
  const messages = await readStream<InternalActivityLogEntry>(
    redisClient,
    `global/activity_log`,
    since,
  );
  return {
    highWaterMark: getHighWaterMark(messages),
    entries: messages
      .filter((m) => m.idNumber > (since ?? 0))
      .map((m) => m.entry)
      .filter((m): m is InternalActivityLogEntry => !!m)
      .map(parseInternalActivityLogEntry),
  };
}

// Read the activity log for a team, starting from the beginning or from AFTER since.
export async function getTeamActivityLog(
  redisClient: RedisClient,
  teamId: number,
  since?: number,
) {
  // Check the previous high water mark first, to make sure we don't miss anything.
  const prevHighWaterMark =
    (await redisClient.zScore("activity_log", `${teamId}`)) ?? 0;

  // Read the team's existing activity log (may include items higher than prevHighWaterMark).
  const activityLogMessages = await readStream<InternalActivityLogEntry>(
    redisClient,
    `activity_log/${teamId}`,
    since,
  );
  const teamHighWaterMark =
    getHighWaterMark(activityLogMessages) ?? prevHighWaterMark;
  // Read the global activity log from the team high water mark.
  // We can't filter with `since`, because otherwise we might miss some team entries.
  const globalActivityLogMessages = await readStream<InternalActivityLogEntry>(
    redisClient,
    `global/activity_log`,
    teamHighWaterMark,
  );
  const newHighWaterMark =
    getHighWaterMark(globalActivityLogMessages) ?? prevHighWaterMark;
  const newActivityLogMessages = globalActivityLogMessages.filter(
    ({ entry }) =>
      entry?.team_id === teamId || (entry && entry.team_id === undefined),
  );

  // If we saw any new activity log entries, make sure we write them out
  for (const message of newActivityLogMessages) {
    await appendTeamActivityLog(redisClient, teamId, message);
  }

  // If we saw any new activity log entries (whether or not they were for us), update the high water mark
  if (newHighWaterMark > prevHighWaterMark) {
    await redisClient.zAdd(
      "activity_log",
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
    entries: activityLogMessages
      .concat(newActivityLogMessages)
      .filter((m) => m.idNumber > (since ?? 0))
      .map((m) => m.entry)
      .filter((m): m is InternalActivityLogEntry => !!m)
      .map(parseInternalActivityLogEntry),
  };
}

// Append an entry to a team's activity log.
export async function appendTeamActivityLog(
  redisClient: RedisClient,
  teamId: number,
  message: { id: string; message: Record<string, string> },
) {
  try {
    await redisClient.xAdd(
      `activity_log/${teamId}`,
      message.id,
      message.message,
    );
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
