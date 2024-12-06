import React, { useEffect } from "react";
import { hydrateRoot } from "react-dom/client";
import { type TeamInfo } from "../../../lib/api/client";
import NavBar, { type NavBarState } from "../components/NavBar";
import globalDatasetManager from "./DatasetManager";
import useDataset from "./useDataset";

const NavBarManager = ({
  initialTeamInfo,
  initialState,
}: {
  initialTeamInfo: TeamInfo;
  initialState: NavBarState;
}) => {
  const info = useDataset("team_info", undefined, initialTeamInfo);
  const state = useDataset("navbar", undefined, initialState);

  useEffect(() => {
    const stop = globalDatasetManager.watch(
      "activity_log",
      undefined,
      [],
      (value: object) => {
        // TODO: append each value to a log, and pick which (if any) to display as notifications
        console.log("activity log", value);
      },
    );
    return stop;
  }, []);

  return <NavBar info={info} state={state} />;
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
