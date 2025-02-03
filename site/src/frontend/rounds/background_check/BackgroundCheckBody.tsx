import {
  useFloating,
  useHover,
  useFocus,
  useDismiss,
  useRole,
  useInteractions,
  autoUpdate,
  offset,
} from "@floating-ui/react";
import React, {
  type MouseEventHandler,
  useCallback,
  useRef,
  useState,
} from "react";
import { styled } from "styled-components";
import { type TeamHuntState } from "../../../../lib/api/client";
import { PuzzleUnlockModal, usePuzzleState } from "../../components/PuzzleLink";
import rootUrl from "../../utils/rootUrl";
import { BackgroundCheckFonts } from "./BackgroundCheckFonts";
import { Fridge, SCALED_WIDTH, SCALED_HEIGHT } from "./Layout";
import { type BackgroundCheckObject, type BackgroundCheckState } from "./types";

const FridgeItemLink = styled.a`
  position: absolute;
  cursor: pointer;
`;

const FridgeItemButton = styled.button`
  position: absolute;
  cursor: pointer;
  border: none;
  background: transparent;
`;

const FridgeMagnet = styled.img`
  position: absolute;
`;

const FridgeItemPopover = styled.div`
  padding: 1rem;
  border-radius: 1rem;
  background-color: var(--white);
  color: var(--black);
`;

const BackgroundCheckDisplayObject = ({
  epoch,
  item,
  currency,
}: {
  epoch: number;
  item: BackgroundCheckObject;
  currency: number;
}) => {
  const [tooltipIsOpen, setTooltipIsOpen] = useState<boolean>(false);
  const { refs, floatingStyles, context } = useFloating({
    placement: "top",
    open: tooltipIsOpen,
    onOpenChange: setTooltipIsOpen,
    middleware: [offset(24)],
    whileElementsMounted: autoUpdate,
  });

  const hover = useHover(context, { move: false });
  const focus = useFocus(context);
  const dismiss = useDismiss(context);
  const role = useRole(context, {
    role: "label",
  });

  const stateHandle = usePuzzleState(epoch, {
    slug: item.slug,
    title: item.title,
    state: item.state === "solved" ? "unlocked" : item.state,
    answer: item.answer,
    desc: item.desc,
  });
  const [puzzleState] = stateHandle;

  const { getReferenceProps, getFloatingProps } = useInteractions([
    hover,
    focus,
    dismiss,
    role,
  ]);

  const unlockModalRef = useRef<HTMLDialogElement>(null);
  const showUnlockModal: MouseEventHandler<HTMLButtonElement> = useCallback(
    (e) => {
      e.stopPropagation();
      unlockModalRef.current?.showModal();
    },
    [],
  );
  const dismissUnlockModal = useCallback(() => {
    unlockModalRef.current?.close();
  }, []);

  const aStyle = {
    left:
      item.pos.left !== undefined
        ? `calc(${SCALED_WIDTH} * ${item.pos.left} / 1920)`
        : undefined,
    right:
      item.pos.right !== undefined
        ? `calc(${SCALED_WIDTH} * ${item.pos.right} / 1920)`
        : undefined,
    top:
      item.pos.top !== undefined
        ? `calc(${SCALED_WIDTH} * ${item.pos.top} / 1920)`
        : undefined,
    bottom:
      item.pos.bottom !== undefined
        ? `calc(${SCALED_WIDTH} * ${item.pos.bottom} / 1920)`
        : undefined,
  };
  const imgStyle = {
    width: `calc(${SCALED_WIDTH} * ${item.width} / 1920)`,
    filter:
      item.state === "solved" || item.state === "unlocked"
        ? "drop-shadow(0.25rem 0.25rem 0.25rem rgba(0,0,0,0.3))"
        : undefined,
  };
  const MAGNET_FULL_WIDTH = 90;
  const MAGNET_LEFT_EDGE = `calc(${SCALED_WIDTH} * ${item.width - MAGNET_FULL_WIDTH} / 1920 * 0.5)`;
  // Note: magnet positions are relative to the <a> or <button>
  const magnetImgStyle = {
    width: `calc(${SCALED_WIDTH} * ${MAGNET_FULL_WIDTH} / 1920)`,
    top: `calc(${SCALED_HEIGHT} * -24 / 1080)`,
    left: MAGNET_LEFT_EDGE,
    filter: item.magnetFilter,
  };

  const itemProps = {
    key: puzzleState.slug,
    ...getReferenceProps(),
    ref: refs.setReference,
    style: aStyle,
    href:
      puzzleState.state !== "unlockable"
        ? `${rootUrl}/puzzles/${puzzleState.slug}`
        : undefined,
    onClick: puzzleState.state === "unlockable" ? showUnlockModal : undefined,
  };

  const FridgeItemComponent: React.ElementType =
    puzzleState.state === "unlockable" ? FridgeItemButton : FridgeItemLink;

  return (
    <>
      <FridgeItemComponent {...itemProps}>
        <img src={item.asset} alt={item.alt} style={imgStyle} />
        <FridgeMagnet src={item.magnet} style={magnetImgStyle} />
      </FridgeItemComponent>
      {puzzleState.state === "unlockable" ? (
        <PuzzleUnlockModal
          ref={unlockModalRef}
          onDismiss={dismissUnlockModal}
          cost={1}
          currency={currency}
          stateHandle={stateHandle}
        />
      ) : undefined}
      {tooltipIsOpen && (
        <FridgeItemPopover
          ref={refs.setFloating}
          style={floatingStyles}
          {...getFloatingProps()}
        >
          <div>{puzzleState.title}</div>
          {puzzleState.answer ? (
            <div>{puzzleState.answer}</div>
          ) : (
            <div>{puzzleState.desc}</div>
          )}
        </FridgeItemPopover>
      )}
    </>
  );
};

const BackgroundCheckBody = ({
  state,
  teamState,
}: {
  state: BackgroundCheckState;
  teamState: TeamHuntState;
}) => {
  const objects = state.imagery.objects.map((item: BackgroundCheckObject) => {
    return (
      <BackgroundCheckDisplayObject
        epoch={state.epoch}
        key={item.slug}
        item={item}
        currency={teamState.currency}
      />
    );
  });
  return (
    <Fridge key="background-check" $tiles={state.imagery.height}>
      <BackgroundCheckFonts />
      {/* <h1>The Background Check</h1> */}
      {objects}
    </Fridge>
  );
};

export default BackgroundCheckBody;
