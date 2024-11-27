import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import OpsDataProvider from "./OpsDataProvider.tsx";

const root = document.getElementById("root");
if (!root) {
  throw new Error("No root element found");
}

createRoot(root).render(
  <StrictMode>
    <OpsDataProvider>
      <App />
    </OpsDataProvider>
  </StrictMode>,
);
