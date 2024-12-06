import React from "react";
import { hydrateRoot } from "react-dom/client";
import { type ActivityLogEntry } from "../../../lib/api/client";
import ActivityLog from "../components/ActivityLog";
import useAppendDataset from "./useAppendDataset";

const ActivityLogManager = ({
  initialState,
}: {
  initialState: ActivityLogEntry[];
}) => {
  const state = useAppendDataset("activity_log", undefined, initialState);
  return <ActivityLog log={state} />;
};

const activityLogElem = document.getElementById("activity-log-root");
if (activityLogElem) {
  const initialActivityLogState = (
    window as unknown as { initialActivityLog: ActivityLogEntry[] }
  ).initialActivityLog;
  hydrateRoot(
    activityLogElem,
    <ActivityLogManager initialState={initialActivityLogState} />,
  );
} else {
  console.error(
    "Couldn't mount ActivityLog because #activity-log-root was nowhere to be found",
  );
}
