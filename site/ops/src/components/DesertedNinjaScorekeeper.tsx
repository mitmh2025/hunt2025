import { useState } from "react";
import { styled } from "styled-components";
import {
  type DesertedNinjaSession,
  type DesertedNinjaQuestion,
} from "../../../lib/api/admin_contract";
import { useOpsData } from "../OpsDataProvider";
import { SessionSelect } from "./DesertedNinjaSessionSelector";

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
}: {
  sessionId: number;
  questionId: number;
}) {
  const [editing, setEditing] = useState<boolean>(false);

  if (editing) {
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

function ScorekeeperPanel({
  session,
  questions,
}: {
  session: DesertedNinjaSession | null;
  questions: Map<number, DesertedNinjaQuestion>;
}) {
  const opsData = useOpsData();

  if (session === null) {
    return <p>Please select a session to score.</p>;
  }

  const heading = session.teamIds.map((teamId) => (
    <th key={teamId}>
      {opsData.teams.find((teamData) => teamId === teamData.teamId)?.teamId}
    </th>
  ));
  const body = session.questionIds.map((questionId, idx) => {
    return (
      <ScoreRow key={idx}>
        <QuestionCell>
          {idx + 1} / {questions.size}
        </QuestionCell>
        {session.teamIds.map((teamId) => (
          <AnswerCell
            key={idx.toString() + "_" + teamId.toString()}
            questionId={questionId}
            sessionId={session.id}
          />
        ))}
      </ScoreRow>
    );
  });

  return (
    <ScorekeeperTable>
      <thead>
        <tr>
          <th>Question</th>
          {heading}
        </tr>
      </thead>
      <tbody>{body}</tbody>
    </ScorekeeperTable>
  );
}

export function DesertedNinjaScorekeeper({
  sessions,
  questions,
}: {
  sessions: DesertedNinjaSession[];
  questions: Map<number, DesertedNinjaQuestion>;
}) {
  const [session, setSession] = useState<DesertedNinjaSession | null>(null);

  return (
    <>
      <h2>Scorekeeper mode</h2>
      <SessionSelect
        sessions={sessions}
        session={session}
        setSession={setSession}
        buttonText="Score this session"
      />
      <ScorekeeperPanel session={session} questions={questions} />
    </>
  );
}
