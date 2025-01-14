import { CssBaseline, ThemeProvider } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterLuxon } from "@mui/x-date-pickers/AdapterLuxon";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.tsx";
import OpsDataProvider from "./OpsDataProvider.tsx";
import OpsLayout from "./OpsLayout.tsx";
import EmailTeams from "./routes/EmailTeams.tsx";
import FermitChallenge from "./routes/FermitChallenge.tsx";
import Gates from "./routes/Gates.tsx";
import Home from "./routes/Home.tsx";
import PushNotifyTeams from "./routes/PushNotifyTeams.tsx";
import Puzzle from "./routes/Puzzle.tsx";
import PuzzlesIndex from "./routes/PuzzlesIndex.tsx";
import Team from "./routes/Team.tsx";
import TeamIndex from "./routes/TeamIndex.tsx";
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
            Component: PuzzlesIndex,
          },
          {
            path: "puzzles/:slug",
            Component: Puzzle,
          },
          {
            path: "teams",
            Component: TeamIndex,
          },
          {
            path: "teams/:username",
            Component: Team,
          },
          {
            path: "email-teams/",
            Component: EmailTeams,
          },
          {
            path: "push-notify-teams/",
            Component: PushNotifyTeams,
          },
          {
            path: "gates",
            Component: Gates,
          },
          {
            path: "deserted-ninja",
            Component: FermitChallenge,
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
      <LocalizationProvider dateAdapter={AdapterLuxon}>
        <CssBaseline />
        <OpsDataProvider>
          <RouterProvider router={router} />
        </OpsDataProvider>
      </LocalizationProvider>
    </ThemeProvider>
  </StrictMode>,
);
