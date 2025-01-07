import { useContext, createContext, useEffect, useState, useRef } from "react";
import { styled } from "styled-components";
import { useInterval } from "usehooks-ts";
import {
  type FermitSession,
  type FermitAnswer,
  type FermitRegistration,
} from "../../../lib/api/admin_contract";
import {
  useFermitData,
  useFermitDispatch,
  FermitDataActionType,
} from "../FermitDataProvider";
import { useOpsData } from "../OpsDataProvider";

type TeamWithStatus = {
  id: number;
  status: string;
};

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
    return (
      <ACell>{answers.get(key)}</ACell>
    );
  }
}

const TeamStatusContainer = styled.div`
  display: flex;
`;
const TeamName = styled.div`
  width: 200px;
`;
const TeamStatus = styled.div`
  width: 150px;
`;
const ToggleButton = styled.button``;

function TeamStatusRow({ team }: { team: TeamWithStatus }) {
  const fermitData = useFermitData();
  const dispatch = useFermitDispatch();
  const opsData = useOpsData();

  function toggleCheckIn(_e: React.MouseEvent<HTMLButtonElement>) {
    const session = fermitData.activeSession;
    if (session) {
      opsData.adminClient
        .updateFermitRegistration({
          params: {
            sessionId: session.id.toString(),
            teamId: team.id.toString(),
          },
          body: {
            status:
              team.status === "checked_in" ? "not_checked_in" : "checked_in",
          },
        })
        .then(
          ({ body }) => {
            const regs = body as FermitRegistration[];
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
          },
          (e) => {
            console.error(e);
          },
        );
    }
  }

  return (
    <TeamStatusContainer>
      <TeamName>
        {opsData.teams
          .find((teamData) => team.id === teamData.teamId)
          ?.name.slice(0, 40)}
      </TeamName>
      <TeamStatus>{team.status}</TeamStatus>
      <ToggleButton onClick={toggleCheckIn}>
        {team.status === "checked_in" ? "Cancel check-in" : "Confirm check-in"}
      </ToggleButton>
    </TeamStatusContainer>
  );
}

const TeamStatusBox = styled.div`
  margin: 10px;
  padding: 5px 10px;
  border: 1px solid black;
`;
const TeamStatusHeading = styled.div`
  font-size: 150%;
`;

function NotStartedPanel() {
  const fermitData = useFermitData();
  const dispatch = useFermitDispatch();
  const opsData = useOpsData();

  function startSession() {
    const session = fermitData.activeSession;
    const adminClient = opsData.adminClient;

    if (session) {
      if (session.status === "not_started") {
        const newSession = {
          ...session,
          status: "in_progress",
        };
        adminClient
          .updateFermitSession({
            params: { sessionId: session.id.toString() },
            body: newSession,
          })
          .then(
            ({ body }) => {
              const s = body as FermitSession;
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
          );
      }
    }
  }

  return (
    <>
      <div>
        <div>This session has not yet started.</div>
        <TeamStatusBox>
          <TeamStatusHeading>Team Status:</TeamStatusHeading>
          {fermitData.activeSession?.teams.map((team) => (
            <TeamStatusRow team={team} key={team.id} />
          ))}
        </TeamStatusBox>
        <button onClick={startSession}>Start Session</button>
      </div>
    </>
  );
}

function ScorekeeperPanel() {
  const opsData = useOpsData();
  const fermitData = useFermitData();
  const dispatch = useFermitDispatch();
  const session = fermitData.activeSession;
  const [answerMap, setAnswers] = useState<Map<string, number>>(new Map());
  const formRef: React.RefObject<HTMLFormElement> =
    useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (session) {
      opsData.adminClient
        .getFermitAnswers({
          params: { sessionId: session.id.toString() },
        })
        .then(
          ({ body }) => {
            const answerList = body as FermitAnswer[];
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
          },
          (reason) => {
            console.log(reason);
          },
        );
    }
  }, [session, opsData]);

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
      void opsData.adminClient
        .saveFermitAnswers({
          params: { sessionId: session.id.toString() },
          body: answerChanges,
        })
        .catch((error: unknown) => {
          console.error(error);
        });
    }
  }

  function completeSession() {
    const session = fermitData.activeSession;
    if (session) {
      // first force a save?
      formRef.current?.requestSubmit();

      opsData.adminClient
        .completeFermitSession({
          params: { sessionId: session.id.toString() },
        })
        .then(
          ({ body }) => {
            if (dispatch) {
              const s = body as FermitSession;
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
          (e: Error) => {
            console.error(e);
          },
        );
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
      .map(({ id }) => (
        <th key={id}>
          {opsData.teams
            .find((teamData) => id === teamData.teamId)
            ?.name.slice(0, 40)}
        </th>
      ));
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
          <button onClick={completeSession}>Complete session and score</button>
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
