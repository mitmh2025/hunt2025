import React, { useEffect, useState } from "react";
import { hydrateRoot } from "react-dom/client";
import NavBar, { type NavBarState } from "../components/NavBar";
import globalDatasetManager from "./DatasetManager";

const NavBarManager = ({ initialState }: { initialState: NavBarState }) => {
  const [state, setState] = useState<NavBarState>(initialState);

  useEffect(() => {
    const stop = globalDatasetManager.watch("navbar", (value: object) => {
      setState(value as NavBarState);
    });
    return stop;
  }, []);

  return <NavBar state={state} />;
};

const navbarElem = document.getElementById("navbar");
if (navbarElem) {
  const initialNavbarState = (
    window as unknown as { initialNavBarState: NavBarState }
  ).initialNavBarState;
  hydrateRoot(navbarElem, <NavBarManager initialState={initialNavbarState} />);
} else {
  console.error(
    "Couldn't mount NavBar because #navbar was nowhere to be found",
  );
}
