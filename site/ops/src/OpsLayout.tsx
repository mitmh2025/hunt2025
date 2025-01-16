import RefreshPermissions from "@mui/icons-material/LockReset";
import AdminIcon from "@mui/icons-material/Security";
import { Box, IconButton, Tooltip, styled } from "@mui/material";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import { PageContainer } from "@toolpad/core/PageContainer";
import { useCookies } from "react-cookie"; // eslint-disable-line import/no-unresolved -- eslint can't find it
import { Outlet } from "react-router-dom";
import { OpsDataLoader } from "./OpsDataLoader";
import { useOpsData } from "./OpsDataProvider";

const CurrentUserNavbarWrapper = styled(Box)`
  display: flex;
  align-items: center;

  @media (max-width: 599px) {
    display: none;
  }
`;

const CurrentUserSidebarWrapper = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 6px;

  @media (min-width: 600px) {
    display: none;
  }
`;

function CurrentUser() {
  const data = useOpsData();
  const [_, __, removeCookie] = useCookies(["mitmh2025_api_auth"]);

  return (
    <>
      {data.account.isOpsAdmin && <AdminIcon sx={{ mr: 1 }} />}{" "}
      {data.account.email}
      <Tooltip title="Refresh data & permissions">
        <IconButton
          sx={{ ml: 1 }}
          onClick={() => {
            removeCookie("mitmh2025_api_auth");
            localStorage.clear();

            OpsDataLoader.dropDB()
              .then(() => {
                window.location.reload();
              })
              .catch((e: unknown) => {
                console.error("Failed to drop indexeddb", e);
                window.location.reload();
              });
          }}
        >
          <RefreshPermissions />
        </IconButton>
      </Tooltip>
    </>
  );
}

function CurrentUserNavbar() {
  return (
    <CurrentUserNavbarWrapper>
      <CurrentUser />
    </CurrentUserNavbarWrapper>
  );
}

function CurrentUserSidebar() {
  return (
    <CurrentUserSidebarWrapper>
      <CurrentUser />
    </CurrentUserSidebarWrapper>
  );
}

export default function Layout() {
  return (
    <DashboardLayout
      slots={{
        toolbarActions: CurrentUserNavbar,
        sidebarFooter: CurrentUserSidebar,
      }}
    >
      <PageContainer breadcrumbs={[]}>
        <Outlet />
      </PageContainer>
    </DashboardLayout>
  );
}
