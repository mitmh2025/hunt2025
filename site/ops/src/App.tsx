import AnnouncementIcon from "@mui/icons-material/Announcement";
import ControlCameraIcon from "@mui/icons-material/ControlCamera";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PuzzleIcon from "@mui/icons-material/Extension";
import MailIcon from "@mui/icons-material/Mail";
import GatesIcon from "@mui/icons-material/MeetingRoom";
import TeamsIcon from "@mui/icons-material/People";
import ScaleIcon from "@mui/icons-material/Scale";
import VideocamIcon from "@mui/icons-material/Videocam";
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
    {
      segment: "gates",
      title: "Gates",
      icon: <GatesIcon />,
    },
    {
      segment: "deserted-ninja",
      title: "FerMIT Challenge",
      icon: <ScaleIcon />,
    },
    {
      segment: "plump-himalayas",
      title: "Control Room",
      icon: <VideocamIcon />,
    },
    ...(isOpsAdmin
      ? [
          {
            segment: "email-teams",
            title: "Email Teams",
            icon: <MailIcon />,
          },
          {
            segment: "push-notify-teams",
            title: "Push Notify Teams",
            icon: <AnnouncementIcon />,
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
