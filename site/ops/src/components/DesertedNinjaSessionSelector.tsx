import { useState } from "react";
import { styled } from "styled-components";
import { type DesertedNinjaSession } from "../../../lib/api/admin_contract";
import {
  useDesertedNinjaData,
  useDesertedNinjaDispatch,
  DNDataActionType,
} from "../DesertedNinjaDataProvider";

const SessionSelectContainer = styled.div`
  border: 1px solid black;
  width: 90%;
  padding: 2px 0 0 5px;
  margin: 0px auto;
`;
const SessionSelectOptions = styled.div`
  font-size: 80%;
`;
const SessionSelectHeader = styled.div`
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

function SessionSelectRow({
  buttonText,
  session,
}: {
  buttonText: string;
  session: DesertedNinjaSession;
}) {
  //  const dnData = useDesertedNinjaData();
  const dnDispatch = useDesertedNinjaDispatch();

  return (
    <>
      <RowContainer>
        <RowTitle>
          {session.title} ({session.status}) - {session.teams.length} / 10 teams
        </RowTitle>
        <SelectButton
          onClick={() => {
            if (dnDispatch) {
              dnDispatch({
                type: DNDataActionType.SET_ACTIVE_SESSION,
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

export function SessionSelect({ buttonText }: { buttonText: string }) {
  const dnData = useDesertedNinjaData();
  const dnDispatch = useDesertedNinjaDispatch();

  const [hidePast, setHidePast] = useState<boolean>(true);

  // TODO: add a callback hook here so that when back is pressed,
  // the scorekeeper view makes sure to save?
  if (dnData.activeSession) {
    return (
      <>
        <button
          onClick={() => {
            if (dnDispatch) {
              dnDispatch({
                type: DNDataActionType.SET_ACTIVE_SESSION,
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
        <SessionSelectContainer>
          <SessionSelectHeader>Session Selection</SessionSelectHeader>
          <SessionSelectOptions>
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
          </SessionSelectOptions>
          <SessionList>
            {(hidePast
              ? dnData.sessions.filter((s) => s.status !== "complete")
              : dnData.sessions
            ).map((session) => (
              <SessionSelectRow
                session={session}
                key={session.id}
                buttonText={buttonText}
              />
            ))}
          </SessionList>
        </SessionSelectContainer>
      </>
    );
  }
}
