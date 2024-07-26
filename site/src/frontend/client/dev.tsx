import React, { useCallback, useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import DevPane from "../components/DevPane";
import { type DevtoolsState } from "../server/devtools";
import globalDatasetManager from "./DatasetManager";

const DevtoolsManager = () => {
  const [state, setState] = useState<DevtoolsState | undefined>(undefined);
  const [collapsed, setCollapsed] = useState<boolean>(false);
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
    <div
      style={{
        position: "absolute",
        right: "10px",
        top: "10px",
        minWidth: "200px",
      }}
    >
      {!collapsed ? <DevPane state={state} /> : undefined}
      <button
        style={{
          position: "absolute",
          margin: "4px",
          right: "0px",
          top: "0px",
          width: "24px",
          height: "24px",
        }}
        title={title}
        onClick={toggleCollapsed}
      >
        {buttonLabel}
      </button>
    </div>
  );
};

const elem = document.getElementById("root");
if (elem) {
  const devRoot = document.createElement("div");
  devRoot.id = "dev-root";
  elem.appendChild(devRoot);
  const reactRoot = createRoot(devRoot);
  reactRoot.render(<DevtoolsManager />);
}
