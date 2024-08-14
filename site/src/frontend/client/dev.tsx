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

const DevtoolsManager = () => {
  const [state, setState] = useState<DevtoolsState | undefined>(undefined);
  const [collapsed, setCollapsed] = useState<boolean>(true);
  const toggleCollapsed = useCallback(() => {
    setCollapsed((prevState) => !prevState);
  }, []);
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
  const reactRoot = createRoot(devRoot);
  reactRoot.render(<DevtoolsManager />);
} else {
  console.log("Could not mount devtools because #root is nowhere to be found");
}
