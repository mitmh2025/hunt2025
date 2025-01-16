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
        It’s time to confront Katrina with what you’ve learned.
      </p>

      <AuthorsNoteBlock>
        <p>
          Find Katrina at the Gala and discreetly let her know that you know her
          secret. If you don’t see her, ask around at the bar.
        </p>

        <p>
          You will receive a video recording after completing this
          confrontation. If you’re unable to complete this confrontation, you
          may reach out to Hunt HQ at{" "}
          <MailtoLink subject={"CRY STOOL PIDGIN"} /> after the interaction has
          been open for more than 5 hours and we can mark it completed (include
          the phrase “CRY STOOL PIDGIN” in the subject line). However, since
          this does not block any puzzle content and not completing this
          interaction in-person will prevent you from completing the finale, we
          strongly recommend you do the live interaction even if you need to
          wait a bit.
        </p>
      </AuthorsNoteBlock>

      {interactionState.state === "completed" && <p>TODO: video goes here</p>}
    </>
  );
};

export default Interaction;
