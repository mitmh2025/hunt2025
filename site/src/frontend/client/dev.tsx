import React, { useCallback, useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { styled } from "styled-components";
import DevPane from "../components/DevPane";
import { type DevtoolsState } from "../server/devtools";
import globalDatasetManager from "./DatasetManager";

const DevPaneContainer = styled.div`
  position: absolute;
  right: 10px;
  top: 10px;
  min-width: 200px;
  z-index: 2;
`;

const DevPaneToggleButton = styled.button`
  position: absolute;
  margin: 4px;
  right: 0px;
  top: 0px;
  width: 3rem;
  font-size: 1.5rem;
  font-weight: 600;
`;

const HAS_STORAGE = typeof Storage !== "undefined";
const COLLAPSED_KEY = "devtools_collapsed";

const DevtoolsManager = () => {
  const [state, setState] = useState<DevtoolsState | undefined>(undefined);
  const [collapsed, setCollapsed] = useState<boolean>(() => {
    if (HAS_STORAGE) {
      const value = localStorage.getItem(COLLAPSED_KEY);
      if (value !== null) {
        return value === "true" ? true : false;
      }
    }
    return true;
  });
  const toggleCollapsed = useCallback(() => {
    setCollapsed((prevState) => !prevState);
  }, []);
  useEffect(() => {
    if (HAS_STORAGE) {
      localStorage.setItem(COLLAPSED_KEY, collapsed ? "true" : "false");
    }
  }, [collapsed]);
  useEffect(() => {
    const stop = globalDatasetManager.watch("dev", (value: object) => {
      setState(value as DevtoolsState);
    });
    return stop;
  }, []);

  const buttonLabel = collapsed ? "+" : "-";
  const title = collapsed ? "Show devtools" : "Hide devtools";
  return (
    <DevPaneContainer>
      {!collapsed ? <DevPane state={state} /> : undefined}
      <DevPaneToggleButton title={title} onClick={toggleCollapsed}>
        {buttonLabel}
      </DevPaneToggleButton>
    </DevPaneContainer>
  );
};

const elem = document.getElementById("root");
if (elem) {
  const devRoot = document.createElement("div");
  devRoot.id = "dev-root";
  elem.appendChild(devRoot);
  // Note: the devtools are designed to simply not exist in the page unless
  // this script was injected, so there's no SSR'd root to hydrate.
  const reactRoot = createRoot(devRoot);
  reactRoot.render(<DevtoolsManager />);
} else {
  console.log("Could not mount devtools because #root is nowhere to be found");
}
