import React from "react";
import { styled } from "styled-components";
import type { TeamHuntState } from "../../../../lib/api/client";
import pdf from "./assets/making-contact-with-an-informant.pdf";

const StyledIframe = styled.iframe`
  width: 100%;
  aspect-ratio: 8.5/11;
`;

export default function Puzzle({ teamState }: { teamState: TeamHuntState }) {
  const eventConcluded = teamState.rounds.events?.gates?.includes("evg02");

  return (
    <>
      <p className="puzzle-flavor">
        What’s the key to a productive collaboration?
      </p>
      {eventConcluded && (
        <>
          <p>
            For your convenience, the linked PDF contains the information
            required to recreate the live event. All teams received the same
            content.
          </p>
          <p>
            <StyledIframe src={pdf} />
          </p>
        </>
      )}
    </>
  );
}
