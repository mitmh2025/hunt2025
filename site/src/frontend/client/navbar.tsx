import React, { useEffect, useRef, useState } from "react";
import { hydrateRoot } from "react-dom/client";
import type { ActivityLogEntry, TeamInfo } from "../../../lib/api/client";
import celebration from "../../assets/radio/celebration.mp3";
import { HuntIcon, formatActivityLogEntry } from "../components/ActivityLog";
import NavBar, { type NavBarState } from "../components/NavBar";
import Notifications, {
  type NotificationsHandle,
  type Notification,
} from "../components/Notifications";
import type { EventsState } from "../rounds/events/types";
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
  initialEventsState,
  initialTeamInfo,
  initialState,
}: {
  initialEventsState: EventsState;
  initialTeamInfo: TeamInfo;
  initialState: NavBarState;
}) => {
  const info = useDataset("team_info", undefined, initialTeamInfo);
  const eventsState = useDataset("events", undefined, initialEventsState);
  const state = useDataset("navbar", undefined, initialState);
  const notifications = useRef<NotificationsHandle | null>(null);

  const highWaterMark = getNotificationHighWaterMark(initialState.epoch);

  useEffect(() => {
    const stop = globalDatasetManager.watch(
      "activity_log",
      undefined,
      [],
      (value: object) => {
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

          if (entry.type === "puzzle_solved") {
            document.dispatchEvent(
              new CustomEvent("hunt:play-sound-effect", {
                detail: {
                  key: "celebration",
                  src: celebration,
                },
              }),
            );
          }
        }
      },
    );
    return stop;
  }, [highWaterMark]);

  const activeInteraction = state.virtualInteractions.find(
    (i) => i.state === "unstarted" || i.state === "running",
  );

  const [persistNotifications, setPersistentNotifications] = useState(
    [] as Notification[],
  );
  useEffect(() => {
    // We do this in a `useEffect` so it's not included in initial
    // hydration, since the server-side navbar code doesn't have
    // this logic
    setPersistentNotifications(
      activeInteraction &&
        !document.location.pathname.endsWith(activeInteraction.slug)
        ? [
            {
              key: activeInteraction.slug,
              icon: <HuntIcon />,
              description: (
                <>
                  It’s time to interview a key witness! Each person on your team
                  should join Billie to{" "}
                  <a href={`/interactions/${activeInteraction.slug}`}>
                    conduct an {activeInteraction.title}
                  </a>
                  .
                </>
              ),
            },
          ]
        : [],
    );
  }, [activeInteraction]);

  return (
    <>
      <Notifications
        persistentNotifications={persistNotifications}
        ref={notifications}
        maxNotifications={5}
      />
      <NavBar eventsState={eventsState} info={info} state={state} />
    </>
  );
};

const navbarElem = document.getElementById("navbar");
if (navbarElem) {
  const initialTeamInfo = (window as unknown as { initialTeamInfo: TeamInfo })
    .initialTeamInfo;
  const initialEventsState = (
    window as unknown as { initialEventsState: EventsState }
  ).initialEventsState;
  const initialNavbarState = (
    window as unknown as { initialNavBarState: NavBarState }
  ).initialNavBarState;
  hydrateRoot(
    navbarElem,
    <NavBarManager
      initialEventsState={initialEventsState}
      initialTeamInfo={initialTeamInfo}
      initialState={initialNavbarState}
    />,
  );
} else {
  console.error(
    "Couldn't mount NavBar because #navbar was nowhere to be found",
  );
}
