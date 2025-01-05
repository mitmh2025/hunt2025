import React from "react";
import { styled } from "styled-components";
import type { MinimalRound } from "./Typedefs";

const StyledDiv = styled.div`
  margin: 1em 0;
`;

const StyledAudio = styled.audio`
  margin: 1em 0;
`;

type RoundStatusViewProps = {
  round: MinimalRound;
};

export default function RoundStatusView({
  round,
}: RoundStatusViewProps): JSX.Element {
  return (
    <>
      {round.message && <StyledDiv>{round.message}</StyledDiv>}
      {round.enumerationAudio && (
        <StyledAudio controls src={round.enumerationAudio} />
      )}
    </>
  );
}
