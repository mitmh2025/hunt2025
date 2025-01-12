import React from "react";
import { hydrateRoot } from "react-dom/client";
import useAppendDataset from "../client/useAppendDataset";
import TimelineBody from "./TimelineBody";
import { type TimelineActivityLogEntry } from "./types";

const TimelineManager = ({
  initialTimelineActivityLog,
}: {
  initialTimelineActivityLog: TimelineActivityLogEntry[];
}) => {
  const log = useAppendDataset(
    "timeline",
    undefined,
    initialTimelineActivityLog,
  );
  return <TimelineBody log={log} />;
};

const hubElem = document.getElementById("timeline-root");
if (hubElem) {
  const initialTimelineActivityLog = (
    window as unknown as {
      initialTimelineActivityLog: TimelineActivityLogEntry[];
    }
  ).initialTimelineActivityLog;
  hydrateRoot(
    hubElem,
    <TimelineManager initialTimelineActivityLog={initialTimelineActivityLog} />,
  );
} else {
  console.error(
    "Couldn't mount Hub because #timeline-root was nowhere to be found",
  );
}
