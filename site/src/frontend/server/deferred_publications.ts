import { type ActivityLogEntry } from "knex/types/tables";
import { type TeamState } from "../../../lib/api/client";
import { type RedisClient } from "../../api/redis";

export class DeferredPublications {
  private activityLog?: ActivityLogEntry[];
  private teamState?: TeamState[];

  constructor({
    activityLog,
    teamState,
  }: {
    activityLog?: ActivityLogEntry[];
    teamState?: TeamState[];
  }) {
    this.activityLog = activityLog;
    this.teamState = teamState;
  }

  addActivityLogEntries(entries: ActivityLogEntry[]) {
    this.activityLog = (this.activityLog ?? []).concat(entries);
  }

  addTeamState(teamStates: TeamState[]) {
    this.teamState = (this.teamState ?? []).concat(teamStates);
  }

  concat(other: DeferredPublications) {
    const activityLog = this.activityLog
      ? this.activityLog.concat(other.activityLog ?? [])
      : other.activityLog;
    const teamState = this.teamState
      ? this.teamState.concat(other.teamState ?? [])
      : other.teamState;
    return new DeferredPublications({
      activityLog,
      teamState,
    });
  }

  async publish(redisClient?: RedisClient) {
    if (redisClient) {
      try {
        if (this.activityLog) {
          for (const entry of this.activityLog) {
            await redisClient.publish(
              "global/activity_log",
              JSON.stringify(entry),
            );
          }
        }
        if (this.teamState) {
          for (const state of this.teamState) {
            const team_id = state.teamId;
            const topic = `team_state.${team_id}`;
            await redisClient.publish(topic, JSON.stringify(state));
          }
        }
      } catch (e: unknown) {
        // Graceful fallback if Redis can't be reached.
        // It's okay if we drop activity log entries on pubsub; tailers will detect the missing id
        // and hit the API to get any missing entries
        console.error("redis publish error", e);
      }
    }
  }
}
