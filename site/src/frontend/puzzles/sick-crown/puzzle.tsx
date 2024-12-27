import React from "react";
import { styled } from "styled-components";
import LinkedImage from "../../components/LinkedImage";
import note_blacklight from "../../rounds/illegal_search/assets/bookcase/note_blacklight.svg";
import { BookcaseInteraction } from "../../rounds/illegal_search/client/Bookcase";

const SideBySideWithBookHighlights = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-evenly;

  & td[data-title="Great Expectations"] .spine,
  & td[data-title="A Streetcar Named Desire"] .spine,
  & td[data-title="Drawing in Perspective"] .spine,
  & td[data-title="The Men Who Stare at Goats"] .spine {
    color: rgb(230 213 248);
    text-shadow:
      0 0 5px rgb(121 66 122),
      0 0 10px rgb(121 66 122),
      0 0 15px white,
      0 0 20px white,
      0 0 25px white,
      0 0 30px white,
      0 0 35px white;
    border-color: rgb(230 213 248);
    outline: 3px solid black;
    outline-offset: -3px;
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
