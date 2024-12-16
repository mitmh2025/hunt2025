import React from "react";
import { type TeamHuntState } from "../../../../../lib/api/client";
import safe_frame from "../assets/study/safe_frame.svg";
import { type ModalWithPuzzleFields, type Node } from "../types";
import Painting from "./Painting";
import Safe from "./Safe";

const PaintingTwo = ({
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
    teamState.rounds.illegal_search?.gates?.includes("isg06") ?? false;
  return (
    <>
      <Safe
        node={node}
        showModal={showModal}
        setNode={setNode}
        opened={gateOpen}
      />
      <Painting
        initialPosition={{ x: 594, y: 60 }}
        width={700}
        imageUrl={safe_frame}
      />
    </>
  );
};

export default PaintingTwo;
