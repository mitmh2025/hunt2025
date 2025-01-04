import { createContext, useContext, useEffect, useReducer } from "react";
import {
  type DesertedNinjaQuestion,
  type DesertedNinjaSession,
} from "../../lib/api/admin_contract";
import { useOpsData } from "./OpsDataProvider";

export type DesertedNinjaData = {
  sessions: DesertedNinjaSession[];
  questions: Map<number, DesertedNinjaQuestion>;
  activeSession: DesertedNinjaSession | null;
};
const INITIAL_STATE: DesertedNinjaData = {
  sessions: [],
  questions: new Map(),
  activeSession: null,
};

export enum DNDataActionType {
  SET_QUESTIONS = "set_questions",
  SET_SESSIONS = "set_sessions",
  SET_ACTIVE_SESSION = "set_active_session",
  SESSION_UPDATE = "session_update",
}
type SetQuestionsAction = {
  type: DNDataActionType.SET_QUESTIONS;
  questions: Map<number, DesertedNinjaQuestion>;
};
type SetSessionsAction = {
  type: DNDataActionType.SET_SESSIONS;
  sessions: DesertedNinjaSession[];
};
type SetActiveSessionAction = {
  type: DNDataActionType.SET_ACTIVE_SESSION;
  activeSession: DesertedNinjaSession | null;
};
type SessionUpdateAction = {
  type: DNDataActionType.SESSION_UPDATE;
  session: DesertedNinjaSession | null;
};
type DNDataUpdateAction =
  | SetQuestionsAction
  | SetSessionsAction
  | SetActiveSessionAction
  | SessionUpdateAction;

export const DesertedNinjaDataContext =
  createContext<DesertedNinjaData>(INITIAL_STATE);
export const DesertedNinjaDispatchContext =
  createContext<React.Dispatch<DNDataUpdateAction> | null>(null);

function updateData(d: DesertedNinjaData, action: DNDataUpdateAction) {
  const r = { ...d };

  switch (action.type) {
    case DNDataActionType.SET_ACTIVE_SESSION:
      r.activeSession = action.activeSession;
      break;
    case DNDataActionType.SET_QUESTIONS:
      r.questions = action.questions;
      break;
    case DNDataActionType.SET_SESSIONS:
      r.sessions = action.sessions;
      break;
    case DNDataActionType.SESSION_UPDATE:
      r.sessions = d.sessions.map((s) =>
        s.id === action.session?.id ? action.session : s,
      );
      break;
  }

  return r;
}

export function DesertedNinjaDataProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const opsData = useOpsData();
  const [data, dispatch] = useReducer(updateData, INITIAL_STATE);

  useEffect(() => {
    opsData.adminClient?.getDesertedNinjaQuestions().then(
      (obj) => {
        const m = new Map<number, DesertedNinjaQuestion>();
        (obj.body as DesertedNinjaQuestion[]).forEach((q) => {
          m.set(q.id, q);
        });
        dispatch({
          type: DNDataActionType.SET_QUESTIONS,
          questions: m,
        });
      },
      (reason) => {
        console.log(reason);
      },
    );
    opsData.adminClient?.getDesertedNinjaSessions().then(
      (obj) => {
        dispatch({
          type: DNDataActionType.SET_SESSIONS,
          sessions: obj.body as DesertedNinjaSession[],
        });
      },
      (reason) => {
        console.log(reason);
      },
    );
  }, [opsData]);

  return (
    <DesertedNinjaDataContext.Provider value={data}>
      <DesertedNinjaDispatchContext.Provider value={dispatch}>
        {children}
      </DesertedNinjaDispatchContext.Provider>
    </DesertedNinjaDataContext.Provider>
  );
}

export function useDesertedNinjaData() {
  return useContext(DesertedNinjaDataContext);
}
export function useDesertedNinjaDispatch() {
  return useContext(DesertedNinjaDispatchContext);
}
