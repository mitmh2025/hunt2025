import React from "react";
import { styled } from "styled-components";
import type { MinimalRounds } from "./Typedefs";

const StyledDiv = styled.div`
  margin: 1em 0;
`;

const StyledAudio = styled.audio`
  margin: 1em 0;
`;

type SpellingBeeStatusViewProps = {
  rounds: MinimalRounds;
};

export default function SpellingBeeStatusViewProps({
  rounds,
}: SpellingBeeStatusViewProps): JSX.Element {
  return (
    <>
      {rounds.message && <StyledDiv>{rounds.message}</StyledDiv>}
      {rounds.audio && (
        <StyledDiv>
          <StyledAudio controls src={rounds.audio} />
        </StyledDiv>
      )}
    </>
  );
}
