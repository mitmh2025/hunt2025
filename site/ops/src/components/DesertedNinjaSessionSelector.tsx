import { styled } from "styled-components";
import { type DesertedNinjaSession } from "../../../lib/api/admin_contract";
import {
  useDesertedNinjaData,
  useDesertedNinjaDispatch,
  DNDataActionType,
} from "../DesertedNinjaDataProvider";

const RowContainer = styled.div`
  display: flex;
  margin: 5px 0;
`;
const RowTitle = styled.div`
  width: 150px;
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
        <RowTitle>{session.title}</RowTitle>
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
        {dnData.sessions.map((session) => (
          <SessionSelectRow
            session={session}
            key={session.id}
            buttonText={buttonText}
          />
        ))}
      </>
    );
  }
}
