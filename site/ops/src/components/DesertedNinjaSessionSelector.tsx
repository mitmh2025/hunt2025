import { styled } from "styled-components";
import { type DesertedNinjaSession } from "../../../lib/api/admin_contract";

const RowContainer = styled.div`
  display: flex;
  margin: 5px 0;
`;
const RowTitle = styled.div`
  width: 150px;
`;
const SelectButton = styled.button`
`;


function SessionSelectRow({ buttonText, session, setSession }) {
  return (
    <>
      <RowContainer>
        <RowTitle>{session.title}</RowTitle>
        <SelectButton
          onClick={() => {
            setSession(session);
          }}
        >
          {buttonText}
        </SelectButton>
      </RowContainer>
    </>
  );
}

export function SessionSelect({ buttonText, sessions, session, setSession }) {
  if (session === null) {
    return (
      <>
        {sessions.map((session) => (
          <SessionSelectRow session={session} setSession={setSession} key={session.id} buttonText={buttonText} />
        ))}
      </>
    );
  }
  else {
    return (
      <>
        <button onClick={() => setSession(null)}>
          Back
        </button>
      </>
    );
  }
}

