import React from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App";

import "./index.css";

const elem = document.getElementById("master-root");
if (elem) {
  const root = createRoot(elem);
  root.render(<App />);
}
