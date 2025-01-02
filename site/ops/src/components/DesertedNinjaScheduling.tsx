import { useState } from "react";
//import { styled } from "styled-components";
import {
  type DesertedNinjaSession,
  type DesertedNinjaQuestion,
} from "../../../lib/api/admin_contract";
import { SessionSelect } from "./DesertedNinjaSessionSelector";

function SessionDetails({
  session,
  questions,
}: {
  session: DesertedNinjaSession | null;
  questions: DesertedNinjaQuestion[];
}) {
  if (!session) {
    return <p>Please select a session.</p>;
  } else {
    return (
      <>
        <h3>Details</h3>
        <p>{questions.length}</p>
        <p>Title: {session.title}</p>
        <p>Status: {session.status}</p>
        <p>Questions: {session.questionIds}</p>
        <p>Teams signed up: {session.teamIds}</p>
      </>
    );
  }
}

export function DesertedNinjaScheduling({
  sessions,
  questions,
}: {
  sessions: DesertedNinjaSession[];
  questions: DesertedNinjaQuestion[];
}) {
  const [session, setSession] = useState<DesertedNinjaSession | null>(null);

  return (
    <>
      <h2>Scheduling mode</h2>
      <SessionSelect
        sessions={sessions}
        session={session}
        setSession={setSession}
        buttonText="View details"
      />
      <SessionDetails session={session} questions={questions} />
    </>
  );
}
