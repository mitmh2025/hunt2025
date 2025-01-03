import { useState } from "react";
//import { styled } from "styled-components";
import {
  type DesertedNinjaSession,
  type DesertedNinjaQuestion,
  type DesertedNinjaRegistration,
} from "../../../lib/api/admin_contract";
import { useOpsData } from "../OpsDataProvider";
import { type TeamData } from "../opsdata/types";
import { SessionSelect } from "./DesertedNinjaSessionSelector";
import { TeamSelector } from "./TeamSelector";

function SessionQuestionDetails({
  questionIds,
  questions,
}: {
  questionIds: number[];
  questions: Map<number, DesertedNinjaQuestion>;
}) {
  const questionElts = questionIds.map((qid) => (
    <li key={qid}>
      {questions.get(qid)?.text}
      {questions.get(qid)?.imageUrl}
    </li>
  ));

  return (
    <details>
      <summary>Question List</summary>
      <div style={{ border: "1px solid black" }}>
        <ul>{questionElts}</ul>
      </div>
    </details>
  );
}

function SessionTeamEntry({
  session,
  setSession,
  team,
}: {
  session: DesertedNinjaSession | null;
  setSession: React.Dispatch<React.SetStateAction<DesertedNinjaSession | null>>;
  team: TeamData;
}) {
  const opsData = useOpsData();

  function unregisterTeam(teamId: number) {
    if (session && opsData.adminClient) {
      opsData.adminClient
        .deleteDesertedNinjaRegistration({
          params: {
            sessionId: session.id.toString(),
            teamId: teamId.toString(),
          },
        })
        .then(
          ({ body }) => {
            const regs = body as DesertedNinjaRegistration[];
            const newSession = {
              id: session.id,
              title: session.title,
              status: session.status,
              questionIds: session.questionIds.slice(),
              teamIds: regs.map((reg) => reg.teamId),
            };
            setSession(newSession);
          },
          (reason) => {
            console.log(reason);
          },
        );
    }
  }

  if (session?.status === "not_started") {
    return (
      <form
        onSubmit={(e) => {
          e.preventDefault();
          unregisterTeam(
            parseInt(
              (e.currentTarget.elements[0] as HTMLInputElement).value,
              10,
            ),
          );
        }}
      >
        <div>{team.name.slice(0, 40)}</div>
        <input type="hidden" name="teamId" value={team.teamId} />
        <input type="submit" value="Remove" />
      </form>
    );
  } else {
    return;
    <div>{team.name.slice(0, 40)}</div>;
  }
}

function SessionDetails({
  session,
  setSession,
  questions,
}: {
  session: DesertedNinjaSession | null;
  setSession: React.Dispatch<React.SetStateAction<DesertedNinjaSession | null>>;
  questions: Map<number, DesertedNinjaQuestion>;
}) {
  const opsData = useOpsData();

  function registerTeam(teamId: number) {
    if (session && opsData.adminClient) {
      opsData.adminClient
        .createDesertedNinjaRegistration({
          params: {
            sessionId: session.id.toString(),
            teamId: teamId.toString(),
          },
        })
        .then(
          ({ body }) => {
            const regs = body as DesertedNinjaRegistration[];
            const newSession = {
              id: session.id,
              title: session.title,
              status: session.status,
              questionIds: session.questionIds.slice(),
              teamIds: regs.map((reg) => reg.teamId),
            };
            setSession(newSession);
          },
          (reason) => {
            console.log(reason);
            console.log("oh no ${reason}");
          },
        );
    }
  }

  if (!session) {
    return <p>Please select a session.</p>;
  } else {
    const signedUpDivs = opsData.teams
      .filter((t) => session.teamIds.includes(t.teamId))
      .map((t) => (
        <SessionTeamEntry
          key={t.teamId}
          team={t}
          session={session}
          setSession={setSession}
        />
      ));

    return (
      <>
        <h3>Details</h3>
        <div
          style={{
            display: "flex",
            marginLeft: "5px",
            justifyContent: "space-evenly",
          }}
        >
          <div>Title: {session.title}</div>
          <div>Status: {session.status}</div>
        </div>
        <SessionQuestionDetails
          questionIds={session.questionIds}
          questions={questions}
        />
        <div style={{ border: "1px solid black" }}>
          <p>Teams signed up:</p>
          {signedUpDivs}
        </div>
        <div style={{ border: "1px solid black" }}>
          <h4>Register a Team</h4>
          <TeamSelector
            submitCallback={registerTeam}
            exclude={session.teamIds}
          />
        </div>
      </>
    );
  }
}

export function DesertedNinjaScheduling({
  sessions,
  questions,
}: {
  sessions: DesertedNinjaSession[];
  questions: Map<number, DesertedNinjaQuestion>;
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
      <SessionDetails
        session={session}
        setSession={setSession}
        questions={questions}
      />
    </>
  );
}
