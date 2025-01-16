export type TimelineActivityLogEntry = {
  id: number;
  slug: string;
  type: string;
  node: TimelineNode;
  timestamp: Date;
  answer?: string;
};

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
  title: string;
  text: string;
  tiebreaker?: number;
  attention?: {
    event: TimelineEvent;
    slug: string;
  }[];
  threadRoot?: TimelineThread | undefined;
  defaultTime: number;
};
