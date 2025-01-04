import RefreshPermissions from "@mui/icons-material/LockReset";
import AdminIcon from "@mui/icons-material/Security";
import { Box, IconButton, Tooltip } from "@mui/material";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import { PageContainer } from "@toolpad/core/PageContainer";
import { useCookies } from "react-cookie"; // eslint-disable-line import/no-unresolved -- eslint can't find it
import { Outlet } from "react-router-dom";
import { useOpsData } from "./OpsDataProvider";

function CurrentUser() {
  const data = useOpsData();
  const [_, __, removeCookie] = useCookies(["mitmh2025_api_auth"]);

  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      {data.account.isOpsAdmin && <AdminIcon sx={{ mr: 1 }} />}{" "}
      {data.account.email}
      <Tooltip title="Refresh permissions">
        <IconButton
          sx={{ ml: 1 }}
          onClick={() => {
            removeCookie("mitmh2025_api_auth");
            window.location.reload();
          }}
        >
          <RefreshPermissions />
        </IconButton>
      </Tooltip>
    </Box>
  );
}

export default function Layout() {
  return (
    <DashboardLayout
      slots={{
        toolbarActions: CurrentUser,
      }}
    >
      <PageContainer breadcrumbs={[]}>
        <Outlet />
      </PageContainer>
    </DashboardLayout>
  );
}
