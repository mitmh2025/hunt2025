import React from "react";
import { InteractionLinkBlock } from "../components/PuzzleLayout";
import rootUrl from "../utils/rootUrl";
import { type InteractionLinkState } from "./types";

const InteractionLink = ({
  interactionLinkState,
  slug,
}: {
  interactionLinkState: InteractionLinkState;
  slug: string;
}) => {
  const interaction = interactionLinkState.interactionLinks[slug];
  if (!interaction) return null;

  return (
    <InteractionLinkBlock>
      Unlocked interaction:{" "}
      <a href={`${rootUrl}/interactions/${interaction.slug}`}>
        {interaction.title}
      </a>
    </InteractionLinkBlock>
  );
};

export default InteractionLink;
