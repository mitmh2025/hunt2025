import React from "react";
import { styled } from "styled-components";
import type { TeamHuntState } from "../../../../lib/api/client";
import { AuthorsNoteBlock } from "../../components/PuzzleLayout";
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
      <AuthorsNoteBlock>
        <p>
          At this event, teams had to find their target informants from a pool
          of options by signs and matching countersigns. You can watch a recap,
          or print out the signs and countersigns yourself and see if you can
          match them up successfully and then solve the resulting puzzle.
        </p>

        <iframe
          width="560"
          height="315"
          src="https://www.youtube.com/embed/X57nwFHsRqk"
          title="Making Contact with an Informant (Recap) - MITMH2025"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
          style={{ width: "100%", height: "100%", aspectRatio: "16 / 9" }}
        />
      </AuthorsNoteBlock>
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
