import { CssBaseline, ThemeProvider } from "@mui/material";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.tsx";
import OpsDataProvider from "./OpsDataProvider.tsx";
import OpsLayout from "./OpsLayout.tsx";
import Home from "./routes/Home.tsx";
import Puzzles from "./routes/Puzzles.tsx";
import theme from "./theme.ts";

const router = createBrowserRouter([
  {
    Component: App,
    children: [
      {
        path: "/",
        Component: OpsLayout,
        children: [
          {
            path: "",
            Component: Home,
          },
          {
            path: "puzzles",
            Component: Puzzles,
          },
        ],
      },
    ],
  },
]);

const root = document.getElementById("root");
if (!root) {
  throw new Error("No root element found");
}

createRoot(root).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <OpsDataProvider>
        <RouterProvider router={router} />
      </OpsDataProvider>
    </ThemeProvider>
  </StrictMode>,
);
