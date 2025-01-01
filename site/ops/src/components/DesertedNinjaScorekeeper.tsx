import { useState } from 'react';
import { styled } from "styled-components";
import { type DesertedNinjaSession, type DesertedNinjaQuestion } from "../../../lib/api/admin_contract";
import { DesertedNinjaPresentation } from "./DesertedNinjaPresentation";
import { useOpsData, type OpsData } from "../OpsDataProvider";


const ScorekeeperContainer = styled.div`
  margin: 10px;
`;

const RowContainer = styled.div`
  display: flex;
  margin: 5px 0;
`;
const RowTitle = styled.div`
  width: 150px;
`;
const ScorekeeperButton = styled.button`
`;

function ScorekeeperSelectRow({ session, setSession }) {
  return (
    <>
      <RowContainer>
        <RowTitle>{session.title}</RowTitle>
        <ScorekeeperButton
          onClick={() => {
            setSession(session);
          }}
        >
          Score this session
        </ScorekeeperButton>
      </RowContainer>
    </>
  );
}

function ScorekeeperSelect({ sessions, session, setSession }) {
  if (session === null) {
    return (
      <>
        {sessions.map((session) => (
          <ScorekeeperSelectRow session={session} setSession={setSession} key={session.sessionId} />
        ))}
      </>
    );
  }
  else {
    return (
      <>
        <button onClick={() => setSession(null)}>
          Back
        </button>
      </>
    );
  }
}

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

function AnswerCell( { sessionId, questionId } ) {
  const [editing, setEditing] = useState<boolean>(false);

  if (editing) {
    return (
      <ACell>
        <div style={{display:'flex', alignItems: 'center', justifyContent: 'space-evenly'}}>
          <AEntry type="text" defaultValue="" />
          <button onClick={() => setEditing(false)}>Save</button>
        </div>
      </ACell>
    );
  }
  else {
    return (
      <ACell>
        <div style={{display:'flex', alignItems: 'center', justifyContent: 'space-evenly'}}>
          <p>answer</p>
          <button onClick={() => setEditing(true)}>Edit</button>
        </div>
      </ACell>
    );
  }
  
}

function ScorekeeperPanel(
  { session, question } : { session: DesertedNinjaSession, questions: DesertedNinjaQuestion[] }
) {

  if (session === null) {
    return <p>Please select a session to score.</p>;
  }
  
  const opsData = useOpsData();
  const heading = session.teamIds.map( (teamId) =>
    <th key={teamId}>
      {
        opsData.teams.find( (teamData) => teamId == teamData.teamId ).teamId
      }
    </th>
  );
  const body = session.questionIds.map( (questionId, idx) => {
    return (
      <ScoreRow key={idx}>
        <QuestionCell>{idx + 1}</QuestionCell>
        {
          session.teamIds.map( (teamId) =>
            <AnswerCell key={idx + "_" + teamId} questionId={questionId} sessionId={session.sessionId} />
          )
        }
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
      <tbody>
        {body}
      </tbody>
    </ScorekeeperTable>
  );
}


export function DesertedNinjaScorekeeper (
  { sessions, questions } : { sessions: DesertedNinjaSession[], questions: DesertedNinjaQuestion[] },
) {
  let [session, setSession] = useState<DesertedNinjaSession>(null);
  
  return (
    <>
      <h2>Scorekeeper mode</h2>
      <ScorekeeperSelect sessions={sessions} session={session} setSession={setSession} />
      <ScorekeeperPanel session={session} />
    </>
  );
}
