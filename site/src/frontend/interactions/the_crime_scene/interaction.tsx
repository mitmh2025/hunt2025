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
      <p>It’s time to confront Sidecar with what you’ve learned.</p>

      <AuthorsNoteBlock>
        <p>
          An associate of the Two P.I. Noir Detective Agency will phone you
          shortly to schedule a meeting with Billie; from there they will take
          you to find Sidecar. If the Gala is currently closed, they will call
          when it reopens. Please make sure your{" "}
          <a href="/team">team contact info</a> is up to date.
        </p>

        <p>
          You will receive a video recording after completing this
          confrontation. If you’re unable to complete this confrontation, you
          may reach out to Hunt HQ at <MailtoLink subject={"RIDE SIDECAR"} />{" "}
          after the interaction has been open for more than 3 hours and we can
          mark it completed (include the phrase “RIDE SIDECAR” in the subject
          line). This interaction does block further investigatory content, but
          you should have plenty of other leads to follow, so we still recommend
          you do the live interaction even if you need to wait a bit.
        </p>
      </AuthorsNoteBlock>

      {interactionState.state === "completed" && (
        <p>
          <iframe
            width="560"
            height="315"
            src="https://www.youtube.com/embed/y42_hlCgy1s"
            title="The Crime Scene"
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
