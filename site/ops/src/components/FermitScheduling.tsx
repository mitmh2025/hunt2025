import { useNotifications } from "@toolpad/core";
import { styled } from "styled-components";
import LinkedImage from "../../../src/frontend/components/LinkedImage";
import {
  useFermitData,
  useFermitDispatch,
  FermitDataActionType,
} from "../FermitDataProvider";
import { useOpsClients, useOpsData } from "../OpsDataProvider";
import { geoguessrLookup } from "../opsdata/desertedNinjaImages";
import { type FermitQuestion } from "../opsdata/desertedNinjaQuestions";
import { type TeamData } from "../opsdata/types";
import { FermitTeamSelector } from "./FermitTeamSelector";

const MiniImage = styled.div`
  width: 10%;
`;

const RegisteredTeams = styled.div`
  border: 1px solid black;
  margin-top: 15px;
  padding: 5px 10px;
`;

const RegistrationBox = styled.div`
  border: 1px solid black;
  margin-top: 15px;
  padding: 5px 10px;
`;

const QuestionDetails = styled.details`
  margin-top: 10px;
`;

function SessionQuestionDetails({
  questionIds,
  questions,
}: {
  questionIds: number[];
  questions: Map<number, FermitQuestion>;
}) {
  const questionElts = questionIds.map((qid) => {
    const question = questions.get(qid);
    if (!question) {
      return null;
    }

    let imageElt = null;
    if (question.geoguessr) {
      const url = geoguessrLookup[question.geoguessr - 1];
      if (url) {
        imageElt = (
          <MiniImage>
            <LinkedImage src={url} alt="" />
          </MiniImage>
        );
      }
    }

    return (
      <li key={qid}>
        {question.text}
        {imageElt}
      </li>
    );
  });

  return (
    <QuestionDetails>
      <summary>Question List</summary>
      <div style={{ border: "1px solid black" }}>
        <ul>{questionElts}</ul>
      </div>
    </QuestionDetails>
  );
}

const TeamRegistrationContainer = styled.div`
  display: flex;
`;
const TeamName = styled.div`
  width: 200px;
`;
const ToggleButton = styled.button``;

function SessionTeamEntry({ team }: { team: TeamData }) {
  const opsClients = useOpsClients();
  const fermitData = useFermitData();
  const dispatch = useFermitDispatch();
  const notifications = useNotifications();

  function unregisterTeam(teamId: number) {
    const session = fermitData.activeSession;
    if (session) {
      opsClients.adminClient
        .deleteFermitRegistration({
          params: {
            sessionId: session.id.toString(),
            teamId: teamId.toString(),
          },
        })
        .then((res) => {
          if (res.status !== 200) {
            throw new Error(`HTTP ${res.status}: ${res.body}`);
          }
          const regs = res.body;
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
          if (dispatch) {
            dispatch({
              type: FermitDataActionType.SET_ACTIVE_SESSION,
              activeSession: newSession,
            });
            dispatch({
              type: FermitDataActionType.SESSION_UPDATE,
              session: newSession,
            });
          }
        })
        .catch((err: unknown) => {
          const msg = err instanceof Error ? err.message : "Unknown error";
          notifications.show(`Failed to delete team reg: ${msg}`, {
            severity: "error",
            autoHideDuration: 3000,
          });
        });
    }
  }

  if (fermitData.activeSession?.status === "not_started") {
    return (
      <TeamRegistrationContainer>
        <TeamName>{team.name.slice(0, 40)}</TeamName>
        <ToggleButton
          onClick={(_) => {
            unregisterTeam(team.teamId);
          }}
        >
          Remove
        </ToggleButton>
      </TeamRegistrationContainer>
    );
  } else {
    return <div>{team.name.slice(0, 40)}</div>;
  }
}

function SessionDetails() {
  const opsData = useOpsData();
  const opsClients = useOpsClients();
  const fermitData = useFermitData();
  const dispatch = useFermitDispatch();
  const notifications = useNotifications();

  function registerTeam(teamId: number) {
    const session = fermitData.activeSession;
    if (session) {
      opsClients.adminClient
        .createFermitRegistration({
          params: {
            sessionId: session.id.toString(),
            teamId: teamId.toString(),
          },
        })
        .then((res) => {
          if (res.status !== 200) {
            throw new Error(`HTTP ${res.status}: ${res.body}`);
          }

          const regs = res.body;
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
          if (dispatch) {
            dispatch({
              type: FermitDataActionType.SET_ACTIVE_SESSION,
              activeSession: newSession,
            });
            dispatch({
              type: FermitDataActionType.SESSION_UPDATE,
              session: newSession,
            });
          }
        })
        .catch((err: unknown) => {
          const msg = err instanceof Error ? err.message : "Unknown error";
          notifications.show(`Failed to register team: ${msg}`, {
            severity: "error",
            autoHideDuration: 3000,
          });
        });
    }
  }
  function createSession(title: string) {
    opsClients.adminClient
      .createFermitSession({ body: { title: title } })
      .then((res) => {
        if (res.status !== 200) {
          throw new Error(`HTTP ${res.status}: ${res.body}`);
        }

        const newSession = res.body;
        const newSessions = [...fermitData.sessions, newSession];
        if (dispatch) {
          dispatch({
            type: FermitDataActionType.SET_ACTIVE_SESSION,
            activeSession: newSession,
          });
          dispatch({
            type: FermitDataActionType.SET_SESSIONS,
            sessions: newSessions,
          });
        }
      })
      .catch((err: unknown) => {
        const msg = err instanceof Error ? err.message : "Unknown error";
        notifications.show(`Failed to create session: ${msg}`, {
          severity: "error",
          autoHideDuration: 3000,
        });
      });
  }

  const session = fermitData.activeSession;
  if (session) {
    const signedUpDivs = opsData.teams
      .filter((t) => session.teams.find((elt) => elt.id === t.teamId))
      .map((t) => <SessionTeamEntry key={t.teamId} team={t} />);

    const registrationBox =
      session.status === "not_started" ? (
        <RegistrationBox>
          <div>Register a Team</div>
          <FermitTeamSelector
            submitCallback={registerTeam}
            exclude={session.teams.map(({ id }) => id)}
          />
        </RegistrationBox>
      ) : null;

    return (
      <>
        <h3>Details</h3>
        <div>
          <div>Title: {session.title}</div>
          <div>Status: {session.status}</div>
        </div>
        <RegisteredTeams>
          <div>Teams signed up:</div>
          {signedUpDivs}
        </RegisteredTeams>
        {registrationBox}
        <SessionQuestionDetails
          questionIds={session.questionIds}
          questions={fermitData.questions}
        />
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

export function FermitScheduling() {
  return (
    <>
      <SessionDetails />
    </>
  );
}
