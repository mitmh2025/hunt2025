import { createContext, useContext, useEffect, useState } from "react";
import { useCookies } from "react-cookie"; // eslint-disable-line import/no-unresolved -- eslint can't find it
import { newAdminClient, type AuthClient } from "../../lib/api/admin_client";
import { type PuzzleAPIMetadata } from "../../lib/api/admin_contract";
import { newFrontendClient } from "../../lib/api/frontend_client";
import {
  type InternalActivityLogEntry,
  type TeamRegistrationLogEntry,
} from "../../lib/api/frontend_contract";
import {
  TeamInfoIntermediate,
  TeamStateIntermediate,
  formatTeamHuntState,
} from "../../src/api/logic";
import HUNT from "../../src/huntdata";
import { type TeamData } from "./opsdata/types";

export type OpsData = {
  state: "loading" | "error" | "loaded";
  puzzleMetadata: PuzzleAPIMetadata;
  registrationLog: TeamRegistrationLogEntry[];
  activityLog: InternalActivityLogEntry[];
  teams: TeamData[];
  adminClient?: AuthClient;
};

const INITIAL_STATE: OpsData = {
  state: "loading",
  registrationLog: [],
  activityLog: [],
  teams: [],
  puzzleMetadata: {},
};

export const OpsDataContext = createContext<OpsData>(INITIAL_STATE);

class OpsDataStore {
  private _teamStates = new Map<number, TeamStateIntermediate>();
  private _teamInfos = new Map<number, TeamInfoIntermediate>();
  private _universalActivityLogs: InternalActivityLogEntry[] = [];

  constructor() {
    this._teamStates = new Map();
    this._teamInfos = new Map();
  }

  applyActivityLogEntry(entry: InternalActivityLogEntry) {
    if (entry.team_id === undefined) {
      // add to universal activity log to apply to future teams
      this._universalActivityLogs.push(entry);

      // apply to all existing teams
      for (const [teamId, teamState] of this._teamStates.entries()) {
        this._teamStates.set(teamId, teamState.reduce(entry));
      }

      return;
    }

    let oldState = this._teamStates.get(entry.team_id);
    if (!oldState) {
      oldState = this._universalActivityLogs.reduce(
        (memo, log) => memo.reduce(log),
        new TeamStateIntermediate(HUNT),
      );
    }

    const newState = oldState.reduce(entry);
    this._teamStates.set(entry.team_id, newState);
  }

  applyRegistrationLogEntry(entry: TeamRegistrationLogEntry) {
    let oldInfo = this._teamInfos.get(entry.team_id);
    if (!oldInfo) {
      oldInfo = new TeamInfoIntermediate();
    }

    const newInfo = oldInfo.reduce(entry);
    this._teamInfos.set(entry.team_id, newInfo);
  }

  getTeamData(): TeamData[] {
    return Array.from(this._teamInfos.entries())
      .map(([teamId, teamInfoIntermediate]) => {
        if (!teamInfoIntermediate.registration) {
          console.warn(`Team ${teamId} has no registration info`);
          return null;
        }

        const state =
          this._teamStates.get(teamId) ?? new TeamStateIntermediate(HUNT);
        return {
          teamId,
          name: teamInfoIntermediate.registration.name,
          registration: teamInfoIntermediate.registration,
          state,
          formattedState: formatTeamHuntState(HUNT, state),
        };
      })
      .filter((team): team is TeamData => team !== null);
  }

  getTeamRegistrations() {
    return Array.from(this._teamInfos.values()).map((info) =>
      info.formatTeamRegistration(),
    );
  }
}

export default function OpsDataProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [data, setData] = useState<OpsData>(INITIAL_STATE);

  const [cookies, _, removeCookie] = useCookies(["mitmh2025_api_auth"]);

  useEffect(() => {
    // TODO: Switch to loading data from the service worker + keeping
    // it up to date with websockets

    (async () => {
      const token = cookies.mitmh2025_api_auth as string | undefined;
      if (!token) {
        throw new Error(`Failed to load token from cookie`);
      }

      const apiUrl = "/api";

      const frontendClient = newFrontendClient(apiUrl, {
        type: "admin",
        adminToken: token,
      });

      const adminClient = newAdminClient(apiUrl, token);

      const [registrationLog, activityLog, puzzleMetadata] = await Promise.all([
        frontendClient.getFullTeamRegistrationLog(),
        frontendClient.getFullActivityLog(),
        adminClient.getPuzzleMetadata(),
      ]);

      if (registrationLog.status === 401) {
        removeCookie("mitmh2025_api_auth");
      }

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

      if (puzzleMetadata.status !== 200) {
        console.error(puzzleMetadata);
        throw new Error(
          `Failed to load puzzleMetadata: ${puzzleMetadata.status}`,
        );
      }

      const store = new OpsDataStore();
      registrationLog.body.forEach((entry) => {
        store.applyRegistrationLogEntry(entry);
      });
      activityLog.body.forEach((entry) => {
        store.applyActivityLogEntry(entry);
      });

      setData({
        state: "loaded",
        registrationLog: registrationLog.body,
        activityLog: activityLog.body,
        teams: store.getTeamData(),
        puzzleMetadata: puzzleMetadata.body,
        adminClient: adminClient,
      });
    })().catch((e: unknown) => {
      console.error(e);
      setData({ ...INITIAL_STATE, state: "error" });
    });
  }, [cookies.mitmh2025_api_auth, removeCookie]);

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
