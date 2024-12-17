import React from "react";
import { styled } from "styled-components";
import image from "./assets/image.png";
import puzzle from "./assets/puzzle.mp3";

// Match color of score
const Letter = styled.div`
  background-color: #f9f9f9;
  border: 1px solid black;
  padding: 1em;
`;

const Paragraph = styled.div`
  margin: 1em 0;
`;

const FlexWrapper = styled(Paragraph)`
  display: flex;
  justify-content: space-around;
`;

const Puzzle = (): JSX.Element => {
  return (
    <>
      {/* eslint-disable-next-line jsx-a11y/media-has-caption -- audio contains words */}
      <audio controls src={puzzle} />
      <Letter>
        <Paragraph>Dear Editors of the MITropolis Times:</Paragraph>
        <Paragraph>
          We are writing pursuant to the article published in the Arts section
          of yesterday’s newspaper, in which your music critic writes:
        </Paragraph>
        <Paragraph>
          “The world premiere of the ‘Hunting Trio’ written by an up-and-coming
          Italian composer, which the program notes had described as ‘dancy and
          moving’, was an unmitigated disaster. The flutist was consistently out
          of tune. The tuba part was uninspired and rhythmic. And the pianist
          kept hitting blindly at his chords but missing about half of the
          notes—probably he couldn’t see anything from the far left end of the
          stage where he was exiled for no apparent reason.”
        </Paragraph>
        <Paragraph>
          We adamantly reject these allegations. Let the record show that our
          musicians have faithfully performed the <i>Cacciando Trio</i>{" "}
          following the composer’s intentions to the letter, as would have been
          evident if your critic had taken a look at the <i>Trio</i>’s score,
          the opening measure of which we reproduce here for the edification of
          your readers.
        </Paragraph>
        <FlexWrapper>
          <img
            width={411}
            src={image}
            alt="A musical score for flute, piano, and tuba."
          />
        </FlexWrapper>
        <Paragraph>Sincerely,</Paragraph>
        <Paragraph>
          (unreadable), Chair of the MITropolis New Music Society
        </Paragraph>
      </Letter>
    </>
  );
};

export default Puzzle;
