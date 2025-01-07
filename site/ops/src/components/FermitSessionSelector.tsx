import { useState } from "react";
import { styled } from "styled-components";
import { type FermitSession } from "../../../lib/api/admin_contract";
import {
  useFermitData,
  useFermitDispatch,
  FermitDataActionType,
} from "../FermitDataProvider";

const SessionSelectorContainer = styled.div`
  border: 1px solid black;
  width: 90%;
  padding: 2px 0 0 5px;
  margin: 0px auto;
`;
const SessionSelectorOptions = styled.div`
  font-size: 80%;
`;
const SessionSelectorHeader = styled.div`
  font-size: 150%;
  font-weight: bold;
  margin-bottom: 5px;
`;
const SessionList = styled.div`
  height: 100px;
`;
const RowContainer = styled.div`
  display: flex;
  margin: 5px 0;
`;
const RowTitle = styled.div`
  width: 500px;
`;
const SelectButton = styled.button``;

function SessionSelectorRow({
  buttonText,
  session,
}: {
  buttonText: string;
  session: FermitSession;
}) {
  const dispatch = useFermitDispatch();

  return (
    <>
      <RowContainer>
        <RowTitle>
          {session.title} ({session.status}) - {session.teams.length} / 10 teams
        </RowTitle>
        <SelectButton
          onClick={() => {
            if (dispatch) {
              dispatch({
                type: FermitDataActionType.SET_ACTIVE_SESSION,
                activeSession: session,
              });
            }
          }}
        >
          {buttonText}
        </SelectButton>
      </RowContainer>
    </>
  );
}

export function FermitSessionSelector({ buttonText }: { buttonText: string }) {
  const fermitData = useFermitData();
  const dispatch = useFermitDispatch();

  const [hidePast, setHidePast] = useState<boolean>(true);

  if (fermitData.activeSession) {
    return (
      <>
        <button
          onClick={() => {
            if (dispatch) {
              dispatch({
                type: FermitDataActionType.SET_ACTIVE_SESSION,
                activeSession: null,
              });
            }
          }}
        >
          Back
        </button>
      </>
    );
  } else {
    return (
      <>
        <SessionSelectorContainer>
          <SessionSelectorHeader>Session Selection</SessionSelectorHeader>
          <SessionSelectorOptions>
            <label>
              <input
                type="checkbox"
                checked={hidePast}
                onChange={() => {
                  setHidePast(!hidePast);
                }}
              />
              Hide completed events
            </label>
          </SessionSelectorOptions>
          <SessionList>
            {(hidePast
              ? fermitData.sessions.filter((s) => s.status !== "complete")
              : fermitData.sessions
            ).map((session) => (
              <SessionSelectorRow
                session={session}
                key={session.id}
                buttonText={buttonText}
              />
            ))}
          </SessionList>
        </SessionSelectorContainer>
      </>
    );
  }
}
