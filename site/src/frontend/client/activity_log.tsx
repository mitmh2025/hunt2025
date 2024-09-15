import React, { useEffect, useState } from "react";
import { hydrateRoot } from "react-dom/client";
import { type ActivityLogEntry } from "../../../lib/api/client";
import ActivityLog from "../components/ActivityLog";
import globalDatasetManager from "./DatasetManager";

const ActivityLogManager = ({
  initialState,
}: {
  initialState: ActivityLogEntry[];
}) => {
  const [state, setState] = useState<ActivityLogEntry[]>(initialState);
  useEffect(() => {
    const stop = globalDatasetManager.watch(
      "activity_log",
      undefined,
      (value: object) => {
        setState((prevState: ActivityLogEntry[]) => {
          // Append if not already known
          if (
            prevState.findIndex(
              (entry) => entry.id === (value as ActivityLogEntry).id,
            ) === -1
          ) {
            const newState = [...prevState, value as ActivityLogEntry];
            console.log("log is now", newState);
            return newState;
          } else {
            return prevState;
          }
        });
      },
    );
    return stop;
  }, []);
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
