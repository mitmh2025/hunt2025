import { type ReactNode } from "react";
import { useOpsData } from "../OpsDataProvider";

export function useIsOpsAdmin() {
  const data = useOpsData();
  return data.account.isOpsAdmin;
}

export function AdminOnly({ children }: { children: ReactNode }) {
  const data = useOpsData();
  if (!data.account.isOpsAdmin) {
    return null;
  }
  return <>{children}</>;
}
