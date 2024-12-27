import React from "react";
import { type TeamHuntState } from "../../../../../lib/api/client";
import safe_frame_modal from "../assets/study/safe_frame_modal.png";
import { type ModalWithPuzzleFields, type Node } from "../types";
import Painting from "./Painting";
import Safe from "./Safe";

const PaintingOne = ({
  node,
  setNode,
  showModal,
  teamState,
}: {
  node: Node;
  setNode: (node: Node) => void;
  showModal: ({ modal }: { modal: ModalWithPuzzleFields }) => void;
  teamState: TeamHuntState;
}) => {
  const gateOpen =
    teamState.rounds.illegal_search?.gates?.includes("isg08") ?? false;
  return (
    <>
      <Safe
        node={node}
        showModal={showModal}
        setNode={setNode}
        opened={gateOpen}
      />
      <Painting
        initialPosition={{ x: 610, y: 60 }}
        width={700}
        imageUrl={safe_frame_modal}
      />
    </>
  );
};

export default PaintingOne;

if (typeof window !== "undefined") {
  window.illegalSearchInteractions.painting1 = PaintingOne;
}
