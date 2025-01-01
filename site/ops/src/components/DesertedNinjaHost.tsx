import { useState } from 'react';
import { styled } from "styled-components";
import { type DesertedNinjaSession, type DesertedNinjaQuestion } from "../../../lib/api/admin_contract";
import { DesertedNinjaPresentation } from "./DesertedNinjaPresentation";

const HostContainer = styled.div`
  margin: 10px;
`;

const RowContainer = styled.div`
  display: flex;
  margin: 5px 0;
`;
const RowTitle = styled.div`
  width: 150px;
`;
const HostButton = styled.button`
`;

function HostSelectRow({ session, setSession }) {
  return (
    <>
      <RowContainer>
        <RowTitle>{session.title}</RowTitle>
        <HostButton
          onClick={() => {
            setSession(session);
          }}
        >
          Slideshow
        </HostButton>
      </RowContainer>
    </>
  );
}

function HostSelect({ sessions, session, setSession }) {
  if (session === null) {
    return (
      <>
        {sessions.map((session) => (
          <HostSelectRow session={session} setSession={setSession} key={session.sessionId} />
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

export function DesertedNinjaHost(
  { sessions, questions } : { sessions: DesertedNinjaSession[], questions: DesertedNinjaQuestion[] },
) {
  let [session, setSession] = useState<DesertedNinjaSession>(null);
  
  return (
    <>
      <h2>Host mode</h2>
      <HostSelect sessions={sessions} session={session} setSession={setSession} />
      <DesertedNinjaPresentation session={session} questions={questions} />
    </>
  );
}
