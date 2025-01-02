import {
  type DesertedNinjaQuestion,
  type DesertedNinjaSession,
} from "../../../lib/api/admin_contract";
import { type OpsData } from "../OpsDataProvider";

export function retrieveDesertedNinjaData(
  data: OpsData,
  setQuestions: React.Dispatch<React.SetStateAction<DesertedNinjaQuestion[]>>,
  setSessions: React.Dispatch<React.SetStateAction<DesertedNinjaSession[]>>,
) {
  if (data.adminClient) {
    data.adminClient.getDesertedNinjaQuestions().then(
      ({ body }) => {
        setQuestions(body as DesertedNinjaQuestion[]);
      },
      (reason) => {
        throw new Error(`Failed to retrieve questions: ${reason}`);
      },
    );
    data.adminClient.getDesertedNinjaSessions().then(
      ({ body }) => {
        setSessions(body as DesertedNinjaSession[]);
      },
      (reason) => {
        throw new Error(`Failed to retrieve questions: ${reason}`);
      },
    );
  }

  //  retrieveQuestions(data, setQuestions);
  //  retrieveSessions(data, setSessions);
}

/*
function retrieveQuestions(
  data: OpsData,
  setQuestions: React.Dispatch<React.SetStateAction<DesertedNinjaQuestion[]>>,
) {
  if (data.adminClient) {
    data.adminClient.getDesertedNinjaQuestions().then(
      ( { body } ) => {
        setQuestions(body);
      },
      (result) => {
        throw new Error(`Failed to retrieve questions: ${result.status}`);
      }
    );
  }
}

function retrieveSessions(
  data: OpsData,
  setSessions: React.Dispatch<React.SetStateAction<DesertedNinjaSession[]>>,
) {
  if (data.adminClient) {
    data.adminClient.getDesertedNinjaSessions().then(
      ( { body } ) => {
        setSessions(body);
      },
      (result) => {
        throw new Error(`Failed to load sessions: ${result.status}`);
      }
    );
  }
}
 */
