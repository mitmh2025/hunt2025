import {
  createContext,
  useContext,
  useEffect,
  useState,
  useMemo,
  useRef,
} from "react";
import { useCookies } from "react-cookie"; // eslint-disable-line import/no-unresolved -- eslint can't find it
import { type AdminClient, newAdminClient } from "../../lib/api/admin_client";
import { type PuzzleAPIMetadata } from "../../lib/api/admin_contract";
import {
  type FrontendClient,
  newFrontendClient,
} from "../../lib/api/frontend_client";
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

export type OpsClients = {
  adminClient: AdminClient;
  frontendClient: FrontendClient;
  appendActivityLogEntries: (entries: InternalActivityLogEntry[]) => void;
  appendRegistrationLogEntries: (entries: TeamRegistrationLogEntry[]) => void;
};

const INITIAL_OPS_CLIENTS: OpsClients = {
  adminClient: newAdminClient("", ""),
  frontendClient: newFrontendClient("", { type: "admin", adminToken: "" }),
  appendActivityLogEntries: () => {
    // do nothing
  },
  appendRegistrationLogEntries: () => {
    // do nothing
  },
};

export type OpsData = {
  state: "loading" | "error" | "loaded";
  account: {
    email: string;
    isOpsAdmin: boolean;
  };
  puzzleMetadata: PuzzleAPIMetadata;
  registrationLog: TeamRegistrationLogEntry[];
  activityLog: InternalActivityLogEntry[];
  teams: TeamData[];
  gateDetails: Record<string, { title?: string; roundTitle: string }>;
};

const INITIAL_OPS_DATA: OpsData = {
  state: "loading",
  account: {
    email: "",
    isOpsAdmin: false,
  },
  registrationLog: [],
  activityLog: [],
  teams: [],
  puzzleMetadata: {},
  gateDetails: {},
};

export type OpsContextValue = {
  clients: OpsClients;
  data: OpsData;
};

const OpsContext = createContext<OpsContextValue>({
  clients: INITIAL_OPS_CLIENTS,
  data: INITIAL_OPS_DATA,
});

function formatEntry<T extends { timestamp: string | Date }>(
  entry: T,
): T & { timestamp: Date } {
  return {
    ...entry,
    timestamp: new Date(entry.timestamp),
  };
}

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
          username: teamInfoIntermediate.registration.username,
          registration: teamInfoIntermediate.registration,
          state,
          formattedState: formatTeamHuntState(HUNT, state),
          deactivated: teamInfoIntermediate.deactivated,
        };
      })
      .filter((team: TeamData | null): team is TeamData => team !== null);
  }

  getTeamRegistrations() {
    return Array.from(this._teamInfos.values()).map((info) =>
      info.formatTeamRegistration(),
    );
  }

  reset() {
    this._teamStates = new Map();
    this._teamInfos = new Map();
    this._universalActivityLogs = [];
  }
}

export default function OpsDataProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [cookies, _, removeCookie] = useCookies(["mitmh2025_api_auth"]);

  const store = useRef<OpsDataStore | null>(null);
  function getStore() {
    if (!store.current) {
      store.current = new OpsDataStore();
    }
    return store.current;
  }

  const opsClients = useMemo<OpsClients>(() => {
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

    return {
      adminClient,
      frontendClient,

      appendActivityLogEntries: (entries) => {
        const formattedEntries = entries.map(formatEntry);

        formattedEntries.forEach((entry) => {
          getStore().applyActivityLogEntry(entry);
        });

        setData((oldData) => ({
          ...oldData,
          teams: getStore().getTeamData(),
          activityLog: [...oldData.activityLog, ...formattedEntries],
        }));
      },
      appendRegistrationLogEntries: (entries) => {
        const formattedEntries = entries.map(formatEntry);

        formattedEntries.forEach((entry) => {
          getStore().applyRegistrationLogEntry(entry);
        });

        setData((oldData) => ({
          ...oldData,
          teams: getStore().getTeamData(),
          registrationLog: [...oldData.registrationLog, ...formattedEntries],
        }));
      },
    };
  }, [cookies.mitmh2025_api_auth]);

  const [data, setData] = useState<OpsData>(INITIAL_OPS_DATA);

  useEffect(() => {
    // TODO: Switch to loading data from the service worker + keeping
    // it up to date with websockets

    (async () => {
      const [registrationLog, activityLog, puzzleMetadata, account] =
        await Promise.all([
          opsClients.frontendClient.getFullTeamRegistrationLog(),
          opsClients.frontendClient.getFullActivityLog(),
          opsClients.adminClient.getPuzzleMetadata(),
          opsClients.adminClient.opsAccount(),
        ]);

      if (account.status === 401 || account.status === 403) {
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

      if (account.status !== 200) {
        console.error(account);
        throw new Error(`Failed to load account: ${account.status}`);
      }

      const registrationLogEntries = registrationLog.body.map(formatEntry);
      const activityLogEntries = activityLog.body.map(formatEntry);

      getStore().reset();

      registrationLogEntries.forEach((entry) => {
        getStore().applyRegistrationLogEntry(entry);
      });

      activityLogEntries.forEach((entry) => {
        getStore().applyActivityLogEntry(entry);
      });

      const gateDetails: Record<
        string,
        { title?: string; roundTitle: string }
      > = {};
      HUNT.rounds.forEach((round) => {
        round.gates?.forEach((gate) => {
          gateDetails[gate.id] = { title: gate.title, roundTitle: round.title };
        });
      });

      setData({
        state: "loaded",
        account: account.body,
        registrationLog: registrationLogEntries,
        activityLog: activityLogEntries,
        teams: getStore().getTeamData(),
        puzzleMetadata: puzzleMetadata.body,
        gateDetails,
      });
    })().catch((e: unknown) => {
      console.error(e);
      setData({ ...INITIAL_OPS_DATA, state: "error" });
    });
  }, [
    cookies.mitmh2025_api_auth,
    removeCookie,
    opsClients.frontendClient,
    opsClients.adminClient,
  ]);

  if (data.state === "loading") {
    return <div>Loading...</div>;
  }

  if (data.state === "error") {
    return <div>Error loading data</div>;
  }

  return (
    <OpsContext.Provider
      value={{
        clients: opsClients,
        data,
      }}
    >
      {children}
    </OpsContext.Provider>
  );
}

export function useOpsData() {
  return useContext(OpsContext).data;
}

export function useOpsClients() {
  return useContext(OpsContext).clients;
}
