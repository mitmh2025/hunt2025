import React, { useRef, useEffect, useState } from "react";
import styled from "styled-components";
import {
  type TimelineActivityLogEntry,
  type TimelineAttention,
  type TimelineThread,
} from "./types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGlobe,
  faPuzzlePiece,
  faComments,
} from "@fortawesome/free-solid-svg-icons";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

const DAYS = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const PIXELS_PER_MINUTE = 1.5;
const WIDTH = 1032;
const MARGIN_VERTICAL = 16;
const MARGIN_HORIZONTAL = 10;
const NODE_RADIUS = 4;
const THREAD_STROKE_WIDTH = 4;
const THREAD_BRANCH_RADIUS = 16;
const THREAD_LABEL_OFFSET = 7;
const THREAD_CALLOUT_WIDTH = 28;
const THREAD_PADDING = 20;
const INFO_BOX_SPACING = 8;
const INFO_BOX_FONT_SIZE = 10;
const SCALE_BAR_STROKE_WIDTH = 1;
const SCALE_BAR_MINOR_WIDTH = 6;
const SCALE_BAR_MAJOR_WIDTH = 10;
const SCALE_BAR_OVERALL_WIDTH = 30;
const SCALE_BAR_TEXT_PADDING = 4;
const SCALE_BAR_FONT_SIZE = 10;
const CONTENT_COLOR = "#eaecf1";
const NODE_COLOR = "#eaecf1";
const BACKGROUND_COLOR = "#0b0f45";

const ATTENTION_COLOR_LOOKUP: Record<string, string> = {
  round_unlocked: "#ffc107",
  puzzle_unlocked: "#ffc107",
  puzzle_solved: "#3bd05e",
  interaction_unlocked: "#ffc107",
  interaction_completed: "#17a2b8",
};

const ATTENTION_ICON_LOOKUP: Record<string, IconProp> = {
  round_unlocked: faGlobe,
  puzzle_unlocked: faPuzzlePiece,
  puzzle_solved: faPuzzlePiece,
  interaction_unlocked: faComments,
  interaction_completed: faComments,
};

const ATTENTION_ROUTE_LOOKUP: Record<string, string> = {
  round_unlocked: "rounds",
  puzzle_unlocked: "puzzles",
  puzzle_solved: "puzzles",
  interaction_unlocked: "interactions",
  interaction_completed: "interactions",
};

const ATTENTION_VERB_LOOKUP: Record<string, string> = {
  round_unlocked: "Unlocked",
  puzzle_unlocked: "Unlocked",
  puzzle_solved: "Solved",
  interaction_unlocked: "Ready for",
  interaction_completed: "Completed",
};

const MAIN_THREAD: TimelineThread = {
  id: "main",
  title: "The diamond",
  color: "#204992",
};

const KICKOFF_TIME = new Date("2025-01-17T12:00:00.000-05:00");
const KICKOFF_NODE = {
  id: -1,
  thread: "main",
  text: "The Finster-Carter gala got off to a rocky start, as the legendary Shadow Diamond, owned by Ferdinand Carter, went missing. Family patriarch and longtime suspected crime boss Papa Finster hired Billie O'Ryan of the Two P.I. Noir Detective Agency to recover it and he recruited us.",
  timestamp: KICKOFF_TIME,
  tiebreaker: 0,
  threadRoot: undefined,
  answer: "",
  attention: [],
};

const TimelineContainer = styled.div`
  background-color: ${BACKGROUND_COLOR};
  overflow-x: scroll;
`;

const TimelineWrapper = styled.div`
  position: relative;
  width: ${WIDTH}px;
  margin: 0 auto;
`;

const TimelineSVG = styled.svg`
  display: block;
  user-select: none;
  position: relative;
`;

const TimelineInfoBoxTimestamp = styled.div`
  border-bottom: 1px solid ${CONTENT_COLOR};
  margin-bottom: 2px;
  font-size: ${INFO_BOX_FONT_SIZE};
  color: ${CONTENT_COLOR};
`;

const TimelineAttentionTitle = styled.span`
  margin-left: 2px;
`;

type TimelineAnnotatedActivityLogEntry = TimelineActivityLogEntry & {
  x: number;
  y: number;
  textX: number;
  textY: number;
  textHeight: number;
};

const DistributeInfoBoxes = (
  annotatedLog: TimelineAnnotatedActivityLogEntry[],
  visibleThreadIds: string[],
) => {
  visibleThreadIds.forEach((id) => {
    const nodes = annotatedLog.filter((n) => n.thread === id);
    const minY = nodes[0]?.y || 0; // satisfy linter; always exists
    const metaNodes = nodes.map((n, i) => {
      return {
        first: i,
        last: i,
        height: n.textHeight,
        y: n.y,
      };
    });
    while (true) {
      const cj = metaNodes.findIndex(
        (m, j) =>
          j > 0 &&
          m.y < (metaNodes[j - 1]?.y || 0) + (metaNodes[j - 1]?.height || 0),
      );
      if (cj === -1) {
        break;
      }
      const prev = metaNodes[cj - 1];
      const cur = metaNodes[cj];
      if (prev && cur) {
        // satisfy linter; always exist
        const earliestNode = nodes[prev.first];
        const latestNode = nodes[cur.last];
        if (earliestNode && latestNode) {
          // satisfy linter; always exist
          prev.last = cur.last;
          prev.height += cur.height;
          prev.y = Math.max(
            minY,
            (earliestNode.y + latestNode.y - prev.height + INFO_BOX_SPACING) /
              2,
          );
          metaNodes.splice(cj, 1);
        }
      }
    }
    metaNodes.forEach((m) => {
      let y = m.y;
      for (let i = m.first; i <= m.last; i++) {
        const n = nodes[i];
        if (n) {
          // satisfy linter; always exists
          n.textY = y;
          y += n.textHeight;
        }
      }
    });
  });
};

const TimelineBody = ({ log }: { log: TimelineActivityLogEntry[] }) => {
  const infoBoxRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const [infoHeights, setInfoHeights] = useState<Record<string, number>>({});
  useEffect(() => {
    const refs = infoBoxRefs.current;
    const heights = Object.fromEntries(
      Object.entries(refs).map(([id, el]) => [
        id,
        (el?.offsetHeight || 0) + INFO_BOX_SPACING,
      ]),
    );
    setInfoHeights(heights);
  }, [JSON.stringify(log)]);

  const annotatedLog = log
    .concat([KICKOFF_NODE])
    .map((a) =>
      Object.assign({ x: 0, y: 0, textX: 0, textY: 0, textHeight: 0 }, a),
    )
    .sort((a, b) => {
      const dateDiff =
        new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime();
      return dateDiff === 0 ? a.tiebreaker - b.tiebreaker : dateDiff;
    });
  const additionalThreads: (TimelineThread & { root: number | undefined })[] =
    annotatedLog.flatMap((entry) =>
      entry.threadRoot
        ? [Object.assign({ root: entry.id }, entry.threadRoot)]
        : [],
    );
  const threads = additionalThreads
    .concat([Object.assign({ root: undefined }, MAIN_THREAD)])
    .reverse();
  const annotatedThreads = threads.map((thread) =>
    Object.assign({ x: 0, textX: 0, path: "", titleTransform: "" }, thread),
  );
  const visibleThreads = annotatedThreads.filter((thread) =>
    log.find((entry) => entry.thread === thread.id),
  );
  const infoTitleHeight = INFO_BOX_FONT_SIZE * 1.2 + 1;
  const availableWidth =
    WIDTH - SCALE_BAR_OVERALL_WIDTH - 2 * MARGIN_HORIZONTAL;
  const dx = availableWidth / Math.max(2, visibleThreads.length);
  const rightSide = THREAD_PADDING + THREAD_STROKE_WIDTH / 2;
  const textWidth =
    dx - THREAD_PADDING - THREAD_STROKE_WIDTH - THREAD_CALLOUT_WIDTH;
  visibleThreads.forEach((thread, ti) => {
    thread.x = MARGIN_HORIZONTAL + (ti + 1) * dx - rightSide;
    thread.textX = MARGIN_HORIZONTAL + ti * dx;
    thread.path = "";
    thread.titleTransform = "";
  });
  annotatedLog.forEach((entry) => {
    const thread = visibleThreads.find((thread) => thread.id === entry.thread);
    if (thread) {
      // satisfy linter; always true
      entry.y =
        MARGIN_VERTICAL +
        ((new Date(entry.timestamp).getTime() - KICKOFF_TIME.getTime()) /
          (60 * 1000)) *
          PIXELS_PER_MINUTE;
      entry.x = thread.x;
      entry.textX = thread.textX;
      entry.textHeight = infoHeights[entry.id] || 0;
    }
  });
  visibleThreads.forEach((thread) => {
    const x1 = thread.x;
    const y1 = annotatedLog.find((entry) => entry.thread === thread.id)?.y || 0;
    const y2 =
      annotatedLog.findLast((entry) => entry.thread === thread.id)?.y || 0;
    if (thread.root) {
      const rootEntry = annotatedLog.find((entry) => entry.id === thread.root);
      const x0 = rootEntry?.x || 0;
      const y0 = rootEntry?.y || 0;
      const r = Math.min(y1 - y0, Math.abs(x1 - x0), THREAD_BRANCH_RADIUS);
      thread.path = `M ${x0} ${y0} H ${x1 > x0 ? x1 - r : x1 + r} A ${r} ${r} 0 0 ${x1 > x0 ? 1 : 0} ${x1} ${y0 + r} V ${y2}`;
    } else {
      thread.path = `M ${x1} ${y1} V ${y2}`;
    }
    thread.titleTransform = `translate(${x1 + THREAD_LABEL_OFFSET}, ${y1}) rotate(90)`;
  });
  const lastEntry = annotatedLog[annotatedLog.length - 1];
  const scaleLastHour = lastEntry
    ? Math.max(
        1,
        Math.ceil(
          (new Date(lastEntry.timestamp).getTime() - KICKOFF_TIME.getTime()) /
            (60 * 60 * 1000),
        ),
      )
    : 1;
  const scaleHeight = scaleLastHour * 60 * PIXELS_PER_MINUTE;
  const scaleTicks = [...Array(scaleLastHour + 1).keys()];
  DistributeInfoBoxes(
    annotatedLog,
    visibleThreads.map((thread) => thread.id),
  );
  const scaleBottom = MARGIN_VERTICAL + scaleHeight;
  const textBottom = Math.max(
    ...annotatedLog.map((n) => n.textY + n.textHeight),
  );
  const overallHeight = Math.max(scaleBottom, textBottom) + MARGIN_VERTICAL;
  return (
    <TimelineContainer>
      <TimelineWrapper>
        <TimelineSVG
          xmlns="http://www.w3.org/2000/svg"
          width={WIDTH}
          height={overallHeight}
        >
          <g>
            <line
              strokeLinecap="butt"
              strokeWidth={SCALE_BAR_STROKE_WIDTH}
              stroke={CONTENT_COLOR}
              x1={WIDTH - SCALE_BAR_OVERALL_WIDTH}
              x2={WIDTH - SCALE_BAR_OVERALL_WIDTH}
              y1={MARGIN_VERTICAL}
              y2={MARGIN_VERTICAL + scaleHeight}
            />
            {scaleTicks.map((tick) => (
              <line
                key={tick}
                strokeLinecap="butt"
                strokeWidth={SCALE_BAR_STROKE_WIDTH}
                stroke={CONTENT_COLOR}
                x1={WIDTH - SCALE_BAR_OVERALL_WIDTH}
                x2={
                  WIDTH -
                  SCALE_BAR_OVERALL_WIDTH +
                  (tick % 6 ? SCALE_BAR_MINOR_WIDTH : SCALE_BAR_MAJOR_WIDTH)
                }
                y1={MARGIN_VERTICAL + tick * 60 * PIXELS_PER_MINUTE}
                y2={MARGIN_VERTICAL + tick * 60 * PIXELS_PER_MINUTE}
              />
            ))}
            {scaleTicks.map((tick) =>
              tick % 6 ? null : (
                <text
                  key={tick}
                  textAnchor="start"
                  dominantBaseline="middle"
                  fontSize={SCALE_BAR_FONT_SIZE}
                  fill={CONTENT_COLOR}
                  x={
                    WIDTH -
                    SCALE_BAR_OVERALL_WIDTH +
                    (tick % 6
                      ? SCALE_BAR_MINOR_WIDTH
                      : SCALE_BAR_MAJOR_WIDTH + SCALE_BAR_TEXT_PADDING)
                  }
                  y={MARGIN_VERTICAL + tick * 60 * PIXELS_PER_MINUTE}
                >
                  {tick}
                </text>
              ),
            )}
          </g>
          <g>
            {visibleThreads.map((thread) => (
              <path
                key={thread.id}
                strokeWidth={THREAD_STROKE_WIDTH}
                fill="none"
                stroke={thread.color}
                d={thread.path}
              />
            ))}
            {visibleThreads.map((thread) => (
              <text
                key={thread.id}
                fill={thread.color}
                textAnchor="start"
                transform={thread.titleTransform}
              >
                {thread.title}
              </text>
            ))}
          </g>
          <g>
            {annotatedLog.map((entry) => (
              <circle
                key={entry.id}
                strokeWidth={0}
                fill={NODE_COLOR}
                r={NODE_RADIUS}
                cx={entry.x}
                cy={entry.y}
              />
            ))}
          </g>
          <g>
            {annotatedLog.map((entry) => (
              <line
                key={entry.id}
                strokeLinecap="round"
                strokeWidth="1px"
                stroke={CONTENT_COLOR}
                x1={entry.textX + textWidth - 0.5}
                y1={entry.textY + infoTitleHeight - 0.5}
                x2={entry.textX + textWidth + THREAD_CALLOUT_WIDTH}
                y2={entry.y}
              />
            ))}
          </g>
        </TimelineSVG>
        <div>
          {annotatedLog.map((entry) => (
            <TimelineInfoBox
              key={entry.id}
              width={textWidth}
              entry={entry}
              ref={(ref) => {
                infoBoxRefs.current[entry.id] = ref;
              }}
              x={entry.textX}
              y={entry.textY}
            />
          ))}
        </div>
      </TimelineWrapper>
    </TimelineContainer>
  );
};

const TimelineInfoBox = React.forwardRef(
  (
    {
      entry,
      width,
      x,
      y,
    }: { entry: TimelineActivityLogEntry; width: number; x: number; y: number },
    ref: React.ForwardedRef<HTMLDivElement>,
  ) => {
    const time = new Date(entry.timestamp);
    const day = DAYS[time.getDay()];
    const hour = time.getHours();
    const min = time.getMinutes();
    const stamp = `${day} ${String(hour).padStart(2, "0")}:${String(min).padStart(2, "0")}`;
    return (
      <div
        style={{
          top: y,
          left: x,
          width: width,
          fontSize: INFO_BOX_FONT_SIZE,
          position: "absolute",
          lineHeight: 1.2,
        }}
        ref={ref}
      >
        <TimelineInfoBoxTimestamp>{stamp}</TimelineInfoBoxTimestamp>
        {entry.attention.map((attn, i) => (
          <TimelineAttention key={i} attn={attn} />
        ))}
        <div>{entry.text.replace("***", entry.answer)}</div>
      </div>
    );
  },
);

const TimelineAttention = ({ attn }: { attn: TimelineAttention }) => {
  const color = ATTENTION_COLOR_LOOKUP[attn.event];
  const icon = ATTENTION_ICON_LOOKUP[attn.event] || faPuzzlePiece;
  const path = `/${ATTENTION_ROUTE_LOOKUP[attn.event]}/${attn.slug}`;
  const verb = ATTENTION_VERB_LOOKUP[attn.event];
  return (
    <div style={{ color }}>
      <FontAwesomeIcon icon={icon} />
      <TimelineAttentionTitle>
        {verb}{" "}
        <a href={path} style={{ color }}>
          {attn.title}
        </a>
      </TimelineAttentionTitle>
    </div>
  );
};

export default TimelineBody;
