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
import { abbreviatedName } from "../util/teamname";

const MiniImage = styled.div`
  width: 10%;
`;

const RegisteredTeams = styled.div`
  margin-top: 15px;
`;
const RegisteredTeamContainer = styled.div`
  border: 1px solid black;
  padding: 10px 0px 10px 15px;
`;
const QuestionContainer = styled.div`
  margin-top: 10px;
`;
const QuestionList = styled.div`
  border: 1px solid black;
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
    <QuestionContainer>
      <div>Question List</div>
      <QuestionList>
        <ul>{questionElts}</ul>
      </QuestionList>
    </QuestionContainer>
  );
}

function SessionDetails() {
  const opsData = useOpsData();
  const opsClients = useOpsClients();
  const fermitData = useFermitData();
  const dispatch = useFermitDispatch();
  const notifications = useNotifications();

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
      .map((t) => <div key={t.teamId}>{abbreviatedName(t, true)}</div>);

    return (
      <>
        <h3>Details</h3>
        <div>
          <div>Title: {session.title}</div>
          <div>Status: {session.status}</div>
        </div>
        <RegisteredTeams>
          <div>Teams signed up:</div>
          <RegisteredTeamContainer>
            {signedUpDivs.length > 0 ? (
              <div>{signedUpDivs}</div>
            ) : (
              <div>None so far!</div>
            )}
          </RegisteredTeamContainer>
        </RegisteredTeams>
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
