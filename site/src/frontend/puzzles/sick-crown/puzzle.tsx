import React from "react";
import { styled } from "styled-components";
import LinkedImage from "../../components/LinkedImage";
import bookcase_blacklight_single from "../../rounds/illegal_search/assets/bookcase/bookcase_blacklight_single.svg";
import note_blacklight from "../../rounds/illegal_search/assets/bookcase/note_blacklight_modal.svg";
import { BookcaseInteraction } from "../../rounds/illegal_search/client/Bookcase";

const SideBySideWithBookHighlights = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-evenly;

  & td[data-title="Great Expectations"],
  & td[data-title="A Streetcar Named Desire"],
  & td[data-title="Drawing in Perspective"],
  & td[data-title="The Men Who Stare at Goats"] {
    &::after {
      content: "";
      background: url(${bookcase_blacklight_single});
      position: absolute;
      top: 11px;
      left: -2px;
      bottom: 0;
      right: 0;
    }

    & .spine {
      border-color: rgb(230 213 248);
      outline: 3px solid black;
      outline-offset: -3px;
    }
  }
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
        The stars light up. We should listen to these new leads and audible
        clues. How should you confront Papa?
      </p>
      <SideBySideWithBookHighlights>
        <Spacer>
          <LinkedImage
            src={note_blacklight}
            alt="A todo list with two items: Deadbeat Debt Collection and Mark Dirty Stacks. The first item is crossed out, and the second is crossed out in blacklight ink."
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
      </SideBySideWithBookHighlights>
    </>
  );
}
