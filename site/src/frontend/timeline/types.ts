type TimelineEvent =
  | "round_unlocked"
  | "puzzle_unlocked"
  | "puzzle_solved"
  | "interaction_unlocked"
  | "interaction_completed";

export type TimelineThread = {
  id: string;
  title: string;
  color: string;
};

export type TimelineNode = {
  event: TimelineEvent;
  slug: string;
  thread: string;
  text: string;
  tiebreaker?: number;
  attention?: {
    event: TimelineEvent;
    slug: string;
  }[];
  threadRoot?: TimelineThread | undefined;
  defaultTime: number;
};

export type TimelineActivityLogEntry = {
  id: number;
  timestamp: Date;
  thread: string;
  text: string;
  tiebreaker: number;
  attention: TimelineAttention[];
  answer: string;
  threadRoot: TimelineThread | undefined;
};

export type TimelineAttention = {
  event: TimelineEvent;
  slug: string;
  title: string;
};
