import { createContext, useContext, useEffect, useReducer } from "react";
import {
  type FermitQuestion,
  type FermitSession,
} from "../../lib/api/admin_contract";
import { useOpsData } from "./OpsDataProvider";

export type FermitData = {
  sessions: FermitSession[];
  questions: Map<number, FermitQuestion>;
  activeSession: FermitSession | null;
};
const INITIAL_STATE: FermitData = {
  sessions: [],
  questions: new Map(),
  activeSession: null,
};

export enum FermitDataActionType {
  SET_QUESTIONS = "set_questions",
  SET_SESSIONS = "set_sessions",
  SET_ACTIVE_SESSION = "set_active_session",
  SESSION_UPDATE = "session_update",
}
type SetQuestionsAction = {
  type: FermitDataActionType.SET_QUESTIONS;
  questions: Map<number, FermitQuestion>;
};
type SetSessionsAction = {
  type: FermitDataActionType.SET_SESSIONS;
  sessions: FermitSession[];
};
type SetActiveSessionAction = {
  type: FermitDataActionType.SET_ACTIVE_SESSION;
  activeSession: FermitSession | null;
};
type SessionUpdateAction = {
  type: FermitDataActionType.SESSION_UPDATE;
  session: FermitSession | null;
};
type FermitDataUpdateAction =
  | SetQuestionsAction
  | SetSessionsAction
  | SetActiveSessionAction
  | SessionUpdateAction;

export const FermitDataContext = createContext<FermitData>(INITIAL_STATE);
export const FermitDispatchContext =
  createContext<React.Dispatch<FermitDataUpdateAction> | null>(null);

function updateData(d: FermitData, action: FermitDataUpdateAction) {
  const r = { ...d };

  switch (action.type) {
    case FermitDataActionType.SET_ACTIVE_SESSION:
      r.activeSession = action.activeSession;
      break;
    case FermitDataActionType.SET_QUESTIONS:
      r.questions = action.questions;
      break;
    case FermitDataActionType.SET_SESSIONS:
      r.sessions = action.sessions;
      break;
    case FermitDataActionType.SESSION_UPDATE:
      r.sessions = d.sessions.map((s) =>
        s.id === action.session?.id ? action.session : s,
      );
      break;
  }

  return r;
}

export function FermitDataProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const opsData = useOpsData();
  const [data, dispatch] = useReducer(updateData, INITIAL_STATE);

  useEffect(() => {
    opsData.adminClient.getFermitQuestions().then(
      (obj) => {
        const m = new Map<number, FermitQuestion>();
        (obj.body as FermitQuestion[]).forEach((q) => {
          m.set(q.id, q);
        });
        dispatch({
          type: FermitDataActionType.SET_QUESTIONS,
          questions: m,
        });
      },
      (reason) => {
        console.log(reason);
      },
    );
    opsData.adminClient.getFermitSessions().then(
      (obj) => {
        dispatch({
          type: FermitDataActionType.SET_SESSIONS,
          sessions: obj.body as FermitSession[],
        });
      },
      (reason) => {
        console.log(reason);
      },
    );
  }, [opsData]);

  return (
    <FermitDataContext.Provider value={data}>
      <FermitDispatchContext.Provider value={dispatch}>
        {children}
      </FermitDispatchContext.Provider>
    </FermitDataContext.Provider>
  );
}

export function useFermitData() {
  return useContext(FermitDataContext);
}
export function useFermitDispatch() {
  return useContext(FermitDispatchContext);
}
