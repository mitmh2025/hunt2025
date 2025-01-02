import ControlCameraIcon from "@mui/icons-material/ControlCamera";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PuzzleIcon from "@mui/icons-material/Extension";
import { Box } from "@mui/material";
import type { Branding, Navigation } from "@toolpad/core";
import { AppProvider } from "@toolpad/core/react-router-dom";
import { Outlet } from "react-router-dom";
import theme from "./theme";

const NAVIGATION: Navigation = [
  {
    kind: "header",
    title: "Dashboard",
  },
  {
    title: "Big Board",
    icon: <DashboardIcon />,
  },
  {
    segment: "puzzles",
    title: "Puzzles",
    icon: <PuzzleIcon />,
  },
  {
    segment: "deserted-ninja",
    title: "deserted-ninja stub",
    icon: <PuzzleIcon />,
  },
];

const BRANDING: Branding = {
  title: "Hunt Ops",
  logo: (
    <Box sx={{ mt: 1 }}>
      <ControlCameraIcon />
    </Box>
  ),
};

export default function App() {
  return (
    <AppProvider navigation={NAVIGATION} branding={BRANDING} theme={theme}>
      <Outlet />
    </AppProvider>
  );
}
