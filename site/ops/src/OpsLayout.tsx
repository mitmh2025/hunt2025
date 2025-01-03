import AdminIcon from "@mui/icons-material/Security";
import { Box } from "@mui/material";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import { PageContainer } from "@toolpad/core/PageContainer";
import { Outlet } from "react-router-dom";
import { useOpsData } from "./OpsDataProvider";

function CurrentUser() {
  const data = useOpsData();
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      {data.account.isOpsAdmin && <AdminIcon sx={{ mr: 1 }} />}{" "}
      {data.account.email}
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
