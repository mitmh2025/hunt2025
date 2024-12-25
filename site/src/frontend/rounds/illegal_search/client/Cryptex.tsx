import React, { useState } from "react";
import { type TeamHuntState } from "../../../../../lib/api/client";
import { type ModalWithPuzzleFields, type Node } from "../types";
import { useRenderModalExtras } from "./ExtraModalRenderer";
import InteractiveCryptex from "./InteractiveCryptex";
import { Asset, ModalTrigger } from "./SearchEngine";

export default function Cryptex({
  node,
  setNode,
  showModal,
  teamState,
}: {
  node: Node;
  setNode: (node: Node) => void;
  showModal: ({ modal }: { modal: ModalWithPuzzleFields }) => void;
  teamState: TeamHuntState;
}) {
  const [gateOpen, setGateOpen] = useState(() => {
    return teamState.rounds.illegal_search?.gates?.includes("isg10") ?? false;
  });

  const modalAssets = node.interactionModals?.map((modal) => {
    const { area, asset } = modal.placedAsset ?? modal;
    const placedAsset = { area, asset };
    return <Asset key={modal.asset} placedAsset={placedAsset} />;
  });
  const modals = node.interactionModals?.map((modal) => {
    return (
      <ModalTrigger
        key={`interaction-modal-${modal.asset}`}
        modal={modal}
        showModal={showModal}
      />
    );
  });
  const modalExtras = useRenderModalExtras(node.interactionModals ?? []);

  return (
    <>
      {!gateOpen && (
        <InteractiveCryptex setNode={setNode} setGateOpen={setGateOpen} />
      )}
      {modalAssets}
      {modals}
      {modalExtras}
    </>
  );
}
