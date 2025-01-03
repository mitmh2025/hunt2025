import ControlCameraIcon from "@mui/icons-material/ControlCamera";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PuzzleIcon from "@mui/icons-material/Extension";
import MailIcon from "@mui/icons-material/Mail";
import TeamsIcon from "@mui/icons-material/People";
import AdminIcon from "@mui/icons-material/Security";
import { Box } from "@mui/material";
import type { Branding, Navigation } from "@toolpad/core";
import { AppProvider } from "@toolpad/core/react-router-dom";
import { Outlet } from "react-router-dom";
import { useIsOpsAdmin } from "./components/AdminOnly";
import theme from "./theme";

const BRANDING: Branding = {
  title: "Hunt Ops",
  logo: (
    <Box sx={{ mt: 1 }}>
      <ControlCameraIcon />
    </Box>
  ),
};

export default function App() {
  const isOpsAdmin = useIsOpsAdmin();

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
      title: "Teams",
      segment: "teams",
      icon: <TeamsIcon />,
    },
    {
      segment: "puzzles",
      title: "Puzzles",
      icon: <PuzzleIcon />,
    },
    ...(isOpsAdmin
      ? [
          {
            segment: "email-teams",
            title: "Email Teams",
            icon: <MailIcon />,
          },
          {
            segment: "manage-admins",
            title: "Manage Admins",
            icon: <AdminIcon />,
          },
        ]
      : []),
  ];

  return (
    <AppProvider navigation={NAVIGATION} branding={BRANDING} theme={theme}>
      <Outlet />
    </AppProvider>
  );
}
