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
      <p>It’s time to bring Rover in.</p>

      <AuthorsNoteBlock>
        <p>
          An associate of the Two P.I. Noir Detective Agency will phone you
          shortly to schedule a meeting with Billie; from there they will take
          you to Rover’s hiding spot. If the Gala is currently closed, they will
          call when it reopens. Please make sure your{" "}
          <a href="/team">team contact info</a> is up to date.
        </p>

        <p>
          You will receive a video recording after completing this
          confrontation. If you’re unable to complete this confrontation, you
          may reach out to Hunt HQ at{" "}
          <MailtoLink subject={"COLLAR A WILD ROVER"} /> after the interaction
          has been open for more than 5 hours and we can mark it completed
          (include the phrase “COLLAR A WILD ROVER” in the subject line).
          However, this does not block any puzzle content, so we recommend you
          do the live interaction even if you need to wait a bit.
        </p>
      </AuthorsNoteBlock>

      {interactionState.state === "completed" && (
        <p>
          <iframe
            width="560"
            height="315"
            src="https://www.youtube.com/embed/rPZqjz7Jonw?si=V6h2O6NuHbm_UAVZ"
            title="The Safehouse"
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
