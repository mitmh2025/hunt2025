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
  type Ref,
  useCallback,
  useRef,
  useState,
} from "react";
import { type TeamHuntState } from "../../../../lib/api/client";
import { PuzzleUnlockModal, usePuzzleState } from "../../components/PuzzleLink";
import { Button } from "../../components/StyledUI";
import { PuzzleTooltipComponent, Tooltip } from "../../components/Tooltip";
import { Desk, DeskItem, NotesDialog } from "./Layout";
import { PaperTrailFonts } from "./PaperTrailFonts";
import {
  type PaperTrailPuzzleObject,
  type PaperTrailObject,
  type PaperTrailState,
} from "./types";

const NotesModal = React.forwardRef(function NotesModalInner(
  {
    notes,
    onDismiss,
  }: {
    notes: string[];
    onDismiss: () => void;
  },
  ref: Ref<HTMLDialogElement>,
) {
  const stopClickPropagation: MouseEventHandler<HTMLDialogElement> =
    useCallback((e) => {
      // We want to avoid propagating click events within the dialog outside of the dialog, so that we
      // can still have other "dismiss when an unhandled click bubbles up to me" elements in the DOM.
      e.stopPropagation();
    }, []);
  return (
    <NotesDialog ref={ref} onClick={stopClickPropagation}>
      <div
        style={{
          margin: "auto",
          width: "800px",
          maxWidth: "72vw",
          textWrap: "wrap",
        }}
      >
        <h1>Notes</h1>
        <ul>
          {notes.map((note, i) => (
            <li key={`note-${i}`}>{note}</li>
          ))}
        </ul>
        <div className="button-container">
          <Button onClick={onDismiss}>Close</Button>
        </div>
      </div>
    </NotesDialog>
  );
});

const PaperTrailDeskItem = ({
  epoch,
  item,
  position,
  imgStyle,
  currency,
}: {
  epoch: number;
  item: PaperTrailPuzzleObject;
  position: { left?: string; right?: string; top?: string; bottom?: string };
  imgStyle: { width: string };
  currency: number;
}) => {
  const [showTooltip, setShowTooltip] = useState(false);

  const { refs, floatingStyles, context } = useFloating({
    placement: item.tooltip_placement ?? "top",
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

  const puzzleStateHandle = usePuzzleState(epoch, {
    slug: item.slug,
    state: item.state === "solved" ? "unlocked" : item.state,
    title: item.title,
    answer: item.answer,
    desc: item.desc,
  });
  const [puzzleState] = puzzleStateHandle;

  const tooltip = showTooltip && (
    <PuzzleTooltipComponent
      innerRef={refs.setFloating}
      style={{ ...floatingStyles, visibility: "visible" }}
      title={puzzleState.title}
      lockState={puzzleState.state}
      answer={puzzleState.answer}
      desc={puzzleState.desc}
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

  if (puzzleState.state === "unlockable") {
    return (
      <>
        <DeskItem as="button" style={position} onClick={showUnlockModal}>
          {itemContents}
          {tooltip}
        </DeskItem>
        <PuzzleUnlockModal
          ref={unlockModalRef}
          onDismiss={dismissUnlockModal}
          cost={1}
          currency={currency}
          stateHandle={puzzleStateHandle}
        />
      </>
    );
  } else {
    return (
      <>
        <DeskItem style={position} href={`/puzzles/${item.slug}`}>
          {itemContents}
          {tooltip}
        </DeskItem>
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
  const modalRef = useRef<HTMLDialogElement>(null);
  const showModal: MouseEventHandler<HTMLButtonElement> = useCallback((e) => {
    e.stopPropagation();
    modalRef.current?.showModal();
  }, []);

  const dismissModal = useCallback(() => {
    modalRef.current?.close();
  }, []);
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
          epoch={state.epoch}
          key={item.slug}
          item={item}
          position={aStyle}
          imgStyle={imgStyle}
          currency={teamState.currency}
        />
      );
    } else {
      return (
        <>
          <DeskItem
            as="button"
            key={item.title}
            style={aStyle}
            onClick={(e) => {
              if (item.notes.length > 0) showModal(e);
            }}
            disabled={item.notes.length === 0}
          >
            <img src={item.asset} alt={item.alt} style={imgStyle} />
            <Tooltip>Notes</Tooltip>
          </DeskItem>
          {item.notes.length > 0 && (
            <NotesModal
              ref={modalRef}
              notes={item.notes}
              onDismiss={dismissModal}
            />
          )}
        </>
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
