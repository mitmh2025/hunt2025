export type LogEntryData = {
  line: string;
  isYou: boolean;
  speaker?: string; // If unset, this is more of a stage direction
  isDone?: boolean;
} & (
  | {
      isYou: true;
      speaker: string;
    }
  | {
      isYou: false;
      speaker?: string;
    }
);
