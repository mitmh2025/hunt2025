import React, { useEffect, useRef } from "react";
import { hydrateRoot } from "react-dom/client";
import { type ActivityLogEntry, type TeamInfo } from "../../../lib/api/client";
import { formatActivityLogEntry } from "../components/ActivityLog";
import NavBar, { type NavBarState } from "../components/NavBar";
import Notifications, {
  type NotificationsHandle,
} from "../components/Notifications";
import globalDatasetManager from "./DatasetManager";
import useDataset from "./useDataset";

const NOTIFICATION_HIGH_WATER_MARK = "notificationHighWaterMark";

function getNotificationHighWaterMark(pageRenderEpoch: number): number {
  // We show notifications for activity logs that are newer than BOTH the
  // latest epoch as of page load time (so you don't get a ton of notifications
  // when you log on for the first time, or come back to the page after a while),
  // AND the latest epoch that we've already shown a notification for because
  // the page-render epoch can be stale / from the cache, so you'd get
  // duplicates when navigating forward/back in history.
  const epochStr = localStorage.getItem(NOTIFICATION_HIGH_WATER_MARK);
  if (!epochStr) {
    return pageRenderEpoch;
  }

  const parsed = parseInt(epochStr, 10);
  if (isNaN(parsed)) {
    return pageRenderEpoch;
  }

  return Math.max(parsed, pageRenderEpoch);
}

const NavBarManager = ({
  initialTeamInfo,
  initialState,
}: {
  initialTeamInfo: TeamInfo;
  initialState: NavBarState;
}) => {
  const info = useDataset("team_info", undefined, initialTeamInfo);
  const state = useDataset("navbar", undefined, initialState);
  const notifications = useRef<NotificationsHandle | null>(null);

  const highWaterMark = getNotificationHighWaterMark(initialState.epoch);

  useEffect(() => {
    const stop = globalDatasetManager.watch(
      "activity_log",
      undefined,
      [],
      (value: object) => {
        console.log("activity log", value);

        const entry = value as ActivityLogEntry;
        if (entry.id > highWaterMark) {
          localStorage.setItem(
            NOTIFICATION_HIGH_WATER_MARK,
            entry.id.toString(),
          );
          const formatted = formatActivityLogEntry(entry);
          if (formatted?.showNotification) {
            notifications.current?.addNotification({
              key: entry.id.toString(),
              icon: formatted.icon,
              description: formatted.description,
            });
          }
        }
      },
    );
    return stop;
  }, [highWaterMark]);

  return (
    <>
      <Notifications ref={notifications} maxNotifications={5} />
      <NavBar info={info} state={state} />
    </>
  );
};

const navbarElem = document.getElementById("navbar");
if (navbarElem) {
  const initialTeamInfo = (window as unknown as { initialTeamInfo: TeamInfo })
    .initialTeamInfo;
  const initialNavbarState = (
    window as unknown as { initialNavBarState: NavBarState }
  ).initialNavBarState;
  hydrateRoot(
    navbarElem,
    <NavBarManager
      initialTeamInfo={initialTeamInfo}
      initialState={initialNavbarState}
    />,
  );
} else {
  console.error(
    "Couldn't mount NavBar because #navbar was nowhere to be found",
  );
}
