import React, { type DragEventHandler, useCallback, useState } from "react";
import { styled } from "styled-components";
import { type TeamHuntState } from "../../../../../lib/api/client";
import drawer_open from "../assets/desk_drawer/drawer-open.mp3";
import { type ModalWithPuzzleFields, type Node } from "../types";
import DirectionalLock from "./DirectionalLock";
import { useRenderModalExtras } from "./ExtraModalRenderer";
import { ModalTrigger } from "./SearchEngine";
import playSound from "./playSound";

const Wrapper = styled.div`
  position: absolute;
  top: 239px;
  left: 383px;
  bottom: 0;
  right: 0;
  overflow: hidden;
`;

const AssetImg = styled.img<{ $open: boolean }>`
  position: absolute;
  width: 1920px;
  height: 1080px;
  transition: 1s linear;
  top: ${({ $open }) => ($open ? -239 : -621)}px;
  left: ${({ $open }) => ($open ? -383 : -663)}px;
`;

export default function DeskDrawer({
  node,
  setNode,
  showModal,
}: {
  node: Node;
  setNode: (node: Node) => void;
  showModal: ({ modal }: { modal: ModalWithPuzzleFields }) => void;
  teamState: TeamHuntState;
}) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [animationComplete, setAnimationComplete] = useState(false);
  const drawerAsset = node.interactionModals?.[0]?.placedAsset?.asset;

  const inhibitDrag: DragEventHandler<HTMLImageElement> = useCallback((e) => {
    e.preventDefault();
  }, []);

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
      <Wrapper>
        {drawerAsset ? (
          <AssetImg
            src={drawerAsset}
            $open={drawerOpen}
            onLoad={() => {
              // we do this on load so that on initial solve, we wait for
              // the asset to load before we animate it open
              setDrawerOpen(true);
              playSound(drawer_open);
              setTimeout(() => {
                setAnimationComplete(true);
              }, 1000);
            }}
            onDragStart={inhibitDrag}
          />
        ) : (
          <DirectionalLock setNode={setNode} />
        )}
      </Wrapper>
      {modals}
      {animationComplete && modalExtras}
    </>
  );
}

window.illegalSearchInteractions.deskdrawer = DeskDrawer;
