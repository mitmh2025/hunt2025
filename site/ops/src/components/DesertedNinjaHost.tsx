import { useState } from "react";
//import { styled } from "styled-components";
import {
  type DesertedNinjaSession,
  type DesertedNinjaQuestion,
} from "../../../lib/api/admin_contract";
import { DesertedNinjaPresentation } from "./DesertedNinjaPresentation";
import { SessionSelect } from "./DesertedNinjaSessionSelector.tsx";

export function DesertedNinjaHost({
  sessions,
  questions,
}: {
  sessions: DesertedNinjaSession[];
  questions: DesertedNinjaQuestion[];
}) {
  const [session, setSession] = useState<DesertedNinjaSession | null>(null);

  return (
    <>
      <h2>Host mode</h2>
      <SessionSelect
        sessions={sessions}
        session={session}
        setSession={setSession}
        buttonText="Present"
      />
      <DesertedNinjaPresentation session={session} questions={questions} />
    </>
  );
}
