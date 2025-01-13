import React from "react";
import { type InteractionState } from "../../../../lib/api/contract";
import { AuthorsNoteBlock } from "../../components/PuzzleLayout";

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
          may reach out to Hunt HQ at info@mitmh2025.com after the interaction
          has been open for more than 3 hours and we can mark it completed
          (include the phrase “COLLAR A WILD ROVER”). However, this does not
          block any puzzle content, so we recommend you do the live interaction
          even if you need to wait a bit.
        </p>
      </AuthorsNoteBlock>

      {interactionState.state === "completed" && <p>TODO: video goes here</p>}
    </>
  );
};

export default Interaction;
