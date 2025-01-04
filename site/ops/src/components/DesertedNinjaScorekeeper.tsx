import { useContext, createContext, useEffect, useState } from "react";
import { styled } from "styled-components";
import {
  type DesertedNinjaSession,
  type DesertedNinjaAnswer,
} from "../../../lib/api/admin_contract";
import {
  useDesertedNinjaData,
  useDesertedNinjaDispatch,
  DNDataActionType,
} from "../DesertedNinjaDataProvider";
import { useOpsData } from "../OpsDataProvider";

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
  // TODO: display as text fields for "in_progress", flat answers for "complete"
  if (!sessionComplete) {
    return (
      <ACell>
        <AEntry name={key} type="text" defaultValue={answers.get(key) ?? ""} />
      </ACell>
    );
  } else {
    return (
      <ACell>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-evenly",
          }}
        >
          <p>{answers.get(key)}</p>
        </div>
      </ACell>
    );
  }
}

function SaveButton() {
  return (
    <div style={{ textAlign: "center" }}>
      <input type="submit" value="Save Answers" />
    </div>
  );
}

function NotStartedPanel() {
  // TODO: fill in team status, allow scorekeeper to check in teams
  // TODO: hook up Start Session button
  const dnData = useDesertedNinjaData();
  const dnDispatch = useDesertedNinjaDispatch();
  const opsData = useOpsData();

  function startSession() {
    const session = dnData.activeSession;
    const adminClient = opsData.adminClient;

    if (session && adminClient) {
      if (session.status === "not_started") {
        // TODO: set session status via the client
        const newSession = {
          ...session,
          status: "in_progress",
        };
        adminClient
          .updateDesertedNinjaSession({
            params: { sessionId: session.id.toString() },
            body: newSession,
          })
          .then(
            ({ body }) => {
              const s = body as DesertedNinjaSession;
              if (dnDispatch) {
                dnDispatch({
                  type: DNDataActionType.SESSION_UPDATE,
                  session: s,
                });
                dnDispatch({
                  type: DNDataActionType.SET_ACTIVE_SESSION,
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
        <h3>Team Status:</h3>
        <button onClick={startSession}>Start Session</button>
      </div>
    </>
  );
}

function ScorekeeperPanel() {
  const opsData = useOpsData();
  const dnData = useDesertedNinjaData();
  const session = dnData.activeSession;
  const [answerMap, setAnswers] = useState<Map<string, number>>(new Map());

  useEffect(() => {
    if (session && opsData.adminClient) {
      opsData.adminClient
        .getDesertedNinjaAnswers({
          params: { sessionId: session.id.toString() },
        })
        .then(
          ({ body }) => {
            const answerList = body as DesertedNinjaAnswer[];
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

  // TODO: implement save callback (timeout);
  //       depending on the status of the game, save or no

  function runSave(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!session) {
      return;
    }

    const answerChanges: DesertedNinjaAnswer[] = [];
    const newAnswers = new Map<string, number>(answerMap.entries());

    // read current answers
    for (let i = 1; i < 17 * session.teamIds.length; i++) {
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
        // otherwise no answer, no change needed
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
      void opsData.adminClient?.saveDesertedNinjaAnswers({
        params: { sessionId: session.id.toString() },
        body: answerChanges,
      }).catch((error: unknown) = {
        console.error(error);
      });
    }
  }

  if (session === null) {
    return <p>Please select a session.</p>;
  }
  if (session.status === "not_started") {
    return <NotStartedPanel />;
  } else {
    const heading = session.teamIds.map((teamId) => (
      <th key={teamId}>
        {opsData.teams
          .find((teamData) => teamId === teamData.teamId)
          ?.name.slice(0, 40)}
      </th>
    ));
    const body = session.questionIds.map((_, idx) => {
      return (
        <ScoreRow key={idx}>
          <QuestionCell>{idx + 1}</QuestionCell>
          {session.teamIds.map((teamId) => (
            <AnswerCell
              key={idx.toString() + "_" + teamId.toString()}
              questionIndex={idx + 1}
              sessionId={session.id}
              teamId={teamId}
              sessionComplete={session.status === "complete"}
            />
          ))}
        </ScoreRow>
      );
    });

    return (
      <div>
        <AnswerContext.Provider value={answerMap}>
          <form onSubmit={runSave} id="dnScorekeeperForm">
            <SaveButton />
            <ScorekeeperTable>
              <thead>
                <tr>
                  <th>Question</th>
                  {heading}
                </tr>
              </thead>
              <tbody>{body}</tbody>
            </ScorekeeperTable>
            <SaveButton />
          </form>
        </AnswerContext.Provider>
      </div>
    );
  }
}

export function DesertedNinjaScorekeeper() {
  return (
    <>
      <h2>Scorekeeper mode</h2>
      <ScorekeeperPanel />
    </>
  );
}
