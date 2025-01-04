import { useState } from "react";
import { styled } from "styled-components";
import { type DesertedNinjaSession } from "../../../lib/api/admin_contract";
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

function AnswerCell({
  sessionId,
  questionId,
  sessionComplete,
}: {
  sessionId: number;
  questionId: number;
  sessionComplete: boolean;
}) {
  // TODO: display as text fields for "in_progress", flat answers for "complete"
  const [editing, setEditing] = useState<boolean>(false);

  if (editing && !sessionComplete) {
    return (
      <ACell>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-evenly",
          }}
        >
          <AEntry type="text" defaultValue="" />
          <button
            onClick={() => {
              setEditing(false);
            }}
          >
            Save {sessionId} {questionId}
          </button>
        </div>
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
          <p>answer</p>
          <button
            onClick={() => {
              setEditing(true);
            }}
          >
            Edit {sessionId} {questionId}
          </button>
        </div>
      </ACell>
    );
  }
}

//function runSave() {
// TODO: implement runSave
//}

function SaveButton() {
  // TODO: hook up Save Answers button
  return (
    <div style={{ textAlign: "center" }}>
      <button>Save Answers</button>
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

  // TODO: fetch current answers, using state
  // TODO: implement save callback (timeout);
  //       depending on the status of the game, save or no

  const session = dnData.activeSession;

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
    const body = session.questionIds.map((questionId, idx) => {
      return (
        <ScoreRow key={idx}>
          <QuestionCell>{idx + 1}</QuestionCell>
          {session.teamIds.map((teamId) => (
            <AnswerCell
              key={idx.toString() + "_" + teamId.toString()}
              questionId={questionId}
              sessionId={session.id}
              sessionComplete={session.status === "complete"}
            />
          ))}
        </ScoreRow>
      );
    });

    return (
      <div>
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
