import React from "react";
import { type TeamHuntState } from "../../../../../lib/api/client";
import fusebox_frame_west from "../assets/study/fusebox_frame_west.svg";
import { type ModalWithPuzzleFields, type Node } from "../types";
import Painting from "./Painting";
import SwitchBox from "./SwitchBox";

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
    teamState.rounds.illegal_search?.gates?.includes("isg07") ?? false;
  return (
    <>
      <SwitchBox
        node={node}
        showModal={showModal}
        setNode={setNode}
        opened={gateOpen}
      />
      <Painting
        initialPosition={{ x: 594, y: 60 }}
        imageUrl={fusebox_frame_west}
      />
    </>
  );
};

export default PaintingTwo;

if (typeof window !== "undefined") {
  window.illegalSearchInteractions.painting2 = PaintingTwo;
}
