import React from "react";
import { type InteractionState } from "../../../../lib/api/contract";
import { AuthorsNoteBlock } from "../../components/PuzzleLayout";
import { MailtoLink } from "../../components/StyledUI";

const Interaction = ({
  interactionState,
}: {
  interactionState: InteractionState;
}) => {
  return (
    <>
      <p className="puzzle-flavor">
        It’s time to confront Papa with what you’ve learned.
      </p>

      <AuthorsNoteBlock>
        <p>
          Find Papa at the Gala and discreetly let him know that you know his
          secret. If you don’t see him, ask around at the bar.
        </p>

        <p>
          You will receive a video recording after completing this
          confrontation. If you’re unable to complete this confrontation, you
          may reach out to Hunt HQ at{" "}
          <MailtoLink subject={"ADOPT A BABY VOICE"} /> after the interaction
          has been open for more than 5 hours and we can mark it completed
          (include the phrase “ADOPT A BABY VOICE” in the subject line).
          However, since this does not block any puzzle content and not
          completing this interaction in-person will prevent you from completing
          the finale, we strongly recommend you do the live interaction even if
          you need to wait a bit.
        </p>
      </AuthorsNoteBlock>

      {interactionState.state === "completed" && (
        <p>
          <iframe
            width="560"
            height="315"
            src="https://www.youtube.com/embed/tL_bBh4GHCU?si=fpXzc_s_pS1wHxRQ"
            title="Confronting Papa"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        </p>
      )}
    </>
  );
};

export default Interaction;
