import React from "react";
import { hydrateRoot } from "react-dom/client";
import useDataset from "../../client/useDataset";
import { MissingDiamondPuzzleWitness } from "./MissingDiamondBody";
import { type MissingDiamondState } from "./types";

const MissingDiamondPuzzleHeaderManager = ({
  initialState,
  slug,
}: {
  initialState: MissingDiamondState;
  slug: string;
}) => {
  const state = useDataset("missing_diamond", undefined, initialState);
  return <MissingDiamondPuzzleWitness state={state} slug={slug} />;
};

const elem = document.getElementById("missing-diamond-puzzle-witness-root");
if (elem) {
  const state = (
    window as unknown as { initialMissingDiamondState: MissingDiamondState }
  ).initialMissingDiamondState;
  const slug = (window as unknown as { missingDiamondSlug: string })
    .missingDiamondSlug;
  hydrateRoot(
    elem,
    <MissingDiamondPuzzleHeaderManager initialState={state} slug={slug} />,
  );
} else {
  console.error(
    "Could not mount MissingDiamondPuzzleHeaderManager because #missing-diamond-puzzle-witness-root was nowhere to be found",
  );
}
