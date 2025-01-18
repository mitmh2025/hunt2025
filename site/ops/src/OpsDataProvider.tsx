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
import {
  type FrontendClient,
  newFrontendClient,
} from "../../lib/api/frontend_client";
import {
  type PuzzleAPIMetadata,
  type PuzzleStateLogEntry,
  type InternalActivityLogEntry,
  type TeamRegistrationLogEntry,
} from "../../lib/api/frontend_contract";
import {
  TeamInfoIntermediate,
  TeamStateIntermediate,
  formatTeamHuntState,
} from "../../src/api/logic";
import HUNT from "../../src/huntdata";
import { OpsDataLoader } from "./OpsDataLoader";
import { type TeamData } from "./opsdata/types";

export type OpsClients = {
  adminClient: AdminClient;
  frontendClient: FrontendClient;
  updateRegistrationLog: (opts?: { forceRequest?: boolean }) => Promise<void>;
  updateActivityLog: (opts?: { forceRequest?: boolean }) => Promise<void>;
  updatePlumpHimalayasLog: (opts?: { forceRequest?: boolean }) => Promise<void>;
};

const INITIAL_OPS_CLIENTS: OpsClients = {
  adminClient: newAdminClient("", ""),
  frontendClient: newFrontendClient("", { type: "admin", adminToken: "" }),
  updateRegistrationLog: () => {
    return Promise.resolve();
  },
  updateActivityLog: () => {
    return Promise.resolve();
  },
  updatePlumpHimalayasLog: () => {
    return Promise.resolve();
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
  plumpHimalayasLog: PuzzleStateLogEntry[];
  teams: TeamData[];
  gateDetails: Record<string, { title?: string; roundTitle: string }>;
  hiddenTeamIds: Set<number>;
};

const INITIAL_OPS_DATA: OpsData = {
  state: "loading",
  account: {
    email: "",
    isOpsAdmin: false,
  },
  registrationLog: [],
  activityLog: [],
  plumpHimalayasLog: [],
  teams: [],
  puzzleMetadata: {},
  gateDetails: {},
  hiddenTeamIds: new Set(),
};

export type OpsContextValue = {
  clients: OpsClients;
  data: OpsData;
};

const OpsContext = createContext<OpsContextValue>({
  clients: INITIAL_OPS_CLIENTS,
  data: INITIAL_OPS_DATA,
});

class OpsDataStore {
  private _teamStates = new Map<number, TeamStateIntermediate>();
  private _teamInfos = new Map<number, TeamInfoIntermediate>();
  private _activityLog: InternalActivityLogEntry[] = [];
  private _plumpHimalayasLog: PuzzleStateLogEntry[] = [];
  private _registrationLog: TeamRegistrationLogEntry[] = [];
  private _universalActivityLogs: InternalActivityLogEntry[] = [];

  constructor() {
    this._teamStates = new Map();
    this._teamInfos = new Map();
  }

  applyActivityLogEntry(entry: InternalActivityLogEntry) {
    const maxId = this._activityLog[this._activityLog.length - 1]?.id ?? 0;
    if (entry.id <= maxId) {
      return;
    }

    this._activityLog.push(entry);

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

  applyPlumpHimalayasLogEntry(entry: PuzzleStateLogEntry) {
    const maxId =
      this._plumpHimalayasLog[this._plumpHimalayasLog.length - 1]?.id ?? 0;
    if (entry.id <= maxId) {
      return;
    }

    if (entry.team_id && entry.slug === "control_room") {
      this._plumpHimalayasLog.push(entry);
    }
  }

  applyRegistrationLogEntry(entry: TeamRegistrationLogEntry) {
    const maxId =
      this._registrationLog[this._registrationLog.length - 1]?.id ?? 0;
    if (entry.id <= maxId) {
      return;
    }

    let oldInfo = this._teamInfos.get(entry.team_id);
    if (!oldInfo) {
      oldInfo = new TeamInfoIntermediate();
    }

    const newInfo = oldInfo.reduce(entry);
    this._teamInfos.set(entry.team_id, newInfo);

    this._registrationLog.push(entry);
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

  getActivityLog() {
    return this._activityLog;
  }

  getPlumpHimalayasLog() {
    return this._plumpHimalayasLog;
  }

  getRegistrationLog() {
    return this._registrationLog;
  }

  reset() {
    this._teamStates = new Map();
    this._teamInfos = new Map();
    this._universalActivityLogs = [];
  }
}

function LoadingErrorState({
  children,
  immediateReset = false,
}: {
  children: React.ReactNode;
  immediateReset?: boolean;
}) {
  const [_, __, removeCookie] = useCookies(["mitmh2025_api_auth"]);
  const [delayPast, setDelayPast] = useState(false);
  useEffect(() => {
    const timeout = setTimeout(() => {
      setDelayPast(true);
    }, 15000);

    return () => {
      clearTimeout(timeout);
    };
  });

  function handleReset() {
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
  }
  return (
    <div style={{ width: "100vw" }}>
      <div style={{ maxWidth: "400px", margin: "50px auto" }}>
        <div>{children}</div>
        {immediateReset || delayPast ? (
          <div style={{ marginTop: "20px" }}>
            <button onClick={handleReset}>Reset Data & Reload</button>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default function OpsDataProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [cookies, _, removeCookie] = useCookies(["mitmh2025_api_auth"]);
  const [data, setData] = useState<OpsData>(INITIAL_OPS_DATA);

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

    const loader = new OpsDataLoader(frontendClient);

    let updateActivityLogPromise: Promise<void> | undefined = undefined;

    return {
      adminClient,
      frontendClient,
      async updateRegistrationLog({
        forceRequest = false,
      } = {}): Promise<void> {
        const newEntries = await loader.getNewRegistrationLogEntries({
          forceRequest,
        });

        if (newEntries.length === 0) {
          return;
        }

        newEntries.forEach((entry) => {
          getStore().applyRegistrationLogEntry(entry);
        });

        setData((oldData) => ({
          ...oldData,
          teams: getStore().getTeamData(),
          registrationLog: [...oldData.registrationLog, ...newEntries],
        }));
      },
      updateActivityLog({ forceRequest = false } = {}): Promise<void> {
        if (updateActivityLogPromise) {
          return updateActivityLogPromise;
        }
        return (updateActivityLogPromise = (async () => {
          const newEntries = await loader.getNewActivityLogEntries({
            forceRequest,
          });

          if (newEntries.length === 0) {
            return;
          }

          newEntries.forEach((entry) => {
            getStore().applyActivityLogEntry(entry);
          });

          setData((oldData) => ({
            ...oldData,
            teams: getStore().getTeamData(),
            activityLog: [...oldData.activityLog, ...newEntries],
          }));
        })().then((_) => {
          updateActivityLogPromise = undefined;
        }));
      },
      async updatePlumpHimalayasLog({
        forceRequest = false,
      } = {}): Promise<void> {
        const newEntries = await loader.getNewPlumpHimalayasLogEntries({
          forceRequest,
        });

        if (newEntries.length === 0) {
          return;
        }

        newEntries.forEach((entry) => {
          getStore().applyPlumpHimalayasLogEntry(entry);
        });

        setData((oldData) => ({
          ...oldData,
          teams: getStore().getTeamData(),
          plumpHimalayasLog: [...oldData.plumpHimalayasLog, ...newEntries],
        }));
      },
    };
  }, [cookies.mitmh2025_api_auth]);

  useEffect(() => {
    (async () => {
      const [puzzleMetadata, account] = await Promise.all([
        opsClients.frontendClient.getPuzzleMetadata(),
        opsClients.adminClient.opsAccount(),
        opsClients.updateRegistrationLog({ forceRequest: true }),
        opsClients.updateActivityLog({ forceRequest: true }),
        opsClients.updatePlumpHimalayasLog({ forceRequest: true }),
      ]);

      if (account.status === 401 || account.status === 403) {
        removeCookie("mitmh2025_api_auth");
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
        teams: getStore().getTeamData(),
        puzzleMetadata: puzzleMetadata.body,
        gateDetails,
        hiddenTeamIds: new Set(
          getStore()
            .getTeamData()
            .filter((team) => team.username.startsWith("dnm-"))
            .map((team) => team.teamId),
        ),
        registrationLog: getStore().getRegistrationLog(),
        activityLog: getStore().getActivityLog(),
        plumpHimalayasLog: getStore().getPlumpHimalayasLog(),
      });
    })().catch((e: unknown) => {
      console.error(e);
      setData({ ...INITIAL_OPS_DATA, state: "error" });
    });
  }, [cookies.mitmh2025_api_auth, removeCookie, opsClients]);

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    function updateInterval() {
      // ~5 seconds with jitter
      return 2500 + Math.random() * 5000;
    }

    function update() {
      (async () => {
        await opsClients.updateRegistrationLog();
        await opsClients.updateActivityLog();
        await opsClients.updatePlumpHimalayasLog();
      })()
        .catch((e: unknown) => {
          console.error("Error updating registration log", e);
        })
        .finally(() => {
          // Add a little bit of jitter to avoid tabs syncing up on update
          // times
          timeout = setTimeout(update, updateInterval());
        });
    }

    timeout = setTimeout(update, updateInterval());

    return () => {
      clearTimeout(timeout);
    };
  });

  if (data.state === "loading") {
    return <LoadingErrorState>Loading...</LoadingErrorState>;
  }

  if (data.state === "error") {
    return (
      <LoadingErrorState immediateReset>Error loading data</LoadingErrorState>
    );
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
