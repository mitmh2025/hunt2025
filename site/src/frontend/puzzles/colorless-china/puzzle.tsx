import React from "react";
import type { TeamHuntState } from "../../../../lib/api/client";
import LinkedImage from "../../components/LinkedImage";
import image1 from "./assets/image1.png";
import image2 from "./assets/image2.png";
import image3 from "./assets/image3.png";

const Puzzle = ({ teamState }: { teamState: TeamHuntState }): JSX.Element => {
  const pickupCompleted =
    teamState.rounds.paper_trail?.gates?.includes("ptg01") ?? false;

  return (
    <>
      <p className="puzzle-flavor">
        To solve the case, narrow down to only the fraudulent receipts.
      </p>
      {pickupCompleted ? (
        <>
          <p>Our records show you have picked up your copy of this puzzle.</p>
          <p>You should have received a stack of 58 receipts.</p>
        </>
      ) : (
        <>
          <p>Please come to the Gala to pick up your copy of this puzzle.</p>
          <p>You should receive a stack of 58 receipts.</p>
        </>
      )}
      <LinkedImage
        src={image1}
        alt="A handwritten list of sets of blanks on ruled paper, labeled SUSPECTS."
      />
      <LinkedImage
        src={image2}
        alt="A handwritten list of sets of blanks on ruled paper, labeled VICTIMS."
      />
      <LinkedImage
        src={image3}
        alt="A Venn diagram. The sides are empty. The center contains comma-separated numbers."
      />
    </>
  );
};

export default Puzzle;
