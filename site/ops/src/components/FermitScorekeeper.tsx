import { useNotifications } from "@toolpad/core";
import {
  useCallback,
  useContext,
  createContext,
  useEffect,
  useState,
  useRef,
} from "react";
import { styled } from "styled-components";
import { useInterval } from "usehooks-ts";
import { type FermitAnswer } from "../../../lib/api/admin_contract";
import {
  useFermitData,
  useFermitDispatch,
  FermitDataActionType,
} from "../FermitDataProvider";
import { useOpsClients, useOpsData } from "../OpsDataProvider";
import { abbreviatedName } from "../util/teamname";
import { FermitTeamSelector } from "./FermitTeamSelector";

type TeamWithStatus = {
  id: number;
  status: string;
};

const Modal = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 100;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
`;
const ModalBox = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  width: 50%;
  height: auto;
  transform: translate(-50%, -50%);
  background: white;
  padding: 15px;
  border: 2px solid #cc0000;
  border-radius: 5px;
`;
const ModalPrompt = styled.div`
  font-size: 110%;
  margin-bottom: 20px;
`;
const ButtonRow = styled.div`
  display: flex;
  justify-content: space-around;
`;

function ModalConfirmation({
  prompt,
  onConfirm,
  onCancel,
}: {
  prompt: string;
  onConfirm: () => void;
  onCancel: () => void;
}) {
  return (
    <Modal>
      <ModalBox>
        <ModalPrompt>{prompt}</ModalPrompt>
        <ButtonRow>
          <button onClick={onConfirm}>Confirm</button>
          <button onClick={onCancel}>Cancel</button>
        </ButtonRow>
      </ModalBox>
    </Modal>
  );
}

const InfoBox = styled.div`
  background-color: tan;
  border: 1px solid brown;
  border-radius: 5px;
  width: 100%;
  padding: 0 5px;
  margin: 0px auto 20px;
  text-align: center;
`;

const RegistrationBox = styled.div`
  display: flex;
  column-gap: 30px;
`;
const StartSession = styled.div`
  text-align: center;
  margin-top: 30px;
`;
const StartButton = styled.button`
  font-size: 120%;
`;

const ScorekeeperTable = styled.table`
  border: 1px solid black;
  text-align: center;
`;
const ScoreRow = styled.tr`
  margin: 10px 0;
`;
const QuestionCell = styled.td`
  width: 50px;
`;
const ACell = styled.td`
  width: 250px;
  text-align: center;
`;
const AEntry = styled.input`
  width: 80px;
`;

const AnswerContext = createContext<Map<string, number>>(new Map());

function AnswerCell({
  sessionId,
  teamId,
  questionIndex,
  sessionComplete,
}: {
  sessionId: number;
  teamId: number;
  questionIndex: number;
  sessionComplete: boolean;
}) {
  const answers = useContext(AnswerContext);
  const key = `${sessionId}_${teamId}_${questionIndex}`;
  if (!sessionComplete) {
    return (
      <ACell>
        <AEntry name={key} type="text" defaultValue={answers.get(key) ?? ""} />
      </ACell>
    );
  } else {
    return <ACell>{answers.get(key)}</ACell>;
  }
}

const TeamStatusContainer = styled.div`
  display: flex;
`;
const TeamName = styled.div`
  width: 200px;
`;

function TeamStatusRow({ team }: { team: TeamWithStatus }) {
  const fermitData = useFermitData();
  const dispatch = useFermitDispatch();
  const opsData = useOpsData();
  const opsClients = useOpsClients();
  const notifications = useNotifications();

  function unregisterTeam(teamId: number) {
    const session = fermitData.activeSession;
    if (session) {
      opsClients.adminClient
        .deleteFermitRegistration({
          params: {
            sessionId: session.id.toString(),
            teamId: teamId.toString(),
          },
        })
        .then((res) => {
          if (res.status !== 200) {
            throw new Error(`HTTP ${res.status}: ${res.body}`);
          }
          const regs = res.body;
          const newSession = {
            id: session.id,
            title: session.title,
            status: session.status,
            questionIds: session.questionIds.slice(),
            teams: regs.map((reg) => ({
              id: reg.teamId,
              status: reg.status,
            })),
          };
          if (dispatch) {
            dispatch({
              type: FermitDataActionType.SET_ACTIVE_SESSION,
              activeSession: newSession,
            });
            dispatch({
              type: FermitDataActionType.SESSION_UPDATE,
              session: newSession,
            });
          }
        })
        .catch((err: unknown) => {
          const msg = err instanceof Error ? err.message : "Unknown error";
          notifications.show(`Failed to delete team reg: ${msg}`, {
            severity: "error",
            autoHideDuration: 3000,
          });
        });
    }
  }

  const teamObj = opsData.teams.find((teamData) => team.id === teamData.teamId);
  const displayName = teamObj ? abbreviatedName(teamObj, true) : "[error]";

  return (
    <TeamStatusContainer>
      <TeamName>{displayName}</TeamName>
      <button
        onClick={(_) => {
          unregisterTeam(team.id);
        }}
      >
        Unregister
      </button>
    </TeamStatusContainer>
  );
}

const TeamStatusBox = styled.div`
  margin: 10px 0;
  padding: 5px 10px;
  border: 1px solid black;
`;
const TeamStatusHeading = styled.div`
  font-size: 120%;
`;

function NotStartedPanel() {
  const fermitData = useFermitData();
  const dispatch = useFermitDispatch();
  const opsClients = useOpsClients();
  const notifications = useNotifications();
  const session = fermitData.activeSession;
  const [modalShown, setModalShown] = useState<boolean>(false);
  const showModal = useCallback(() => {
    setModalShown(true);
  }, []);
  const hideModal = useCallback(() => {
    setModalShown(false);
  }, []);

  function startSession() {
    if (session) {
      if (session.status === "not_started") {
        const newSession = {
          ...session,
          status: "in_progress",
        };
        opsClients.adminClient
          .updateFermitSession({
            params: { sessionId: session.id.toString() },
            body: newSession,
          })
          .then(
            (res) => {
              if (res.status !== 200) {
                throw new Error(`HTTP ${res.status}: ${res.body}`);
              }

              const s = res.body;
              if (dispatch) {
                dispatch({
                  type: FermitDataActionType.SESSION_UPDATE,
                  session: s,
                });
                dispatch({
                  type: FermitDataActionType.SET_ACTIVE_SESSION,
                  activeSession: s,
                });
              }
            },
            (reason) => {
              console.log(reason);
            },
          )
          .catch((err: unknown) => {
            const msg = err instanceof Error ? err.message : "Unknown error";
            notifications.show(`Failed to update session: ${msg}`, {
              severity: "error",
              autoHideDuration: 3000,
            });
          });
      }
    }
  }

  function registerTeam(teamId: number) {
    if (session) {
      opsClients.adminClient
        .createFermitRegistration({
          params: {
            sessionId: session.id.toString(),
            teamId: teamId.toString(),
          },
        })
        .then((res) => {
          if (res.status !== 200) {
            throw new Error(`HTTP ${res.status}: ${res.body}`);
          }

          const regs = res.body;
          const newSession = {
            id: session.id,
            title: session.title,
            status: session.status,
            questionIds: session.questionIds.slice(),
            teams: regs.map((reg) => ({
              id: reg.teamId,
              status: reg.status,
            })),
          };
          if (dispatch) {
            dispatch({
              type: FermitDataActionType.SET_ACTIVE_SESSION,
              activeSession: newSession,
            });
            dispatch({
              type: FermitDataActionType.SESSION_UPDATE,
              session: newSession,
            });
          }
          hideModal();
        })
        .catch((err: unknown) => {
          const msg = err instanceof Error ? err.message : "Unknown error";
          notifications.show(`Failed to register team: ${msg}`, {
            severity: "error",
            autoHideDuration: 3000,
          });
        });
    }
  }

  const statusRows =
    fermitData.activeSession?.teams.map((team) => (
      <TeamStatusRow team={team} key={team.id} />
    )) ?? [];

  return (
    <>
      <div>
        <InfoBox>This session has not yet started.</InfoBox>
        <TeamStatusHeading>Teams in attendance</TeamStatusHeading>
        <TeamStatusBox>
          {statusRows.length > 0 ? statusRows : "None yet!"}
          <hr />
          <RegistrationBox>
            <div>Register a Team</div>
            <FermitTeamSelector
              submitCallback={registerTeam}
              exclude={session?.teams.map(({ id }) => id)}
              buttonText="Register team"
            />
          </RegistrationBox>
        </TeamStatusBox>
        <StartSession>
          <StartButton onClick={showModal}>Start Session</StartButton>
        </StartSession>
        {modalShown && (
          <ModalConfirmation
            prompt="Start session?"
            onConfirm={startSession}
            onCancel={hideModal}
          />
        )}
      </div>
    </>
  );
}

function ScorekeeperPanel() {
  const opsClients = useOpsClients();
  const opsData = useOpsData();
  const fermitData = useFermitData();
  const dispatch = useFermitDispatch();
  const notifications = useNotifications();
  const session = fermitData.activeSession;
  const [answerMap, setAnswers] = useState<Map<string, number>>(new Map());
  const [modalShown, setModalShown] = useState<boolean>(false);
  const showModal = useCallback(() => {
    setModalShown(true);
  }, []);
  const hideModal = useCallback(() => {
    setModalShown(false);
  }, []);
  const formRef: React.RefObject<HTMLFormElement> =
    useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (session) {
      opsClients.adminClient
        .getFermitAnswers({
          params: { sessionId: session.id.toString() },
        })
        .then((res) => {
          if (res.status !== 200) {
            throw new Error(`HTTP ${res.status}: ${res.body}`);
          }

          const answerList = res.body;
          const a = new Map<string, number>();
          answerList.forEach((ans) => {
            const key = `${ans.sessionId}_${ans.teamId}_${ans.questionIndex}`;
            if (ans.answer === null) {
              a.delete(key);
            } else {
              a.set(key, ans.answer);
            }
          });
          setAnswers(a);
        })
        .catch((err: unknown) => {
          const msg = err instanceof Error ? err.message : "Unknown error";
          notifications.show(`Failed to retrieve answers: ${msg}`, {
            severity: "error",
            autoHideDuration: 3000,
          });
        });
    }
  }, [session, opsClients, notifications]);

  useInterval(() => {
    if (formRef.current) {
      console.log("saving...");
      formRef.current.requestSubmit();
    }
  }, 5000);

  function runSave(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!session) {
      return;
    }
    if (session.status !== "in_progress") {
      return;
    }

    const answerChanges: FermitAnswer[] = [];
    const newAnswers = new Map<string, number>(answerMap.entries());

    // read current answers
    for (
      let i = 0;
      i < 17 * session.teams.filter((t) => t.status === "checked_in").length;
      i++
    ) {
      const target = e.currentTarget.elements[i] as HTMLInputElement;

      const name = target.name;
      const value = target.value;
      const [sessionId, teamId, questionIndex] = name
        .split("_")
        .map((s: string) => parseInt(s, 10));
      const previousAnswer = answerMap.get(name);

      if (!sessionId || !teamId || !questionIndex) {
        continue;
      }

      if (!previousAnswer) {
        if (value.length > 0) {
          answerChanges.push({
            teamId: teamId,
            sessionId: sessionId,
            questionIndex: questionIndex,
            answer: parseFloat(value),
          });
          newAnswers.set(name, parseFloat(value));
        }
      } else {
        if (value.length > 0) {
          if (value !== previousAnswer.toString()) {
            answerChanges.push({
              teamId: teamId,
              sessionId: sessionId,
              questionIndex: questionIndex,
              answer: parseFloat(value),
            });
            newAnswers.set(name, parseFloat(value));
          }
        } else {
          answerChanges.push({
            teamId: teamId,
            sessionId: sessionId,
            questionIndex: questionIndex,
            answer: null,
          });
          newAnswers.delete(name);
        }
      }
    }

    if (answerChanges.length > 0) {
      setAnswers(newAnswers);
      // TODO: should this have different behavior based on whether the save succeeds?
      void opsClients.adminClient
        .saveFermitAnswers({
          params: { sessionId: session.id.toString() },
          body: answerChanges,
        })
        .catch((err: unknown) => {
          const msg = err instanceof Error ? err.message : "Unknown error";
          notifications.show(`Failed to save answers: ${msg}`, {
            severity: "error",
            autoHideDuration: 3000,
          });
        });
    }
  }

  function completeSession() {
    const session = fermitData.activeSession;
    if (session) {
      // first request a save
      formRef.current?.requestSubmit();

      opsClients.adminClient
        .completeFermitSession({
          params: { sessionId: session.id.toString() },
        })
        .then((res) => {
          if (res.status !== 200) {
            throw new Error(`HTTP ${res.status}: ${res.body}`);
          }
          if (dispatch) {
            const s = res.body;
            dispatch({
              type: FermitDataActionType.SESSION_UPDATE,
              session: s,
            });
            dispatch({
              type: FermitDataActionType.SET_ACTIVE_SESSION,
              activeSession: s,
            });
          }
          hideModal();
        })
        .catch((err: unknown) => {
          const msg = err instanceof Error ? err.message : "Unknown error";
          notifications.show(`Failed to complete session: ${msg}`, {
            severity: "error",
            autoHideDuration: 3000,
          });
        });
    }
  }

  if (session === null) {
    return <p>Please select a session.</p>;
  }
  if (session.status === "not_started") {
    return <NotStartedPanel />;
  } else {
    const heading = session.teams
      .filter((t) => t.status === "checked_in")
      .map(({ id }) => {
        const team = opsData.teams.find((teamData) => id === teamData.teamId);
        return (
          <th key={id}>{team ? abbreviatedName(team, true) : "[error]"}</th>
        );
      });
    const body = session.questionIds.map((_, idx) => {
      return (
        <ScoreRow key={idx}>
          <QuestionCell>{idx + 1}</QuestionCell>
          {session.teams
            .filter((t) => t.status === "checked_in")
            .map(({ id }) => (
              <AnswerCell
                key={`${session.id}_${id}_${idx}`}
                questionIndex={idx + 1}
                sessionId={session.id}
                teamId={id}
                sessionComplete={session.status === "complete"}
              />
            ))}
        </ScoreRow>
      );
    });

    const completeButton =
      session.status === "in_progress" ? (
        <div>
          <button onClick={showModal}>Complete session and score</button>
        </div>
      ) : null;

    return (
      <div>
        <AnswerContext.Provider value={answerMap}>
          <form onSubmit={runSave} ref={formRef}>
            <ScorekeeperTable>
              <thead>
                <tr>
                  <th>Question</th>
                  {heading}
                </tr>
              </thead>
              <tbody>{body}</tbody>
            </ScorekeeperTable>
          </form>
          {completeButton}
          {modalShown && (
            <ModalConfirmation
              prompt="Complete session?"
              onConfirm={completeSession}
              onCancel={hideModal}
            />
          )}
        </AnswerContext.Provider>
      </div>
    );
  }
}

export function FermitScorekeeper() {
  return (
    <>
      <ScorekeeperPanel />
    </>
  );
}
