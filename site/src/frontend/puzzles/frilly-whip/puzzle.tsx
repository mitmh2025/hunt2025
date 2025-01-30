import React from "react";
import { type TeamHuntState } from "../../../../lib/api/client";
import LinkedImage from "../../components/LinkedImage";
import { InteractionLinkBlock } from "../../components/PuzzleLayout";
import rootUrl from "../../utils/rootUrl";
import ferdinand from "./assets/Ferdinand.png";

const Puzzle = ({ teamState }: { teamState: TeamHuntState }) => {
  const interactionState =
    teamState.rounds.background_check?.interactions?.confront_carter?.state;

  return (
    <>
      {interactionState !== undefined ? (
        <InteractionLinkBlock>
          Unlocked interaction:{" "}
          <a href={`${rootUrl}/interactions/confront_carter`}>
            Confront Carter
          </a>
        </InteractionLinkBlock>
      ) : null}

      <p className="puzzle-flavor">
        Forget everything we’ve read and focus on using what we’ve actually
        learned — the story of his past will not console the victims of his
        current game! If we want to take him down to size, we need the resolve
        to think like him… which I suppose means thinking like someone else.
      </p>

      <p className="puzzle-flavor">
        How should we communicate to Ferdinand that we know his secret?
      </p>

      <LinkedImage
        src={ferdinand}
        alt="Ferdinand, pictured in black and white"
      />
    </>
  );
};

export default Puzzle;
