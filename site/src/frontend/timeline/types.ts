type TimelineEvent =
  | "round_unlocked"
  | "puzzle_unlocked"
  | "puzzle_solved"
  | "interaction_unlocked"
  | "interaction_completed";

export type TimelineThread = {
  id: string;
  name: string;
  permittedOrders: number[];
};

export type TimelineNode = {
  event: TimelineEvent;
  slug: string;
  thread: string;
  name?: string;
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
  name: string;
  timestamp: Date;
  thread: string;
  text: string;
  tiebreaker: number;
  attention: {
    event: TimelineEvent;
    slug: string;
    title: string;
  }[];
  answer: string;
  threadRoot: TimelineThread | undefined;
};
