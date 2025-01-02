import { useState } from 'react';
import { styled } from "styled-components";
import { SessionSelect } from "./DesertedNinjaSessionSelector.tsx";
import { type DesertedNinjaSession, type DesertedNinjaQuestion } from "../../../lib/api/admin_contract";
import { DesertedNinjaPresentation } from "./DesertedNinjaPresentation";

export function DesertedNinjaHost(
  { sessions, questions } : { sessions: DesertedNinjaSession[], questions: DesertedNinjaQuestion[] },
) {
  let [session, setSession] = useState<DesertedNinjaSession>(null);
  
  return (
    <>
      <h2>Host mode</h2>
      <SessionSelect sessions={sessions} session={session} setSession={setSession} buttonText="Present" />
      <DesertedNinjaPresentation session={session} questions={questions} />
    </>
  );
}
