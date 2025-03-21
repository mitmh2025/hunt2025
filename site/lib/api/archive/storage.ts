import { type z } from "zod";
import { hydrateLogEntry } from "../../../src/api/logic";
import { genId } from "../../id";
import {
  InternalActivityLogEntrySchema,
  TeamRegistrationLogEntrySchema,
  PuzzleStateLogEntrySchema,
} from "../frontend_contract";

export const ARCHIVE_TEAM_ID = 1;

type LogCallback<Hydrated> = (log: Hydrated[]) => void;

class LocalStorageLog<Schema extends z.ZodTypeAny> {
  public subscribers = new Map<string, LogCallback<z.output<Schema>>>();

  constructor(
    public name: string,
    public schema: Schema,
    public hydrator: (e: z.input<Schema>) => z.output<Schema>,
  ) {
    window.addEventListener("storage", (e) => {
      if (e.key === name) {
        const log = this.fetch();
        this.subscribers.forEach((cb) => {
          cb(log);
        });
      }
    });
  }

  fetch(): z.output<Schema>[] {
    const dehydrated = JSON.parse(
      localStorage.getItem(this.name) ?? "[]",
    ) as z.input<Schema>[];
    return dehydrated.map(this.hydrator);
  }

  set(log: z.output<Schema>[]) {
    localStorage.setItem(this.name, JSON.stringify(log));
    this.subscribers.forEach((cb) => {
      cb(log);
    });
  }

  clear() {
    localStorage.removeItem(this.name);
  }

  subscribe(sub: LogCallback<z.output<Schema>>): () => void {
    const id = genId();
    this.subscribers.set(id, sub);
    return () => {
      this.subscribers.delete(id);
    };
  }
}

export const ACTIVITY_LOG_KEY = "activityLog";
export const TEAM_REGISTRATION_LOG_KEY = "teamRegistrationLog";
export const PUZZLE_STATE_LOG_KEY = "puzzleStateLog";

export const activityLog = new LocalStorageLog(
  ACTIVITY_LOG_KEY,
  InternalActivityLogEntrySchema,
  hydrateLogEntry,
);

export const teamRegistrationLog = new LocalStorageLog(
  TEAM_REGISTRATION_LOG_KEY,
  TeamRegistrationLogEntrySchema,
  hydrateLogEntry,
);

export const puzzleStateLog = new LocalStorageLog(
  PUZZLE_STATE_LOG_KEY,
  PuzzleStateLogEntrySchema,
  hydrateLogEntry,
);

export const ALL_LOGS = [activityLog, teamRegistrationLog, puzzleStateLog];
