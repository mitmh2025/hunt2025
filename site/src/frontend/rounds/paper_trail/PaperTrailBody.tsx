import {
  flip,
  offset,
  shift,
  useFloating,
  autoUpdate,
  useHover,
  safePolygon,
  useFocus,
  useRole,
  useInteractions,
} from "@floating-ui/react";
import React, {
  Fragment,
  type MouseEventHandler,
  useCallback,
  useRef,
  useState,
} from "react";
import { type TeamHuntState } from "../../../../lib/api/client";
import { PuzzleUnlockModal } from "../../components/PuzzleLink";
import { PuzzleTooltipComponent, Tooltip } from "../../components/Tooltip";
import { Desk, DeskItem } from "./Layout";
import { PaperTrailFonts } from "./PaperTrailFonts";
import {
  type PaperTrailPuzzleObject,
  type PaperTrailObject,
  type PaperTrailState,
} from "./types";

const PaperTrailDeskItem = ({
  item,
  position,
  imgStyle,
  currency,
}: {
  item: PaperTrailPuzzleObject;
  position: { left?: string; right?: string; top?: string; bottom?: string };
  imgStyle: { width: string };
  currency: number;
}) => {
  const [showTooltip, setShowTooltip] = useState(false);

  const { refs, floatingStyles, context } = useFloating({
    placement: "top",
    open: showTooltip,
    onOpenChange: setShowTooltip,
    middleware: [offset(5), flip(), shift()],
    whileElementsMounted: autoUpdate,
  });

  const hover = useHover(context, { move: false, handleClose: safePolygon() });
  const focus = useFocus(context);
  const role = useRole(context, { role: "label" });

  const { getReferenceProps, getFloatingProps } = useInteractions([
    hover,
    focus,
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

  // TODO: figure out what to do, interactivity-wise, when the puzzle is still locked.
  // In that circumstance, we don't want to link to the puzzle yet since the puzzle page will 404.
  // We should show some button/unlock/modal overlay?

  const lockState = item.state === "solved" ? "unlocked" : item.state;
  const tooltip = showTooltip && (
    <PuzzleTooltipComponent
      innerRef={refs.setFloating}
      style={{ ...floatingStyles, visibility: "visible" }}
      title={item.title}
      lockState={lockState}
      answer={item.answer}
      desc={item.desc}
      {...getFloatingProps()}
    />
  );
  const itemContents = (
    <>
      <img
        ref={refs.setReference}
        {...getReferenceProps()}
        src={item.asset}
        alt={item.alt}
        style={imgStyle}
      />
    </>
  );

  if (lockState === "unlockable") {
    return (
      <>
        <DeskItem as="button" style={position} onClick={showUnlockModal}>
          {itemContents}
        </DeskItem>
        <PuzzleUnlockModal
          ref={unlockModalRef}
          title={item.title}
          slug={item.slug}
          onDismiss={dismissUnlockModal}
          cost={1}
          currency={currency}
          desc={item.desc}
        />
        {tooltip}
      </>
    );
  } else {
    return (
      <>
        <DeskItem
          style={position}
          href={
            item.state !== "unlockable" ? `/puzzles/${item.slug}` : undefined
          }
        >
          {itemContents}
        </DeskItem>
        {tooltip}
      </>
    );
  }
};

const PaperTrailBody = ({
  state,
  teamState,
}: {
  state: PaperTrailState;
  teamState: TeamHuntState;
}) => {
  const objects = state.imagery.map((item: PaperTrailObject) => {
    const aStyle = {
      left:
        item.pos.left !== undefined
          ? `min(calc(100vw * ${item.pos.left} / 1920), ${item.pos.left}px)`
          : undefined,
      right:
        item.pos.right !== undefined
          ? `min(calc(100vw * ${item.pos.right} / 1920), ${item.pos.right}px)`
          : undefined,
      top:
        item.pos.top !== undefined
          ? `min(calc(100vw * ${item.pos.top} / 1920), ${item.pos.top}px)`
          : undefined,
      bottom:
        item.pos.bottom !== undefined
          ? `min(calc(100vw * ${item.pos.bottom} / 1920), ${item.pos.bottom}px)`
          : undefined,
      // maskImage: `url(${item.asset})`,
      // maskSize: "contain",
    };
    const imgStyle = {
      width: `min(calc(100vw * ${item.width} / 1920), ${item.width}px)`,
    };
    if ("state" in item) {
      return (
        <PaperTrailDeskItem
          key={item.slug}
          item={item}
          position={aStyle}
          imgStyle={imgStyle}
          currency={teamState.currency}
        />
      );
    } else {
      return (
        <DeskItem key={item.title} style={aStyle} href={item.href}>
          <img src={item.asset} alt={item.alt} style={imgStyle} />
          <Tooltip>Notes</Tooltip>
        </DeskItem>
      );
    }
  });
  return (
    <Fragment key="paper-trail">
      <PaperTrailFonts />
      <Desk>{objects}</Desk>
    </Fragment>
  );
};

export default PaperTrailBody;
