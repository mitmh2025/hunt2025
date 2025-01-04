import React from "react";
import type { TeamHuntState } from "../../../../lib/api/client";
import paper from "./assets/the-inspectre.pdf";

const Puzzle = ({ teamState }: { teamState: TeamHuntState }): JSX.Element => {
  const pickupCompleted =
    teamState.rounds.paper_trail?.gates?.includes("ptg02") ?? false;

  return (
    <>
      {pickupCompleted ? (
        <>
          <p>Our records show you have picked up your copy of this puzzle.</p>
          <p>
            You should have received a bag of eight larger acrylic pieces, 228
            smaller ones, and a sheet of paper. Please contact us at
            info@mitmh2025.com if it seems that you are missing pieces.
          </p>
          <p>
            The paper should have{" "}
            <a href={paper} target="_blank" rel="noreferrer">
              this
            </a>{" "}
            printed on it. If printing this yourself, please ensure that you
            print at 100% scale.
          </p>
        </>
      ) : (
        <>
          <p>Please come to the Gala to pick up your copy of this puzzle.</p>
          <p>
            You should receive a bag of eight larger acrylic pieces, 228 smaller
            ones, and a sheet of paper. Please contact us at info@mitmh2025.com
            if it seems that you are missing pieces.
          </p>
        </>
      )}
    </>
  );
};

export default Puzzle;
