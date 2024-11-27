import { createContext, useContext, useEffect, useState } from "react";
import { newFrontendClient } from "../../lib/api/frontend_client";
import {
  type InternalActivityLogEntry,
  type TeamRegistrationLogEntry,
} from "../../lib/api/frontend_contract";

export type OpsData = {
  state: "loading" | "error" | "loaded";
  registrationLog: TeamRegistrationLogEntry[];
  activityLog: InternalActivityLogEntry[];
};

const INITIAL_STATE: OpsData = {
  state: "loading",
  registrationLog: [],
  activityLog: [],
};

export const OpsDataContext = createContext<OpsData>(INITIAL_STATE);

export default function OpsDataProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [data, setData] = useState<OpsData>(INITIAL_STATE);

  useEffect(() => {
    // TODO: Switch to loading data from the service worker + keeping
    // it up to date with websockets
    const client = newFrontendClient("/api", undefined);

    (async () => {
      const [registrationLog, activityLog] = await Promise.all([
        client.getFullTeamRegistrationLog(),
        client.getFullActivityLog(),
      ]);

      if (registrationLog.status !== 200) {
        console.error(registrationLog);
        throw new Error(
          `Failed to load registrationLog: ${registrationLog.status}`,
        );
      }

      if (activityLog.status !== 200) {
        console.error(activityLog);
        throw new Error(`Failed to load activityLog: ${activityLog.status}`);
      }

      setData({
        state: "loaded",
        registrationLog: registrationLog.body,
        activityLog: activityLog.body,
      });
    })().catch((e: unknown) => {
      console.error(e);
      setData({ ...INITIAL_STATE, state: "error" });
    });
  }, []);

  if (data.state === "loading") {
    return <div>Loading...</div>;
  }

  if (data.state === "error") {
    return <div>Error loading data</div>;
  }

  return (
    <OpsDataContext.Provider value={data}>{children}</OpsDataContext.Provider>
  );
}

export function useOpsData() {
  return useContext(OpsDataContext);
}
