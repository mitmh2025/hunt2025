import React from "react";
import { styled } from "styled-components";
import LinkedImage from "../../components/LinkedImage";
import note_svg from "../../rounds/illegal_search/assets/bookcase/note_modal.svg";
import BookcaseInteraction from "../../rounds/illegal_search/client/BookcaseInteraction";

const SideBySide = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-evenly;
`;

const Spacer = styled.div`
  margin-top: 16rem;
  margin-right: 1rem;
  min-width: 120px;
`;

export default function Puzzle(): JSX.Element {
  return (
    <>
      <p className="puzzle-flavor">
        In this disorganized office, finding Papa’s favorite escape may reveal
        more of his secrets.
      </p>
      <SideBySide>
        <Spacer>
          <LinkedImage
            src={note_svg}
            alt="A todo list with two items: Deadbeat Debt Collection and Mark Dirty Stacks.  The first item is crossed out."
          />
        </Spacer>
        <BookcaseInteraction
          interactive={false}
          state={[]}
          handleClick={() => {
            // Do nothing
          }}
          style={{
            position: "static",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        />
      </SideBySide>
    </>
  );
}
