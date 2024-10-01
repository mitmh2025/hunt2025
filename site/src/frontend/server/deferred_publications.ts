import { type ActivityLogEntry, type TeamPuzzleGuess } from "knex/types/tables";
import { type TeamState } from "../../../lib/api/client";
import { type RedisClient } from "../../app";

export class DeferredPublications {
  private activityLog?: ActivityLogEntry[];
  private guessLog?: TeamPuzzleGuess[];
  private teamState?: TeamState[];

  constructor({
    activityLog,
    guessLog,
    teamState,
  }: {
    activityLog?: ActivityLogEntry[];
    guessLog?: TeamPuzzleGuess[];
    teamState?: TeamState[];
  }) {
    this.activityLog = activityLog;
    this.guessLog = guessLog;
    this.teamState = teamState;
  }

  addActivityLogEntries(entries: ActivityLogEntry[]) {
    this.activityLog = (this.activityLog ?? []).concat(entries);
  }

  addGuessLogEntries(guesses: TeamPuzzleGuess[]) {
    this.guessLog = (this.guessLog ?? []).concat(guesses);
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
    const guessLog = this.guessLog
      ? this.guessLog.concat(other.guessLog ?? [])
      : other.guessLog;
    return new DeferredPublications({
      activityLog,
      guessLog,
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
        if (this.guessLog) {
          for (const guess of this.guessLog) {
            await redisClient.publish(
              "global/guess_log",
              JSON.stringify(guess),
            );
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
