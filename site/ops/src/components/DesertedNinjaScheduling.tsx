//import { useState } from "react";
//import { styled } from "styled-components";
import {
  type DesertedNinjaSession,
  type DesertedNinjaQuestion,
  type DesertedNinjaRegistration,
} from "../../../lib/api/admin_contract";
import {
  useDesertedNinjaData,
  useDesertedNinjaDispatch,
  DNDataActionType,
} from "../DesertedNinjaDataProvider";
import { useOpsData } from "../OpsDataProvider";
import { type TeamData } from "../opsdata/types";
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

function SessionTeamEntry({ team }: { team: TeamData }) {
  const opsData = useOpsData();
  const dnData = useDesertedNinjaData();
  const dnDispatch = useDesertedNinjaDispatch();

  function unregisterTeam(teamId: number) {
    const session = dnData.activeSession;
    if (session) {
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
              teams: regs.map((reg) => ({
                id: reg.teamId,
                status: reg.status,
              })),
            };
            if (dnDispatch) {
              dnDispatch({
                type: DNDataActionType.SET_ACTIVE_SESSION,
                activeSession: newSession,
              });
              dnDispatch({
                type: DNDataActionType.SESSION_UPDATE,
                session: newSession,
              });
            }
          },
          (reason) => {
            console.log(reason);
          },
        );
    }
  }

  if (dnData.activeSession?.status === "not_started") {
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
    return <div>{team.name.slice(0, 40)}</div>;
  }
}

function SessionDetails() {
  const opsData = useOpsData();
  const dnData = useDesertedNinjaData();
  const dnDispatch = useDesertedNinjaDispatch();

  function registerTeam(teamId: number) {
    const session = dnData.activeSession;
    if (session) {
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
              teams: regs.map((reg) => ({
                id: reg.teamId,
                status: reg.status,
              })),
            };
            if (dnDispatch) {
              dnDispatch({
                type: DNDataActionType.SET_ACTIVE_SESSION,
                activeSession: newSession,
              });
            }
          },
          (reason) => {
            console.log(reason);
            console.log("oh no ${reason}");
          },
        );
    }
  }
  function createSession(title: string) {
    opsData.adminClient
      .createDesertedNinjaSession({ body: { title: title } })
      .then(
        ({ body }) => {
          const newSession = body as DesertedNinjaSession;
          const newSessions = [...dnData.sessions, newSession];
          if (dnDispatch) {
            dnDispatch({
              type: DNDataActionType.SET_ACTIVE_SESSION,
              activeSession: newSession,
            });
            dnDispatch({
              type: DNDataActionType.SET_SESSIONS,
              sessions: newSessions,
            });
          }
        },
        (reason) => {
          console.log(reason);
          console.log("oh no ${reason}");
        },
      );
  }

  const session = dnData.activeSession;
  if (session) {
    const signedUpDivs = opsData.teams
      .filter((t) => session.teams.find((elt) => elt.id === t.teamId))
      .map((t) => <SessionTeamEntry key={t.teamId} team={t} />);

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
          questions={dnData.questions}
        />
        <div style={{ border: "1px solid black" }}>
          <p>Teams signed up:</p>
          {signedUpDivs}
        </div>
        <div style={{ border: "1px solid black" }}>
          <h4>Register a Team</h4>
          <TeamSelector
            submitCallback={registerTeam}
            exclude={session.teams.map(({ id }) => id)}
          />
        </div>
      </>
    );
  } else {
    return (
      <div>
        <div>Please select a session OR create a new session:</div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            createSession(
              (e.currentTarget.elements[0] as HTMLInputElement).value,
            );
          }}
        >
          <input type="text" placeholder="Session Title" name="title" />
          <input type="submit" value="Create new session" />
        </form>
      </div>
    );
  }
}

export function DesertedNinjaScheduling() {
  return (
    <>
      <h2>Scheduling mode</h2>
      <SessionDetails />
    </>
  );
}
