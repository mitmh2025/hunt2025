import { useCallback, useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { styled } from "styled-components";
import DevPane from "../components/DevPane";
import { type DevtoolsState } from "../server/devtools";
import huntLocalStorage from "../utils/huntLocalStorage";
import useDataset from "./useDataset";

const DevPaneContainer = styled.div`
  position: absolute;
  right: 10px;
  top: 58px;
  min-width: 200px;
  z-index: 2;

  @media print {
    display: none;
  }
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

const initialState: DevtoolsState = { epoch: -1 };
const DevtoolsManager = () => {
  const [collapsed, setCollapsed] = useState<boolean>(() => {
    if (HAS_STORAGE) {
      const value = huntLocalStorage.getItem(COLLAPSED_KEY);
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
      huntLocalStorage.setItem(COLLAPSED_KEY, collapsed ? "true" : "false");
    }
  }, [collapsed]);

  const state = useDataset("dev", undefined, initialState);
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
