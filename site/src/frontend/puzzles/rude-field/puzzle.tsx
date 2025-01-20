import React from "react";
import { type TeamHuntState } from "../../../../lib/api/client";
import {
  ArchivalNotice,
  InteractionLinkBlock,
} from "../../components/PuzzleLayout";

const Puzzle = ({ teamState }: { teamState: TeamHuntState }) => {
  const interactionState =
    teamState.rounds.stakeout?.interactions?.confront_katrina?.state;

  return (
    <>
      {interactionState !== undefined ? (
        <InteractionLinkBlock>
          Unlocked interaction:{" "}
          <a href="/interactions/confront_katrina">Confront Katrina</a>
        </InteractionLinkBlock>
      ) : null}

      <ArchivalNotice />

      <p className="puzzle-flavor">
        You’ve spotted Katrina at suspicious locations around Chinatown, and
        you’ve taken the traditional photos as evidence. But photos aren’t
        enough—get out there and find what she left at the dead drops!
      </p>

      <p className="puzzle-flavor">
        How should we let Katrina know we’re onto her?
      </p>
    </>
  );
};

export default Puzzle;
